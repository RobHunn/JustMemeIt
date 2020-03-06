var modal = document.querySelector("#modal");
var modalOverlay = document.querySelector("#modal-overlay");
var closeButton = document.querySelector("#close-button");
var openButton = document.querySelector("#open-button2");
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
});

openButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});