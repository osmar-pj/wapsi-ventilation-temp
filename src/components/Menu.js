import { useNavegation } from "@/src/hooks/useNavigation";
import Link from "next/link";

export default function Menu() {
  const paths = useNavegation();

  return (
    <footer className="c-menu">
      {paths.map((route, index) => (
        <Link href={route.href} key={index}>
          <button
            className={`btn-menu ${route.active ? "sp-acti" : "sp-desact"}`}
          >
            {route.icon} 
        
          </button>
        </Link>
      ))}
    </footer>
  );
}
