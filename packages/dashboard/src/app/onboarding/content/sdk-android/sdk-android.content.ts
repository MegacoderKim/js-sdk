export const installSdk = [
  `In your app's \`build.gradle\` file, define the minimum SDK version, repositories and dependencies as shown. Once configured, run a gradle sync to import the SDK and its dependencies to your project.
  \n\n<div class="markdown-content-image"><img class="gradle-path" src="https://s3.amazonaws.com/dashboard-v3-assets/gradle.png" alt="Gradle file" /> </div>
  `,
  `Once Gradle sync is complete, you can use the SDK methods inside your project. \n Configure your publishable key and initialise the SDK in the \`onCreate\` method of your Application class. This needs to be done only once in the app lifecycle.
`
];

export const enableLocation = [
  `The SDK uses the \`ACCESS_FINE_LOCATION\` and \`ACCESS_COARSE_LOCATION\` permissions, which are already included in the SDK manifest file.\n### Run-time permissions\n* \`requestPermissions()\` API: to enable location permissions on run-time\n\n* \`requestLocationServices()\` API: to enable location services at high accuracy`
];

export const createUser = [
  `
The SDK needs a **User** object to identify the device. The SDK has a convenience method \`getOrCreateUser()\` to lookup an existing user using a unique identifier (called \`lookupId\`) or create one if necessary.\n### Method parameters\n\n *userName* - Name of the user entity \n\n *phone* - Phone number of the user entity\n\n *lookupId* - Unique identifier for your user
\n\n
Use this API in conjunction to your app's login flow, and call \`getOrCreate\` at the end of a successful login flow. This API is a network call, and needs to be done only once in the user session lifecycle.
`
];

export const startTracking = [
`Use the \`startTracking()\` method to start tracking. Once the user starts tracking, you can see **Trips** and **Stops** of the user.

This is a non-blocking API call, and will also work when the device is offline. 
`
];

export const stopTracking = [
`Use the \`stopTracking()\` method to stop tracking. This can be done when the user logs out.
<blockquote>
  <p> <strong> Mock a trip</strong> <br /> To simulate a trip, replace \`startTracking\` with \`startMockTracking\`, and \`stopTracking\` with \`stopMockTracking\`. </p>
</blockquote>
<blockquote>
<p> <strong> Enable server<>SDK communication!</strong> <br /> The SDK has a bi-directional communication model with the server. This enables the SDK to run on a variable frequency model, which balances the fine trade-off between low latency tracking and battery efficiency. It also enables us to get location, activity and health data from SDK on-demand. Finally, it adds robustness to the SDK. <br />
For this purpose, the Android SDK uses FCM or GCM silent notifications. This guide will take you through the setup. <br /><br /><a href="https://dashboard.hypertrack.com/onboarding/fcm-android" style="display: flex;justify-content: center;"><button class="btn btn-primary"> Setup FCM</button></a></p>
</blockquote>
`
];





export const configure = [
  `Now that the SDK has been installed, you can use the SDK methods inside Android Studio. Configure your publishable key and initialise the SDK in the \`onCreate\` method of your Application class.`,
  `* The SDK requires the \`ACCESS_FINE_LOCATION\` and \`ACCESS_COARSE_LOCATION\` permissions. These are already included in the SDK manifest so need not be explicitly added.\n\n* In case your app is for Marshmallow and above (API level 23+), Call \`requestPermissions()\` API to request for **run-time location permissions**.\n\n* For high quality location collection, the SDK needs location services enabled at **high accuracy**. Call \`requestLocationServices()\` API to request for user to enable Location Services in high-accuracy, if not enabled already.`
];

export const gcmFcm = [
  `New Cloud Messaging projects must create a Firebase project in the [Firebase console](https://firebase.google.com/console/). In this process, you will generate a configuration file and credentials for your project.\n1. Create a new project in the [Firebase console](https://firebase.google.com/console/), if you don't already have one. If you already have an existing Google project associated with your mobile app, click Import Google Project. Otherwise, click Create New Project.\n2. Click Add Firebase to your Android app and follow the setup steps. If you're importing an existing Google project, this may happen automatically and you can just [download the config file](https://support.google.com/firebase/answer/7015592).\n3. When prompted, enter your app's package name. It's important to enter the package name your app is using; this can only be set when you add an app to your Firebase project.\n4. At the end, you'll download a \`google-services.json\` file. You can [download this file](https://support.google.com/firebase/answer/7015592) again at any time.\n5. If you haven't done so already, copy this into your project's module folder, typically \`app/\`.
  `,
  `The Google Services plugin for Gradle parses configuration information from the google-services.json file. Add the plugin to your project by updating your top-level \`build.gradle\` and your app-level \`build.gradle\` files.\n1. *Add the dependency to your project-level \`build.gradle\`*\n2. Add the plugin to **bottom** your app-level \`build.gradle\``,
  `The Google Services plugin for Gradle parses configuration information from the google-services.json file. Add the plugin to your project by updating your top-level \`build.gradle\` and your app-level \`build.gradle\` files.\n1. Add the dependency to your project-level \`build.gradle\`\n2. *Add the plugin to **bottom** your app-level \`build.gradle\`*`,
  `Head over to the [account settings](https://dashboard.hypertrack.com/settings) on the HyperTrack dashboard to setup your keys. These keys are only used to send triggers to start trips or shifts to the SDK. For detailed info you can refer to official [documentation](https://developers.google.com/cloud-messaging/android/client).`,
  `To enable FCM integration, you need to change the base class for your implementation of \`FirebaseMessagingService\` to \`HyperTrackFirebaseMessagingService\`. In case of fresh FCM integration, add the \`Service\` which extends \`HyperTrackFirebaseMessagingService\` to your application's manifest file with the \`<intent-filter>\` tag.`,
  ` To enable FCM integration, you need to change the base class for your implementation of \`FirebaseMessagingService\` to \`HyperTrackFirebaseMessagingService\`. In case of fresh FCM integration, add the \`Service\` which extends \`HyperTrackFirebaseMessagingService\` to your application's manifest file with the \`<intent-filter>\` tag.`,
  `Send a Test UI notification to your device from HyperTrack Server.`
];

export const startSDK = [
  `To start tracking the user, use the \`startTracking\` method. You can keep the SDK on throughout the day, or turn it off if you want to stop tracking the user at any point of time using the \`HyperTrack.stopTracking()\` method.`
];

export const viewDashboard = [
  `Install your app with the HyperTrack SDK on a device and begin tracking on the [Dashboard](https://dashboard.hypertrack.com/). You would see the user’s current state on the HyperTrack dashboard. If you click on the user, you should be able to view the user's trips and stops.`
];
