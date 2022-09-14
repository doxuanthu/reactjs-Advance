import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import storeApi from "../../api/storeApi";
import { ArrowLeftOutlined } from "@ant-design/icons";

function EditForm() {
  const navigate = useNavigate();
  const { section, id } = useParams();
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

  useEffect(() => {
    const findById = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/api/store/${section}/${id}`
        );
        form.setFieldsValue({
          name: data.data.name,
        });
      } catch (error) {
        console.log("Error - ", error);
      }
    };
    findById();
  }, [section, id, form]);

  const handleUpdate = async (payload) => {
    form.resetFields();
    try {
      section === "categories"
        ? storeApi.updatecategoryById(id, payload)
        : storeApi.updatebrandById(id, payload);
      success();
      navigate("/store");
    } catch (error) {
      console.log(error);
    }
  };
  const success = () => {
    message.success("Update successful!");
  };
  return (
    <>
      <Link style={{ margin: 16, display: "block" }} to="/store">
        <Button icon={<ArrowLeftOutlined />}></Button>
      </Link>
      <Form style={{ marginTop: 24 }} form={form} onFinish={handleUpdate}>
        <Form.Item
          {...formTailLayout}
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input data",
            },
          ]}
        >
          <Input placeholder="Please input data" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default EditForm;
