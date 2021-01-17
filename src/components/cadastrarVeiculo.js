import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import axios from 'axios';

const URL_CADASTRO = 'http://localhost/locacaoVeiculos/app/veiculo';

function CadastrarVeiculo() {


    function cadastro(e) {
        e.preventDefault();

        let marca = document.getElementById("marca").value;
        let modelo = document.getElementById("modelo").value;
        let ano = document.getElementById("ano").value;
        let cor = document.getElementById("cor").value;

        axios({
            method: 'post',
            url: `${URL_CADASTRO}`,
            data: {
                marca: marca,
                modelo: modelo,
                ano: ano,
                cor: cor
            }
        });
        alert('Veiculos Cadastrado');
        document.location.reload(true);
    }


    return (
        <Container>
            <Jumbotron fluid className="topo-bottom-40">
                <Container>
                    <h1 className="page-header text-center">Cadastrar Veiculo</h1>
                </Container>
            </Jumbotron>
            <Row>
                <div className="container">
                    <form name="form" id="form" method="post" onSubmit={(event) => cadastro(event)}>
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
                            <button className="btn btn-primary">Cadastrar</button>
                        </div>
                    </form>

                </div>
            </Row>
        </Container>
    )
}

export default CadastrarVeiculo;