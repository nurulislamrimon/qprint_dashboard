import ReviewNavigationBar from "@/components/review/ReviewNavigationBar";
import TopBar from "@/components/shared/TopBar";

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* ===TopBar=== */}
      <div>
        <TopBar title="Review" />
      </div>
      {/* ===Main Content=== */}
      <div className="mt-1 bg-white">
        <div className="border-b">
          <ReviewNavigationBar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ReviewLayout;
