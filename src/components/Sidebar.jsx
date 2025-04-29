import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./Appnav";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p>WorldWise &copy; 2023</p>
        <p>All rights reserved</p>

        <p>Twitter</p>
      </footer>
    </div>
  );
}
export default Sidebar;
