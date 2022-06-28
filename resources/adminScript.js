

////////////////////////////////////////////////////////////////////////////
//////////////////// Biggest ID + 1 (number of new object) ///////////////// object Id number which is going to be fetched/created
var parents = [];
var getParentValue = 0;

window.onload = function() {
    callLastId();
    makeOptionList();
  }

  function callLastId() {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/food`, true);

    xhttp.onload = function() {
      if(this.status == 200) {
        let idNumber = document.getElementById('category-name');
        const result = JSON.parse(this.responseText);

        for(let i=0; i<result.length; i++) {
            idNumber.value = result[i].id+1;
        }
        
        
      }
      else {
        alert('Failure!');
      }
    }

    xhttp.send();
  }

  document.getElementById('ref').addEventListener('click', refreshFunction)

  function refreshFunction(){
    callLastId();
  }

////////////////////////////////////////////////////////////////////////
//////////////////////////// Fetchin Data //////////////////////////////

document.getElementById('btn').addEventListener('click', addData);

function addData(){
            const getBrand = document.getElementById('product-name').value;
            const getCost = document.getElementById('parent-number').value;

            const object = {
                title: getBrand,
                parent: getCost
                        }
            let xhttp = new XMLHttpRequest();

            xhttp.open('POST', 'http://localhost:3000/food', true);
            xhttp.setRequestHeader('Content-Type','application/json');

            xhttp.onload = function() {
                if(this.status == 200 || 201) {
                    const data = JSON.parse(this.responseText);

                    var output2 = 'Success!';
                    callLastId();
                    document.getElementById('result').innerHTML = output2;
                }
                else {
                    document.getElementById('result').textContent = "Failure!";
                }
            }
            //console.log(JSON.stringify(object));
            xhttp.send(JSON.stringify(object));
            document.getElementById('product-name').value = '';
            document.getElementById('parent-number').value = '';
            document.getElementById('product-name').focus();
        
}
refreshFunction();

/////////////////////////////////////////////////////////////////////////
//////////////////////////// Fill DropDown ////////////////////////////// general function for every dropdown 

function fillDropDown(level,parent){
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/food?parent=${parent}`, true);

    xhttp.onload = function() {
      if(this.status == 200) {
        let dropNumber = document.getElementById(level);
        const result = JSON.parse(this.responseText);

        let output = '';
        for(let i=0; i<result.length; i++) {
            output += `
                        <option value="${result[i].id}" id="op${result[i].id}">${result[i].title}</option>
                        `;
        }
        dropNumber.innerHTML = output;
        
        for(let i=0; i<result.length; i++){
          document.getElementById(`op${result[i].id}`).addEventListener('click' , clickOption);
        }
        
      }
      else {
        alert('Failure!');
      }
    }

    xhttp.send(); 
}


////////////////////////////////////////////////////////////////////////////
//////////////////////////// Making Option List ////////////////////////////

document.getElementById('parents').addEventListener('click', makeOptionList);

function makeOptionList(){
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/food`, true);
    xhttp.onload = function() {
      if(this.status == 200) {
        const result = JSON.parse(this.responseText);
        
        let checkvalid = false;
        for(let i=0; i<result.length; i++) {
            for(let k=0; k<parents.length; k++){
                if(result[i].parent === parents[k]){
                    checkvalid = true;
                }
            }
            if(checkvalid === false){
                parents.push(result[i].parent);
            }else{
                checkvalid = false;
            }
        }
        parents.sort();
        let output = '';
       // parents.pop();
        // console.log(parents);
        for(let i=0; i<parents.length; i++){
            output += `<div class="row">
                          <div class="col-4 ml-auto">
                            <select id="sel${parents[i]}" name="level${parents[i]}" class="d-block mx-auto select w-100 h-100"></select>
                          </div>
                          <div class="col-4 mr-auto">
                            <button id="add${parents[i]}" class="btn-primary" type="button">Add</button>
                            <input id="addName${parents[i]}" type="text" class="pt-1" placeholder="Name">
                          </div>
                      </div>
                      `;
        }
        document.getElementById('optionList').innerHTML = output;
         for(let i=0; i<parents.length; i++){
         document.getElementById(`sel${parents[i]}`).addEventListener('click', clickOption);
         //document.getElementById(`addName${parents[i]}`).addEventListener('click', addItem());
         }
         fillDropDown(`sel${parents[0]}`,parseInt(parents[0]));
      }
      else {
        alert('Failure!');
      }
      
    }

    xhttp.send();
    
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////// Click Option //////////////////////////////

document.getElementById('test').addEventListener('click', testClick);

function testClick(){
  document.getElementById('sel0').addEventListener('change', clickOption);
}
function clickOption(){
  //console.log(`sel${parseInt(this.id.substring(3,(this.id.length)))+1}`)
  console.log('id: '+ this.value);
  let aaa = getParent(this.value);
  // let aaa = getParentValue;
  

  let i =0;
  while(parents[i] != parseInt(this.id.substring(3,(this.id.length)))){
    i++;
  }
  // console.log(parents[i+1]);
  if (parents[i+1] != undefined){
    fillDropDown(`sel${parents[i+1]}`,this.value)
  }
  //filterSelect(`sel${parseInt(this.id.substring(3,(this.id.length)))+1}`, this.value);
  
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////// Get Parent //////////////////////////////

function getParent (id){
  let xhttp = new XMLHttpRequest();
  let temp = "";
    xhttp.open('GET', `http://localhost:3000/food?id=${id}`, true);
    xhttp.onload = function() {
      if(this.status == 200) {
        const result = JSON.parse(this.responseText);
        console.log(result);
        temp = result[0].parent;
        console.log("temp: " +temp);
        getParentValue = result[0].parent;
        return getParentValue;
      }
      else {
        alert('Failure!');
      }
    }
    xhttp.send();

    //  INSTEAD OF SETTIMEOUT USE ASYNC AND AWAIT!!!
    setTimeout(function() {
      return getParentValue;
    }, 200)
}

////////////////////////////////////////////////////////////////////
//////////////////////////// Add Item //////////////////////////////

function addItem (name, parent){
  addData(name,parent);
}






//////////////////////////////////////////////////////////////////////////////
//////////////////////////// Getting Image Link //////////////////////////////

document.getElementById('product-img').addEventListener('change', showImageLink);

function showImageLink (){
  let imgLink = document.getElementById('product-img').value;
   console.log(imgLink);
}

////////////////////////////////////////////////////////////////////////////
//////////////////////////// Product List Scripts//////////////////////////////

document.getElementById("body").onload = function () {renderProducts()}


let selectedRow = null;

function onFormSubmit() {
  let formData = readFormData();
  if (selectedRow == null)
      addCarToServer(formData);
  else
      updateCarOnServer(formData);
}

function readFormData() {
  // e.preventDefault();
  let id = document.getElementById('car-id').value
  let intention = document.getElementById('intention').value;
  let name = document.getElementById('car-name').value;
  let description = document.getElementById('car-description').value;
  let imgUrl = document.getElementById('car-img').value;

  // intention: intention, name:name etc..
  // prop.names and values names are the same
  // Object Desctructing
  const car = { id, intention, name, description, imgUrl };
  return car;
}


/*******************/
/* CRUD OPERATIONS */
/*******************/

function renderProducts() {
  let xhttp = new XMLHttpRequest();

  xhttp.open('GET', 'http://localhost:3000/food', true);
  xhttp.onload = function() {
    if(this.status == 200 || this.status == 201) {
      let products = JSON.parse(this.responseText);
      console.log("render function is working properly")
      for(let i=0; i < products.length; i++) {
        console.log(`${products[i].title} have been rendered!`)
        insertNewRecord(products[i]);
      }
    }
    else {
      alert("Some problem occured!");
    }
  }

  xhttp.send();
}

function addCarToServer(car) {
  let xhttp = new XMLHttpRequest();

  xhttp.open('POST', 'http://localhost:3000/food', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onload = function() {
    if(this.status == 200 || this.status == 201) {
      const data = JSON.parse(this.responseText);
      insertNewRecord(data);
      resetForm();
    }
    else {
      alert("Not saved!");
    }
  }

  xhttp.send(JSON.stringify(car));
  clearInput();
}

function insertNewRecord(data) {
  let table = document.getElementById("productList").getElementsByTagName('tbody')[0];
  let newRow = table.insertRow(table.length);

  cell0 = newRow.insertCell(0);
  cell0.innerHTML = data.id;
  cell1 = newRow.insertCell(1);
  cell1.innerHTML = data.title;
  cell2 = newRow.insertCell(2);
  cell2.innerHTML = data.parent;
  
  cell3 = newRow.insertCell(3);
  cell3.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                     <a onClick="onDelete(this)">Delete</a>`;
}

function updateCarOnServer(formData) {
  let xhttp = new XMLHttpRequest();

  xhttp.open('PUT', `http://localhost:3000/food/${formData.id}`, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onload = function() {
    if(this.status == 200 || this.status == 201) {
      updateRecord(formData);
      resetForm();
    }
    else {
      alert("Some problem occured.")
    }
  }

  xhttp.send(JSON.stringify(formData));
}

function deleteCar(id) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', `http://localhost:3000/cars/${id}`, true);

  xhttp.onload = function() {
    if(this.status == 200 || this.status == 201) {
      document.getElementById("carList").deleteRow(row.rowIndex);
      resetForm();
    }
    else {
      alert("Some problem occured!")
    }
  }
  xhttp.send(JSON.stringify(id));
}

/********************/
/* HELPER FUNCTIONS */
/********************/

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.id;
  selectedRow.cells[1].innerHTML = formData.intention;
  selectedRow.cells[2].innerHTML = formData.name;
  selectedRow.cells[3].innerHTML = formData.description;
  selectedRow.cells[4].innerHTML = formData.imgUrl;
}

function onDelete(btn) {
  if (confirm('Are you sure to delete this record ?')) {
      row = btn.parentElement.parentElement;
      deleteCar(row.cells[0].innerHTML);
  }
}

function onEdit(btn) {
  selectedRow = btn.parentElement.parentElement;
  console.log(selectedRow);
  document.getElementById("car-id").value = selectedRow.cells[0].innerHTML;
  document.getElementById("intention").value = selectedRow.cells[1].innerHTML;
  document.getElementById("car-name").value = selectedRow.cells[2].innerHTML;
  document.getElementById("car-description").value = selectedRow.cells[3].innerHTML;
  document.getElementById("car-img").value = selectedRow.cells[4].innerHTML;
}

function clearInput() {
  let intention = document.getElementById('intention');
  let name = document.getElementById('car-name');
  let description = document.getElementById('car-description');
  let imgUrl = document.getElementById('car-img');

  intention.value = "";
  name.value = "";
  description.value = "";
  imgUrl.value = "";
}

function resetForm() {
  document.getElementById("car-id").value = "";
  document.getElementById("intention").value = "";
  document.getElementById("car-name").value = "";
  document.getElementById("car-description").value = "";
  document.getElementById("car-img").value = "";
  selectedRow = null;
}
