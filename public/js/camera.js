'use strict';
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const snap2 = document.getElementById('snap2');
const errorMsgElement = document.getElementById('spanErrorMsg');
const imagePicker = document.getElementById('image-picker');
const videoDiv = document.getElementById('video-wrap');
const savedImg = document.querySelector('#savedImg')
let context = canvas.getContext('2d');
let dataBase = []

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
        errorMsgElement.innerHTML = `navigator.getUserMedia.error:${e.toString()}`;
    }
}

// Success
function handleSuccess(stream){
    window.stream = stream
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
    video.style = "display:none";
    canvas.style = "display:block";
    context.drawImage(video, 0, 0, 640 ,480 );
    const myCanvas = document.querySelector("#canvas");
    const imageURL = myCanvas.toDataURL();
    dataBase.push(imageURL);
    video.srcObject.getVideoTracks().map((e)=>{
      e.stop();
    })
});

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
      body: JSON.stringify({dataBase})
        })
      const res = await response.json();
      console.log('res from express ',res);
      console.log("IMAGE SAVED::::");
    } catch (error) {
      console.log( 'my error :::  ',error)
    } 

})

// const takePhoto = document.querySelector('#takePhoto')
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