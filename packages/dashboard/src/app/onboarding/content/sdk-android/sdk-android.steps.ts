import * as SDKContent from './sdk-android.content';
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
            fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/build.gradle',
            fileLinkUrl: 'https://github.com/hypertrack/android-sdk-onboarding/blob/master/app/build.gradle',
            lines: [
              {
                start: 8,
                end: 8
              },
              {
                start: 23,
                end: 30
              },
              {
                start: 42,
                end: 52
              }
            ],
            fileName: 'build.gradle',
            language: 'gradle'
          }
        }
      },
      {
        label: "Install the SDK - 2",
        leftPane: SDKContent.installSdk[1],
        rightPane: {
          type: 'code',
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/MyApplication.java',
            fileLinkUrl: 'https://github.com/hypertrack/android-sdk-onboarding/blob/master/app/src/main/java/com/hypertrack/androidsdkonboarding/MyApplication.java',
            lines: [
              {
                start: 17,
                end: 22
              }
            ],
            fileName: 'MyApplication.java',
            language: 'java'
          }
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
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java',
            fileLinkUrl: 'https://github.com/hypertrack/android-sdk-onboarding/blob/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java',
            lines: [
              {
                start: 65,
                end: 77
              },
              {
                start: 79,
                end: 98
              },
              {
                start: 188,
                end: 213
              },
              {
                start: 215,
                end: 235
              }
            ],
            fileName: 'LoginActivity.java',
            language: 'java'
          }
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
        leftPane: SDKContent.createUser[0],
        rightPane: {
          type: 'code',
          data: {
            fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java',
            fileLinkUrl: 'https://github.com/hypertrack/android-sdk-onboarding/blob/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java',
            lines: [
              {
                start: 119,
                end: 130
              },
              {
                start: 134,
                end: 152
              }
            ],
            fileName: 'LoginActivity.java',
            language: 'java'
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
            fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java',
            fileLinkUrl: 'https://github.com/hypertrack/android-sdk-onboarding/blob/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java',
            lines: [
              {
                start: 155,
                end: 186
              }
            ],
            fileName: 'LoginActivity.java',
            language: 'java'
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
            fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/MainActivity.java',
            fileLinkUrl: 'https://github.com/hypertrack/android-sdk-onboarding/blob/master/app/src/main/java/com/hypertrack/androidsdkonboarding/MainActivity.java',
            lines: [
              {
                start: 39,
                end: 40
              }
            ],
            fileName: 'MainActivity.java',
            language: 'java'
          }
        }
      }
    ],
    id: 'step-stop-tracking'
  }
];
