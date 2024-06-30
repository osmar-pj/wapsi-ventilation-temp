import React from 'react';
import IconVentilator from "../../Icons/IconVentilator";

const TercearyInstrument = ({ status }) => {
  let circleColor = '';
  let circleText = '';

  // Determinar el color y el texto del círculo según el estado
  switch (status) {
    case 'unconfirmed':
      circleColor = '#3f3f45';
      circleText = 'Apagado';
      break;
    case 'on':
      circleColor = '#0bb97d';
      circleText = 'Confirmado';
      break;
    case 'of':
      circleColor = '#ff1437';
      circleText = 'Sin confirmar';
      break;
    default:
      circleColor = '#3f3f45';
      circleText = 'Apagado';
  }

  return (
    <div className="Sensor-circle">
      <div className={`circle-item ${status}`}>
        <IconVentilator />
        <div className="circle-number"></div>
      </div>
      <div>
        <div className="leyend-circle">
          <div className="i-circle" style={{ backgroundColor: circleColor }}></div>
          <span>{circleText}</span>
        </div>
      </div>
    </div>
  );
};

export default TercearyInstrument;
