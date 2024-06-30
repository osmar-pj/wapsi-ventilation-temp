import { useGlobalStore } from "../store/useGlobalStore";

export default function Loader() {
  const { isLoading } = useGlobalStore();
  return (
    <div className={`loader-container ${isLoading ? "" : "hidden"}`}>
      <div className="loader"></div>
    </div>
  );
}
