import { useSocketStore } from "../store/useGlobalStore";

const PageTitle = () => {
  const { dataInstruments, datahorometer,isLoading } = useSocketStore();

  return (
    <>
      {isLoading ? (
        <div className=" Page-title animate-pulse">
         <span className="skeleton-span"> </span>
          <h1 className="skeleton-h1"> </h1>
          <h3 className="skeleton-h3"></h3>
        </div>
      ) : (
        <div className="Page-title">
          <span className="t-mining">{dataInstruments?.mining ?? "--"}</span>
          <h1>{dataInstruments?.level ?? "--"}</h1>
          <h3>{datahorometer?.horometer !== undefined ? datahorometer.horometer.toFixed(2) : "--"} horometro</h3>
        </div>
      )}
    </>
  );
};

export default PageTitle;
