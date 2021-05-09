
import Card from './card_home'
import {useEffect, useState} from 'react'
import {get_pokemon_detail,get_number_pokemon} from '../services/pokeApi'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import '../css/home.css'
import Pagination from '@material-ui/lab/Pagination';



/**
 * Component used for the home page
 */
export default function Home(){

    const[pokemon, setPokemon] = useState([])
    const[filtered_pokemon, setFilteredPokemon] = useState([])
    const[pages, set_pages] = useState([])

    useEffect( async () =>{ 
        await fetch_pokemon()
        await calculate_pages()
    },[]) 
    /**
     * 
     * @param {Number} page Page number to paginate Pokemon
     */
    async function fetch_pokemon(page = 1){
        //Case when client wants to change page
        if(page != 1){
            //Arrays need to be empty
            while(pokemon.length > 0) {
                pokemon.pop()
                filtered_pokemon.pop()
            }
            setPokemon(pokemon)
            setFilteredPokemon(filtered_pokemon)
            for(let i = (page-1)*10; i < 10*page; i++){
                let data = await get_pokemon_detail(i)
                setPokemon(pokemon => pokemon.concat(data))
                setFilteredPokemon(pokemon => pokemon.concat(data))
            }   
        }
        else{
            //Empty the arrays if the client wants to return to page 1
            while(pokemon.length > 0) {
                pokemon.pop()
                filtered_pokemon.pop()
            }
            setPokemon(pokemon)
            setFilteredPokemon(filtered_pokemon)
            for(let i = page; i <=10*page; i++){
                let data = await get_pokemon_detail(i)
                setPokemon(pokemon => pokemon.concat(data))
                setFilteredPokemon(pokemon => pokemon.concat(data))
            }   
        }
    } 
    /**
     * Function to filter Pokemon
     * @param {Event} event 
     */
    function filter(event){
        let value = event.target.value.toLowerCase();
        let result = [];
        result = pokemon.filter((pokemon) => {
            return pokemon.name.search(value) != -1;
            });
        setFilteredPokemon(result);
    }
    /**
     * Function to handle pagination
     * @param {Event} event 
     * @param {Number} page Page to paginate 
     */
    async function handle_pagination(event,page){
        await fetch_pokemon(page)
    }
    /**
     * Function to calculate the number of pages needed for pagination
     */
    async function calculate_pages(){
        let total = await get_number_pokemon()
        console.log(total)
        set_pages(Math.ceil(total / 10))

    }
    return(
    <Container fluid>
        <Row className="justify-content-center">
            <Form className="form-style search-style" inline={false}>
                <Form.Group  controlId="formGroupSearch">
                        <Form.Control className="search-bar" onChange={(event) => filter(event)} type="text" placeholder="Search a pokemon"></Form.Control>
                </Form.Group>
            </Form>
        </Row>
        <Row>
                {filtered_pokemon.map(h =>{return <Col><Card pokemon={h} key= {h.id}/></Col>} )}
        </Row>
        <Row className="pagination">
            <Pagination
                color="primary"
                defaultCurrent={1}
                onChange={handle_pagination}
                count={pages}
            />
        </Row>
    </Container>
)

}