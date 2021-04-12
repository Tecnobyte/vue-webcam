<script>
    require('babel-polyfill');
    export default {
        name: 'WebCamComponent',
        methods: {
            // obtengo todos los dispositovos que sean tipo video
            get_devices: async function(){
                try{
                    const tieneSoporteUserMedia = () => !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
                    if(!tieneSoporteUserMedia()){
                        throw "Parece que tu navegador no soporta esta caracteristica.";
                    }
                    // get device 
                    const lista_dispositivos = await navigator.mediaDevices.enumerateDevices();
                    let dispositivos = lista_dispositivos.filter( dispositivo => dispositivo.kind == 'videoinput' );
                    return dispositivos;
                }catch(error){
                    console.error(error)
                }
            },
            // Selecciono la camara del select
            seleccionarCamara: async function(device_id){
                this.stop_webcam();
                await this.play(device_id);
            },
            // detengo la webcam
            stop_webcam: function(){
                this.$refs.webcam.srcObject.getTracks().forEach( (track)=> {
                    track.stop();
                });
            },
            // abro una ventana emergente del video
            ventana: function(){
                this.$refs.webcam.requestPictureInPicture();
            },
            // inicio los parametros de la webcam
            play: async function(config) {
                let media = await navigator.mediaDevices.getUserMedia(config);
                this.$refs.webcam.srcObject = media;
                this.$refs.webcam.play();
            },
            // toma la foto y la convierte en imagen
            get_base64: function(){
                let resolution = this.$refs.webcam;
                let canvas = document.createElement('canvas');
                canvas.width = resolution.videoWidth;
                canvas.height = resolution.videoHeight;
                let context = canvas.getContext('2d').drawImage(resolution, 0, 0, resolution.videoWidth, resolution.videoHeight);
                let imagen = canvas.toDataURL(this.format)
                return imagen;
            },
            // convierto el base 64 en una archivo imagen
            conversion_file: function(base64){
                // let tipo = mime;
                let b64 = base64.split(",")[1];
                let imagen = this.b64toBlob(b64, this.format)
                let file = new File( [imagen], 'rostro.png', { type: this.format }); // convierto el blob en un archivo png
                return file;
            },
            // convierto la cadena base64 de canvas a tipo blob png
            b64toBlob: function(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;
                var byteCharacters = atob(b64Data);
                var byteArrays = [];
                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);
                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
            return new Blob(byteArrays, {type: contentType});
            },
        }
    }
</script>
