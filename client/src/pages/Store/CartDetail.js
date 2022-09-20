import React, { useEffect } from "react";
import className from "classnames/bind";
import { CloseSquareOutlined } from "@ant-design/icons";
import { useApp } from "../../hooks/hooks";
import { storage } from "../../app/services";
import styles from "./Store.module.scss";

const cx = className.bind(styles);
function CartDetail() {
  const {
    visibleCart,
    setVisibleCart,
    cart,
    setCart,
    numberOfProductsInCart,
    setNumberOfProductsInCart,
  } = useApp();
  const { getStoreItem, removeStoreItem, updateStoreItem } = storage("cart");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    setNumberOfProductsInCart(
      cart.reduce((total, curr) => {
        return total + curr.amount;
      }, 0)
    );
  }, [numberOfProductsInCart, setNumberOfProductsInCart, cart]);

  const calculateTotalProductBill = (cart) => {
    return cart.reduce((total, curr) => {
      return total + curr.amount * curr.price;
    }, 0);
  };

  const handleIncreaseProduct = (id) => {
    const newCart = cart.map((prod) =>
      prod.id === id ? { ...prod, amount: prod.amount + 1 } : prod
    );
    updateStoreItem(newCart);
    setCart(getStoreItem());
  };

  const handleDecreaseProduct = (id) => {
    const newCart = cart.map((prod) =>
      prod.id === id && prod.amount > 1
        ? { ...prod, amount: prod.amount - 1 }
        : prod
    );
    updateStoreItem(newCart);
    setCart(getStoreItem());
  };

  const handleRemoveProduct = (id) => {
    const newCart = [...cart];
    const index = cart.findIndex((prod) => prod.id === id);
    newCart.splice(index, 1);

    removeStoreItem(newCart);
    setCart(getStoreItem());
  };

  return (
    <div
      style={{ transform: `translateX(${visibleCart ? 0 : 300 + "px"})` }}
      className={cx("cart-container")}
    >
      <CloseSquareOutlined
        className={cx("close")}
        onClick={() => setVisibleCart(false)}
      />
      {!!cart.length ? (
        <div className={cx("has-product")}>
          <div className={cx("total")}>
            <p className={cx("amount")}>Items: {numberOfProductsInCart}</p>
            <p className={cx("total-bill")}>
              Total Price: {formatter.format(calculateTotalProductBill(cart))}
            </p>
          </div>
          <div className={cx("list-products")}>
            {cart?.map((prod) => (
              <div key={prod.id}>
                <span className={cx("item-name")}>{prod.name}</span>
                <span>
                  {prod.amount} x {prod.price} &#10230;{" "}
                  {formatter.format(prod.amount * prod.price)}
                </span>
                <div className={cx("control")}>
                  <button onClick={() => handleIncreaseProduct(prod.id)}>
                    &#43;
                  </button>
                  <button onClick={() => handleDecreaseProduct(prod.id)}>
                    &#8722;
                  </button>
                  <button
                    onClick={() => handleRemoveProduct(prod.id)}
                    className={cx("remove")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className={cx("no-product")}>Cart is empty</p>
      )}
    </div>
  );
}

export default CartDetail;
