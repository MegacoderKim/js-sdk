require('dotenv').config();

var s3 = require('s3');

var Bucket = (process.env.NODE_ENV === 'production') ? "dashboard-client-v3-prod" : "dashboard-client-v3"

var client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-west-1',
        // endpoint: 's3.yourdomain.com',
        // sslEnabled: false
        // any other options are passed to new AWS.S3()
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
});
var params = {
    localDir: "dist",
    deleteRemoved: true, // default false, whether to remove s3 objects
                         // that have no corresponding local file.

    s3Params: {
        Bucket: Bucket,
        Prefix: "build",
        // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
};
var uploader = client.uploadDir(params);
uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
});
uploader.on('progress', function() {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
    console.log("done uploading");
});