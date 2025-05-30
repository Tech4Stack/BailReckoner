import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../Components/Dropdown';

const Register = () => {
    const { storeTokenInLS, setIsLoggedIn, roles, role } = useAuth();
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [department, setDepartment] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            fullname,
            email,
            phone,
            password,
        };
        if (role !== "applicant") {
            formData.id = id;
            formData.department = department;
        }
        const regType = role === "applicant" ? "registerApplicant" :
            role === "police" ? "registerPolice" : 
                role === "advocate" ? "registerAdvocate" : "registerJudge"
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/${regType}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.status === 200) {
                storeTokenInLS(data.token);
                setIsLoggedIn(true);
                toast.success("Registration successful");
                navigate('/login');
            } else {
                console.error("Registration failed", data);
                toast.error(data.error);
            }
        } catch (error) {
            console.error("An error occurred", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 bg-slate-800">
            <div className="max-w-sm w-full text-white space-y-5">
                <div className="text-center pb-8">
                    <img src="/logo512.png" alt='bailsuites' className="mx-auto w-16 " />
                    <div className="mt-5">
                        <h3 className="text-white h-10 text-2xl font-bold sm:text-3xl">Register</h3>
                    </div>
                    <hr className="my-2" />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="font-medium">
                            Select Your Role
                        </label>
                        <Dropdown head="Select Your Role" data={roles} />
                    </div>
                    <div>
                        <label className="font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {
                        role !== 'applicant' ? (
                            <>
                                {/* <div>
                                    <label className="font-medium">
                                        Id
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </div> */}
                                <div>
                                    <label className="font-medium">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : null
                    }
                    <div>
                        <label className="font-medium">
                            Phone
                        </label>
                        <input
                            type="number"
                            size={10}
                            maxLength={10}
                            required
                            className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center">Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link></p>
            </div>
        </main>
    );
};

export default Register;