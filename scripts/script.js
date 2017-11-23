window.addEventListener("load", function () {
	
	var form = document.getElementsByClassName("form_mensagem");
    var mensagem = document.getElementById("tb_enviar");
    var utilizador = document.getElementById("tb_utilizador");
	
    var websocket = new WebSocket("ws://localhost:8000/");
    websocket.onopen = function (evt) { onOpen(evt) };
    websocket.onclose = function (evt) { onClose(evt) };
    websocket.onmessage = function (evt) { onMessage(evt) };
    websocket.onerror = function (evt) { onError(evt) };
	
    function onOpen(evt) {
        console.log("Conectado");
    }
	
    function onClose(evt) {
        console.log("Fechado");
    }
	
    function onMessage(evt) {
        console.log("Mensagem");
		var div_mensagem_recebida = document.getElementById("div_conteudo");
        var nova_mensagem = document.createElement('div');
        nova_mensagem.className = 'div_mensagem';
        var corpo_mensagem = document.createElement('div');
        corpo_mensagem.className = 'caixa_mensagem';
        corpo_mensagem.innerHTML = '<p>Test</p><span>Mang</span>'
        nova_mensagem.appendChild(corpo_mensagem);
        document.getElementById("div_conteudo").appendChild(nova_mensagem);
        irParaFimDiv();    
    }
	
    function onError(evt) {
        console.log("Erro");
        websocket.close();
    }
	
	form[0].addEventListener("submit", function (e) {
        mensagem_texto = mensagem.value;
        utilizador_texto = utilizador.value;
        var json = '{"utilizador" : "'+utilizador_texto+'", "mensagem" : "'+mensagem_texto+'"}';
        websocket.send(json);
        e.preventDefault();
    })
	
	function irParaFimDiv(){
        var element = document.getElementById("div_conteudo");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
    /*
    var socket = new WebSocket("ws://localhost:8080/ws");
    socket.onmessage = function (event) {
        var div_mensagem_recebida = document.getElementById("div_conteudo");
        //mensagem_recebida.textContent = event.data;
        var tag_inicial = document.createTextNode("<div class='caixa_mensagem caixa_mensagem_enviada'>");
        div_mensagem_recebida.appendChild(tag_inicial);
    };
    var form = document.getElementsByClassName("form_mensagem");
    var mensagem = document.getElementById("tb_enviar");
    var utilizador = document.getElementById("tb_utilizador");
   
    form[0].addEventListener("submit", function (e) {
        mensagem_texto = mensagem.value;
        utilizador_texto = utilizador.value;
        var json = '{"utilizador" : "'+utilizador_texto+'", "mensagem" : "'+mensagem_texto+'"}';
        socket.send(json);
        e.preventDefault();

        var div_mensagem_recebida = document.getElementById("div_conteudo");
        var nova_mensagem = document.createElement('div');
        nova_mensagem.className = 'div_mensagem';
        var corpo_mensagem = document.createElement('div');
        corpo_mensagem.className = 'caixa_mensagem';
        corpo_mensagem.innerHTML = '<p>Test</p><span>Mang</span>'
        nova_mensagem.appendChild(corpo_mensagem);
        document.getElementById("div_conteudo").appendChild(nova_mensagem);
        irParaFim();    
    })

    function irParaFim(){
        var element = document.getElementById("div_conteudo");
        element.scrollTop = element.scrollHeight - element.clientHeight;
     }
     */

});