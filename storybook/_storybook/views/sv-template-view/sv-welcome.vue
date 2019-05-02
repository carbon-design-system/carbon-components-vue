<template>
  <main class="welcome">
    <img class="welcome__background-image" src="../../../..//docs/AtCarbonVue2.svg" alt="@carbon/vue" />
    <div class="welcome__info">
      <h1 class="welcome__heading">
        <span class="highlight">Carbon</span> Design system in
        <span class="highlight">VueJs</span>
      </h1>
      <a class="welcome__text" href="/?path=/story/components-cvaccordion--default">Browse the components</a>
      <a class="welcome__text" href="/?path=/story/versions--default">versions</a>
    </div>
  </main>
</template>

<script>
export default {
  name: 'SvWelcome',
};
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transition: background-size 0.6s ease;
  background-color: #000;
}

.welcome__background-image {
  height: 300px;
}

.welcome__info {
  display: flex;
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 38%;
  color: #fff;
  text-transform: uppercase;

  .welcome__heading {
    font-size: 3.375rem;
    font-weight: 300;
    letter-spacing: 1px;
  }

  .welcome__text {
    color: #fff;
    font-size: 2.275rem;
    font-weight: 300;
    letter-spacing: 1px;
  }

  .highlight {
    font-weight: 600;
  }
}
</style>
