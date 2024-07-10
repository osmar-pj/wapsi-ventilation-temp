import { io } from "socket.io-client";
import { create } from "zustand";
import { GetData, PutData } from "../libs/api";

export const useSocketStore = create((set) => ({
  //Data sobre informacion de mina y nivel
  datInfoGeneral: {},
  //Lista de Instrumentos de los Sensores
  devices: [],
  //Lista de Instrumentos de los Ventiladores
  dataventilators: [],
  //Valor del Horometro
  datahorometer: {},
  //Valor de carga
  isLoading: true,

  //Socket de los sensores
  connectSocketSensors: () => {
    const socket = io(process.env.API_URL);
    socket.on("sensors", (data) => {
      set((state) => ({
        //Inserta data a datInfoGeneral
        datInfoGeneral: { ...state.datInfoGeneral, ...data },
        devices: data.devices || state.devices,
        isLoading: false,
      }));
    });

    return () => {
      socket.disconnect();
    };
  },
  //Socket de ventiladores
  connectSocketVentilators: () => {
    const socket = io(process.env.API_URL);
    socket.on("ventilators", (data) => {
      set((state) => ({
        //Inserta data a dataventilators
        dataventilators: { ...state.dataventilators, ...data },
        isLoading: false,
      }));
    });

    return () => {
      socket.disconnect();
    };
  },
  //Socket del homotetro
  connectSocketHorometer: () => {
    const socket = io(process.env.API_URL);
    socket.on("horometer", (data) => {
      set((state) => ({
        //Inserta data a datahorometer
        datahorometer: { ...state.datahorometer, ...data },
        isLoading: false,
      }));
    });

    return () => {
      socket.disconnect();
    };
  },
}));

export const useGlobalStore = create((set) => ({
  //Data sobre connfigración general 
  configGeneral: [],
  //Data sobre grafico de barras
  dataGraphicHistory: [],
  //Data del grafico de barrar CSV
  dataCSVHistory: [],
  //Valor del promedio de History -> Grafico de barra vertical
  dataMeanHistory: null,
  //Lista de los dias que se tiene informacion para el grafico Analytic
  dataGraphicDates: [],
  //Data del grafico de Analytic -> Grafico de lineas
  dataGraphicAnalytic: [],
  //Valor de carga
  isLoading: true,

  //Obtener datos de configuracion
  fetchConfigGeneral: async () => {
    try {
      const dataNew = await GetData("config/1");
      set({ configGeneral: dataNew, isLoading: false });
    } catch (error) {
      console.error("Error:", error);
      set({ isLoading: false });
    }
  },
  //Obtener data History -> Grafico de barra vertical
  fetchGraphicHistory: async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    const end = new Date();

    set({ isLoading: true });
    try {
      const dataNew = await GetData(
        `analyticsAdvanced?name=CO&start=${start.getTime()}&end=${end.getTime()}`
      );

      set({
        dataGraphicHistory: dataNew.bars,
        dataMeanHistory: dataNew.mean,
        dataCSVHistory: dataNew.data_final,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error:", error);
      set({ isLoading: false });
    }
  },

  //Obtener fechas para el grafico Analytic -> Grafico de lineas
  fetchGraphicDates: async () => {
    try {
      const dataNew = await GetData(`getDate`);
      set({ dataGraphicDates: dataNew });
      return dataNew;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  //Obtener data Analytyc -> Grafico de lineas
  fetchGraphicAnalytic: async (time, name) => {
    try {
      set({ isLoading: true });
      const dataNew = await GetData(`analyticsBasic?name=${name}&ts=${time}`);
      set({ dataGraphicAnalytic: dataNew, isLoading: false });
    } catch (error) {
      console.error("Error:", error);
      set({ isLoading: false });
    }
  },
  //Actualizar informacion de configuracion
  updateConfigGeneral: async (data) => {
    try {
      const dataNew = await PutData("config/1", data);
      console.log(dataNew);
      return dataNew;
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
