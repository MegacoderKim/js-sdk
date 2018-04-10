export const installStep = [
  {
    fileName: 'Terminal',
    code: `npm install react-native-hypertrack --save
react-native link react-native-hypertrack`,
    language: 'shell'
  },
  {
    android: {
      fileName: 'build.gradle',
      code: `repositories {
    maven { url 'http://hypertrack-android-sdk.s3-website-us-west-2.amazonaws.com/' }
}`,
      language: 'gradle'
    },
    ios: {
      fileName: 'Podfile',
      fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/ios/Podfile',
      lines: [
        {
          start: 6,
          end: 18
        }
      ],
      code: `use_frameworks!,

pod 'HyperTrack'

post_install do |installer|
      installer.pods_project.targets.each do |target|
          target.build_configurations.each do |config|
              config.build_settings['SWIFT_VERSION'] = '3.0'
          end
      end
end`,
      language: 'perl'
    }
  },
  {
    fileName: 'index.js',
    fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/app/index.js',
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
    code: `import {RNHyperTrack as RNHyperTrackImport} from 'react-native-hypertrack';
...
RNHyperTrack.initialize(YOUR_PUBLISHABLE_KEY);`,
    language: 'javascript'
  }
];

export const permissionsStep = [
  {
    fileName: 'index.js',
    code: `// NOTE: In Android, the Permission dialog box's title and message can be customized by passing them as parameters.
RNHyperTrack.requestLocationAuthorization(title, message);
// Call this method to request Location Authorization for Android & iOS (Always Authorization).
// NOTE: In iOS, the permission strings are used to define message. Parameters title and message are ignored.
RNHyperTrack.requestLocationAuthorization(title, message);
// Call this method to request Motion Authorization for iOS.
// NOTE: Motion Authorization is required only for iOS. This API will return an error in Android.
RNHyperTrack.requestMotionAuthorization();
`,
    language: 'js'
  }
];

export const trackingStep = [
  {
    fileName: 'index.js',
    fileURL: 'https://raw.githubusercontent.com/hypertrack/react-native-sdk-onboarding/master/app/index.js',
    lines: [
      {
        start: 38,
        end: 42
      },
      {
        start: 49,
        end: 54
      }
    ],
    code: `RNHyperTrack.getOrCreateUser(this.state.name, this.state.phone, this.state.phone, (success) => {
      RNHyperTrack.startTracking((success) => {
        ...
      }, (error) => {
        ...
      });
    }, (error) => {
      ...
    })`,
    language: 'javascript'
  }
];
