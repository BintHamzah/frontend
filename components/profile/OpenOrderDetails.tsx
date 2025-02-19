import { RootState } from "@/store/rootReducer";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useAtom } from "jotai";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { useGetOrdersAdmin } from "../../hooks/admin/orders";
import { OrderDeliveryStatus } from "../../validations/orders";
import Load from "../Loader/Loader";
import { activeOrderIdAtom } from "./active-button-atom";
import { OrderDetailsProps } from "./ClosedOrderDetails";
import Details from "./Details";
import Payment from "./Payment";
dayjs.extend(LocalizedFormat);

const OpenOrderDetails = function ({ setActiveBtn }: OrderDetailsProps) {
  const [orderId, setOrderId] = useAtom(activeOrderIdAtom);
  const user = useSelector((state: RootState) => state.user);
  const { data, isLoading } = useGetOrdersAdmin({
    token: user.token,
    id: orderId,
  });
  const order = data?.order;
  console.log("🚀 ~~ OpenOrderDetails ~~ order:", order);

  return (
    <>
      {isLoading && <Load />}
      {order && (
        <div className='tw-p-2 md:tw-p-5 tw-bg-white-100'>
          <div className='tw-border-b tw-border-gray-500 tw-border-opacity-50'>
            <h4 className='tw-text-black-stock tw-font-semibold tw-text-base md:tw-text-xl lg:tw-text-3xl tw-capitalize'>
              <i
                className='fas fa-arrow-left tw-mr-2'
                onClick={() => {
                  setActiveBtn("My Orders");
                  setOrderId(undefined);
                }}
              />
              order details
            </h4>
          </div>
          <table className='tw-table-fixed tw-w-full'>
            <tbody>
              <tr className=''>
                <td className='tw-text-left tw-font-semibold tw-text-base lg:tw-text-xl tw-text-black-stock tw-w-2/4'>
                  Order No. {order.orderId}
                </td>
                <td className='tw-text-right tw-font-normal tw-text-sm md:tw-text-base tw-text-black-stock tw-w-2/4'>
                  {order?.cartItems?.length} items
                </td>
              </tr>
              <tr>
                <td className='tw-text-left tw-font-medium tw-text-base tw-text-black-stock tw-w-2/4'>
                  Placed on:
                </td>
                <td className='tw-text-right tw-font-normal tw-text-sm md:tw-text-base tw-text-black-stock tw-w-2/4'>
                  {dayjs(order.dateCreated).format("DD-MM-YYYY")}
                </td>
              </tr>
              <tr>
                <td className='tw-text-left tw-font-medium tw-text-base tw-text-black-stock tw-w-2/4'>
                  Total:
                </td>
                <td className='tw-text-right tw-font-normal tw-text-sm md:tw-text-base tw-text-black-stock tw-w-2/4'>
                  NGN {Number(order.orderPriceTotal).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
          <div className='tw-mt-4'>
            <div className='tw-mb-2'>
              <span className='tw-border-b tw-border-red-kwek100 tw-text-red-kwek100 tw-uppercase tw-pb-3'>
                items ({order?.cartItems?.length})
              </span>
            </div>
            <div className='tw-pt-5'>
              {order?.cartItems?.map((item: any, index: number) => (
                <Details
                  key={v4()}
                  order={order}
                  idx={index}
                  show={order.deliveryStatus === OrderDeliveryStatus.Delivered}
                  setActiveBtn={setActiveBtn}
                />
              ))}
            </div>
          </div>
          <div className='tw-mt-6 tw-flex md:tw-flex-row tw-flex-col tw-gap-2'>
            <Payment order={order} />
          </div>
        </div>
      )}
    </>
  );
};

export default OpenOrderDetails;
