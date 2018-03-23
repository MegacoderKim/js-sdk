export const buildGradle = [
`
apply plugin: 'com.android.application'

android {
    compileSdkVersion 25
    buildToolsVersion "25.0.2"
    defaultConfig {
        applicationId "com.hypertrack.androidsdkonboarding"`,
`       minSdkVersion 16`,
` 
        targetSdkVersion 25
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}`,`
repositories {
    maven { url "http://hypertrack-android-sdk.s3-website-us-west-2.amazonaws.com/" }
}`,
`
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
        exclude group: 'com.android.support', module: 'support-annotations'
    })
    compile 'com.android.support:appcompat-v7:25.3.0'
    compile 'com.android.support:design:25.3.0'
    testCompile 'junit:junit:4.12'`,
`   compile ('com.hypertrack:android:0.2.1:release@aar') {
        transitive = true;
    }`,
`}`
];
export const appApplication = [
`
package com.hypertrack.example_android;

import android.app.Application;

import com.hypertrack.lib.HyperTrack;

public class ExampleAppApplication extends Application{

    @Override
    public void onCreate() {
        super.onCreate();

        // Initialize HyperTrack SDK with the Publishable Key
        // Refer to documentation at https://docs.hypertrack.com/v3/gettingstarted/authentication.html#publishable-key
        // @NOTE: Add **YOUR_PUBLISHABLE_KEY** here for SDK to be authenticated with HyperTrack Server

`,
`       HyperTrack.initialize(this, "__YOUR_PUBLISHABLE_KEY_HERE__");`,
`
    }
}`
];
export const locationPermission = [
`
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ...
`,
`       // Check if location settings have been enabled by the user
        checkForLocationSettings();`,
`  
    }, 
`,
`   private void checkForLocationSettings() {
        // Check for Location permission
        if (!HyperTrack.checkLocationPermission(this)) {
            HyperTrack.requestPermissions(this);
            return;
        }

        // Check for Location settings
        if (!HyperTrack.checkLocationServices(this)) {
            HyperTrack.requestLocationServices(this, null);
        }

        // Location Permissions and Settings have been enabled
        // Proceed with your app logic here
    }
      
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == HyperTrack.REQUEST_CODE_LOCATION_PERMISSION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                checkForLocationSettings();

            } else {
                // Handle Location Permission denied error
                Toast.makeText(this, "Location Permission denied.", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == HyperTrack.REQUEST_CODE_LOCATION_SERVICES) {
            if (resultCode == Activity.RESULT_OK) {
                checkForLocationSettings();
            } else {
                // Handle Enable Location Services request denied error
                Toast.makeText(this, "Enable Location Services request denied.", Toast.LENGTH_SHORT).show();
            }
        }
    }`,
`  
}
`
];
export const setupFCM = [
`// Setup FCM`
];

export const fcmConfigProject = [
`
buildscript {
 ...
   dependencies {
      ...
       classpath 'com.google.gms:google-services:3.0.0'
   }
}
`
];

export const fcmConfigApp = [
`
apply plugin: 'com.google.gms.google-services'
`
];
export const gcmfcm = [
  `// Go to https://dashboard.hypertrack.com/settings to update`
];
export const fcmService = [
`
// Add a new class which extends \`HyperTrackFirebaseMessagingService\`
public class AppFCMListenerService extends HyperTrackFirebaseMessagingService {
    // Extend HyperTrackFirebaseMessagingService instead of FirebaseMessagingService
    ...
}
`
];
export const fcmManifest = [
`
&lt;!-- For fresh FCM integration, register the new file in your app's \`AndroidManifest.xml\` file --&gt;
&lt;service android:name=".AppFCMListenerService"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="com.google.firebase.MESSAGING_EVENT" /&gt;
    &lt;/intent-filter&gt;
&lt;/service&gt;
`
];
export const testFCM = [
`
curl -H "Authorization: token YOUR_SK_TOKEN"
     -H "Content-Type: application/json"
     -X POST
     https://api.hypertrack.com/api/v1/users/d0ae4912-2074-45ef-a7c0-76be58639ea9/test_notification/
`
];
export const gcmService = [
  `
// Add a new class which extends \`HyperTrackGcmListenerService\`
public class AppGCMListenerService extends HyperTrackGcmListenerService {
    // Extend HyperTrackGcmListenerService instead of GcmListenerService
    ...
}
`
];
export const gcmManifest = [
  `
&lt;!-- For fresh GCM integration, register the new file in your app's \`AndroidManifest.xml\` file --&gt;
&lt;service android:name=".AppGCMListenerService"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="com.google.android.c2dm.intent.RECEIVE" /&gt;
    &lt;/intent-filter&gt;
&lt;/service&gt;
`
];
export const createUser = [
`
// This API will create a new user only if none exists already for the given lookup_id
HyperTrack.createUser(userName, phone, lookupId, new HyperTrackCallback() {
    @Override
    public void onSuccess(@NonNull SuccessResponse response) {
         if (response.getResponseObject() != null) {
            User user = (User) response.getResponseObject();
            String userId = user.getId();
            // Handle user_id, if needed
            ...
        }       
    }

    @Override
    public void onError(@NonNull ErrorResponse errorResponse) {
       // Handle createUser error here
       Toast.makeText(this, error.getErrorMessage(), Toast.LENGTH_SHORT).show();
    }
});
`
];
export const startTracking = [
  `
// This API will create a new user only if none exists already for the given lookup_id
HyperTrack.createUser(userName, phone, lookupId, new HyperTrackCallback() {
    @Override
    public void onSuccess(@NonNull SuccessResponse response) {
         if (response.getResponseObject() != null) {
            User user = (User) response.getResponseObject();
            String userId = user.getId();
`,
`           HyperTrack.startTracking();`,`
            ...
        }       
    }

    @Override
    public void onError(@NonNull ErrorResponse errorResponse) {
       // Handle createUser error here
       Toast.makeText(this, error.getErrorMessage(), Toast.LENGTH_SHORT).show();
    }
});
`
];

