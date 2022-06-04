let panelPrincipal = document.querySelector(".inicio");
let botonIniciar = document.querySelector(".principal");
let tablero = document.querySelector(".canvasPrincipal");
let pincel = tablero.getContext("2d");
let botonesInteractuar = document.querySelector(".interaccion");

let contadorErrores;

//evento del boton iniciar juego
botonIniciar.addEventListener("click", crearTablero);
botonIniciar.addEventListener("click", generadorPalabrasRandom);


//procede a salir del menu principal al juego
function crearTablero() {
  panelPrincipal.classList.add("esconder");
  tablero.classList.add("tablero");
  tablero.classList.remove("esconder");
  botonesInteractuar.classList.remove("esconder");
  botonesInteractuar.classList.add("comandos");
}

//Selector del boton para buscar una palabra nueva
let nuevoJuego = document.querySelector(".nuevoJuego");
nuevoJuego.addEventListener("click", generadorPalabrasRandom);

//Vector con las palabras a adivinar
let palabrasAhorcado = [ "hola", "mañana", "tarde", "noche", "lunes", "martes", "miercoles", "jueves",  "viernes",];

let palabraABuscar;
//Funcion que busca una nueva palabra
function generadorPalabrasRandom() {
  pincel.clearRect(0, 0, tablero.width, tablero.height); //limpia el canvas
  document.getElementById('bloqueLetras').innerHTML = '';//limpia las letas del juego anterior
  document.getElementById('bloqueRenglones').innerHTML = '';//limpia los renglones del juego anterior

  //dibuja la base
  dibujarLineas(0, 357, 294, 358);
  contadorErrores = 0;
  let numeroRandom = Math.floor(Math.random() * palabrasAhorcado.length);
  let palabraRandom = palabrasAhorcado[numeroRandom];
  let palabraDividida = palabraRandom.split("");
  palabraABuscar = palabraDividida;
  console.log(palabraDividida); //borrar

//bloque que crea las letras a buscar en pantalla
  let bloqueLetras = document.querySelector("#bloqueLetras");
  let pruebaVector = palabraDividida;
for (i = 0; i < pruebaVector.length; i++) {
  let nuevoDivL = document.createElement("span");
  nuevoDivL.classList.add("letrasIndividuales");
  nuevoDivL.innerHTML = pruebaVector[i];
  bloqueLetras.appendChild(nuevoDivL);
}

//bloque que crea los renglones
let renglones = document.querySelector("#bloqueRenglones");
for (let i=0; i<pruebaVector.length; i++){
  let nuevoRenglon = document.createElement("div");
  nuevoRenglon.classList.add("canvasSecundario");
  renglones.appendChild(nuevoRenglon);
}
}

//evento que escucha el teclado
document.addEventListener("keydown", (event) => {
    let nombre = event.key;


    console.log("tecla presionada: " + nombre);
    if (nombre.match(/^([a-z0-9|ñ|]{1,})$/)) {//[a-z0-9] limite de valores, {1,} indica el largo de caracteres, en este caso solo buscamos 1, ya que hay teclas q comienzan con caracteres validos.
      let indices = []; //vector que va a devolver los valores de los indices que el usuario ingreso por teclado
      let array = palabraABuscar; //vector con la palabra dividida
      let element = nombre; //caracter que ingresa el usuario por teclado
      let idx = array.indexOf(element);

      if (idx == -1) {
        console.log("valor no encontrado");
        contadorErrores++;
        dibujadorDePartes();
      } else {
        while (idx != -1) {
          indices.push(idx);
          idx = array.indexOf(element, idx + 1);
        }
      }
      console.log(indices);
    } else {
      console.log("no es letra");
    }
  },
  false
);

//