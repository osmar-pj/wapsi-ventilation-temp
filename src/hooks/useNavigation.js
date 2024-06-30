import { usePathname } from "next/navigation";
import { useMemo } from "react";
import IconDashboard from "../Icons/IconDashboard";
import IconAnalytic from "../Icons/IconAnalytic";
import IconHistory from "../Icons/IconHistory";
import IconConfiguration from "../Icons/IconConfiguration";

export const useNavegation = () => {
  const pathname = usePathname();
  const paths = useMemo(
    () => [
      {
        name: "Dashboard",
        href: "/",
        icon: <IconDashboard />,
        active: pathname ==="/",
        
      },
      {
        name: "Historial",
        href: "/history",
        icon: <IconHistory />,
        active: pathname === "/history",
        
      },
      {
        name: "Análisis",
        href: "/analytic",
        icon: <IconAnalytic />,
        active: pathname === "/analytic",
        
      },
      {
        name: "Configuración",
        href: "/configuration",
        icon: <IconConfiguration />,
        active: pathname === "/configuration",
        
      },
    ],
    [pathname]
  );
  return paths;
};
