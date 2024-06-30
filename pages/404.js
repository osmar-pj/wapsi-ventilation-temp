import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <section>
      <div className="container-404">
        <img
          src="/imgs/error.svg"
          alt="illustration"
        />
        <span> Lo sentimos, no se puede encontrar la página</span>
        <p>
        La página que estabas buscando parece haber sido movida, eliminada o no existe.
        </p>
        <button onClick={() => router.push("/")}>Regresar al Inicio</button>
      </div>
    </section>
  );
}
