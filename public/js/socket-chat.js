var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre y sala son necesario");
}

var usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("entrarChat", usuario, function (resp) {
    console.log("Usuarios conectados", resp);
  });
});

socket.on("crearMensaje", function (mensaje) {
  console.log("Servidor ", mensaje);
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});
// escuchar cuando un usuario entra o sale del chat
socket.on("listaPersona", function (personas) {
  console.log(personas);
});

// Enviar información

// socket.emit(
//   "crearMensaje",
//   {
//     usuario: "Fernando",
//     mensaje: "Hola Mundo",
//   },
//   function (resp) {
//     console.log("respuesta server: ", resp);
//   }
// );

socket.on("mensajePrivado", function (mensaje) {
  console.log("Mensaje Privado: ", mensaje);
});
