import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
function CityList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length === 0) {
    return <p className={styles.noCity}>No cities yet</p>;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
export default CityList;
