import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AppContext from '../app_context';


/* LLAMADO DE API PERSONAJES RICK & MORTY*/
async function apiRickAndMortyCharacter() {
    const newData = []
    try {
        const url = 'https://rickandmortyapi.com/api/character';
        //console.log('call api rick and morty: ', url)
        // Documentacion API https://rickandmortyapi.com/documentation
        const response = await fetch(url)
        const dataJ = await response.json()
        const arr = dataJ.results.sort((a, b) => {
            //  ORDENAR POR NOMBRE DE LA A A LA Z
            if (a.name < b.name) {
                return -1;
            }
        });
        // CREANDO VARIABLE NEWDATA CON DATOS OBTENIDOS DEL SERVICIO
        // MÁS ATRIBUTO FAVORITO EN FALSO, MÁS CLASE DE BOTÓN START
        arr.forEach((element) => {
            newData.push({ 'element': element, 'favorite': false, 'style': 'outline-primary icon bi-star' })
        });
    } catch (ex) {
        console.log(ex)
    }
    return newData;
};


// FUNCIÓN QUE CREA UN COMPONENTE HOME
export const Home = () => {
    console.log('LOADING HOME...')
    // CARGANDO VARIABLE DATA GLOBAL
    const { data, setData } = useContext(AppContext)
    // CREANDO HOOK LOCAL DE COMPONENTE CHARACTERS
    const [characters, setCharacters] = useState([])
    // CREANDO HOOK LOCAL ID
    const [id, setId] = useState("");
    // CREANDO HOOK PARA RENDERIZAR
    useEffect(() => {
        //FUNCIÓN ASINCRONA LLAMADO A API RICK AND MORTY
        const fetchData = async () => {
            const arr = await apiRickAndMortyCharacter();
            //ACTUALIZACIÓN ESTADO VARIABLE CHARACTERS
            setCharacters(arr);
            //CREACIÓN NUEVO OBJECTO DATA
            let newData = { 'characters': [], 'isData': false };
            newData.characters = arr;
            newData.isData = true
            // ACTUALIZACIÓN OBJETO GLOBAL CON LA DATA OBTENIDA DE LA API
            setData(newData)
        };
        // SOLO SE LLAMA A LA API UNA VEZ
        if (data.isData === false) {
            fetchData()
        } else {
            // SI LOS DATOS YA OBTENIDOS DE LA API SE BUSCA LA INFORMACIÓN
            // EN LA VARIABLE GLOBAL
            setCharacters(data.characters)
        }
    }, []);

    // FUNCIÓN PARA REDIRECCIONAR DE FORMA PROGRAMATICA
    const navigate = useNavigate();
    const detail = (id) => {
        navigate('/character/'+id);
    };

    /* FUNCIÓN QUE CREA UN CARD CON LOS DATOS EN PERSONAJE DE RICK Y MORTY*/
    const card = (character, index) => {
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
                        <Button variant={character.style} onClick={(e) => { click(e.target, character, index) }}></Button>
                        <Button variant="outline-primary icon bi-postcard mx-2" onClick={(e) => { detail(character.element.id) }}></Button>
                    </Card.Body>
                </Card>
            </Col>);
    };

    // FUNCIÓN QUE PERMITE ACTUALIZAR EL ESTADO DE UN OBJETO EN LA VARIABLE LOCAL Y GLOBAL
    const click = (target, character, index) => {
        //console.log('target: ', target);
        //console.log('click: ', character);
        character.favorite = !character.favorite;
        start(character);
        // COPIA DE LA LISTA LOCAL
        let copy = characters.slice(0);
        //ACTUALIZACIÓN DE PERSONAJE EN LA LISTA COPIA
        copy[index] = character;
        setCharacters(copy);
        // ACTUALIZACIÓN DE TODA LA LISTA DESDE UNA COPIA
        let newData = { 'characters': [], 'isData': false };
        newData.characters = copy;
        newData.isData = true;
        setData(newData);
    };

    // FUNCIÓN QUE DETERMINA LA CLASE QUE USARA EL BOTÓN FAVORITO (START)
    const start = (character) => {
        //console.log('start: ', character)
        if (character.favorite) {
            character.style = 'outline-primary icon bi-star-fill'
        } else {
            character.style = 'outline-primary icon bi-star'
        }
    }

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

    // CREACIÓN DE COMPONENTE HOME
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

export default Home;