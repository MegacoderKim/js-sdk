let codeContent = [
  `minSdkVersion 14
repositories {
    maven { url 'http://hypertrack-android-sdk.s3-website-us-west-2.amazonaws.com/' }
}
compile('com.hypertrack:android:0.6.24@aar') {
    transitive = true;
}`
];
export const installStep = [
  {
    fileName: 'build.gradle',
    code: codeContent[0],
    language: 'gradle',
    fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/build.gradle',
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
  },
  {
    fileName: 'MyApplication.java',
    code: `HyperTrack.initialize(this, YOUR_PUBLISHABLE_KEY);`,
    language: 'java',
    fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/MyApplication.java',
    lines: [
      {
        start: 17,
        end: 22
      }
    ]
  }
];

export const permissionsStep = [
  {
    fileName: 'LoginActivity.java',
    fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java',
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
    code: `HyperTrack.requestPermissions(this);
HyperTrack.requestLocationServices(this);`,
    language: 'java'
  }
];

export const communicationStep = [
  {
    fileName: 'MyFirebaseMessagingService.java',
    fileURL: `https://raw.githubusercontent.com/hypertrack/use-cases-example-android/master/app/src/main/java/com/hypertrack/usecases/firebase/MyFirebaseMessagingService.java`,
    lines: [
      {
        start: 1,
        end: 16
      }
    ],
    code: `public class MyFirebaseMessagingService extends HyperTrackFirebaseMessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        if (remoteMessage.getData() != null) {
            String sdkNotification = remoteMessage.getData().get(HT_SDK_NOTIFICATION_KEY);
            if (sdkNotification != null && sdkNotification.equalsIgnoreCase("true")) {
                /**
                 * HyperTrack notifications are received here
                 * Dont handle these notifications. This might end up in a crash
                 */
                return;
            }
        }
        // Handle your notifications here.
    }
}
`,
    language: 'java'
  }
];

export const trackingStep = [
  {
    fileName: 'LoginActivity.java',
    fileURL: 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/app/src/main/java/com/hypertrack/androidsdkonboarding/LoginActivity.java',
    lines: [
      {
        start: 119,
        end: 130
      },
      {
        start: 134,
        end: 152
      },
      {
        start: 155,
        end: 186
      }
    ],
    code: `HyperTrack.getOrCreateUser(name, phoneNumber, lookupId,
      new HyperTrackCallback() {
        @Override
        public void onSuccess(@NonNull SuccessResponse successResponse) {
          HyperTrack.startMockTracking()
        },
        ...
      }
)        
`,
    language: 'java'
  }
];
