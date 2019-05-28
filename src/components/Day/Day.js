import React from 'react';
import PropTypes from 'prop-types';
import './Day.scss';
import './../../weather-icons/css/weather-icons.css';

function Day(props) {
  const { dayOfWeek, high, icon, low } = props.day;
  return (
    <div className="day" data-test="dayComponent">
      <p data-test="dayOfWeek">{dayOfWeek}</p>
      {props.today ? (
        <i>TODAY</i>
      ) : (
        <i className={'wi wi-forecast-io-' + icon} />
      )}
      <div className="high-low">
        <p className="high">{high}</p>
        <p className="low">{low}</p>
      </div>
    </div>
  );
}

Day.propTypes = {
  day: PropTypes.shape({
    dayOfWeek: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    low: PropTypes.string.isRequired
  }),
  today: PropTypes.bool
};

export default Day;
