<script setup>
import CvHeader from '../CvHeader.vue';
import CvHeaderGlobalAction from '../CvHeaderGlobalAction.vue';
import CvHeaderPanel from '../CvHeaderPanel.vue';
import CvSwitcher from '../CvSwitcher.vue';
import CvSwitcherItem from '../CvSwitcherItem.vue';
import CvSwitcherItemLink from '../CvSwitcherItemLink.vue';
</script>

<template>
  <cv-header>
    <template #header-global>
      <cv-header-global-action
        data-testid="action-button"
        aria-label="List links"
        aria-controls="links-panel"
        label="Links"
      >
        Links
      </cv-header-global-action>
    </template>
    <template #right-panels>
      <cv-header-panel id="links-panel" data-testid="links-panel">
        <cv-switcher>
          <cv-switcher-item>
            <cv-switcher-item-link
              href="javascript:void(0)"
              data-testid="link-1"
              selected
            >
              Selected app
            </cv-switcher-item-link>
          </cv-switcher-item>
          <cv-switcher-item>
            <cv-switcher-item-link
              href="javascript:void(0)"
              data-testid="link-2"
            >
              Other app
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
    </template>
  </cv-header>
  <input type="text" data-testid="outer-input" />
</template>
