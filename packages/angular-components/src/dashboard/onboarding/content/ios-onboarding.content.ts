export const iosOnboardingContent = [{
  "name": "1 | Install SDK",
  "label": "Install SDK in your app",
  "status": "active",
  "content": [{
    "type" : "code-block",
    "swift": {
      "fileName": "Podfile",
      "lines": [{
        "start": 4,
        "end": 5
      }],
      "language": "swift",
      "fileURL": "https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/Podfile"
    },
    "objectivec": {
      "fileName": "Podfile",
      "fileURL": "https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/Podfile",
      "lines": [{
        "start": 3,
        "end": 3
      },
        {
          "start": 10,
          "end": 18
        }
      ]
    }
  },
    {
      "type" : "code-block",
      "swift": {
        "fileName": "AppDelegate.Swift",
        "language": "swift",
        "fileURL": "https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/AppDelegate.swift",
        "lines": [{
          "start": 10,
          "end": 10
        },
          {
            "start": 19,
            "end": 24
          }
        ]

      },
      "objectivec": {
        "fileName": "AppDelegate.m",
        "fileURL": "https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/AppDelegate.m",
        "lines": [{
          "start": 10,
          "end": 10
        },
          {
            "start": 45,
            "end": 50
          }
        ]
      }
    }
  ]
}, {
  "name": "2 | Set permissions",
  "label": "Enable bidirectional communication in your app",
  "status": "incomplete",
  "content": [{
    "label": "Ask your users permission to access location. Before this, make sure to go to the Info tab in your app settings and add permission strings for \"Privacy - Location Always Usage Description\" and \"Privacy - Motion Usage Description\"",
    "type" : "code-block",
    "swift": {
      "fileName": "AppDelegate.Swift",
      "language": "swift",
      "fileURL": "https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/AppDelegate.swift",
      "lines": [{
        "start": 26,
        "end": 33
      }]
    },
    "objectivec": {
      "fileName": "AppDelegate.m",
      "language": "objectivec",
      "fileURL": "https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/AppDelegate.m",
      "lines": [{
        "start": 52,
        "end": 60
      }]
    }
  }, {
    "label": "Setup your Xcode environment",
    "type" : "video-block",
    "content" : "<p>Turn on Background Modes and make sure the following options are selected </p> <ul> <li>Location updates</li>\n <li>Background Fetch</li>\n <li>Remote Notifications</li> </ul>",
    "url" : "https://s3-us-west-2.amazonaws.com/hypertrack-ios-sdk/HyperTrack/turn-on-bg-capabilities.mp4"
  }]
}, {
  "name": "3 | Enable communication",
  "status": "incomplete",
  "content": [{
    "label": "Enable bidirectional communication between server and SDK using APNs.<br /><br /> If you don’t have APNs in your app, <a href=\"https://docs.moengage.com/v1.0/docs/apns-certificate-pem-file\" target=\"_blank\">follow this guide</a> for basic setup.",
    "type" : "code-block",
    "swift": {
      "fileName": "AppDelegate.Swift"

    },
    "objectivec": {
      "fileName": "AppDelegate.m"

    }
  }]
}, {
  "name": "4 | Add user",
  "label": "Create your first user",
  "status": "incomplete",
  "content": [{
    "type" : "code-block",
    "swift": {
      "fileName": "ViewController.Swift",
      "language ": "swift",
      "fileURL": "https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/ViewController.swift",
      "lines": [{
        "start": 10,
        "end": 10
      },
        {
          "start": 44,
          "end": 68
        },
        {
          "start": 76,
          "end": 78
        }
      ]

    },
    "objectivec": {
      "fileName": "ViewController.m",
      "language ": "objectivec",
      "fileURL": "https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/ViewController.m",
      "lines": [{
        "start": 10,
        "end": 10
      },
        {
          "start": 44,
          "end": 70
        },
        {
          "start": 76,
          "end": 78
        }
      ]

    }
  }]
}, {
  "name": "5 | Create action",
  "status": "incomplete",
  "content": [{
    "label": "Actions are what you int\"end \"to be tracking with HyperTrack. Actions typically correspond to the key actions that your users perform in your app: e.g., visit, meetup, pickup, delivery, and so on. Learn more about how you can build your use case with Actions.",
    "type" : "action-picker",
    "actionSwitchList": [{
      "icon": "",
      "title": "DELIVERY",
      "description": "Create a delivery action with an expected place and expected time that, for example, auto-completes when the user arrives at the expected place.",
      "content" : {
        "label": "Create a delivery action with an expected place and expected time that, for example, auto-completes when the user arrives at the expected place.",
        "title": "DELIVERY",
        "fileName": "LoginActivity.java",
        "fileURL": "https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java",
        "lines": [{
          "start": 119,
          "end": 130
        },
          {
            "start": 134,
            "end": 152
          },
          {
            "start": 155,
            "end": 186
          }
        ],
        "language": "java"
      }
    }, {
      "icon": "",
      "title": "VISIT",
      "description": "Create a visit action with no expected place. Mark it complete using an API call.",
      "content" : {
        "label": "Create a delivery action with an expected place and expected time that, for example, auto-completes when the user arrives at the expected place.",
        "title": "DELIVERY",
        "fileName": "LoginActivity.java",
        "fileURL": "https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java",
        "lines": [{
          "start": 119,
          "end": 130
        },
          {
            "start": 134,
            "end": 152
          },
          {
            "start": 155,
            "end": 186
          }
        ],
        "language": "java"
      }
    }, {
      "icon": "",
      "title": "TRACK THROUGH THE DAY",
      "description": "In case you want to track a user through the day, set up a rule that auto-creates an action at the start of the day and auto-completes it at the end of the day."
    }]
  }]
}, {
  "name": "6 | Track action",
  "status": "incomplete",
  "content": [{
    "type" : "track-options",
    "cards" : [{
      "title" : "Dashboard",
      "text" : "Track here <a href=\"https://dashboard.hypertrack.com/list/actions\" target=\"_blank\">https://dashboard.hypertrack.com/list/actions.\n</a>",
      "cta" : {
        "text" : "Track on dashboard",
        "url" : ""
      }
    },{
      "title" : "Tracking URL",
      "text" : "Track using the unique trck.at tracking URL that was sent in response to create-action API. Here is the URL for the action you just created: <a href=\"https://dashboard.hypertrack.com/list/actions\" target=\"_blank\">https://dashboard.hypertrack.com/list/actions.</a>",
      "cta" : {
        "text" : "Track on Unique URL",
        "url" : ""
      }
    },{
      "title" : "Track in mobile app",
      "text" : "Follow the tutorial to build your own tracking experience within your Android app, iOS app or Web app using our SDKs.",
      "cta" : {
        "text" : "See guide",
        "url" : ""
      }
    }]
  }]
}];
