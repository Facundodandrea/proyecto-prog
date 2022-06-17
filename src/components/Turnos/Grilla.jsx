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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id_turno, nombre, apellido, fecha, hora, especialidad) {
  return { id_turno, nombre, apellido, fecha, hora, especialidad };
}

const rows = [
  createData(1, "Luis", "Hero", "25/06/2022", "14:00", "Traumatologo"),
  createData(2, "Facundo", "D´Andrea", "25/06/2022", "14:15", "Clinico"),
  createData(3, "Gerardo", "Jatip", "25/06/2022", "14:15", "Traumatologo"),
  createData(4, "Pienrina", "Guisiano", "25/06/2022", "14:30", "Clinico"),
  createData(5, "Juan", "Perez", "25/06/2022", "14:30", "Traumatologo"),
];

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

  return (
    <>
      <label>Ingerse el nombre del paciente o una fecha</label>
      <TextField
        id="outlined-basic"
        label="Nombre del paciente"
        variant="outlined"
        type="text"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        id="outlined-basic"
        label="Fecha de nacimiento"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained">Buscar</Button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID Turno</StyledTableCell>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">Apellido</StyledTableCell>
              <StyledTableCell align="center">Fecha</StyledTableCell>
              <StyledTableCell align="center">Hora</StyledTableCell>
              <StyledTableCell align="center">Especialidad</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id_turno}>
                <TableCell align="center">{row.id_turno}</TableCell>
                <TableCell align="center">{row.nombre}</TableCell>
                <TableCell align="center">{row.apellido}</TableCell>
                <TableCell align="center">{row.fecha}</TableCell>
                <TableCell align="center">{row.hora}</TableCell>
                <TableCell align="center">{row.especialidad}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="primary">
                      Ver
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Editar
                  </Button>
                  <Button variant="outlined" color="primary">
                    Eliminar
                  </Button>
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
