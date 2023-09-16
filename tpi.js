/**
 * este script incicia el juego
 * todal alogica se modularizo.
 * @app.js contiene toda la logica de creacion servidor, maneja routas
 * @game.js crear las pregutnas con los datos obtenidos de la url,
 * los datos de paises se procesa los datos para eliminiar dato sincesarios o paises con errores
 * 
 */
import App from "./app.js";
async function iniciarApp() {
    const app = new App(); // intsancia la aplicacoin
    await app.start(); // espero respeusta de paises  para inciar efectivamente     
}
iniciarApp()
    .catch(error => {
        console.error('Error al iniciar la aplicación:', error);
    });
