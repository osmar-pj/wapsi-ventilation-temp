import IconCircle from "../../Icons/IconCircle";
import { renderNameWithSubscript, separarNumero } from "../../libs/utils";

const CardInstrument = ({ status,parameter, value, und }) => {
  // Determinar la clase para el estado del círculo
  const circleClass = status;

  const formattedValue = parseFloat(value).toFixed(2);

  const { parteEntera, parteDecimal } = separarNumero(formattedValue);

  return (
    <div className="Sensor-circle">
      {/* <div className="circle-title">
        <span>{title}</span>
      </div> */}
      <div className={`circle-item ${circleClass}`}>
        <IconCircle />
        <p>{renderNameWithSubscript(parameter)}</p>
        <h2>{parteEntera}.</h2>
        <div className="circle-number">
          <small>{parteDecimal}</small>
          <span>{und.toUpperCase()}</span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CardInstrument;

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
