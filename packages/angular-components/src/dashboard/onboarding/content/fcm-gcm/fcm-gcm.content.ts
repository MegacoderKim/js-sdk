export const createAPIProject = [
`
New Cloud Messaging projects must create a Firebase project in the [Firebase console](https://firebase.google.com/console/). In this process, you will generate a configuration file and credentials for your project.
<ol>
<li class="active"> Create a new project in the [Firebase console](https://firebase.google.com/console/), if you don't already have one. If you already have an existing Google project associated with your mobile app, click Import Google Project. Otherwise, click Create New Project. </li>
<li class="inactive"> Click Add Firebase to your Android app and follow the setup steps. If you're importing an existing Google project, this may happen automatically and you can just [download the config file](https://support.google.com/firebase/answer/7015592).</li>
<li class="inactive"> When prompted, enter your app's package name. It's important to enter the package name your app is using; this can only be set when you add an app to your Firebase project.</li>
<li class="inactive"> At the e class=inactivend, you'll download a \`google-services.json\` file. You can [download this file](https://support.google.com/firebase/answer/7015592) again at any time.</li>
<li class="inactive">If you haven't done so already, copy this into your project's module folder, typically \`app/\`. </li>
</ol>
`,
  `
New Cloud Messaging projects must create a Firebase project in the [Firebase console](https://firebase.google.com/console/). In this process, you will generate a configuration file and credentials for your project.
<ol>
<li class="inactive"> Create a new project in the [Firebase console](https://firebase.google.com/console/), if you don't already have one. If you already have an existing Google project associated with your mobile app, click Import Google Project. Otherwise, click Create New Project. </li>
<li class="active"> Click Add Firebase to your Android app and follow the setup steps. If you're importing an existing Google project, this may happen automatically and you can just [download the config file](https://support.google.com/firebase/answer/7015592).</li>
<li class="inactive"> When prompted, enter your app's package name. It's important to enter the package name your app is using; this can only be set when you add an app to your Firebase project.</li>
<li class="inactive"> At the end, you'll download a \`google-services.json\` file. You can [download this file](https://support.google.com/firebase/answer/7015592) again at any time.</li>
<li class="inactive">If you haven't done so already, copy this into your project's module folder, typically \`app/\`. </li>
</ol>
`,
  `
New Cloud Messaging projects must create a Firebase project in the [Firebase console](https://firebase.google.com/console/). In this process, you will generate a configuration file and credentials for your project.
<ol>
<li class="inactive"> Create a new project in the [Firebase console](https://firebase.google.com/console/), if you don't already have one. If you already have an existing Google project associated with your mobile app, click Import Google Project. Otherwise, click Create New Project. </li>
<li class="inactive"> Click Add Firebase to your Android app and follow the setup steps. If you're importing an existing Google project, this may happen automatically and you can just [download the config file](https://support.google.com/firebase/answer/7015592).</li>
<li class="active"> When prompted, enter your app's package name. It's important to enter the package name your app is using; this can only be set when you add an app to your Firebase project.</li>
<li class="inactive"> At the end, you'll download a \`google-services.json\` file. You can [download this file](https://support.google.com/firebase/answer/7015592) again at any time.</li>
<li class="inactive">If you haven't done so already, copy this into your project's module folder, typically \`app/\`. </li>
</ol>
`,
  `
New Cloud Messaging projects must create a Firebase project in the [Firebase console](https://firebase.google.com/console/). In this process, you will generate a configuration file and credentials for your project.
<ol>
<li class="inactive"> Create a new project in the [Firebase console](https://firebase.google.com/console/), if you don't already have one. If you already have an existing Google project associated with your mobile app, click Import Google Project. Otherwise, click Create New Project. </li>
<li class="inactive"> Click Add Firebase to your Android app and follow the setup steps. If you're importing an existing Google project, this may happen automatically and you can just [download the config file](https://support.google.com/firebase/answer/7015592).</li>
<li class="inactive"> When prompted, enter your app's package name. It's important to enter the package name your app is using; this can only be set when you add an app to your Firebase project.</li>
<li class="active"> At the end, you'll download a \`google-services.json\` file. You can [download this file](https://support.google.com/firebase/answer/7015592) again at any time.</li>
<li class="inactive">If you haven't done so already, copy this into your project's module folder, typically \`app/\`. </li>
</ol>
`,
  `
New Cloud Messaging projects must create a Firebase project in the [Firebase console](https://firebase.google.com/console/). In this process, you will generate a configuration file and credentials for your project.
<ol>
<li class="inactive"> Create a new project in the [Firebase console](https://firebase.google.com/console/), if you don't already have one. If you already have an existing Google project associated with your mobile app, click Import Google Project. Otherwise, click Create New Project. </li>
<li class="inactive"> Click Add Firebase to your Android app and follow the setup steps. If you're importing an existing Google project, this may happen automatically and you can just [download the config file](https://support.google.com/firebase/answer/7015592).</li>
<li class="inactive"> When prompted, enter your app's package name. It's important to enter the package name your app is using; this can only be set when you add an app to your Firebase project.</li>
<li class="inactive"> At the end, you'll download a \`google-services.json\` file. You can [download this file](https://support.google.com/firebase/answer/7015592) again at any time.</li>
<li class="active">If you haven't done so already, copy this into your project's module folder, typically \`app/\`. </li>
</ol>
`
];

export const configProjectLevel = [
`
The Google Services plugin for Gradle parses configuration information from the google-services.json file. Add the plugin to your project by updating your top-level build.gradle and your app-level build.gradle files as follows:
<ol>
<li class="active">Add the dependency to your project-level \`build.gradle\` </li>
<li class="inactive"> Add the plugin to bottom your app-level \`build.gradle\`</li>
</ol>
`
];

export const configAppLevel = [
  `
The Google Services plugin for Gradle parses configuration information from the google-services.json file. Add the plugin to your project by updating your top-level build.gradle and your app-level build.gradle files as follows:
<ol>
<li class="inactive">Add the dependency to your project-level \`build.gradle\` </li>
<li class="active"> Add the plugin to bottom your app-level \`build.gradle\`</li>
</ol>
`
];

export const passNotificationToSDK = [
`
Add a new Service which extends HyperTrackFirebaseMessagingService.<br />

<blockquote>
<p> <strong> Info</strong> <br /> No need to implement/override any method for HyperTrack SDK's Gcm/Fcm integration. In case <code>onMessageReceived</code> method is overridden, <code>super.onMessageReceived()</code> method should be called. Refer to the <a target="_blank" href="https://docs.hypertrack.com/sdks/android/guides/gcm-integration.html#pass-notification-to-sdk">docs</a> for detailed info. </p>
</blockquote>
`,
`
Register this new file in your AndroidManifest.xml
`
];

export const passNotificationToSDKExists = [
`
To enable FCM integration, you need to change the base class for your implementation of \`FirebaseMessagingService\` to \`HyperTrackFirebaseMessagingService\`
<blockquote>
<p> <strong> Info</strong> <br /> No need to implement/override any method for HyperTrack SDK's Gcm/Fcm integration. In case <code>onMessageReceived</code> method is overridden, <code>super.onMessageReceived()</code> method should be called. Refer to the <a target="_blank" href="https://docs.hypertrack.com/sdks/android/guides/gcm-integration.html#pass-notification-to-sdk">docs</a> for detailed info. </p>
</blockquote>
`
];

export const handleYourNotifications = [
  `
To handle your notifications only, you need to ignore HyperTrack notifications. In case you dont ignore them, your app might end up in a crash.
`
];

export const configureOnDashboard = [
`
Head over to the [account settings](https://dashboard.hypertrack.com/settings) on the HyperTrack dashboard to setup your keys. These keys are only used to send triggers to start trips or shifts to the SDK.
`
];

export const testFCM = [
`
Send a Test UI notification to your device from HyperTrack Server.
`
];

export const fcmOverview = [
  `
The SDK has a bi-directional communication model with the server. This enables the SDK to run on a variable frequency model, which balances the fine trade-off between low latency tracking and battery efficiency. It also enables us to get location, activity and health data from SDK on-demand. Finally, it adds robustness to the SDK.

For this purpose, the Android SDK uses FCM or GCM silent notifications. This guide will take you through the setup.
  `
];
