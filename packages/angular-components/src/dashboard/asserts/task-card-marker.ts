import {IAction} from "ht-models";
export const TaskCardAssets = {
    delivery: require('images/delivery_task.png'),
    pickup: require('images/pickup_task.png'),
    task: require('images/task_task.png'),
    visit: require('images/visit_task.png'),
    stopover: require('images/task_task.png')
};

export function  TaskCardIcon(type) {
    return TaskCardAssets[type] || TaskCardAssets['task']
}

const ActionSolidGreen = {
  delivery: require('images/card/delivery_solid_green.png'),
  pickup: require('images/card/pickup_solid_green.png'),
  task: require('images/card/task_solid_green.png'),
  visit: require('images/card/visit_solid_green.png')
};

const ActionGreen = {
  delivery: require('images/card/delivery_green.png'),
  pickup: require('images/card/pickup_green.png'),
  task: require('images/card/task_green.png'),
  visit: require('images/card/visit_green.png')
};

const ActionSolidRed = {
  delivery: require('images/card/delivery_solid_red.png'),
  pickup: require('images/card/pickup_solid_red.png'),
  task: require('images/card/task_solid_red.png'),
  visit: require('images/card/visit_solid_red.png')
};

const ActionRed = {
  delivery: require('images/card/delivery_red.png'),
  pickup: require('images/card/pickup_red.png'),
  task: require('images/card/task_red.png'),
  visit: require('images/card/visit_red.png')
};

const ActionIconAssets = {
  ongoing: {
    ontime: ActionGreen,
    late: ActionRed
  },
  completed: {
    ontime: ActionSolidGreen,
    late: ActionSolidRed
  }
};

export const ActionCardIcon = (action: IAction) => {
  let ontime = action.display.is_late ? 'late' : 'ontime';
  let ongoing = action.completed_at ? 'completed' : 'ongoing';
  let asset = ActionIconAssets[ongoing][ontime];
  return asset[action.type] || asset['task']
};
