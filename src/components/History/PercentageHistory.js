import { useGlobalStore } from "@/src/store/useGlobalStore";
import CircularChart from "./CircularChart";

export default function PercentageHistory() {
  const { dataGraphicHistory } = useGlobalStore();

  const categories = {
    inoperativo: {
      id: "3f3f45",
      name: "Inoperativo",
      color: "#3f3f45",
      value: 0,
      percentage: 0,
    },
    operativo: {
      id: "28a745",
      name: "Operativo",
      color: "#28a745",
      value: 0,
      percentage: 0,
    },
    alto: {
      id: "b9a50",
      name: "Alto",
      color: "#b9a50",
      value: 0,
      percentage: 0,
    },
    muyAlto: {
      id: "dc3545",
      name: "Muy Alto",
      color: "#dc3545",
      value: 0,
      percentage: 0,
    },
  };

  if (!dataGraphicHistory) {
    return <div>Loading...</div>;
  }

  const filter = dataGraphicHistory;
  filter.forEach((item) => {
    const color = item.color.replace("#", "").toLowerCase();
    Object.keys(categories).forEach((key) => {
      if (categories[key].id === color) {
        categories[key].value++;
      }
    });
  });

  const totalItems = filter.length;

  if (totalItems > 0) {
    Object.keys(categories).forEach((key) => {
      categories[key].percentage = (
        (categories[key].value / totalItems) *
        100
      ).toFixed(1);
    });
  }

  return (
    <>
      {Object.keys(categories).map((key) => (
        <CircularChart
          key={categories[key].id}
          percentage={parseFloat(categories[key].percentage)}
          strokeColor={categories[key].color}
          label={categories[key].name}
          subLabel="Semana"
        />
      ))}
    </>
  );
}
