const limparChat = document.querySelector('#limpar-chat');
const chatMensagens = document.querySelector('#chat-mensagens');
const caixaTexto = document.querySelector('#caixa-texto');
const enviarTexto = document.querySelector('#enviar-texto');
const msgsEnviadas = document.querySelectorAll('.enviadas');
const msgsRespostas = document.querySelectorAll('.resposta-chatbot');

class Chat {
    constructor() {
        this.envio = [];
        this.resposta = [];
    }

    enviarMsg() {
        const msg = caixaTexto.value.trim();
        if (msg.length === 0) {
            return;
        }
        this.envio.push(msg);
        caixaTexto.value = '';
        caixaTexto.focus();
        console.log(this.envio);
        return this.envio;
    }

    exibirEnviadas() {
        const enviadas = document.createElement('p');
        enviadas.classList.add('enviadas');
        enviadas.innerHTML = this.envio;
        this.envio = [];
        chatMensagens.appendChild(enviadas);
    }
    
    async respostaBot() {
        const msg = this.envio[this.envio.length - 1];

        try {
            const resposta = await fetch('https://api.gemini.google.com/v1/chat', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer AIzaSyDNJYsAA4QYExPtlyBWYStijvPx-ELNXic',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: msg,
                })
            });
    
            if (!resposta.ok) {
                throw new Error('Falha na comunicação com API');
            }
    
            const data = await resposta.json();
    
            if (data && data.resposta) {
                this.exibirRespostaBot(data.resposta);
            } else {
                this.exibirRespostaBot('Desculpe, não entendi sua mensagem. Tente novamente.');
            }
        } catch (error) {
            console.error(error);
            this.exibirRespostaBot('Houve um erro ao se comunicar com o servidor. Tente novamente mais tarde')
        }

    }

    exibirRespostaBot(resposta) {
        const respostaBot = document.createElement('p');
        respostaBot.classList.add('resposta-chatbot');
        respostaBot.innerHTML = resposta;
        chatMensagens.appendChild(respostaBot);
    }

    limparMsgs() {
        chatMensagens.innerHTML = '';
    }
}

const novaConversa = new Chat(); 

enviarTexto.addEventListener('click', () => {
    novaConversa.enviarMsg();
    novaConversa.exibirEnviadas();
    novaConversa.respostaBot();
})

caixaTexto.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        novaConversa.enviarMsg();
        novaConversa.exibirEnviadas();
        novaConversa.respostaBot();
    }
})

limparChat.addEventListener('click', () => {
    novaConversa.limparMsgs();
})


