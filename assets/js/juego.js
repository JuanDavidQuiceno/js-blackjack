/**
 * 2C = 2 treboles
 * 2D = 2 diamantes
 * 2H = 2 corazones
 * 2S = 2 picas
 */


let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// referencia HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHtml = document.querySelectorAll('small');

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta;
}

// valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor))
        ? (valor === 'A')
            ? 11
            : 10
        : valor * 1;
}

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    // console.log(carta);
    // console.log(valorCarta(carta));

    puntosJugador += valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador + ' puntos';

});
