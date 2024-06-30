import { usePathname } from "next/navigation";
import IconEnergy from "../Icons/IconEnergy";
import IconNotification from "../Icons/IconNotification";
import { getCurrentDate } from "../libs/utils";

const routeNames = {
  "/": "Dashboard",
  "/history": "Historial",
  "/analytic": "Análisis",
  "/configuration": "Configuración",
};

const PageRoute = () => {
  const pathname = usePathname();

  // Verificar si la ruta actual está en routeNames
  const routeName = routeNames[pathname];

  // Si no está en routeNames, no mostrar nada
  if (!routeName) {
    return null;
  }

  return (
    <header className="Page-route">
      <div className="logo">
        <img src="/imgs/logo-icon.svg" alt="Logo" />
      </div>
      <div className="route">
        <span>{routeName}</span>
        <div className="r-name">
          <p>Actualizado,</p>
          <IconEnergy />
          <small> {getCurrentDate()}</small>
        </div>
      </div>
      <div className="logo">
        <IconNotification />
      </div>
    </header>
  );
};

export default PageRoute;
