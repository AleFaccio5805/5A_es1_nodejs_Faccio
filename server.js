/*
    require => uguale alla import
    http => modulo per creare una comunicazione client-server
    url => 
*/


const http = require("http");
const { default: test } = require("node:test");
const url = require("url");

/*
    1° parametro => richiesta del client
    2° parametro => risposta per il client
*/

var server = http.createServer(function(richiesta, risposta){
    
    /*********** */
    /* RICHIESTA */
    /*********** */

    let testoRisposta = `
        url: ${richiesta.url}
        host: ${richiesta.headers.host}
        metodo: ${richiesta.method}
    `;
    
    //Estrazione delle info dalla stringa completa scritta dal client nella barra degli indirizzi
    let indirizzo = richiesta.headers.host + richiesta.url;
    let infoUrl = url.parse(indirizzo, true);

    testoRisposta += `
        pathname: ${infoUrl.pathname}
        parametri: ${infoUrl.search}
    `;

    switch(infoUrl.pathname){
        case "richiesta":
            stampaRichiesta(testoRisposta, risposta, infoUrl);
            break;
        default:
            let header = {"Content-Type" : "text/plain"};
            risposta.writeHead(402, header);
            risposta.write("Nessuna risorsa è stata trovata");
            risposta.end();
    }
});

server.listen(1337);
console.log("Il server è stato avviato sulla porta 1337");

function stampaRichiesta(testoRisposta, risposta, infoUrl){
     //Estrazione dei parametri SEPARATI
    let parametri = infoUrl.query;

    testoRisposta += `
        action: ${parametri.action}
        parametro 1: ${parametri.p1}
    `;

    
 
    /*********** */
    /*  RISPOSTA */
    /*********** */
    /*
        INTESTAZIONE DELLA RISPOSTA (HEADERS)
        1° parametro => codice di risposta (200/400/501 ...)
        2° parametro => oggetto JSON, insieme di opzioni da inserire nell'intestazione

        Content-Type: text/plain, text/html, application/json
    */
        let header = {"Content-Type" : "text/plain"};

        risposta.writeHead(200, header);
        
        //Modifica del contenuto del pacchetto (posso richiamarlo più di una volta)
        risposta.write("Hello World! <br>"+ testoRisposta);
    
        risposta.end();
}
