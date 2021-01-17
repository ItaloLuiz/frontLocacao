import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import axios from 'axios';

const URL = 'http://localhost/locacaoVeiculos/app/veiculosLocados';
const URL_DEVOLUCAO = 'http://localhost/locacaoVeiculos/app/devolverVeiculo';

function VeiculosLocados() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [Veiculos, setVeiculos] = useState([])

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const response = await axios.get(URL)
        setVeiculos(response.data);
    }

    function devolverVeiculo(id) {
        if (axios.put(`${URL_DEVOLUCAO}/${id}`)) {
            alert('Veiculo Devolvido');
            document.location.reload(true);
        } else {
            alert('Erro,veiculo não devolvido');
        }
    }

    const renderHeader = () => {
        let headerElement = ['marca', 'modelo', 'ano', 'cor', 'Ação'];
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return Veiculos && Veiculos.map(({ id_veiculo, marca_veiculo, modelo_veiculo, ano_veiculo, cor_veiculo }) => {
            return (
                <tr key={id_veiculo}>
                    <td>{marca_veiculo}</td>
                    <td>{modelo_veiculo}</td>
                    <td>{ano_veiculo}</td>
                    <td>{cor_veiculo}</td>
                    <td className='btn-group'>

                        <button className='btn btn-primary' onClick={() => devolverVeiculo(id_veiculo)}>Devolver</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Container>
            <Jumbotron fluid className="topo-bottom-40">
                <Container>
                    <h1 className="page-header text-center">Listar Veiculos Locados</h1>
                </Container>
            </Jumbotron>
            <Row>
                <div className="container">
                    <table className="table" id='veiculos'>
                        <thead>
                            <tr>{renderHeader()}</tr>
                        </thead>
                        <tbody>
                            {renderBody()}
                        </tbody>
                    </table>
                </div>
            </Row>
        </Container>
    );

}

export default VeiculosLocados;
