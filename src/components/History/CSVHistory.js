import { CSVLink } from "react-csv";
import Loader from "../Loader";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import IconDownload from "@/src/Icons/IconDownload";
import { getDate } from "@/src/libs/utils";

export default function CSVHistory() {
  const { dataCSVHistory } = useGlobalStore();

  if (!dataCSVHistory || dataCSVHistory.length === 0) {
    return (
      <>
        <Loader />
        <div className="btn-report"></div>
      </>
    );
  }
  return (
    <>
      <CSVLink
        className="btn-report"
        data={dataCSVHistory}
        filename={`History-${getDate()}.csv`}
        href="#"
      >
        <IconDownload /> Generar reporte
      </CSVLink>
    </>
  );
}
