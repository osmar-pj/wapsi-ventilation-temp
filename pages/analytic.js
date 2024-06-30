import CSVAnalytic from "@/src/components/Analytic/CSVAnalytic";
import DatesAnalytic from "@/src/components/Analytic/DatesAnalytic";
import GraphicAnalytic from "@/src/components/Analytic/GraphicAnalytic";

export default function Ventilation() {
  return (
    <section>
      <div className="Page-body">
        <div className="Body-grafi">
          <DatesAnalytic />
          <GraphicAnalytic />
          <div className="b-g-footer">
            <CSVAnalytic />
          </div>
        </div>
      </div>
    </section>
  );
}
