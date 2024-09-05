import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from "./SideBar.module.css";
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Sidebar>
        <Menu className={styles.menuBar}>
          <SubMenu className={styles.subMenu} label="Account">
            <MenuItem className={styles.submenuItem} component={<Link to="/customer-profile" />}>
              Profile
            </MenuItem>
            <MenuItem className={styles.submenuItem} component={<Link to="/customer-address" />}>
              Address
            </MenuItem>
          </SubMenu>
          <MenuItem className={styles.menuItem}>Orders</MenuItem>
          <MenuItem className={styles.menuItem}>Coupons</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
