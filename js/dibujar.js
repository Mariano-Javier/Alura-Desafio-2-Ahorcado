let tablero = document.querySelector(".canvasPrincipal");
let pincel = tablero.getContext("2d");

pincel.strokeStyle = "#0a3871";
pincel.lineWidth = 5;

function dibujarLineas(valorA, valorB, valorC, valorD) {
  pincel.beginPath();

  pincel.moveTo(valorA, valorB);
  pincel.lineTo(valorC, valorD);

  pincel.closePath();
  pincel.stroke();
}

function dibujarCirculo() {
  pincel.beginPath();
  pincel.arc(195, 90, 35, 0, 2 * Math.PI);
  pincel.stroke();
}

function dibujadorDePartes(){
  switch (contadorErrores) {
    case 1:
      dibujarLineas(70, 0, 70, 358);
      break;
    case 2:
      dibujarLineas(70, 2, 195, 2);
      break;
    case 3:
      dibujarLineas(195, 0, 195, 55);
      break;
    case 4:
      dibujarCirculo();
      break;
    case 5:
      dibujarLineas(195, 125, 195, 245);
      break;
    case 6:
      dibujarLineas(195, 128, 155, 190);
      break;
    case 7:
      dibujarLineas(195, 128, 235, 190);
      break;
    case 8:
      dibujarLineas(195, 244, 155, 310);
      break;
    case 9:
      dibujarLineas(195, 244, 235, 310);
      perdiste();
      break;
    default:
      console.log("no hay opcion cargada.");
  }
}
