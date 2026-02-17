import { useState } from "react";
import { useAddAdminMutation, useGetAdminQuery } from "../../redux/Api/Admin";
import { toast } from "react-toastify";

const CreateAdmin = () => {
    const { data: admin } = useGetAdminQuery()
    const [data, setData] = useState({ role: 'admin' })
    const [addAdmin] = useAddAdminMutation()

    if (admin?.data.role !== 'superadmin') {
        return null
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (admin?.data?.role !== 'superadmin') {
            return toast.error('Unauthorized to create admin')
        }
        try {
            const res = await addAdmin({ ...data, reqBy: admin?.data?.role })
            if (res.data.statusCode == 201) {
                toast.success(res.data.message)
            }
        } catch {
            ((err) => {
                console.log(err)
            })
        }
    }

    return (
        <>
            <form className="mx-4 bg-white/5 text-white p-6 rounded-lg" onSubmit={handleSubmit}>
                <h2 className="font-bold text-3xl mb-3">Create Admin</h2>
                <div className="flex flex-col my-3">
                    <label htmlFor="email">Email</label>
                    <input placeholder="example@email.com" onChange={handleChange} required aria-required name='email' className="p-2 outline-0 focus:ring bg-white focus:ring-primary rounded" />
                </div>
                <div className="flex flex-col my-3">
                    <label htmlFor="password">Password</label>
                    <input placeholder="Strong Password" onChange={handleChange} type="password" aria-required required name='password' className="rounded p-2 outline-0 focus:ring bg-white focus:ring-primary" />
                </div>
                <div className="flex flex-col my-3">
                    <label htmlFor="purchasedPlan">Plans</label>
                    <select name='purchasedPlan' onChange={handleChange} className="rounded p-2 outline-0 focus:ring focus:ring-primary bg-white">
                        <option disabled>Select One Plan</option>
                        <option value={'111'}>None</option>
                        <option value={'010'}>Projects</option>
                        <option value={'001'}>Services</option>
                        <option value={'011'}>Both</option>
                    </select>
                </div>
                <button className='bg-accent px-6 py-2 rounded text-white' type="submit">Create</button>
            </form>
        </>
    )
}
export default CreateAdmin