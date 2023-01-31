import Vue from 'vue';
import DemoContainer from './demo-container.vue';
import DemoMethods from './demo-methods.vue';
import TimerButton from './timer-button.vue';
import PropsRevealed from './props-revealed.vue';

// Register components for use in stories
Vue.component('demo-container', DemoContainer);
Vue.component('demo-methods', DemoMethods);
Vue.component('timer-button', TimerButton);
Vue.component('props-revealed', PropsRevealed);
