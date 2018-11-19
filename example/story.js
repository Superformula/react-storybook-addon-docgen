import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import docs from '../src';
import StoryDocsWrapper from '../src/StoryDocsWrapper'

import Button from './Button';
import ButtonDocs from './ButtonDocs';
import ButtonSimple from './ButtonSimple';

storiesOf('ButtonDocs', module)
  .addDecorator(docs)
  .add(
    'simple usage',
    () => <ButtonDocs label="The Button" onClick={action('onClick')} />,
  )
  .add(
    'another usage',
    () => <ButtonDocs label="Another Button" onClick={action('another onClick')} />,
  );

storiesOf('Button', module)
  .addDecorator(docs)
  .add(
    'simple usage',
    () => <Button label="The Button" onClick={action('onClick')} />,
  );

storiesOf('ButtonSimple', module)
  .addDecorator(docs)
  .add(
    'simple usage',
    () => <ButtonSimple label="The Button" onClick={action('onClick')} />,
  )
  .add(
    'multiple usage in a div wrapper',
    () => (
      <React.Fragment>
        <ButtonSimple label="Button1" onClick={action('onClick')} />
        <ButtonSimple label="Button2" onClick={action('onClick')} />
      </React.Fragment>
    ),
    { docgen: { component: ButtonSimple }}
  )
  .add(
    'multiple usage in a div wrapper (deprecated)',
    () => (
      <StoryDocsWrapper component={ButtonSimple}>
        <ButtonSimple label="Button1" onClick={action('onClick')} />
        <ButtonSimple label="Button2" onClick={action('onClick')} />
      </StoryDocsWrapper>
    )
  );
