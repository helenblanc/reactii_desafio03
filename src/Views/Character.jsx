import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import AppContext from '../app_context';

// FUNCIÓN QUE CREA UN COMPONENTE CONTACT
export const Character = () => {

    console.log('LOADING CHARACTER...')
    // CARGANDO VARIABLE DATA GLOBAL
    const { data, setData } = useContext(AppContext)
    // CREANDO HOOK LOCAL DE COMPONENTE CHARACTERS
    const [character, setCharacter] = useState()
    // CARGANDO PARAMETRO DE ENTRADA
    const { id } = useParams();
    console.log('id', id)
    // CREANDO HOOK PARA RENDERIZAR
    useEffect(() => {
        // RECORRER VARIABLE GLOBAL CON LA INFORMACIÓN DE LOS PERSONAJES
        // Y BUSCA SOLO EL ELEMENTO POR EL ID
        data.characters.forEach(function (e) {
            if (e.element.id == id) {
                //console.log('e: ', e);
                setCharacter(e)
            }
        });
    }, []);
    
    /* FUNCIÓN QUE CREA UN CARD CON LOS DATOS DEL PERSONAJE DE RICK Y MORTY*/
    const card = (r) => {
        try {        
            //console.log('load card: ', character)
            return (
                <Col key={r.element.id} className="col-4 mx-auto">
                    <Card style={{ textAlign: "center", alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }} >
                        <Card.Img variant="top" src={r.element.image} />
                        <Card.Body >
                            <Card.Title>{r.element.name}</Card.Title>
                            <Card.Text>
                                <span className="row text-sm-start" > {r.element.species}</span>
                                <span className="row text-sm-start" >{r.element.name}</span>
                                <span className="row text-sm-start" >{r.element.gender}</span>
                                <span className="row text-sm-start" >{r.element.type}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>);
        } catch (ex) {
            console.log(ex)
            return (<Col></Col>);
        }                
    };

    // CREACIÓN DE COMPONENTE CHARACTER
    return (
        <div style={{ maxWidth: "1024px", margin: '0 auto', alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }}>
            <Form >
                <Row>
                    <Col md>
                    </Col>
                </Row>
                {card(character)}
            </Form>
        </div>
    );
};

export default Character;