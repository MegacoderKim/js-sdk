import * as MileageTrackingContent from './mileage-tracking.content';
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
        label: "Overview",
        leftPane: MileageTrackingContent.overview[0],
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
        leftPane: MileageTrackingContent.pickPlatform[0],
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
    label: 'Get mileage',
    subSteps: [
      {
        label: "Get mileage",
        leftPane: MileageTrackingContent.getMileage[0],
        rightPane: {
          type: 'code',
          data: {
            fileURL: "https://gist.githubusercontent.com/rishabhgrg/fcd6d20ef48588e2c74c375803d61b00/raw/0b9e4139a969565f66afa9bcc29ecd347f9dd5d7/meterActions.sh",
            fileLinkUrl: "https://gist.github.com/rishabhgrg/fcd6d20ef48588e2c74c375803d61b00",
            lines: [
              {
                start: 1,
                end: 4
              }
            ],
            fileName: 'meterActions.sh',
            language: 'bash'
          }
        }
      }
    ],
    id: 'step-get-mileage'
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
        leftPane: MileageTrackingContent.actionOverview[0],
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
        leftPane: MileageTrackingContent.actionOverview[1],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: `https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/mileageTracking/MileageTracking.java`,
            fileURL: 'https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/mileageTracking/MileageTracking.java',
            lines: [
              {
                start: 180,
                end: 229
              },
              {
                start: 233,
                end: 247
              }
            ],
            fileName: 'MileageTracking.java',
            language: 'java'
          }
        }
      }
    ],
    id: "step-assign-action"
  },
  {
    label: 'Complete Action',
    subSteps: [
      {
        label: "Complete Action",
        leftPane: MileageTrackingContent.completeAction[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: `https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/mileageTracking/MileageTracking.java`,
            fileURL: 'https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/mileageTracking/MileageTracking.java',
            lines: [
              {
                start: 125,
                end: 126
              }
            ],
            fileName: 'MileageTracking.java',
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
        leftPane: MileageTrackingContent.actionOverview[0],
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
        leftPane: MileageTrackingContent.actionOverview[1],
        rightPane: {
          type: 'code',
          data: [{
            fileLinkUrl: `https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/LogoutController.swift`,
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
        }
      }
    ],
    id: "step-assign-action"
  },
  {
    label: 'Complete Action',
    subSteps: [
      {
        label: "Complete Action",
        leftPane: MileageTrackingContent.completeAction[0],
        rightPane: {
          type: 'code',
          data: [{
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/LogoutController.swift',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/LogoutController.swift',
            lines: [
              {
                start: 92,
                end: 93
              }
            ],
            fileName: 'LogoutController.swift',
            language: 'swift'
          }, {
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
        leftPane: MileageTrackingContent.actionOverview[0],
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
        leftPane: MileageTrackingContent.actionOverview[1],
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
        }
      }
    ],
    id: "step-assign-action"
  },
  getStepById(SDKReactNativeSteps, 'step-stop-tracking'),
];
