import Pagenav from "../components/Pagenav";
import styles from "./Login.module.css";
import { useState } from "react";
import { useAuth, AuthProvider } from "../contexts/Fakecontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("Bansi@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login } = useAuth();
  const { isAuthenticated } = useAuth();
  const Navigate = useNavigate();

  function handlesub(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/app", { replace: true });
    }
  }, [isAuthenticated, Navigate]);

  return (
    <main className={styles.login}>
      <Pagenav />
      <form className={styles.form} onSubmit={handlesub}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
