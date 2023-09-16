// App.mjs
class Game {
    constructor(urlGame) {
        //   this.paises ;
        this.url = urlGame;
        this.datosPaises = this.obtenerPaises();
        this.keyPaises = this.shuffle(this.obtenerPaisesKeyAnon(this.datosPaises));
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
                //                this.paises = this.paisesFiltraMap(data);
                //   console.log(this.paisesFiltraMap(data));
                return this.paisesFiltraMap(data);
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
    async obtenerPaisesKeyFor(paises) {
        const keyPaises = [];
        for (let i = 0; i < paises.length; i++) {
            keyPaises.push(i);
        }
        return keyPaises;
    }
    async obtenerPaisesKeyForEach(paises) {
        const keyPaises = [];
        let i = 0;
        paises.forEach(() => {
            keyPaises.push(i++);
        });
        return keyPaises;
    }
    async obtenerPaisesKeyMap(paises) {
        let i = 0;
        return paises.map(() => i++);
    }
    // async obtenerPaisesKeyAnon(paises) {
    //     const key = paises.map((_, i) => i);
    //     return key;

    // }
    // async obtenerPaisesKeyAnon(paises) {
    //     const keys = Object.keys(paises);
    //     const keyArray = keys.map((_, index) => ({ index }));
    //     return keyArray;
    // }

    async obtenerPaisesKeyAnon(paises) {
        console.log(typeof paises === 'object');
        if (typeof paises === 'object') {
            const keys = Object.keys(paises);
            const keyArray = keys.map((_, pregunta) => ({ pregunta }));
            console.log(keyArray.length);
            //keyArray = this.shuffle(keyArray);

            return keyArray;
        } else if (typeof paises === 'array' && Array.isArray(paises)) {
            return paises.map((_, i) => i);
        } else {
            return 'caca';
        }
    }
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export default Game;
