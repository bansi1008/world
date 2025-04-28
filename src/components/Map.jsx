import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useCity } from "../contexts/Citycontext";

function Map() {
  const Navigate = useNavigate();
  const { cities } = useCity();
  const [Mapposition, setMapposition] = useState([51.505, -0.09]); // Default position
  const [search, setsearch] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => Navigate("form")}>
      <MapContainer
        center={Mapposition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <h3>{city.cityName}</h3>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
export default Map;
