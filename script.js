/* NAVEGACIÓN */
const botonesNav = document.querySelectorAll('.nav-btn');
const paginas = document.querySelectorAll('.pagina');
function mostrarPagina(id) {
  if (!document.getElementById(id)) return;
  paginas.forEach(p => p.classList.toggle('activa', p.id === id));
  botonesNav.forEach(b => b.classList.toggle('active', b.dataset.page === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
botonesNav.forEach(b => b.addEventListener('click', () => mostrarPagina(b.dataset.page)));
document.querySelectorAll('[data-ir]').forEach(b => b.addEventListener('click', () => mostrarPagina(b.dataset.ir)));

/* TEMA */
const temaBtn = document.getElementById('temaBtn');
temaBtn.addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
  temaBtn.textContent = document.body.classList.contains('oscuro') ? '☀️' : '🌙';
});
temaBtn.addEventListener('dblclick', () => lanzarCorazones(15));

/* AVISOS Y EMOJIS FLOTANTES */
function aviso(mensaje) {
  const caja = document.getElementById('aviso');
  caja.textContent = mensaje;
  caja.style.display = 'block';
  clearTimeout(window.temporizadorAviso);
  window.temporizadorAviso = setTimeout(() => caja.style.display = 'none', 2600);
}
function lanzarCorazones(cantidad = 20) {
  const emojis = ['💗','💖','💕','✨','🐾','🎀'];
  for (let i = 0; i < cantidad; i++) {
    const el = document.createElement('span');
    el.className = 'corazon-flotante';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (18 + Math.random() * 20) + 'px';
    el.style.animationDuration = (2.3 + Math.random() * 2) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4600);
  }
}

/* GALERÍA */
const animales = [
  ['🐱','Gatito dormilón','Que nunca te falten siestas bonitas.'],
  ['🐵','Monito travieso','Que nunca te falten motivos para reír.'],
  ['😻','Ojitos tiernos','Tu sonrisa puede alegrar un día.'],
  ['🐈‍⬛','Gatito misterioso','Que tengas muchas aventuras bonitas.'],
  ['🙈','Monito tímido','Nunca dejes de ser tú misma.'],
  ['🐒','Monito feliz','Que hoy tengas muchísima diversión.'],
  ['🎀','Gatito elegante','Hoy eres la protagonista.'],
  ['🐾','Patitas de suerte','Que te acompañe la buena suerte.'],
  ['💗','Mucho cariño','Te mereces cosas muy bonitas.']
];
const galeriaGrid = document.getElementById('galeriaGrid');
animales.forEach(a => {
  const card = document.createElement('button');
  card.className = 'animal-card';
  const emoji = document.createElement('span'); emoji.className = 'animal'; emoji.textContent = a[0];
  const titulo = document.createElement('b'); titulo.textContent = a[1];
  const texto = document.createElement('p'); texto.textContent = 'Toca para descubrir ♡';
  card.append(emoji, titulo, texto);
  card.addEventListener('click', () => texto.textContent = a[2]);
  galeriaGrid.appendChild(card);
});
const frases = [
  'Eres más genial que un gatito con una caja nueva. 🐱',
  'Que nunca te falten risas, pastel y personas bonitas. 🎂',
  'Este mundo es más bonito porque tú estás en él. 💗',
  'Ojalá hoy recibas tantos abrazos como mereces. 🫂',
  'Que este nuevo año te traiga aventuras increíbles. ✨',
  'Nunca olvides lo especial que eres. 🌷'
];
document.getElementById('nuevaFrase').addEventListener('click', () => {
  document.getElementById('fraseAleatoria').textContent = frases[Math.floor(Math.random() * frases.length)];
});

/* MEMORAMA */
const figuras = ['🐱','🐵','🐈','🙈','😻','🐒'];
let primeraCarta = null, bloqueado = false, parejas = 0;
function iniciarMemorama() {
  const tablero = document.getElementById('memorama');
  tablero.innerHTML = ''; primeraCarta = null; bloqueado = false; parejas = 0;
  document.getElementById('estadoMemorama').textContent = 'Parejas: 0 de 6';
  const baraja = [...figuras, ...figuras].sort(() => Math.random() - .5);
  baraja.forEach(figura => {
    const carta = document.createElement('button');
    carta.className = 'carta-juego'; carta.textContent = '?'; carta.dataset.figura = figura;
    carta.addEventListener('click', () => {
      if (bloqueado || carta.disabled || carta === primeraCarta) return;
      carta.textContent = figura; carta.classList.add('volteada');
      if (!primeraCarta) { primeraCarta = carta; return; }
      if (primeraCarta.dataset.figura === figura) {
        primeraCarta.disabled = true; carta.disabled = true; primeraCarta = null; parejas++;
        document.getElementById('estadoMemorama').textContent = `Parejas: ${parejas} de 6`;
        if (parejas === 6) { aviso('¡Ganaste, Lia! 🏆💗'); lanzarCorazones(25); }
      } else {
        bloqueado = true; const anterior = primeraCarta; primeraCarta = null;
        setTimeout(() => { anterior.textContent = '?'; carta.textContent = '?'; anterior.classList.remove('volteada'); carta.classList.remove('volteada'); bloqueado = false; }, 750);
      }
    });
    tablero.appendChild(carta);
  });
}
document.getElementById('reiniciarMemorama').addEventListener('click', iniciarMemorama);
iniciarMemorama();

/* ADIVINA EL ANIMAL */
document.querySelectorAll('.respuesta').forEach(b => b.addEventListener('click', () => {
  if (b.dataset.respuesta === 'gato') { aviso('¡Correcto! Miau miau. 🐱'); lanzarCorazones(8); }
  else aviso('¡Casi! La respuesta era gatito. 😹');
}));

/* ATRAPA CORAZONES Y CELEBRACIÓN */
let puntos = 0, juegoTerminado = false;
document.getElementById('atrapar').addEventListener('click', function() {
  if (juegoTerminado) { puntos = 0; juegoTerminado = false; document.getElementById('puntuacion').textContent = 'Corazones: 0 de 5'; this.textContent = '¡Atrapar! 💖'; }
  puntos++; document.getElementById('puntuacion').textContent = `Corazones: ${Math.min(puntos,5)} de 5`; lanzarCorazones(3);
  if (puntos >= 5) { juegoTerminado = true; this.textContent = 'Jugar otra vez 🔄'; aviso('¡Atrapas corazones como una profesional! 💗'); lanzarCorazones(30); }
});
document.getElementById('celebrar').addEventListener('click', () => { lanzarCorazones(40); aviso('¡Feliz cumpleaños, Lia! 🎂🎉'); });

/* CARTAS */
const cartas = [
  ['💌 Carta de cumpleaños','Lia, ¡feliz cumpleaños! 🎂\n\nEspero que hoy te consientan mucho, que te rías muchísimo y que este nuevo año te traiga experiencias increíbles. ¡Te mereces un mundo lleno de cosas bonitas! 💗'],
  ['🌷 Un deseo para ti','Deseo que nunca te falten personas que te quieran bonito, oportunidades para cumplir tus sueños y motivos para sentirte orgullosa de ti. ✨'],
  ['🐱 Recordatorio gatuno','Recordatorio oficial: eres increíble, mereces descanso, pastel, cariño y todos los gatitos que quieras. No se aceptan discusiones. 😼'],
  ['🫂 Para un día difícil','Si un día todo se siente pesado, recuerda que no tienes que poder con todo a la vez. Descansa, respira y date tiempo. También mereces que te cuiden. 💗'],
  ['⭐ Un deseo secreto','Que la vida te regale aventuras increíbles, amistades que se sientan como hogar y muchísimas razones para sonreír. 💫']
];
const botonesCartas = document.getElementById('botonesCartas');
cartas.forEach(c => {
  const b = document.createElement('button'); b.className = 'boton-carta'; b.textContent = c[0];
  b.addEventListener('click', () => {
    document.querySelectorAll('.boton-carta').forEach(x => x.classList.remove('activo'));
    b.classList.add('activo'); document.getElementById('contenidoCarta').textContent = c[1];
  });
  botonesCartas.appendChild(b);
});

/* MÚSICA LOCAL: agrega tus propios MP3 a la carpeta musica */
const canciones = [
  {nombre:'Photograph', archivo:'musica/Photograph_.mp3'},
  {nombre:'Count On Me', archivo:'musica/Count_On_Me.mp3'},
  {nombre:'Reflections', archivo:'musica/Reflections.mp3.mp3'},
  {nombre:'See You Again', archivo:'musica/See_You_Again_.mp3'},
  {nombre:'Youve ot a Friend in Me', archivo:'musica/Youve_ot_a_Friend_in_Me.mp3'}
];
const audio = document.getElementById('audio'), listaCanciones = document.getElementById('listaCanciones');
let cancionActual = 0;
canciones.forEach((c,i) => {
  const b = document.createElement('button'); b.className = 'cancion-btn'; b.textContent = `${i+1}. ${c.nombre}`;
  b.addEventListener('click', () => seleccionarCancion(i, true)); listaCanciones.appendChild(b);
});
function seleccionarCancion(indice, reproducir) {
  cancionActual = (indice + canciones.length) % canciones.length;
  audio.src = canciones[cancionActual].archivo;
  document.getElementById('nombreCancion').textContent = canciones[cancionActual].nombre;
  document.getElementById('estadoCancion').textContent = `Canción ${cancionActual+1} de ${canciones.length}`;
  document.querySelectorAll('.cancion-btn').forEach((b,i) => b.classList.toggle('seleccionada', i === cancionActual));
  if (reproducir) audio.play().catch(() => aviso('Revisa que el archivo MP3 exista dentro de la carpeta musica.'));
}
document.getElementById('anterior').addEventListener('click', () => seleccionarCancion(cancionActual-1, true));
document.getElementById('siguiente').addEventListener('click', () => seleccionarCancion(cancionActual+1, true));
document.getElementById('reproducir').addEventListener('click', () => {
  if (audio.paused) audio.play().catch(() => aviso('Añade el archivo MP3 correspondiente a la carpeta musica.'));
  else audio.pause();
});
audio.addEventListener('play', () => { document.getElementById('reproducir').textContent = '⏸ Pausar'; document.getElementById('disco').classList.add('sonando'); });
audio.addEventListener('pause', () => { document.getElementById('reproducir').textContent = '▶ Reproducir'; document.getElementById('disco').classList.remove('sonando'); });
audio.addEventListener('ended', () => seleccionarCancion(cancionActual+1, true));
seleccionarCancion(0, false);

/* BÚSQUEDA Y DEDICATORIA */
document.getElementById('buscarBtn').addEventListener('click', () => {
  const q = document.getElementById('buscarMusica').value.trim();
  if (!q) { aviso('Escribe el nombre de una canción primero. 🎵'); return; }
  window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(q), '_blank', 'noopener');
});
document.getElementById('buscarMusica').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('buscarBtn').click(); });
document.getElementById('dedicar').addEventListener('click', () => { aviso('Esta canción va dedicada especialmente a ti, Lia. 💗'); lanzarCorazones(15); });

/* REGALOS */
const regalos = [
  ['💌 Una cartita','Lia, ojalá este pequeño mundo te saque una sonrisa. ¡Feliz cumpleaños! Que hoy te llenen de cariño.'],
  ['🌟 Un cumplido','Tienes algo muy bonito: haces que los momentos compartidos se conviertan en recuerdos especiales. Nunca dejes de brillar.'],
  ['🔮 Tu suerte','Tu pronóstico: risas inesperadas, comida rica, aventuras nuevas y muchos gatitos que te robarán el corazón. 🐱'],
  ['🕯️ Pide un deseo','Cierra los ojos, pide algo bonito y sopla una velita imaginaria. Ojalá ese deseo encuentre su camino hacia ti.'],
  ['🫂 Un abrazo virtual','Te mando un abrazo enorme, de esos que duran un poquito más y te recuerdan que eres una persona querida.'],
  ['🔐 Mensaje secreto','Psst... hay personas que se alegran muchísimo de que existas. Hoy celébrate tanto como mereces. 💗']
];
const regalosAbiertos = new Set();
document.querySelectorAll('.regalo').forEach(b => b.addEventListener('click', () => {
  const i = Number(b.dataset.regalo);
  document.getElementById('tituloRegalo').textContent = regalos[i][0];
  document.getElementById('textoRegalo').textContent = regalos[i][1];
  b.classList.add('abierto'); b.querySelector('b').textContent = '¡Abierto!'; regalosAbiertos.add(i); lanzarCorazones(8);
  if (regalosAbiertos.size === regalos.length) { const f = document.getElementById('sorpresaFinal'); f.disabled = false; f.textContent = '¡Abrir sorpresa final! 💖'; aviso('¡Encontraste todos los regalos, Lia! 🎁'); }
}));
document.getElementById('sorpresaFinal').addEventListener('click', function() {
  if (regalosAbiertos.size !== regalos.length) { aviso('Primero tienes que abrir los seis regalos. 🎁'); return; }
  document.getElementById('final').classList.remove('oculto'); this.textContent = '¡Sorpresa desbloqueada! 💗'; this.disabled = true; lanzarCorazones(50);
  document.getElementById('final').scrollIntoView({behavior:'smooth',block:'center'});
});
document.getElementById('confetiFinal').addEventListener('click', () => { lanzarCorazones(50); aviso('¡Que viva la cumpleañera! 🎂🎉'); });

/* PREGUNTA FINAL */
document.getElementById('preguntaSi').addEventListener('click', () => {
  document.getElementById('respuestaPregunta').textContent = '¡Ayyy, qué bueno que te gustó! 💗🐵 Gracias por ver mi pequeño edit. 🌷✨';
  lanzarCorazones(18);
});
document.getElementById('preguntaNo').addEventListener('click', () => {
  document.getElementById('respuestaPregunta').textContent = '¡Gracias por verlo, Lia! 💕 Espero que al menos te haya sacado una sonrisita. 🐶🌸';
});
