// funciones para renderizar usuarios
var params = new URLSearchParams(window.location.search);

var sala = params.get('sala');
var nombre = params.get('nombre');
// referencias jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var divChatbox = $('#divChatbox');

function renderizarUsuarios(personas) {
  //[{},{},{}]

  console.log(personas);
  var html = '';
  html += '<li>';
  html += '    <a href="javascript:void(0)" class="active">';
  html += '        Chat de <span> ' + sala + '</span>';
  html += '    </a>';
  html += '</li>;';

  for (var i = 0; i < personas.length; i++) {
    html += '<li>';
    html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)">';
    html += '    <img src="assets/images/users/2.jpg" alt="user-img" class="img-circle" />';
    html += '    <span>' + personas[i].nombre + ' <small class="text-warning">Away</small></span>';
    html += '    </a>';
    html += '</li>';
  }
  divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo) {
  var html = '';
  var fecha = new Date(mensaje.fecha);
  var hora = fecha.getHours() + ':' + fecha.getMinutes();
  var adminClass = 'info';
  if (mensaje.nombre === 'Administrador') {
    adminClass = 'danger';
  }

  if (yo) {
    html += '<li class="reverse">';
    html += '  <div class="chat-content">';
    html += '    <h5>' + mensaje.nombre + '</h5>';
    html += '    <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
    html += '  </div>';
    html += '  <div class="chat-img">';
    html += '    <img src="assets/images/users/5.jpg" alt="user" />';
    html += '  </div>';
    html += '  <div class="chat-time">' + hora + '</div>';
    html += '</li>;';
  } else {
    html += '<li class="animated fadeIn">';
    html += '    <div class="chat-img">';
    if (mensaje.nombre != 'Administrador') {
      html += '    <img src="assets/images/users/1.jpg" alt="user" />';
    }
    html += '    </div>';
    html += '    <div class="chat-content">';
    html += '    <h5>' + mensaje.nombre + '</h5>';
    html += '    <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
    html += '    </div>';
    html += '    <div class="chat-time">';
    html += '    ' + hora;
    html += '    </div>';
    html += '</li>    ';
  }

  divChatbox.append(html);
}

function scrollBottom() {
  // selectors
  var newMessage = divChatbox.children('li:last-child');

  // heights
  var clientHeight = divChatbox.prop('clientHeight');
  var scrollTop = divChatbox.prop('scrollTop');
  var scrollHeight = divChatbox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    divChatbox.scrollTop(scrollHeight);
  }
}

// listeners

divUsuarios.on('click', 'a', function () {
  var id = $(this).data('id');
  if (id) {
    console.log(id);
  }
});

formEnviar.on('submit', function (e) {
  e.preventDefault();
  var txtMensaje = $(this).find('#txtMensaje');
  if (txtMensaje.val().trim().length === 0) {
    return;
  }

  //console.log(txtMensaje.val());

  // Enviar información
  socket.emit(
    'crearMensaje',
    {
      nombre: nombre,
      mensaje: txtMensaje.val().trim(),
    },
    function (mensaje) {
      txtMensaje.val('').focus();
      renderizarMensajes(mensaje, true);
      scrollBottom();
    }
  );
});
