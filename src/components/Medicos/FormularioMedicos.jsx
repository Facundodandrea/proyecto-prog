import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import './medicos.css';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

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
  });

const especialidades = [
  {
    value: 'clinico',
    label: 'Clínico',
  },
  {
    value: 'pediatra',
    label: 'Pediatra',
  },
  {
    value: 'oftalmologo',
    label: 'Oftalmólogo',
  },
  {
    value: 'otorrino',
    label: 'Otorrino',
  },
  {
    value: 'ginecologo',
    label: 'Ginecologo',
  },
  {
    value: 'dermatologo',
    label: 'Dermatologo',
  },
];

const generos = [
  {
    value: 'masculino',
    label: 'Masculino',
  },
  {
    value: 'femenino',
    label: 'Femenino',
  },
];


const FormularioMedicos = () => {

  const baseURL = "http://localhost:3002/medicos/"

  const [buscar, setBuscar] = useState("")
  const [id, setId] = useState(null);
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [genero, setGenero] = useState("Seleccionar");
  const [numMatricula, setNumMatricula] = useState("");
  const [especialidad, setEspecialidad] = useState("Seleccionar");
  const [baseDatos, setBaseDatos] = useState([]);

  const handleChangeBuscar = (event) => {
    setBuscar(event.target.value);
  };

  const handleChangeEspecialidad = (event) => {
    setEspecialidad(event.target.value);
  };

  const handleChangeGenero = (event) => {
    setGenero(event.target.value);
  };

  const handleChangeDni = (event) => {
    setDni(event.target.value);
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangeApellido = (event) => {
    setApellido(event.target.value);
  };

  const handleChangeFechaNacimiento = (event) => {
    setFechaNacimiento(event.target.value);
  };

  const handleChangeTelefono = (event) => {
    setTelefono(event.target.value);
  };

  const handleChangeDireccion = (event) => {
    setDireccion(event.target.value);
  };

  const handleChangeNumMatricula = (event) => {
    setNumMatricula(event.target.value);
  };

  const postDatos = async () => {  // cargar medico nuevo
    await axios.post(baseURL, {
      dni,
      nombre,
      apellido,
      fechaNacimiento,
      telefono,
      direccion,
      genero,
      numMatricula,
      especialidad,
    }).then(() => {
      success()
      actualizarBaseDatos()
    }).catch((err) => { alert(err); });
    limpiar();
  }

  const putDatos = async () => { // modifica datos del medico
    await axios.put(baseURL + id, {
      dni,
      nombre,
      apellido,
      fechaNacimiento,
      telefono,
      direccion,
      genero,
      numMatricula,
      especialidad,
    }).then(() => {
      success()
      actualizarBaseDatos()
    }).catch((err) => { alert(err); });
    limpiar();
  }

  const deleteDatos = async () => { // elimina medico
    await axios.delete(baseURL + id)
      .then((deleteDatos) => {
        success()
        actualizarBaseDatos()
      }).catch((err) => { alert(err); });
    limpiar();
  }

  const success = () =>{
    swal({
      icon:"success",
      timer:"2000"
    })
  }

  const fail = () =>{
    swal({
      title:"Error",
      icon:"error",
      timer:"2000"
    })
  }

  useEffect(() => { // carga base de datos cuando se carga la pagina
    axios.get(baseURL)
      .then((response) => {
        setBaseDatos(response.data);
      })
  }, [])

  async function getDatos() {  // buscar al medico con DNI
    const encontrado = baseDatos.find(n => n.dni == buscar) ? baseDatos.find(n => n.dni == buscar).id : 0
    
    await axios.get(baseURL + encontrado)
      .then((resp) => {
        setId(resp.data.id)
        setDni(resp.data.dni)
        setNombre(resp.data.nombre)
        setApellido(resp.data.apellido)
        setFechaNacimiento(resp.data.fechaNacimiento)
        setTelefono(resp.data.telefono)
        setDireccion(resp.data.direccion)
        setGenero(resp.data.genero)
        setNumMatricula(resp.data.matricula)
        setEspecialidad(resp.data.especialidad)
        setBuscar("")
      })
      .catch((err) => {
        fail()
        console.log(err)
        limpiar()
      })
  }

  async function actualizarBaseDatos() {//actualizar base de datos despues de cargar, modificar o eliminar
    await axios.get(baseURL)
      .then((response) => {
        setBaseDatos(response.data);
      })
  }

  function limpiar() { // limpia los input
    setBuscar("")
    setDni("")
    setNombre("")
    setApellido("")
    setFechaNacimiento("")
    setTelefono("")
    setDireccion("")
    setGenero("Seleccionar")
    setNumMatricula("")
    setEspecialidad("Seleccionar")
  }

  return (
    <>
    <ThemeProvider theme={theme}>
    <Box
    className='formulario-medicos'
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
            value={buscar}
            onChange={handleChangeBuscar}
            startAdornment={<InputAdornment position="start"><SearchRoundedIcon/></InputAdornment>}
            placeholder="Ingrese DNI del médico"
            type="number"
          />
        </FormControl>
        <Button className="boton" onClick={getDatos} id="btnBuscar" variant="outlined" startIcon={<SearchRoundedIcon />}>
          Buscar
        </Button>
        <Button className="boton" onClick={limpiar} id="btnBuscar" variant="outlined" startIcon={<CleaningServicesIcon />} type='submit'>
          Limpiar
        </Button>
      </div>
      <div>
      <CssTextField id="custom-css-outlined-input" value={dni} onChange={handleChangeDni} label="DNI" variant="outlined" type="number"/>
      <CssTextField id="custom-css-outlined-input" value={nombre} onChange={handleChangeNombre} label="Nombre" variant="outlined" type="text"/>
      <CssTextField id="custom-css-outlined-input" value={apellido} onChange={handleChangeApellido} label="Apellido" variant="outlined" type="text"/>
      <br></br><br></br>
      </div>

      <div className='container-input'>
        <CssTextField id="custom-css-outlined-input" value={fechaNacimiento} onChange={handleChangeFechaNacimiento} label="Fecha de nacimiento" variant="outlined" type="date" InputLabelProps={{ shrink: true }}/>
        <CssTextField 
          id="custom-css-outlined-input"
          select
          label="Género"
          value={genero}
          onChange={handleChangeGenero}
          helperText="Elija un género"
        >
        <MenuItem disabled value={'Seleccionar'}>Seleccionar</MenuItem> 
        {generos.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </CssTextField>
        <CssTextField
          className='especialidad' 
          id="custom-css-outlined-input"
          select
          label="Especialidad"
          value={especialidad}
          onChange={handleChangeEspecialidad}
          helperText="Elija una especialidad"
        >
        <MenuItem disabled value={'Seleccionar'}>Seleccionar</MenuItem> 
        {especialidades.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CssTextField>
      </div>

      <div className='container-input'>
      <CssTextField id="custom-css-outlined-input" value={direccion} onChange={handleChangeDireccion} label="Dirección" variant="outlined" type="text"/>
      <CssTextField id="custom-css-outlined-input" value={telefono} onChange={handleChangeTelefono} label="Teléfono" variant="outlined" type="number"/>
      <CssTextField id="custom-css-outlined-input" value={numMatricula} onChange={handleChangeNumMatricula} label="Nro. Matrícula" variant="outlined" type="number"/>
      </div>

      <div className='botones'>
        <Button className="boton" onClick={putDatos} variant="outlined" startIcon={<EditRoundedIcon />}>
          EDITAR
        </Button>
        <Button className="boton" onClick={deleteDatos} variant="outlined" startIcon={<DeleteRoundedIcon />}>
          BORRAR
        </Button>
        <Button className="boton" onClick={postDatos} variant="outlined" startIcon={<SaveRoundedIcon />} type='submit'>
          GUARDAR
        </Button>
      </div> 
    </Box>
    </ThemeProvider>
    </>
  )
}

export default FormularioMedicos
