import { storiesOf } from '@storybook/vue';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';

import CvGridNotesMD from '../../packages/core/src/components/cv-grid/cv-grid-notes.md';
import { CvGrid, CvRow, CvColumn } from '../../packages/core/src/';

import './cv-grid-story.scss';

const storiesDefault = storiesOf('Components/CvGrid', module);

const components = { CvGrid, CvRow, CvColumn, SvTemplateView };
const getTemplate = content => `
    <sv-template-view
      sv-margin
      sv-source='${content.trim()}'>
      <template slot="component">
        <div class="cv-grid-story">
          ${content}
        </div>
      </template>
    </sv-template-view>
  `;

storiesDefault.add(
  'Auto-columns',
  () => ({
    components,
    template: getTemplate(`
<cv-grid>
  <cv-row>
    <cv-column><div class="cv-grid-story__preview-col">span 25%</div></cv-column>
    <cv-column><div class="cv-grid-story__preview-col">span 25%</div></cv-column>
    <cv-column><div class="cv-grid-story__preview-col">span 25%</div></cv-column>
    <cv-column><div class="cv-grid-story__preview-col">span 25%</div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);

storiesDefault.add(
  'Condensed grid',
  () => ({
    components,
    template: getTemplate(`
<cv-grid kind="condensed">
  <cv-row>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);

storiesDefault.add(
  'Condensed row',
  () => ({
    components,
    template: getTemplate(`
<cv-grid>
  <cv-row>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
  <cv-row kind="condensed">
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
  <cv-row>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);

storiesDefault.add(
  'Full width grid',
  () => ({
    components,
    template: getTemplate(`
<cv-grid fullWidth>
  <cv-row>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);

storiesDefault.add(
  'Row kinds',
  () => ({
    components,
    template: getTemplate(`
<cv-grid>
  <cv-row>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">default</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
  <cv-row kind="narrow">
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">narrow</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
  <cv-row kind="condensed">
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">condensed</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);

storiesDefault.add(
  'Narrow grid',
  () => ({
    components,
    template: getTemplate(`
<cv-grid kind="narrow">
  <cv-row>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);

storiesDefault.add(
  'Narrow row',
  () => ({
    components,
    template: getTemplate(`
<cv-grid>
  <cv-row>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
  <cv-row kind="narrow">
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
  <cv-row>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);

storiesDefault.add(
  'Offset',
  () => ({
    components,
    template: getTemplate(`
<cv-grid>
  <cv-row>
    <cv-column :sm="{ span: 1, offset: 3 }"><div class="cv-grid-story__preview-col">small: offset 3</div></cv-column>
    <cv-column :sm="{ span: 2, offset: 2 }"><div class="cv-grid-story__preview-col">small: offset 2</div></cv-column>
    <cv-column :sm="{ span: 3, offset: 1 }"><div class="cv-grid-story__preview-col">small: offset 1</div></cv-column>
    <cv-column :sm="{ span: 4, offset: 0 }"><div class="cv-grid-story__preview-col">small: offset 0</div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);

storiesDefault.add(
  'Responsive',
  () => ({
    components,
    template: getTemplate(`
<cv-grid>
  <cv-row>
    <cv-column :sm="2" :md="4" :lg="6"><div class="cv-grid-story__preview-col">
      <p>small: span 2 of 4</p>
      <p>medium: span 4 of 8</p>
      <p>large: span 6 of 12</p>
    </div></cv-column>
    <cv-column :sm="2" :md="2" :lg="3"><div class="cv-grid-story__preview-col">
      <p>small: span 2 of 4</p>
      <p>medium: span 2 of 8</p>
      <p>large: span 3 of 12</p>
    </div></cv-column>
    <cv-column :sm="0" :md="2" :lg="3"><div class="cv-grid-story__preview-col">
      <p>small: span 0 of 4</p>
      <p>medium: span 2 of 8</p>
      <p>large: span 3 of 12</p>
    </div></cv-column>
  </cv-row>
</cv-grid>
    `),
  }),
  {
    notes: { markdown: CvGridNotesMD },
  }
);
