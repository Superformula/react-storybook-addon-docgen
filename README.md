**NOTE: This module is copy of [this addon](https://github.com/mihalik/react-storybook-addon-docgen). All credits go to the author.
I made a new version, since the owner is not updating the project anymore and it didn't work with storybook v3. Also there is more functionality added.**

# React Storybook Docgen Addon

A React Storybook addon to show documentation generated with docgen.

![](https://cldup.com/5TsRkHW2QE.png)

## Usage

Install the following module:

```sh
yarn add storybook-addon-docgen
```

Add this line in `addons.js` file within your storybook config directory:

```js
import 'storybook-addon-docgen/register';
```

Then add a decorator to your stories.

```js
import docs from 'storybook-addon-docgen';

storiesOf('ButtonSimple', module)
  .addDecorator(docs)
  .add(
    'simple usage',
    () => <ButtonSimple label="The Button" onClick={action('onClick')} />,
  );
```

> Have a look at [this example](example/story.js) stories to see the example usage.

## Derived Components

You can add static values on react classes, which tell which component this component derives from.
It works similiar to derives property on react-docgen, but this way you save yourself from long chains of dependencies.

## React native storybook

If you are using react native storybook and this addon doesn't work for you, it means that your .babelrc file is missing plugin.

```
"plugins": [
    ["react-docgen", { "DOC_GEN_COLLECTION_NAME": "STORYBOOK_REACT_CLASSES"}]
  ]
```

Also add `global.STORYBOOK_REACT_CLASSES = {};` somewhere in begging of your code

## The FAQ

**My component name is `undefined` or props are not displaying**

This addon is using the full information from [react-docgen](https://github.com/reactjs/react-docgen).  Look at that project for some examples on documenting components.  When creating components, set the `displayName` static property to show the correct component name on static builds.
