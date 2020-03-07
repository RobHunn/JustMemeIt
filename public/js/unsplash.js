 window.addEventListener('load', init2);
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
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
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


function init2() {
  let local = document.querySelector('#location-t-form');
  let sidebar1 = document.querySelector('#side-bar-1');
  local.addEventListener('submit', evalOpt);
  sidebar1.addEventListener('click', handleClick);
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

    default: cap.classList.toggle('omomomo')
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
  let selectedImg = e.target;
  selectedImg.style = "width:100%; height:100%";
  let infoi = document.querySelector('#infoi');
  
 while (infoi.hasChildNodes()) {  
  infoi.removeChild(infoi.firstChild);
}

   infoi.appendChild(selectedImg);


}