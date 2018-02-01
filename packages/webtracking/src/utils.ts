export const getLatLngAtYDistance = (map, originalLatLng, yDistance) => {
  let projection = map.getProjection();
  if(projection) {
    let markerPoint = new google.maps.Point(
      projection.fromLatLngToPoint(originalLatLng).x,
      projection.fromLatLngToPoint(originalLatLng).y - yDistance/(Math.pow(2, map.getZoom()))
    );
    return projection.fromPointToLatLng(markerPoint)
  }
  return originalLatLng;
};

export const extendBoundsBottomPadding = (map, bounds, bottomPadding) => {
  let southWest = bounds.getSouthWest();
  let extendedMarkerPosition = getLatLngAtYDistance(map, southWest, bottomPadding);
  bounds.extend(extendedMarkerPosition);
  return bounds;
};

export const extendLatLngBounds = (bounds, latLngArray) => {
  if (!bounds) {
    bounds = new google.maps.LatLngBounds();
  }
  if (!latLngArray) return bounds;
  latLngArray.forEach((latLng) => {
    bounds.extend(latLng);
  });
  return bounds;
};

export const fitPolylineWithBottomPadding = (map, polylineArray, bottomPadding) => {
  let bounds = new google.maps.LatLngBounds();
  bounds = extendLatLngBounds(bounds, polylineArray);
  map.fitBounds(bounds);
  let extendedBounds = new google.maps.LatLngBounds();
  polylineArray.forEach((latLng) => {
    extendedBounds.extend(latLng);
    if (bottomPadding) {
      extendedBounds.extend(getLatLngAtYDistance(map, latLng, -bottomPadding));
    }
  });
  map.fitBounds(extendedBounds);
};