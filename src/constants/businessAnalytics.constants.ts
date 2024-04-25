import onShippingIcon from "@/assets/onShippingIcon.svg";
import confirmedOrder from "@/assets/confirmedOrder.svg";
import pandingOrderIcon from "@/assets/paddingOrderIcon.svg";
import Packaging from "@/assets/packagingIcon.svg";

export const businessAnalytics = [
  {
    id: 1,
    icon: pandingOrderIcon,
    statusName: "Order Placed",
    itemQuantity: "1420",
  },
  {
    id: 2,
    icon: Packaging,
    statusName: "Packaging",
    itemQuantity: "820",
  },
  {
    id: 3,
    icon: onShippingIcon,
    statusName: "On shipping",
    itemQuantity: "750",
  },
  {
    id: 4,
    icon: confirmedOrder,
    statusName: "Confirmed Order",
    itemQuantity: "720",
  },
];
// console.log(businessAnalytics);
