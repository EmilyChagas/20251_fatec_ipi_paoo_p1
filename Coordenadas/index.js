import { appid } from '../chaves.js';
import axios from 'axios';
import promptSync from 'prompt-sync';

const prompt = promptSync();

const baseURL = 'http://api.openweathermap.org/geo/1.0/direct'
 const q = prompt('Qual cidade você deseja ver as coordenadas: ');
 const url = `${baseURL}?q=${q}&appid=${appid}`;
 
axios.get(url)
.then((res) => {
    console.log(`Latitude: ${res.data[0]['lat']}`)
    console.log(`Longitude: ${res.data[0]['lon']}`)
})
.catch((erro) =>{
    console.log(`Erro: ${erro}`)
})




