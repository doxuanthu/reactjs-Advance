import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import storeApi from "../../api/storeApi";
import { ArrowLeftOutlined } from "@ant-design/icons";

function AddForm() {
  const navigate = useNavigate();
  const { section } = useParams();
  const [form] = Form.useForm();
  const formTailLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
      offset: 1,
    },
  };

  const handleGenerate = async (payload) => {
    form.resetFields();
    try {
      section === "categories"
        ? storeApi.addNewCategory(payload)
        : storeApi.addNewbrand(payload);
      success();
      navigate("/store");
    } catch (error) {
      console.log(error);
    }
  };
  const success = () => {
    message.success("successfully!");
  };
  return (
    <>
      <Link style={{ margin: 16, display: "block" }} to="/store">
        <Button icon={<ArrowLeftOutlined />}></Button>
      </Link>
      <Form style={{ marginTop: 24 }} form={form} onFinish={handleGenerate}>
        <Form.Item
          {...formTailLayout}
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your product name",
            },
          ]}
        >
          <Input placeholder="Please input your product name" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddForm;
