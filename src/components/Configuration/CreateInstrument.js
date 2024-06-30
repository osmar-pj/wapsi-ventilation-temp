import { useGlobalStore } from "@/src/store/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  serie: z.string().min(1, { message: "*Campo obligatorio" }),
  name: z.string().min(1, { message: "*Campo obligatorio" }),
  description: z.string().min(1, { message: "*Campo obligatorio" }),
  unit: z.string().min(1, { message: "*Campo obligatorio" }),
  type: z.string().min(1, { message: "*Campo obligatorio" }),
  factor: z.number().min(1, { message: "*Número mayor a 0" }),
  min1: z.number().min(1, { message: "*Número mayor a 0" }),
  min2: z.number().min(1, { message: "*Número mayor a 0" }),
  max1: z.number().min(1, { message: "*Número mayor a 0" }),
  max2: z.number().min(1, { message: "*Número mayor a 0" }),
  status: z.boolean(),
});

export default function CreateInstrument({ mode, instrument, onClose }) {
  const { createInstrument,updateInstrument, fetchConfigInstruments } = useGlobalStore();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [success, setSuccess] = useState(false);

  const initialValues =
    mode === "edit"
      ? {
          serie: instrument?.serie,
          name: instrument?.name,
          description: instrument?.description,
          unit: instrument?.unit,
          type: instrument?.type,
          factor: parseFloat(instrument?.factor),
          min1: parseFloat(instrument?.min1),
          min2: parseFloat(instrument?.min2),
          max1: parseFloat(instrument?.max1),
          max2: parseFloat(instrument?.max2),
          status: instrument?.status,
        }
      : {
          serie: "",
          name: "",
          description: "",
          unit: "",
          type: "",
          factor: 0,
          min1: 0,
          min2: 0,
          max1: 1,
          max2: 1,
          status: true,
        };

  const { handleSubmit, register, formState, reset } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [mode, instrument, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setButtonClicked(true);
      let dataResponse;
      if (mode === "create") {
        dataResponse = await createInstrument(data);
      } else if (mode === "edit") {
        dataResponse = await updateInstrument(data); // Asegúrate de tener esta función definida en tu global store
      }

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
        onSubmit={handleSubmit(onSubmit)}
        style={{
          userSelect: buttonClicked ? "none" : "auto",
          pointerEvents: buttonClicked ? "none" : "auto",
        }}
      >
        <div className="mC-c-header">
          <div className="mC-h-title">
            <h3>{mode ? "Crear nuevo elemento" : "Actualizar dato"}</h3>
            <h4>
              {mode
                ? " Agregar información para un nuevo elemento"
                : " Modificar información existente"}
            </h4>
          </div>
          <span onClick={onClose} className="mC-h-close" type="button">
            x
          </span>
        </div>

        <div className="mC-b-imputs-Crud">
          <div className="mC-imputs-item">
            <label htmlFor="serie">Ingrese Serie </label>
            <div className="imputs-i-input">
              <input
                type="text"
                id="serie"
                placeholder="Ej. S001"
                {...register("serie")}
              />
            </div>
            {formState.errors.serie && (
              <span className="f-error">{formState.errors.serie.message}</span>
            )}
          </div>
          <div className="mC-imputs-item">
            <label htmlFor="name">Ingrese nombre </label>
            <div className="imputs-i-input">
              <input
                type="text"
                id="name"
                placeholder="Ej. CO"
                {...register("name")}
              />
            </div>
            {formState.errors.name && (
              <span className="f-error">{formState.errors.name.message}</span>
            )}
          </div>
          <div className="mC-imputs-item">
            <label htmlFor="description">Ingrese descripción </label>
            <div className="imputs-i-input">
              <input
                type="text"
                id="description"
                placeholder="Ej. Nitrogeno"
                {...register("description")}
              />
            </div>
            {formState.errors.description && (
              <span className="f-error">
                {formState.errors.description.message}
              </span>
            )}
          </div>
          <div className="mC-imputs-item">
            <label htmlFor="unit">Ingrese unidad </label>
            <div className="imputs-i-input">
              <input
                type="text"
                id="unit"
                placeholder="Ej. ppm"
                {...register("unit")}
              />
            </div>
            {formState.errors.unit && (
              <span className="f-error">{formState.errors.unit.message}</span>
            )}
          </div>
          <div className="mC-imputs-item">
            <label htmlFor="type">Ingrese tipo </label>
            <div className="imputs-i-input">
              <select
                name="type"
                id="type"
                defaultValue="sa"
                {...register("type")}
              >
                <option value="" disabled hidden>
                  Seleccione
                </option>
                <option value="sa">sa</option>
                <option value="sd">sd</option>
              </select>
            </div>
            {formState.errors.type && (
              <span className="f-error">{formState.errors.type.message}</span>
            )}
          </div>
          <div className="mC-imputs-item">
            <label htmlFor="factor">Ingrese factor </label>
            <div className="imputs-i-input">
              <input
                type="number"
                id="factor"
                min="0"
                max="99"
                placeholder="Ej. factor"
                {...register("factor")}
              />
            </div>
            {formState.errors.factor && (
              <span className="f-error">{formState.errors.factor.message}</span>
            )}
          </div>

          <div className="mC-imputs-item">
            <label htmlFor="min1">Ingrese mínimo 1 </label>
            <div className="imputs-i-input">
              <input
                type="number"
                id="min1"
                min="-99"
                max="999"
                placeholder="Ej. CO"
                {...register("min1")}
              />
            </div>
            {formState.errors.min1 && (
              <span className="f-error">{formState.errors.min1.message}</span>
            )}
          </div>
          <div className="mC-imputs-item">
            <label htmlFor="min2">Ingrese mínimo 2 </label>
            <div className="imputs-i-input">
              <input
                type="number"
                id="min2"
                min="-99"
                max="999"
                placeholder="Ej. CO"
                {...register("min2")}
              />
            </div>
            {formState.errors.min2 && (
              <span className="f-error">{formState.errors.min2.message}</span>
            )}
          </div>
          <div className="mC-imputs-item">
            <label htmlFor="max1">Ingrese máximo 1 </label>
            <div className="imputs-i-input">
              <input
                type="number"
                id="max1"
                min="1"
                max="999"
                placeholder="Ej. CO"
                {...register("max1")}
              />
            </div>
            {formState.errors.max1 && (
              <span className="f-error">{formState.errors.max1.message}</span>
            )}
          </div>
          <div className="mC-imputs-item">
            <label htmlFor="max2">Ingrese máximo 2 </label>
            <div className="imputs-i-input">
              <input
                type="number"
                id="max2"
                placeholder="Ej. CO"
                min="1"
                max="999"
                {...register("max2")}
              />
            </div>
            {formState.errors.max2 && (
              <span className="f-error">{formState.errors.max2.message}</span>
            )}
          </div>
          <div className="mC-imputs-item">
            <div className="cont-input">
              <div className="info-input">
                <label htmlFor="status">Activar/Desactivar</label>
                <p>
                  Habilite o deshabilite este instrumento para poder mostrar en
                  la lista.
                </p>
              </div>
              <div className="imputs-i-value">
                <div className="container-switch">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="checkbox"
                    {...register("status")}
                  />
                  <label className="switch" htmlFor="checkbox">
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
            {formState.errors.status && (
              <span className="f-error">{formState.errors.status.message}</span>
            )}
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
            onClick={handleSubmit}
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
            ) : mode ? (
              "Guardar"
            ) : (
              "Actualizar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// const initialValues = isCreateUser
//     ? {
//         ruc: "",
//         name: "",
//         address: "",
//         phone: "",
//         groupName: "",
//       }
//     : {
//         ruc: userToEdit.ruc,
//         name: userToEdit.name,
//         address: userToEdit.address,
//         phone: userToEdit.phone,
//         groupName: userToEdit.groupName,
//       };
