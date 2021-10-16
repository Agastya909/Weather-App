const form = document.getElementById('searchForm');
const apiKey = "1199330896d34c28f209977df19f3db8";
const unit = "metric";
const resultDiv = document.getElementById('resDiv');

form.addEventListener('submit', async function (error) {
    error.preventDefault();
    let responseAPI = null;
    const cityName = form.elements.query.value;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + unit;
    try {
        responseAPI = await axios.get(url);
        resultDiv.innerHTML = '';
        addData(responseAPI);
    } catch (e) {
        responseAPI = e.response;
        console.log(responseAPI);
        resultDiv.innerHTML = '';
        errorPrint();
    }
})

const addData = (responseData) => {
    const code = responseData.data.cod;
    console.log(code);
    const temperature = responseData.data.main.temp;
    const icon = responseData.data.weather[0].icon;
    const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    const temp = document.createElement('H1');
    temp.innerHTML = temperature + '\u00B0' + 'C';
    resultDiv.append(temp);

    const discriptionImg = document.createElement('IMG');
    discriptionImg.src = iconUrl;
    resultDiv.append(discriptionImg);

    const discription = document.createElement('H3');
    var str = responseData.data.weather[0].description;
    str = str.charAt(0).toUpperCase() + str.slice(1);
    discription.innerHTML = str;
    resultDiv.append(discription);
}

const errorPrint = () => {
    const errorElement = document.createElement('H2');
    errorElement.innerHTML = 'City not found.';
    resultDiv.append(errorElement);
}

