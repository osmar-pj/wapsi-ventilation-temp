import React, { useState, useMemo, useCallback } from "react";
import {  useSocketStore } from "../../store/useGlobalStore";
import CardInstrument from "./CardInstrument";
import SecondInstrument from "./SecondInstrument";
import TercearyInstrument from "./TercearyInstrument";

const CardInstrumentMemo = React.memo(CardInstrument);
const SecondInstrumentMemo = React.memo(SecondInstrument);
const TercearyInstrumentMemo = React.memo(TercearyInstrument);

export default function Instruments() {
  const { devices, dataventilators, isLoading } = useSocketStore();

  const [selectedTab, setSelectedTab] = useState("principal");

  const handleTabClick = useCallback((tab) => {
    setSelectedTab(tab);
  }, []);

  // Utilizamos useMemo para filtrar los dispositivos solo cuando cambia la lista de dispositivos
  const saDevices = useMemo(
    () => devices.filter((device) => device.type === "sa"),
    [devices]
  );
  const sdDevices = useMemo(
    () => devices.filter((device) => device.type === "sd"),
    [devices]
  );

  return (
    <>
      <div className="tab-container">
        <input
          type="radio"
          name="tab"
          id="tab1"
          className="tab tab--1"
          onChange={() => handleTabClick("principal")}
          checked={selectedTab === "principal"}
        />
        <label className="tab_label" htmlFor="tab1">
          Principal
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
          Secundarios
        </label>

        <div className="indicator"></div>
      </div>

      <div className="Page-body">
        {isLoading ? (
          <>
            <div className=" skeleton-circle animate-pulse"></div>
            <div className=" skeleton-circle animate-pulse"></div>
            <div className=" skeleton-circle animate-pulse"></div>
            <div className=" skeleton-circle animate-pulse"></div>
          </>
        ) : selectedTab === "principal" ? (
          <>
            {dataventilators?.devices?.map((i, index) => (
              <TercearyInstrumentMemo key={index} status={i.status} />
            ))}
            {saDevices.map((i, index) => (
              <CardInstrumentMemo
                key={index}
                status={i.status}
                parameter={i.name}
                value={i.value}
                und={i.und}
              />
            ))}
          </>
        ) : (
          <>
            {sdDevices.map((i, index) => (
              <SecondInstrumentMemo
                key={index}
                status={i.status}
                name={i.name}
                value={i.value}
                und={i.und}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
