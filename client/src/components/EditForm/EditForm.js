import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import productsApi from "../../api/productsApi";
import { ArrowLeftOutlined } from "@ant-design/icons";

function EditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
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
    const getProduct = async () => {
      try {
        const data = await productsApi.getAllProducts();
        const product = data.find((prod) => prod.key === id);
        form.setFieldsValue({
          name: product.name,
          price: product.price,
          brand: product.brand,
        });
      } catch (error) {
        console.log("Error - ", error);
      }
    };
    getProduct();
  }, [id, form]);

  const handleUpdateProduct = async (product) => {
    form.resetFields();
    try {
      productsApi.updateProductById(id, product);
      success();
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  const success = () => {
    message.success("Update successful!");
  };
  return (
    <>
      <Link style={{ margin: 16, display: "block" }} to="/products">
        <Button icon={<ArrowLeftOutlined />}></Button>
      </Link>
      <Form
        style={{ marginTop: 24 }}
        form={form}
        onFinish={handleUpdateProduct}
      >
        <Form.Item
          {...formTailLayout}
          name="name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please input your product name",
            },
          ]}
        >
          <Input placeholder="Please input your product name" />
        </Form.Item>
        <Form.Item
          {...formTailLayout}
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input your product price",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          {...formTailLayout}
          name="brand"
          label="Brand of Product"
          rules={[
            {
              required: true,
              message: "Please input your product brand",
            },
          ]}
        >
          <Input placeholder="Please input your product brand" />
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
