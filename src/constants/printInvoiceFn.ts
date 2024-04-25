export const printInvoiceFn = () => {
  window.print();
};

export const generateOptions = (status: any) => {
  switch (status) {
    case "Order placed":
      return ["Order placed", "Packaging"];
    case "Packaging":
      return ["Packaging", "Shipping"];
    case "Shipping":
      return ["Shipping", "Delivered"];
    case "Delivered":
      return ["Delivered", "Returned"];
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
