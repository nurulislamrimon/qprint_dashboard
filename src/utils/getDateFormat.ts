export const getDateFormat = (date: Date | string): string | number => {
  return (
    new Date(date)?.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) || ""
  );
};

export const getExpireInAtDays = (expireDate: Date | string): number => {
  return Math.round(
    (new Date(expireDate).getTime() - new Date().getTime()) / 86400000
  );
};
