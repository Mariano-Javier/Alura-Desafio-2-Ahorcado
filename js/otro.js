tablero.addEventListener(
  "click",
  function (event) {
    var rect = tablero.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
  },
  false
);

let vectorTemp = [0,3,4]
function visualizarLetra(vectorTemp) {
  let letra = document.querySelectorAll(".letrasIndividuales");

  for (let i=0;i<vectorTemp.length;i++){
    letra[vectorTemp[i]].classList.remove("invisible")
  }
}
