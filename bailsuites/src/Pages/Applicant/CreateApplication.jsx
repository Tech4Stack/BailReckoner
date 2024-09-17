import React, { useState, useEffect } from 'react';
import Eligible from './Eligible';
import { toast } from 'react-toastify';
import ipcSections from '../IPC.json';
import Fuse from "fuse.js";

const CreateApplication = () => {
    const [salutation, setSalutation] = useState("Mr.");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [crimeType, setCrimeType] = useState("");
    const [caseID, setCaseID] = useState("");
    const [monthsServed, setMonthsServed] = useState("");
    const [eligible, setEligible] = useState(false);
    const [acceptance, setAcceptance] = useState(0);
    const [rejection, setRejection] = useState(0);
    const [ipc, setIPC] = useState("");
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    const [rfirstname, setRfirstName] = useState(user?.fullname.split(' ')[0]);
    const [rmiddlename, setRmiddleName] = useState(user?.fullname.split(' ')[1]);
    const [rlastname, setRlastName] = useState(user?.fullname.split(' ')[2]);

    const [accusedDetails, setAccusedDetails] = useState({});

    // Fuse.js initialization
    const [fuse, setFuse] = useState(null);

    useEffect(() => {
        const fuseInstance = new Fuse(ipcSections, {
            keys: ['IPC Section', 'A text'],
            threshold: 0.3,
        });
        setFuse(fuseInstance);
    }, [ipcSections]);

    const handleSearch = (e) => {
        const query = e;
        setQuery(query);

        if (query.trim() && fuse) {
            const result = fuse.search(query);
            setResults(result.map(({ item }) => item));
        } else {
            setResults([]);
        }
    };

    const createStatement = () => {
        setIPC(results.map(result => result['IPC Section']).join(', '));
        const ipcSectionsText = results.length > 0
            ? `under ${results.map(result => result['IPC Section']).join(', ')}`
            : '';


        return `${salutation} ${firstName} ${middleName} ${lastName} is charged for ${crimeType} ${ipcSectionsText}. They have been in custody for ${monthsServed} months. The charges include non-bailable offenses. Legal aid is seeking to assess their eligibility for bail.`;
    };

    console.log(ipc)

    const checkEligibility = async () => {
        const statement = createStatement();
        const accdata = {
            name: `${salutation} ${firstName} ${middleName} ${lastName}`,
            gender: salutation === "Mr." ? "male" : "female",
            charges: crimeType,
            law: ipc,
            summary: statement,
        };
        setAccusedDetails(accdata);
        
        try {
            const res = await fetch(`http://127.0.0.1:5000/predict`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: statement })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                console.log(accusedDetails)
                setAcceptance(data.eligibility_prob[1] * 100);
                setRejection(data.eligibility_prob[0] * 100);
                setEligible(true);
                console.log(accdata);
            } else {
                toast.error(data.error || "Error while predicting bail eligibility");
            }
        } catch (error) {
            toast.error("Internal server error");
        }
    };

    const submitApplication = async () => {
        const applicationData = {
            applicantname: `${rfirstname} ${rmiddlename} ${rlastname}`,
            lawyername: user.fullname,
            accusedname: `${salutation} ${firstName} ${middleName} ${lastName}`,
            offence: crimeType,
            description: `Case ID: ${caseID}, Served months: ${monthsServed}`,
            attachments: [],
            hearings: [],
            bailprob: eligible ? "Eligible" : "Not Eligible"
        };

        try {
            const res = await fetch('http://127.0.0.1:5000/createApplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(applicationData)
            });

            if (res.ok) {
                toast.success("Application created successfully");
            } else {
                const data = await res.json();
                toast.error(data.error || "Error creating application");
            }
        } catch (error) {
            toast.error("Internal server error");
        }
    };

    return (
        <div className="md:ml-64 bg-gray-100 p-8 shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-4 h-10">Create Application</h1>
            <nav className="text-gray-600 mb-8">
                <a href="#" className="text-blue-500">Home</a> / <a href="#" className="text-blue-500">Applications</a> / <span>New Application</span>
            </nav>

            <h2 className="text-2xl font-bold mb-4">Prisoner Representative Details</h2>

            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Enter full name</label>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Salutation</label>
                        <select value={rfirstname} onChange={(e) => setRfirstName(e.target.value)} className="w-full p-2 border rounded shadow-sm">
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">First Name</label>
                        <input type="text" value={rfirstname} onChange={(e) => setRfirstName(e.target.value)} placeholder="Eg. Abc" className="w-full p-2 border rounded shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Middle Name</label>
                        <input type="text" value={rmiddlename} onChange={(e) => setRmiddleName(e.target.value)} placeholder="Eg. Xyz" className="w-full p-2 border rounded shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Last Name</label>
                        <input type="text" value={rlastname} onChange={(e) => setRlastName(e.target.value)} placeholder="Eg. Pqrst" className="w-full p-2 border rounded shadow-sm" />
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Accused / Prisoner Details</h2>

            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Enter full name</label>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Salutation</label>
                        <select value={salutation} onChange={(e) => setSalutation(e.target.value)} className="w-full p-2 border rounded shadow-sm">
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">First Name</label>
                        <input
                            required={true}
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Eg. Abc"
                            className="w-full p-2 border rounded shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Middle Name</label>
                        <input
                            required={true}
                            type="text"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            placeholder="Eg. Xyz"
                            className="w-full p-2 border rounded shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Last Name</label>
                        <input
                            required={true}
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Eg. Pqrst"
                            className="w-full p-2 border rounded shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Select type of crimes committed</label>
                <input
                    required={true}
                    type="text"
                    value={crimeType}
                    onChange={(e) => { setCrimeType(e.target.value); handleSearch(e.target.value) }}
                    placeholder="Attempt to murder, Theft, .."
                    className="w-full p-2 border rounded shadow-sm"
                />
            </div>

            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Enter period served in jail (in months)</label>
                <input
                    required={true}
                    type="text"
                    value={monthsServed}
                    onChange={(e) => setMonthsServed(e.target.value)}
                    placeholder="Eg. 12"
                    className="w-full p-2 border rounded shadow-sm"
                />
            </div>

            <button onClick={checkEligibility} className="bg-blue-500 text-white px-4 py-2 rounded shadow">Check Bail Eligibility</button>

            {eligible && <Eligible accdata={accusedDetails} submitApplication={submitApplication} acceptance={acceptance} rejection={rejection} />}

        </div>
    );
};

export default CreateApplication;
