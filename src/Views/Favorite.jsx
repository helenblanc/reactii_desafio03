import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import AppContext from '../app_context';

// FUNCIÓN QUE CREA UN COMPONENTE CONTACT
export const Favorite = () => {

    console.log('LOADING FAVORITE...')
    // CARGANDO VARIABLE DATA GLOBAL
    const { data, setData } = useContext(AppContext)
    // CREANDO HOOK LOCAL DE COMPONENTE CHARACTERS
    const [characters, setCharacters] = useState([])
    //console.log('characters', characters)
    //console.log('data.characters: ', data.characters);
    // CREANDO HOOK PARA RENDERIZAR
    useEffect(() => {
        // ARREGLO QUE CONTIENE SOLO LA LISTA DE PERSONAJES FAVORITOS
        let favorites = []
        // RECORRER VARIABLE GLOBAL CON LA INFORMACIÓN DE FAVORITOS
        // Y AGREGAR SOLOS LOS QUE CONTENGAN PROPIERDAD FAVORITE EN TRUE
        // EN LA LISTA DE FAVORITOS
        data.characters.forEach(function (character) {
            console.log('character.favorite: ', character.favorite);
            if (character.favorite) {
                console.log('favorite: ', character.favorite);
                favorites.push(character)
            }
        });
        //console.log('favorites: ', favorites);
        // ACTUALIZACIÓN DE HOOK LOCAL
        setCharacters(favorites);
    }, []);
    //console.log('favorites: ', characters);

    /* FUNCIÓN QUE CREA UN CARD CON LOS DATOS EN PERSONAJE DE RICK Y MORTY FAVORITOS*/
    const card = (character) => {
        //console.log('load card: ', character)
        return (
            <Col key={character.element.id} className="col-4">
                <Card style={{ textAlign: "center", alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }} >
                    <Card.Img variant="top" src={character.element.image} />
                    <Card.Body >
                        <Card.Title>{character.element.name}</Card.Title>
                        <Card.Text>
                            <span className="row text-sm-start" > {character.element.species}</span>
                            <span className="row text-sm-start" >{character.element.name}</span>
                            <span className="row text-sm-start" >{character.element.gender}</span>
                            <span className="row text-sm-start" >{character.element.type}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>);
    };

    /* FUNCIÓN QUE CREARA LOS CARDS */
    const cards = (characters) => {
        try {
            //console.log('load cards: ', characters)
            // RECORRER LISTA INGRESADA
            const cards = characters.map(function (character, index) {
                //INVOCAR FUNCIÓN PARA GENERAR UN CARD
                return card(character, index)
            });
            return (<Row id="" className="g-4">{cards}</Row>);
        } catch (ex) {
            console.log(ex)
            return (<Row id="" className="g-4"></Row>);
        }
    };

    // CREACIÓN DE COMPONENTE FAVORITE
    return (
        <div style={{ maxWidth: "1024px", margin: '0 auto', alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }}>
            <Form >
                <Row>
                    <Col md>
                    </Col>
                </Row>
                {cards(characters)}
            </Form>
        </div>
    );
};

export default Favorite;