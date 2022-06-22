import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import { Button, TextField } from "@material-ui/core";
import Box from "@mui/material/Box";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const CssTextField = styled(TextField)({
  "& label": {
    color: "#05a1a7",
  },
  "& label.Mui-focused": {
    color: "#00C4CC",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#00C4CC",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#05a1a7",
    },
    "&:hover fieldset": {
      borderColor: "#05a1a7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00C4CC",
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#00C4CC",
      contrastText: "#05a1a7",
    },
    secondary: {
      main: "#05a1a7",
      contrastText: "#05a1a7",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Poppins",
      color: "#05a1a7",
    },
  },
});

const EditarTurno = () => {
  const URLTurno = "http://localhost:3002/turnos/";

  const [idTurno, setIdTurno] = useState(null);
  const [fecha1, setFecha] = useState("");
  const [hora1, setHora] = useState("");
  const [medico, setMedico] = useState([]);
  const [paciente, setPaciente] = useState([]);

  const [nombrePac, setNombrePac] = useState("");
  const [apellidoPac, setApellidoPac] = useState("");
  const [nombreMed, setNombreMed] = useState("");
  const [apellidoMed, setApellidoMed] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  let dniPac = localStorage.getItem("dniPac");
  let dniMed = localStorage.getItem("dniMed");

  useEffect(() => {
    setIdTurno(localStorage.getItem("id"));
    setFecha(localStorage.getItem("fecha"));
    setHora(localStorage.getItem("hora"));

    axios
      .get(`http://localhost:3002/medicos?dni=${dniMed}`)
      .then((res) => {
        setMedico(res.data);
        setNombreMed(res.data[0].nombre);
        setApellidoMed(res.data[0].apellido);
        setEspecialidad(res.data[0].especialidad);
      })
      .catch((err) => {
        alert("paciente no encontrado");
      });

    axios
      .get(`http://localhost:3002/pacientes?dni=${dniPac}`)
      .then((res) => {
        setPaciente(res.data);
        setNombrePac(res.data[0].nombre);
        setApellidoPac(res.data[0].apellido);
      })
      .catch((err) => {
        alert("medico no encontrado");
      });
  }, []);

  async function actualizarTurno() {
    console.log(idTurno);
    await axios
      .patch(URLTurno + idTurno, {
        fecha: fecha1,
        hora: hora1,
      })
      .then(() => {
        alert("cambio realizado");
      })
      .catch((err) => {
        alert("error al actualizar");
      });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          className="formulario-pacientes"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
        >
          <CssTextField
            variant="outlined"
            disabled
            label={idTurno}
          ></CssTextField>
          <CssTextField
            variant="outlined"
            disabled
            value={nombrePac}
          ></CssTextField>
          <CssTextField
            variant="outlined"
            disabled
            value={apellidoPac}
          ></CssTextField>
          <TextField
            label="Fecha"
            value={fecha1}
            type="date"
            onChange={(e) => setFecha(e.target.value)}
          ></TextField>
          <TextField
            label="Hora"
            value={hora1}
            type="time"
            onChange={(e) => setHora(e.target.value)}
          ></TextField>
          <CssTextField
            variant="outlined"
            disabled
            label={nombreMed}
          ></CssTextField>
          <CssTextField
            variant="outlined"
            disabled
            value={apellidoMed}
          ></CssTextField>
          <CssTextField
            variant="outlined"
            disabled
            value={especialidad}
          ></CssTextField>
          <Link to="/busquedaturno">
            <Button
              className="boton"
              onClick={() => actualizarTurno()}
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
            >
              Actualizar
            </Button>
          </Link>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default EditarTurno;
