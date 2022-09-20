import React from "react";
import { Link, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import { Button, Form, Input, message, Typography } from "antd";
import authApi from "../../api/authApi";
import styles from "./Register.module.scss";

const cx = className.bind(styles);
function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const content = () => (
    <p>
      My account is ready!
      <span
        onClick={() => {
          navigate("/login");
          message.destroy("register_key");
        }}
        style={{ color: "red", cursor: "pointer", fontWeight: "bold" }}
        href=" "
      >
        {" "}
        Login now!
      </span>
    </p>
  );
  const handleRegistration = async () => {
    try {
      await authApi.createAccount(form.getFieldsValue());
      message.success({
        content: content(),
        key: "register_key",
      });
    } catch (error) {
      console.log("[ERROR]-", error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Form
        className={cx("form-register")}
        form={form}
        onFinish={handleRegistration}
      >
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
            className={cx("register-btn")}
          >
            SIGN UP
          </Button>
          <Typography.Paragraph className={cx("login-link")}>
            Already have an account ? <Link to="/login">Sign in</Link>
          </Typography.Paragraph>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
