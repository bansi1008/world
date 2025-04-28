// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { use, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../hooks/useUrl";
import { useEffect } from "react";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useUrl();

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (data && data.countryName) {
          setCountry(data.countryName);
        }

        if (data.city || data.locality) {
          setCityName(data.city || data.locality);
        } else {
          setCityName("Unknown City");
        }
      } catch (err) {
        console.error("Error fetching country data:", err);
        setCityName("Unknown City"); // Fallback in case of error
        setCountry("Unknown Country");
      }
    }
    fetchCountry();
  }, [lat, lng]);

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
