export const printInvoiceFn = () => {
  window.print();
};

export const generateOptions = (status: any) => {
  switch (status) {
    case "Order placed":
      return ["Update Status", "Packaging", "Rejected"];
    case "Packaging":
      return ["Update Status", "Shipping", "Rejected"];
    case "Shipping":
      return ["Update Status", "Delivered", "Returned"];
    case "Delivered":
      return ["Delivered", "Returned"];
    case "Pending":
      return ["Update Status", " Order placed", "Rejected"];
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
