

window.onload = () => {
    if (JSON.parse(localStorage.getItem('saved-search')) != null){
        entries = JSON.parse(localStorage.getItem('saved-search'));
        console.log(entries + ' stored');
    }

    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Yes'))
        .catch(err => console.log('No')) 
    }
}
let entries =[], cities =[], i = 0;
let input = document.querySelector('input'); 


function newelem(data){
    const newloc = data.name + ', ' + data.sys.country,
          newdesc = data.weather[0].description,
          newicon = data.weather[0].icon,
          newfeel = data.main.feels_like,
          newvalue = data.main.temp;

          function convert(x){
         let celsius = Math.floor(x-273.15);
         return celsius;
          }
         
        let linew = document.createElement('li');
        linew.textContent = '';
        linew.setAttribute('class', 'weatherbox linew' + (i)); 
        document.querySelector('.newboxes').appendChild(linew);
        

        let locspan = document.createElement('span');
        locspan.textContent = newloc;
        locspan.setAttribute('class', 'newlocation'  + (i)); 
        document.querySelector('.linew'  + (i)).appendChild(locspan);

        let newtempni = document.createElement('span');
        newtempni.textContent = '';
        newtempni.setAttribute('class', 'tempni tempninew' + (i)); 
        document.querySelector('.linew'  + (i)).appendChild(newtempni);

        let feelsbox = document.createElement('span');
        feelsbox.textContent = '';
        feelsbox.setAttribute('class', 'feelsbox feelsl' + i); 
        document.querySelector('.linew' + (i)).appendChild(feelsbox);

         let  feelstemp = document.createElement('span');
         feelstemp.textContent = 'Feels like ' + convert(newfeel);
         feelstemp.setAttribute('class', 'datebox datebox' + (i)); 
        document.querySelector('.feelsl' + i).appendChild(feelstemp);

        let feelsup = document.createElement('sup');
        feelsup.textContent = 'o';
        feelsup.setAttribute('class', 'feelsup newsup' + i); 
        document.querySelector('.feelsl' + i).appendChild(feelsup);
         
        let  descspan = document.createElement('span');
        descspan.textContent = newdesc.charAt(0).toUpperCase() + newdesc.slice(1);;
        descspan.setAttribute('class', 'description description' + (i)); 
        document.querySelector('.linew' + (i)).appendChild(descspan);

        let tempboxspan = document.createElement('span');
        tempboxspan.textContent = '';
        tempboxspan.setAttribute('class', 'tempbox tempboxnew'  + (i)); 
        document.querySelector('.tempninew' + (i)).appendChild(tempboxspan);

        let diconspan = document.createElement('span');
        diconspan.textContent = '';
        diconspan.setAttribute('class', 'dicon diconnew' + (i)); 
        document.querySelector('.tempninew' + (i)).appendChild(diconspan);

        let tempspan = document.createElement('span');
        tempspan.textContent = convert(newvalue);
        tempspan.setAttribute('class', 'temp newtemp' + (i)); 
        document.querySelector('.tempboxnew' + (i)).appendChild(tempspan);

        let supspan = document.createElement('sup');
        supspan.textContent = 'o';
        supspan.setAttribute('class', 'sup cel' + (i)); 
        document.querySelector('.tempboxnew' + (i)).appendChild(supspan);

        let imagespan = document.createElement('img');
        imagespan.textContent = '';
        imagespan.setAttribute('class', 'icon iconnew' + (i)); 
        imagespan.setAttribute('alt', 'weather icon for' + newloc);
        document.querySelector('.diconnew' + (i)).appendChild(imagespan);
        
        let  newimage = document.querySelector('.iconnew' + (i));
        newimage.src = `http://openweathermap.org/img/wn/${newicon}@2x.png`;

        if (localStorage.getItem('saved-searches') == null){
            localStorage.setItem('saved-searches', JSON.stringify(entries));
        }else{
           localStorage.setItem('saved-searches', JSON.stringify(entries));
        }
}

function inputvalue(){
    
    if(input.value == false || typeof input.value !== 'string') {
        document.querySelector('p').textContent = 'Enter name of city';
        input.value = '';
    }else{
        if(!cities.includes(input.value)){
            document.querySelector('p').textContent = '';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=0fb647bc64c86e8cf2a15fcc7f1e4efb`)
    .then(response => response.json())
    .then(data => {
    i += 1;
    newelem(data); 
    document.querySelector('.linew' + i).scrollIntoView();
    ////
    cities.push(input.value);
    input.value = '';
      
    let linewx = document.querySelector('.linew' + i);
    entries.push(linewx);
   })
  .catch(err => {
    document.querySelector('p').textContent = 'Not found';
    input.value = '';
   })
}else{
   document.querySelector('p').textContent = 'Already displayed';
 input.value = '';
}
}

if (localStorage.getItem('saved-searches') == null){
    localStorage.setItem('saved-searches', JSON.stringify(entries));
}else{
   localStorage.setItem('saved-searches', JSON.stringify(entries));
}

}