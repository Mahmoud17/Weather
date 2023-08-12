const cityInput = document.getElementById("city")
const findBtn = document.getElementById("findBtn")
const todayTemp = document.getElementById("todayTemp")
const tomorrowTemp = document.getElementById("tomorrowTemp")
const afterTemp = document.getElementById('afterTemp')
const city = document.getElementById("foreCity")
const dayTag = document.getElementsByClassName("today")[0]

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const d = new Date();
const dayName = days[d.getDay()];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
document.querySelector(".date").innerHTML =  d.getDate() + ' ' + monthNames[d.getMonth()];

dayTag.innerText = dayName
document.querySelector(".tomorrow").innerHTML = days[(d.getDay()+1) % 6]
document.querySelector(".after").innerHTML = days[(d.getDay()+2) % 6]

const getWeather = async function(loc) {
  let url = "https://api.weatherapi.com/v1/forecast.json?key=748eb52c53e64e15967174541230808&q=" + loc + "&days=3"

  try {
    let res = await fetch(url);
    let data = await res.json()
    let forecast = data.forecast.forecastday
    city.innerText = loc
    todayTemp.innerText = data.current.temp_c + '\xB0C';
    tomorrowTemp.innerText = forecast[1].day.maxtemp_c + '\xB0C'
    afterTemp.innerText = forecast[2].day.maxtemp_c + '\xB0C'
    document.querySelector(".day .condition").innerText = data.current.condition.text
    document.querySelector(".day2 .condition").innerText = forecast[1].day.condition.text
    document.querySelector(".day3 .condition").innerText = forecast[2].day.condition.text
    document.querySelector("#tomorrowMin").innerText = forecast[1].day.mintemp_c + '\xB0C'
    document.querySelector("#afterMin").innerText = forecast[2].day.mintemp_c + '\xB0C'

    document.querySelector(".day img").src = forecast[0].day.condition.icon
    document.querySelector(".day2 img").src = forecast[1].day.condition.icon
    document.querySelector(".day3 img").src = forecast[2].day.condition.icon
    

  } catch (error) {
    // TypeError: Failed to fetch
    alert("Please enter a valid city name");
  }
  
}

findBtn.addEventListener("click", () => {
  getWeather(cityInput.value)
})

function geoFindMe() {

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const res = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true&key=AIzaSyDDOUSk-W6l8t4pDaCVWj62sUYAICkD50Q")
    const data = await res.json()
    getWeather(data.plus_code.compound_code.split(' ').splice(1).join(" "))
  }

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
  } else {
    navigator.geolocation.getCurrentPosition(success);
  }
}



document.addEventListener('DOMContentLoaded', geoFindMe);
