import React, { useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import { useApp } from "../../hooks/hooks";
import { storage } from "../../app/services";
import styles from "./Store.module.scss";

const cx = className.bind(styles);
function ProductItem({ id, name, price, thumbnailUrl }) {
  const [amount, setAmount] = useState(1);
  const { cart, setCart } = useApp();
  const { getStoreItem, setStoreItem } = storage("cart");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleAddProductIntoCart = () => {
    setStoreItem({
      id,
      name,
      price,
      amount,
    });

    setCart(getStoreItem());
    setAmount(1);
  };

  const handleIncreaseProduct = () => {
    setAmount(amount + 1);
  };

  const handleDecreaseProduct = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };
  return (
    <div className={cx("product-item")}>
      <div className={cx("info")}>
        <h5 className={cx("name")}>{name}</h5>
        <p className={cx("price")}>{formatter.format(price)}</p>
        {!cart?.some((prod) => prod.id === id) && (
          <div className={cx("quantity")}>
            <button onClick={handleIncreaseProduct} className={cx("increase")}>
              &#43;
            </button>
            <span className={cx("number")}>{amount}</span>
            <button onClick={handleDecreaseProduct} className={cx("decrease")}>
              &#8722;
            </button>
          </div>
        )}
      </div>
      <img className={cx("thumbnail")} src={thumbnailUrl} alt={name} />
      {cart?.some((prod) => prod.id === id) ? (
        <p>Added!</p>
      ) : (
        <button onClick={handleAddProductIntoCart} className={cx("add-btn")}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
};
export default ProductItem;
