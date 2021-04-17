# Vue-webcam

Vue-webcam es un componente creado para versiones de vue 2 y compatible con vue3.

## Install
```sh 
npm i vue-webcam-component`
```
## Usage

```sh
import Webcam from 'vue-webcam-component';
`components: {
    'web-cam': Webcam
}
```
## Props
| Name | Type | Defauld | Descripcion |
| ------------ | ------------ | ------------ |------------|
| width | Object | { min: 1024, ideal: 1280, max: 1920 }  |  |
| height | Object |  { min: 576, ideal: 720, max: 1080 } |  |
| poster | String |   |  |
| format | String | "image/png" |  |
| audio | Boolean | false |  |

## Methods
| Name | Descripcion |
| ------------ | ------------ | 
| get_devices()           |   |
| stop()                  |   |
| play()                  |   |
| get_base64()            |   |
| conversion_file(base64) |   ||
