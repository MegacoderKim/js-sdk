require('dotenv').config();
var http = require('http');
var https = require('https');
var s3 = require('s3');

http.globalAgent.maxSockets = https.globalAgent.maxSockets = 20;

var Bucket = (process.env.NODE_ENV === 'production') ? "www.hypertrack.com" : "staging.hypertrack.com";

var client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
        // endpoint: 's3.yourdomain.com',
        // sslEnabled: false
        // any other options are passed to new AWS.S3()
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    }
});

function getS3Params(localFile, stat, callback) {
  // call callback like this:
  // console.log(localFile, stat);
  var err = new Error();
  var s3Params = stat.path.indexOf('index.html') > -1 ? null : {};
  // console.log(s3Params);
  // pass `null` for `s3Params` if you want to skip uploading this file.
  callback(null, s3Params);

}

var params = {
    localDir: "dist",
    deleteRemoved: true, // default false, whether to remove s3 objects
                         // that have no corresponding local file.
    s3Params: {
        Bucket: Bucket,
        Prefix: ""
      // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
  getS3Params: getS3Params
};

var uploader = client.uploadDir(params);

uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
});

uploader.on('progress', function() {
    if (uploader.progressAmount > 0) {
      var progress = parseInt((uploader.progressAmount * 50.0) / uploader.progressTotal)
      
      var progressMarker = Array(progress).join("=")
      var remainingSpace = Array(50 - progress).join(" ")
      var progressString = 'progress [' + progressMarker + remainingSpace + '] ' + uploader.progressAmount.toString()

      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(progressString);
    }
});

uploader.on('end', function() {
    console.log("\nDone uploading Assets");
    uploadIndex();
});

function uploadIndex() {
  var indexUpload = client.uploadFile({
    localFile: 'dist/index.html',
    s3Params: {
      Bucket: Bucket,
      Key: "index.html"
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    }
  });

  indexUpload.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });

  indexUpload.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
      uploader.progressAmount, uploader.progressTotal);
  });

  indexUpload.on('end', function() {
    console.log("Done uploading index.html");
  });
}
