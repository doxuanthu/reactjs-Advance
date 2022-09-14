import React, { useEffect, useState } from "react";
import { Button, Space, Table, Popconfirm } from "antd";
import { AppstoreAddOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import storeApi from "../../api/storeApi";
import styles from "./Store.module.scss";

const cx = className.bind(styles);
function Store() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    Promise.all([getCategories(), getBrands()])
      .then(([cate, brands]) => {
        setCategories(cate);
        setBrands(brands);
      })
      .catch((err) => {
        console.log("[ERROR] - ", err);
      });
  }, []);

  const getCategories = () => {
    return storeApi.getCategories();
  };

  const getBrands = () => {
    return storeApi.getbrands();
  };

  const handleDeleteCategory = (key) => {
    return new Promise((resolve) => {
      storeApi.deleteCategoryById(key);
      setTimeout(() => {
        resolve(null);
      }, 500);
    }).then(async () => {
      const data = await getCategories();
      setCategories(data);
    });
  };

  const handleDeleteBrand = (key) => {
    return new Promise((resolve) => {
      storeApi.deleteBrandById(key);
      setTimeout(() => {
        resolve(null);
      }, 500);
    }).then(async () => {
      const data = await getBrands();
      setBrands(data);
    });
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space direction="horizontal" size="middle">
            <Link to={`categories/edit/${record.key}`}>Edit</Link>
            <Popconfirm
              title="Are you sure you want to delete this category ?"
              onConfirm={() => handleDeleteCategory(record.key)}
            >
              <Link to="">Delete</Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const columnsBrands = [
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space direction="horizontal" size="middle">
            <Link to={`brands/edit/${record.key}`}>Edit</Link>
            <Popconfirm
              title="Are you sure you want to delete this brand ?"
              onConfirm={() => handleDeleteBrand(record.key)}
            >
              <Link to="">Delete</Link>
            </Popconfirm>
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
      <Link to="categories/new">
        <Button
          icon={<AppstoreAddOutlined />}
          style={{ marginBottom: 30 }}
          type="primary"
        >
          Add New Category
        </Button>
      </Link>
      <Table
        bordered
        title={() => "Categories Management Table"}
        dataSource={categories}
        columns={columns}
      />

      <Link to="brands/new">
        <Button
          icon={<AppstoreAddOutlined />}
          style={{ marginBottom: 30 }}
          type="primary"
        >
          Add New Brand
        </Button>
      </Link>
      <Table
        bordered
        title={() => "Brands Management Table"}
        dataSource={brands}
        columns={columnsBrands}
      />
    </div>
  );
}

export default Store;
