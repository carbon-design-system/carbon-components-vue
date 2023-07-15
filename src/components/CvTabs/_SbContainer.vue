<template>
  <div class="sb-tabs-container">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style>
.bx--tabs--container ~ div {
  min-height: 320px;
  background-color: #e8daff;
  background-repeat: no-repeat;
  background-position: center;
}
.bx--tabs--container ~ .cv-tabs__panels:after {
  content: 'Container style is not from carbon. This example uses ".bx--tabs--container ~ div" selector to add the "#e8daff" background color.';
  opacity: 0.3;
  font-size: 30pt;
  z-index: -10;
}
</style>
