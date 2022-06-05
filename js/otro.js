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

