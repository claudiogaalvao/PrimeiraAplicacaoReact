import React from 'react';

import imgDeveloper from '../../../assets/images/developer.png';
import imgDesigner from '../../../assets/images/designer.png';
import imgTester from '../../../assets/images/tester.png';

const jobCard = (props) => {

  let imagem = null;

  switch(props.area) {
    case 'Desenvolvimento':
      imagem = imgDeveloper;
      break;
    case 'Design':
      imagem = imgDesigner;
      break;
    case 'Testes':
      imagem = imgTester;
      break;
    default: 
      imagem = null;
      break;
  }

  return (
    <div className="card">
      <img className="card-img-top" src={imagem} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <div>
          <b>Descrição:</b>
          <p>{props.description}</p>

          <b>Salário base:</b>
          <p>R$ {props.salary}</p>

        </div>
        <button onClick={props.editHandler} className="btn btn-warning mr-2">
          <i className="far fa-edit"></i>
        </button>
        <button onClick={props.removeHandler} className="btn btn-danger">
          <i className="far fa-trash-alt mr-1"></i>Excluir
        </button>
      </div>
    </div>
  );
}

export default jobCard;