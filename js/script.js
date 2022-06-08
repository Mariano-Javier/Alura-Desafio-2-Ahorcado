let panelPrincipal = document.querySelector(".inicio");
let botonIniciar = document.querySelector(".principal");
let botonesInteractuar = document.querySelector(".interaccion");
let visorLetras = document.querySelector("#letrasPresionadas");
let botonAgregarPalabra = document.querySelector("#adicionarPalabra");
let botonCancelarPalabra = document.querySelector("#cancelarPalabra");
let botonAgregarPrincipal = document.querySelector(".secundario");
let botonDesistir = document.querySelector(".desistir");
let nuevoJuego = document.querySelector(".nuevoJuego");
let errores = document.querySelector(".errores");

let palabrasAhorcado = [ "hola", "mañana", "tarde", "noche", "lunes", "martes", "miercoles", "jueves", "viernes",];//Vector con las palabras a adivinar.

let palabraABuscar;
let vectorComparador;
let contadorErrores;
let letrasAceptadasTemp = [];
let letrasRechazadasTemp = [];

botonIniciar.addEventListener("click", crearTablero);//Evento - iniciar juego, procede a salir del menu principal.
botonIniciar.addEventListener("click", generadorPalabrasRandom); //Evento - crear palabra random.
botonDesistir.addEventListener("click", desistirJuego)//Evento - desistir del juego y retorna al menu principal.
nuevoJuego.addEventListener("click", generadorPalabrasRandom);//Evento - buscar una palabra nueva.

function desistirJuego(){
  panelPrincipal.classList.remove("esconder");
  tablero.classList.remove("tablero");
  tablero.classList.add("esconder");
  botonesInteractuar.classList.add("esconder");
  botonesInteractuar.classList.remove("comandos");
  document.querySelector(".bloqueJuego").classList.add("esconder");
}

function crearTablero() {
  panelPrincipal.classList.add("esconder");
  tablero.classList.add("tablero");
  tablero.classList.remove("esconder");
  botonesInteractuar.classList.remove("esconder");
  botonesInteractuar.classList.add("comandos");
  document.querySelector(".bloqueJuego").classList.remove("esconder");
}

function generadorPalabrasRandom() {
  pincel.clearRect(0, 0, tablero.width, tablero.height); //limpia el canvas
  document.getElementById("bloqueLetras").innerHTML = ""; //limpia las letas del juego anterior
  document.getElementById("bloqueRenglones").innerHTML = ""; //limpia los renglones del juego anterior
  document.getElementById("letrasPresionadas").innerHTML = ""; //limpia las letras presionadas del juego anterior.
  letrasRechazadasTemp = []; // limpia el vector de letras rechazadas
  letrasAceptadasTemp = []; // limpia el vector de letras rechazadas
  resetMsg(); //limpia el mensaje final

  ///Evento - escucha el teclado
  document.addEventListener("keydown", escuchar);

  //dibuja la base
  dibujarLineas(0, 357, 294, 358);
  contadorErrores = 0;
  let numeroRandom = Math.floor(Math.random() * palabrasAhorcado.length);
  let palabraRandom = palabrasAhorcado[numeroRandom];
  let palabraDividida = palabraRandom.split("");
  palabraABuscar = palabraDividida;
  vectorComparador  = palabraABuscar.slice();

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

//función contador de letras
function contadorLetras(array, valor) {
  var contador = 0;
  array.forEach((v) => v === valor && contador++);
  return contador;
}

//función que genera el motor del juego
function escuchar(event){
  let nombre = (event.key).toLowerCase();

  if (nombre.match(/^([a-z|ñ|]{1,})$/) && (event.key.length === 1)) { //a-z|ñ| valores permitidos. 
    let indices = []; //vector que devuelve los valores de los indices que el usuario ingreso por teclado.
    let array = palabraABuscar; //vector con la palabra dividida.
    let element = nombre; //caracter que ingresa el usuario por teclado.
    let idx = array.indexOf(element);

    if (idx == -1) {
      letrasRechazadasTemp.push(element); //carga el vector con las letras rechazadas para luego compararlas y que no se repitan.

      if (letrasRechazadasTemp.includes(element) && contadorLetras(letrasRechazadasTemp, element) == 1 ) {

        //verifica que no se escriban letras repetidas en pantalla.
        let nuevaLetraInvalida = document.createElement("div");
        nuevaLetraInvalida.innerHTML = element;
        nuevaLetraInvalida.classList.add("letrasInvalidas");
        visorLetras.appendChild(nuevaLetraInvalida);
        contadorErrores++;
        dibujadorDePartes();
      }
    } else {
      letrasAceptadasTemp.push(element);

       //el vector comparador posee una copia de la palabra original y se van removiendo las letras que cumplen, al llegar el length a "0" se encontraron todas las letras y el usuario gana.
       vectorComparador = vectorComparador.filter(function(value, index, arr){ 
          return value != element;
      });

      if (vectorComparador==0){
        ganaste();
      }

      while (idx != -1) {
        indices.push(idx);
        idx = array.indexOf(element, idx + 1);
      }      
    }

    let revelarAceptado = document.querySelectorAll(".letrasIndividuales");

    for (let i = 0; i < indices.length; i++) {
      revelarAceptado[indices[i]].classList.remove("invisible");
    }
  } 
}

//función que escribe el mensaje final "perdiste".
function perdiste() {
  let fin = document.querySelector(".mensajeFinal");
  let nuevoMesaje = document.createElement("div");
  nuevoMesaje.innerHTML = "<p>¡Perdiste!</p>";
  fin.appendChild(nuevoMesaje);
  document.removeEventListener("keydown", escuchar);
}

//función que resetea el mensaje cuando ganas o perdes.
function resetMsg() {
  document.querySelector(".mensajeFinal").innerHTML = "";
}

//función que escribe el mensaje final "ganaste"
function ganaste() {
  let fin = document.querySelector(".mensajeFinal");
  let nuevoMesaje = document.createElement("div");
  nuevoMesaje.classList.add("verde");
  nuevoMesaje.innerHTML = "<p>¡Ganaste!</p>";
  fin.appendChild(nuevoMesaje);
  document.removeEventListener("keydown", escuchar);
}

//busca si el valor existe en el vector de palabras
function verificarRepetido(valorNuevo){
  return palabrasAhorcado.includes(valorNuevo);
 }

//evento y funcion para agregar una palabra al vector
botonAgregarPalabra.addEventListener("click", function(event){
event.preventDefault();

errores.innerHTML="";

let palabraAAgregar = document.querySelector("#palabraNueva").value.toLowerCase();


if(verificarRepetido(palabraAAgregar)){
  let error = document.createElement("div");
  error.innerHTML ="<p>La palabra ya existe en la base de datos, ingrese otra palabra</p>";
  errores.appendChild(error);
  palabraAAgregar = document.querySelector("#palabraNueva").value = "";
}

else if (palabraAAgregar.length>0 && palabraAAgregar.length<9 && palabraAAgregar.match(/^([a-z|ñ|]{1,})$/)){
  let error = document.createElement("div");
  error.innerHTML ="<p>¡Palabra agregada con éxito!</p>";
  errores.appendChild(error);
  palabrasAhorcado.push(palabraAAgregar);
  palabraAAgregar = document.querySelector("#palabraNueva").value = "";

}else{
  let error = document.createElement("div");
  error.innerHTML ="<p>Palabra incompatible, vuelva a escribir una palabra válida</p>";
  errores.appendChild(error);
  palabraAAgregar = document.querySelector("#palabraNueva").value = "";
}
});

//función y evento que sale al menú principal
botonCancelarPalabra.addEventListener("click", function(event){
event.preventDefault();
errores.innerHTML="";
palabraAAgregar = document.querySelector("#palabraNueva").value = "";
document.querySelector("#agregarPalabra").classList.add("esconder");
desistirJuego();
});

//acción del boton "agregar palabra" del menu principal que lleva al submenu agregar palabra.
botonAgregarPrincipal.addEventListener("click",agregarPrincipal)
function agregarPrincipal(){
  document.removeEventListener("keydown", escuchar);
  panelPrincipal.classList.add("esconder");
  document.querySelector(".bloqueJuego").classList.add("esconder");
  document.querySelector("#agregarPalabra").classList.remove("esconder");
}

