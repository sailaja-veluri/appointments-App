// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentsDetails, toggleStar} = props
  const {id, inputTitle, inputDate, isStared} = appointmentsDetails
  const dateFormate = format(new Date(`${inputDate}`), 'dd MMMM yyyy, EEEE')
  const image = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onApplyStared = () => {
    toggleStar(id)
  }

  return (
    <li className="list-container">
      <div className="title-stared-container">
        <p className="title">{inputTitle}</p>
        <button
          className="star-button"
          data-testid="star"
          onClick={onApplyStared}
        >
          <img src={image} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date-details">Date: {dateFormate}</p>
    </li>
  )
}

export default AppointmentItem
