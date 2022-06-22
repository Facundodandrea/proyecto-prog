import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const useStyles = makeStyles({
  table: {
    minWidth: 1200,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Grilla = () => {
  const classes = useStyles();

  const [id, setId] = useState(null)
  const [db_turnos, setDb_Turnos] = useState([]);
  const [db_pacientes, setDB_Pacientes] = useState([]);
  const [db_medicos, setDB_Medicos] = useState([]);
  const [error, setError] = useState(null);
  const [medicoElegido, setMedicoElegido] = useState(null);
  const [hora, setHora] = useState(null);

  const [dniPaciente, setDniPaciente] = useState("");
  const [fecha, setFecha] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:3002/turnos/")
      .then((res) => {
        setDb_Turnos(res.data);
        setId(res.data.id);
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
      //console.log(dniMed)
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
      //console.log(dniMed)
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

function buscarTurnosDNI(){

  axios.get("http://localhost:3002/turnos?dniPac=" + dniPaciente)
      .then((res) => {
        setDb_Turnos(res.data);
        console.log(dniPaciente)
      }).catch((err) => {setError(err)});
}

function buscarTurnosFecha(){

  axios.get("http://localhost:3002/turnos?fecha=" + fecha)
      .then((res) => {
        setDb_Turnos(res.data);
        console.log(dniPaciente)
      }).catch((err) => {setError(err)});
}
  
const putDatos = async () => { // modifica datos del paciente
  axios.put("http://localhost:3002/turnos?fecha=" + id)
      .then((res) => {
        console.log(dniPaciente)
      }).catch((err) => {setError(err)});
}

const deleteDatos = async () => { // elimina turno
  await axios.delete("http://localhost:3002/turnos/" + id,)
    .then((deleteDatos) => {
  alert("Borrado")
    }).catch((err) => { alert(err); });
}


  return (
    <>
      <label>Ingrese el nombre del paciente o una fecha</label>
      <TextField
        id="outlined-basic"
        label="DNI del paciente"
        variant="outlined"
        type="text"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setDniPaciente(e.target.value)}
      />
      <Button variant="contained" onClick={buscarTurnosDNI}>Buscar</Button>

      <TextField
        id="outlined-basic"
        label="Fecha de turno"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setFecha(e.target.value)}
      />
      <Button variant="contained" onClick={buscarTurnosFecha}>Buscar</Button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">Apellido</StyledTableCell>
              <StyledTableCell align="center">Fecha</StyledTableCell>
              <StyledTableCell align="center">Hora</StyledTableCell>
              <StyledTableCell align="center">Especialidad</StyledTableCell>
              <StyledTableCell align="center">Médico</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {db_turnos.map((valor) => (
              <TableRow>
                <TableCell align="center">{valor.id}</TableCell>
                <TableCell align="center">
                  {NomPac(valor.dniPac)}
                </TableCell>
                <TableCell align="center">
                  {ApePac(valor.dniPac)}
                </TableCell>
                <TableCell align="center">{valor.fecha}</TableCell>
                <TableCell align="center">{valor.hora}</TableCell>
                <TableCell align="center">
                  {espMedico( valor.medicoElegido)}
                </TableCell>
                <TableCell align="center">
                  {apeMedico(valor.medicoElegido)},{" "}
                  {nomMedico(valor.medicoElegido)}
                </TableCell>
                <TableCell align="center">
                  
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={putDatos}
                      startIcon={<EditRoundedIcon />}
                    />
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={deleteDatos}
                    startIcon={<DeleteRoundedIcon />}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Grilla;
