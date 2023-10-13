/*
    http => modulo per creare una comunicazione client-server
    require => uguale alla import
*/


const http = require("http");

/*
    1° parametro => richiesta del client
    2° parametro => risposta per il client
*/

var server = http.createServer(function(richiesta, risposta){
    /*
        INTESTAZIONE DELLA RISPOSTA (HEADERS)
        1° parametro => codice di risposta (200/400/501 ...)
        2° parametro => oggetto JSON, insieme di opzioni da inserire nell'intestazione
    */
    let header = {"Content-Typeb" : "text/plain"};

    risposta.writeHead(200, header);
});