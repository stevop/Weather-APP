const inputPlace = document.getElementById("input-place");
const btn = document.getElementById("btn");
const h2 = document.querySelector("h2");
const temp = document.querySelector(".temp");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const windSpeed = document.querySelector(".wind-speed");
const rain = document.querySelector(".rain");
const snow = document.querySelector(".snow");
const descText = document.querySelector(".desc-text");
const descIcon = document.querySelector(".desc-icon");

// FETCHING DATA
async function fetchData(city){
    // najprv nájdem latitude a longitude:
    const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=88e243d6b12dd013c3c5352a08400b75`);
    let lat = res.data[0].lat;
    let lon = res.data[0].lon;
    
    // potom podľa nich nájdem mesto a vrátim ho do funkcie:
    const actualRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sk&appid=88e243d6b12dd013c3c5352a08400b75&units=metric`);
    return actualRes.data;
};

// vytvorím funkciu, kt. na Enter fetchne data, kt. sme napísali do inputu:
inputPlace.addEventListener("keypress", async (e) => {
    
    if(e.key === "Enter" && e.target.value !== ""){
        let placeInfo = await fetchData(e.target.value);
        // console.log(placeInfo);

        // Zmeny v html:

        // všeobecné info o počasí
        descIcon.src = `https://openweathermap.org/img/wn/${placeInfo.weather["0"].icon}@2x.png`;
        descText.textContent = placeInfo.weather["0"].description;

        // dáta o počasí:
        h2.textContent = `Počasie pre lokalitu ${placeInfo.name}`;
        h2.style.fontSize = "1.5rem";
        temp.textContent = `${placeInfo.main.temp}°C`;
        maxTemp.textContent = `Maximálna teplota: ${placeInfo.main.temp_max}°C`;
        minTemp.textContent = `Minimálna teplota: ${placeInfo.main.temp_min}°C`;
        feelsLike.textContent = `Pocitová teplota: ${placeInfo.main.feels_like}°C`;
        humidity.textContent = `Vlhkosť vzduchu: ${placeInfo.main.humidity}%`;
        pressure.textContent = `Tlak vzduchu: ${placeInfo.main.pressure} hPa`;
        windSpeed.textContent = `Rýchosť vetra: ${placeInfo.wind.speed} km/h`;

        // zrážky, ak sú dáta dostupné:
        if(placeInfo.rain || placeInfo.snow){
            rain.textContent = `Zrážky poslednú hodinu: ${placeInfo.rain["1h"]} mm`;
            snow.textContent = `Snehové zrážky za poslednú hodinu ${placeInfo.snow["1h"]}`;
        }
        return
    }
    else{
        descIcon.src = "";
        descText.textContent = "";

        h2.textContent = "Lokalita nebola nájdená.";
        h2.style.fontSize = "1.5rem";
        temp.textContent = "";
        maxTemp.textContent = "";
        minTemp.textContent = "";
        feelsLike.textContent = "";
        humidity.textContent = "";
        pressure.textContent = "";
        windSpeed.textContent = "";
        rain.textContent = "";
        snow.textContent = "";
    }
});
