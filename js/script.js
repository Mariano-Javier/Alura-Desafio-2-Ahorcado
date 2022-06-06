let panelPrincipal = document.querySelector(".inicio");
let botonIniciar = document.querySelector(".principal");
let tablero = document.querySelector(".canvasPrincipal");
let pincel = tablero.getContext("2d");
let botonesInteractuar = document.querySelector(".interaccion");

let visorLetras = document.querySelector("#letrasPresionadas");

let contadorErrores;

let letrasAceptadasTemp = [];
let letrasRechazadasTemp = [];

//evento del boton iniciar juego
botonIniciar.addEventListener("click", crearTablero);
botonIniciar.addEventListener("click", generadorPalabrasRandom);

//funcion y evento desistir
let botonDesistir = document.querySelector(".desistir");
botonDesistir.addEventListener("click",function(){
  panelPrincipal.classList.remove("esconder");
  tablero.classList.remove("tablero");
  tablero.classList.add("esconder");
  botonesInteractuar.classList.add("esconder");
  botonesInteractuar.classList.remove("comandos");
  document.querySelector(".bloqueJuego").classList.add("esconder");
})



//procede a salir del menu principal al juego
function crearTablero() {
  panelPrincipal.classList.add("esconder");
  tablero.classList.add("tablero");
  tablero.classList.remove("esconder");
  botonesInteractuar.classList.remove("esconder");
  botonesInteractuar.classList.add("comandos");
  document.querySelector(".bloqueJuego").classList.remove("esconder");

}

//Selector del boton para buscar una palabra nueva
let nuevoJuego = document.querySelector(".nuevoJuego");
nuevoJuego.addEventListener("click", generadorPalabrasRandom);

//Vector con las palabras a adivinar
let palabrasAhorcado = [ "hola", "mañana", "tarde", "noche", "lunes", "martes", "miercoles", "jueves", "viernes",];

let palabraABuscar;
let vectorComparador;

//Funcion que busca una nueva palabra
function generadorPalabrasRandom() {
  pincel.clearRect(0, 0, tablero.width, tablero.height); //limpia el canvas
  document.getElementById("bloqueLetras").innerHTML = ""; //limpia las letas del juego anterior
  document.getElementById("bloqueRenglones").innerHTML = ""; //limpia los renglones del juego anterior
  document.getElementById("letrasPresionadas").innerHTML = ""; //limpia las letras presionadas del juego anterior.
  letrasRechazadasTemp = []; // limpia el vector de letras rechazadas
  letrasAceptadasTemp = []; // limpia el vector de letras rechazadas
  resetMsg(); //limpia el mensaje final

  //evento que escucha el teclado
  document.addEventListener("keydown", escuchar);

  //dibuja la base
  dibujarLineas(0, 357, 294, 358);
  contadorErrores = 0;
  let numeroRandom = Math.floor(Math.random() * palabrasAhorcado.length);
  let palabraRandom = palabrasAhorcado[numeroRandom];
  let palabraDividida = palabraRandom.split("");
  palabraABuscar = palabraDividida;
  vectorComparador  = palabraABuscar.slice();
  console.log(palabraDividida); //borrar

  //bloque que crea las letras a buscar en pantalla
  let bloqueLetras = document.querySelector("#bloqueLetras");
  let pruebaVector = palabraDividida;
  for (i = 0; i < pruebaVector.length; i++) {
    let nuevoDivL = document.createElement("span");
    nuevoDivL.classList.add("letrasIndividuales", "invisible");
    nuevoDivL.innerHTML = pruebaVector[i];
    bloqueLetras.appendChild(nuevoDivL);
  }

  //bloque que crea los renglones
  let renglones = document.querySelector("#bloqueRenglones");
  for (let i = 0; i < pruebaVector.length; i++) {
    let nuevoRenglon = document.createElement("div");
    nuevoRenglon.classList.add("canvasSecundario");
    renglones.appendChild(nuevoRenglon);
  }
}

//funcion contador de letras
function contadorLetras(array, valor) {
  var contador = 0;
  array.forEach((v) => v === valor && contador++);
  return contador;
}

//funcion que genera el motor del juego
function escuchar(event){
  let nombre = event.key;

  console.log("tecla presionada: " + nombre);
  if (nombre.match(/^([a-z|ñ|]{1,})$/)) {
    //[a-z] limite de valores, {1,} indica el largo de caracteres, en este caso solo buscamos 1, ya que hay teclas q comienzan con caracteres validos.
    let indices = []; //vector que va a devolver los valores de los indices que el usuario ingreso por teclado
    let array = palabraABuscar; //vector con la palabra dividida
    let element = nombre; //caracter que ingresa el usuario por teclado
    let idx = array.indexOf(element);

    if (idx == -1) {
      letrasRechazadasTemp.push(element); //carga el vector con las letras rechazadas para luego compararlas y que no ser repitan

      if (letrasRechazadasTemp.includes(element) && contadorLetras(letrasRechazadasTemp, element) == 1 ) {
        //verifica que no se escriban letras repetidas en pantalla
        let nuevaLetraInvalida = document.createElement("div");
        nuevaLetraInvalida.innerHTML = element;
        nuevaLetraInvalida.classList.add("letrasInvalidas");
        visorLetras.appendChild(nuevaLetraInvalida);

        console.log("vector rechazado: " + letrasRechazadasTemp);
        console.log("valor no encontrado");
        contadorErrores++;
        dibujadorDePartes();
      }
    } else {
      letrasAceptadasTemp.push(element);

       //uso del vector comparador que copia el vector con la palabar y va removiendo los valores que si cumplen para que luego de que el array llegue a 0 el jugador gane
       vectorComparador = vectorComparador.filter(function(value, index, arr){ 
          return value != element;
      });

      if (vectorComparador==0){
        ganaste();
      }

      console.log("vector aceptado: " + letrasAceptadasTemp);

      while (idx != -1) {
        indices.push(idx);
        idx = array.indexOf(element, idx + 1);
      }      
    }

    console.log("indices: "+indices);

    let revelarAceptado = document.querySelectorAll(".letrasIndividuales");

    for (let i = 0; i < indices.length; i++) {
      revelarAceptado[indices[i]].classList.remove("invisible");
    }

  } else {
    console.log("no es letra");
  }
}

//funcion que escribe el mensaje final "perdiste"
function perdiste() {
  let fin = document.querySelector(".mensajeFinal");
  let nuevoMesaje = document.createElement("div");
  nuevoMesaje.innerHTML = "<p>¡Perdiste!</p>";
  fin.appendChild(nuevoMesaje);
  document.removeEventListener("keydown", escuchar);
}

//funcion que resetea el mensaje cuando ganas o perdes
function resetMsg() {
  document.querySelector(".mensajeFinal").innerHTML = "";
}
//funcion que escribe el mensaje final "ganaste"
function ganaste() {
  let fin = document.querySelector(".mensajeFinal");
  let nuevoMesaje = document.createElement("div");
  nuevoMesaje.innerHTML = "<p>¡Ganaste!</p>";
  fin.appendChild(nuevoMesaje);
  document.removeEventListener("keydown", escuchar);
}
