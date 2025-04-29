import { createContext, useEffect, useContext, useReducer } from "react";

const Base_URL = "http://localhost:3000/cities";
const Citycontext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "city/added":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    default:
      return state; // Return the current state if no action matches
  }
}

function CityProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(true); // Start with true since we are loading data
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "cities/loading" });
      try {
        const response = await fetch(`${Base_URL}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
        alert(error.message);
      }
    }
    fetchCities();
  }, []); // Empty dependency array ensures this runs only once on mount

  async function getcity(id) {
    dispatch({ type: "cities/loading" });
    try {
      const response = await fetch(`${Base_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      alert(error.message);
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "cities/loading" });
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

      dispatch({ type: "city/added", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      alert(error.message);
    }
  }

  async function deletecity(id) {
    dispatch({ type: "cities/loading" });
    try {
      const response = await fetch(`${Base_URL}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });

      if (!response.ok) {
        throw new Error("Error deleteing the data");
      }
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      alert(error.message);
    }
  }

  return (
    <Citycontext.Provider
      value={{
        cities,
        isLoading,
        currentCity,

        getcity,
        createCity,
        deletecity,
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
