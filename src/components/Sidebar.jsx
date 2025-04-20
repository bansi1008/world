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
      <p>List of city</p>
      <footer className={styles.footer}>
        <p>WorldWise &copy; 2023</p>
        <p>All rights reserved</p>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Contact Us</p>
        <p>Help</p>
        <p>FAQ</p>
        <p>Support</p>
        <p>Feedback</p>
        <p>Careers</p>
        <p>About Us</p>
        <p>Blog</p>
        <p>Press</p>
        <p>Social Media</p>

        <p>Twitter</p>
      </footer>
    </div>
  );
}
export default Sidebar;
