<template>
  <div id="app">

    <slot name="buttons">
      <div class="container container-buttom">

        <button v-if="play_video" class="button-stop" @click="stop_webcam()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop" viewBox="0 0 16 16">
            <path d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"/>
          </svg>
        </button>

        <button v-else class="button-play" @click="play_webcam()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
          </svg>
        </button>

        <button class="button-screenshot" @click="screenshot()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
          </svg>
        </button>

        <!-- <a class="button-screenshot" download="cbimage.jpg" :href="base64">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16">
            <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
            <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
          </svg>
        </a> -->

      </div>
    </slot>

    <slot name="devices">
      <div class="container container-select-device">
        <select @change="seleccionarCamara(dispositivo)" v-model="dispositivo">
          <option :value="null" disabled hidden selected>SELECCIONE UN DISPOSITIVO</option>
          <option v-for="webcam of dispositivos" :key="webcam.deviceId" :value="webcam.deviceId">{{webcam.label}}</option>
        </select>
      </div>
    </slot>

    <slot name="display">
      <div class="container container-video">
        <video class="video-display" ref="webcam" id="video" :poster="poster" playsinline autoplay></video>
      </div>
    </slot>

  </div>
</template>

<script>

import WebCamComponent from './components/webcam.vue';
export default {
  name: 'web-cam',
  extends: WebCamComponent,
  props: {
      width: {
          type: Object,
          default: function(){ return { min: 1024, ideal: 1280, max: 1920 } }
      },
      height: {
          type: Object,
          default: function(){ return  { min: 576, ideal: 720, max: 1080 } }
      },
      format: {type: String, default: "image/png"},
      poster: {
          type: String,
          default: './../assets/static.git'
      },
      audio: {type: Boolean, default: false},        
  }, data() {
    return {
      dispositivos: [],
      dispositivo: null,
      play_video:false,
      base64: null,
      file:null,
    };
  }, methods:{
    async play_webcam(){
      try{
        this.dispositivos = await this.get_devices();
        if (this.dispositivos.length > 0){
          this.dispositivo = this.dispositivos[0].deviceId
          const config = { 
            video: {
                width: this.width,
                height: this.height,
                deviceId: this.dispositivo 
            }, audio: this.audio
          }
          this.play_video = await this.play(config);
        }else{
          alert('no existe una camara en el dispositivo');
        }
      }catch(error){
        console.error(error);
      }
    },
    stop_webcam(){
      this.play_video = this.stop();
      console.log(this.play_video)
    },
    screenshot(){
      this.base64 = this.get_base64();
      
      let date = Date();
      const tag = document.createElement('a');
      tag.href = this.base64;
      tag.download = `screenshot_${date}`;
      tag.click();
      // this.file = this.conversion_file(this.base64)
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