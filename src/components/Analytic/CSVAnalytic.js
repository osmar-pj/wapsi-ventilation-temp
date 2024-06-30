import { CSVLink } from "react-csv";
import Loader from "../Loader";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import IconDownload from "@/src/Icons/IconDownload";
import { getDate } from "@/src/libs/utils";

export default function CSVAnalytic() {
  const { dataGraphicAnalytic } = useGlobalStore();
  return (
    <>
      <Loader />
      <CSVLink
        className="btn-report"
        data={dataGraphicAnalytic}
        filename={`Analytic-${getDate()}.csv`}
        href="#"
      >
        <IconDownload /> Generar reporte
      </CSVLink>
    </>
  );
}
