import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Jumbotron, Modal, Button, Form } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import axios from 'axios';


const URL = 'http://localhost/locacaoVeiculos/app/veiculos';
const URL_DEL = 'http://localhost/locacaoVeiculos/app/veiculo';
const URL_VEICULO = "http://localhost/locacaoVeiculos/app/veiculo";
const URL_UPDATE = "http://localhost/locacaoVeiculos/app/veiculo";

function Veiculos() {

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

    function setarValoresModal(variable, valor) {
        var s = document.getElementById(variable);
        s.value = valor;
        return s;
    }

    const carregarDadosVeiculo = (id) => {
        axios({
            method: 'get',
            url: `${URL_VEICULO}/${id}`
        })
            .then(function (response) {
                const veiculo = response.data;
                //console.log(veiculo);              
                setShow(true);
                setarValoresModal("id", veiculo[0].id_veiculo);
                setarValoresModal("marca", veiculo[0].marca_veiculo);
                setarValoresModal("modelo", veiculo[0].modelo_veiculo);
                setarValoresModal("ano", veiculo[0].ano_veiculo);
                setarValoresModal("cor", veiculo[0].cor_veiculo);
            });
    }

    function update(e) {
        e.preventDefault();

        let id = document.getElementById("id").value;
        let marca = document.getElementById("marca").value;
        let modelo = document.getElementById("modelo").value;
        let ano = document.getElementById("ano").value;
        let cor = document.getElementById("cor").value;

        axios({
            method: 'put',
            url: `${URL_UPDATE}/${id}`,
            data: {
                marca: marca,
                modelo: modelo,
                ano: ano,
                cor: cor
            }
        });
        alert('Veiculos Atualizado');
        document.location.reload(true);
    }


    const removeData = (id) => {

        let confirma = window.confirm('Deseja apagar esse veiculo ?');
        if (confirma) {
            axios.delete(`${URL_DEL}/${id}`).then(res => {
                const del = Veiculos.filter(veiculo => id !== veiculo.id)
                setVeiculos(del)
            });
            alert('Veiculos Apagado');
            document.location.reload(true);
        } else {
            alert('Ação cancelada, nada foi modificado');
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
                        <button className='btn btn-info' onClick={() => carregarDadosVeiculo(id_veiculo)}>Editar</button>
                        <button className='btn btn-danger' onClick={() => removeData(id_veiculo)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Container>
            <Jumbotron fluid className="topo-bottom-40">
                <Container>
                    <h1 className="page-header text-center">Listar Veiculos</h1>
                </Container>
            </Jumbotron>
            <Row>
                <div className="container">
                    <a class="btn btn-primary btn-sm btn-novo" href="/novo">Cadastrar Veiculo</a>

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
                    <Modal.Title>Editar Veiculo</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form name="form" id="form" method="post" onSubmit={(event) => update(event)}>
                        <input type="hidden" name="id" id="id"></input>
                        <div className="form-group">
                            <label>Marca</label>
                            <input type="text" name="marca" id="marca" class="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Modelo</label>
                            <input type="text" name="modelo" id="modelo" class="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Ano</label>
                            <input type="text" name="ano" id="ano" class="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Cor</label>
                            <input type="text" name="cor" id="cor" class="form-control"></input>
                        </div>
                        <div class="form-group">
                            <button className="btn btn-primary">Atualizar</button>
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

export default Veiculos;
