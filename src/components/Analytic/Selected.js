import IconArrowDown from "@/src/Icons/IconArrowDown";
import React, { useRef, useMemo } from "react";

const CustomSelect = ({ defaultValue, label, onChange }) => {

  const options = [
    { value: "CO", label: "CO", selected: true },
    { value: "O2", label: "O2" },
    { value: "NO2", label: "NO2" },
    { value: "CO2", label: "CO2" },
  ];

  const selectRef = useRef(null);

  const handleDivClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
    }
  };

  const memoizedOptions = useMemo(
    () =>
      options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      )),
    [options]
  );

  return (
    <div className="select" onClick={handleDivClick}>
      <select
        name="tipo"
        id="select-i"
        defaultValue={defaultValue}
        ref={selectRef}
        required
        onChange={onChange} // Asegúrate de pasar el onChange handler aquí
      >
        <option value="" disabled hidden>
          Seleccione
        </option>
        {memoizedOptions}
      </select>
      <label className="label-select">{label}</label>
      <IconArrowDown className="icon-select" />
    </div>
  );
};

export default CustomSelect;
