

window.addEventListener("load", () => {
 let long; // 
 let lat;// ﺧﻂ اﻟﻌﺮﺽ
 let temperatureDescription = document.querySelector('.temperature-description');
 let temperatureDegree = document.querySelector('.temperature-degree');
 let locationTimezone = document.querySelector('.location-timezone');
 let temperatureSection = document.querySelector('.temperature');
 let temperatureSpan = document.querySelector('.temperature span'); 

 if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position =>{
   long = position.coords.longitude;
   lat = position.coords.latitude;
   //this link allow you to run the api in the local host
   const proxy = "https://cors-anywhere.herokuapp.com/";
   const api = `${proxy}https://api.darksky.net/forecast/dc469b9b934f5913b0be5a6892a75f30/${lat},${long}`;

   fetch(api).then(response => {
    return response.json();
   }).then(data => {
    const {temperature, summary, icon} = data.currently;
    //setDom Element from the api
    temperatureDegree.textContent = temperature;
    temperatureDescription.textContent = summary;
    locationTimezone.textContent = data.timezone;

    // calc the celsius
    let celsius = (temperature - 32) * (5 / 9);
    //set Icon
    setIcon(icon,document.querySelector('.icon'));

    //change temperature from f to c
    temperatureSection.addEventListener('click', () =>{
     if(temperatureSpan.textContent === 'F'){
      temperatureSpan.textContent = "C";
      temperatureDegree.textContent = Math.floor(celsius);
     } else {
      temperatureSpan.textContent = "F";
      temperatureDegree.textContent = temperature;
     }

    });

   });

  });
 }

 function setIcon(icon,iconId)
 {
  const skycons = new Skycons({color:'white'});

  const currentIcon = icon.replace(/-/g,"_").toUpperCase();
  skycons.play();
  return skycons.set(iconId,Skycons[currentIcon]);
 }
});