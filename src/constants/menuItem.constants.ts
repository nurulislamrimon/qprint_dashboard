import { IMenuItem } from "@/interfaces/menu-interface";

export const menuItems: IMenuItem[] = [
  {
    label: "Dashboard",
    key: "dashboard",
    link: "/dashboard",
  },
  {
    label: "Analytics",
    key: "analytics",
    link: "/analytics",
  },
  {
    label: "POS",
    key: "pos",
    link: "/pos",

    children: [
      {
        label: "Pos",
        key: "childrenPos",
        link: "",
      },
      {
        label: "Sales",
        key: "sales",
        link: "/pos-order",
        notify: 5,
      },
    ],
  },
  {
    label: "Printing Requests",
    key: "printing",
    link: "/printing",
  },
  {
    label: "Order",
    key: "order",
    link: "/order",

    children: [
      {
        label: "All Order",
        key: "allOrder",
        link: "",
        notify: 3,
      },
      {
        label: "Pending",
        key: "pending",
        link: "/pending",
        notify: 50,
      },
      {
        label: "Quick Order",
        key: "quickOrder",
        link: "/quick-order",
        notify: 45,
      },

      {
        label: "Order Placed",
        key: "orderPlaced",
        link: "/order-placed",
        notify: 40,
      },
      {
        label: "Packaging",
        key: "packaging",
        link: "/packaging",
        notify: 5,
      },
      {
        label: "Shipping",
        key: "shipping",
        link: "/shipping",
        notify: 6,
      },
      {
        label: "Delivered",
        key: "delivered",
        link: "/delivered",
        notify: 18,
      },
      {
        label: "Cancel",
        key: "cancel",
        link: "/cancel",
        notify: 5,
      },
      {
        label: "Returned",
        key: "Returned",
        link: "/returned",
        notify: 10,
      },
      {
        label: "Rejected",
        key: "Rejected",
        link: "/rejected",
        notify: 10,
      },
    ],
  },
  {
    label: "Products",
    key: "products",
    link: "/products",

    children: [
      {
        label: "All Products",
        key: "allProducts",
        link: "",
        notify: 5,
      },
      {
        label: "Stock Alert",
        key: "stockAlert",
        link: "/stock-alert",
        notify: 20,
      },
    ],
  },
  {
    label: "Brand",
    key: "brand",
    link: "/brand",
  },
  {
    label: "Category",
    key: "category",
    link: "/category",
  },
  {
    label: "Promotion",
    key: "promotion",
    link: "/promotion",

    children: [
      {
        label: "Slider",
        key: "slider",
        link: "",
      },
      {
        label: "Best Deals",
        key: "bestdeals",
        link: "/best-deals",
      },
      {
        label: "Deals Of The Day",
        key: "dealsOfTheDay",
        link: "/deals-of-the-day",
      },
      {
        label: "Widget",
        key: "widget",
        link: "/widget",
      },
    ],
  },
  {
    label: "Customers",
    key: "customers",
    link: "/customers",
  },
  {
    label: "Review",
    key: "review",
    link: "/review",
  },
  {
    label: "Shop Setup",
    key: "shop-setup",
    link: "/shop-setup",
  },
  {
    label: "Users",
    key: "users",
    link: "/users",
  },
];
