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

// this is time and date function
export const getDateTimeFormat = (date: Date | string): string => {
  const d = new Date(date);

  const pad = (num: number) => num.toString().padStart(2, "0");

  const day = d.getDate();
  const month = d.toLocaleString("en-GB", { month: "short" });
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = pad(d.getMinutes());
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
};
