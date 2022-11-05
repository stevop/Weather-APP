window.addEventListener("load", () => {
    // MY VARIABLES:
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
        // first i find latitude and longitude:
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`);
        let lat = res.data[0].lat;
        let lon = res.data[0].lon;
        
        // then i find wanted city:
        const actualRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sk&appid=88e243d6b12dd013c3c5352a08400b75&units=metric`);
        return actualRes.data;
    };

    // INPUT:
    inputPlace.addEventListener("keypress", async (e) => {
        
        if(e.key === "Enter" && e.target.value !== ""){
            let placeInfo = await fetchData(e.target.value);

            // CHANGES IN HTML:

            // WEATHER DATA:
            descIcon.src = `https://openweathermap.org/img/wn/${placeInfo.weather["0"].icon}@2x.png`;
            descText.textContent = placeInfo.weather["0"].description;

            h2.textContent = `Počasie pre lokalitu ${placeInfo.name}`;
            h2.style.fontSize = "1.5rem";
            temp.textContent = `${placeInfo.main.temp}°C`;
            maxTemp.textContent = `Maximálna teplota: ${placeInfo.main.temp_max}°C`;
            minTemp.textContent = `Minimálna teplota: ${placeInfo.main.temp_min}°C`;
            feelsLike.textContent = `Pocitová teplota: ${placeInfo.main.feels_like}°C`;
            humidity.textContent = `Vlhkosť vzduchu: ${placeInfo.main.humidity}%`;
            pressure.textContent = `Tlak vzduchu: ${placeInfo.main.pressure} hPa`;
            windSpeed.textContent = `Rýchosť vetra: ${placeInfo.wind.speed} km/h`;
            
            // RAIN OR SNOW, IF AVAILABLE:
            if(placeInfo.rain || placeInfo.snow){
                rain.textContent = `Zrážky poslednú za hodinu: ${placeInfo.rain["1h"]} mm`;
                snow.textContent = `Snehové zrážky za poslednú hodinu ${placeInfo.snow["1h"]}`;
            }
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

    // BUTTON
    btn.addEventListener("click", async (e) => {
        if(fetchData(inputPlace.value) !== ""){
            let placeInfo = await fetchData(inputPlace.value);

            // HTML CHANGES

            // WEATHER DATA
            descIcon.src = `https://openweathermap.org/img/wn/${placeInfo.weather["0"].icon}@2x.png`;
            descText.textContent = placeInfo.weather["0"].description;

            
            h2.textContent = `Počasie pre lokalitu ${placeInfo.name}`;
            h2.style.fontSize = "1.5rem";
            temp.textContent = `${placeInfo.main.temp}°C`;
            maxTemp.textContent = `Maximálna teplota: ${placeInfo.main.temp_max}°C`;
            minTemp.textContent = `Minimálna teplota: ${placeInfo.main.temp_min}°C`;
            feelsLike.textContent = `Pocitová teplota: ${placeInfo.main.feels_like}°C`;
            humidity.textContent = `Vlhkosť vzduchu: ${placeInfo.main.humidity}%`;
            pressure.textContent = `Tlak vzduchu: ${placeInfo.main.pressure} hPa`;
            windSpeed.textContent = `Rýchosť vetra: ${placeInfo.wind.speed} km/h`;

            // RAIN OR SNOW, IF AVAILABLE:
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
    })
});