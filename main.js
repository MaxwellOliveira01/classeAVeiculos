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
    
    var addCompanyInfo = function() {
      var request = new httpClient();
      request.get('/src/company.json', function(data){
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
      removeCarFromDataBase(this.value);
    }

    function addRemoveButton(tr, plate){

      var td = doc.createElement('td');
      var button = doc.createElement('button');
      button.setAttribute('value', plate);
      button.setAttribute("data-js", "btn"+plate);
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
      addRemoveButton($tr, car.plate);

      $documentFrag.appendChild($tr);
      $table.get()[0].appendChild($documentFrag);
    }

    function loadCars() {
      var req = new httpClient();
      req.get("http://localhost:3000/car", function(data) {
        data = JSON.parse(data);
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

      var data = img + '&' + brandModel + '&' + year + '&' + plate + '&' + color;
      req.post("http://localhost:3000/car", data);
    };

    function removeCarFromDataBase(placa){
      var req = new httpClient();
      req.delete("http://localhost:3000/car", "plate=" + placa);
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
