import Vue from 'vue';
import WebCam from './App.vue';
import Index from './Index.vue';

// export default WebCam;
new Vue({
  el: '#app',
  render: h => h(Index),
});