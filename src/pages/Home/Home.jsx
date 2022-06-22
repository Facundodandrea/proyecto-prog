import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <h1>Bienvenido a Clínica</h1>

      <div class="accordion">

        <div class="box a1">
          <Link to="/pacientes">
            <div class="image_1">
              <div class="text">
                <h2>PACIENTES</h2>
                <p>
                  Búsqueda, carga, modificación y baja de pacientes.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div class="box a2">
          <Link to="/medicos">
            <div class="image_2">
              <div class="text">
                <h2>Médicos</h2>
                <p>
                  Búsqueda, carga, modificación y baja de médicos.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div class="box a4">
          <Link to="/turnos">
            <div class="image_4">
              <div class="text">
                <h2>Carga de Turnos</h2>
                <p>
                  Brinda un turno para algún paciente. Con buscador incorporado.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div class="box a5">
          <Link to="busquedaturno">
            <div class="image_5">
              <div class="text">
                <h2>Búsqueda de Turnos</h2>
                <p>
                  Tabla con turnos ya ocupados por pacientes. Con buscador incorporado.
                </p>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </>
  )
}

export default Home