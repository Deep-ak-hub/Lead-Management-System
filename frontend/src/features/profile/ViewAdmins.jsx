import Loading from "../../components/Loading";
import { useGetAdminListQuery } from "../../redux/Api/Admin";

const PLAN = [
  { code: "111", plan: "No plan" },
  { code: "001", plan: "Service" },
  { code: "010", plan: "Leads" },
  { code: "011", plan: "Both" },
];

const ViewAdmins = () => {
  const { data, isFetching } = useGetAdminListQuery();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="px-4">
      <table className="border-collapse w-full">
        <thead className="sticky bg-accent font-bold top-0 z-0">
          <tr>
            <th className="p-2 border border-slate-300">S.N</th>
            <th className="p-2 border border-slate-300">Email</th>
            <th className="p-2 border border-slate-300">Plan</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {data?.data?.map((user, index) => {
            return (
              <tr key={index}>
                <td className="p-2 border text-center border-slate-200 ">
                  <p className="text-sm">{index + 1}</p>
                </td>
                <td className="p-2 border text-center border-slate-200 ">
                  <p className="">{user.email}</p>
                </td>
                <td className="p-2 border text-center border-slate-200 ">
                  <p>
                    {PLAN.find((el) => el.code === user?.purchasedPlan)?.plan}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAdmins;
