import * as SDKContent from './sdk-reactnative.content';

export const steps = [
  {
    label: 'Install SDK',
    subSteps: [
      {
        label: "Install the SDK - 1",
        leftPane: SDKContent.installSdk[0],
        rightPane: {
          type: 'code',
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/install.sh',
            fileLinkUrl: 'https://github.com/hypertrack/react-native-sdk-onboarding/blob/master/install.sh',
            lines: [
              {
                start: 1,
                end: 1
              },
              {
                start: 2,
                end: 2
              }
            ],
            fileName: 'Terminal',
            language: 'bash'
          }
        }
      },
      {
        label: "Install the SDK - 2",
        leftPane: SDKContent.installSdk[1],
        rightPane: {
          type: 'code',
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/android/build.gradle',
            fileLinkUrl: 'https://github.com/hypertrack/react-native-sdk-onboarding/blob/master/android/build.gradle',
            lines: [
              {
                start: 23,
                end: 24
              }
            ],
            fileName: 'build.gradle',
            language: 'gradle'
          }
        }
      },
      {
        label: "Install the SDK - 3",
        leftPane: SDKContent.installSdk[2],
        rightPane: {
          type: 'code',
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/ios/Podfile',
            fileLinkUrl: 'https://github.com/hypertrack/react-native-sdk-onboarding/blob/master/ios/Podfile',
            lines: [
              {
                start: 6,
                end: 18
              }
            ],
            fileName: 'Podfile',
            language: 'ruby'
          }
        }
      },
      {
        label: "Install the SDK - 4",
        leftPane: SDKContent.installSdk[3],
        rightPane: {
          type: 'code',
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/app/index.js',
            fileLinkUrl: 'https://github.com/hypertrack/react-native-sdk-onboarding/blob/master/app/index.js',
            lines: [
              {
                start: 10,
                end: 19
              },
              {
                start: 31,
                end: 32
              }
            ],
            fileName: 'index.js',
            language: 'javascript'
          }
        },
        showSignupBox: true
      }
    ],
    id: 'step-install-sdk'
  },
  {
    label: 'Identify device',
    subSteps: [
      {
        label: "Identify device",
        leftPane: SDKContent.identifyDevice[0],
        rightPane: {
          type: 'code',
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/app/index.js',
            fileLinkUrl: 'https://github.com/hypertrack/react-native-sdk-onboarding/blob/master/app/index.js',
            lines: [
              {
                start: 38,
                end: 42
              }
            ],
            fileName: 'index.js',
            language: 'javascript'
          }
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
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/app/index.js',
            fileLinkUrl: 'https://github.com/hypertrack/react-native-sdk-onboarding/blob/master/app/index.js',
            lines: [
              {
                start: 49,
                end: 54
              }
            ],
            fileName: 'index.js',
            language: 'javascript'
          }
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
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/app/index.js',
            fileLinkUrl: 'https://github.com/hypertrack/react-native-sdk-onboarding/blob/master/app/index.js',
            lines: [
              {
                start: 62,
                end: 63
              }
            ],
            fileName: 'index.js',
            language: 'javascript'
          }
        }
      }
    ],
    id: 'step-stop-tracking'
  },
];
