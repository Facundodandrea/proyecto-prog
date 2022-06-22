import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      borderBottom: '2px solid #05a1a7!important',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const useStyles = makeStyles({
  table: {  
    minWidth: 1200,
  },
});

const Grilla = () => {
  const classes = useStyles();

  //const [id, setId] = useState(null)
  const [db_turnos, setDb_Turnos] = useState([]);
  const [db_pacientes, setDB_Pacientes] = useState([]);
  const [db_medicos, setDB_Medicos] = useState([]);
  const [error, setError] = useState(null);
  //const [medicoElegido, setMedicoElegido] = useState(null);
  //const [hora, setHora] = useState(null);

  const [dniPaciente, setDniPaciente] = useState("");
  const [fecha, setFecha] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:3002/turnos/")
      .then((res) => {
        setDb_Turnos(res.data);
      })
      .catch((err) => {
        setError(err);
      });

    axios
      .get("http://localhost:3002/medicos/")
      .then((res) => {
        setDB_Medicos(res.data);
      })
      .catch((err) => {
        setError(err);
      });

    axios
      .get("http://localhost:3002/pacientes/")
      .then((res) => {
        setDB_Pacientes(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  
    function nomMedico(dniMed){
      const medEncontrado = db_medicos.find(n => n.dni == dniMed) ? db_medicos.find(n => n.dni == dniMed).nombre : 0
      //console.log(medEncontrado)
      return medEncontrado;  
  }

  function apeMedico(dniMed){
      //console.log(dniMed)
      const medEncontrado = db_medicos.find(n => n.dni == dniMed) ? db_medicos.find(n => n.dni == dniMed).apellido : 0
      //console.log(medEncontrado)
      return medEncontrado;  
  }

  function espMedico(dniMed){
      const medEncontrado = db_medicos.find(n => n.dni == dniMed) ? db_medicos.find(n => n.dni == dniMed).especialidad : 0
      //console.log(medEncontrado)
      return medEncontrado;  
  }

  function NomPac(dniPac){
      //console.log(dniMed)
      const pacEncontrado = db_pacientes.find(n => n.dni == dniPac) ? db_pacientes.find(n => n.dni == dniPac).nombre : 0
      //console.log(medEncontrado)
      return pacEncontrado;  
  }

  function ApePac(dniPac){
      //console.log(dniMed)
      const pacEncontrado = db_pacientes.find(n => n.dni == dniPac) ? db_pacientes.find(n => n.dni == dniPac).apellido : 0
      //console.log(medEncontrado)
      return pacEncontrado;  
  }




function buscarTurnos(){

  if (fecha == "" && dniPaciente == "") {
    alert("ERROR")
  }else if (fecha == "") {
      axios.get("http://localhost:3002/turnos?dniPac=" + dniPaciente)
      .then((res) => {
        setDb_Turnos(res.data);
        //console.log(dniPaciente)
      }).catch((err) => {setError(err)});
  }else {
    axios.get("http://localhost:3002/turnos?fecha=" + fecha)
      .then((res) => {
        setDb_Turnos(res.data);
        
      }).catch((err) => {setError(err)});
  }
}

function borrarTurno(idTurno){
  axios.delete(`http://localhost:3002/turnos/${idTurno}`).then(()=>{
          
  }).catch((err) => {setError(err)})

  axios.get('http://localhost:3002/turnos/').then((res)=>{
      setDb_Turnos(res.data)

  }).catch((err) => {setError(err)})
}  

function actualizarPagina() {
  window.location.reload()
}

  const setDatos = (valor) => {
    let {id, fecha, hora, dniPac, medicoElegido} = valor
    localStorage.setItem("id", id)
    localStorage.setItem("fecha", fecha)
    localStorage.setItem("hora", hora)
    localStorage.setItem("dniPac", dniPac)
    localStorage.setItem("dniMed", medicoElegido)
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
      <CssTextField
        id="outlined-basic"
        label="DNI del paciente"
        variant="outlined"
        type="text"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setDniPaciente(e.target.value)}
      />
      <h>          </h>
      <CssTextField
        id="outlined-basic"
        label="Fecha de turno"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setFecha(e.target.value)}
      />
      <Button className="boton" variant="outlined" onClick={buscarTurnos} startIcon={<SearchRoundedIcon />}></Button>
      <Button className="boton" id="btnBuscar" onClick={() => actualizarPagina()} variant="outlined" startIcon={<RefreshRoundedIcon />}></Button>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Hora</TableCell>
              <TableCell align="center">Especialidad</TableCell>
              <TableCell align="center">Médico</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {db_turnos.map((valor) => (
              <StyledTableRow>
                <StyledTableCell align="center">{valor.id}</StyledTableCell>
                <StyledTableCell align="center">
                  {NomPac(valor.dniPac)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ApePac(valor.dniPac)}
                </StyledTableCell>
                <StyledTableCell align="center">{valor.fecha}</StyledTableCell>
                <StyledTableCell align="center">{valor.hora}</StyledTableCell>
                <StyledTableCell align="center">
                  {espMedico( valor.medicoElegido)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {apeMedico(valor.medicoElegido)},{" "}
                  {nomMedico(valor.medicoElegido)}
                </StyledTableCell>
                <TableCell align="center">
                  
                  <Link to="/editarturno">
                    <Button
                      variant="outlined"
                      className="boton"
                      onClick={() => setDatos(valor) }
                      startIcon={<EditRoundedIcon />}
                    />
                  </Link>

                  <Button
                    variant="outlined"
                    className="boton"
                    onClick={() => {borrarTurno(valor.id)}}
                    startIcon={<DeleteRoundedIcon />}
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/><br/>
      </Box>
      </ThemeProvider>
    </>
  );
};

export default Grilla;
