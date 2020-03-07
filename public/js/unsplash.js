 window.addEventListener('load', init2);
let gotThemMemes = [];

// unsplash api
form2.addEventListener('submit', async event =>{
    event.preventDefault();
    let userRequest = document.querySelector('#userRequest').value
    try {
      const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({userRequest})
        })
      const res = await response.json();
      console.log('i am res ::::',res);
        showData2(res)
    } catch (error) {
      console.log( 'my error :::  ',error)
    }

  })

function showData2(res){
  let userRequest = document.querySelector('#userRequest')
  userRequest.value = "";
  var container = document.querySelector("#side-bar-1");
  var matches = container.querySelectorAll("li");
  if(!matches){
      for(var item in res.payload){
        const ul = document.querySelector('#side-bar-1');
        const li = document.createElement('li');
        const image = document.createElement('img');
        image.src = res.payload[item];
        li.appendChild(image);
        ul.appendChild(li);
  }
  }else{
      matches.forEach(function(userItem) {
        userItem.remove()
      });
        for(var item in res.payload){
        const ul = document.querySelector('#side-bar-1');
        const li = document.createElement('li');
        const image = document.createElement('img');
        image.src = res.payload[item];
        li.appendChild(image);
        ul.appendChild(li);
  }
  }
  }

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  ['clean']
];


var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

// var zz = document.querySelector('#editor').value
// var zztop = document.querySelector('#editor')

// zztop.addEventListener('keydown', logKey);
// function logKey(e) {
//   log.textContent += ` ${e.key}`;
//   console.log(e);
  
// }

// moves from side1 to main grid
function init2() {
  let local = document.querySelector('#location-t-form');
  let sidebar1 = document.querySelector('#side-bar-1');
  local.addEventListener('submit', evalOpt);
  sidebar1.addEventListener('click', handleClick);
  let x = document.querySelector('.allmemes')
  let output = '';
  gotThemMemes.forEach((item)=>{
    output+= item

  })
  x.innerHTML = output;
}

function evalOpt(e) {
  e.preventDefault()
  let opt = e.target.children[0].options.selectedIndex
  let cap = document.querySelector('#cap');
  switch (opt) {
    case 0:
      cap.classList = ''
      cap.classList.add('move-left');
      break;
    case 1:
      cap.classList = ''
      cap.classList.add('move-center')
      break;
    case 2:
      cap.classList = '';
      cap.classList.add('move-right');
      break;
    // case 3:
    //   cap.classList = '';
    //   cap.classList.add('move-left-btm');
    //   console.log('case left btm', cap.classList);

    //   break;
    // case 4:
    //   cap.classList = '';
    //   cap.classList.add('move-center-btm');
    //   break;
    // case 5:
    //   cap.classList = '';
    //   cap.classList.add('move-center-btm');
    //   break;

    default: cap.classList.toggle('i dunnoo')
      break;
  }
}

function logHtmlContent() {
  //var content = quill.getContents()
  //console.log('quill.root.innerHTML::::', quill.root.innerHTML);
  let cap = document.querySelector('#cap');
  cap.innerHTML = quill.root.innerHTML
}

function handleClick(e){
  let con99 = document.querySelector('#container99');
  let con100 = document.querySelector('#container100');
  con100.style = "display:none"
  con99.style="display:block"
  let selectedImg = e.target;
  selectedImg.style = "width:100%; height:100%";
  let infoi = document.querySelector('#infoi');
 while (infoi.hasChildNodes()) {  
  infoi.removeChild(infoi.firstChild);
}
   infoi.appendChild(selectedImg);
}


function saveMeme(){
let meme = document.querySelector('#container99').innerHTML
let strMeme = JSON.stringify(meme);
var res = strMeme.replace(/id/g, "class");
var res2 = res.replace(/\"\\n/g, " ");
var res3 = res2.replace(/n        "/g, " ");
var clean = res3.replace(/\\/g, " ");
var cleaner = clean.replace(/wclassth/g, "width");
var cleanist = cleaner.replace(/div> n/g, "div>");
gotThemMemes.push(cleanist)
  let x = document.querySelector('.allmemes');
   while (x.hasChildNodes()) {  
  x.removeChild(x.firstChild);
}
  gotThemMemes.forEach((item)=>{
    let div = document.createElement('div')
    div.classList.add('container99');
    div.innerHTML = item
    console.log(div);
    
    x.appendChild(div)
    
  })
 

}

