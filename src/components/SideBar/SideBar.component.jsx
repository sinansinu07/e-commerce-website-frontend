import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from "./SideBar.module.css";
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useEffect, useState } from 'react';
import { startGetMyCoupon } from '../../actions/couponAction';
import { useDispatch, useSelector } from 'react-redux';

export default function SideBar() {

  const dispatch = useDispatch()
  const coupons = useSelector((state) => {
    return state.coupons.data
  })

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal)
    console.log(coupons)
  }

  useEffect(() => {
    dispatch(startGetMyCoupon())
  }, [])
  // console.log(coupons)

  return (
    <div className={styles.sidebar}>
      <Sidebar className={styles.sidebar1}>
        <Menu className={styles.menuBar}>
          <SubMenu className={styles.subMenu} label="Account">
            <MenuItem className={styles.submenuItem} component={<Link to="/customer-profile" />}>
              Profile
            </MenuItem>
            <MenuItem className={styles.submenuItem} component={<Link to="/customer-address" />}>
              Address
            </MenuItem>
          </SubMenu>
          <MenuItem className={styles.menuItem}component={<Link to="/orders" />}>Orders</MenuItem>
          <MenuItem className={styles.menuItem} onClick={() => {toggle()}}>Coupons</MenuItem>
        </Menu>
      </Sidebar>
      <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Coupons - {coupons?.length} </ModalHeader>
          {coupons.length !== 0 ? (
            <div>
            {coupons?.map((ele) => (
              <div key={ele._id} className={styles.couponCard}>
                  <h4 className={styles.couponCode}>{ele.couponCode}</h4>
                  <p className={styles.couponDetails}>{ele.description}</p>
                  <p className={styles.couponDetails}>Discount : {ele.discount}%</p>
                  <p className={styles.couponDetails}>Validity : {new Date(ele.endDate).toLocaleDateString()}</p>
              </div>
              ))}
             </div> 
          ) : (
            <div>
              <p className={styles.couponDetails}>No Coupon Found</p>
            </div>
          )}
          <ModalBody></ModalBody>
        </Modal>
    </div>
  );
}
