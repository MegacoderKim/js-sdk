export const overview = [
  `
To start seeing live location of your users, you need to plug in our SDK into your app, enable location in the app, and call start tracking method when you want the SDK to collect location.

Follow this 5-step quickstart to go-live in production. Let’s get started.\n\n<div class="markdown-content-image"><img class="integration-overview" src="https://s3.amazonaws.com/dashboard-v3-assets/IntegrationOverview.png" alt="Integration file" /> </div>
  `
];

export const installSdk = [
  `
The HyperTrack SDK is available via CocoaPods. Add the following lines to your Podfile to install the SDK.
\n\n
In case you haven't setup CocoaPods for your app, refer to their website and setup a Podfile, and then add these lines.
\n
> **Xcode project**\n
> Remember to use the .xcworkspace file to open your project in Xcode, instead of the .xcodeproj file, from here on.\n
<blockquote>
<p> <strong> Minimum Deployment target</strong> <br /> HyperTrack SDK support iOS 8.0 and above as deployment targets. </p>
</blockquote>
`,
  `
Now that the SDK has been installed, you can use the SDK methods inside Xcode. Configure your publishable key and initialise the SDK.
`
];

export const enableLocation = [
  `
<ol>
<li>
Go to the capabilities tab in your app settings, scroll to background modes and switch it on for \`Location updates\`, \`Background fetch\`, \`Remote notifications\`.
<video src="https://s3-us-west-2.amazonaws.com/hypertrack-ios-sdk/HyperTrack/turn-on-bg-capabilities.mp4" width="600" height="300" controls="controls" loop="loop"></video>
</li>
<li>
Go to the Info tab in your app settings and add permission strings for \`Privacy - Location Always Usage Description\`, \`Privacy - Motion Usage Description\`.
<video src="https://s3-us-west-2.amazonaws.com/hypertrack-ios-sdk/HyperTrack/add-permission-strings.mp4" width="600" height="300" controls="controls" loop="loop"></video>
</li>
<li>
Use the SDK method \`requestAlwaysAuthorization()\` to trigger the permissions pop-up in your app workflow.
</li>
</ol>
`
];

export const identifyDevice = [
  `
The SDK needs a **User** object to identify the device. The SDK has a convenience method \`getOrCreateUser()\` to lookup an existing user using a unique identifier (called \`lookupId\`) or create one if necessary.\n

Method parameters
\`userName\` for user's name, \`phone\` for phone number and \`lookupId\` as unique identifier for your user.

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
<blockquote>
  <p> <strong> Mock a trip</strong> <br /> To simulate a trip, replace \`startTracking\` with \`startMockTracking\`, and \`stopTracking\` with \`stopMockTracking\`. </p>
</blockquote>
<blockquote>
<p> <strong> Ready to deploy!</strong> <br /> Your iOS app is all set to be deployed to the App Store. As your users update and log in, their live location will be visualized on this <a href="https://dashboard.hypertrack.com" target="_blank">dashboard </a>. </p>
</blockquote>
`
];
