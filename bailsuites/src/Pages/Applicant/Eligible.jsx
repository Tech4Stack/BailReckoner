import { useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

Chart.register(CategoryScale);

const Eligible = ({ accdata, submitApplication, acceptance, rejection }) => {
    console.log(accdata);
    const Data = [
        { bailAccepted: "Bail Accepted", prob: acceptance },
        { bailAccepted: "Bail Rejected", prob: rejection },
    ];

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.bailAccepted),
        datasets: [
            {
                label: "Bail Probability",
                data: Data.map((data) => data.prob),
                backgroundColor: [
                    "rgb(37 99 235)",
                    "rgb(120 162 230)"
                ],
                borderWidth: 0
            },
        ],
    });

    const accuse = [
        { label: 'Accused Name', value: accdata.name },
        { label: 'Gender', value: accdata.gender },
        { label: 'Age', value: '29 Years' },
        { label: 'Charges', value: accdata.charges },
        { label: 'Relevant Law', value: accdata.law },
        {
            label: 'Summary',
            value: accdata.summary
        },
        { label: 'Date of Arrest', value: '21 August 2024' },
        { label: 'Prior Crime history', value: 'None' },
        { label: 'Bail Request Status', value: 'Initial Review' }
    ];

    const lawyers = [
        {
            id: '#123456',
            name: 'Adv. Abc Vyx',
            fees: '₹1245.00',
            experience: '5 Years',
            gender: 'Male',
            speciality: 'Theft'
        },
        {
            id: '#123457',
            name: 'Adv. Def Xyz',
            fees: '₹2245.00',
            experience: '8 Years',
            gender: 'Female',
            speciality: 'Marital Violence'
        },
        {
            id: '#123458',
            name: 'Adv. Ghi Lmn',
            fees: '₹2275.00',
            experience: '9 Years',
            gender: 'Male',
            speciality: 'Property'
        },
        {
            id: '#123459',
            name: 'Adv. Jkl Opq',
            fees: '₹3245.00',
            experience: '9 Years',
            gender: 'Female',
            speciality: 'Illegal Trading'
        },
        {
            id: '#123460',
            name: 'Adv. Mno Rst',
            fees: '₹4354.00',
            experience: '11 Years',
            gender: 'Male',
            speciality: 'Theft'
        }
    ];

    return (
        <>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md mt-3">
                <div className="text-green-600 font-semibold text-lg mb-4 flex items-center">
                    <i className="fas fa-check-circle mr-2"></i> Accused Eligible for Bail
                </div>
                <ol className="list-decimal pl-6 text-gray-800">
                    {accuse.map((detail, index) => (
                        <li key={index}>
                            <span className='font-bold'>{detail.label}</span>: {detail.value}
                        </li>
                    ))}
                </ol>
                <div className='w-full flex justify-center items-center'>
                    <div style={{ width: '500px', height: '500px' }}>
                        <Doughnut data={chartData} />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Search for Legal Aid Advisor</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Location</label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2">Mumbai</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2">Pune</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2">Thane</span>
                            </label>
                            <div className="relative">
                                <select className="form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5">
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Speciality</label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2">Theft</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2">Online Crime</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2">Property</span>
                            </label>
                            <div className="relative">
                                <select className="form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5">
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Enter Query</label>
                        <input type="text" placeholder="Eg. I need an Advocate for a minor road accident case ..." className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>

                    <div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Search</button>
                    </div>
                </form>
            </div>

            <div className="mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Legal Aid Advisor</h1>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full bg-blue-50">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-left text-sm font-medium text-blue-700">LAA ID</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-blue-700">Full Name</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-blue-700">Per Case Fees</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-blue-700">Experience</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-blue-700">Gender</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-blue-700">Speciality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lawyers.map((lawyer, index) => (
                                <tr className="cursor-pointer border-b hover:bg-blue-100" key={index}>
                                    <td className="py-2 px-4 text-sm text-gray-700">{lawyer.id}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{lawyer.name}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{lawyer.fees}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{lawyer.experience}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{lawyer.gender}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{lawyer.speciality}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="p-4 bg-white flex justify-between items-center">
                        <span className="text-sm text-gray-600">Showing 1-5 from 100 entries</span>
                        <div className="flex items-center space-x-2">
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="w-8 h-8 bg-blue-500 text-white rounded-full">1</button>
                            <button className="w-8 h-8 bg-white text-gray-700 border border-gray-300 rounded-full">2</button>
                            <button className="w-8 h-8 bg-white text-gray-700 border border-gray-300 rounded-full">3</button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Confirm Lawyer ABC123</button>
                <button onClick={submitApplication} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                    Submit Application
                </button>
                </div>
            </div>
        </>
    )
}

export default Eligible
