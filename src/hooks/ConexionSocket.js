import React, { useEffect, useState } from "react";
import { useGlobalStore, useSocketStore } from "../store/useGlobalStore";

const Layout = ({ children }) => {
  const {connectSocketSensors,connectSocketVentilators,connectSocketHorometer} = useSocketStore();
  useEffect(() => {
    connectSocketSensors();
    connectSocketVentilators();
    connectSocketHorometer();
  }, []);

  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   // Esto asegura que el código solo se ejecuta en el cliente
  //   setIsClient(true);

  //   // Solicitar permiso para enviar notificaciones cuando el componente se monte
  //   if (Notification.permission === 'default') {
  //     Notification.requestPermission().then(permission => {
  //       if (permission === 'granted') {
  //         console.log('Permiso para notificaciones concedido.');
  //       }
  //     });
  //   }
  // }, []);

  // const mostrarNotificacion = () => {
  //   if (isClient && Notification.permission === 'granted') {
  //     new Notification('¡Hola!', {
  //       body: 'Esta es una notificación del navegador.',
  //       icon: 'https://example.com/icon.png' // Opcional, ruta a un ícono
  //     });
  //   } else {
  //     alert('No tienes permiso para recibir notificaciones.');
  //   }
  // };

  return <>
  {/* <button className="btn-noti" onClick={mostrarNotificacion}>
      Enviar Notificación
    </button> */}
  {children}</>;
};

export default Layout;


// fetchConfigInstruments: async () => {
//   try {
//     const dataNew = await GetData("sensor");
//     set({ configInstruments: dataNew });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// },
// createInstrument: async (data) => {
//   try {
//     const dataNew = await PostData("sensor", data);
//     return dataNew;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// },
// updateInstrument: async (data) => {
//   try {
//     const dataNew = await PutData("sensor", data);
//     return dataNew;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// },
// updateConfigGeneral: async (data) => {
//   try {
//     const dataNew = await PutData("config/1", data);
//     return dataNew;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// },
// deleteInstrument: async (id) => {
//   console.log(id);
//   try {
//     const dataNew = await DeleteData(`sensor/${id}`);
//     return dataNew;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// },
