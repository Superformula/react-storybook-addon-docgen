import React from 'react';
import {configure} from '@storybook/react';

configure(function () {
  require('../example/story');
}, module);
