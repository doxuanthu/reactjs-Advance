import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import { Row, Col, Badge, Avatar } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import ProductItem from "./ProductItem";
import CartDetail from "./CartDetail";
import { useApp } from "../../hooks/hooks";
import storeApi from "../../api/storeApi";
import User from "../../components/User/User";
import styles from "./Store.module.scss";

const cx = className.bind(styles);
function Store() {
  const { visibleCart, setVisibleCart, numberOfProductsInCart } = useApp();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      let _products = await storeApi.getProducts();
      _products = _products.filter(
        (prod) => prod.category_id === "-NCQCnu_1ASkxu7wlFrO"
      );
      setProducts(_products);
    }

    getProducts();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <section className={cx("cart")} onClick={() => setVisibleCart(true)}>
        <Badge count={numberOfProductsInCart}>
          <ShoppingCartOutlined style={{ fontSize: 40 }} />
        </Badge>
      </section>
      <User />
      {visibleCart && <section className={cx("cart-detail")}></section>}
      <CartDetail />
      <h2 className={cx("title")}>Shopping Cart App</h2>
      <Row justify="center" gutter={[16, 16]}>
        {products &&
          !!products.length &&
          products.map((product) => {
            return (
              <Col key={product.key} xs={24} sm={12} lg={8} xl={6}>
                <ProductItem
                  id={product.key}
                  name={product.name}
                  price={product.price}
                  thumbnailUrl={product.thumbnailUrl}
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default Store;
