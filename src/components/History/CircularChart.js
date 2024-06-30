import React from 'react';
import PropTypes from 'prop-types';

const CircularChart = ({
  percentage,
  strokeColor = 'orange',
  label = 'Label',
  subLabel = 'SubLabel',
}) => {

  return (
    <div className="item-percentage">
      <div className="single-chart">
        <svg viewBox="0 0 38 38" className="circular-chart">
          <path
            className="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={`${percentage}, 100`}
            stroke={strokeColor}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="percentage">
          {percentage}%
        </span>
      </div>
      <span className="name-p">{label}</span>
      {/* <p>{subLabel}</p> */}
    </div>
  );
};

CircularChart.propTypes = {
  percentage: PropTypes.number.isRequired,
  strokeColor: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string,
};

export default CircularChart;
