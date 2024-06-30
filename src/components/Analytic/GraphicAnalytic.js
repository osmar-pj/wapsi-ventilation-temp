import { useGlobalStore } from "@/src/store/useGlobalStore";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loader from "../Loader";

export default function GraphicAnalytic() {
  const { dataGraphicAnalytic } = useGlobalStore();
  const newData = dataGraphicAnalytic?.map((item) => [
    item.ts * 1000 - 5 * 60 * 60 * 1000,
    item.value,
  ]);

  const options = {
    chart: {
      backgroundColor: "transparent",
      type: "areaspline",
      zoomType: "x",
      style: {
        fontFamily: "'__Sora_fdd6c4', '__Sora_Fallback_fdd6c4'",
      },
    },
    rangeSelector: {
      selected: 1,
    },
    legend: {
      enabled: false, // Ocultar la leyenda
    },
    title: {
      text: "", // Título vacío para eliminarlo
    },
    xAxis: {
      type: "datetime",
      labels: {
        style: {
          color: "#6b6b7d",
          fontSize: "10px",
        },
      },
    },
    yAxis: {
      labels: {
        style: {
          color: "#6b6b7d",
          fontSize: "10px",
        },
      },
      gridLineColor: "#2D3343",
      gridLineWidth: 0.5,
      gridLineDashStyle: "Dash",
      title: {
        text: "",
      },
    },
    accessibility: {
      enabled: false,
    },
    plotOptions: {
      areaspline: {
        color: "#009A6E",
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#009A6E"],
            [1, "#000000"],
          ],
        },
        threshold: null,
        marker: {
          lineWidth: 1,
          lineColor: null,
          fillColor: "white",
        },
      },
    },
    tooltip: {
      backgroundColor: "#3f3f45", // Color de fondo del tooltip
      borderColor: "transparent", // Color del borde del tooltip
      borderRadius: 10, // Radio de borde del tooltip
      borderWidth: 1, // Ancho del borde del tooltip
      style: {
        color: "#ffffff", // Color del texto del tooltip
        fontSize: "14px", // Tamaño de fuente del texto del tooltip
      },
      dateTimeLabelFormats: {
        hour: "%H:%M %P", // Formato de hora para el tooltip (opcional)
      },
    },
    series: [
      {
        name: "",
        data: newData,
       
        threshold: null,
        tooltip: {
          valueDecimals: 2,
        },
        // zones: [
        //   {
        //     value: 0,  // Valor más pequeño posible
        //     color: "red",
        //   },
        //   {
        //     value: 21,
        //     color: "yellow",
        //   },
        //   {
        //     value: 17,
        //     color: "green",
        //   },
        // ],
      },
    ],
    credits: {
      enabled: false
  },
  };

  return (
    <div className="highcharts-figure">
    <Loader/>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

// import dynamic from "next/dynamic";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// export default function App() {
//   const options = {
//     chart: {
//       fontFamily: "'__Saira_18cfd5', '__Saira_Fallback_18cfd5'",
//       margin: 0,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: "smooth",
//       colors: ["#0091a0"],
//       width: 2,
//     },
//     annotations: {
//       xaxis: [
//         {
//           x: new Date("2018-09-19T03:30:00.000Z").getTime(),
//           borderColor: "#999",
//           yAxisIndex: 0,
//           label: {
//             show: true,
//             text: "Max",
//             style: {
//               color: "#fff",
//               background: "#775DD0",
//             },
//           },
//         },
//       ],
//     },
//     xaxis: {
//       type: "datetime",
//       categories: [
//         new Date("2024-09-19T00:00:00.000Z").getTime(),
//         new Date("2024-09-19T01:30:00.000Z").getTime(),
//         new Date("2024-09-19T02:30:00.000Z").getTime(),
//         new Date("2024-09-19T03:30:00.000Z").getTime(),
//         new Date("2024-09-19T04:30:00.000Z").getTime(),
//         new Date("2024-09-19T05:30:00.000Z").getTime(),
//         new Date("2024-09-19T06:30:00.000Z").getTime(),
//       ],
//       lines: {
//         show: false,
//       },
//       labels: {
//         style: {
//           colors: "#909499",
//           fontSize: "10px",
//         },
//       },
//       axisTicks: {
//         show: false,
//       },
//       axisBorder: {
//         show: false,
//       },
//     },

//     yaxis: {
//       labels: {
//         style: {
//           colors: "#909499",
//           fontSize: "10px",
//         },
//       },
//     },

//     tooltip: {
//         x: {
//           format: "dd/MM/yy HH:mm",
//         },
//         y: {
//           formatter: function (value) {
//             return value.toFixed(2);
//           },
//           title: {
//             formatter: function () {
//               return "Valor";
//             },
//           },
//         },
//         style: {
//           fontSize: "12px",
//           color: "#fff",
//         },
//         marker: {
//           show: true,
//           fillColors: ["#FF0000"],  // Cambia el color del punto del tooltip
//         },
//         items: {
//           display: "flex",
//           flexDirection: "column",
//         },
//         fillSeriesColor: false,
//         background: "red",
//         border: {
//           show: true,
//           width: 2,
//           radius: 5,
//           color: "red",
//         },
//       },

//     fill: {
//       colors: ["#0091a0"],
//       type: "gradient",
//       gradient: {
//         shadeIntensity: 5,
//         opacityFrom: 0.8,
//         opacityTo: 0.1,
//         stops: [0, 100],
//       },
//     },
//     grid: {
//       show: true,
//       borderColor: "#2D3343",
//       strokeDashArray: 1,
//       position: "back",
//     },
//   };

//   const series = [
//     {
//       name: "series1",
//       data: [31, 40, 28, 51, 42, 109, 10],
//     },
//   ];

//   return (
//     <div className="gra-s">
//       <Chart type="area" options={options} series={series} height={250} />
//     </div>
//   );
// }
