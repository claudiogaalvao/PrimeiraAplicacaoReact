import React, { Component } from 'react';
import Card from '../JobCard/JobCard';
import Loading from '../../navigation/Loading/Loading';

import axios from 'axios';

import Form from '../JobForm/JobForm';
import Collapse from '../../../hoc/Collapse/Collapse';

class JobList extends Component {

  state = {
    jobs: [],
    selectedId: null,
    hasError: false
  }

  addItemToList = (newItem) => {
    let currentJobs = this.state.jobs;
    currentJobs.push(newItem);
    this.setState({ jobs: currentJobs });
  }

  componentDidMount() {
    axios.get('/jobs')
         .then(response => {
            this.setState({ jobs: response.data });
         })
         .catch(error => {
           console.error(error);console.error(error);
         })
  }

  jobRemoveHandler = (id, nome) => {
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    }

    if (window.confirm(`Deseja realmente excluir essa vaga "${nome}"?`)) {
      axios.delete(`/jobs/${id}`, axiosConfig)
           .then(res => {
             let vagasAtualizadas = this.state.jobs;
             const indiceRemovido = 
              vagasAtualizadas.findIndex(item => item.id == id);
              
             vagasAtualizadas.splice(indiceRemovido, 1);
             this.setState({ jobs: vagasAtualizadas })
           })
           .catch(error => {
             if (error.response.status == 401) {
               alert('Não autorizado');
             }
             console.error(error);
           })
    }
  }

  jobEditHandler = (id) => {
    console.log("Editar id " + id);
  }

  getJobCards() {
    const html = 
      this.state.jobs.map(vaga => {
        return  <div className="col-sm-12 col-md-6 col-lg-4 mb-3"
                  key={vaga.id}>
                  <Card vaga={vaga}
                    name={vaga.name}
                    description={vaga.description}
                    salary={vaga.salary}
                    area={vaga.area}
                    editHandler={() => this.jobEditHandler(vaga.id)}
                    removeHandler={() => this.jobRemoveHandler(vaga.id, vaga.name)}>
                  </Card>
                </div>
      })

    return html;
  }

  render() {

    let htmlGerado = null;

    if (this.state.jobs != undefined && this.state.jobs.length > 0) {
      htmlGerado = this.getJobCards();
    } else {
      htmlGerado = <Loading/>
    }

    // let htmlGerado = 
    //   (this.state.jobs != undefined && this.state.jobs.length > 0) ?
    //   this.getJobCards() : <Loading/>

    return (
      <div>
        <Collapse collapseId="formCollapse" innerText="CRIAR VAGA"
              classCollapse="btn-secondary">
          <Form addToList={this.addItemToList}/>
        </Collapse>

        <div className="row">        
          {htmlGerado}
        </div>
      </div>
    );
  }
}
export default JobList;