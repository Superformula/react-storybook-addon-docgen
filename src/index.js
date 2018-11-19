import React from 'react';
import addonAPI, { makeDecorator } from "@storybook/addons";
import {EVENT_ID} from './constants';
import StoryDocsWrapper from './StoryDocsWrapper';

export { StoryDocsWrapper };

export default makeDecorator({
  name: 'withDocgen',
  parameterName: 'docgen',
  wrapper: (storyFn, context, { parameters }) => {
    const story = storyFn(context);

    let docgen;
    if (parameters && parameters.component) {
      docgen = parameters.component.__docgenInfo;
    } else if (story.type === StoryDocsWrapper) {
      docgen = story.props.component.__docgenInfo;
    } else if (story.type.derivedComponents) {
      const derivedComponents = [].concat(story.type.derivedComponents);
      docgen = _.cloneDeep(story.type.__docgenInfo);
      docgen.props = _.merge(
        docgen.props,
        ...derivedComponents.map(x => x.__docgenInfo && x.__docgenInfo.props ? x.__docgenInfo.props : {})
      );
    } else {
      docgen = story.type.__docgenInfo;
    }

    const channel = addonAPI.getChannel();
    channel.emit(EVENT_ID, {docgen});

    return story;
  }
})