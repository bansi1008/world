import { createContext, useEffect, useState, useContext } from "react";

const Base_URL = "http://localhost:3000/cities";
const Citycontext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with true since we are loading data
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`${Base_URL}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false); // Set loading to false after the request completes
      }
    }
    fetchCities();
  }, []); // Empty dependency array ensures this runs only once on mount

  async function getcity(id) {
    try {
      const response = await fetch(`${Base_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  }

  async function createCity(newCity) {
    try {
      const response = await fetch(`${Base_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error submitting the data");
      }
      const data = await response.json();
      console.log(data);
      setCities((prevCities) => [...prevCities, data]); // Update the cities state with the new city
      setCurrentCity(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  }

  return (
    <Citycontext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCurrentCity,
        getcity,
        createCity,
      }}
    >
      {children}
    </Citycontext.Provider>
  );
}

function useCity() {
  const context = useContext(Citycontext);
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}

export { Citycontext, CityProvider, useCity };
