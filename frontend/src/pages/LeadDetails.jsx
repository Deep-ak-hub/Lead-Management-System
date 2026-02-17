import { useParams } from "react-router";
import { useGetUserByIdQuery } from "../redux/Api/UserApi";
import Loading from "../components/Loading";
import { toLocalDate } from "../utils/localdatetime";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useState } from "react";
import ProjectForm from "../features/projects/ProjectForm";
import { useGetAdminQuery } from "../redux/Api/Admin";
import { useGetProjectQuery } from "../redux/Api/Project";
import { toast } from "react-toastify";

const LeadDetails = () => {
  const { id } = useParams();
  const { data: admin } = useGetAdminQuery();
  const {
    data: lead,
    isLoading,
    error,
  } = useGetUserByIdQuery(
    { id, adminId: admin?.data?._id },
    {
      skip: !id,
    },
  );

  const { data: projects } = useGetProjectQuery({ leadId: id });

  const [selectedValue, setSelectedValue] = useState(null);

  if (!lead || isLoading) return <Loading />;
  if (error) return console.log(error);

  return (
    <div className="mx-4 p-4 rounded-lg bg-white/5 space-y-2">
      <div className="flex items-end gap-4 py-2">
        <h2 className="text-2xl text-accent font-semibold">
          {lead?.data?.name}
        </h2>
        <span className="text-accent border bg-white tet-xs rounded-full px-2">
          {lead?.data?.status}
        </span>
        {lead?.data?.status == "Follow Up" && (
          <span className="text-accent border tet-xs rounded-full px-2">
            {lead?.data?.inquiry?.toUpperCase()}
          </span>
        )}
      </div>
      <p className="text-secondary space-x-2">
        <span>{lead?.data?.email}</span>
        <span>|</span>
        <span>{lead?.data?.phone}</span>
      </p>
      {lead?.data?.status == "Follow Up" && lead?.data?.followUp && (
        <p className="text-secondary">
          Follow up: {toLocalDate(lead?.data?.followUp)}
        </p>
      )}

      {lead?.data?.service?.title && (
        <div className="flex items-center gap-4">
          <span className="py-1 px-3 bg-accent text-white rounded-full">
            {lead.data.service.title}
          </span>
          {lead?.data?.startDate && lead?.data?.endDate && (
            <div className="space-x-1 text-gray-500">
              <span>{lead?.data?.startDate?.split("T")[0]}</span>
              <span>to</span>
              <span>{lead?.data?.endDate?.split("T")[0]}</span>
            </div>
          )}
        </div>
      )}

      <hr className=" text-accent"></hr>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-accent text-lg">Projects</h3>
        <button
          onClick={() => setSelectedValue({ project: {}, action: "add" })}
          className="flex bg-accent text-white rounded-lg items-center gap-2 px-4 font-semibold py-2"
        >
          <FaPlus />
          Add Project
        </button>
      </div>
      <div className="space-x-16">
        {projects?.data?.length > 0 && (
          <table className="table-auto border-none border-gray-400 p-2 w-full my-6 rounded-lg ">
            <thead className="bg-accent">
              <tr className="text-center p-2">
                <th className="border border-gray-300 p-2">S.N</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Budget</th>
                <th className="border border-gray-300 p-2">Installments</th>
                <th className="border border-gray-300 p-2">End Date</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {projects.data?.map((project, index) => (
                <tr
                  key={project?._id}
                  className={`${project?.isComplete ? "bg-green-200" : "bg-white"}`}
                >
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2 truncate max-w-36">
                    {project.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {project.totalBudget}
                  </td>
                  <td className=" group relative border border-gray-300 p-2">
                    {project?.installments?.length}
                    {project.installments.length > 0 && (
                      <span className="font-medium hidden group-hover:flex flex-col bg-gray-200 shadow py-2 w-48 rounded-lg right-0 z-10 left-0 top-full absolute">
                        {project.installments?.map((ins) => (
                          <span>
                            {ins.amount} |{" "}
                            {ins.paidDate && toLocalDate(ins.paidDate)}
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {project.endDate
                      ? new Date(project.endDate).toLocaleDateString("en-Np", {
                          timeZone: "Asia/Kathmandu",
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })
                      : "--"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() =>
                        setSelectedValue({ project, action: "edit" })
                      }
                      className="hover:bg-accent/10 text-accent p-2 rounded"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {projects?.data?.length == 0 && (
          <p className="text-xl text-center font-medium text-secondary">
            No projects
          </p>
        )}
      </div>
      <hr className="text-accent" />
      {selectedValue && (
        <ProjectForm
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}
      {lead?.data.remarks && (
        <p className="px-4 border border-primary py-1 rounded-full text-primary w-fit">
          <span className="font-medium">Remarks: </span> {lead.data.remarks}
        </p>
      )}
    </div>
  );
};

export default LeadDetails;
