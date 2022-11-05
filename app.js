const inputPlace = document.getElementById("input-place");
const btn = document.getElementById("btn");

// FETCHING DATA
async function fetchData(city){
    // najprv nájdem latitude a longitude:
    const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=88e243d6b12dd013c3c5352a08400b75`);
    let lat = res.data[0].lat;
    let lon = res.data[0].lon;
    
    // potom podľa nich nájdem mesto a vrátim ho do funkcie:
    const actualRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88e243d6b12dd013c3c5352a08400b75&units=metric`);
    return actualRes.data;
};

// vytvorím funkciu, kt. na Enter fetchne data, kt. sme napísali do inputu:
inputPlace.addEventListener("keypress", async (e) => {
    if(e.key === "Enter" && e.target.value !== ""){
        let placeInfo = await fetchData(e.target.value);
        console.log(placeInfo);
    }
    else{
        document.querySelector("h2").textContent = "Lokalita nebola nájdená.";
    }
});