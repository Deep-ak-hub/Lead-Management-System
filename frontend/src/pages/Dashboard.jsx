import { useEffect } from "react";
import UserList from "../components/UserList";
import LeadsSummary from "../components/LeadsSummary";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
      <LeadsSummary />
      <UserList />
    </div>
  );
};

export default Dashboard;
