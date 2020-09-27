import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';






const Formulario = ({crearCita}) => {

  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })

  const [error, actualizarError] = useState(false);

  // Función que se ejecuta cada que el usuario escribe en un input
  const actualizarState = (e) => {
      actualizarCita({
        ...cita,
        [e.target.name]:e.target.value
      })
  }


  // Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas} = cita;

  // Cuando el usuario presiona agregar cita
  const submitCita = (e) => {
    e.preventDefault();

    // Validar los campos vacios
    if(mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === ''||
      sintomas.trim() === ''){
      actualizarError(true)
      return;
    }

    // Eliminamos el error
    actualizarError(false)
    // Asignamos una ID a la cita
    cita.id = uuidv4();
    console.log(cita)

    // Crear la cita
    crearCita(cita);

    // Reiniciar el form
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  }



  return (
    <div className="card">
      <h2>Crear Cita</h2>
      { error ? <p className="alert">Todos los campos son obligatorios!</p>  : null}


      <form
          onSubmit={submitCita}
      >
          <label>Nombre Mascota</label>
          <input
            className="u-full-width"
            name="mascota"
            value={mascota}
            type='text'
            onChange={actualizarState}
          />
          <label>Nombre Dueño</label>
          <input
            className="u-full-width"
            name="propietario"
            type='text'
            value={propietario}
            onChange={actualizarState}
          />
          <label>Fecha</label>
          <input
            className="u-full-width"
            name="fecha"
            type='date'
            value={fecha}
            onChange={actualizarState}
          />
          <label>Hora</label>
          <input
            className="u-full-width"
            name='hora'
            type='time'
            onChange={actualizarState}
            value={hora}
          />
          <label>Síntomas</label>
          <textarea
            className="u-full-width"
            name="sintomas"
            onChange={actualizarState}
            value={sintomas}
          >
          </textarea>

          <button
            className=" u-full-width"
            type='submit'

          >
            Agregar Cita
          </button>
      </form>
    </div>
  )
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}



export default Formulario
