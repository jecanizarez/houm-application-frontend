import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

export async function get_pokemon_detail(name){
    let response = await axios.get(API_URL+name)
    return response.data
}
export async function get_number_pokemon(){
    let response = await axios.get(API_URL)
    return response.data.count
}