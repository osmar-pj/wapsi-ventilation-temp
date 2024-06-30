import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { formatDate, formatFecha, formatNameDay } from "@/src/libs/utils";
import Selected from "@/src/components/Analytic/Selected";

export default function DatesAnalytic() {
  const { fetchGraphicDates, fetchGraphicAnalytic, dataGraphicDates } =
    useGlobalStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("CO");

  useEffect(() => {
    const fetchDates = async () => {
      try {
        fetchGraphicDates();
        if (dataGraphicDates.length > 0) {
          setSelectedDate(dataGraphicDates[dataGraphicDates.length - 1]);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchDates();
  }, []);

  useEffect(() => {
    // Verificar si no hay una fecha seleccionada y hay datos disponibles
    if (!selectedDate && dataGraphicDates.length > 0) {
      setSelectedDate(dataGraphicDates[dataGraphicDates.length - 1]);
    }
  }, [dataGraphicDates, selectedDate]);

  const fetchGrafBasic = async (date, option) => {
    fetchGraphicAnalytic(dayjs(date).unix(), option);
  };

  useEffect(() => {
    if (selectedDate && selectedOption) {
      fetchGrafBasic(selectedDate, selectedOption);
    }
  }, [selectedDate, selectedOption]);

  const handleButtonClick = (date) => {
    setSelectedDate(date);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className="b-g-select">
        <h3>{selectedDate ? formatFecha(selectedDate) : "--"}</h3>
        <span>{selectedDate ? formatNameDay(selectedDate) : "--"}</span>
      </div>
      <div className="b-g-time">
        {dataGraphicDates.length > 0 ? (
          dataGraphicDates.map((date, index) => {
            const { day, month } = formatDate(date);
            return (
              <button
                className={`time-button ${
                  selectedDate === date ? "selected" : ""
                }`}
                key={index}
                onClick={() => handleButtonClick(date)}
              >
                <span>{day}</span>
                <p>{month}</p>
              </button>
            );
          })
        ) : (
          <button className="time-button">
            <span>--</span>
            <p>--</p>
          </button>
        )}
      </div>
      <div className="b-g-body" style={{ margin: "0 0 .5rem 0" }}>
        <Selected
          onChange={handleSelectChange}
          defaultValue="CO"
          label="Gas:"
        />
      </div>
    </>
  );
}
