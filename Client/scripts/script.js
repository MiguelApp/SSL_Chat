window.addEventListener("load", function () {

    var form = document.getElementsByClassName("form_mensagem");
    var mensagem = document.getElementById("tb_enviar");
    var utilizador = document.getElementById("tb_utilizador");

    var websocket = new WebSocket("wss://localhost:8000/");
    websocket.onopen = function (evt) { aoAbrir(evt) };
    websocket.onclose = function (evt) { aoFechar(evt) };
    websocket.onmessage = function (evt) { aoReceber(evt) };
    websocket.onerror = function (evt) { aoErro(evt) };

    function aoAbrir(evt) {
        console.log("Conectado");
    }

    function aoFechar(evt) {
        console.log("Fechado");
    }

    function aoReceber(evt) {
        console.log("Mensagem Recebida");

        try {
            var json_object = JSON.parse(evt.data);
        } catch (e) {
            
        }
        if(json_object == null)
        {
            novaMensagem(evt.data, true, true);
        }
        else
        {
            novaMensagem(json_object, true, false);
        }

    }

    function aoErro(evt) {
        console.log("Erro");
        websocket.close();
    }

    function novaMensagem(json, recebido, sistema) {
        var div_mensagem_recebida = document.getElementById("div_conteudo");
        var nova_mensagem = document.createElement('div');
        nova_mensagem.className = 'div_mensagem';
        var corpo_mensagem = document.createElement('div');
        if (recebido) {
            corpo_mensagem.className = 'caixa_mensagem caixa_mensagem_recebida';
        }
        else {
            corpo_mensagem.className = 'caixa_mensagem caixa_mensagem_enviada';
        }
        if(sistema)
        {
            corpo_mensagem.innerHTML = '<p>' + json + '</p><span>' + 'Sistema' + '</span>'
        }
        else
        {
            corpo_mensagem.innerHTML = '<p>' + json.mensagem + '</p><span>' + json.utilizador + '</span>'            
        }
        nova_mensagem.appendChild(corpo_mensagem);
        document.getElementById("div_conteudo").appendChild(nova_mensagem);
        irParaFimDiv();
    }


    form[0].addEventListener("submit", function (e) {
        console.log("Mensagem Enviada");
        mensagem_texto = mensagem.value;
        utilizador_texto = utilizador.value;
        var json = '{"utilizador" : "' + utilizador_texto + '", "mensagem" : "' + mensagem_texto + '"}';
        websocket.send(json);
        novaMensagem(JSON.parse(json), false, false);
        mensagem.value = '';
        e.preventDefault();
    })

    function irParaFimDiv() {
        var element = document.getElementById("div_conteudo");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
});