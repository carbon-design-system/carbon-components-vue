import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import './cv-tabs-story.scss';

import CvTabsNotesMD from '../../packages/core/src/components/cv-tabs/cv-tabs-notes.md';
import { CvTab, CvTabs, CvTabsSkeleton } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvTabs', module);
// const storiesExperimental = storiesOf('Experimental/CvTabs', module);

let preKnobs = {
  container: {
    group: 'attr',
    type: boolean,
    config: ['Container', false],
    prop: 'container',
  },
  selected: {
    group: 'tab2',
    type: boolean,
    config: ['2-selected', false], // consts.CONFIG],
    prop: 'selected',
  },
  disabled: {
    group: 'tab4',
    type: boolean,
    config: ['4-disabled', false],
    prop: 'disabled',
  },
  events: {
    group: 'attr',
    value: `@tab-selected="actionSelected"`,
  },
};

let variants = [{ name: 'default' }, { name: 'minimal', excludes: ['events', 'selected', 'disabled'] }];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      let withId;
      if (story.name === 'minimal') {
        withId = () => '';
      } else {
        withId = id => `id="tab-${id}"`;
      }

      const templateString = `
<cv-tabs${settings.group.attr} aria-label="navigation tab label">
  <cv-tab ${withId(1)}label="Tab link 1">
    Sample tab panel content 1
  </cv-tab>
  <cv-tab ${withId(2)}label="Tab link 2" ${settings.group.tab2}>
    Sample tab panel content 2
  </cv-tab>
  <cv-tab ${withId(3)}label="Tab link 3">
    Sample tab panel content 3
  </cv-tab>
  <cv-tab ${withId(4)}label="Tab link 4" ${settings.group.tab4}>
    Sample tab panel content 4
  </cv-tab>
  <cv-tab ${withId(5)}label="Tab link 5">
    Sample tab panel content 5 <a href="javascript:void(0)">with some active content</a>
  </cv-tab>
</cv-tabs>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvTabs, CvTab, SvTemplateView },
        methods: {
          actionSelected: action('Cv Tabs - tab-selected'),
          actionBeingSelected: action('Cv Tabs - tab-beingselected'),
        },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvTabsNotesMD },
    }
  );
}

// tabs from data set
variants = [{ name: 'tabs from data', includes: ['container'] }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-tabs${settings.group.attr} aria-label="navigation tab label" @tab-selected="onTabSelected">
  <cv-tab :key="tab.name" :label="tab.label" v-for="(tab, index) in activeSet" v-html="tab.content" :data-selected="index===selectedIndex" :selected="index === selectedIndex">
  </cv-tab>
</cv-tabs>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <button @click="changeSet">Change set</button>
        <button @click="addToSet()">Add to set</button>
        <button @click="addToSet(true)">Add to set & select</button>
        <button @click="removeFromSet">Remove from set</button>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvTabs, CvTab, SvTemplateView },
        data() {
          return {
            dataSet1: [
              {
                name: 'item1',
                label: 'Item 1',
                content: 'Content for item 1',
              },
              {
                name: 'item2',
                label: 'Item 2',
                content: 'Content for item 2',
              },
            ],
            dataSet2: [
              {
                name: 'item3',
                label: 'Item 3',
                content: 'Content for item 3',
              },
              {
                name: 'item4',
                label: 'Item 4',
                content: 'Content for item 4',
              },
            ],
            activeSet: undefined,
            selectedIndex: 0,
          };
        },
        methods: {
          actionSelected: action('Cv Tabs - tab-selected'),
          actionBeingSelected: action('Cv Tabs - tab-beingselected'),
          changeSet() {
            this.activeSet = this.activeSet === this.dataSet1 ? this.dataSet2 : this.dataSet1;
            this.selectedIndex = 0;
          },
          addToSet(selectNew) {
            const id = `${Date.now()}`;
            this.activeSet.push({
              name: id,
              label: `${id}`,
              content: `Content for ${id}`,
            });
            if (selectNew) {
              this.selectedIndex = this.activeSet.length - 1;
            }
          },
          removeFromSet() {
            const rnd = Math.floor(Math.random() * this.activeSet.length);
            this.activeSet.splice(rnd, 1);
          },
          onTabSelected(index) {
            this.selectedIndex = index;
          },
        },
        template: templateViewString,
        props: settings.props,
        mounted() {
          this.activeSet = this.dataSet1;
        },
      };
    },
    {
      notes: { markdown: CvTabsNotesMD },
    }
  );
}

// cv-tabs-skeleton

preKnobs = {};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
      <cv-tabs-skeleton></cv-tabs-skeleton>
      `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
    `;

      return {
        components: { CvTabsSkeleton, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvTabsNotesMD },
    }
  );
}
