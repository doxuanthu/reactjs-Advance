import React from "react";
import { Form, Input, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useApp, useAuth } from "../../hooks/hooks";
import authApi from "../../api/authApi";

function ModalChangePassword() {
  const {
    user: { key },
    setUser,
  } = useAuth();
  const { visibleModal, setVisibleModal } = useApp();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleOk = async () => {
    const _newPassword = form.getFieldValue("new_password");
    const _confirmPassword = form.getFieldValue("confirm_new_password");
    if (
      !_newPassword ||
      !_confirmPassword ||
      _newPassword !== _confirmPassword
    ) {
      return;
    }

    try {
      const response = await authApi.updatePassword(key, {
        password: _newPassword,
      });
      console.log({ response });
      message.success({
        content: "Password changed successfully! Login again to use.",
        key: "pass-changed",
      });
      form.resetFields();
      setVisibleModal(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("[ERROR]: ", error);
      message.error("Failed, please try again!");
    }
  };
  const handleCancel = () => {
    setVisibleModal(false);
    form.resetFields();
  };

  return (
    <Modal
      open={visibleModal}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Password Change Form"
      okText="Save"
    >
      <Form form={form} onFinish={handleOk} layout="vertical">
        <Form.Item
          label="New Password"
          name="new_password"
          rules={[
            {
              required: true,
              message: "Please enter your new password",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirm_new_password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please re-enter your new password to comfirm",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalChangePassword;
