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
      console.log('i am res from express ::::',res);
        showData2(res)
    } catch (error) {
      console.log( 'my error :::  ',error)
      // add fallback when have time
    }

  })

//both sidebars logic to display images
function showData2(res){
  let userRequest = document.querySelector('#userRequest')
  userRequest.value = "";
  var container = document.querySelector("#side-bar-1");
  var container2 = document.querySelector("#side-bar-2");
  var matches = container.querySelectorAll("li");
  var matches2 = container2.querySelectorAll("li");  
  let res1 = res.payload.splice(0,10);
  console.log('res1::: ',res1);
  
  let res2 = res.payload.splice(0,10);
  if(!matches){
      for(var item in res1){
        const ul = document.querySelector('#side-bar-1');
        const li = document.createElement('li');
        const image = document.createElement('img');
        image.src = res1[item];
        li.appendChild(image);
        ul.appendChild(li);
  }
     for(var item in res2){
        const ul2 = document.querySelector('#side-bar-2');
        const li2 = document.createElement('li');
        const image = document.createElement('img');
        image.src = res2[item];
        li2.appendChild(image);
        ul2.appendChild(li2);
  }
  }else{
      matches.forEach(function(userItem) {
        userItem.remove()
      });
      matches2.forEach(function(userItem) {
        userItem.remove()
      });
        for(var item in res1){
        const ul = document.querySelector('#side-bar-1');
        const li = document.createElement('li');
        const image = document.createElement('img');
        image.src = res1[item];
        li.appendChild(image);
        ul.appendChild(li);
  }
       for(var item in res2){
        const ul2 = document.querySelector('#side-bar-2');
        const li2 = document.createElement('li');
        const image = document.createElement('img');
        image.src = res2[item];
        li2.appendChild(image);
        ul2.appendChild(li2);
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

// new tool bar quilljs
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

//add saved meme to grid
function init2() {
  let local = document.querySelector('#location-t-form');
  let sidebar1 = document.querySelector('#side-bar-1');
  let sidebar2 = document.querySelector('#side-bar-2');
  local.addEventListener('submit', evalOpt);
  sidebar1.addEventListener('click', handleClick);
  sidebar2.addEventListener('click', handleClick2);
  let x = document.querySelector('.allmemes')
  let output = '';
  gotThemMemes.forEach((item)=>{
    output+= item

  })
  x.innerHTML = output;
}

//text location
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
//quilljs api log html
function logHtmlContent() {
  //var content = quill.getContents()
  //console.log('quill.root.innerHTML::::', quill.root.innerHTML);
 
  let selected = document.querySelector('#container100');

  if(selected.style.display == "block"){
    let cap2 = document.querySelector('#cap2');
    cap2.innerHTML = quill.root.innerHTML
  }else{
      let cap = document.querySelector('#cap');
      cap.innerHTML = quill.root.innerHTML
  }

}

//sidebar1 add selected img to edit
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
//sidebar2 add selected img to edit
function handleClick2(e){
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

// quilljs hack to grab html and make copy, dam you quilljs...
// note to self dont use quilljs...

function saveMeme(){
  let selected = document.querySelector('#container100');

  if(selected.style.display == "block"){
  let meme = document.querySelector('#container100').innerHTML
  gotThemMemes.push(meme)
    let x = document.querySelector('.allmemes');
    while (x.hasChildNodes()) {  
    x.removeChild(x.firstChild);
  }
    gotThemMemes.forEach((item)=>{
      let div = document.createElement('div')
      console.log('i be item what is diffrent? :::',item);
       var n = item.includes('id="cap2"');
       if(n){
         console.log('hittttt');
         
      div.classList.add('container100');
      div.innerHTML = item
      x.appendChild(div)
       }else{
      div.classList.add('container99');
      div.innerHTML = item
      x.appendChild(div)
       }
      
    })
    
  }else{
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
      console.log('i be item what is diffrent? :::',item);
       var n = item.includes('id="cap2"');
       if(n){
         console.log('hittttt');
         
      div.classList.add('container100');
      div.innerHTML = item
      x.appendChild(div)
       }else{
      div.classList.add('container99');
      div.innerHTML = item
      x.appendChild(div)
       }
      
    })
    // gotThemMemes.forEach((item)=>{
    //   let div = document.createElement('div')
    //   div.classList.add('container99');
    //   div.innerHTML = item
    //   console.log('div container99 ::',div);
      
    //   x.appendChild(div)
      
    // })
  }

}

