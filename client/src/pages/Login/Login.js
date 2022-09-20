import React, { useEffect } from "react";
import className from "classnames/bind";
import { Button, Form, Input, message, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/hooks";
import authApi from "../../api/authApi";
import styles from "./Login.module.scss";

const cx = className.bind(styles);
function Login() {
  const { user, setUser } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const { token, curr_user } = await authApi.authentication(
        form.getFieldsValue()
      );
      localStorage.setItem("token", token);

      setUser(curr_user);
    } catch (error) {
      if (error.response.status === 401) {
        message.error("Incorrect username or password");
      }
    }
    return null;
  };

  useEffect(() => {
    message.config({
      top: "20vh",
      duration: 2,
    });
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/exercise1");
      return;
    }
  }, [user, navigate]);
  return (
    <div className={cx("wrapper")}>
      <Form className={cx("form-login")} form={form} onFinish={handleSignIn}>
        <label className={cx("label")} htmlFor="username">
          UserName
        </label>
        <Form.Item
          id="username"
          name="username"
          rules={[
            {
              required: true,
              message: "PLease input your username",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <label className={cx("label")} htmlFor="password">
          Password
        </label>
        <Form.Item
          id="password"
          name="password"
          rules={[
            {
              required: true,
              message: "PLease input your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            block
            htmlType="submit"
            className={cx("login-btn")}
          >
            SIGN IN
          </Button>
          <Typography.Paragraph className={cx("registration-link")}>
            Don't have an account ? <Link to="/register">Sign up</Link>
          </Typography.Paragraph>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
