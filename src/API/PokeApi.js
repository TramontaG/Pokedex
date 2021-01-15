import { add } from 'react-native-reanimated';

const axios = require('axios').default;

class PokeApi {
    constructor(){
        this.API = axios.create({
            baseURL: "https://pokeapi.co/api/v2/",

        })
    }

    appendURLParams(params){
        if (Object.keys(params).length === 0) return '';
        return '?' + (Object.keys(params).map(key => `${key}=${params[key]}`).join('&'));
    }

    async getPokemonInfo(pokemonName){
        const pokemonData = await this.API.get(`/pokemon/${pokemonName}`);
        return pokemonData.data;
    }

    async get(endpoint, params = {}){
        return (await this.API.get(endpoint + this.appendURLParams(params))).data;
    }

    async getDirect(address){
        return (await axios.get(address)).data;
    }
}

export default new PokeApi();