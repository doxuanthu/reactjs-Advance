import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Avatar, Dropdown } from "antd";
import className from "classnames/bind";
import { useAuth, useApp } from "../../hooks/hooks";
import styles from "./User.module.scss";

const cx = className.bind(styles);

function User() {
  const {
    user: { username },
    setUser,
  } = useAuth();

  const { setVisibleModal } = useApp();
  const navigate = useNavigate();

  const menu = useMemo(
    () => (
      <Menu
        style={{ minWidth: 180, padding: "4px 14px" }}
        items={[
          {
            label: <Link to="">Profile</Link>,
          },
          {
            label: (
              <Link to="" onClick={() => setVisibleModal(true)}>
                Change Password
              </Link>
            ),
          },
          {
            type: "divider",
          },
          {
            label: (
              <Link onClick={handleLogOut} to="">
                LogOut
              </Link>
            ),
          },
        ]}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function handleLogOut() {
    console.log("logout");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <Dropdown className={cx("wrapper")} overlay={menu} trigger={["click"]}>
      <Avatar style={{ backgroundColor: "orange" }} size="large">
        {username.charAt(0).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
}

export default User;
