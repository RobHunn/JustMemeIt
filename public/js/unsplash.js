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
              const image = document.createElement('img');
              image.src = res.payload[item];
              document.body.append(image)
      
        }
    }