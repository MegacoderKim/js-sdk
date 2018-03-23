export const overview = [
  `
To start seeing live location of your users, you need to plug in our SDK into your app, enable location in the app, and call start tracking method when you want the SDK to collect location.

Follow this 4-step quickstart to go-live in production. Let’s get started.\n\n<div class="markdown-content-image"><img class="integration-overview" src="https://s3.amazonaws.com/dashboard-v3-assets/IntegrationOverview.png" alt="Integration file" /> </div>
  `
];

export const installSdk = [
`
In your project directory, run the bash commands to install the React Native module and link it to your project files.\n

> **Compatibility**\n
> The module works with React Native 0.41.+
`,
`
For the Android SDK, edit the \`build.gradle\` file in your app directory to add a custom repository address where the SDK is available.
`,
`
For the iOS SDK, we will import it using Cocoapods. If you don't have Cocoapods setup, run \`pod init\` in your **ios** directory, and after editing the Podfile, run \`pod install\`.

Open the iOS project with **.xcworkspace** file in Xcode. Move the \`ios/RNHyperTrack.h\` and \`ios/RNHyperTrack.m\` files to your project as shown below.

<div class="markdown-content-image"><img class="ios-link" src="https://raw.githubusercontent.com/hypertrack/react-native-hypertrack/master/link.gif" alt="Link file" /> </div>
`,
`
Configure your publishable key and initialise the SDK in the \`constructor\` method of your Component class. This needs to be done only once in the app lifecycle.
`
];

export const identifyDevice = [
`
The SDK needs a **User** object to identify the device. The SDK has a convenience method \`getOrCreateUser()\` to lookup an existing user using a unique identifier (called \`lookupId\`) or create one if necessary.\n

Method parameters

* userName - Name of the user entity
* phone - Phone number of the user entity
* lookupId - Unique identifier for your user

Use this API in conjunction to your app's login flow, and call \`getOrCreate\` at the end of a successful login flow. This API is a network call, and needs to be done only once in the user session lifecycle.
`
];

export const startTracking = [
`
Use the \`startTracking()\` method to start tracking. Once the user starts tracking, you can see **Trips** and **Stops** of the user.

This is a non-blocking API call, and will also work when the device is offline. 
`
];

export const stopTracking = [
`
Use the \`stopTracking()\` method to stop tracking. This can be done when the user logs out.
\n
> **Ready to deploy!**\n
> Your React Native app is all set to be deployed. As your users update and log in, their live location will be visualized on this <a href="https://dashboard.hypertrack.com" target="_blank">dashboard </a>.
`
];
