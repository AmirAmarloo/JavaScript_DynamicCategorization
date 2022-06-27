

////////////////////////////////////////////////////////////////////////////
//////////////////// Biggest ID + 1 (number of new object) ///////////////// object Id number which is going to be fetched/created
var parents = [];
//ar getParentValue = "";
var currentParentId = '';
var currentId = '';
var dataURL;


window.onload = function() {
	callLastId();
	initparents();
};

function initparents(){
	let xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'http://localhost:3000/food', true);
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
		}
		else {
			alert('Failure!');
		}
		makeOptionList('0');
	};
	xhttp.send(); 
}

function callLastId() {
	let xhttp = new XMLHttpRequest();

	xhttp.open('GET', 'http://localhost:3000/food', true);

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
	};

	xhttp.send();
}

document.getElementById('ref').addEventListener('click', refreshFunction);

function refreshFunction(){
	callLastId();
}

////////////////////////////////////////////////////////////////////////
//////////////////////////// Fetchin Data //////////////////////////////

document.getElementById('btn').addEventListener('click', addData);

function addData(){
	const getBrand = document.getElementById('product-name').value;
	const getCost = document.getElementById('parent-number').value;
	const image = dataURL;
	const object = {
		title: getBrand,
		parent: getCost,
		image: image
	};
	let xhttp = new XMLHttpRequest();

	xhttp.open('POST', 'http://localhost:3000/food', true);
	xhttp.setRequestHeader('Content-Type','application/json');

	xhttp.onload = function() {
		if(this.status == (200 || 201)) {

			var output2 = 'Success!';
			callLastId();
			document.getElementById('result').innerHTML = output2;
		}
		else {
			document.getElementById('result').textContent = 'Failure!';
		}
	};
	xhttp.send(JSON.stringify(object));
	document.getElementById('product-name').value = '';
	document.getElementById('parent-number').value = '';
	document.getElementById('product-name').focus();

}
refreshFunction();



//////////////////////////////////////////////////////////////////////////////
//////////////////////////// Click Option //////////////////////////////

document.getElementById('test').addEventListener('click', testClick);

function testClick(){
	showGoods();
}

// function showMyalert(somting){
//   alert(somting);
// }

// function mmt (a, b, callback1){
//   let sum = a + b;
//   callback1(sum);
// }

// mmt(4,5, showMyalert);

function showGoods(){
	let xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'http://localhost:3000/food', true);
	xhttp.onload = function() {
		if(this.status == 200) {
			const result = JSON.parse(this.responseText);
			let goods = [];
			let innerCond = '';
			for (let i = 0; i < result.length; i++){
				innerCond = '';
				for (let k = 0; k < result.length; k++){
					if (k == i){
						continue;
					}
					if (result[i].id == result[k].parent){
						innerCond = '';
						break;
					}
					else{
						innerCond = i;
					}
				}
				if (innerCond != ''){
					goods.push(innerCond);
				}
			}
			console.log('Goods: ' + goods);
			let cardElement = '';
			cardElement = document.getElementById('divCard');
			let output = '';
			for (let i = 0; i < goods.length; i++){
				output += `<div id = "divCard${i}" class="card mx-auto mt-2" style="text-align: center;" draggable="true" >
                      <img id = "cardImage${goods[i]}" class="card-img-top" style="border-radius: 10px 10px 0px 0px; box-shadow: none;" src="" alt="Card image cap">
                      <div class="card-body" style="border-radius: 0px; box-shadow: none;">
                        <h5 id = "cardTitle${goods[i]}" class="card-title" style="border-radius: 0px; box-shadow: none;"></h5>
                        <p class="card-text" style="border-radius: 0px; box-shadow: none;">Price: ??? HUF</p>
                        <div  style="border-radius: 0px; box-shadow: none;">
                          <a href="#" class="btn btn-primary mt-auto" style="box-shadow: none;">Order</a>
                        </div>
                      </div>
                    </div>`;
			}
			cardElement.innerHTML = output;
			setTimeout(function() {
				for (let i = 0; i < goods.length; i++){
					document.getElementById(`"cardImage${goods[i]}"`).addEventListener('onmousedown', divDown);
					document.getElementById(`"cardImage${goods[i]}"`).addEventListener('onmouseup', divUp);
				}
			}, 10);
			// document.getElementById(`cardImage4`).src = result[goods[2]].image;
			// document.getElementById(`cardTitle4`).innerHTML = result[goods[2]].title + " " + result[goods[2]].id + " " + "goods[i]: "+ goods[2];
			for (let i = 0; i < result.length; i++){
				console.log(result[i].id + ' ' + result[i].title + ' i: ' + i);
			}
			for (let i = 0; i < goods.length; i++){
				console.log(goods[i]);
				document.getElementById(`cardImage${goods[i]}`).src = result[goods[i]].image;
				document.getElementById(`cardTitle${goods[i]}`).innerHTML = result[goods[i]].title ;

			}
			console.log(result[20].title);
			console.log(result[20].id);
		}
		else {
			alert('Failure!');
		}
	};
	xhttp.send();  
}

function divDown () {
	console.log(this);
	this.style['boxShadow'] = 'none';
}
function divUp () {
	this.style['boxShadow'] = '0 5px 6px rgba(0, 0, 0, 0.26)';
}
function clickOption () {
	//this.selectedIndex = "2";
	//console.log("Before return: "+this.value);
	if (this.innerHTML==''){
		return;
	}
	currentId = this.options[this.selectedIndex].value;
	let nextList = parseInt(parents.indexOf(this.id.substring(this.id.length, 3)))+1;
	for (let i = nextList+1; i<parents.length; i++){
		let tmp = document.getElementById('optionList'+parents[i]);
		if (tmp != null){
			tmp.remove();
		}
	}
	getParent(currentId);
	if (currentId !=''){
		// console.log(parents)
		// console.log(this.id);
		// console.log(nextList);
		//output = document.getElementById('optionList').innerHTML;

		makeOptionList(parents[nextList]);
		if (document.getElementById('sel'+parents[nextList]) != null){
			fillDropDown('sel'+parents[nextList], currentId);
		}
	}
	// for (let i = nextList + 1; i<parents.length; ++i ){
	//   document.getElementById("sel"+parents[i]).innerHTML = "";
	// }
	//console.log(this.value);
	setSrcToImage(this.value);

	//console.log('Click option CurrentID:' + currentId);
	//console.log('Click option CurrentParentID:' + currentParentId);
}

function setSrcToImage(id){
	let xhttp = new XMLHttpRequest();
	xhttp.open('GET', `http://localhost:3000/food?id=${id}`, true);
	xhttp.onload = function() {
		if(this.status == 200) {
			const result = JSON.parse(this.responseText);
			document.getElementById('img2').src = result[0].image;
		}
		else {
			alert('Failure!');
		}
	};
	xhttp.send();
}


/////////////////////////////////////////////////////////////////////////
//////////////////////////// Fill DropDown ////////////////////////////// general function for every dropdown

function fillDropDown(level,parent){
	let xhttp = new XMLHttpRequest();
	xhttp.open('GET', `http://localhost:3000/food?parent=${parent}`, true);
	xhttp.onload = function() {
		if(this.status == 200) {
			//console.log("level: " + level);
			let dropNumber = document.getElementById(level);
			//console.log(typeof dropNumber);
			const result = JSON.parse(this.responseText);
			let output1 = '';
			for(let i=0; i<result.length; i++) {
				output1 += `
                        <option value="${result[i].id}" id="op${result[i].id}">${result[i].title}</option>
                      `;
			}
			if (result.length == 0){
				if (dropNumber.innerHTML != ''){
					dropNumber.innerHTML = '';
				}
			}
			else
			{
				// output1 = "<option >   </option>" + output1;

				dropNumber.innerHTML = output1;
			}
		}
		else {
			alert('Failure!');
		}
	};
	xhttp.send();
}
////////////////////////////////////////////////////////////////////////////
//////////////////////////// Making Option List ////////////////////////////

document.getElementById('parents').addEventListener('click', deleteElement);
function deleteElement() {
	//sendHttpRequest('DELETE', 'http://localhost:3000/food?id=42');
	//deletePerson(42);
	anotherDelete();
}



const deletePerson = async (id) => {
	console.log(`http://localhost:3000/food?id=${id}`);
	//return;
	await fetch(`http://localhost:3000/food?id=${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json'
		}
	});
	//await setPeople(people.filter(person => person.id !== id));
};

function sendHttpRequest(method, url, data) {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		console.log(url);
		xhr.open('DELETE', 'http://localhost:3000/food?id=42', true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			resolve(xhr.response);
		};
		xhr.send(null);
	});
	return promise;
}
  


function anotherDelete(){
	var url = "http://localhost:3000/food?id=42";
	var xhr = new XMLHttpRequest();
	
	xhr.open("DELETE", url, true);
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
		} else {
			console.error(users);
		}
	}
	xhr.send(null);	
}

function makeOptionList(prnt){



	// if (document.body.contains(document.getElementById(idname)))
	// {
	//   // Exists.
	//   alert("Exists");
	// }  

	// if (document.getElementById("optionList"+prnt)  =! null){
	//   console.log("sdkjsdkjhsdkfhskjdhfskjdhfksjhfkjsd");
	//   return;
	// }
	//let xhttp = new XMLHttpRequest();
	//xhttp.open('GET', `http://localhost:3000/food?parent=${parent}`, true);
	//xhttp.onload = function() {
	//if(this.status == 200) {
	//const result = JSON.parse(this.responseText);
	// let checkvalid = false;
	// for(let i=0; i<result.length; i++) {
	//     for(let k=0; k<parents.length; k++){
	//         if(result[i].parent === parents[k]){
	//             checkvalid = true;
	//         }
	//     }
	//     if(checkvalid === false){
	//         parents.push(result[i].parent);
	//     }else{
	//         checkvalid = false;
	//     }
	// }
	// parents.sort();
        
	// parents.pop();
	//console.log(parents.length);
	//console.log(parents);
	//for(let i = 0; i < parents.length; i++){
	var output = `<div class="row">
                        <div class="col-4 ml-auto">
                          <select id="sel${prnt}" name="level${prnt}" class="d-block mx-auto select w-100 h-100"></select>
                        </div>
                        <div class="col-4 mr-auto">
                          <button id="add${prnt}" class="btn-primary" type="button" )">Add</button>
                          <button id="addChild${prnt}" class="btn-primary" type="button" )">Add Child</button>
                          <input id="addName${prnt}" type="text" class="pt-1" placeholder="Name">
                        </div>
                      </div>
                    `;    

	//}
	//console.log(output);
	var idname = `optionList${prnt}`;
	var myEle = document.getElementById(idname);
	if(myEle  !== null){
		//alert("NOT EXISTS!!!!");
		return;
	}
	var elemDiv = document.createElement('div');
	elemDiv.id = `optionList${prnt}`;
	elemDiv.className = 'container';
	// elemDiv.innerHTML = `<div id="optionList${prnt}" class="container">
	//                     </div>`;
	document.body.appendChild(elemDiv);


	elemDiv.innerHTML = output;
	fillDropDown(`sel${prnt}`,parseInt(prnt));
	for(let i = 0; i < parents.length; i++){
		// console.log("length of loop: " + i);
		if(document.getElementById(`sel${parents[i]}`) !== null){
			document.getElementById(`sel${parents[i]}`).addEventListener('click', clickOption);
		}
		if(document.getElementById(`addChild${parents[i]}`) !== null){
			document.getElementById(`addChild${parents[i]}`).addEventListener('click', MakeChildList);
		}
		if(document.getElementById(`add${parents[i]}`) !== null){
			document.getElementById(`add${parents[i]}`).addEventListener('click', addCategory);
		}
		if(document.getElementById(`addName${parents[i]}`) !== null){
			document.getElementById(`addName${parents[i]}`).addEventListener('focus', getFocus);
		}
	}

	//}
	// else {
	//  alert('Failure!');
	// }
	//}
	//xhttp.send();
}

function MakeChildList(){
	//console.log(this.id.substring(this.id.length, 8));
	let selectObj = document.getElementById('sel'+this.id.substring(this.id.length, 8));
	//let selectObj = document.getElementById('sel' + (parents.indexOf(this.id.substring(this.id.length, 8)) - 1));
	if (selectObj === null){
		return;
	}
	if (document.getElementById('addName' + this.id.substring(this.id.length, 8)).value == ''){
		return;
	}
	const title = document.getElementById('addName' + this.id.substring(this.id.length, 8)).value;
	const parent = selectObj.options[selectObj.selectedIndex].value;
	const image = dataURL;
	const object = {
		title: title,
		parent: parent,
		image: image
	};
	let xhttp = new XMLHttpRequest();
	xhttp.open('POST', 'http://localhost:3000/food', true);
	xhttp.setRequestHeader('Content-Type','application/json');
	xhttp.onload = function() {
		if(this.status == (200 || 201)) {
			var output2 = 'Success!';
			callLastId();
			document.getElementById('result').innerHTML = output2;
		}
		else {
			document.getElementById('result').textContent = 'Failure!';
		}
	};
	xhttp.send(JSON.stringify(object));
}

function addCategory(){
  
	if (document.getElementById('addName' + this.id.substring(this.id.length, 3)).value == ''){
		return;
	}
	let thisParent = 0;
	let selectObj = document.getElementById('sel' + (parents.indexOf(this.id.substring(this.id.length, 3)) - 1));
	if (selectObj != null){
		thisParent = selectObj.options[selectObj.selectedIndex].value;
	}
//	return;

	// if (parents.indexOf(this.id.substring(this.id.length, 3)) == 0){
	// 	currentParentId = '0';
	// }
	// else
	// {
	// 	currentParentId = currentId;
	// }
	// console.log('currentId: ', currentId);
	// console.log('currentParentI: ', currentParentId);
	// console.log(this.id);
	//return;
	//var selobj = document.getElementById("sel" + this.id.substring(this.id.length, 3));
	//console.log(selobj.options[this.selectedIndex].value);
	// return;
	const title = document.getElementById('addName' + this.id.substring(this.id.length, 3)).value;
	const parent = thisParent;
	const image = dataURL;
	const object = {
		title: title,
		parent: parent,
		image: image
	};
	let xhttp = new XMLHttpRequest();
	xhttp.open('POST', 'http://localhost:3000/food', true);
	xhttp.setRequestHeader('Content-Type','application/json');
	xhttp.onload = function() {
		if(this.status == (200 || 201)) {
			var output2 = 'Success!';
			callLastId();
			document.getElementById('result').innerHTML = output2;
		}
		else {
			document.getElementById('result').textContent = 'Failure!';
		}
	};
	xhttp.send(JSON.stringify(object));
	fillDropDown('sel' + this.id.substring(this.id.length, 3),currentParentId);
}

function getFocus(){
	let selDrop = document.getElementById('sel'+this.id.substring(this.id.length, 7));
	console.log(this.id.substring(this.id.length, 7));
	if (selDrop != null){
		//console.log(selDrop.options[this.selectedIndex].value);
		//console.log(selDrop.options[selDrop.selectedIndex].value);
		//currentId = selDrop.options[selDrop.selectedIndex].value;
		//currentParentId = this.id.substring(this.id.length, 7);
	}
	//console.log(selDrop.innerHTML);
	if (selDrop.innerHTML == ''){
		//currentParentId = currentId;
		//getParent(currentId);
		//fillDropDown(currentId, currentParentId);
	}
	else
	{
		//selDrop.click();
    
	}
	//console.log(currentParentId);

}
//////////////////////////////////////////////////////////////////////////////
//////////////////////////// Get Parent //////////////////////////////
function getParent(id){
	if (id != ''){
		let xhttp = new XMLHttpRequest();
		xhttp.open('GET', `http://localhost:3000/food?id=${id}`, true);
		xhttp.onload = function() {
			if(this.status == 200) {
				const result = JSON.parse(this.responseText);
				currentParentId = result[0].parent;
				return currentParentId;
			}
			else {
				alert('Failure!');
			}
		};
		xhttp.send();
	}
	//  INSTEAD OF SETTIMEOUT USE ASYNC AND AWAIT!!!
	setTimeout(function() {
		return currentParentId;
	}, 200);
}
////////////////////////////////////////////////////////////////////
//////////////////////////// Add Item //////////////////////////////
// function addItem (name, parent){
// 	addData(name,parent);
// }
//////////////////////////////////////////////////////////////////////////////
//////////////////////////// Getting Image Link //////////////////////////////
//document.getElementById('product-img').addEventListener('change', showImageLink);
document.getElementById('product-img').onchange = function (evt) {
	var tgt = evt.target || window.event.srcElement,
		files = tgt.files;
	// FileReader support
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	if (FileReader && files && files.length) {
		var fr = new FileReader();
		fr.onload = function (outputFormat) {
			img.onload = function(){
				var canvas = document.createElement('CANVAS');
				var ctx = canvas.getContext('2d');

				canvas.height = this.height;
				canvas.width = this.width;
				ctx.drawImage(this, 0, 0);
				dataURL = canvas.toDataURL(outputFormat);
				canvas = null;
			};
			document.getElementById('img2').src = fr.result;
			img.src = document.getElementById('img2').src;
		};
		fr.readAsDataURL(files[0]);
	}

	// Not supported
	else {
		// fallback -- perhaps submit the input to an iframe and temporarily store
		// them on the server until the user's session ends.
	}
};




////////////////////////////////////////////////////////////////////////////
////////////////////////////.........//////////////////////////////

