import IconArrowDown from "@/src/Icons/IconArrowDown";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loader from "../Loader";

const FormSchema = z.object({
  mining: z.string().min(1, { message: "*Campo obligatorio" }),
  level: z.string().min(1, { message: "*Campo obligatorio" }),
  timeSoft: z.number().min(0, { message: "*Debe ser un número mayor a 0" }),
  horometer: z.number().min({ message: "*Debe ser un número mayor a 0" }),
  bitConfirm: z.boolean(),
  protocolo: z.string().min(1, { message: "*Debe seleccionar uno" }),
  idMod: z.number().min(0, { message: "*Debe ser un número mayor a 0" }),
  buadrate: z.number().min(0, { message: "*Debe ser un número mayor a 0" }),
});

export default function ConfigGeneral() {
  const { configGeneral, updateConfigGeneral, fetchConfigGeneral } =
    useGlobalStore();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [success, setSuccess] = useState(false);

  const { handleSubmit, register, formState, setValue, watch } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mining: configGeneral?.mining || "",
      level: configGeneral?.level || "",
      timeSoft: configGeneral?.timeSoft || 1,
      horometer: configGeneral?.horometer || 0,
      bitConfirm: configGeneral?.bitConfirm || false,
      protocolo: configGeneral?.protocolo || "DIGITAL_I/O",
      idMod: configGeneral?.idMod || 1,
      buadrate: configGeneral?.buadrate || 9600,
    },
  });

  useEffect(() => {
    if (configGeneral) {
      setValue("mining", configGeneral.mining || "");
      setValue("level", configGeneral.level || "");
      setValue("timeSoft", configGeneral.timeSoft || 1);
      setValue("horometer", (configGeneral.horometer ?? 0).toFixed(2));
      setValue("bitConfirm", configGeneral.bitConfirm || false);
      setValue("protocolo", configGeneral.protocolo || "DIGITAL_I/O");
      setValue("idMod", configGeneral.idMod || 1);
      setValue("buadrate", configGeneral.buadrate || 9600);
    }
  }, [configGeneral, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setButtonClicked(true);
      const dataNew = await updateConfigGeneral(data);
      if (dataNew.status === true) {
        setSuccess(true);

        setTimeout(() => {
          setButtonClicked(false);
          setSuccess(false);
        }, 1000);
        fetchConfigGeneral(); // ¿Es necesario volver a cargar los datos después de una actualización exitosa?
        console.log("Configuración actualizada");
      } else {
        console.log("Error al actualizar la configuración");
        setButtonClicked(false);
      }
    } catch (error) {
      console.error("Error al actualizar la configuración:", error);
      setButtonClicked(false);
    }
  };
  return (
    <div className="Config">
      <form
        className="config-container"
        onSubmit={handleSubmit(onSubmit)}
        style={{
          userSelect: buttonClicked ? "none" : "auto",
          pointerEvents: buttonClicked ? "none" : "auto",
        }}
      >
        <span className="cf-title">Parámetros</span>
        <div className="cf-items">
          <div className="item-div">
            <div className="cont-input">
              <div className="info-input">
                <label htmlFor="mining">Mina </label>
                <p>Puede modificar el nombre designado para la mina</p>
              </div>
              <div className="imputs-i-value">
              <Loader/>
                <input type="text" {...register("mining")} />
              </div>
            </div>
            {formState.errors.mining && (
              <span className="f-error">{formState.errors.mining.message}</span>
            )}
          </div>
          <div className="item-div">
            <div className="cont-input">
              <div className="info-input">
                <label htmlFor="level">Nivel </label>
                <p>Puede modificar el nivel designado para la mina</p>
              </div>
              <div className="imputs-i-value">
               <Loader/>
                <input type="text" {...register("level")} />
              </div>
            </div>
            {formState.errors.level && (
              <span className="f-error">{formState.errors.level.message}</span>
            )}
          </div>
          <div className="item-div">
            <div className="cont-input">
              <div className="info-input">
                <label htmlFor="timeSoft">Intervalo de tiempo </label>
                <p>Puede modificar el nivel designado para la mina</p>
              </div>
              <div className="imputs-i-value">
              <Loader/>
                <input
                  type="number"
                  id="timeSoft"
                  min="0"
                  max="999"
                  {...register("timeSoft", { valueAsNumber: true })}
                />
              </div>
            </div>
            {formState.errors.timeSoft && (
              <span className="f-error">
                {formState.errors.timeSoft.message}
              </span>
            )}
          </div>
          <div className="item-div">
            <div className="cont-input">
              <div className="info-input">
                <label htmlFor="horometer">Horometro </label>
                <p>Puede modificar el numero del horometro</p>
              </div>
              <div className="imputs-i-value">
              <Loader/>
                <input
                  type="number"
                  id="horometer"
                  step="0.0001"
                  min="0"
                  max="999999"
                  {...register("horometer", { valueAsNumber: true })}
                />
              </div>
            </div>
            {formState.errors.horometer && (
              <span className="f-error">
                {formState.errors.horometer.message}
              </span>
            )}
          </div>
          <div className="item-div">
            <div className="cont-input">
              <div className="info-input">
                <label htmlFor="bitConfirm">Activar/Desactivar valor</label>
                <p>
                  Habilite o deshabilite el valor de ingreso de datos al
                  sistema.
                </p>
              </div>
              <div className="imputs-i-value">
              <Loader/>
                <div className="container-switch">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="checkbox"
                    {...register("bitConfirm")}
                  />
                  <label className="switch" htmlFor="checkbox">
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
            {formState.errors.bitConfirm && (
              <span className="f-error">
                {formState.errors.bitConfirm.message}
              </span>
            )}
          </div>
        </div>
        <div className="cf-separator"></div>
        <span className="cf-title">Protocolo de Comunicación</span>
        <div className="cf-items">
          <div className="item-div">
            <div className="cont-input">
              <div className="info-input">
                <label htmlFor="bitConfirm">Protocolo</label>
                <p>
                  Habilite o deshabilite el valor de ingreso de datos al
                  sistema.
                </p>
              </div>
              <div className="imputs-i-value">
              <Loader/>
                <div className="container-select-config">
                  <select
                    name="protocolo"
                    id="protocolo"
                    defaultValue="DIGITAL_I/O"
                    className="select-config"
                    {...register("protocolo")}
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="Modbus_TCP/IP">Modbus TCP/IP</option>
                    <option value="Modbus_RS485">Modbus RS485</option>
                    <option value="DIGITAL_I/O">DIGITAL I/O</option>
                  </select>
                  <IconArrowDown className="icon-select" />
                </div>
              </div>
            </div>
            {formState.errors.protocolo && (
              <span className="f-error">
                {formState.errors.protocolo.message}
              </span>
            )}
          </div>
          {(watch("protocolo") === "Modbus_TCP/IP" ||
            watch("protocolo") === "Modbus_RS485") && (
            <>
              <div className="item-div">
                <div className="cont-input">
                  <div className="info-input">
                    <label htmlFor="idMod">Id valor</label>
                    <p>Modificar el numero de id</p>
                  </div>
                  <div className="imputs-i-value">
                  <Loader/>
                    <input
                      type="text"
                      {...register("idMod", { valueAsNumber: true })}
                    />
                  </div>
                </div>
                {formState.errors.idMod && (
                  <span className="f-error">
                    {formState.errors.idMod.message}
                  </span>
                )}
              </div>
              <div className="item-div">
                <div className="cont-input">
                  <div className="info-input">
                    <label htmlFor="buadrate">Buadrate</label>
                    <p>Modificar el numero de buadrate</p>
                  </div>
                  <div className="imputs-i-value">
                  <Loader/>
                    <input
                      type="text"
                      {...register("buadrate", { valueAsNumber: true })}
                    />
                  </div>
                </div>
                {formState.errors.buadrate && (
                  <span className="f-error">
                    {formState.errors.buadrate.message}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        <div className="cf-button">
          <button
            type="submit"
            className={`btn-success${
              buttonClicked && !success ? " sending" : ""
            }${success ? " success" : ""}`}
          >
            {buttonClicked && !success ? (
              <>
                <span className="loader"></span>Enviando...
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
                Proceso exitoso
              </>
            ) : (
              "Actualizar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
