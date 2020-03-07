const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");
const closeButton = document.querySelector("#close-button");
const openButton = document.querySelector("#open-button2");

var isOpen = false

if(!isOpen){
modal.classList.toggle("closed"); 
modalOverlay.classList.toggle("closed"); 
isOpen = true ;
}else{
 modal.classList.toggle("closed"); 
 modalOverlay.classList.toggle("closed"); 
 isOpen = false
} 

closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  video.srcObject.getVideoTracks().map((e)=>{
      e.stop();
    })
});

openButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});