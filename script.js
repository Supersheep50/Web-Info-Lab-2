async function getData(cityName){
    try{
        const response = await fetch('weatherinfo.json');
        const data = await response.json();

        const cityData = data.find(city => city.city.toLowerCase() === cityName.toLowerCase());

        if(!cityData){
            alert('City not found');
            return null; 
     
        }
        return cityData;
    } catch (error){
        console.error("Couldn't find data", error);
    }
}
