import React from 'react'

const FormularioMedicos = () => {
  return (
    <>
    <label>DNI</label>
    <input type="number"></input>

    <label>Nombre</label>
    <input type="text"></input>
    <label>Apellido</label>
    <input type="text"></input>
    <label>Fecha Nacimiento</label>
    <input type="date"></input>

    <label>Telefono</label>
    <input type="tel"></input>
    <label>Direccion</label>
    <input type="text"></input>
    
    <label>Genero</label>
    <select name="genero" id="genero">
        <option value="seleccionar" selected disabled>Seleccionar</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
    </select>


    <label>N° Matricula</label>
    <input type="number"></input>

    <label>Especialidad</label>
    <select name="especial" id="especial">
        <option value="seleccionar" selected disabled>Seleccionar</option>
        <option value="clinico">Clinico</option>
        <option value="pediatra">Pediatra</option>
        <option value="gastroenterologo">Gastroenterologo</option>
        <option value="traumatologo">Traumatologo</option>
        <option value="dermatologo">Dermatologo</option>
    </select>

    </>
  )
}

export default FormularioMedicos