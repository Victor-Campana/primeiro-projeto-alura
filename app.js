//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados=[];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if('speechSynthesis' in window){
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);    
    }else{
        console.log("Web Speech API não suportada neste navegador");
    }
}

function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'Jogo do Número Secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}
exibirMensagemInicial();

function verificarChute() {
    let chute= document.querySelector('input').value;
    console.log (chute == numeroSecreto);
    if (chute==numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavratentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = (`você descobriu o número secreto com ${tentativas} ${palavratentativa}`);
        exibirTextoNaTela('P',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute>numeroSecreto) {
            exibirTextoNaTela ('p', 'O Número é menor que o chute');
        } else {
            exibirTextoNaTela('p','o número secreto é maior');
        }
        tentativas++;
        LimparCampo();
    }
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() *numeroLimite+1);
   let quantidadeDeElementosNaLista= listaDeNumerosSorteados.length;
   if(quantidadeDeElementosNaLista==numeroLimite){
    listaDeNumerosSorteados=[];
   }
   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }
    //includes verifica se elemento esta na lista
    //push adiciona algo na lista
    //pop remove o ultimo objeto da lista
}
function LimparCampo(){
    chute = document.querySelector('input');
    chute.value='';
}
function ReiniciarJogo(){
    numeroSecreto= gerarNumeroAleatorio();
    LimparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

