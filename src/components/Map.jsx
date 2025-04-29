// import { useSearchParams, useNavigate } from "react-router-dom";
// import styles from "./Map.module.css";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvent,
// } from "react-leaflet";
// import { useEffect, useState } from "react";
// import { useCity } from "../contexts/Citycontext";
// import { useMap } from "react-leaflet";
// import { useGeoloc } from "../hooks/useGeoloc";
// import Button from "./Button";
// import { useUrl } from "../hooks/useUrl";

// function Map() {
//   const Navigate = useNavigate();
//   const { isLoading: isloadingpos, position: geop, getPosition } = useGeoloc();
//   const { cities } = useCity();
//   const [Mapposition, setMapposition] = useState([51.505, -0.09]); // Default position
//   const [mlat, mlng] = useUrl();
//   useEffect(() => {
//     if (mlat && mlng) {
//       setMapposition([mlat, mlng]);
//     }
//   }, [mlat, mlng]);

//   useEffect(
//     function () {
//       if (geop) {
//         setMapposition([geop.lat, geop.lng]);
//       }
//     },
//     [geop]
//   );

//   return (
//     <div className={styles.mapContainer} onClick={() => Navigate("form")}>
//       <Button type="position" onClick={getPosition}>
//         {isloadingpos ? "Loading..." : "Get your position"}
//       </Button>
//       <MapContainer
//         center={Mapposition}
//         zoom={13}
//         scrollWheelZoom={true}
//         className={styles.map}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//         />
//         {cities.map((city) => (
//           <Marker
//             position={[city.position.lat, city.position.lng]}
//             key={city.id}
//           >
//             <Popup>
//               <span>{city.emoji}</span>
//               <h3>{city.cityName}</h3>
//             </Popup>
//           </Marker>
//         ))}
//         <Change position={Mapposition} />
//         <Detectclick />
//       </MapContainer>
//     </div>
//   );
// }

// function Change({ position }) {
//   const map = useMap();
//   map.setView(position);
//   return null;
// }

// function Detectclick() {
//   const Navigate = useNavigate();
//   useMapEvent({
//     click: (e) => {
//       console.log(e);

//       Navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
//     },
//   });
// }
// export default Map;

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCity } from "../contexts/Citycontext";
import { useGeoloc } from "../hooks/useGeoloc";
import Button from "./Button";
import { useUrl } from "../hooks/useUrl";

function Map() {
  const Navigate = useNavigate();
  const { isLoading: isloadingpos, position: geop, getPosition } = useGeoloc();
  const { cities } = useCity();
  const [Mapposition, setMapposition] = useState([51.505, -0.09]); // Default position
  const [mlat, mlng] = useUrl();

  useEffect(() => {
    if (mlat != null && mlng != null && !isNaN(mlat) && !isNaN(mlng)) {
      setMapposition([mlat, mlng]);
    }
  }, [mlat, mlng]);

  useEffect(() => {
    if (
      geop?.lat != null &&
      geop?.lng != null &&
      !isNaN(geop.lat) &&
      !isNaN(geop.lng)
    ) {
      setMapposition([geop.lat, geop.lng]);
    }
  }, [geop]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isloadingpos ? "Loading..." : "Get your position"}
      </Button>
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
        {cities.map((city) =>
          city.position?.lat != null && city.position?.lng != null ? (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <h3>{city.cityName}</h3>
              </Popup>
            </Marker>
          ) : null
        )}
        <Change position={Mapposition} />
        <Detectclick />
      </MapContainer>
    </div>
  );
}

function Change({ position }) {
  const map = useMap();

  useEffect(() => {
    if (
      position?.[0] != null &&
      position?.[1] != null &&
      !isNaN(position[0]) &&
      !isNaN(position[1])
    ) {
      map.setView(position);
    }
  }, [map, position]);

  return null;
}

function Detectclick() {
  const Navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      if (e?.latlng?.lat != null && e?.latlng?.lng != null) {
        Navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      }
    },
  });

  return null;
}

export default Map;
