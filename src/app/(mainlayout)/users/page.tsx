import TopBar from "@/components/shared/TopBar";
import UserPageContent from "@/components/users/UserPageContent";

const Users = () => {
  return (
    <div>
      <div>
        <TopBar title="Users" />
      </div>
      <div className="h-[calc(100vh-90px)]">
        <UserPageContent />
      </div>
    </div>
  );
};

export default Users;
