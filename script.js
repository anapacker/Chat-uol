// function receberMsgServidor(msgServidor) {
//     const boxMensagens = document.querySelector(".box-mensagens");
//     boxMensagens.innerHTML = msgServidor.data.map((cadaElemento) => {
//         return (
//             `<li class="to-${cadaElemento.to} type-${cadaElemento.type}"> 
//                 <div class="from-name">
//                     ${cadaElemento.from}

//                 <div>
//                 ${cadaElemento.to}
//                 </div>

//                 </div>
//                 ${cadaElemento.text} 
//             </li>`
//         )
//     });
//     console.log(msgServidor)
// }
let boxMensagensHTML = "";


function receberMsgServidor(msgServidor) {
    console.log(msgServidor.data)
    construirHtmlMensagens(msgServidor.data)

}


function solicitarMsgServidor() {
    const solicitacao = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    solicitacao.then(receberMsgServidor);
}

solicitarMsgServidor()
setInterval(solicitarMsgServidor, 3000);

function construirHtmlMensagens(listaMensagens) {
    boxMensagensHTML = "";
    for (let i = 0; i < listaMensagens.length; i++) {

        let objetoMsg = listaMensagens[i]
        let tipoMsg = objetoMsg.type
        let msgHTML = "";


        if (tipoMsg === "message") {
            msgHTML =
                `<li class="msg-normal">
            <p>
                <span class="horario">
                   (${objetoMsg.time})
                </span>
                <span class="nome"><strong>${objetoMsg.from}</strong></span>
                <span>
                    para
                </span>
                <span class="destinatario"><strong>${objetoMsg.to}:</strong></span>
                <span class="text">${objetoMsg.text}</span>
            </p>
        </li>`
        } else if (tipoMsg === "status") {
            msgHTML =
                ` <li class="msg-status">
            <p>
                <span class="horario">
                (${objetoMsg.time})
                </span>
                <span class="nome"><strong>${objetoMsg.from}</strong></span>
                <span class="text">${objetoMsg.text}</span>
            </p>
        </li>`
        } else if (tipoMsg === "private_message") {
            msgHTML =
                `<li class="msg-privada">
            <p>
                <span class="horario">
                (${objetoMsg.time})
                </span>
                <span class="nome"><strong>${objetoMsg.from}</strong></span>
                <span>
                    reservadamente para
                </span>
                <span class="destinatario"><strong>${objetoMsg.to}:</strong></span>
                <span class="text">${objetoMsg.text}</span>
            </p>
        </li>`
        }

        boxMensagensHTML += msgHTML
    }
    document.querySelector(".box-mensagens").innerHTML = boxMensagensHTML
}