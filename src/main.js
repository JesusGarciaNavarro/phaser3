// IMPORTAR LA PRIMERA ESCENA
import Firstscene from './scenes/Firstscene.js'

const config = {

    // OPCIONALES
    title: 'Titulo Juego',
    url: 'http://enmilocalfunciona.io',
    version: '0.0.1',

    // OPCIONAL
    pixelArt: true, // REMARCAR LOS PIXELES DE LAS IMAGENES

    // OBLIGATORIO
    type: Phaser.AUTO, // WEBGL O CANVAS O AUTOMATICO
    width: 900, // TAMAÑO DEL LIENZO
    height: 360,
    parent: 'container', // ID DEL CONTENEDOR
    backgroundColor: '#34495E', // FONDO DEL LIENZO

    // INFORMACIÓN DE LA CONSOLA
    banner: {
        hidePhaser: true, // OCULTAR TEXTO DE PHASER EN CONSOLA
        text: '#000000', // CAMBIAR COLOR DEL TEXTO DEL TITULO DEL JUEGO EN CONSOLA
         // PALETA DE COLORES DE ADORNO EN CONSOLA
        background: [
            'red',
            'yellow',
            'red',
            'transparent'
        ]
       
    },
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: true
        }
    },

    //ESCENAS DEL JUEGO
    scene: [Firstscene]
};


// CREAR LA INSTANCIA DEL JUEGO
const game = new Phaser.Game(config);


