import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export const FormularioTurnos = () => {
  const success = () => {
    swal({
      icon: "success",
      timer: "5000",
    });
  };

  const fail = (err) => {
    swal({
      title: "Error",
      text: `${err}`,
      icon: "error",
      timer: "5000",
    });
  };

  const db_clinica = axios.create({
    baseURL: "http://localhost:3002",
  });

  const [pacientes, setPacientes] = useState([]);
  // const [dni, setDni] = useState(null);
  const [error, setError] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [dniPac, setDniPac] = useState("");
  const [fecha, setFecha] = useState(null);
  const [especialidad, setEspecialidad] = useState([]);
  const [medicoElegido, setMedicoElegido] = useState(null);
  const [hora, setHora] = useState(null);
  const [desactivado, setDesactivado] = useState(true);
  const [turnos, setTurnos] = useState(null);
  // const [pacJSON, setPacJSON] = useState(null)
  const [espMedico, setEspMedico] = useState([]);

  useEffect(() => {
    // async function obtenerDatosPacientes(){
    //   const basePacientes = await db_clinica.get('/pacientes/'+ dni).catch(error => {setError(error)});
    //   setPacientes(basePacientes.data)
    // }
    // obtenerDatosPacientes();

    axios
      .get("http://localhost:3002/pacientes/")
      .then((resp) => {
        setPacientes(resp.data);
      })
      .catch((err) => {
        setError(err);
      });

    axios
      .get("http://localhost:3002/medicos/")
      .then((resp) => {
        setMedicos(resp.data);
      })
      .catch((err) => {
        setError(err);
      });

    axios
      .get("http://localhost:3002/turnos/")
      .then((resp) => {
        setTurnos(resp.data);
      })
      .catch((err) => {
        setError(err);
      });

    /*    axios.get("http://localhost:3002/pacientes").then((resp) => {
      setPacJSON(resp.data)
    }).catch((err) => {setError(err)})*/

    // async function obtenerDatosMedicos(){
    //   const baseMedicos = await db_clinica.get('/medicos/').catch(error => {setError(error)});
    //   setMedicos(baseMedicos.data)
    // }
    // obtenerDatosMedicos(); //obtener datos de medicos

    // async function obtenerDatosTurnos(){
    //   const baseTurnos = await db_clinica.get('/turnos').catch(error => {setError(error)});
    //   setTurnos(baseTurnos.data)
    // }
    // obtenerDatosTurnos();
  }, []);

  // let turnosJSON = JSON.stringify(turnos)
  // localStorage.setItem("BaseTurnos", turnosJSON)

  // let medicosJSON = JSON.stringify(medicos)
  // localStorage.setItem("BaseMedicos", medicosJSON)

  // let pacientesJSON = JSON.stringify(pacJSON)
  // localStorage.setItem("BasePacientes", pacientesJSON)

  if (error)
    return (
      <>
        <label>Error: {error.message}</label>
        <br />
        <br />
        <button
          onClick={() => {
            recargar();
          }}
        >
          Recargar
        </button>
      </>
    );

  function recargar() {
    window.location.reload();
  }

  function mandarDato() {
    if (dniPac == "") {
      alert("Debe ingresar un valor correcto");
    } else {
      const pacEncontrado = pacientes.find((n) => n.dni == dniPac)
        ? pacientes.find((n) => n.dni == dniPac).id
        : alert('No se encontró el DNI');

      axios
        .get("http://localhost:3002/pacientes/" + pacEncontrado)
        .then((resp) => {
          setPacientes(resp.data); // cambiar variable a paciente setPaciente
          console.log(resp.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
    if (!error) {
      setDesactivado(false);
    }

    // setDni(dniPac)
  }

  async function publicarTurno() {
    await db_clinica.post("/turnos/", {
        dniPac,
        medicoElegido,
        fecha,
        hora,
        
      })
      .catch((error) => {
        fail(error);
      });

    success();

    recargar();
  }

  function cargarMedicos(esp) {
    let cargarEsp = medicos.filter((db) => db.especialidad == esp);
    setEspMedico(cargarEsp);
  }

  return (
    <>
      <h1>Agregar Turno</h1>
      <br />

      <input
        type="number"
        placeholder="ingrese el DNI"
        onChange={(e) => {
          setDniPac(e.target.value);
        }}
      />

      <button onClick={() => mandarDato()}>Buscar</button>
      <br />
      <br />

      <label>DNI: </label>
      <label id="id">{pacientes.dni}</label>
      <br />
      <br />

      <label>Apellido: </label>
      <label id="apellido">{pacientes.apellido}</label>
      <br />
      <br />

      <label>Nombre: </label>
      <label id="nombre">{pacientes.nombre}</label>
      <br />
      <br />

      <label>Fecha de Nacimiento: </label>
      <label id="fechaNac">{pacientes.fechaNacimiento}</label>
      <br />
      <br />

      <label>Obra Social: </label>
      <label id="obraSoc">{pacientes.obraSocial}</label>
      <br />

      <label>N° Afiliado: </label>
      <label id="afiliado">{pacientes.numAfiliado}</label>
      <br />
      <br />

      <label>Direccion: </label>
      <label id="direccion">{pacientes.direccion}</label>
      <br />
      <br />

      <label>Telefono: </label>
      <label id="telefono">{pacientes.telefono}</label>
      <br />
      <br />

      <h4>Asignar Turno</h4>

      <label>Fecha Turno: </label>
      <input
        type="date"
        disabled={desactivado}
        onChange={(e) => {
          setFecha(e.target.value);
        }}
      />
      <br />
      <br />

      <label>Hora: </label>
      <input
        type="time"
        disabled={desactivado}
        onChange={(e) => {
          setHora(e.target.value);
        }}
      />
      <br />
      <br />

      <label>Especialidad: </label>
      <select
        name="especialidades"
        id="especialidad"
        disabled={desactivado}
        value={especialidad}
        onChange={(e) => {
          setEspecialidad(e.target.value);
        }}
      >
        <option disabled selected>
          seleccionar
        </option>
        <option value="clinico">Clínico</option>
        <option value="pediatra">Pediatra</option>
        <option value="gastroenterologo">Gastroenterólogo/a</option>
        <option value="traumatologo">Traumatólogo/a</option>
        <option value="dermatologo">Dermatólogo/a</option>
        <option value="cardiologo">Cardiólogo</option>
      </select>
      <br />
      <br />

      <label>Medico/a: </label>
      <select
        name="doctores"
        id="medico"
        disabled={desactivado}
        onClick={() => cargarMedicos(especialidad)}
        onChange={(e) => {
          setMedicoElegido(e.target.value);
        }}
      >
        <option value="seleccionar" selected disabled>
          Seleccionar
        </option>
        {espMedico.map((v) => (
          <option value={v.id}>
            {v.apellido}, {v.nombre}
          </option>
        ))}
      </select>
      <br />
      <br />
      <br />
      <br />

      <button
        id="agregarTurno"
        onClick={() => publicarTurno()}
        disabled={desactivado}
      >
        Agregar turno
      </button>
    </>
  );
};
