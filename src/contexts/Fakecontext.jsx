import { createContext } from "react";
import { useContext, useReducer } from "react";

const Authcontext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
const FAKE_USER = {
  name: "Bansi",
  email: "Bansi@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, login) {
    if (email === FAKE_USER.email && login === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: { user: FAKE_USER },
      });
    } else {
      throw new Error("Invalid credentials");
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <Authcontext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
}
function useAuth() {
  const context = useContext(Authcontext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
