import dayjs from "dayjs";
import "dayjs/locale/es";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(relativeTime);
dayjs.locale("es");
dayjs.extend(calendar);
dayjs.extend(utc);
dayjs.extend(timezone);

const calendarFormat = {
  sameDay: "[Hoy]", // El mismo día (Hoy)
  nextDay: "[Mañana]", // El día siguiente (Mañana)
  nextWeek: "dddd", // La próxima semana (Domingo)
  lastDay: "[Ayer]", // El día anterior (Ayer)
  lastWeek: "dddd", // La semana pasada (Lunes)
  sameElse: "ddd, D MMM", // Todo lo demás (17/10/2011)
};

export function formatFecha(dateString) {
  const date = dayjs(dateString);
  const formattedDate = date.format("D MMM YYYY");
  return formattedDate;
}

export function formatFechaTime(fecha) {
  return dayjs(fecha).calendar(null, calendarFormat);
}

export function formatDate(date) {
  const day = dayjs(date).date();
  const month = dayjs(date).format("MMM");
  return { day, month };
}

export function formatNameDay(date) {
  return dayjs(date).format("dddd");
}

export function getCurrentDate() {
  return dayjs().format("dddd, D MMMM");
}

export function getDate() {
  return dayjs().format("DD/MM/YYYY");
}
export function renderNameWithSubscript(name) {
  const number = name.match(/\d+/);
  if (number) {
    return [
      name.substring(0, number.index),
      <sub key={number[0]}>{number[0]}</sub>,
      name.substring(number.index + number[0].length),
    ];
  } else {
    return name;
  }
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function separarNumero(numero) {
  const partes = numero.toString().split(".");
  return {
    parteEntera: partes[0],
    parteDecimal: partes[1] || "", 
  };
}

export function formatHour(decimalValue) {
  // Separar la parte entera y decimal del valor
  const integerPart = Math.floor(decimalValue);
  const decimalPart = decimalValue - integerPart;

  // Convertir la parte decimal a segundos
  const totalSeconds = Math.round(decimalPart * 60);

  // Calcular las horas, minutos y segundos
  const hours = Math.floor(integerPart / 60);
  const minutes = integerPart % 60;
  const seconds = totalSeconds;

  // Formatear la salida
  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  if (minutes > 0) {
    formattedTime += `${minutes}min `;
  }

  return formattedTime.trim() || "0min";
}

export function getHourFromDate(date) {
  const dayjsDate = dayjs.utc(date);
  const dayjsDateInTimeZone = dayjsDate.tz("America/Lima", true);
  return dayjsDateInTimeZone.format("HH:mm");
}

export function getDayOfMonthFromDate(date) {
  const dayjsDate = dayjs(date);
  return dayjsDate.format("D");
}

export function getMonthNameFromDate(date) {
  const dayjsDate = dayjs(date);
  return dayjsDate.format("MMMM");
}
