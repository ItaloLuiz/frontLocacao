import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Jumbotron, Modal, Button, Form } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import axios from 'axios';

const URL = 'http://localhost/locacaoVeiculos/app/veiculosDisponiveis';
const URL_LOCACAO = 'http://localhost/locacaoVeiculos/app/locarVeiculo';

function VeiculosDisponiveis() {

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

    const handleShow = (e) => {
        setShow(true);
        localStorage.setItem('id_locacao_veiculo', e);
    }

    function locarVeiculo(e) {
        e.preventDefault();

        let id = localStorage.getItem('id_locacao_veiculo');
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let telefone = document.getElementById("telefone").value;

        axios({
            method: 'post',
            url: `${URL_LOCACAO}`,
            data: {
                id_veiculo: id,
                nome_cliente: nome,
                email_cliente: email,
                telefone_cliente: telefone
            }
        });
        alert('Veiculos Locado');
        document.location.reload(true);
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
                        <button className='btn btn-info' onClick={() => handleShow(id_veiculo)}>Locar Veiculo</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Container>
            <Jumbotron fluid className="topo-bottom-40">
                <Container>
                    <h1 className="page-header text-center">Listar Veiculos Disponiveis</h1>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Locar Veiculo</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form name="form" id="form" method="post" onSubmit={(event) => locarVeiculo(event)}>

                        <div class="form-group">
                            <label>Nome</label>
                            <input name="nome" type="text" id="nome" class="form-control"></input>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input name="email" type="text" id="email" class="form-control"></input>
                        </div>
                        <div class="form-group">
                            <label>Telefone</label>
                            <input name="telefone" type="text" id="telefone" class="form-control"></input>
                        </div>
                        <div class="form-group">
                            <Button variant="primary" type="submit">
                                Enviar Dados
                        </Button>
                        </div>
                    </form>




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );

}
export default VeiculosDisponiveis;
