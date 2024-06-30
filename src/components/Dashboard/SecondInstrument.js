import IconBatery from "../../Icons/IconBatery";
import IconCircle from "../../Icons/IconCircle";
import IconConnect from "../../Icons/IconConnect";
import IconEnergy from "../../Icons/IconEnergy";
import IconHumidity from "../../Icons/IconHumidity";
import IconTemperature from "../../Icons/IconTemperature";
import { renderNameWithSubscript, separarNumero } from "../../libs/utils";

const SecondInstrument = ({ status, name, value, und }) => {
  let IconComponent;

  // Si no es "desact", determinar qué componente de icono usar según iconName
  switch (name) {
    case "HUM":
      IconComponent = IconHumidity;
      break;
    case "VOLT":
      IconComponent = IconEnergy;
      break;
    case "BATT":
      IconComponent = IconBatery;
      break;
    case "TEMP":
      IconComponent = IconTemperature;
      break;
    case "CORR":
      IconComponent = IconConnect;
      break;
    default:
      IconComponent = IconCircle; // Icono por defecto
      break;
  }

  // Determinar la clase para el estado del círculo
  const circleClass = status;

  const formattedValue = parseFloat(value).toFixed(2);

  const { parteEntera, parteDecimal } = separarNumero(formattedValue);

  return (
    <div className="Sensor-circle">
      {/* <div className="circle-title">
        <span>{title}</span>
      </div> */}
      <div className={`circle-item-second ${circleClass}`}>
        <div>
          <p>{renderNameWithSubscript(name)}</p>
          <h2>{parteEntera}.</h2>
          <div className="circle-number">
            <small>{parteDecimal}</small>
            <span>{und.toUpperCase()}</span>
          </div>
        </div>
        <IconComponent />
      </div>
    </div>
  );
};

export default SecondInstrument;

// // Determinar qué componente de icono usar
// if (status === "desact") {
//   IconComponent = IconDesconect; // Usar IconDesconect si el status es "desact"
// } else {
//   // Si no es "desact", determinar qué componente de icono usar según iconName
//   switch (iconName) {
//     case "IconVentilator":
//       IconComponent = IconVentilator;
//       break;
//     case "IconCircle":
//       IconComponent = IconCircle;
//       break;
//     default:
//       IconComponent = IconCircle; // Icono por defecto
//       break;
//   }
// }
