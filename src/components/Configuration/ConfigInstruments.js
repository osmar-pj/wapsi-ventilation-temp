import { useEffect, useState } from "react";
import { useGlobalStore } from "../../store/useGlobalStore";
import CreateInstrument from "./CreateInstrument";
import DeleteInstrument from "./DeleteInstrument";

export default function ConfigInstruments() {
  const {configInstruments } = useGlobalStore();

  const [isOpen, setIsOpen] = useState(false);
  const [currentInstrument, setCurrentInstrument] = useState(null);
  const [mode, setMode] = useState("create");
  const [delet, setDelet] = useState(false);

  const handleCreate = () => {
    setCurrentInstrument(null); // Clear previous data
    setMode("create");
    setIsOpen(true);
  };

  const handleEdit = (instrument) => {
    setCurrentInstrument(instrument); // Load instrument data for editing
    setMode("edit");
    setIsOpen(true);
  };
  const handleDelete = (instrument) => {
    setCurrentInstrument(instrument); // Load instrument data for editing
  
    setDelet(true);
  };

  return (
    <div className="item-config">
      <span className="subTitle">Lista de Instrumentos</span>
      <div className="mC-b-Cards">
        <div className="item-card">
          <button onClick={handleCreate}>Añadir nuevo</button>
        </div>
        {configInstruments.map((i, index) => (
          <div className="item-card" key={index}>
            <div className="c-value">
              <span>Serie</span> <small>{i.serie}</small>
            </div>
            <div className="c-value">
              <span>Nombre</span> <small>{i.name}</small>
            </div>
            <div className="c-value">
              <span>Descripción</span> <small>{i.description}</small>
            </div>
            <div className="c-value">
              <span>Unidad</span> <small>{i.unit}</small>
            </div>
            <div className="c-value">
              <span>Tipo</span> <small>{i.type}</small>
            </div>
            <div className="c-value">
              <span>Factor</span> <small>{i.factor}</small>
            </div>
            <div className="c-value">
              <span>Mínimo 1</span> <small>{i.min1}</small>
            </div>
            <div className="c-value">
              <span>Mínimo 2</span> <small>{i.min2}</small>
            </div>
            <div className="c-value">
              <span>Máximo 1</span> <small>{i.max1}</small>
            </div>
            <div className="c-value">
              <span>Mínimo 2</span> <small>{i.max2}</small>
            </div>
            <div className="c-value">
              <span>Estado </span>
              <small> {i.status}</small>
            </div>
            <button onClick={() => handleEdit(i)} className="btn-edit">
              Editar
            </button>
            <button onClick={() => handleDelete(i)} className="btn-delete">Eliminar</button>
          </div>
        ))}

        {isOpen && (
          <CreateInstrument
            mode={mode}
            instrument={currentInstrument}
            onClose={() => setIsOpen(false)}
          />
        )}

        {delet && (
          <DeleteInstrument
            instrument={currentInstrument}
            onClose={() => setDelet(false)}
          />
        )}
      </div>
    </div>
  );
}
