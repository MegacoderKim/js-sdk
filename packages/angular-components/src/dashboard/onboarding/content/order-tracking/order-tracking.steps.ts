import * as OrderTrackingContent from './order-tracking.content';
import { steps as SDKAndroidSteps} from '../sdk-android/sdk-android.steps';
import { steps as SDKIosSteps} from '../sdk-ios/sdk-ios.steps';
import { steps as SDKReactNativeSteps} from '../sdk-reactnative/sdk-reactnative.steps';
import { steps as FCMBasicSteps, newProjectsteps as FcmGcmNewProjectSteps} from '../fcm-gcm/gcm-fcm.steps';
import {getStepById, getSubStepsCopy} from '../../shared/helper.util';

let images = {
  dashboardExample: require('../../../../assets/image/dashboardExample.gif'),
  actionTypes: require('../../../../assets/image/actiontypes.png')
};
export const steps = [
  {
    label: 'Getting started',
    subSteps: [
      {
        label: "Tell us more",
        leftPane: OrderTrackingContent.pickProduct[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-pick-product'
      },
      {
        label: "Overview",
        leftPane: OrderTrackingContent.overview[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        }
      }
    ],
    id: 'step-getting-started'
  },
  {
    label: 'Plug SDK',
    subSteps: [
      {
        label: "Pick platform",
        leftPane: OrderTrackingContent.pickPlatform[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-pick-platform'
      }
    ],
    id: 'step-plug-sdk'
  },
  {
    label: 'Setup real time',
    subSteps: [],
    id: 'step-real-timeness'
  },
  {
    label: 'Start tracking',
    subSteps: [],
    id: 'step-start-tracking'
  },
  {
    label: 'Assign action',
    subSteps: [],
    id: 'step-assign-action'
  },
  {
    label: 'Track action',
    subSteps: [],
    id: 'step-track-action'
  },
  {
    label: 'Complete action',
    subSteps: [],
    id: 'step-complete-action'
  },
  {
    label: 'Stop tracking',
    subSteps: [],
    id: 'step-stop-tracking'
  }
];

export const androidSteps = [
  {
    label: 'Install SDK',
    subSteps: [
      ...getStepById(SDKAndroidSteps, 'step-install-sdk').subSteps,
      ...getStepById(SDKAndroidSteps, 'step-enable-location').subSteps,
      ...getStepById(SDKAndroidSteps, 'step-identify-device').subSteps
    ],
    id: 'step-install-sdk'
  },
  {
    label: 'Setup FCM',
    subSteps: [
      ...FCMBasicSteps[0].subSteps
    ],
    id: 'step-fcm'
  },
  getStepById(SDKAndroidSteps, 'step-start-tracking'),
  {
    label: 'Actions',
    subSteps: [
      {
        label: "Action Overview",
        leftPane: OrderTrackingContent.actionOverview[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'java'
          }
        },
        id: 'substep-action-overview'
      },
      {
        label: "Assign Action",
        leftPane: OrderTrackingContent.actionOverview[1],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/orderTracking/OrderTracking.java',
            fileURL: 'https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/orderTracking/OrderTracking.java',
            lines: [
              {
                start: 130,
                end: 190
              },
              {
                start: 194,
                end: 209
              }
            ],
            fileName: 'OrderTracking.java',
            language: 'java'
          }
        },
        id: 'substep-assign-action'
      }
    ],
    id: "step-assign-action"
  },
  {
    label: 'Complete Action',
    subSteps: [
      {
        label: "Complete Action",
        leftPane: OrderTrackingContent.completeAction[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/orderTracking/OrderTracking.java',
            fileURL: 'https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/orderTracking/OrderTracking.java',
            lines: [
              {
                start: 117,
                end: 118
              }
            ],
            fileName: 'OrderTracking.java',
            language: 'java'
          }
        }
      }
    ],
    id: "step-complete-action"
  },
  getStepById(SDKAndroidSteps, 'step-stop-tracking'),
];

export const iosSteps = [
  {
    label: 'Install SDK',
    subSteps: [
      ...getStepById(SDKIosSteps, 'step-install-sdk').subSteps,
      ...getStepById(SDKIosSteps, 'step-enable-location').subSteps,
      ...getStepById(SDKIosSteps, 'step-identify-device').subSteps
    ],
    id: 'step-install-sdk'
  },
  getStepById(SDKIosSteps, 'step-start-tracking'),
  {
    label: 'Actions',
    subSteps: [
      {
        label: "Action Overview",
        leftPane: OrderTrackingContent.actionOverview[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-action-overview'
      },
      {
        label: "Assign Action",
        leftPane: OrderTrackingContent.actionOverview[1],
        rightPane: {
          type: 'code',
          data: [{
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/LogoutController.swift',
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/LogoutController.swift',
            lines: [
              {
                start: 46,
                end: 79
              }
            ],
            fileName: 'LogoutController.swift',
            language: 'swift',
            optionId: 'swift',
            optionLabel: 'Swift'
          }, {
            fileLinkUrl: `https://github.com/hypertrack/ios-sdk-onboarding-objc/blob/master/HyperTrackOnboarding/LogoutController.m`,
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/LogoutController.m',
            lines: [
              {
                start: 49,
                end: 80
              }
            ],
            fileName: 'LogoutController.m',
            language: 'objectivec',
            optionId: 'objc',
            optionLabel: 'Objective-C'
          }]
        },
        id: 'substep-assign-action'
      }
    ],
    id: "step-assign-action"
  },
  {
    label: 'Complete Action',
    subSteps: [
      {
        label: "Complete Action",
        leftPane: OrderTrackingContent.completeAction[0],
        rightPane: {
          type: 'code',
          data: [{
            fileURL: `https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/LogoutController.swift`,
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/LogoutController.swift',
            lines: [
              {
                start: 92,
                end: 93
              }
            ],
            fileName: 'LogoutController.swift',
            language: 'swift',
            optionId: 'swift',
            optionLabel: 'Swift'
          },{
            fileLinkUrl: `https://github.com/hypertrack/ios-sdk-onboarding-objc/blob/master/HyperTrackOnboarding/LogoutController.m`,
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/LogoutController.m',
            lines: [
              {
                start: 93,
                end: 94
              }
            ],
            fileName: 'LogoutController.m',
            language: 'objectivec',
            optionId: 'objc',
            optionLabel: 'Objective-C'
          }]
        }
      }
    ],
    id: "step-complete-action"
  },
  getStepById(SDKIosSteps, 'step-stop-tracking'),
];

export const reactNativeSteps = [
  {
    label: 'Install SDK',
    subSteps: [
      ...getStepById(SDKReactNativeSteps, 'step-install-sdk').subSteps,
      ...getStepById(SDKReactNativeSteps, 'step-identify-device').subSteps
    ],
    id: 'step-install-sdk'
  },
  getStepById(SDKReactNativeSteps, 'step-start-tracking'),
  {
    label: 'Actions',
    subSteps: [
      {
        label: "Action Overview",
        leftPane: OrderTrackingContent.actionOverview[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-action-overview'
      },
      {
        label: "Assign Action",
        leftPane: OrderTrackingContent.actionOverview[1],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: `https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/MainActivity.java`,
            fileURL: 'https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/MainActivity.java',
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'java'
          }
        },
        id: 'substep-assign-action'
      }
    ],
    id: "step-assign-action"
  },
  getStepById(SDKReactNativeSteps, 'step-stop-tracking'),
];

export const dashboardProductSteps = [
  {
    label: 'Setup Dashboard',
    subSteps: [
      {
        label: "Setup Dashboard",
        leftPane: OrderTrackingContent.setupDashboard[0],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://gist.githubusercontent.com/rishabhgrg/14612d257c43856142a5dfeccec71060/raw/99ccb3663551742bcd36d009d8314e61e32ec519/index.html",
            fileLinkUrl: "https://gist.github.com/rishabhgrg/14612d257c43856142a5dfeccec71060",
            lines: [
              {
                start: 1,
                end: 3
              }
            ],
            fileName: 'index.html',
            language: 'html'
          }
        },
        id: 'substep-setup-dashboard'
      }
    ],
    id: 'step-product-dashboard'
  }
];

export const smsProductSteps = [
  {
    label: 'Setup SMS/Email',
    subSteps: [
      {
        label: "Setup SMS/Email",
        leftPane: OrderTrackingContent.setupSMS[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/orderTracking/OrderTracking.java',
            fileURL: 'https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/orderTracking/OrderTracking.java',
            lines: [
              {
                start: 172,
                end: 180
              }
            ],
            fileName: 'OrderTracking.java',
            language: 'java'
          }
        },
        id: 'substep-setup-sms'
      }
    ],
    id: 'step-product-sms'
  }
];

export const sdkProductSteps = [
  {
    label: 'Setup SDK',
    subSteps: [
      {
        label: "Pick platform",
        leftPane: OrderTrackingContent.dashboardProduct[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            fileLinkUrl: "#",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-consumer-platform'
      }
    ],
    id: 'step-product-sdk'
  }
];


let installSubSteps = getSubStepsCopy(getStepById(SDKAndroidSteps, 'step-install-sdk').subSteps);
installSubSteps.forEach((subStep) => {
  if (subStep.id) {
    subStep.id = subStep.id +  "-consumer";
  }
  subStep.showSignupBox = false;
});
export const androidConsumerSteps = [
  {
    label: 'Consumer App',
    subSteps: [
      ...installSubSteps,
      {
        label: "Disable ActionBar",
        leftPane: OrderTrackingContent.consumerAndroidApp[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: "https://github.com/hypertrack/live-tracking-consumer-example-android/blob/master/app/src/main/res/values/styles.xml#L11",
            fileURL: "https://raw.githubusercontent.com/hypertrack/live-tracking-consumer-example-android/master/app/src/main/res/values/styles.xml",
            lines: [
              {
                start: 11,
                end: 16
              }
            ],
            fileName: 'styles.xml',
            language: 'xml'
          }
        },
        id: 'substep-action-bar'
      },
      {
        label: "Track Action",
        leftPane: OrderTrackingContent.consumerAndroidApp[1],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: "https://github.com/hypertrack/live-tracking-consumer-example-android/blob/master/app/src/main/java/io/hypertrack/livetrackingconsumer/MainActivity.java",
            fileURL: "https://raw.githubusercontent.com/hypertrack/live-tracking-consumer-example-android/master/app/src/main/java/io/hypertrack/livetrackingconsumer/MainActivity.java",
            lines: [
              {
                start: 63,
                end: 91
              }
            ],
            fileName: 'MainActivity.java',
            language: 'java'
          }
        },
        id: 'substep-track-action'
      },
      {
        label: "Setup Activity",
        leftPane: OrderTrackingContent.consumerAndroidApp[2],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/live-tracking-consumer-example-android/master/app/src/main/res/layout/content_track.xml",
            fileLinkUrl: "https://github.com/hypertrack/live-tracking-consumer-example-android/blob/master/app/src/main/res/layout/content_track.xml",
            lines: [
              {
                start: 11,
                end: 16
              }
            ],
            fileName: 'content_track.xml',
            language: 'xml'
          }
        },
        id: 'substep-setup-activity-1'
      },
      {
        label: "Setup Activity",
        leftPane: OrderTrackingContent.consumerAndroidApp[3],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/android-live-tracking-view/master/app/src/main/java/io/hypertrack/livetrackingconsumer/YourMapActivity.java",
            fileLinkUrl: "https://github.com/hypertrack/android-live-tracking-view/blob/master/app/src/main/java/io/hypertrack/livetrackingconsumer/YourMapActivity.java",
            lines: [
              {
                start: 22,
                end: 22
              },
              {
                start: 27,
                end: 31
              }
            ],
            fileName: 'YourMapActivity.java',
            language: 'java'
          }
        },
        id: 'substep-setup-activity-2'
      },
      {
        label: "Setup Activity",
        leftPane: OrderTrackingContent.consumerAndroidApp[4],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/live-tracking-consumer-example-android/master/app/src/main/java/io/hypertrack/livetrackingconsumer/MyMapAdapter.java",
            fileLinkUrl: "https://github.com/hypertrack/live-tracking-consumer-example-android/blob/master/app/src/main/java/io/hypertrack/livetrackingconsumer/MyMapAdapter.java",
            lines: [
              {
                start: 1,
                end: 26
              }
            ],
            fileName: 'MyMapAdapter.java',
            language: 'java'
          }
        },
        id: 'substep-setup-activity-3'
      },
      {
        label: "Setup Activity",
        leftPane: OrderTrackingContent.consumerAndroidApp[5],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/android-live-tracking-view/master/app/src/main/java/io/hypertrack/livetrackingconsumer/YourMapActivity.java",
            fileLinkUrl: "https://github.com/hypertrack/android-live-tracking-view/blob/master/app/src/main/java/io/hypertrack/livetrackingconsumer/YourMapActivity.java",
            lines: [
              {
                start: 39,
                end: 42
              },
            ],
            fileName: 'YourMapActivity.java',
            language: 'java'
          }
        },
        id: 'substep-setup-activity-4'
      },
      {
        label: "Setup Activity",
        leftPane: OrderTrackingContent.consumerAndroidApp[6],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/android-live-tracking-view/master/app/src/main/java/io/hypertrack/livetrackingconsumer/MyMapFragmentCallback.java",
            fileLinkUrl: "https://github.com/hypertrack/android-live-tracking-view/blob/master/app/src/main/java/io/hypertrack/livetrackingconsumer/MyMapFragmentCallback.java",
            lines: [
              {
                start: 23,
                end: 44
              }
            ],
            fileName: 'MyMapFragmentCallback.java',
            language: 'java'
          }
        },
        id: 'substep-setup-activity-5'
      },
      {
        label: "Setup Activity",
        leftPane: OrderTrackingContent.consumerAndroidApp[7],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/android-live-tracking-view/master/app/src/main/java/io/hypertrack/livetrackingconsumer/YourMapActivity.java",
            fileLinkUrl: "https://github.com/hypertrack/android-live-tracking-view/blob/master/app/src/main/java/io/hypertrack/livetrackingconsumer/YourMapActivity.java",
            lines: [
              {
                start: 27,
                end: 42
              }
            ],
            fileName: 'YourMapActivity.java',
            language: 'java'
          }
        },
        id: 'substep-setup-activity-6'
      },
      {
        label: "Clear View",
        leftPane: OrderTrackingContent.consumerAndroidApp[8],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/android-live-tracking-view/master/app/src/main/java/io/hypertrack/livetrackingconsumer/MainActivity.java",
            fileLinkUrl: "https://github.com/hypertrack/android-live-tracking-view/blob/master/app/src/main/java/io/hypertrack/livetrackingconsumer/MainActivity.java",
            lines: [
              {
                start: 96,
                end: 97
              }
            ],
            fileName: 'MainActivity.java',
            language: 'java'
          }
        },
        id: 'substep-clear-view'
      },
    ],
    id: 'step-android-consumer'
  }
];

let installiOSSubSteps = getSubStepsCopy(getStepById(SDKIosSteps, 'step-install-sdk').subSteps);
installiOSSubSteps.forEach((subStep) => {
  if (subStep.id) {
    subStep.id = subStep.id +  "-consumer";
  }
  subStep.showSignupBox = false;
});
export const iosConsumerSteps = [
  {
    label: 'Consumer App',
    subSteps: [
      ...installiOSSubSteps,
      {
        label: "Track Action",
        leftPane: OrderTrackingContent.consumerIosApp[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: "https://github.com/hypertrack/ios-live-tracking-view-swift/blob/master/LiveTrackingOnboarding/MainViewController.swift  ",
            fileURL: "https://raw.githubusercontent.com/hypertrack/ios-live-tracking-view-swift/master/LiveTrackingOnboarding/MainViewController.swift",
            lines: [
              {
                start: 34,
                end: 35
              }
            ],
            fileName: 'MainViewController.swift',
            language: 'swift'
          }
        },
        id: 'substep-track-action'
      },
      {
        label: "Setup ViewController",
        leftPane: OrderTrackingContent.consumerIosApp[1],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/ios-live-tracking-view-swift/master/LiveTrackingOnboarding/LiveTrackingViewController.swift",
            fileLinkUrl: "https://github.com/hypertrack/ios-live-tracking-view-swift/blob/master/LiveTrackingOnboarding/LiveTrackingViewController.swift#L20-L21 ",
            lines: [
              {
                start: 20,
                end: 21
              }
            ],
            fileName: 'LiveTrackingViewController',
            language: 'swift'
          }
        },
        id: 'substep-setup-activity-1'
      },
      {
        label: " Embed HyperTrack view in your ViewController",
        leftPane: OrderTrackingContent.consumerIosApp[4],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://raw.githubusercontent.com/hypertrack/ios-live-tracking-view-swift/master/LiveTrackingOnboarding/LiveTrackingViewController.swift ",
            fileLinkUrl: "https://github.com/hypertrack/ios-live-tracking-view-swift/blob/master/LiveTrackingOnboarding/LiveTrackingViewController.swift  ",
            lines: [
              {
                start: 15,
                end: 15
              },
              {
                start: 27,
                end: 28
              }
            ],
            fileName: 'MainViewController.swift',
            language: 'swift'
          }
        },
        id: 'substep-embed-htview'
      },
    ],
    id: 'step-ios-consumer'
  }
];
