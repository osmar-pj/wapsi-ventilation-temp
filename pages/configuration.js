import ConfigGeneral from "@/src/components/Configuration/ConfigGeneral";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { useEffect } from "react";

export default function Configuration() {
  const { fetchConfigGeneral } = useGlobalStore();

  useEffect(() => {
    fetchConfigGeneral();
  }, []);

  return (
    <section>
      <ConfigGeneral />
    </section>
  );
}

// const ConfigGeneralMemo = React.memo(ConfigGeneral);
// const ConfigInstrumentsMemo = React.memo(ConfigInstruments);

// const [selectedTab, setSelectedTab] = useState("principal");

//   const handleTabClick = useCallback((tab) => {
//     setSelectedTab(tab);
//   }, []);

{
  /* <div className="tab-container" >
        <input
          type="radio"
          name="tab"
          id="tab1"
          className="tab tab--1"
          onChange={() => handleTabClick("principal")}
          checked={selectedTab === "principal"}
        />
        <label className="tab_label" htmlFor="tab1">
          Datos Generales
        </label>

        <input
          type="radio"
          name="tab"
          id="tab2"
          className="tab tab--2"
          onChange={() => handleTabClick("secundary")}
          checked={selectedTab === "secundary"}
        />
        <label className="tab_label" htmlFor="tab2">
          Datos Instrumentos
        </label>

        <div className="indicator"></div>
      </div> */
}

{
  /* {selectedTab === "principal" ? (
          <ConfigGeneralMemo />
        ) : (
          <ConfigInstrumentsMemo />
        )} */
}
