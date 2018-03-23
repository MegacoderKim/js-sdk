export const installStep = [
  {
    swift: {
      fileName: 'Podfile',
      lines: [
        {
          start: 4,
          end: 5
        }
      ],
      fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/Podfile',
      code: `use_frameworks!
pod 'HyperTrack'`,
    },
    objectivec: {
      fileName: 'Podfile',
      fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/Podfile',
      lines: [
        {start: 3, end: 3},
        {
          start: 10,
          end: 18
        }
      ],
      code: `use_frameworks!

pod 'HyperTrack'

post_install do |installer|
      installer.pods_project.targets.each do |target|
          target.build_configurations.each do |config|
              config.build_settings['SWIFT_VERSION'] = '3.0'
          end
      end
end
      `
    }
  },
  {
    swift: {
      fileName: 'AppDelegate.Swift',
      fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/AppDelegate.swift',
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
      code: `import HyperTrack\nHyperTrack.initialize(YOUR_PUBLISHABLE_KEY)`
    },
    objectivec: {
      fileName: 'AppDelegate.m',
      fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/AppDelegate.m',
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
      code: `@import HyperTrack;\n[HyperTrack initialize:@YOUR_PUBLISHABLE_KEY];`
    },
  }
];

export const permissionsStep = [
  {
    swift: {
      fileName: 'AppDelegate.Swift',
      fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/AppDelegate.swift',
      lines: [
        {
          start: 26,
          end: 33
        }
      ],
      code: `HyperTrack.requestAlwaysAuthorization()\nHyperTrack.requestMotionAuthorization()`
    },
    objectivec: {
      fileName: 'AppDelegate.m',
      fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/AppDelegate.m',
      lines: [
        {
          start: 52,
          end: 60
        }
      ],
      code: `[HyperTrack requestAlwaysAuthorization];\n[HyperTrack requestMotionAuthorization];`
    },
  }
];

export const communicationStep = [
  {
    swift: {
      fileName: 'AppDelegate.Swift',
      code: `HyperTrack.registerForNotifications()
...
HyperTrack.didRegisterForRemoteNotificationsWithDeviceToken(deviceToken: deviceToken)
...
HyperTrack.didFailToRegisterForRemoteNotificationsWithError(error: error)
...
HyperTrack.didReceiveRemoteNotification(userInfo: userInfo)
...`
    },
    objectivec: {
      fileName: 'AppDelegate.m',
      code: `[HyperTrack registerForNotifications];
...
[HyperTrack didRegisterForRemoteNotificationsWithDeviceTokenWithDeviceToken:deviceToken];
...
[HyperTrack didFailToRegisterForRemoteNotificationsWithErrorWithError:error];
...
[HyperTrack didReceiveRemoteNotificationWithUserInfo:userInfo];`
    },
  }
];

export const trackingStep = [
  {
    swift: {
      fileName: 'ViewController.Swift',
      fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-swift/master/HyperTrackOnboarding/ViewController.swift',
      lines: [
        {
          start: 10,
          end: 10
        },
        {
          start: 44,
          end: 68
        },
        {
          start: 76,
          end: 78
        }
      ],
      code: `import HyperTrack

HyperTrack.getOrCreateUser(“testUser”, _phone: “0000”, “0000”) 
{ (user, error) in
    if (error != nil) {
        self.showAlert("Error", message: (error?.type.rawValue)!)
        return
    } 
    if (user != nil) {
        HyperTrack.startMockTracking()
    }
}`
    },
    objectivec: {
      fileName: 'ViewController.m',
      fileURL: 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/HyperTrackOnboarding/ViewController.m',
      lines: [
        {
          start: 10,
          end: 10
        },
        {
          start: 44,
          end: 70
        },
        {
          start: 76,
          end: 78
        }
      ],
      code: `NSString *userName = _userNameField.text;
NSString *phoneNumber = _phoneNumberField.text;
NSString *lookupId = _phoneNumberField.text;

[HyperTrack getOrCreateUser:userName _phone:phoneNumber :lookupId
          completionHandler:^(HyperTrackUser * _Nullable user,
                              HyperTrackError * _Nullable error) {
    if (user) {        
        [self startMockTracking];       
    } else {
        [self showAlert:@"Error while creating user" message:error.debugDescription];
        NSLog(@"%@", error.debugDescription);
    }
}];
`
    },
  }
];
