import CSVHistory from "@/src/components/History/CSVHistory";
import GraphicHistory from "@/src/components/History/GraphicHistory";
import HighLevelHistory from "@/src/components/History/HighLevelHistory";
import MeanHistory from "@/src/components/History/MeanHistory";
import PercentageHistory from "@/src/components/History/PercentageHistory";
import Loader from "@/src/components/Loader";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { useEffect } from "react";

export default function History() {
  const { fetchGraphicHistory } = useGlobalStore();

  useEffect(() => {
    fetchGraphicHistory();
  }, []);

  return (
    <section>
      <div className="Page-body">
        <div className="Body-grafi">
          <div className="b-g-header">
            <MeanHistory />
          </div>
          <div className="b-g-body">
            <div className="gra-h">
              <Loader />
              <GraphicHistory />
            </div>
          </div>
          <div className="b-g-percentage">
           <PercentageHistory/>
          </div>
          <div className="b-g-footer">
            <CSVHistory />
          </div>
          <div className="b-g-levels">
            <HighLevelHistory />
          </div>
        </div>
      </div>
    </section>
  );
}

 {/* <div className="leyend">
              <div className="i-leyend">
                <div
                  className="i-leyend-circle"
                  style={{ backgroundColor: "#3f3f45" }}
                ></div>
                <span>Inoperativo</span>
              </div>
              <div className="i-leyend">
                <div
                  className="i-leyend-circle"
                  style={{ backgroundColor: "#0bb97d" }}
                ></div>
                <span>Correcto</span>
              </div>
              <div className="i-leyend">
                <div
                  className="i-leyend-circle"
                  style={{ backgroundColor: "#b9a50c" }}
                ></div>
                <span>Alto</span>
              </div>
              <div className="i-leyend">
                <div
                  className="i-leyend-circle"
                  style={{ backgroundColor: "#ff1437" }}
                ></div>
                <span>Muy alto</span>
              </div>
            </div> */}