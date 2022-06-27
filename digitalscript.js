/* eslint-disable no-unreachable */
/* eslint-disable indent */
var parents = [];
var childJson = [];
var currentParentId = '';
var myCurrentObj = [];
var myCurrentPrt = [];
//var curParent = 0;
//ar getParentValue = "";
var resultJson = [];
var clicked = false;

let myPromise = new Promise(function(myResolve, myReject) {
	let xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'http://localhost:3000/food', true);
	xhttp.onload = function() {
		if(this.status == 200) {
			resultJson = JSON.parse(this.responseText);
			let checkvalid = false;
			for(let i=0; i<resultJson.length; i++) {
				for(let k=0; k < parents.length; k++){
					if(resultJson[i].parent === parents[k]){
						checkvalid = true;
					}
				}
				if(checkvalid === false){
					parents.push(resultJson[i].parent);
				}else{
					checkvalid = false;
				}
			}
			parents.sort();
			myResolve('OK');
		}
		else {
			alert('Failure!');
			myReject('Error');
		}
		//makeOptionList('0');
	};
	xhttp.send();


});

window.onload = function() {
	//initparents();
	getChild();
    setTimeout(() => {makeCarousel();}, 650);

};


document.getElementById('dropdownMenuButton').addEventListener('click', catClick);

function catClick(){
    if (clicked){
        document.getElementById('navBox1').style.display = 'block';
        document.getElementById('navBox2').style.display = 'block';
        clicked = false;
    }
    else{
        document.getElementById('navBox1').style.display = 'none';
        document.getElementById('navBox2').style.display = 'none';
        clicked = true;

    }

}

// document.getElementById('navBox1').addEventListener('mouseout', function() {
//     document.getElementById('navBox1').style.display = "none";
//     document.getElementById('navBox2').style.display = "none";
// })

document.getElementById('products').addEventListener('mouseover', function() {
	document.getElementById('navBox1').style.display = 'none';
	document.getElementById('navBox2').style.display = 'none';
});

document.getElementById('navBox1').addEventListener('onmouseout', function() {
	document.getElementById('navBox1').style.display = 'none';
	document.getElementById('navBox2').style.display = 'none';
});
document.getElementById('navBox2').addEventListener('onmouseout', function() {
	document.getElementById('navBox1').style.display = 'none';
	document.getElementById('navBox2').style.display = 'none';
});

//document.getElementById('testbtn').addEventListener('click', clickTest);

function clickTest(){
    //showObject(testfunc()); 
   // console.log(hasChild(1));
   myCurrentObj = [];
   //console.log("Befor myCurrentObj's Initialization" + myCurrentObj);
   //let tmptest = getProductByParent(1);
//    for (let i = 0; i < tmptest.length; ++i){
//     console.log('Id: ' + resultJson[tmptest[i]].id);
//     console.log('Title: ' + resultJson[tmptest[i]].title);
//     console.log('Parent: ' + resultJson[tmptest[i]].parent);
//     console.log('---------------------');
//    }
    //console.log(getProductByParent(1));
    //console.log(myCurrentPrt);
    // console.log(resultJson[18].title);
    // console.log(resultJson[34].title);
    // console.log(resultJson[19].title);
    // console.log(resultJson[24].title);
    myCurrentPrt = [];
    getParentById(34);
    generateHTML();

    myCurrentPrt = [];
    getParentById(38);
    generateHTML();

    myCurrentPrt = [];
    getParentById(25);
    //console.log(myCurrentPrt);
    generateHTML();

    myCurrentPrt = [];
    getParentById(42);
    generateHTML();

}



document.getElementById('testInp').addEventListener('focusout', testFocusOut);
function testFocusOut(){
    alert(resultJson[this.value].title + '   id: ' + resultJson[this.value].id);
    //this.focus();
}


//////////////////////////////////////////////////////////////////////////////////////////////

function generateHTML(){
    let targetElement = document.getElementById('divProduct');
    let output = targetElement.innerHTML;
    let closeDiv = 0;
    console.log(myCurrentPrt);
    let h4Create = false;
    for (let i = 0; i < myCurrentPrt.length; i++){
        if (i == (myCurrentPrt.length - 1) && document.getElementById(`p${resultJson[myCurrentPrt[i]].id}`) == null){
            if (myCurrentPrt.length == 2){
               output += `<h5 class ="procTitle"> ${resultJson[myCurrentPrt[i]].title} </h5>` ;
               h4Create = true;
            }
            // if (! h4Create){

            //     output += `${' '.repeat(i * 4)} <h5 class ="procTitle"> ${resultJson[myCurrentPrt[i]].title} </h5>
            //                                     <div id = "pCard${resultJson[myCurrentPrt[i]].id}" class="card mx-auto mx-md-1 mb-1" style="width: 20rem;">
            //                                     <img class="card-img-top" src="${resultJson[myCurrentPrt[i]].image}" alt="Card image cap">
            //                                     <div class="card-body">
            //                                         <h5 class="card-title">${resultJson[myCurrentPrt[i]].title}</h5>
            //                                         <p class="card-text">Price: 125,000 HUF</p>
            //                                         <a id = "aCard${resultJson[myCurrentPrt[i]].id}" class="btn btn-primary">Order</a>
            //                                     </div>`;
            //     h4Create = true;
            // }
            // else
            // {

                output += `${' '.repeat(i * 4)} <div id = "pCard${resultJson[myCurrentPrt[i]].id}" class="card mx-auto mx-md-1 mb-1" style="width: 20rem;" draggable="true">
                                                <img class="card-img-top" src="${resultJson[myCurrentPrt[i]].image}" alt="Card image cap">
                                                <div class="card-body">
                                                    <h5 class="card-title">${resultJson[myCurrentPrt[i]].title}</h5>
                                                    <p class="card-text">Price: 125,000 HUF</p>
                                                    <a id = "aCard${resultJson[myCurrentPrt[i]].id}" class="btn btn-primary">Order</a>
                                                </div>`;
           // }
    
        }
        else
        {
            if (document.getElementById(`p${resultJson[myCurrentPrt[i]].id}`) == null){
                if ((((i == myCurrentPrt.length - 2) || (myCurrentPrt.length == 2))) && ! h4Create){
                    output += `${' '.repeat(i * 4)}<div id = "p${resultJson[myCurrentPrt[i]].id}" style="display: flex;" class="justify-content-center pt-2">
                                <h5 class ="procTitle"> ${resultJson[myCurrentPrt[i]].title} </h5> ;
                    `;
                    h4Create = true;
                }
                else{
                    output += `${' '.repeat(i * 4)}<div id = "p${resultJson[myCurrentPrt[i]].id}" style="display: block;" class="justify-content-center pt-2">
                    `;
                }
                    
                                                
                //  if (i == 0 || i == (myCurrentPrt.length - 2)){
                //      output +=`<h5 class="text-center">${resultJson[myCurrentPrt[i]].title}</h5>`;
                //  }
                closeDiv += 1;
            }
            else
            {
                targetElement = document.getElementById(`p${resultJson[myCurrentPrt[i]].id}`);
                output = targetElement.innerHTML;
            }
        }
    }   
    for (let i = closeDiv; i > 0; i--){
        output += `${' '.repeat(i * 4)}</div>

        `;
    }   
    targetElement.innerHTML = output;
   
    for (let i = 0; i < myCurrentPrt.length; i++){
        let tmpElmnt = document.getElementById(`pCard${resultJson[myCurrentPrt[i]].id}`);
        if (tmpElmnt != null){
            tmpElmnt.addEventListener('dragstart', event => {
                event.dataTransfer.setData('text/plain', this.id);
                event.dataTransfer.effectAllowed = 'move';
            });
        }
    }
    for (let i = 0; i < myCurrentPrt.length; i++){
        let tmpElmnt = document.getElementById(`pCard${resultJson[myCurrentPrt[i]].id}`);
        if (tmpElmnt != null){
            tmpElmnt.addEventListener('dragenter', event => {
                if (event.dataTransfer.types[0]==='text/plain'){
                    alert('lkn');
                    event.preventDefault();
                }
            });
        }
    }

}


function getProductByParent(_parent){
    for (let i = 0; i < resultJson.length; i++){
        if (resultJson[i].id != _parent.toString()){
            continue;
        }
        let tmpChild = hasChild(resultJson[i].id);
        //console.log('Parent ' + resultJson[i].id + ' is tmpChild: ' + tmpChild);
        if (tmpChild.length > 0){
            for (let k = 0; k < tmpChild.length; k++){
                getProductByParent(tmpChild[k]);
            }
        }
        else
        {
            myCurrentObj.push(i);
        }
    }
    return myCurrentObj;
}

function getParentById(id){
    for (let i = 0; i < resultJson.length; i++){
        if (resultJson[i].id != id){
            continue;
        }
        if (resultJson[i].parent != 0) {
            getParentById(parseInt(resultJson[i].parent));
        }
        myCurrentPrt.push(i);
    }
}


function hasChild(_id){
    let parentOfThis = [];
    for (let i = 0; i < resultJson.length; ++i){
        if (resultJson[i].id != _id){
            continue;
        }
        for(let k = 0; k < resultJson.length ; ++k){
            if (resultJson[i].id == resultJson[k].id){
                continue;
            }
            if (resultJson[i].id == resultJson[k].parent){
                parentOfThis.push(resultJson[k].id);
            }
        }
    }
    return parentOfThis;
}
 



function getChild(){
    myPromise.then(
        // eslint-disable-next-line no-unused-vars
        function(value) {
            makeChild(0);
		}
        );
    }

function makeChild(_parent){
    childJson = [];
    for (let i = 0; i < resultJson.length; ++i){
        if (resultJson[i].parent === _parent.toString()){
            childJson.push(resultJson[i]);
        }
    }

}

function getTitle(id){
    for (let i = 0; i < resultJson.length; i++){
        if (resultJson[i].id != id){
            continue;
        }
        return resultJson[i].title;
    }
}

function makeCarousel (){
    let crous = document.getElementById('innerCrousel');
    let olCrous = document.getElementById('olCrousel');
    let output = '';
    let outputol = '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>';
    for (let i = 0; i < childJson.length; ++i){
        if (i == 0) {
            output += `<div class="carousel-item active">
                        <img id = "carouselImg${childJson[i].id}" class="d-block w-80"  src="${childJson[i].image}">
                        </div>`;
        }
        else
        {
            output += `<div class="carousel-item">
                        <img id = "carouselImg${childJson[i].id}" class="d-block w-80"  src="${childJson[i].image}">
                        </div>`;
        }
        if (i > 0 ){
            outputol += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
        }
    }
    olCrous.innerHTML = outputol;
    crous.innerHTML = output;
    setTimeout(function() {
        for (let i = 0; i < childJson.length; ++i){
            document.getElementById(`carouselImg${childJson[i].id}`).addEventListener('click', carouselImgClick);
        }
    }, 10);
}

function carouselImgClick() {
    currentParentId = this.id.substring(this.id.length, 11);
    myCurrentObj = [];
    console.log('currentParentId: ' + getProductByParent(currentParentId));
    document.getElementById('divProduct').innerHTML = '';
    document.getElementById('h4Head').innerHTML = getTitle(currentParentId);
    for (let i = 0; i < myCurrentObj.length; ++i){
        myCurrentPrt = [];
        getParentById(resultJson[myCurrentObj[i]].id);
        generateHTML();
    }
    for (let i = 0; i < resultJson.length; ++i){
        let aBtn = document.getElementById(`aCard${resultJson[i].id}`);
        if (aBtn != null){
            aBtn.addEventListener('mousedown', goodCardClick);
            aBtn.addEventListener('mouseup', goodCardUpClick);
        } 
    }

}

function goodCardClick() {
    document.getElementById('pCard' + this.id.substr(5, this.id.length-4)).style['boxShadow'] = 'none';
}
function goodCardUpClick() {
   document.getElementById('pCard' + this.id.substr(5, this.id.length-4)).style['boxShadow'] = '0 10px 6px rgba(0, 0, 0, 0.26)';
}

document.getElementById('carouselExampleIndicators').addEventListener('slid', changeSlide);
function changeSlide() {
    alert('slid event');
  }