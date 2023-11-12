import BreadCrumbs from "@/components/admin/breadcrumbs";
import { AdminLayout } from "@/layouts";
import React from "react";
import AdminTable from "@/components/table";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useGetProducts } from "@/hooks/admin/products";
import Load from "@/components/Loader/Loader";
import moment from "moment";

const Products = () => {
  const { data, isFetching } = useGetProducts({
    page: 1,
    pageSize: 10,
  });

  const columns = [
    {
      title: "Product",
      dataIndex: "productTitle",
      key: "productTitle",
      render: (productTitle, x) => {
        return (
          <Link href={`/admin/products/${x?.id}`}>
            <a className=" tw-text-[#1D1616]">{productTitle}</a>
          </Link>
        );
      },
    },
    {
      title: "Vendor",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.fullName,
    },
    {
      title: "Unit Price",
      dataIndex: "options",
      key: "options",
      render: (options) => `N${options[0]?.price}`,
    },
    {
      title: "Sold",
      key: "sales",
      dataIndex: "sales",
      render: (sales) => sales?.length,
    },
    {
      title: "Date Uploaded",
      key: "dateCreated",
      dataIndex: "dateCreated",
      render: (date) => moment(new Date(date)).format("MMM D, YYYY | h:MM A"),
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <span>
          <DotsVerticalIcon className="tw-h-5 tw-w-5" />
        </span>
      ),
    },
  ];

  const dataj = [
    {
      key: "1",
      product: "Nestle Milo CRUNCHY CEREALS 320g",
      vendor: "Coco's Body Beauty",
      unit_price: "N13,000",
      sold: 230,
      date_uploaded: "Nov 12, 2021 | 9:53 AM",
    },
    {
      key: "2",
      product: "Nestle Milo CRUNCHY CEREALS 320g",
      vendor: "Coco's Body Beauty",
      unit_price: "N13,000",
      sold: 230,
      date_uploaded: "Nov 12, 2021 | 9:53 AM",
    },
    {
      key: "3",
      product: "Nestle Milo CRUNCHY CEREALS 320g",
      vendor: "Coco's Body Beauty",
      unit_price: "N13,000",
      sold: 230,
      date_uploaded: "Nov 12, 2021 | 9:53 AM",
    },
    {
      key: "4",
      product: "Nestle Milo CRUNCHY CEREALS 320g",
      vendor: "Coco's Body Beauty",
      unit_price: "N13,000",
      sold: 230,
      date_uploaded: "Nov 12, 2021 | 9:53 AM",
    },
  ];
  return (
    <AdminLayout>
      <BreadCrumbs
        items={[
          { name: "Dashboard", path: "/admin/dashboard" },
          { name: "Products", path: "/admin/products" },
        ]}
        header="Product"
      />
      {isFetching ? (
        <Load />
      ) : (
        <div className=" tw-pt-7">
          <AdminTable
            select
            data={data?.products?.objects?.map((item, indx) => ({
              ...item,
              key: indx,
            }))}
            columns={columns}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default Products;
