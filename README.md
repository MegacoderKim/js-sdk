# Live tracking visuals for the Web

This open source repo helps you visualize live location and activity data of your users on a web app. The data is generated using the HyperTrack SDKs. See sample of these web visuals [here](https://dashboard.hypertrack.com/demo).

## Usage

1. Set up SDK in your user's app by signing up [here](https://www.hypertrack.com/signup?utm_source=github&utm_campaign=js_sdk), and then integrating the SDK into your app

2. Clone this repository
```bash
# Clone this repository
$ git clone https://github.com/hypertrack/js-sdk.git
```

## Documentation
For detailed documentation of the APIs, customizations and what all you can build using HyperTrack, please visit the official [docs](https://docs.hypertrack.com/js-sdk/).



## Support
Join our [Slack community](http://slack.hypertrack.com) for instant responses, or interact with our growing [community](https://community.hypertrack.com). You can also email us at help@hypertrack.com.


## Contribute
Feel free to clone, use, and contribute back via [pull requests](https://help.github.com/articles/about-pull-requests/). We'd love to see your pull requests - send them in! Please use the [issues tracker](https://github.com/hypertrack/js-sdk/issues) to raise bug reports and feature requests. We are excited to see what live location feature you build in your app using this project. Do ping us at help@hypertrack.io once you build one, and we would love to feature your app on our blog!

This is a mono-repo (repo containing multiple packages) managed with [lerna](https://github.com/lerna/lerna) and yarn workspaces.

#### Setup

1. `yarn` : Install lerna and other dependencies
2. `lerna run lib` : Builds all the packages
3. `lerna link`: Symlinks all internal packages

#### Adding dependency

Because the dependencies of the packages are managed by yarn workspaces, instead of using `npm install package-x` use `yarn add package-x`.
