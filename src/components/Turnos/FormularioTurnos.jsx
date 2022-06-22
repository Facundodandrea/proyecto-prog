import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const CssTextField = styled(TextField)({

  '& label': {
    color: '#05a1a7'
  },
  '& label.Mui-focused': {
    color: '#00C4CC',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#00C4CC',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#05a1a7',
    },
    '&:hover fieldset': {
      borderColor: '#05a1a7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00C4CC',
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C4CC',
      contrastText: '#05a1a7',
      },
      secondary: {
        main: '#05a1a7',
        contrastText: '#05a1a7',
      },
    },
    typography: {
      allVariants: {
        fontFamily: 'Poppins',
        color: '#05a1a7',
      },
    },
  })

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
  const [espMedico, setEspMedico] = useState([]);

  useEffect(() => {

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
  }, []);

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
    console.log(espMedico)
  }

  return (
    <>

    <ThemeProvider theme={theme}>
    <Box
    className='formulario-pacientes'
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    >
      <div>
        <FormControl>
          <OutlinedInput
            className='barra-buscar'
            id="outlined-adornment"
            value={dniPac}
            onChange={(e) => {setDniPac(e.target.value)}}
            startAdornment={<InputAdornment position="start"><SearchRoundedIcon/></InputAdornment>}
            placeholder="Ingrese DNI del paciente"
          />
        </FormControl>
        <Button className="boton" onClick={() => mandarDato()} id="btnBuscar" variant="outlined" startIcon={<SearchRoundedIcon />}>
          Buscar
        </Button>
      </div>

      <div>
      <CssTextField disabled label={pacientes.dni} id="id"  variant="outlined" type="text"/>
      <CssTextField disabled label={pacientes.nombre} id="nombre"  variant="outlined" type="text"/>
      <CssTextField disabled label={pacientes.apellido} id="apellido"  variant="outlined" type="text"/>
      <br></br>
      </div>

      <div>
      <CssTextField disabled label={pacientes.fechaNacimiento} id="fechaNac" variant="outlined" type="number"/>
      <CssTextField disabled label={pacientes.direccion} id="direccion" variant="outlined" type="text"/>
      <CssTextField disabled label={pacientes.telefono} id="telefono" variant="outlined" type="text"/>
      <br></br>
      </div>

      <div>
      <CssTextField disabled id="obraSocial" label={pacientes.obraSocial} variant="outlined" type="text"/>
      <CssTextField disabled id="afiliado" label={pacientes.numAfiliado} variant="outlined" type="text"/>
      <br></br>
      </div>

      <h2 color="#05a1a7">Asignar Turno</h2>
      <div>
      <CssTextField disabled={desactivado} onChange={(e) => {setFecha(e.target.value);}} label="Fecha Turno" variant="outlined" type="date" InputLabelProps={{ shrink: true }}/>
      <CssTextField disabled={desactivado} onChange={(e) => {setHora(e.target.value);}} label="Hora Turno" variant="outlined" type="time" InputLabelProps={{ shrink: true }}/>
      </div>
      <div>
      <CssTextField
              className='especialidad'
              id="especialidad"
              select
              label="Especialidad"
              disabled={desactivado}
              onChange={(e) => {setEspecialidad(e.target.value)}}
              helperText="Elija una especialidad"
            >
              <MenuItem disabled value={'Seleccionar'}>Seleccionar</MenuItem>
              <MenuItem value={'clinico'}>Clínico</MenuItem>
              <MenuItem value={'pediatra'}>Pediatra</MenuItem>
              <MenuItem value={'oftalmologo'}>Oftalmólogo</MenuItem>
              <MenuItem value={'otorrino'}>Otorrino</MenuItem>
              <MenuItem value={'ginecologo'}>Ginecólogo</MenuItem>
              <MenuItem value={'dermatologo'}>Dermatólogo</MenuItem>
              {/* {especialidades.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} */}
            </CssTextField>
            <CssTextField
              id="medico"
              disabled={desactivado}
              onClick={() => cargarMedicos(especialidad)}
              onChange={(e) => {
              setMedicoElegido(e.target.value);
              }}
              className='especialidad'
              select
              label="Médicos"
              helperText="Elija un médico"
            >
              <MenuItem disabled value={'Seleccionar'}>Seleccionar</MenuItem>
              {espMedico.map((v) => (
              <MenuItem value={v.dni}>
               {v.apellido}, {v.nombre}
              </MenuItem>
              ))}
            </CssTextField>
      </div>
      <Button disabled={desactivado} className="boton" id="agregarTurno" onClick={() => publicarTurno()} variant="outlined" startIcon={<AddRoundedIcon />}>
             AGREGAR
      </Button>
      </Box>
      </ThemeProvider>
    </>
  );
};