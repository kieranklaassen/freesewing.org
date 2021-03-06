import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import { measurements } from '@freesewing/pattern-info'

const PatternMeasurements = props => {
  const sortMeasurements = measurements => {
    if (typeof measurements === 'undefined') return []
    let sorted = []
    let translated = {}
    for (let m of measurements) {
      let translation = props.app.frontend.intl.messages['measurements' + m] || m
      translated[translation] = m
    }
    let order = Object.keys(translated)
    order.sort()
    for (let m of order) sorted.push(translated[m])

    return Object.values(sorted)
  }

  return (
    <ul className="links">
      {sortMeasurements(measurements[props.pattern]).map(m => (
        <li key={m}>
          <Link to={'/docs/measurements/' + m.toLowerCase()}>
            <FormattedMessage id={'measurements.' + m} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PatternMeasurements
