import * as SharedContent from './shared.content';

export const slackAlertSteps = [
  {
    label: 'Setup Slack alerts',
    subSteps: [
      {
        label: "Setup Slack Alerts",
        leftPane: SharedContent.slackAlerts[0],
        rightPane: {
          type: 'image',
          data: {
            fileSrc: "https://i2.wp.com/blog.hypertrack.com/wp-content/uploads/2017/06/Screen-Shot-2017-06-01-at-7.55.38-PM.png"
          }
        },
        id: 'substep-setup-slack'
      },
    ],
    id: 'step-setup-slack'
  }
];
