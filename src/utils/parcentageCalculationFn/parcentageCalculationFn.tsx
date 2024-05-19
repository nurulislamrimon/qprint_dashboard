import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

export const calculatePercentageDifference = (
  last30days: number,
  last60days: number
): { percentage: number; icon: React.ReactNode } => {
  let percentage = 0;
  let icon: React.ReactNode = null;

  if (last30days === 0) {
    percentage = last60days > 0 ? 100 : 0;
    if (percentage > 0) {
      icon = <IconTrendingUp style={{ color: "green" }} />;
    }
  } else {
    const firstMonth = last60days - last30days;
    percentage = ((firstMonth - last30days) / firstMonth) * 100;

    if (percentage <= 0) {
      icon = <IconTrendingUp style={{ color: "green" }} />;
    } else if (percentage >= 0) {
      icon = <IconTrendingDown style={{ color: "red" }} />;
    }
  }

  return { percentage, icon };
};
