var pendingListItemHolder = document.querySelector("#pendingListItemHolder");
var completedListItemHolder = document.querySelector("#completedListItemHolder");
var addNewItemBtn = document.querySelector("#addNewItemBtn");
var newItemText = document.querySelector("#newItemText");
let itmNumber = document.querySelector('.itmNumber');
let completedNmbr = document.querySelector('.completedNmbr');



// add item function
let pendingArr = [];

function pending(){
    let input = newItemText.value;
    if(!input){
        newItemText.placeholder = "Task cann't empty...";
        newItemText.classList.add('empty');
    }
    if(input){
        pendingArr.push(input);
        // console.log(pendingArr);
        newItemText.value = null;
    }
    itmNumber.textContent = `Total: ${pendingArr.length}`
    pendingListItemHolder.innerHTML = null;
    pendingArr.map((item , index)=>{
        pendingListItemHolder.innerHTML +=`
            <li class="statusPending" >
                <div class="box">
                    <div class="list">
                        <i id="statusDone" data-index="${index}" onclick="complete(${index})" class="fa-regular fa-circle"></i>
                        <p class="task" data-index="${index}" contenteditable="false" >${item}</p>
                    </div>
                    <div class="list func">
                       <button type="button" data-index="${index}" onclick="eiditbtn(${index})" class="eidit"><i class="fa-regular fa-pen-to-square"></i></button>
                       <button type="button" data-index="${index}" onclick="pendingDelete(${index})" class="trash"><i class="fa-solid fa-trash-can" ></i></button>
                    </div>
                </div>
            </li>
        `
    })
}

function placehold(){
    newItemText.classList.remove('empty');
}

// List eidit
function eiditbtn(nmbr) {
    let clickedbtn = document.querySelector(`.eidit[data-index="${nmbr}"]`);
    let eiditItem = document.querySelector(`.task[data-index="${nmbr}"]`);
    
    let isEiditable = eiditItem.getAttribute('contenteditable');
    if (isEiditable === "false" || isEiditable === null) {
        eiditItem.setAttribute('contenteditable', 'true');
        eiditItem.focus(); 
        clickedbtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    } else {
        eiditItem.setAttribute('contenteditable', 'false');
        clickedbtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        pendingArr[nmbr] = eiditItem.textContent;
    }
}

// List Delete
function pendingDelete(nmbr){
    pendingArr.splice(nmbr , 1)
    // console.log(nmbr);
    // console.log(pendingArr);
    pending()
}

// Move to Complete from Pending
let completeArr = [];
function complete(nmbr){
    completedListItemHolder.innerHTML = null;
    let eiditItem = document.querySelector(`.task[data-index="${nmbr}"]`).textContent;
    // console.log(eiditItem);
    completeArr.push(eiditItem);
    pendingArr.splice(nmbr , 1);
    pending();
    // console.log(completeArr);
    completedNmbr.textContent = `Total: ${completeArr.length}`
    completeArr.map((list , index)=>{
        completedListItemHolder.innerHTML += `
            <li class="" >
                <div class="completedalign">
                    <div class="completeplx">
                        <i id="statusDone" data-index="${index}" onclick="movetoPending(${index})" class="fa-regular fa-circle-check"></i>
                        <p class="completed" data-index="${index}">${list}</p> 
                    </div>
                    <i class="fa-solid fa-trash-can" onclick="deleteComplete(${index})"></i>
                </div>
            </li>
        `
    })
}

// MovE to Pending from Complet

function movetoPending(nmbr){
    let movePending = completeArr[nmbr];

    pendingArr.push(movePending);
    
    completeArr.splice(nmbr, 1);
    
    pending(); 
    completeRender(); 
}
// Updated complete list
function completeRender(){
    completedListItemHolder.innerHTML = null;
    completedNmbr.textContent = `Total: ${completeArr.length}`
    completeArr.map((list, index) => {
        completedListItemHolder.innerHTML += `
            <li class="" >
                <div class="completedalign">
                    <div class="completeplx">
                        <i id="statusDone" data-index="${index}" onclick="movetoPending(${index})" class="fa-regular fa-circle-check"></i>
                        <p class="completed" data-index="${index}">${list}</p> 
                    </div>
                    <i class="fa-solid fa-trash-can" onclick="deleteComplete(${index})"></i>
                </div>
            </li>
        `
        ;
    });
}

// Delete from Complete
function deleteComplete(nmbr){
    // console.log(nmbr);
    completeArr.splice(nmbr, 1);
    completeRender()
}


// Boxes opener
let done = document.querySelector('.done');
let pendingbx = document.querySelector('.pending');
let pendingbtn = document.querySelector('.paddingList');
let completebnt = document.querySelector('.completeList');
pendingbtn.addEventListener('click' , ()=>{
    pendingbtn.classList.add('active');
    completebnt.classList.remove('active');
    pendingbx.classList.add('active')
    done.classList.remove('active')
})
completebnt.addEventListener('click' , ()=>{
    pendingbtn.classList.remove('active');
    completebnt.classList.add('active');
    pendingbx.classList.remove('active')
    done.classList.add('active')
})