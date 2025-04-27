import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import CountryItem from "./CountryItem";
import { useCity } from "../contexts/Citycontext";

function ContryList() {
  const { cities, isLoading } = useCity();
  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length === 0) {
    return <p className={styles.noCity}>No cities yet</p>;
  }
  const countries = [...new Set(cities.map((city) => city.country))];

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem
          country={country}
          key={country}
          emoji={cities[index].emoji}
        />
      ))}
    </ul>
  );
}
export default ContryList;
