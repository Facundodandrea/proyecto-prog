import React from "react";
import {AppBar, Toolbar, CssBaseline} from "@material-ui/core";
import { Link } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Pacientes from "../../pages/Pacientes/Pacientes";
import Medicos from "../../pages/Medicos/Medicos";
import Turnos from "../../pages/Turnos/Turnos";
import './navbar.css';

function Navbar() {

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
          <div className="container">
            <Link to="/" className={<Home/>}>
              Home
            </Link>
            <Link to="/pacientes" className={<Pacientes/>}>
              Pacientes
            </Link>
            <Link to="/medicos" className={<Medicos/>}>
              Medicos
            </Link>
            <Link to="/turnos" className={<Turnos/>}>
              Turnos
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;