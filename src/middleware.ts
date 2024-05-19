import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getBaseUrl } from "./helpers/config/envConfig";
import { isAuthorizedRole } from "./utils/isAuthorizedRole";

// Middleware function to check authorization
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const res = await fetch(getBaseUrl() + "/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (!data || data?.success !== true || !isAuthorizedRole(data?.data?.role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Allow access if the user is authorized
}

// Config to exclude specific routes from middleware
export const config = {
  matcher: [
    "/dashboard",
    "/analytics",
    "/pos",
    "/pos/pos-order",
    "/printing",
    // order
    "/order",
    "/order/:path*",
    "/order/quick-order",
    "/order/order-placed",
    "/order/packaging",
    "/order/shipping",
    "/order/delivered",
    "/order/cancel",
    "/order/returned",
    "/order/rejected",
    // product
    "/products",
    "/add-product",
    "/products/:path*",
    "/products/edit-product/:path*",
    "/products/edit-product/:path*",
    "/products/stock-alert",
    "/brand",
    "/category",
    // promotions
    "/promotion",
    "/promotion/best-deals",
    "/promotion/deals-of-the-day",
    "/promotion/widget",
    // customers
    "/customers",
    "/customers/:path*",

    "/review",
    // shop setup
    "/shop-setup/delivery-fee",
    "/shop-setup/quick-order",
    "/shop-setup/req-printing-setup",
    "/shop-setup/social-media-chat",
    "/shop-setup/seo",
    "/users",
  ],
};
