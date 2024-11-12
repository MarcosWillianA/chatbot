const limparChat = document.querySelector('#limpar-chat');
const chatMensagens = document.querySelector('#chat-mensagens');
const caixaTexto = document.querySelector('#caixa-texto');
const enviarTexto = document.querySelector('#enviar-texto');
const msgsEnviadas = document.querySelectorAll('.enviadas');
const msgsRespostas = document.querySelectorAll('.resposta-chatbot');
const chave = 'AIzaSyDNJYsAA4QYExPtlyBWYStijvPx-ELNXic'

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
    
        const url = 'https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/YOUR_SESSION_ID:detectIntent';
    
        const accessToken = `${chave}`;  // Aqui você insere o token gerado para autenticação
    
        const requestBody = {
            queryInput: {
                text: {
                    text: msg,
                    languageCode: 'pt-BR',
                }
            }
        };
    
        try {
            const resposta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!resposta.ok) {
                throw new Error('Falha na comunicação com a API');
            }
    
            const data = await resposta.json();
    
            if (data.queryResult.fulfillmentText) {
                this.exibirRespostaBot(data.queryResult.fulfillmentText);
            } else {
                this.exibirRespostaBot('Desculpe, não entendi sua mensagem. Tente novamente.');
            }
    
        } catch (error) {
            console.error(error);
            this.exibirRespostaBot('Houve um erro ao se comunicar com o servidor. Tente novamente mais tarde');
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


