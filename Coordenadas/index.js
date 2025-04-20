const axios = require('axios') 
const prompt = require('prompt-sync')();

const baseURL = 'http://api.openweathermap.org/geo/1.0/direct'
const appid = 'a484eaf895bc44a50d0b7b58ca6a4330'
 const q = prompt('Qual cidade você deseja ver as coordenadas : ');
 const url = `${baseURL}?q=${q}&appid=${appid}`;

axios.get(url)
.then((res) => {
    console.log(`Latitude: ${res.data[0]['lat']}`)
    console.log(`Longitude: ${res.data[0]['lon']}`)
})
.catch((erro) =>{
    console.log(`Erro: ${erro}`)
})




