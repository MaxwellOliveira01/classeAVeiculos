(function(win, doc) {
  'use strict';
  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  
  function app(){

    var $nomeEmp = new DOM('[data-js="nomeEmpresa"]');
    var $telEmp = new DOM('[data-js="telefoneEmpresa"]');

    var $marca = new DOM('[data-js="marca"]');
    var $ano = new DOM('[data-js="ano"]');
    var $placa = new DOM('[data-js="placa"]');
    var $cor = new DOM('[data-js="cor"]');
    var $img = new DOM('[data-js="img"]');
    var $submit = new DOM('[data-js="submit"]');

    var $table = new DOM('[data-js="table"]');
    
    var addCompanyInfo = function() {
      var request = new httpClient();
      request.get('/company.json', function(data){
        data = JSON.parse(data);
        $nomeEmp.get()[0].innerText = data.name;
        $telEmp.get()[0].innerText = data.phone;
      });
    }

    function createAndAppendTdTag($tagTr, text) {
      var $td = doc.createElement('td');
      $td.textContent = text;
      $tagTr.appendChild($td);
    }

    function createAndAppendTdTagImg($tagTr, sourceUrl) {
      var $tdImg = doc.createElement('td');
      var $tagImg = doc.createElement('img');
      
      $tagImg.setAttribute('src', sourceUrl);
      $tagImg.setAttribute('style', 'max-width:150px; max-height:150px');
      
      $tdImg.appendChild($tagImg);
      $tagTr.appendChild($tagImg);
    }

    function clearInput(){

      $marca.get()[0].value = "";
      $ano.get()[0].value = "";
      $placa.get()[0].value = "";
      $cor.get()[0].value = "";
      $img.get()[0].value = "";
      
    };

    $submit.on('click', function() {
      var $documentFrag = doc.createDocumentFragment();
      var $tr = doc.createElement('tr');

      
      createAndAppendTdTagImg($tr, $img.get()[0].value);
      createAndAppendTdTag($tr, $marca.get()[0].value);
      createAndAppendTdTag($tr, $ano.get()[0].value);
      createAndAppendTdTag($tr, $placa.get()[0].value);
      createAndAppendTdTag($tr, $cor.get()[0].value);
  
      $documentFrag.appendChild($tr);

      $table.get()[0].appendChild($documentFrag);

      clearInput();

    })

    addCompanyInfo();
  }

  win.app = app;
  app();

})(window, document);
