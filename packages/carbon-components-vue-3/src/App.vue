<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <br />
  <br />
  <CvButton @click="handleClick" class="fish" :icon="Bee20"
    >I am a button</CvButton
  >
  <CvButton kind="primary" size="field">fish</CvButton>
  <CvButton kind="secondary">fish</CvButton>
  <CvButton kind="tertiary">fish</CvButton>
  <CvButton kind="danger">fish</CvButton>
  <CvButton kind="danger--ghost">fish</CvButton>
  <!-- invalid kind and size test -->
  <!-- <CvButton kind="banana" size="banana">fish</CvButton> -->
  <CvButton kind="danger--tertiary">fish</CvButton>
  <CvButton skeleton>skeleton</CvButton>
  <br />
  <br />
  <CvIconButton :icon="Bee20" />
  <CvIconButton :icon="Bee20" kind="primary" size="field" />
  <CvIconButton :icon="Bee20" kind="secondary" />
  <CvIconButton :icon="Bee20" kind="tertiary" />
  <CvIconButton :icon="Bee20" kind="ghost" />
  <CvIconButton :icon="Bee20" kind="danger" />
  <CvIconButton :icon="Bee20" kind="danger--ghost" />
  <!-- invalid kind and size test -->
  <!-- <CvIconButton :icon="Bee20" kind="banana" size="banana"/> -->
  <CvIconButton :icon="Bee20" kind="danger--tertiary" />
  <!-- Not supported by Carbon -->
  <CvIconButton :icon="Bee20" skeleton />
</template>

<script>
// import { computed } from "vue";
import { CvButton, CvIconButton } from "./components/CvButton";
import Bee20 from "@carbon/icons-vue/es/bee/20";

export default {
  name: "App",
  components: {
    CvButton,
    CvIconButton
  },
  setup() {
    const handleClick = () => {
      console.log("click");
    };

    return { Bee20, handleClick };
  }
};
</script>

<style lang="scss">
@import "./global/styles";
</style>
