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

const divCartasComputadora = document.querySelector('#computadora-cartas');
const divCartasJugador = document.querySelector('#jugador-cartas');
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

//Turno computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora + ' puntos';
        // <img class="carta" src="assets/cartas/10C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana :(');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('Computadora gana');
        }
    }, 100);
}

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    // console.log(carta);
    // console.log(valorCarta(carta));

    puntosJugador += valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador + ' puntos';
    // <img class="carta" src="assets/cartas/10C.png" alt="">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHtml[0].innerText = 0 + ' puntos';
    puntosHtml[1].innerText = 0 + ' puntos';
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});