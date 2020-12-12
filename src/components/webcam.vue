<script>
    export default {
        name: 'WebCamComponent',
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
        }, methods: {
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
                    this.$emit("devices", dispositivos)
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
            play: async function(idDeDispositivo) {
                let media = await navigator.mediaDevices.getUserMedia({ 
                    video: {
                        width: { min: 1024, ideal: 1280, max: 1920 },
                        height: { min: 576, ideal: 720, max: 1080 },
                        deviceId: idDeDispositivo 
                    },
                    audio: this.audio
                });
                this.$refs.webcam.srcObject = media;
                this.$refs.webcam.play();

                // if (this.dispositivoSeleccionado == ''){
                //     this.lista_dispositivos = await this.buscar_dispositivos();
                //     this.dispositivoSeleccionado = this.lista_dispositivos[0].deviceId; //selecciono al primero
                // }
            },
            // obtengo la base64 de la imagen
            get_base64: function(){
                let resolution = this.$refs.webcam;
                let canvas = document.createElement('canvas');
                canvas.width = resolution.videoWidth;
                canvas.height = resolution.videoHeight;
                // let context = canvas.getContext('2d').drawImage(resolution, 0, 0, resolution.videoWidth, resolution.videoHeight);
                // this.imagen = canvas.toDataURL(this.format);
                // this.imagen = canvas.getContext('2d').drawImage(resolution, 0, 0, resolution.videoWidth, resolution.videoHeight).toDataURL(this.format)
                let imagen = canvas.getContext('2d').drawImage(resolution, 0, 0, resolution.videoWidth, resolution.videoHeight).toDataURL(this.format)
                this.$emit('canvas', imagen );
            },
            // convierto el base 64 en una archivo imagen
            conversion_file: function(base64){
                // let tipo = mime;
                let b64 = base64.split(",")[1];
                let imagen = this.b64toBlob(b64, this.format)
                let file = new File( [imagen], 'rostro.png', { type: this.format }); // convierto el blob en un archivo png
                this.$emit('file', file);
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

        },render: function(createElement){
            console.log(createElement)
            return createElement('video', {
                ref: 'webcam',
                style: {
                    width: '100%'
                },
                attrs: {
                    id: 'webcam',
                    poster: this.poster,
                },
                // on: {
                //     change: 
                // }
            })
        }
    }
</script>