/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import { withKnobs } from '@storybook/addon-knobs/angular';
import { configure, addDecorator } from '@storybook/angular';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'Angular Hypertrack'
});

addDecorator(withKnobs);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
