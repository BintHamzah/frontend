import React from "react";
import Image from "next/image";
import styles from "./ProductFilled.module.scss";
import StarRatingComponent from "react-star-rating-component";
import { ProductType } from "@/interfaces/commonTypes";
import useAvgRating from "@/hooks/useAvgRating";
import usePromotions from "@/hooks/usePromotions";
import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";

const ProductFilled = function ({ product, setShowProduct, setProduct }) {
  const {
    user: { token },
  } = useSelector((state: RootState) => state);
  const { status, data, error } = usePromotions(token);
  console.log(data);

  function displayProductDetails(prod: any) {
    setShowProduct(true);
    setProduct(prod);
  }

  return (
    <section className="tw-shadow-lg">
      <div className={styles.filled}>
        <div className={styles.products}>
          <div className="tw-text-lg tw-font-semibold">
            All Products - {product.length}
          </div>
          <div className={styles.sort}>
            <p className="">Sort by: </p>
            <select className="tw-ml-2" value="" onChange={() => null}>
              <option>Most Popular</option>
              <option>Recent</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Product Rating</option>
            </select>
          </div>
        </div>
        <div className="tw-grid tw-gap-3 tw-grid-cols-3 lg:tw-grid-cols-4 tw-mt-2">
          {product.map((prod: ProductType) => (
            <div
              key={prod.id}
              className="tw-shadow-lg tw-cursor-pointer"
              onClick={() => displayProductDetails(prod)}
            >
              <Image
                src={prod.image[0].imageUrl}
                alt={prod.productTitle}
                layout="responsive"
                width={200}
                height={200}
              />
              <div className="tw-flex tw-justify-between tw-p-3">
                <div>
                  <p className="tw-text-lg tw-font-semibold tw-mb-0">
                    {prod.productTitle}
                  </p>
                  <StarRatingComponent
                    name="seller-product"
                    starCount={5}
                    value={useAvgRating(prod)}
                    editing={false}
                    emptyStarColor="#c4c4c4"
                    starColor="#ffc107"
                  />
                </div>
                <div>
                  <p className="tw-text-lg tw-font-semibold tw-mb-0">
                    {prod.options[0].price}
                  </p>
                  <p>{prod?.productRating.length} reviews</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFilled;
