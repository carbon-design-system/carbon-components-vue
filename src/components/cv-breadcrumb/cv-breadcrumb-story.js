import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvBreadcrumbNotesMD from './cv-breadcrumb-notes.md';
import CvBreadcrumb from './cv-breadcrumb';
import CvBreadcrumbItem from './cv-breadcrumb-item';

const stories = storiesOf('CvBreadcrumb', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  noTrailingSlash: boolean('No trailing slash', false, consts.CONFIG)
    ? ' no-trailing-slash'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'Default',
  withNotes(CvBreadcrumbNotesMD)(() => {
    const settings = knobs();

    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-breadcrumb${settings.otherAttributes}${settings.noTrailingSlash}>
  <cv-breadcrumb-item>Abc</cv-breadcrumb-item>
  <cv-breadcrumb-item>Def</cv-breadcrumb-item>
  <cv-breadcrumb-item>ghi</cv-breadcrumb-item>
</cv-breadcrumb>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvBreadcrumb, CvBreadcrumbItem, SvTemplateView },
      template: templateViewString,
    };
  })
);

stories.add(
  'with-links',
  withNotes(CvBreadcrumbNotesMD)(() => {
    const settings = knobs();

    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-breadcrumb${settings.otherAttributes}${settings.noTrailingSlash}>
  <cv-breadcrumb-item>
    <cv-link href="outer">outer-link</cv-link>
  </cv-breadcrumb-item>
  <cv-breadcrumb-item>
    <cv-link href="parent">parent-link</cv-link>
  </cv-breadcrumb-item>
  <cv-breadcrumb-item>
    <input type="text" value="name of thing"></input>
  </cv-breadcrumb-item>
</cv-breadcrumb>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvBreadcrumb, CvBreadcrumbItem, SvTemplateView },
      template: templateViewString,
    };
  })
);
