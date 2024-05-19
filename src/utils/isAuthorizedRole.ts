export const isAuthorizedRole = (role: string) => {
  return role === "Super Admin" || role === "Admin" || role === "Manager";
};
