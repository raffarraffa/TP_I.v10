// App.mjs
class Game {
    constructor(urlGame) {
        //   this.paises ;
        this.url = urlGame;
        console.log(`game importado ${urlGame}`);
    }
    async obtenerPaises() {
        const controlTiempo = new AbortController();
        const tiempoFuera = controlTiempo.signal;
        const timeCancel = setTimeout(() => {
            controlTiempo.abort(); // Cancelar la solicitud después de 20 segundos ante posible errores red
            //MEJORA ver como rieniciar el juego si obtengo error aqui, sino el juego fallara 
            //TODO investigar usando un abandera logica y un setInterval condicinal con la bandera
        }, 20000);

        return fetch(this.url, { signal: tiempoFuera })
            .then(response => {
                clearTimeout(timeCancel);
                if (!response.ok) {
                    throw new Error('error en solicitud');
                }
                return response.json();
            })
            .then(data => {
                this.paises = this.paisesFiltraMap(data);
                //   console.log(this.paisesFiltraMap(data));
                //  return data;
                //                    this.paises = paisesFiltra(data);
                //                    return paises
            })
            /*        .then(paises => {
                        return obtenerPaisesKey(paises);
                    })
            */
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.error('Existe un problema con la red, prueba en unos segundos');
                } else {
                    console.error('Error:', error);
                }
            });
    }
    paisesFiltraFor(data) { //usando for
        let paises = [];
        let pais = {};
        for (let i = 0; i < data.length; i++) {
            if (data[i] && data[i].translations.spa.official && data[i].capital && data[i].flags.svg) {
                pais = {
                    nombre: data[i].translations.spa.official,
                    bandera: data[i].flags.svg,
                    capital: data[i].capital[0]
                }
                paises.push(pais);
            }
        }
        return paises;
    }
    paisesFiltraForEach(data) { //usando foreach
        let paises = [];
        let pais = {};
        data.forEach(element => {
            if (element.translations.spa.official && element.capital && element.flags.svg) {
                pais = {
                    nombre: element.translations.spa.official,
                    bandera: element.flags.svg,
                    capital: element.capital[0]
                }
                paises.push(pais);
            }

        });
        return paises;
    }
    paisesFiltraMap(data) { //usando map
        const resultados = data.map(element => {
            if (element.translations.spa.official && element.capital && element.flags.svg) {
                const nombre = element.translations.spa.official;
                const capital = element.capital[0];
                const bandera = element.flags.svg;
                return {
                    nombre: nombre,
                    capital: capital,
                    bandera: bandera
                };
            }
        });
        return resultados;
    }
}

export default Game;
