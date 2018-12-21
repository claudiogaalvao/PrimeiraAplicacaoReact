import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo-h-vjobs.png';

const header = (props) => (
    <nav className="navbar navbar-expand-lg navbar-light  bg-dark">
      <a className="navbar-brand" href="#">
        <img src={logo} style={{ width: '100px' }} />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" 
        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link active text-white" 
            to='/vagas'>Vagas</Link>
          <Link className="nav-item nav-link text-white" 
            to='/sobre'>Sobre</Link>
        </div>
      </div>

      <a className="nav-item nav-link text-white">
        {props.userName}
      </a>
      <a className="nav-item nav-link text-white" onClick={() => props.logout()}>
        <i className="fas fa-sign-out-alt"></i>
      </a>
    </nav>
);

export default header;