import IconReload from "@/src/Icons/IconReload";
import { formatHour } from "@/src/libs/utils";
import { useGlobalStore } from "@/src/store/useGlobalStore";

export default function MeanHistory() {
  const { dataMeanHistory, fetchGraphicHistory } = useGlobalStore();
  return (
    <>
      <div className="g-h-prom">
        <span>
           {dataMeanHistory ? formatHour(dataMeanHistory) : "0h 0min"} 
        </span>
        {/* <small>* 5.11%</small>  */}
        <button className="btn-reload" onClick={() => fetchGraphicHistory()}>
          <IconReload />
        </button>
      </div>
      <p>
        <strong>Tiempo promedio </strong> de esta <strong>semana</strong>
      </p>
      {/* <div className="cont-reload">
        <span>
          <strong>Hace 5 seg</strong>
        </span>
       
      </div> */}
    </>
  );
}
