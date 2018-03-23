import * as SDKContent from './sdk-ios.content';
import {getStepById, getSubStepById} from '../../shared/helper.util';
import {slackAlertSteps as SlackAlertSteps} from '../shared/shared.steps';
export const steps = [
  {
    label: 'Install SDK',
    subSteps: [
      {
        label: "Install the SDK - 1",
        leftPane: SDKContent.installSdk[0],
        rightPane: {
          type: 'code',
          data: [{
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/Podfile',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/Podfile',
            lines: [
              {
                start: 4,
                end: 5
              }
            ],
            fileName: 'Podfile',
            language: 'ruby',
            optionId: 'swift',
            optionLabel: 'Swift'
          },
          {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/Podfile',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-objc/blob/master/Podfile',
            lines: [
              {start: 3, end: 3},
              {
                start: 10,
                end: 18
              }
            ],
            fileName: 'Podfile',
            language: 'ruby',
            optionId: 'objc',
            optionLabel: 'Objective-C'
          }],
          selectedOptionId: 'swift'
        }
      },
      {
        label: "Install the SDK - 2",
        leftPane: SDKContent.installSdk[1],
        rightPane: {
          type: 'code',
          data: [{
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/AppDelegate.swift',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/AppDelegate.swift',
            lines: [
              {
                start: 10,
                end: 10
              },
              {
                start: 19,
                end: 24
              }
            ],
            fileName: 'AppDelegate.swift',
            language: 'swift',
            optionId: 'swift',
            optionLabel: 'Swift'
          },
          {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/AppDelegate.m',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-objc/blob/master/HyperTrackOnboarding/AppDelegate.m',
            lines: [
              {
                start: 10,
                end: 10
              },
              {
                start: 45,
                end: 50
              }
            ],
            fileName: 'AppDelegate.m',
            language: 'objectivec',
            optionId: 'objc',
            optionLabel: 'Objective-C'
          }]
        },
        showSignupBox: true
      }
    ],
    id: 'step-install-sdk'
  },
  {
    label: 'Enable location',
    subSteps: [
      {
        label: "Enable location",
        leftPane: SDKContent.enableLocation[0],
        rightPane: {
          type: 'code',
          data: [{
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/AppDelegate.swift',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/AppDelegate.swift',
            lines: [
              {
                start: 26,
                end: 33
              }
            ],
            fileName: 'AppDelegate.swift',
            language: 'swift',
            optionId: 'swift',
            optionLabel: 'Swift'
          },
          {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/AppDelegate.m',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-objc/blob/master/HyperTrackOnboarding/AppDelegate.m',
            lines: [
              {
                start: 52,
                end: 60
              }
            ],
            fileName: 'AppDelegate.m',
            language: 'objectivec',
            optionId: 'objc',
            optionLabel: 'Objective-C'
          }]
        }
      }
    ],
    id: 'step-enable-location'
  },
  {
    label: 'Identify device',
    subSteps: [
      {
        label: "Identify device",
        leftPane: SDKContent.identifyDevice[0],
        rightPane: {
          type: 'code',
          data: [{
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/ViewController.swift',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/ViewController.swift',
            lines: [
              {
                start: 10,
                end: 10
              },
              {
                start: 44,
                end: 68
              }
            ],
            fileName: 'ViewController.swift',
            language: 'swift',
            optionId: 'swift',
            optionLabel: 'Swift'
          },
          {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/ViewController.m',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-objc/blob/master/HyperTrackOnboarding/ViewController.m',
            lines: [
              {
                start: 10,
                end: 10
              },
              {
                start: 44,
                end: 70
              }
            ],
            fileName: 'ViewController.m',
            language: 'objectivec',
            optionId: 'objc',
            optionLabel: 'Objective-C'
          }]
        },
        id: 'substep-identify-device'
      }
    ],
    id: 'step-identify-device'
  },
  {
    label: 'Start tracking',
    subSteps: [
      {
        label: "Start tracking",
        leftPane: SDKContent.startTracking[0],
        rightPane: {
          type: 'code',
          data: [{
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/ViewController.swift',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/ViewController.swift',
            lines: [
              {
                start: 76,
                end: 78
              }
            ],
            fileName: 'ViewController.swift',
            language: 'swift',
            optionId: 'swift',
            optionLabel: 'Swift'
          },
          {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/ViewController.m',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-objc/blob/master/HyperTrackOnboarding/ViewController.m',
            lines: [
              {
                start: 76,
                end: 78
              }
            ],
            fileName: 'ViewController.m',
            language: 'objectivec',
            optionId: 'objc',
            optionLabel: 'Objective-C'
          }]
        },
        id: 'substep-start-tracking'
      }
    ],
    id: 'step-start-tracking'
  },
  {
    label: 'Stop tracking',
    subSteps: [
      {
        label: "Stop tracking",
        leftPane: SDKContent.stopTracking[0],
        rightPane: {
          type: 'code',
          data: [{
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/LogoutController.swift',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-swift/blob/master/HyperTrackOnboarding/LogoutController.swift',
            lines: [
              {
                start: 10,
                end: 10
              },
              {
                start: 107,
                end: 109
              }
            ],
            fileName: 'LogoutController.swift',
            language: 'swift',
            optionId: 'swift',
            optionLabel: 'Swift'
          },
          {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/LogoutController.m',
            fileLinkUrl: 'https://github.com/hypertrack/ios-sdk-onboarding-objc/blob/master/HyperTrackOnboarding/LogoutController.m',
            lines: [
              {
                start: 10,
                end: 10
              },
              {
                start: 110,
                end: 112
              }
            ],
            fileName: 'LogoutController.m',
            language: 'objectivec',
            optionId: 'objc',
            optionLabel: 'Objective-C'
          }]
        }
      },
      ...getStepById(SlackAlertSteps, "step-setup-slack").subSteps
    ],
    id: 'step-stop-tracking'
  },
];
