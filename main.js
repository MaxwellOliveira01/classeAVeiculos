(function(win, doc) {
  'use strict';

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

    var id = 0;
    
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
      $tagImg.setAttribute('style', 'width:150px; height:100px');
      
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

    function handleClickRemoveButton(){
      var $trToBeRemoved = doc.querySelector('[data-js="btn' + this.value +'"]').parentNode.parentNode;
      $trToBeRemoved.parentNode.removeChild($trToBeRemoved);
    }

    function addRemoveButton(tr){

      var td = doc.createElement('td');
      var button = doc.createElement('button');
      button.setAttribute('value', id);
      button.setAttribute("data-js", "btn"+id);
      button.textContent = "Remover";

      button.onclick = handleClickRemoveButton;

      td.appendChild(button);
      tr.appendChild(td);
    };

    function addCarOnTable(car){
      var $documentFrag = doc.createDocumentFragment();
      var $tr = doc.createElement('tr');

      createAndAppendTdTagImg($tr, car.image);
      createAndAppendTdTag($tr, car.brandModel);
      createAndAppendTdTag($tr, car.year);
      createAndAppendTdTag($tr, car.plate);
      createAndAppendTdTag($tr, car.color);
      addRemoveButton($tr);

      $documentFrag.appendChild($tr);
      $table.get()[0].appendChild($documentFrag);
      id += 1;
    }

    function loadCars() {
      var req = new httpClient();
      req.get("http://localhost:3000/car", function(data) {
        data = JSON.parse(data);
        console.log(data);
        data.forEach(function(car){
          addCarOnTable(car);
        });
      });
    }

    function updateTable(){
      var req = new httpClient();
      req.get("http://localhost:3000/car", function(data){
        data = JSON.parse(data);
        addCarOnTable(data[data.length - 1]);
      });

    };

    function insertCarOnDataBase(){
      var req = new httpClient();

      var img = "image=" + $img.get()[0].value;
      var brandModel = "brandModel=" + $marca.get()[0].value;
      var year = "year=" + $ano.get()[0].value;
      var plate = "plate=" + $placa.get()[0].value;
      var color = "color=" + $cor.get()[0].value;

      console.log($placa);

      var data = img + '&' + brandModel + '&' + year + '&' + plate + '&' + color;
      req.post("http://localhost:3000/car", data);
    };

    $submit.on('click', function() {
      insertCarOnDataBase();
      updateTable();
      clearInput();
    })

    addCompanyInfo();
    loadCars();
  }

  win.app = app;
  app();

})(window, document);
