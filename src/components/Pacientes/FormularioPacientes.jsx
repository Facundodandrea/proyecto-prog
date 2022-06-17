import React from 'react'

const FormularioPacientes = () => {
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

    <label>Obra Social</label>
    <select name="obrasocial" id="obra-social">
        <option value="seleccionar" selected disabled>Seleccionar</option>
        <option value="osde">OSDE</option>
        <option value="subsidio">Subsidio de Salud</option>
        <option value="galeno">Galeno</option>
        <option value="prensa">Prensa</option>
        <option value="particular">Particular</option>
    </select>

    <label>N° Afiliado</label>
    <input type="number"></input>

    </>
  )
}

export default FormularioPacientes