// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    inputTitle: '',
    inputDate: '',
    appointmentsList: [],
    statusOfStared: false,
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const newAppointment = {
      id: uuidv4(),
      inputTitle,
      inputDate,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  staredAppointments = id => {
    const {statusOfStared} = this.state
    this.setState(prevState => ({
      statusOfStared: !prevState.statusOfStared,
    }))
  }

  render() {
    const {inputTitle, inputDate, statusOfStared} = this.state
    const staredButtonColor = statusOfStared
      ? 'transparent-button'
      : 'normal-button'
    let {appointmentsList} = this.state
    if (statusOfStared) {
      appointmentsList = appointmentsList.filter(each => each.isStared === true)
    }

    return (
      <>
        <div className="bg-container">
          <div className="appointment-container">
            <h1 className="header">Add Appointment</h1>
            <div className="form-img-container">
              <div className="form-container">
                <form className="form" onSubmit={this.onAddAppointment}>
                  <label htmlFor="titleInput" className="label-details">
                    TITLE
                  </label>
                  <input
                    id="titleInput"
                    value={inputTitle}
                    onChange={this.onChangeTitle}
                    className="input-title"
                    placeholder="Title"
                  />
                  <label htmlFor="dateInput" className="label-details">
                    DATE
                  </label>
                  <input
                    type="date"
                    id="dateInput"
                    value={inputDate}
                    onChange={this.onChangeDate}
                    className="input-date"
                  />
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>

            <div className="appointments-stared-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`starred-button ${staredButtonColor}`}
                onClick={this.staredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="unOrder-appointments-list">
              {appointmentsList.map(eachOne => (
                <AppointmentItem
                  key={eachOne.id}
                  appointmentsDetails={eachOne}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Appointments
