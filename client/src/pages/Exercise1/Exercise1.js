import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { useAuth } from "../../hooks/hooks";

function Exercise1() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Result
      status="success"
      title="Congratulations! You are logined!"
      extra={[
        <Button onClick={handleLogOut} key="signout">
          Sign Out
        </Button>,
      ]}
    />
  );
}

export default Exercise1;
