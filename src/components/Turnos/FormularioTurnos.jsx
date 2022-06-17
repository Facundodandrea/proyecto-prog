import React from 'react'

export const FormularioTurnos = () => {
  return (
    <>
    <label>DNI</label>
    <input type="number"></input>

    <label>Nombre:</label>
    <p id='nombre'></p>
    <label>Apellido:</label>
    <p id='apellido'></p>

    <label>Especialidad</label>
    <select name="especial" id="especial">
        <option value="seleccionar" selected disabled>Seleccionar</option>
        <option value="clinico">Clinico</option>
        <option value="pediatra">Pediatra</option>
        <option value="gastroenterologo">Gastroenterologo</option>
        <option value="traumatologo">Traumatologo</option>
        <option value="dermatologo">Dermatologo</option>
    </select>
    
    <label>Medico</label>
    <select name="genero" id="genero">
        <option value="seleccionar" selected disabled>Seleccionar</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
    </select>

    <label>Fecha</label>
    <input type="datetime-local"></input>

    </>
  )
}
