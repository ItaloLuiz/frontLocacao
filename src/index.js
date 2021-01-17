import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Header from './components/header';
import Veiculos from './components/veiculos';
import VeiculosDisponiveis from './components/veiculosDiponiveis';
import VeiculosLocados from './components/veiculosLocados';
import CadastrarVeiculo from './components/cadastrarVeiculo';


ReactDOM.render(
  <React.StrictMode>
   <Header/> 
    <Router>
      <Switch>
            <Route exact path="/">
              <Veiculos />
            </Route>
            <Route path="/disponiveis">
              <VeiculosDisponiveis/>
            </Route>
            <Route path="/locados">
              <VeiculosLocados/>
            </Route>
            <Route path="/novo">
              <CadastrarVeiculo/>
            </Route>
      </Switch>
    </Router>   
  </React.StrictMode>,
  document.getElementById('root')
);


