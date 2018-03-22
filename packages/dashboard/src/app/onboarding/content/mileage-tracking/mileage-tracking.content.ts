let images  = {
  actionTypes: require('../../../../assets/image/actiontypes.png'),
  dashboardExample: require('../../../../assets/image/dashboardExample.gif'),
  smsExample: require('../../../../assets/image/smsExample.gif')
};
export const pickProduct = [
  `Pick the first product that you want to build`
];

export const overview = [
  `
To start tracking mileage, you need to plug in our SDK into your app, let us know when you want to start tracking mileage, and call our mileage API. 

<br />
Follow this quickstart to go-live in production. Let’s get started.\n\n<div class="markdown-content-image"><img class="integration-overview" src="https://s3.amazonaws.com/dashboard-v3-assets/IntegrationOverview.png" alt="Integration file" /> </div>
  `
];

export const pickPlatform = [
  `Pick the platform on which your driver app is made`
];

export const getMileage = [
`
Call action mileage method in the app, or action mileage API from your backend to get real time mileage for the action.
`
];

export const fcmGcm = [
  `
  To track in real time, we need a way to control our SDK from our server. We use GCM/FCM to do so by sending silent notifications to our SDK that is plugged in your app. Doing so also helps us with better battery optimization and adds robustness in recovering from crashes.
  `
];

export const actionOverview = [
  `
An action is a transaction being performed by a User for which you want to track the mileage. 
 \n\n
E.g., if you want your sales team to expense mileage for sales visits, create a **visit** action. If you want to track mileage to charge your customers for the rides, create a **dropoff** action. 

<div class="markdown-content-image"><img class="action-types" style="height: 120px" src=${images.actionTypes} alt="Action types" /> </div>
`,
`
The mileage tracking starts as soon as you assign the action. You can assign action either from your app, <a href="https://docs.hypertrack.com/api/entities/action.html#create-an-action" target="_blank">or from your backend.</a> <br />You can add one or more parameters to the action object that you create.
`
];

export const completeAction = [
  `
Whenever you want to stop tracking mileage, call the \`completeAction\` method in our SDK. You can get the final mileage of the action again by calling the same API
  `
];

export const setupDashboard = [
 `
HyperTrack provides you with a tracking experience for every order, which may have multiple actions with the same \`LOOKUP_ID\`. Now that you have a live order, let’s track this order within your own dashboard view. 
 
E.g., it could be view where you show a list of all your orders. You may want to add a “TRACK” button next to each of the orders. On tap of that button, you can open our HyperTrack order tracking widget. 
 
The widget requires you to pass the \`LOOKUP_ID\` (which in your case is the Order Id), and your secret key (so that your dashboard user doesn’t need a HyperTrack login).
<div class="markdown-content-image"><img class="dashboard-example-overview" style="height: 300px; margin-top: 12px" src=${images.dashboardExample} alt="Dashboard Overview" /> </div>
 `
];

export const setupSMS = [
  `
HyperTrack provides you with an unique tracking URL for every action that you assign to your users. The URL can be shared directly with your customers via text message, email, etc.
 
To get the tracking URL of an action, retrieve the Action object that you created in last step.\n\n
<div class="markdown-content-image"><img class="sms-overview" style="height: 330px;margin-top: 12px" src=${images.smsExample} alt="SMS Overview" /> </div>
 `
];

export const consumerAndroidApp = [
`
In case your AppTheme adds an \`ActionBar\` by default, add the following under your Activity's theme style-tag in \`styles.xml\` file. This is to disable default Action Bar for the activity containing \`HyperTrackMapFragment\` in order to enable support for Android AppBar. Refer to Android documentation on Setting up the AppBar.
`,
`
Call \`trackAction\` method with the Action ID that you want to track.
`,
`
<ol>
<li class="active">Firstly, add the following xml snippet in your view layout, to enable the HyperTrack map fragment. </li>
<li class="inactive"> Secondly, instantiate \`HyperTrackMapFragment\` in the onCreate method of the activity in which map fragment has been included.</li>
<li class="inactive"> Optionally, To enable customizations for UI elements, you need to create a class overriding \`HyperTrackMapAdapter\`. This \`HyperTrackMapAdapter\` class instance then needs to be set using the \`HyperTrackMapFragment.setHTMapAdapter()\` method.</li>
<li class="inactive"> Optionally, if you want to get callback on various events which happen on \`HyperTrackMapFragment\`, you need to instantiate an implementation of the class \`MapFragmentCallback\`. This instance then needs to be set using the \`HyperTrackMapFragment.setMapFragmentCallback()\` method. For more callback methods, please refer to the reference for more info.</li>
<li class="inactive">Whenever the status of actions are changed then \`onActionStatusChanged\` method will invoke and similarly when the Action data refreshed then onActionRefreshed method will invoke with the list of updated actions id.</li>
<li class="inactive">Once all this is done, the code snippet would look like as shown and once you have the ActionIds to be tracked on the map, your are ready to track actions on the map.</li>
</ol>
`,
`
<ol>
<li class="inactive">Firstly, add the following xml snippet in your view layout, to enable the HyperTrack map fragment. </li>
<li class="active"> Secondly, instantiate \`HyperTrackMapFragment\` in the onCreate method of the activity in which map fragment has been included.</li>
<li class="inactive"> Optionally, To enable customizations for UI elements, you need to create a class overriding \`HyperTrackMapAdapter\`. This \`HyperTrackMapAdapter\` class instance then needs to be set using the \`HyperTrackMapFragment.setHTMapAdapter()\` method.</li>
<li class="inactive"> Optionally, if you want to get callback on various events which happen on \`HyperTrackMapFragment\`, you need to instantiate an implementation of the class \`MapFragmentCallback\`. This instance then needs to be set using the \`HyperTrackMapFragment.setMapFragmentCallback()\` method. For more callback methods, please refer to the reference for more info.</li>
<li class="inactive">Whenever the status of actions are changed then \`onActionStatusChanged\` method will invoke and similarly when the Action data refreshed then onActionRefreshed method will invoke with the list of updated actions id.</li>
<li class="inactive">Once all this is done, the code snippet would look like as shown and once you have the ActionIds to be tracked on the map, your are ready to track actions on the map.</li>
</ol>
`,
`
<ol>
<li class="inactive">Firstly, add the following xml snippet in your view layout, to enable the HyperTrack map fragment. </li>
<li class="inactive"> Secondly, instantiate \`HyperTrackMapFragment\` in the onCreate method of the activity in which map fragment has been included.</li>
<li class="active"> Optionally, To enable customizations for UI elements, you need to create a class overriding \`HyperTrackMapAdapter\`. This \`HyperTrackMapAdapter\` class instance then needs to be set using the \`HyperTrackMapFragment.setHTMapAdapter()\` method.</li>
<li class="inactive"> Optionally, if you want to get callback on various events which happen on \`HyperTrackMapFragment\`, you need to instantiate an implementation of the class \`MapFragmentCallback\`. This instance then needs to be set using the \`HyperTrackMapFragment.setMapFragmentCallback()\` method. For more callback methods, please refer to the reference for more info.</li>
<li class="inactive">Whenever the status of actions are changed then \`onActionStatusChanged\` method will invoke and similarly when the Action data refreshed then onActionRefreshed method will invoke with the list of updated actions id.</li>
<li class="inactive">Once all this is done, the code snippet would look like as shown and once you have the ActionIds to be tracked on the map, your are ready to track actions on the map.</li>
</ol>
`,
`
<ol>
<li class="inactive">Firstly, add the following xml snippet in your view layout, to enable the HyperTrack map fragment. </li>
<li class="inactive"> Secondly, instantiate \`HyperTrackMapFragment\` in the onCreate method of the activity in which map fragment has been included.</li>
<li class="inactive"> Optionally, To enable customizations for UI elements, you need to create a class overriding \`HyperTrackMapAdapter\`. This \`HyperTrackMapAdapter\` class instance then needs to be set using the \`HyperTrackMapFragment.setHTMapAdapter()\` method.</li>
<li class="active"> Optionally, if you want to get callback on various events which happen on \`HyperTrackMapFragment\`, you need to instantiate an implementation of the class \`MapFragmentCallback\`. This instance then needs to be set using the \`HyperTrackMapFragment.setMapFragmentCallback()\` method. For more callback methods, please refer to the reference for more info.</li>
<li class="inactive">Whenever the status of actions are changed then \`onActionStatusChanged\` method will invoke and similarly when the Action data refreshed then onActionRefreshed method will invoke with the list of updated actions id.</li>
<li class="inactive">Once all this is done, the code snippet would look like as shown and once you have the ActionIds to be tracked on the map, your are ready to track actions on the map.</li>
</ol>
`,
`
<ol>
<li class="inactive">Firstly, add the following xml snippet in your view layout, to enable the HyperTrack map fragment. </li>
<li class="inactive"> Secondly, instantiate \`HyperTrackMapFragment\` in the onCreate method of the activity in which map fragment has been included.</li>
<li class="inactive"> Optionally, To enable customizations for UI elements, you need to create a class overriding \`HyperTrackMapAdapter\`. This \`HyperTrackMapAdapter\` class instance then needs to be set using the \`HyperTrackMapFragment.setHTMapAdapter()\` method.</li>
<li class="inactive"> Optionally, if you want to get callback on various events which happen on \`HyperTrackMapFragment\`, you need to instantiate an implementation of the class \`MapFragmentCallback\`. This instance then needs to be set using the \`HyperTrackMapFragment.setMapFragmentCallback()\` method. For more callback methods, please refer to the reference for more info.</li>
<li class="active">Whenever the status of actions are changed then \`onActionStatusChanged\` method will invoke and similarly when the Action data refreshed then onActionRefreshed method will invoke with the list of updated actions id.</li>
<li class="inactive">Once all this is done, the code snippet would look like as shown and once you have the ActionIds to be tracked on the map, your are ready to track actions on the map.</li>
</ol>
`,
`
<ol>
<li class="inactive">Firstly, add the following xml snippet in your view layout, to enable the HyperTrack map fragment. </li>
<li class="inactive"> Secondly, instantiate \`HyperTrackMapFragment\` in the onCreate method of the activity in which map fragment has been included.</li>
<li class="inactive"> Optionally, To enable customizations for UI elements, you need to create a class overriding \`HyperTrackMapAdapter\`. This \`HyperTrackMapAdapter\` class instance then needs to be set using the \`HyperTrackMapFragment.setHTMapAdapter()\` method.</li>
<li class="inactive"> Optionally, if you want to get callback on various events which happen on \`HyperTrackMapFragment\`, you need to instantiate an implementation of the class \`MapFragmentCallback\`. This instance then needs to be set using the \`HyperTrackMapFragment.setMapFragmentCallback()\` method. For more callback methods, please refer to the reference for more info.</li>
<li class="inactive">Whenever the status of actions are changed then \`onActionStatusChanged\` method will invoke and similarly when the Action data refreshed then onActionRefreshed method will invoke with the list of updated actions id.</li>
<li class="active">Once all this is done, the code snippet would look like as shown and once you have the \`ActionIds\` to be tracked on the map, your are ready to track actions on the map.</li>
</ol>
`,
`
Call \`removeActions\` method to clear the map view when the user leaves your app.
`

];

export const consumerIosApp = [
  `
Call \`trackActionFor\` method with the Action ID that you want to track.
`,
`
<ol>
<li class="active">Firstly, initialize HyperTrack Map instance.</li>
<li class="inactive"> Secondly, if you want to get callback on various events which happen on HyperTrack map, add \`HTViewInteractionDelegate\` extension to your view controller and set it using \`hyperTrackMap.setHTViewInteractionDelegate\` API.</li>
<li class="inactive"> Optionally, if you want to enable customizations for UI elements, add \`HTViewCustomizationDelegate\` extension to your view controller. Once this is done you can implement customization methods to conform to your app's theme and set it using \`hyperTrackMap.setHTViewCustomizationDelegate\` API.</li>
</ol>
`,
`
<ol>
<li class="inactive">Firstly, initialize HyperTrack Map instance.</li>
<li class="active"> Secondly, if you want to get callback on various events which happen on HyperTrack map, add \`HTViewInteractionDelegate\` extension to your view controller and set it using \`hyperTrackMap.setHTViewInteractionDelegate\` API.</li>
<li class="inactive"> Optionally, if you want to enable customizations for UI elements, add \`HTViewCustomizationDelegate\` extension to your view controller. Once this is done you can implement customization methods to conform to your app's theme and set it using \`hyperTrackMap.setHTViewCustomizationDelegate\` API.</li>
</ol>
`,
`
<ol>
<li class="inactive">Firstly, initialize HyperTrack Map instance.</li>
<li class="inactive"> Secondly, if you want to get callback on various events which happen on HyperTrack map, add \`HTViewInteractionDelegate\` extension to your view controller and set it using \`hyperTrackMap.setHTViewInteractionDelegate\` API.</li>
<li class="active"> Optionally, if you want to enable customizations for UI elements, add \`HTViewCustomizationDelegate\` extension to your view controller. Once this is done you can implement customization methods to conform to your app's theme and set it using \`hyperTrackMap.setHTViewCustomizationDelegate\` API.
<blockquote>
<p> <strong> Handle Back Button click</strong> <br /> In order to handle back button click, \`didTapBackButton\` API needs to be implemented as depicted in the code snippet. </p>
</blockquote>
</li>
</ol>
`,
`
Add a UIView where the HyperTrack Map view will be embedded.
<blockquote>
<p> <strong> For Full screen HyperTrack map view</strong> <br /> In case you want a full screen HyperTrack map view, embed your View controller's view as \`hyperTrackMap.embedIn(self.view)\`. </p>
</blockquote>
`
];

export const dashboardProduct = [
`
HyperTrack provides you with a ready-to-use order tracking experience that you can embed into your customer’s app. Select the first app within which you want to embed the experience.
`
];
