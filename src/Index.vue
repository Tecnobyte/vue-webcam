<template>
  <div>
    <h2>Web Cam</h2>
    <web-cam ref="cam">
        <div slot="buttons">
            <button @click="iniciar">iniciar</button>

        </div>
    </web-cam>
  </div>
</template>

<script>

import WebCam from "./App.vue";
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
  #app {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    color: blue;
  }
  /* index */
  .container{
    display: flex;
    flex-direction: row;
  }
  .container-buttom{
    margin-top: 1%;
  }
  .container-select-device{
    margin-top: 1%;
  }
  .container-video{
    margin-top: 1%;
  }

  /* buttom */
  .button-play{
    /* width: 2%;
    height: 3%;
    border-radius: 50%;
    background-color: #07ce07; */

    text-decoration:none;
    font-weight: 600;
    font-size: 20px;
    color:#333333;
    padding-top:15px;
    padding-bottom:15px;
    padding-left:40px;
    padding-right:40px;
    background-color:#07ce07;
    border-color: #d8d8d8;
    border-width: 3px;
    border-style: solid;
    border-radius:20%;
  }
  .button-stop{
    /* width: 2%;
    height: 3%;
    border-radius: 50%;
    background-color: #e81515; */

    text-decoration:none;
    font-weight: 600;
    font-size: 20px;
    color:#333333;
    padding-top:15px;
    padding-bottom:15px;
    padding-left:40px;
    padding-right:40px;
    background-color:#e81515;
    border-color: #d8d8d8;
    border-width: 3px;
    border-style: solid;
    border-radius:20%;
  }
  .button-screenshot{
    /* width: 2%;
    height: 3%;
    border-radius: 50%;
    background-color: #e81515; */

    text-decoration:none;
    font-weight: 600;
    font-size: 20px;
    color:#333333;
    padding-top:15px;
    padding-bottom:15px;
    padding-left:40px;
    padding-right:40px;
    background-color:#0c85aa;
    border-color: #d8d8d8;
    border-width: 3px;
    border-style: solid;
    border-radius:20%;
  }


  .video-display{
    width: 50%;
  }
</style>