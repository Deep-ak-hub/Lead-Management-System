import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { useParams } from "react-router";
import { formatDate } from "../../utils/localdatetime";
import { toast } from "react-toastify";
import { useAddProjectMutation, useUpdateProjectMutation } from "../../redux/Api/Project";
import { useState } from "react";

const ProjectForm = ({ selectedValue, setSelectedValue }) => {
    const [updateProject] = useUpdateProjectMutation();
    const [addProject] = useAddProjectMutation()
    const { id } = useParams();

    const [updateData, setUpdateData] = useState({
        name: selectedValue?.project?.name,
        totalBudget: selectedValue?.project?.totalBudget,
        installments: selectedValue?.project?.installments || [],
        startDate: selectedValue?.project?.startDate,
        endDate: selectedValue?.project?.endDate,
        isComplete: selectedValue?.project?.isComplete
    })

    const handleChange = (e) => {
        let { name, checked, value } = e.target;

        value = name == 'isComplete' ? checked : value;

        setUpdateData((prev) => ({
            ...prev,
            [name]: name === "totalBudget" ? Number(value) : value,
        }));
    };

    const updateInstallment = (installmentIndex, e) => {
        const { name, value } = e.target;

        setUpdateData((prev) => {
            const installments = [...(prev.installments || [])];

            installments[installmentIndex] = {
                ...installments[installmentIndex],
                [name]: name === "amount" ? Number(value) : value,
            };

            return {
                ...prev,
                installments,
            };
        });
    };

    //add blank field to add new installemnt
    const addInstallment = () => {
        setUpdateData((prev) => ({
            ...prev,
            installments: [
                ...(prev?.installments ?? []),
                { amount: null, paidDate: "" },
            ],
        }));
    };

    //this funtion handles adding and editing project
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res

        if (selectedValue?.action == 'add') {
            res = await addProject({ leadId: id, data: updateData }).unwrap();
        } else {
            res = await updateProject({
                id: selectedValue.project._id,
                data: updateData,
            }).unwrap();
        }

        if (res.statusCode == 201 || res.statusCode === 200) {
            toast.success(res.message)
            setSelectedValue(null);
        } else {
            toast.error('Error occured, try again.')
        }

    };


    return (
        <Modal
            isOpen={selectedValue?.action === "edit" || selectedValue?.action == 'add'}
            onRequestClose={() => setSelectedValue(null)}
            overlayClassName="fixed inset-0 bg-black/60"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-1/2 bg-gray-300 p-5 rounded-lg"
        >
            <h2 className="font-medium text-2xl mb-4">Project Details</h2>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col my-3">
                    <label className="font-medium">Name</label>
                    <input
                        name="name"
                        type="text"
                        value={updateData?.name}
                        onChange={handleChange}
                        className="bg-white p-2 rounded outline-none focus:ring focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col my-3">
                    <label className="font-medium">Total Budget</label>
                    <input
                        name="totalBudget"
                        type="number"
                        value={updateData?.totalBudget}
                        onChange={handleChange}
                        className="bg-white p-2 rounded outline-none focus:ring focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col space-y-2 my-3">
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Installments</label>
                        <button
                            type="button"
                            onClick={addInstallment}
                            className="bg-accent text-white p-2 rounded-lg"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {updateData?.installments?.map((ins, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="font-medium">{index + 1}</span>

                            <input
                                name="amount"
                                type="number"
                                value={ins.amount}
                                onChange={(e) => updateInstallment(index, e)}
                                placeholder="Amount"
                                className="p-2 bg-white outline-none focus:ring focus:ring-primary rounded flex-1"
                            />

                            <input
                                name="paidDate"
                                type="date"
                                value={formatDate(ins.paidDate)}
                                onChange={(e) => updateInstallment(index, e)}
                                className="p-2 bg-white outline-none focus:ring focus:ring-primary rounded"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col my-3">
                    <label className="font-medium">Start Date</label>
                    <input
                        name="startDate"
                        type="date"
                        value={formatDate(updateData?.startDate)}
                        onChange={handleChange}
                        className="p-2 bg-white rounded"
                    />
                </div>

                <div className="flex flex-col my-3">
                    <label className="font-medium">End Date</label>
                    <input
                        name="endDate"
                        type="date"
                        value={formatDate(updateData?.endDate)}
                        onChange={handleChange}
                        className="p-2 bg-white rounded"
                    />
                </div>
                <div className="flex gap-3 my-3">
                    <input type="checkbox" name='isComplete' checked={!!updateData?.isComplete}
                        onChange={handleChange}
                        className="" />
                    <label htmlFor="isComplete">Is Completed?</label>
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-accent text-white rounded"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedValue(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal >
    );
};

export default ProjectForm;
