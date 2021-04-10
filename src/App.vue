<template>
  <div id="app">
    <div>
      <button @click="iniciar()">iniciar camara</button>
      <button @click="stop_webcam()">detener camara</button>
      <button @click="tomar_foto()">tomar foto</button>
    </div>

    <div>
      <select @change="seleccionarCamara(dispositivo)" v-model="dispositivo">
        <option :value="null" disabled hidden selected>SELECCIONE UN DISPOSITIVO</option>
        <option v-for="webcam of dispositivos" :key="webcam.deviceId" :value="webcam.deviceId">{{webcam.label}}</option>
      </select>
    </div>

    <div>
      <video style="width: 100%" ref="webcam" id="video" :poster="poster" playsinline autoplay></video>
    </div>
  </div>
</template>

<script>

import WebCamComponent from './components/webcam.vue';
export default {
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
    };
  }, methods:{
    async iniciar(){
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
        this.play(config);
      }else{
        alert('no existe una camara en el dispositivo');
      }
    },
    tomar_foto(){
      let b = this.get_base64();
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
</style>