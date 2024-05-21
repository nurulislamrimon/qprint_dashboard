export const printInvoiceFn = () => {
  window.print();
};

export const generateOptions = (status: any) => {
  switch (status) {
    case "Order placed":
      return ["Order placed", "Packaging", "Rejected"];
    case "Packaging":
      return ["Packaging", "Shipping", "Rejected"];
    case "Shipping":
      return ["Shipping", "Delivered"];
    case "Delivered":
      return ["Delivered"];
    case "Pending":
      return ["Pending", " Order placed", "Rejected"];
    case "Returned":
      return ["Returned"];
    case "Cancelled":
      return ["Cancelled"];
    case "Rejected":
      return ["Rejected"];
    default:
      return [];
  }
};
