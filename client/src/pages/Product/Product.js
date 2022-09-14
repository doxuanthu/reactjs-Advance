import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { AppstoreAddOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import productsApi from "../../api/productsApi";
import styles from "./Product.module.scss";

const cx = className.bind(styles);
function Product() {
  const [products, setProducts] = useState();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await productsApi.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error - ", error);
      }
    };
    getProduct();
  }, []);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space direction="horizontal" size="middle">
            <Link to={`edit/${record.key}`}>Edit</Link>
          </Space>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Link style={{ margin: 16, display: "block" }} to="/">
        <Button icon={<ArrowLeftOutlined />}></Button>
      </Link>
      <Link to="new">
        <Button
          icon={<AppstoreAddOutlined />}
          style={{ marginBottom: 30 }}
          type="primary"
        >
          Add New Product
        </Button>
      </Link>
      <Table
        bordered
        title={() => "Products Management Table"}
        dataSource={products}
        columns={columns}
      />
    </div>
  );
}

export default Product;
