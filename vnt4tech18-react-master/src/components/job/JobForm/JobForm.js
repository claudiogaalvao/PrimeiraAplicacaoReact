import React, { Component } from 'react';
import axios from 'axios';

class JobForm extends Component {

  state = {
    newJob: {}
  }

  postDataHandler = (event) => {
    let novaVaga = {
      ...this.state.newJob
    };

    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    }

    axios.post('/jobs', novaVaga, axiosConfig)
      .then((response) => {
        novaVaga.id = response.data;
        this.props.addToList(novaVaga);
      })
      .catch(() => {

      }) 
    
    event.preventDefault();
  }

  changeValueHandler = (nomeAtributo, valor) => {
    let currentJob = this.state.newJob;

    // isso serve para transformar o texto em array. Ele vai separar por cada linha digitada no textarea
    if (nomeAtributo == 'skills' || nomeAtributo == 'differentials') {
      currentJob[nomeAtributo] = valor.split(/\n\r?/g);
    } else {
      currentJob[nomeAtributo] = valor;
    }

    this.setState({ newJob: currentJob });
  }

  render() {
    return (
      <form className="row mb-0">
        <div className="form-group col-12">
          <label htmlFor="nome">Nome</label>
          <input 
            onChange={(e) => 
              this.changeValueHandler('name', e.target.value)}
            type="text" 
            className="form-control" id="nome"/>
        </div>
        <div className="form-group col-12">
          <label htmlFor="descricao">Descrição</label>
          <textarea className="form-control" id="descricao" rows="3"
            onChange={(e) => 
              this.changeValueHandler('description', e.target.value)}>
          </textarea>
        </div>
        <div className="form-group col-sm-12 col-md-6">
          <label htmlFor="habilidades">Habilidades necessárias</label>
          <textarea className="form-control" id="habilidades" 
            rows="3"
            onChange={(e) => 
              this.changeValueHandler('skills', e.target.value)}></textarea>
        </div>
        <div className="form-group col-sm-12 col-md-6">
          <label htmlFor="diferenciais">Diferenciais</label>
          <textarea className="form-control" id="diferenciais" 
            rows="3"
            onChange={(e) => 
              this.changeValueHandler('differentials', e.target.value)}></textarea>
        </div>
        <div className="form-group col-sm-12 col-md-6">
          <label htmlFor="salario">Salário Base</label>
          <input type="text" className="form-control" 
            id="salario"
            onChange={(e) => 
              this.changeValueHandler('salary', e.target.value)}/>
        </div>
        <div className="form-group col-sm-12 col-md-6">
          <label htmlFor="area">Área</label>
          <select className="form-control" id="area"
            onChange={(e) => 
              this.changeValueHandler('area', e.target.value)}>
            <option disabled selected>Selecione...</option>
            <option>Desenvolvimento</option>
            <option>Design</option>
            <option>Teste</option>
          </select>
        </div>
        <div className="form-group form-check col-sm-12 col-md-6 ml-3">
            <input type="checkbox" className="form-check-input" 
              id="isPCD"
              onChange={(e) => 
                this.changeValueHandler('isPcd', e.target.value)}/>
            <label className="form-check-label" htmlFor="isPCD">Vaga para PCD</label>
          </div>

        <div className="form-group col-12 text-right mb-0">
          <button type="submit" className="btn btn-success"
            onClick={this.postDataHandler}>Salvar</button>
        </div>
      </form>
    )
  }
}

export default JobForm;