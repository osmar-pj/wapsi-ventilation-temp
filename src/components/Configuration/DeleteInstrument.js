import { useGlobalStore } from "@/src/store/useGlobalStore";
import { useState } from "react";

export default function DeleteInstrument({ instrument, onClose }) {
  const { deleteInstrument, fetchConfigInstruments } = useGlobalStore(); // Añadido fetchConfigInstruments
  const [buttonClicked, setButtonClicked] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    try {
      setButtonClicked(true);
      const dataResponse = await deleteInstrument(instrument.id);
      console.log(dataResponse);
      if (dataResponse.status === true) {
        setSuccess(true);

        setTimeout(() => {
          setButtonClicked(false);
          setSuccess(false);
        }, 1500);
        setTimeout(() => {
          fetchConfigInstruments();
          onClose();
        }, 1500);
        console.log("Configuración actualizada");
      } else {
        console.log("error");
        setButtonClicked(false);
      }
    } catch (error) {
      console.error("Error al actualizar la configuración:", error);
      setButtonClicked(false);
    }
  };

  return (
    <div className="modalCreate-backg">
      <form
        className="mCreate-content"
        style={{
          userSelect: buttonClicked ? "none" : "auto",
          pointerEvents: buttonClicked ? "none" : "auto",
        }}
      >
        <div className="mC-c-header">
          <div className="mC-h-title">
            <h3>Eliminar dato</h3>
            <h4>Eliminar información existente</h4>
          </div>
          <span onClick={onClose} className="mC-h-close" type="button">
            x
          </span>
        </div>

        <div className="mC-b-imputs-Crud">
          <div className="mC-imputs-item">
            <label htmlFor="min1">Ingrese mínimo 1 </label>
            <div className="imputs-i-input"></div>
          </div>
        </div>
        <div className="mC-c-footer">
          <button className="btn-cancel" type="button" onClick={onClose}>
            Cancelar
          </button>

          <button
            className={`btn-success${
              buttonClicked && !success ? " sending" : ""
            }${success ? " success" : ""}`}
            type="submit"
            disabled={buttonClicked}
            onClick={onSubmit} // Aquí llamamos a onSubmit sin parámetros
          >
            {buttonClicked && !success ? (
              <>
                <span className="loader"></span>Envi...
              </>
            ) : success ? (
              <>
                <div className="checkbox-wrapper">
                  <svg viewBox="0 0 35.6 35.6">
                    <circle
                      className="stroke"
                      cx="17.8"
                      cy="17.8"
                      r="14.37"
                    ></circle>
                    <polyline
                      className="check"
                      points="11.78 18.12 15.55 22.23 25.17 12.87"
                    ></polyline>
                  </svg>
                </div>
                Éxito
              </>
            ) : (
              "Eliminar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
