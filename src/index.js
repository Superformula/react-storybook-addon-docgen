import React from 'react';
import addons from "@storybook/addons";
import {EVENT_ID} from './constants';
import StoryDocsWrapper from './StoryDocsWrapper';

export { StoryDocsWrapper };

export default (fn) => {
  let story = fn();

  const channel = addons.getChannel();

  let docgen;
  if (story.type === StoryDocsWrapper) {
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

  channel.emit(EVENT_ID, {docgen});
  return fn();
}
