import React from "react";
import { AppBar, Toolbar, CssBaseline, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './navbar.css';

function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <AppBar position="static" style={{ background: '#05a1a7', }}>
      <CssBaseline />
      <Toolbar>

        <Button color="inherit" component={Link} to="/">Home</Button>

        <Button color="inherit" component={Link} to="/pacientes">Pacientes</Button>

        <Button color="inherit" component={Link} to="/medicos">Medicos</Button>

        <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Turnos</Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} color="inherit" component={Link} to="/turnos">Nuevo Turno</MenuItem>
          <MenuItem onClick={handleClose} color="inherit" component={Link} to="/busquedaturno">Buscar Turno</MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
}
export default Navbar;