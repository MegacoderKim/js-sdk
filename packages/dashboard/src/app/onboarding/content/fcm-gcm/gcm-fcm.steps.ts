import * as FcmGcmContent from './fcm-gcm.content';
import {getSubStepById} from "../../shared/helper.util";
let images = {
  fcmGif: require('../../../../assets/image/fcm.gif'),
  fcmGif1: require('../../../../assets/image/fcm-step-1.gif'),
  fcmGif2: require('../../../../assets/image/fcm-step-2.gif'),
  fcmGif3: require('../../../../assets/image/fcm-step-3.jpg'),
  fcmGif4: require('../../../../assets/image/fcm-step-4.jpg'),
  fcmGif5: require('../../../../assets/image/fcm-step-5.png'),
  serverKeyGif: require('../../../../assets/image/server-key-fcm.gif')
};

export const steps = [
  {
    label: 'FCM',
    subSteps: [
      {
        label: "Overview",
        leftPane: FcmGcmContent.fcmOverview[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-fcm-overview'
      }
    ],
    id: 'step-fcm-overview'
  }
];

export const newProjectsteps = [
  {
    label: 'FCM',
    subSteps: [
      {
        label: "FCM Overview",
        leftPane: FcmGcmContent.fcmOverview[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-fcm-overview'
      },
      {
        label: "Create an API project",
        leftPane: FcmGcmContent.createAPIProject[0],
        rightPane: {
          type: 'image',
          data: {
            fileSrc: images.fcmGif1
          }
        }
      },
      {
        label: "Create an API project",
        leftPane: FcmGcmContent.createAPIProject[1],
        rightPane: {
          type: 'image',
          data: {
            fileSrc: images.fcmGif2
          }
        }
      },
      {
        label: "Create an API project",
        leftPane: FcmGcmContent.createAPIProject[2],
        rightPane: {
          type: 'image',
          data: {
            fileSrc: images.fcmGif3
          }
        }
      },
      {
        label: "Create an API project",
        leftPane: FcmGcmContent.createAPIProject[3],
        rightPane: {
          type: 'image',
          data: {
            fileSrc: images.fcmGif4
          }
        }
      },
      {
        label: "Create an API project",
        leftPane: FcmGcmContent.createAPIProject[4],
        rightPane: {
          type: 'image',
          data: {
            fileSrc: images.fcmGif5
          }
        }
      },
      {
        label: "Project configuration",
        leftPane: FcmGcmContent.configProjectLevel[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/build.gradle',
            fileURL: 'https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/build.gradle',
            lines: [
              {
                start: 9,
                end: 9
              }
            ],
            fileName: 'build.gradle',
            language: 'gradle'
          }
        }
      },
      {
        label: "Project configuration",
        leftPane: FcmGcmContent.configAppLevel[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/build.gradle',
            fileURL: 'https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/build.gradle',
            lines: [
              {
                start: 44,
                end: 44
              }
            ],
            fileName: 'build.gradle',
            language: 'gradle'
          }
        }
      },
      {
        label: "Pass notification to SDK",
        leftPane: FcmGcmContent.passNotificationToSDK[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java',
            fileURL: `https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java`,
            lines: [
              {
                start: 1,
                end: 16
              }
            ],
            fileName: 'MyFirebaseMessagingService.java',
            language: 'java'
          }
        }
      },
      {
        label: "Handle your notifications",
        leftPane: FcmGcmContent.handleYourNotifications[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java#L17-L28',
            fileURL: `https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java`,
            lines: [
              {
                start: 17,
                end: 28
              }
            ],
            fileName: 'MyFirebaseMessagingService.java',
            language: 'java'
          }
        },
        id: 'handle-your-notification'
      },
      {
        label: "Add new service",
        leftPane: FcmGcmContent.passNotificationToSDK[1],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/AndroidManifest.xml#L30',
            fileURL: `https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/AndroidManifest.xml`,
            lines: [
              {
                start: 39,
                end: 45
              }
            ],
            fileName: 'AndroidManifest.xml',
            language: 'xml'
          }
        }
      },
      {
        label: "Configure Server key",
        leftPane: FcmGcmContent.configureOnDashboard[0],
        rightPane: {
          type: 'image',
          data: {
            fileSrc: images.serverKeyGif
          }
        }
      },
      {
        label: "Test notification",
        leftPane: FcmGcmContent.testFCM[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: '',
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-test-notification'
      },
    ],
    id: 'step-new-fcm'
  }
];

export const newProjectExpandedsteps = [
  {
    label: 'Overview',
    subSteps: [
      newProjectsteps[0].subSteps[0]
    ]
  },
  {
    label: 'Create project',
    subSteps: [
      newProjectsteps[0].subSteps[1],
      newProjectsteps[0].subSteps[2],
      newProjectsteps[0].subSteps[3],
      newProjectsteps[0].subSteps[4],
      newProjectsteps[0].subSteps[5]
    ]
  },
  {
    label: 'Configure SDK',
    subSteps: [
      newProjectsteps[0].subSteps[6],
      newProjectsteps[0].subSteps[7],
      newProjectsteps[0].subSteps[8],
      newProjectsteps[0].subSteps[9],
      newProjectsteps[0].subSteps[10],
      newProjectsteps[0].subSteps[11],
    ]
  },
  {
    label: 'Test',
    subSteps: [
      newProjectsteps[0].subSteps[12]
    ]
  },
];
export const existingFCMSteps = [
  {
    label: 'FCM',
    subSteps: [
      {
        label: "FCM Overview",
        leftPane: FcmGcmContent.fcmOverview[0],
        rightPane: {
          type: 'code',
          data: {
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-fcm-overview'
      },
      {
        label: "Pass notification to SDK",
        leftPane: FcmGcmContent.passNotificationToSDKExists[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java',
            fileURL: `https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java`,
            lines: [
              {
                start: 1,
                end: 16
              }
            ],
            fileName: 'MyFirebaseMessagingService.java',
            language: 'java'
          }
        },
        id: 'pass-notification-sdk'
      },
      {
        label: "Handle your notifications",
        leftPane: FcmGcmContent.handleYourNotifications[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: 'https://github.com/hypertrack/use-cases-example-android/blob/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java#L17-L28',
            fileURL: `https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java`,
            lines: [
              {
                start: 17,
                end: 28
              }
            ],
            fileName: 'MyFirebaseMessagingService.java',
            language: 'java'
          }
        },
        id: 'handle-your-notification'
      },
      {
        label: "Configure Server key",
        leftPane: FcmGcmContent.configureOnDashboard[0],
        rightPane: {
          type: 'image',
          data: {
            fileSrc: images.serverKeyGif
          }
        },
        id: 'configure-server-key'
      },
      {
        label: "Test notification",
        leftPane: FcmGcmContent.testFCM[0],
        rightPane: {
          type: 'code',
          data: {
            fileLinkUrl: '',
            fileContent: "",
            lines: [],
            fileName: '',
            language: 'javascript'
          }
        },
        id: 'substep-test-notification'
      }
    ],
    id: 'step-existing-fcm'
  }
];
export const existingExpandedFCMSteps = [
  {
    label: 'Overview',
    subSteps: [
      getSubStepById(existingFCMSteps[0].subSteps, 'substep-fcm-overview')
    ]
  },
  {
    label: 'Notify SDK',
    subSteps: [
      getSubStepById(existingFCMSteps[0].subSteps, 'pass-notification-sdk'),
      getSubStepById(existingFCMSteps[0].subSteps, 'handle-your-notification')
    ]
  },
  {
    label: 'Server Key',
    subSteps: [
      getSubStepById(existingFCMSteps[0].subSteps, 'configure-server-key')
    ]
  },
  {
    label: 'Test',
    subSteps: [
      getSubStepById(existingFCMSteps[0].subSteps, 'substep-test-notification')
    ]
  },
];
