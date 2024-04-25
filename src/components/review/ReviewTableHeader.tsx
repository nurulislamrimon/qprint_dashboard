import { reviewHeaderMenu } from "@/constants/review.constants";

interface ReviewTableHeaderProps {
  label?: string;
  isHiddenSM?: boolean;
  key?: number;
}

const ReviewTableHeader = () => {
  return (
    <div className="flex items-center justify-between bg-[#F4F4F5] px-4 md:px-6 lg:px-7">
      {reviewHeaderMenu.map(
        ({ label, isHiddenSM, key }: ReviewTableHeaderProps) => (
          <div key={key} className="py-2.5">
            <span
              className={`text-sm md:text-base ${
                isHiddenSM && "hidden md:block"
              }`}
            >
              {label}
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default ReviewTableHeader;
