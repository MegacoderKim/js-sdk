import {ITimeAwarePoint} from "ht-models";


export class TimeAwareEncoder {
  encodeTimeAwarePolyline(points: ITimeAwarePoint[]) {
    return this.extendTimeAwarePolyline("", points, null);
  }

  decodeTimeAwarePolyline(polyline: string) {
    // Method to decode a time aware encoder and return gpx logs
    var gpxLogs = [];
    var index = 0;
    var lat = 0;
    var lng = 0;
    var timeStamp = 0;
    var polylineLine = polyline.length;

    while (index < polylineLine) {
      // Decoding dimensions one by one
      var latResult = this.getDecodedDimensionFromPolyline(polyline, index);
      index = latResult[0];
      var lngResult = this.getDecodedDimensionFromPolyline(polyline, index);
      index = lngResult[0];
      var timeResult = this.getDecodedDimensionFromPolyline(polyline, index);
      index = timeResult[0];

      // Resultant variables
      lat += latResult[1];
      lng += lngResult[1];
      timeStamp += timeResult[1];
      gpxLogs.push(this.getGpxLog(lat, lng, timeStamp));
    }

    return gpxLogs;
  }

  getLocationsAtTimestamps(decodedTimeAwarePolyline: ITimeAwarePoint[], timeStamps: string[]) {
    var index = 0, locations = [];

    for (index = 0; index < timeStamps.length; index++) {
      var locationsAndBearing = this.getLocationsTillTimeStamp(decodedTimeAwarePolyline, timeStamps[index]);
      var locationsFound = locationsAndBearing.locations;

      if (locationsFound.length > 0) {
        locations.push(locationsFound[locationsFound.length - 1]);
      } else {
        locations.push([]);
      }
    }

    return locations;
  }

  getLocationsElapsedByTimestamp(decodedTimeAwarePolyline: ITimeAwarePoint[], timeStamp: string) {
    var locationsAndBearing = this.getLocationsTillTimeStamp(decodedTimeAwarePolyline, timeStamp);
    return {'path': locationsAndBearing.locations, 'bearing': locationsAndBearing.bearing};
  }

  getPolylineSegmentsPublic(decodedTimeAwarePolyline: ITimeAwarePoint[]) {
    var lastTimeStamp = decodedTimeAwarePolyline[decodedTimeAwarePolyline.length - 1][2]
    var polylineSegments = this.getPolylineSegments(decodedTimeAwarePolyline, lastTimeStamp);
    var result = [];

    for (var i=0; i < polylineSegments.length; i++) {
      result.push({'path': this.removeTimeStamps(polylineSegments[i].segment), 'style': polylineSegments[i].style});
    }

    return result;
  }

  getPolylineSegmentsForLocationsElapsed(decodedTimeAwarePolyline: ITimeAwarePoint[], timeStamp: string) {
    var polylineSegments = this.getPolylineSegments(decodedTimeAwarePolyline, timeStamp);
    var result = [];

    for (var i=0; i < polylineSegments.length; i++) {
      var elapsed = this.getLocationsElapsedByTimestamp(polylineSegments[i].segment, timeStamp);

      if (elapsed.path.length > 0) {
        result.push({
          'path': elapsed.path, 'bearing': elapsed.bearing, 'style': polylineSegments[i].style
        });
      }
    }

    return result;
  }
  /*
  Other
   */
  getLocationsTillTimeStamp(decodedPolyline: ITimeAwarePoint[], timeStamp: string) {
    var decoded = decodedPolyline;
    // decoded and timeStamps are both in order of times

    var index = 0;
    var currentPair = [];
    var locationsElapsed = [];
    var bearing = 0;

    if (decoded.length == 0) {
      return {'locations': [], 'bearing': bearing};
    }

    // remove times before first time
    var timeStampToFind = timeStamp, startTime = decoded[0][2];

    while (timeStampToFind <= startTime) {
      return {'locations': [[decoded[0][0], decoded[0][1]]], 'bearing': bearing};
    }

    for (index = 0; index < decoded.length; index++) {
      currentPair.push(decoded[index]);

      if (currentPair.length == 2) {
        var timeStampToFind = timeStamp;
        bearing = this.updateBearing(bearing, currentPair);

        var currentstartTime = currentPair[0][2], endTime = currentPair[1][2];

        if (timeStampToFind > currentstartTime && timeStampToFind <= endTime) {
          // location is in the current pair
          var midLocation = this.getLocationInPair(currentPair, timeStampToFind);
          locationsElapsed.push(midLocation);
          return {'locations': locationsElapsed, 'bearing': bearing};

          // it is possible that the next timestamp is also in the
          // same pair, hence redo-ing same iteration
          // currentPair.pop();
          // index --;
        } else {
          currentPair.shift();
        }
      }

      locationsElapsed.push([currentPair[0][0], currentPair[0][1]]);
    }

    return {'locations': locationsElapsed, 'bearing': bearing};
  }

  private isDifferentSegment(end, start) {
    // function to determine whether a encoder
    // segment split should happen
    var distance = this.getDistance(start, end);
    return distance > 500;
  }

  private getPolylineSegments(decoded, timeLimit) {
    // this method breaks encoder till timeStamp when
    // consecutive time difference is greater than 10 minutes
    var segments = [], currentSegment = [];
    var index = 0;

    if (decoded.length == 0) {
      return [];
    }

    var start = decoded[0];

    for (index = 0; index < decoded.length; index++) {
      if (decoded[index][2] <= timeLimit) {

        if (this.isDifferentSegment(decoded[index], start) && currentSegment.length > 0) {
          // time difference is more than 10 mins, so flush
          segments.push({
            'segment': currentSegment, 'style': 'solid'
          });

          var lastElement = currentSegment[currentSegment.length-1];
          currentSegment = [lastElement, decoded[index]];

          segments.push({
            'segment': currentSegment, 'style': 'dotted'
          });

          currentSegment = [decoded[index]];
        } else {
          currentSegment.push(decoded[index]);
        }

        start = decoded[index];
      } else {
        // add one more location so that the locations elapsed
        // method can find an interpolated midpoint
        if (!this.isDifferentSegment(decoded[index], start)) {
          currentSegment.push(decoded[index]);
        }
        break;
      }
    }

    segments.push({
      'segment': currentSegment, 'style': 'solid'
    });
    return segments;
  }

  private updateBearing(oldBearing, gpxPair) {
    var start = [gpxPair[0][0], gpxPair[0][1]];
    var end = [gpxPair[1][0], gpxPair[1][1]];
    var newBearing = this.computeHeading(start, end);

    if (newBearing != 0) {
      return Math.round(newBearing * 100) / 100.0;
    } else {
      return oldBearing;
    }
  }

  private getLocationInPair(gpxPair, timeStamp) {
    // timeStamp lies between the timeStamps in the gpx logs
    var startLat = gpxPair[0][0],
      startLng = gpxPair[0][1],
      endLat = gpxPair[1][0],
      endLng = gpxPair[1][1],
      startTime = new Date(gpxPair[0][2]),
      endTime = new Date(gpxPair[1][2]),
      currentTime = new Date(timeStamp);
    var ratio = (+startTime - +currentTime) / (+startTime - +endTime);
    return [startLat * (1 - ratio) + endLat * ratio, startLng * (1 - ratio) + endLng * ratio];
  }

  private getNextLatLng(decoded, timeStamp) {
    var polylineLength = decoded.length;

    if (polylineLength > 0) {
      for (var index = 0; index < polylineLength - 1; index++) {
        var currentTimeStamp = decoded[index][2];

        if (timeStamp < currentTimeStamp) {
          return [decoded[index][0], decoded[index][1]];
        }
      }

      return [decoded[polylineLength - 1][0], decoded[polylineLength - 1][1]];
    }
  }

  private getDistance(origin, destination) {
    // return distance in meters
    var lon1 = this.toRadian(origin[1]),
      lat1 = this.toRadian(origin[0]),
      lon2 = this.toRadian(destination[1]),
      lat2 = this.toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    return c * EARTH_RADIUS * 1000;
  }

  private toRadian(degree: number) {
    return degree*Math.PI/180;
  }

  private computeHeading(start, end) {
    var lat1 = this.toRadian(start[0]);
    var lat2 = this.toRadian(end[0]);
    var lng1 = this.toRadian(start[1]);
    var lng2 = this.toRadian(end[1]);
    return Math.atan2( Math.sin(lng2-lng1) * Math.cos(lat2), Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1))*180/Math.PI;
  }

  private areEqualLatlngs(latlngA, latlngB) {
    return (latlngA[0] == latlngB[0]) && (latlngA[1] == latlngB[1]);
  }

  private removeTimeStamps(segment) {
    var result = [];
    for (var i = 0; i < segment.length; i++) {
      result.push([segment[i][0], segment[i][1]]);
    }
    return result;
  }

  /*
  Helpers
   */
  private getDecodedDimensionFromPolyline(polyline: string, index: number) {
    // Method to decode one dimension of the encoder
    var result = 1;
    var shift = 0;

    while (true) {
      var polylineChar = polyline[index];
      var b = polylineChar.charCodeAt(0) - 63 - 1;
      index ++;
      result += this.lshiftOperator(b, shift);
      shift += 5;

      if (b < 0x1f) {
        break;
      }
    }

    if ((result % 2) !== 0) {
      return [index, this.rshiftOperator(this.notOperator(result), 1)];
    } else {
      return [index, this.rshiftOperator(result, 1)];
    }
  }


  private extendTimeAwarePolyline(polyline: string, points: ITimeAwarePoint[], lastPoint) {
    var lastLat = 0, lastLng = 0, lastTimeStamp = 0;

    if (polyline == null) {
      polyline = '';
    }

    if (lastPoint != null) {
      lastLat = this.getLat(lastPoint);
      lastLng = this.getLng(lastPoint);
      lastTimeStamp = this.getTimeStamp(lastPoint);
    }

    if (points.length < 1) {
      return polyline
    }

    for (var i = 0; i < points.length; i++) {
      var currentGpxLog = points[i];
      var lat = this.getLat(currentGpxLog);
      var lng = this.getLng(currentGpxLog);
      var timeStamp = this.getTimeStamp(currentGpxLog);

      var diffArray = [lat - lastLat, lng - lastLng, timeStamp - lastTimeStamp];

      for (var j = 0; j < diffArray.length; j++) {
        var currentDiff = diffArray[j];
        currentDiff = (currentDiff < 0) ? this.notOperator(this.lshiftOperator(currentDiff, 1)) : this.lshiftOperator(currentDiff, 1);

        while (currentDiff >= 0x20) {
          polyline += String.fromCharCode((0x20 | (currentDiff & 0x1f)) + 63);
          currentDiff = this.rshiftOperator(currentDiff, 5);
        }

        polyline += String.fromCharCode(currentDiff + 63);
      }

      lastLat = lat, lastLng = lng, lastTimeStamp = timeStamp;
    }

    return polyline;
  }



  private getCoordinate(intRepresentation) {
    var coordinate = intRepresentation * 0.00001;
    return +coordinate.toFixed(5);
  }

  private getIsoTime(timeStamp) {
    // timeStamp is in seconds
    return new Date(timeStamp * 1000).toISOString();
  }

  private getGpxLog(lat, lng, timeStamp) {
    return [
      this.getCoordinate(lat), this.getCoordinate(lng), this.getIsoTime(timeStamp)
    ];
  }
  private getLat(gpxLog: any) {
    return Math.round(gpxLog[0] * 100000);
  }

  private getLng(gpxLog) {
    return Math.round(gpxLog[1] * 100000);
  }

  private getTimeStamp(gpxLog) {
    return +new Date(gpxLog[2]) / 1000;

  }

  private lshiftOperator(num, bits) {
    // Custom left shift for 64 bit integers
    return num * Math.pow(2, bits);
  }

  private rshiftOperator(num, bits) {
    // Custom right shift for 64 bit integers
    return Math.floor(num / Math.pow(2, bits));
  }

  private notOperator(num) {
    // Custom not operator for 64 bit integers
    return ~num;
  }
};

export const EARTH_RADIUS = 6371;