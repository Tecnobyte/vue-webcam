<template>
  <div>
    <h2>Web Cam</h2>
    <web-cam ref="cam"></web-cam>
  </div>
</template>

<script>

import WebCam  from "./../src/main";
export default {
  name: 'index',
  components: {
      'web-cam': WebCam
  } , data() {
    return {

    };
  }, methods:{
      iniciar(){
          this.$refs.cam.play_webcam()
      }

  }
};
</script>

<style>

</style>