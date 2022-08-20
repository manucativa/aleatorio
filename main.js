const btnMa = document.querySelector('#btnMayor')
const btnMe = document.querySelector('#btnMenor')
const btnIg = document.querySelector('#btnIgual')
const btnRe = document.querySelector('#btnReiniciar')
const btnIn = document.querySelector('#btnIniciar')
const numA = document.querySelector('#numeroA')
const titulo = document.querySelector('#titulo')
const instrucciones = document.querySelector('#instrucciones')
const ranking = document.querySelector('#ranking')
const puntajeFinal =document.querySelector('#puntajeFinal')
const ultimaPartida = document.querySelector('#ultimaPartida')
const perdiste = "Incorrecto!"
const ganaste = "Correcto!"
let vidas = 5;
let puntaje = 0;
const imgGO = document.createElement('img')
imgGO.src = 'imagenes/game_over_PNG57.png'

btnMa.disabled = true;
btnMe.disabled = true;
btnIg.disabled = true;
btnRe.disabled = true;

const life1 = document.querySelector('#life1')
const life2 = document.querySelector('#life2')
const life3 = document.querySelector('#life3')
const life4 = document.querySelector('#life4')
const life5 = document.querySelector('#life5')

/*--------------CREAR JUGADOR---------------------*/

class resultado {
    constructor(nombreJugador, puntos, numeros){
        this.nombreJugador = nombreJugador
        this.puntos = puntos
        this.numeros = numeros
    }
}

const jugador = [];
let numerosGenerados = [];

numeroA = aleatorio();
numA.innerText = "?";
puntajeFinal.innerText= "Tu puntuación actual es: " + puntaje 
let nombreJugador = "";

let ultP = JSON.parse(localStorage.getItem("Resultado ultima partida"))
console.log(ultP)

/*--------VERIFICACION QUE NO ESTE VACIO LOCALSTORAGE-----*/

if(ultP != null){
ultimaPartida.innerText = "Ultima partida " + ultP[0].nombreJugador + " obtuvo " + ultP[0].puntos + " puntos"}


/*-------------------------FUNCIONES------------------------------- */

function aleatorio(){
    numero = Math.random()*100;
    numero = Math.round(numero);
    return numero;
}

function eliminarVida(){
    const eliminar = document.querySelector('#lifes')
    if (vidas==4)
    {eliminar.removeChild(life5)
    }
    if (vidas==3)
    {eliminar.removeChild(life4)
    }
    if (vidas==2)
    {eliminar.removeChild(life3)
    }
    if (vidas==1)
    {eliminar.removeChild(life2)
    }
    if (vidas==0)
    {eliminar.removeChild(life1)
    }
}

function ingresarNombre(){
    swal("Ingresa tu nombre: ", {
        content: "input",
      })
      .then((value) => {
        nombreJugador = value
      });
      return nombreJugador;
}

function reiniciar(){
    swal("Esta seguro que desea reiniciar?", {
        buttons: {
          cancel: "No",
          catch: {
            text: "Si",
            value: "reiniciar",
          },
          
        },
      })
      .then((value) => {
        switch (value) {
       
          case "reiniciar":
            location.href='index.html';
            break;
       
          default:
            ;
        }
      });
}

function perder(){
    numA.innerText = ""
    document.querySelector('#numeroA').appendChild(imgGO)
    btnMa.disabled = true;
    btnMe.disabled = true;
    btnIg.disabled = true;
    console.log("Puntuacion final " + puntaje)
    puntajeFinal.innerText=  nombreJugador + " tu puntuación final es: " + puntaje 
    jugador.push(new resultado(nombreJugador,puntaje,numerosGenerados))
    console.log(jugador)
    btnRe.disabled = false;
    const ultimoJugador = JSON.stringify(jugador)
    localStorage.setItem("Resultado ultima partida", ultimoJugador); 
}

/*-------------------------BOTONES------------------------------- */

instrucciones.onclick = function(){
    swal("Instrucciones", "EL OBJETIVO DEL JUEGO ES ADIVINAR SI EL NUMERO SIGUIENTE AL QUE SE MUESTRA EN PANTALLA ES MAYOR, MENOR O IGUAL. SE INICIA EL JUEGO CON 5 VIDAS, LAS QUE SE VAN A IR RESTANDO CUANDO EL JUGADOR NO ACIERTA. EL JUEGO FINALIZA CUANDO NO QUEDA NINGUNA VIDA.");
}

ranking.onclick = function(){
    fetch('/data.json')
        .then ((res) => res.json())
        .then ((data) => {

            data.forEach((elemento) => {
                const li= document.createElement('ul')
                li.innerHTML = `
                ${"N°"+ elemento.posicion}
                ${"Nombre:"+ elemento.nombre}
                ${"Puntaje:"+ elemento.puntaje}
            `
                rankingH.append(li)
            });
        })
    
}


btnIn.onclick = function(){
    numA.innerText = numeroA;
    btnMa.disabled = false;
    btnMe.disabled = false;
    btnIg.disabled = false;
    btnIn.disabled = true;
    ingresarNombre();
    localStorage.clear();
}

btnMa.onclick = function(){
    console.log("Seleccionaste MAYOR");
    numeroB = aleatorio();
    numerosGenerados.push(numeroB);
    console.log(numerosGenerados)
    numA.innerText = numeroB;
    console.log("Salio el numero: " + numeroB);
    if (numeroA < numeroB){
        console.log("Correcto");
        titulo.innerText = ganaste;
        numeroA = numeroB;
        puntaje = puntaje + 1;
        console.log("Puntuacion " + puntaje)
        console.log("------------------------------")
        puntajeFinal.innerText= "Tu puntuación actual es: " + puntaje
    } else{
        console.log("Incorrecto")
        titulo.innerText = perdiste;
        numeroA = numeroB;
        vidas = vidas - 1;
        console.log("Quedan " + vidas + " vidas")
        console.log("------------------------------")
        eliminarVida();
        if (vidas == 0){
        perder();
        }
    }
}

btnMe.onclick = function(){
    console.log("Seleccionaste MENOR");
    numeroB = aleatorio();
    numerosGenerados.push(numeroB);
    console.log(numerosGenerados)
    numA.innerText = numeroB;
    console.log("Salio el numero: " + numeroB);
    if (numeroA > numeroB){
        console.log("Correcto");
        titulo.innerText = ganaste;
        numeroA = numeroB;
        puntaje = puntaje + 1;
        console.log("Puntuacion " + puntaje)
        console.log("------------------------------")
        puntajeFinal.innerText= "Tu puntuación actual es: " + puntaje
    } else{
        console.log("Incorrecto")
        titulo.innerText = perdiste;
        numeroA = numeroB;
        vidas = vidas - 1;
        console.log("Quedan " + vidas + " vidas")
        console.log("------------------------------")
        eliminarVida();
        if (vidas == 0){
            perder();
        }
    }
}

btnIg.onclick = function(){
    console.log("Seleccionaste IGUAL");
    numeroB = aleatorio();
    numerosGenerados.push(numeroB);
    console.log(numerosGenerados)
    numA.innerText = numeroB;
    console.log("Salio el numero: " + numeroB);
    if (numeroA == numeroB){
        console.log("Correcto");
        titulo.innerText = ganaste;
        numeroA = numeroB;
        puntaje = puntaje + 1;
        console.log("Puntuacion " + puntaje)
        console.log("------------------------------")
        puntajeFinal.innerText= "Tu puntuación actual es: " + puntaje
    } else{
        console.log("Incorrecto")
        titulo.innerText = perdiste;
        numeroA = numeroB;
        vidas = vidas - 1;
        console.log("Quedan " + vidas + " vidas")
        console.log("------------------------------")
        eliminarVida();
        if (vidas == 0){
            perder();
        }
    }
}

btnRe.onclick = function(){
    reiniciar()
}



























