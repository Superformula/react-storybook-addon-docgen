import addonAPI, { makeDecorator } from '@storybook/addons';
import { EVENT_ID } from './constants';
import StoryDocsWrapper from './StoryDocsWrapper';
import merge from 'lodash.merge';

export { StoryDocsWrapper };

function getComponentDocgenInfo(component) {
  if (component.type === StoryDocsWrapper) {
    return getComponentDocgenInfo({ type: component.props.component });
  } else if (
    component.type.derivedComponents &&
    component.type.derivedComponents.length > 0
  ) {
    const derivedComponents = component.type.derivedComponents;
    return merge(
      {},
      derivedComponents[derivedComponents.length - 1].__docgenInfo,
      ...derivedComponents.slice(0, -1).map(c => {
        const docgenInfo = getComponentDocgenInfo({ type: c });
        return docgenInfo ? { props: docgenInfo.props } : {};
      })
    );
  } else {
    return component.type.__docgenInfo;
  }
}

export default makeDecorator({
  name: 'withDocgen',
  parameterName: 'docgen',
  wrapper: (storyFn, context, { parameters }) => {
    const story = storyFn(context);

    let docgen;
    if (parameters && parameters.component) {
      docgen = getComponentDocgenInfo({ type: parameters.component });
    } else {
      docgen = docgen = getComponentDocgenInfo(story);
    }

    const channel = addonAPI.getChannel();
    channel.emit(EVENT_ID, { docgen });

    return story;
  }
});
