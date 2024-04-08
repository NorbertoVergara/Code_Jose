// Declarar variables a nivel global para tener acceso a ellas en diferentes funciones
var spreadsheet = SpreadsheetApp.openById('1qVERKaY47KiOPOJkjjgXavz2AWUGUnniTabf6BaU6IY');
var hoja = spreadsheet.getSheetByName('Cronograma');
var datos = hoja.getDataRange().getValues(); // Obtener todos los datos de la hoja una sola vez

