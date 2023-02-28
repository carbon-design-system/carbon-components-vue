<!-- Use this as the "nothing" instead of CvWrapper when you need a a dom/component or nothing
Example:
Instead of
<cv-wrapper :tag-type="something ? 'span' : ''">
<h1>Hello</h1>
</cv-wrapper>

Which will produce either the h1 element wrapped in a span or unwrapped.
<span>
<h1>Hello</h1>
</span>
or just
<h1>Hello</h1>

Instead of that use the built-in component tag like this:
<component :is="something ? 'span' : CvEmpty">
<h1>Hello</h1>
</component>
-->
<template>
  <slot v-bind="$attrs"></slot>
</template>
