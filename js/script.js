const chatBox = document.querySelector('#chat-box');
const caixaMsg = document.querySelector('#caixa-msg');
const enviarMsg = document.querySelector('#enviar-msg');

enviarMsg.addEventListener('click', () => {
    const msgUsuario = caixaMsg.value;
    if (msgUsuario.trim() !== '') {
        addMensagemChat(`Você: ${msgUsuario}`);
        caixaMsg.value = '';
        respostaBot(msgUsuario);
    }
})

function addMensagemChat(msg, enviador) {
    const balaoDeMensagem = document.createElement('div');
    balaoDeMensagem.classList.add('msg-do-usuario');
    balaoDeMensagem.innerText = msg;
    chatBox.appendChild(balaoDeMensagem);
    chatBox.scrollTop = chatBox.scrollHeight;
} 

function respostaBot(usuarioMsg) {
    let resposta = 'Como assim, não entendi.'

    if (usuarioMsg.toLowerCase().includes('olá')) {
        resposta = 'E ae, blz?'
    } else if (usuarioMsg.toLowerCase().includes('como você está?')) {
        resposta = 'Tô bem e tu?'
    } else if (usuarioMsg.toLowerCase().includes('tchau')) {
        resposta = 'Flw ae cara'
    }

    addMensagemChat(`Bot: ${resposta}`);
}