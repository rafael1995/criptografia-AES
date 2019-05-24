
//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;
var aesjs = require('aes-js');

const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
});

function criptografarCTR () {
  // EXEMPLO CTR 
  var chave = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    
  // Convertendo texto para bytes
  var texto = 'texto texto texto';
  var txtBytes = aesjs.utils.utf8.toBytes(texto);
  
  var aesCtr = new aesjs.ModeOfOperation.ctr(chave, new aesjs.Counter(5));
  var encriptadoBytes = aesCtr.encrypt(txtBytes);
  
  var encriptadoHex = aesjs.utils.hex.fromBytes(encriptadoBytes);
  console.log(encriptadoHex);
  
  // Quando pronto, converte para byte
  var encriptadoBytes = aesjs.utils.hex.toBytes(encriptadoHex);
  
  var aesCtr = new aesjs.ModeOfOperation.ctr(chave, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encriptadoBytes);
  
  // Converte de volta para o texto
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  console.log(decryptedText);
}

function criptografarCBC () {
  var chave = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
  
  // Inicializando com 16 bytes
  var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
  
  // Convertendo texto para bytes
  var texto = 'textocomdezessei';
  var txtBytes = aesjs.utils.utf8.toBytes(texto);
  
  var aesCbc = new aesjs.ModeOfOperation.cbc(chave, iv);
  var encriptadoBytes = aesCbc.encrypt(txtBytes);
  
  var encriptadoHex = aesjs.utils.hex.fromBytes(encriptadoBytes);
  console.log(encriptadoHex);
  
  var encriptadoBytes = aesjs.utils.hex.toBytes(encriptadoHex);
  
   var aesCbc = new aesjs.ModeOfOperation.cbc(chave, iv);
   var decryptedBytes = aesCbc.decrypt(encriptadoBytes);
  
  // Converte de volta para o texto
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  console.log(decryptedText);
}

function criptografarCFB () {
  var chave = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
  var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
  
  // Texto para bytes
  var text = 'textocomtrintaedoisbyteXXXXXXXXX';
  var txtBytes = aesjs.utils.utf8.toBytes(text);
  
  var segmentSize = 8;
  var aesCfb = new aesjs.ModeOfOperation.cfb(chave, iv, segmentSize);
  var encriptadoBytes = aesCfb.encrypt(txtBytes);
  
  var encriptadoHex = aesjs.utils.hex.fromBytes(encriptadoBytes);
  console.log(encriptadoHex);
  
  // Converte de bytes para hexadecimal
  var encriptadoBytes = aesjs.utils.hex.toBytes(encriptadoHex);

  var aesCfb = new aesjs.ModeOfOperation.cfb(chave, iv, 8);
  var decryptedBytes = aesCfb.decrypt(encriptadoBytes);
  
  // Converte de bytes para texto
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  console.log(decryptedText);
}

function criptografarOFB () {
  var chave = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
 
  // iniciando vetor 16 bytes
  var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
  
  // Convertendo texto para bytes
  var texto = 'texto texto texto teste teste.';
  var txtBytes = aesjs.utils.utf8.toBytes(texto);
  
  var aesOfb = new aesjs.ModeOfOperation.ofb(chave, iv);
  var encriptadoBytes = aesOfb.encrypt(txtBytes);
  
  var encriptadoHex = aesjs.utils.hex.fromBytes(encriptadoBytes);
  console.log(encriptadoHex);
  // "55e3af2655dd72b9f32456042f39bae9accff6259159e608be55a1aa313c598d
  //  b4b18406d89c83841c9d1af13b56de8eda8fcfe9ec8e75e8"
  
  var encriptadoBytes = aesjs.utils.hex.toBytes(encriptadoHex);
  
  var aesOfb = new aesjs.ModeOfOperation.ofb(chave, iv);
  var decryptedBytes = aesOfb.decrypt(encriptadoBytes);
  
  // Converte de bytes para texto
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  console.log(decryptedText);
}

server.listen(port, hostname, () => {

  console.log(`Servidor rodando//${hostname}:${port}/`);
  
  console.log('======== EXECUTANDO CBC ========' )
  criptografarCBC ()
  console.log('======== EXECUTANDO OFB ========' )
  criptografarOFB ()
  console.log('======== EXECUTANDO CFB ========' )
  criptografarCFB ()
  console.log('======== EXECUTANDO CTR ========' )
  criptografarCTR ()
});