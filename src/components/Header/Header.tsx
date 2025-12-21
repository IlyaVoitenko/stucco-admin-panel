import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../service/auth";
import styles from "./styles.module.scss";
import { PAGES } from "../../config/pages.config";

const Header = () => {
  const navigate = useNavigate();
  const currentRoute = window.location.pathname;
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <Link
            to={PAGES.CATEGORIES_PAGE}
            className={`${styles.navLink} ${
              currentRoute === PAGES.CATEGORIES_PAGE
                ? styles.activeLink
                : styles.inactiveLink
            }`}
          >
            <li className={styles.navItem}>List categories</li>
          </Link>
          <Link
            to={PAGES.PRODUCTS_PAGE}
            className={`${styles.navLink} ${
              currentRoute === PAGES.PRODUCTS_PAGE
                ? styles.activeLink
                : styles.inactiveLink
            }`}
          >
            <li className={styles.navItem}>Products</li>
          </Link>
          <Link
            to={PAGES.CREATE_CATEGORY_PAGE}
            className={`${styles.navLink} ${
              currentRoute === PAGES.CREATE_CATEGORY_PAGE
                ? styles.activeLink
                : styles.inactiveLink
            }`}
          >
            <li className={styles.navItem}>Create category</li>
          </Link>
        </ul>
      </nav>
      <button
        className={styles.btnLogout}
        onClick={async () => {
          await logout();
          navigate(PAGES.AUTH_PAGE);
        }}
      >
        Log out
      </button>
    </header>
  );
};

export default Header;
