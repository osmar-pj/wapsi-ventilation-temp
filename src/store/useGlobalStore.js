import { io } from "socket.io-client";
import { create } from "zustand";
import { GetData, PutData } from "../libs/api";

export const useSocketStore = create((set) => ({
  dataInstruments: {},
  devices: [],
  dataventilators: [],
  datahorometer: {},
  isLoading: true,

  connectSocketSensors: () => {
    const socket = io(process.env.API_URL);
    socket.on("sensors", (data) => {
      set((state) => ({
        dataInstruments: { ...state.dataInstruments, ...data },
        devices: data.devices || state.devices,
        isLoading: false,
      }));
    });

    return () => {
      socket.disconnect();
    };
  },

  connectSocketVentilators: () => {
    const socket = io(process.env.API_URL);
    socket.on("ventilators", (data) => {
      set((state) => ({
        dataventilators: { ...state.dataventilators, ...data },
        isLoading: false,
      }));
    });

    return () => {
      socket.disconnect();
    };
  },

  connectSocketHorometer: () => {
    const socket = io(process.env.API_URL);
    socket.on("horometer", (data) => {
      set((state) => ({
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
  configGeneral: [],
  dataGraphicHistory: [],
  dataCSVHistory: [],
  dataMeanHistory: null,
  dataGraphicDates: [],
  dataGraphicAnalytic: [],
  isLoading: true,

  fetchConfigGeneral: async () => {
    try {
      const dataNew = await GetData("config/1");
      set({ configGeneral: dataNew, isLoading: false });
    } catch (error) {
      console.error("Error:", error);
      set({ isLoading: false });
    }
  },

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
  fetchGraphicDates: async () => {
    try {
      const dataNew = await GetData(`getDate`);
      set({ dataGraphicDates: dataNew });
      return dataNew;
    } catch (error) {
      console.error("Error:", error);
    }
  },
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
