import IconLevel from "@/src/Icons/IconLevel";
import {
  formatHour,
  getDayOfMonthFromDate,
  getHourFromDate,
  getMonthNameFromDate,
} from "@/src/libs/utils";
import { useGlobalStore } from "@/src/store/useGlobalStore";

export default function HighLevelHistory() {
  const { dataCSVHistory } = useGlobalStore();

  return (
    <>
      {dataCSVHistory && dataCSVHistory.length > 0 ? (
        dataCSVHistory.map((i, index) => (
          <div className="item-level" key={index}>
            <div className="i-date">
              <span>{getDayOfMonthFromDate(i.start)}</span>
              <p>{getMonthNameFromDate(i.start)}</p>
            </div>
            <div className="i-body">
              <div className="i-b-item">
                <span>Tiempo ejecutado</span>
                <span>{formatHour(i.duration)}</span>
              </div>
              <div className="i-b-item">
                <span>Inicio </span>
                <span>{getHourFromDate(i.tstart)}</span>
              </div>
              <div className="i-b-item">
                <span>Fin </span>
                <span>{getHourFromDate(i.tend)}</span>
              </div>
            </div>
            <div className="i-icon">
              <IconLevel />
            </div>
          </div>
        ))
      ) : (
        <p>--</p>
      )}
    </>
  );
}
