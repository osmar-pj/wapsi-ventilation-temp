import { formatFechaTime } from "@/src/libs/utils";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { Chart, registerables } from "chart.js";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { useEffect, useRef, useState } from "react";

export default function GraphicHistory() {
  const { dataGraphicHistory } = useGlobalStore();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!dataGraphicHistory) {
      return;
    }

    const data = dataGraphicHistory?.map((item) => ({
      label: item.x,
      data: [{ x: item.x, y: item.y }],
      backgroundColor: item.color,
      // barPercentage: 0.3,
      // categoryPercentage: 0.3,
      // barThickness: 45,
      // maxBarThickness: 35,
    }));

    Chart.register(...registerables);
    Chart.defaults.font.family = "__Sora_fdd6c4";

    const ctx = document.getElementById("Chart");

    if (!chartRef.current) {
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        responsive: true,
        data: {
          datasets: data,
        },
        options: {
          animation: false,
          indexAxis: "y",
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          interaction: {
            intersect: false,
          },
          elements: {
            bar: {
              borderRadius: 2,
            },
          },
          scales: {
            x: {
              stacked: false,
              type: "time",
              time: {
                parser: "HH:mm",
                unit: "hour",
                displayFormats: {
                  hour: "HH:mm",
                },
              },
              min: "00:00",
              max: "23:59",
              ticks: {
                beginAtZero: true,
                color: "#6b6b7d",
                font: {
                  size: 8,
                },
                maxRotation: 90,
                minRotation: 90,
                autoSkip: true,
              },
              grid: {
                display: false, // No mostrar líneas de la cuadrícula verticales
                display: true, // Mostrar líneas de la cuadrícula horizontales
                color: "#2D3343", // Color blanco para las líneas de la cuadrícula horizontales
                borderDash: [10, 5], // Líneas de la cuadrícula punteadas
                drawBorder: false, // No dibujar el borde del eje
                drawOnChartArea: true, // Solo dibujar en el área del gráfico
              },
              barSpacing: 5,
            },
            y: {
              stacked: true,

              type: "time",
              time: {
                parser: "yyyy-MM-dd",
                unit: "day",
                displayFormats: {
                  day: "eee dd",
                },
              },
              ticks: {
                beginAtZero: true,
                color: "#6b6b7d",
                font: {
                  size: 9.5,
                },
                callback: (value) => formatFechaTime(value),
              },
              grid: {
                display: false,
              },
            },
          },
        },
      });

      chartRef.current = newChartInstance;
    } else {
      chartRef.current.data.datasets = data;
      chartRef.current.update();
    }
  }, [dataGraphicHistory]);

  return (
    <>
      <canvas id="Chart" style={{ height: "800px" }}></canvas>
    </>
  );
}
