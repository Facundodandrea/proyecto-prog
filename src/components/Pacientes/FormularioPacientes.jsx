import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import './pacientes.css';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
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
  })


const especialidades = [
  {
    value: 'subsidio',
    label: 'Subsidio de Salud',
  },
  {
    value: 'pami',
    label: 'PAMI',
  },
  {
    value: 'osde',
    label: 'OSDE',
  },
  {
    value: 'prensa',
    label: 'Prensa',
  },
  {
    value: 'galeno',
    label: 'Galeno',
  },
  {
    value: 'particular',
    label: 'Particular',
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


export default function FormularioPacientes() {

  const baseURL = "http://localhost:3002/pacientes/"

  const [buscar, setBuscar] = useState("")
  const [id, setId] = useState(null);
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [genero, setGenero] = useState("Seleccionar");
  const [obraSocial, setObraSocial] = useState("Seleccionar");
  const [numAfiliado, setNumAfiliado] = useState("");
  const bandera = true 

  const handleChangeBuscar = (event) => {
    setBuscar(event.target.value);
  };

  const handleChangeObraSocial = (event) => {
    setObraSocial(event.target.value);
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

  const [baseDatos, setBaseDatos] = useState([]);
  useEffect(() => { // carga base de datos cuando carga la pagina
    axios.get(baseURL)
      .then((response) => {
        setBaseDatos(response.data);
      }).catch((err) => { fail(err) });
  }, []) 

  const postDatos = async () => {  // cargar paciente nuevo
    if(validar(bandera)){
    await axios.post(baseURL, {
      dni,
      nombre,
      apellido,
      fechaNacimiento,
      telefono,
      direccion,
      genero,
      obraSocial,
      numAfiliado,
    }).then(() => {
      success();
      actualizarBaseDatos()
    }).catch((err) => { fail(err) });
    limpiar();
    }
  }
  
  const putDatos = async () => { // modifica datos del paciente
    if(validar(bandera)){
    await axios.put(baseURL + id, {
      dni,
      nombre,
      apellido,
      fechaNacimiento,
      telefono,
      direccion,
      genero,
      obraSocial,
      numAfiliado,
    }).then(() => {
      success();
      actualizarBaseDatos()
    }).catch((err) => { fail(err) });
    limpiar();
    }
  }

  const deleteDatos = async () => { // elimina paciente  
    await axios.delete(baseURL + id)
    .then((deleteDatos) => {
      success()
      actualizarBaseDatos()
    }).catch((err) => { fail(err) });
    limpiar();
  }
  
  const success = () =>{
    swal({
      icon:"success",
      timer:"5000"
    })
  }

  const fail = (err) => {
    swal({
      title:"Error",
      text: `${err}`,
      icon:"error",
      timer:"5000"
    })
  }

  async function actualizarBaseDatos() {
    await axios.get(baseURL)
      .then((response) => {
        setBaseDatos(response.data);
      })
  }

  
  async function getDatos() {  // buscar al paciente con DNI

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
        setObraSocial(resp.data.obraSocial)
        setNumAfiliado(resp.data.numAfiliado)
        setBuscar("")
      })
      .catch((err) => {
        fail(err)
        limpiar()                
      })
  }

  function limpiar() {
    setBuscar("")
    setDni("")
    setNombre("")
    setApellido("")
    setFechaNacimiento("")
    setTelefono("")
    setDireccion("")
    setGenero("Seleccionar")
    setObraSocial("Seleccionar")
    setNumAfiliado("")
  }

  function validar(bandera) {
    if( dni === "" || nombre === "" || apellido === "" || fechaNacimiento === "" || genero === "" || direccion === "" || telefono === "" || obraSocial === "" || numAfiliado === ""){
      fail("Complete todo los campos")
      bandera = false
    }
    return bandera
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
            value={buscar}
            onChange={handleChangeBuscar}
            startAdornment={<InputAdornment position="start"><SearchRoundedIcon/></InputAdornment>}
            placeholder="Ingrese DNI del paciente"
          />
        </FormControl>
        <Button className="boton" onClick={getDatos} id="btnBuscar" variant="outlined" startIcon={<SearchRoundedIcon />}>
          Buscar
        </Button>
        <Button className="boton" id="btnLimpiar" onClick={limpiar} variant="outlined" startIcon={<CleaningServicesIcon />} type='submit'>
          Limpiar
        </Button>
      </div>

      <div>
      <CssTextField id="custom-css-outlined-input" value={dni} onChange={handleChangeDni} label="DNI" variant="outlined" type="number"/>
      <CssTextField id="custom-css-outlined-input" value={nombre} onChange={handleChangeNombre} label="Nombre" variant="outlined" type="text"/>
      <CssTextField id="custom-css-outlined-input" value={apellido} onChange={handleChangeApellido} label="Apellido" variant="outlined" type="text"/>
      <br></br><br></br>
      </div>

      <div>
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
      </div>

      <div>
      <CssTextField id="custom-css-outlined-input" value={direccion} onChange={handleChangeDireccion} label="Dirección" variant="outlined" type="text"/>
      <CssTextField id="custom-css-outlined-input" value={telefono} onChange={handleChangeTelefono} label="Teléfono" variant="outlined" type="number"/>
      </div>
      <div>
        <CssTextField
          className='obra-social' 
          id="custom-css-outlined-input"
          select
          label="Obra Social"
          value={obraSocial}
          onChange={handleChangeObraSocial}
          helperText="Elija una Obra Social"
        >
          <MenuItem disabled value={'Seleccionar'}>Seleccionar</MenuItem> 
            {especialidades.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </CssTextField>
        <CssTextField id="custom-css-outlined-input" value={numAfiliado} onChange={(e) => setNumAfiliado(e.target.value)} label="Nro. Afiliado" variant="outlined" type="number"/>
      </div>

      <div className='botones'>
        <Button className="boton" id="btnBorrar" onClick={deleteDatos} variant="outlined" startIcon={<DeleteRoundedIcon />}>
          BORRAR
        </Button>
        <Button className="boton" id="btnEditar" onClick={putDatos} variant="outlined" startIcon={<EditRoundedIcon />}>
          EDITAR
        </Button>
        <Button className="boton" id="btnGuardar" onClick={postDatos} variant="outlined" startIcon={<SaveRoundedIcon />}>
          GUARDAR
        </Button>
      </div>    
    </Box>
    </ThemeProvider>
    </>
  );
}

