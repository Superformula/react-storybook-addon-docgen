import React from 'react';
import addons from '@storybook/addons';

import DocPanel from './DocPanel';

import {ADDON_ID, PANEL_ID} from './constants';

addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel();
  addons.addPanel(PANEL_ID, {
    title: 'Docs',
    render: ({ active }) => {
      return <DocPanel active={active} channel={channel} api={api} />;
    },
  });
});
