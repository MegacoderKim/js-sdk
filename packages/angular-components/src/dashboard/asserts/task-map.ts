import {IAction, IActionMap} from "ht-models";
const TaskInvertedAssets = {
    delivery: require('images/map/delivery_inverted.png'),
    pickup: require('images/map/pickup_inverted.png'),
    task: require('images/map/task_inverted.png'),
    visit: require('images/map/visit_inverted.png')
};
const TaskNormalAssets = {
    delivery: require('images/map/delivery_normal.png'),
    pickup: require('images/map/pickup_normal.png'),
    task: require('images/map/task_normal.png'),
    visit: require('images/map/visit_normal.png')
};

const ActionSolidGreen = {
  delivery: require('images/map/delivery_solid_green.png'),
  pickup: require('images/map/pickup_solid_green.png'),
  task: require('images/map/task_solid_green.png'),
  visit: require('images/map/visit_solid_green.png')
};

const ActionGreen = {
  delivery: require('images/map/delivery_green.png'),
  pickup: require('images/map/pickup_green.png'),
  task: require('images/map/task_green.png'),
  visit: require('images/map/visit_green.png')
};

const ActionSolidRed = {
  delivery: require('images/map/delivery_solid_red.png'),
  pickup: require('images/map/pickup_solid_red.png'),
  task: require('images/map/task_solid_red.png'),
  visit: require('images/map/visit_solid_red.png')
};

const ActionRed = {
  delivery: require('images/map/delivery_red.png'),
  pickup: require('images/map/pickup_red.png'),
  task: require('images/map/task_red.png'),
  visit: require('images/map/visit_red.png')
};

const ActionGrey = {
  delivery: require('images/map/delivery_grey.png'),
  pickup: require('images/map/pickup_grey.png'),
  task: require('images/map/task_grey.png'),
  visit: require('images/map/visit_grey.png')
};

const ActionIconsAssets = {
  ongoing: {
    ontime: ActionGreen,
    late: ActionRed,
  },
  completed: {
    ontime: ActionSolidGreen,
    late: ActionSolidRed
  }
}

export const TaskMapIcons = (type, isInverted: boolean = true) => {
    let asset = isInverted ? TaskInvertedAssets : TaskNormalAssets;
    return asset[type] || asset['task']
};

export const ActionExpectedIcon = (type: string) => {
  return ActionGrey[type] || ActionGrey['task']
};

export const ActionIcon = (action: IAction | IActionMap) => {
  let ontime = action.display.is_late ? 'late' : 'ontime';
  let ongoing = action.completed_at ? 'completed' : 'ongoing';
  let asset = ActionIconsAssets[ongoing][ontime];
  return asset[action.type] || asset['task']
}
