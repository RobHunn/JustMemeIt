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
        for(var item in res.payload){
              const ul = document.querySelector('#side-bar-1');
              const li = document.createElement('li');
              const image = document.createElement('img');
              image.src = res.payload[item];
              // image.style = "display:block"
              li.appendChild(image);
              ul.appendChild(li);
        }
    }




var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});