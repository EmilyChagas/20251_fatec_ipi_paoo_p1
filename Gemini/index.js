import { apiKey, appid } from '../chaves.js';

import axios from 'axios';
import promptSync from 'prompt-sync';
import { GoogleGenAI } from '@google/genai';

//Variaveis do Gemini
const ai = new GoogleGenAI({ apiKey})
const formato =  'Por favor, devolva o resultado como um JSON válido'

// Variaveis do OpenWeatherMap
const prompt = promptSync();
const baseURL = 'http://api.openweathermap.org/geo/1.0/direct'
const q = prompt('Qual cidade você deseja ver as coordenadas: ');
const url = `${baseURL}?q=${q}&appid=${appid}`;
 
async function main() {
  let lat, long;
    try {
          await axios.get(url)
          .then((res) => {
              console.log(`Latitude: ${res.data[0]['lat']}`)
              console.log(`Longitude: ${res.data[0]['lon']}`)
             lat = res.data[0]['lat']
             long = res.data[0]['lon']
             console.log("-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
          })
          .catch((erro) =>{
              console.log(`Erro ao buscar coordenadas: ${erro}`)
          })
        const text = `Com base na localização de latitude ${lat} e longitude ${long}, me diga o nome da cidade, idioma(s) falado(s), moeda local, curiosidades ou fatos históricos e uma sugestão turística`
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `${text} ${formato}`
        });

    const cleanedResponse = response.text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanedResponse);
    console.log(`${text}:`)
    console.log(result);

  } catch (error) {
    console.error("Erro ao chamar a API:", error);
  }
}
    
await main();