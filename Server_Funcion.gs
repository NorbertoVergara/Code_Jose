function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function doGet() {
  const html = HtmlService.createTemplateFromFile('Main');
  const output = html.evaluate();
  output.setFaviconUrl('https://comarrico.com/wp-content/uploads/2022/02/Logo-menu-comarrico.png');
  output.setTitle('Mapa - Riesgos - Comarrico');
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return output;
}



function obtenerDatos(nombre, fechaIngresada)
{
  var fechaComparar;

  if (!fechaIngresada) {
    console.log('No se ingresó una fecha. Utilizando la fecha actual.');
    fechaComparar = new Date('00-00-0000');
  } else {
    // Separar el string de fecha en día, mes y año
    var partesFecha = fechaIngresada.split("-"); // Suponiendo que recibes la fecha como "dd mm yyyy"
    var dia = partesFecha[0];
    var mes = partesFecha[1];
    var año = partesFecha[2];

    // Crear una nueva fecha con el formato 'mm dd yyyy'
    fechaComparar = new Date(`${mes} ${dia} ${año}`);
  }

  var resultados = [];
  var nombreZona = nombre; 
  var datosLength = datos.length;

  if (!datos || !Array.isArray(datos) || datos.length === 0) {
    console.error('Error: datos no están definidos o no es un array válido.');
    return; // O maneja el caso en consecuencia
  }

  let evaluacionEncontrada;

  for (let i = 1; i < datosLength; i++){

    let fechaInicio = new Date(datos[i][14]); // FechaInicio
    let fechaFin = new Date(datos[i][15]);    // FechaFin
    fechaInicio.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para considerar solo la fecha
    fechaFin.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para considerar solo la fecha
    let zona = datos[i][7];
    let descripcion = datos[i][3];
    let riegos = datos[i][10];
    let evaluacionRiesgo = datos[i][20];
    let procesoResponsable = datos[i][1];
    let lugar = datos[i][19];
    let empresa = datos[i][4];
    let sst = datos[i][13];
    fechaI = new Date(datos[i][14] + ' GMT-0500');
    let fechaF = new Date(datos[i][15] + ' GMT-0500');
    let I = datos[i][16];
    let horaI = datos[i][16];
    let horaF = datos[i][17];
    let participantes = datos[i][18];

    if ((fechaComparar >= fechaInicio && fechaComparar <= fechaFin) && zona === nombreZona)
    {
          let mensaje =
              '<b>Proceso:</b> ' + procesoResponsable +
              '\n<b>Empresa:</b> ' + empresa +
              '\n<b>Lugar de Trabajo:</b> ' + lugar +
              '\n<b>Descripción:</b> ' + descripcion +
              '\n<b>Riesgos:</b> ' + riegos +
              '\n<b>Evaluacion del riesgo:</b> ' + evaluacionRiesgo +
              '\n<b>SST Comarrico:</b> ' + sst +
              '\n<b>Participantes:</b> ' + participantes +
              '\n<b>Fecha y Hora de Inicio:</b> ' + fechaI.toLocaleDateString() + ' - ' + horaI.toLocaleTimeString('es-CO',       {timeZone: 'America/Bogota', hour12: true }) + 
              '\n<b>Fecha y Hora de Fin:</b> ' + fechaF.toLocaleDateString() + ' - ' + horaF.toLocaleTimeString('es-CO', {timeZone:       'America/Bogota', hour12: true }) +
              '\n----------------- ';
          resultados.push(mensaje);

          evaluacionEncontrada = evaluacionRiesgo;   
    }
  }

  // Retorna tanto los resultados como el riesgo encontrado
  return { resultados: resultados.length > 0 ? resultados.join('\n\n') : 'sin datos', evaluacionDelRiesgo:evaluacionEncontrada};
}
