import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const Navigate = useNavigate();
  const [search, setsearch] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => Navigate("form")}>
      <h2>Map</h2>
      <h1>
        postion :{lat},{lng}
      </h1>
    </div>
  );
}
export default Map;
