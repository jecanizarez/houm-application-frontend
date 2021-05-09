
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import {useState} from 'react'
import '../css/card.css'
import Modal from 'react-bootstrap/Modal'

/**
 * Card component for showing a Pokemon
 */
export default function Card_Home(props){
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return(
        <>
            <Card className='card-style'>
                <Card.Img className="card-image" variant="top" src={props.pokemon.sprites.front_default} />
                    <Card.Body>
                        <Card.Title>{props.pokemon.name}</Card.Title>
                        {props.pokemon.types.map( h =>{ return <Badge className={`card-badge-${h.type.name}` + " card-badge"}>{h.type.name}</Badge>})}
                        
                        <hr/>
                        <Button className="card-button" onClick={handleShow} variant="primary">More Details</Button>
                    </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>{props.pokemon.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Height:</h5>
                    <p>{props.pokemon.height}</p>
                    <h5>Weight:</h5>
                    <p>{props.pokemon.weight}</p>
                    {props.pokemon.stats.map( h => {
                        return (
                        <>
                        <h5>{h.stat.name}:</h5>
                        <p>{h.base_stat}</p>
                        </>)
                    })}
                </Modal.Body>
                <Modal.Footer>
                <Button className="card-button" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
)
}