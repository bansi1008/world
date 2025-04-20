import styles from "./City.module.css";
import { useParams, useSearchParams } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();

  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };
  const [search, setsearch] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <h1>City {id}</h1>
      <p>
        postion {lat},{lng}
      </p>
      <button onClick={() => setsearch({ lat: 23, lng: 34 })}>change</button>
    </div>
  );
}

export default City;
