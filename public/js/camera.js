const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const snap2 = document.getElementById('snap2');
const savedImg = document.querySelector('#savedImg')
const useImg = document.querySelector('#useImg')
let context = canvas.getContext('2d');
let dataBase = []
let data = []

const constraints = {
    audio: false,
    video:{
      width:640,
      height:480
    }
};

async function init(){
    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    }
    catch(e){
       
        console.log(e);
        
    }
}

// Success
function handleSuccess(stream){
    video.srcObject = stream;
}

//open cam
snap.addEventListener("click", function(){
  init()
  video.style = "display:block";
  canvas.style = "display:none";
});

//take photo
snap2.addEventListener("click", function(){
  dataBase = []
  let snapBtn = document.querySelector('#snap');
  snapBtn.innerText = 'Retake Pic?'
    video.style = "display:none";
    canvas.style = "display:block";
    context.drawImage(video, 0, 0, 640 ,480 );
    const myCanvas = document.querySelector("#canvas");
    const imageURL = myCanvas.toDataURL(); 
    dataBase.push(imageURL);
    data.push(imageURL);
    video.srcObject.getVideoTracks().map((e)=>{
      e.stop();
    })
});
//camera pic to editor
useImg.addEventListener('click',  function(){
  let meme2 = dataBase[0];
  let image2 = new Image();
  image2.src = meme2
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  let kimberly = document.querySelector('#infoi2');
  let con99 = document.querySelector('#container99');
  let con100 = document.querySelector('#container100');
  let infoi = document.querySelector('#infoi');
   while (kimberly.hasChildNodes()) {  
  kimberly.removeChild(kimberly.firstChild);
}
 while (infoi.hasChildNodes()) {  
  infoi.removeChild(infoi.firstChild);
}
con99.style = "display:none";
con100.style="display:block"
kimberly.appendChild(image2)
})


//save image
savedImg.addEventListener('click', async function(e){
 
  e.preventDefault()
    try {
      const response = await fetch('/api', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
        })
      const res = await response.json();
      console.log('res from express ',res);
      console.log("IMAGE SAVED::::");
    } catch (error) {
      console.log( 'my error :::  ',error.stack)
    } 

})

// const takePhoto = document.querySelector('#takePhoto') p5js bs...
// takePhoto.addEventListener('click', showV )

  
//    function setup(){
//       background(255, 0, 0);
//       noCanvas();
//       const video = createCapture(VIDEO);
//       //video.hide();
//       video.size(320, 240)
//       const form = document.querySelector('form')
//       form.addEventListener('click', async event =>{
//         event.preventDefault();
//         video.loadPixels();
//         let image = video.canvas.toDataURL();
//         console.log(image);
//         try {
//           const response = await fetch('/api', {
//           method: 'POST',
//           headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({image})
//             })
//           const res = await response.json();
//           console.log(res);
//            showData(res)
//         } catch (error) {
//           console.log( 'my error :::  ',error)
//         }      
//       })
//     }
// function showData(res){
//   const image = document.createElement('img');
//   image.src = res.image;
//   document.body.append(image)
// }