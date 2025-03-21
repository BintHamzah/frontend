// import CartGrid from 'cartgridcomponent.module.scss'
import { getIp } from "@/helpers";
import { AddToCartPayload, DeleteFromCartPayload } from "@/interfaces/commonTypes";
import {
  addToCartFunc,
  deleteCartItem,
  deleteItemInCart,
  getCartFunc,
} from "@/store/cart/cart.actions";
import { RootState } from "@/store/rootReducer";
import Image from "next/legacy/image";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import styles from "./cartGrid.module.scss";
import mobileStyles from "./cartgridcomponent.module.scss";

const CartGridComponent = function () {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  function deleteItemFromCart(itemId: string, cartId: string) {
    const payload = {
      itemId,
      cartId,
      token: user.token,
    };
    deleteCartItem(payload)(dispatch);
    getCartFunc(user.token)(dispatch);
  }

  async function increaseQuantity(productId: string) {
    const payload: AddToCartPayload = {
      productOptionId: productId,
      token: user.token,
      quantity: 1,
      ipAddress: await getIp(),
    };
    addToCartFunc(payload, user.token)(dispatch);
    getCartFunc(user.token)(dispatch);
  }

  async function decreaseQuantity(itemId: string, cartId: string) {
    const payload: DeleteFromCartPayload = {
      itemId,
      cartId,
    };
    user.token ? (payload["token"] = user.token) : (payload["ip"] = await getIp());
    deleteItemInCart(payload)(dispatch);
    getCartFunc(user.token)(dispatch);
  }

  const getParticularProductInCart = optionId => {
    const cartProduct = cart?.cart?.find(cartItem => cartItem?.productOptionId === optionId);

    return cartProduct;
  };

  const getParticularProductOptionInCart = optionId => {
    const cartProduct = cart?.cart?.find(cartItem => cartItem?.productOptionId === optionId);
    const option = cartProduct?.product?.options?.find(option => option?.id === optionId);

    return option;
  };

  return (
    <>
      <div className={`${styles.items_content} tw-hidden md:tw-flex tw-flex-col`}>
        {cart.cart.map(item => (
          <div key={item.id} className={styles.grid}>
            <div className={styles.firstBox}>
              <div className={styles.imgbox}>
                <Image
                  src={item.product.image[0].imageUrl}
                  width='120'
                  height='120'
                  className={styles.img}
                />
                <button onClick={() => deleteItemFromCart(item.id, item.cart.id)}>
                  <i className='fas fa-times' />
                </button>
              </div>
              <div className={styles.item_desc}>
                <p className={styles.seller}>
                  Seller:{" "}
                  {item.product?.user?.sellerprofile
                    ? item.product?.user?.sellerprofile[0]?.shopName
                    : ""}
                </p>
                <p className={styles.name}>{item.product.productTitle}</p>

                {getParticularProductOptionInCart(item?.productOptionId)?.size ? (
                  <div className={""}>
                    <span className={"tw-font-medium tw-text-gray-kwek700"}>Size: </span>
                    <span className={""}>
                      {getParticularProductOptionInCart(item?.productOptionId)?.size}
                    </span>
                  </div>
                ) : null}

                {getParticularProductOptionInCart(item?.productOptionId)?.color ? (
                  <div className={""}>
                    <span className={"tw-font-medium tw-text-gray-kwek700"}>Color: </span>
                    <span className={""}>
                      {getParticularProductOptionInCart(item?.productOptionId)?.color}
                    </span>
                  </div>
                ) : null}

                {item.product?.brand ? (
                  <div className={""}>
                    <span className={"tw-font-medium tw-text-gray-kwek700"}>Brand: </span>
                    <span className={""}>{item.product?.brand}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className={styles.secondBox}>
              <p
                className={
                  getParticularProductOptionInCart(item?.productOptionId).discountedPrice
                    ? styles.discount_price
                    : styles.current_price
                }
              >
                ₦{getParticularProductOptionInCart(item?.productOptionId).price}
              </p>
              {getParticularProductOptionInCart(item?.productOptionId).discountedPrice ? (
                <p className={styles.current_price}>
                  ₦{getParticularProductOptionInCart(item?.productOptionId).discountedPrice}
                </p>
              ) : null}
            </div>

            <div className={styles.thirdBox}>
              <div className={styles.addbtn}>
                <button
                  disabled={
                    Number(item?.quantity) <= 0 ||
                    Number(getParticularProductOptionInCart(item?.productOptionId)?.quantity) <= 0
                  }
                  onClick={() => decreaseQuantity(item.id, item.cart.id)}
                >
                  -
                </button>
                <p className={styles.qty}>{item.quantity}</p>
                <button
                  disabled={
                    Number(item?.quantity) >=
                    Number(getParticularProductOptionInCart(item?.productOptionId)?.quantity)
                  }
                  onClick={() => increaseQuantity(item.productOptionId)}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.forthBox}>
              <p className={styles.subtotal}>₦{item.price * item?.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      {cart.cart.map(item => (
        <div
          key={v4()}
          className={`${mobileStyles.cartContainer} tw-border-b tw-pb-5 tw-mt-5 tw-border-gray-kwek100 tw-flex md:tw-hidden `}
        >
          <div className={mobileStyles.imageWrapper}>
            <Image src={item.product.image[0].imageUrl} width='120' height='150' />
            <button
              className={mobileStyles.closeBtn}
              onClick={() => deleteItemFromCart(item.id, item.cart.id)}
            >
              <i className='fas fa-times' />
            </button>
          </div>
          <div className='tw-ml-7 tw-flex-[2]'>
            <div>
              <span className='tw-text-xs tw-text-gray-kwek100'>
                {/* Seller: {item.product?.user?.sellerprofileSet[0]?.shopName} */}
              </span>
            </div>
            <div className='tw-mb-4'>
              <span className='tw-text-black-stock tw-text-sm tw-font-semibold'>
                {item.product.productTitle}
              </span>
            </div>
            <div className='tw-flex'>
              <button
                onClick={() => decreaseQuantity(item.id, item.cart.id)}
                className='tw-border tw-py-2 tw-px-2.5 tw-rounded-l'
              >
                {" "}
                -
              </button>
              <span className='tw-border tw-py-2 tw-px-6 tw-font-semibold'>{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.product.options[0].id)}
                className='tw-border tw-p-2 tw-px-2.5 tw-rounded-r'
              >
                +
              </button>
            </div>
          </div>
          <div className='tw-flex tw-flex-col tw-flex-[1]'>
            <span className='tw-text-base tw-text-black-stock tw-font-semibold'>₦{item.price}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartGridComponent;
