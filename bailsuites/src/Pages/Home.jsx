import React, { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const data = [
    {
      "id": 1,
      "name": "Akshay Kelley",
      "status": "Approved",
      "crime": "Unauthorised wearing of soldier's garb",
      "date": "06/12/2019"
    },
    {
      "id": 2,
      "name": "Jaiden Nixon",
      "status": "Approved",
      "crime": "Rash driving",
      "date": "09/30/2017"
    },
    {
      "id": 3,
      "name": "Niya Foley",
      "status": "Blocked",
      "crime": "Theft",
      "date": "12/09/2009"
    },
    {
      "id": 4,
      "name": "Nikolai Schmitt",
      "status": "Rejected",
      "crime": "Drug dealing",
      "date": "03/02/1998"
    },
    {
      "id": 5,
      "name": "Clayton Charles",
      "status": "Approved",
      "crime": "Use force",
      "date": "10/04/2024"
    },
    {
      "id": 6,
      "name": "Prince Chen",
      "status": "Approved",
      "crime": "Stalking",
      "date": "07/05/1992"
    },
    {
      "id": 7,
      "name": "Reece Duran",
      "status": "Blocked",
      "crime": "Attempt to commit suicide",
      "date": "05/06/2023"
    },
    {
      "id": 8,
      "name": "Anastasia Mcdaniel",
      "status": "Rejected",
      "crime": "Murder",
      "date": "02/11/2005"
    },
    {
      "id": 9,
      "name": "Melvin Boyle",
      "status": "Blocked",
      "crime": "Owner of unauthorised land",
      "date": "08/03/2022"
    },
    {
      "id": 10,
      "name": "Kallee Thomas",
      "status": "Blocked",
      "crime": "Giving False evidence",
      "date": "11/05/2018"
    }
  ]


  return (
    <>
        <main className="bg-gray-100 text-gray-800 md:ml-64 mt-0">
          <div className="container mx-auto p-4">
            <div className="mb-4">
              <h1 className="text-4xl font-semibold overflow-hidden">Accused List</h1>
              <span className="text-gray-600">Home / <b className='font-bold'>Accused List</b></span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <button className="bg-white text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 px-4 py-2 rounded">+ NEW CASE</button>
              <div className="relative">
                <input type="text" className="border border-gray-300 rounded px-4 py-2" placeholder="Search..." />
                <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <div className="bg-white rounded-xl">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="text-left">
                    <th className="py-2 px-4 border-r border-b border-slate-100">#</th>
                    <th className="py-2 px-4 border border-t-0 border-slate-100">Full Name</th>
                    <th className="py-2 px-4 border border-t-0 border-slate-100">Status</th>
                    <th className="py-2 px-4 border border-t-0 border-slate-100">Offence/Crime</th>
                    <th className="py-2 px-4 border border-t-0 border-slate-100">Date of Arrest</th>
                    <th className="py-2 px-4 border-b border-l border-slate-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} className={`${row.id%2 === 0 ? "bg-slate-100":""}`}>
                      <td style={{ borderBottom: row.id === itemPerPage ? 0:null}} className="py-2 px-4 border border-l-0 border-slate-200">{row.id}</td>
                      <td style={{ borderBottom: row.id === itemPerPage ? 0:null}} className="py-2 px-4 border border-slate-200">{row.name}</td>
                      <td style={{ borderBottom: row.id === itemPerPage ? 0:null}} className="py-2 px-4 border border-slate-200">
                        <span className={row.status === "Approved" ? "text-green-500" : row.status === "Blocked" ? "text-gray-500" : "text-red-500"}>
                          ●
                        </span> {row.status}
                      </td>
                      <td style={{ borderBottom: row.id === itemPerPage ? 0:null}} className="py-2 px-4 border border-slate-200">{row.crime}</td>
                      <td style={{ borderBottom: row.id === itemPerPage ? 0:null}} className="py-2 px-4 border border-slate-200">{row.date}</td>
                      <td style={{ borderBottom: row.id === itemPerPage ? 0:null}} className="py-2 px-4 border border-r-0 border-slate-200 flex justify-evenly items-center">
                        <button className="border border-black rounded-md p-1"><img className='w-6' src='/assets/arrow-up-right.svg' /></button>
                        <button className="border border-black rounded-md p-1"><img className='w-6' src='/assets/edit.svg'/></button>
                        <button className="text-black border border-black rounded-md p-1 px-2"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-1">
                <button className="p-2 px-3 text-xs border rounded text-slate-400 text-center font-extralight">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="px-3 py-1 border border-blue-500 rounded text-blue-500 bg-white">1</button>
                <button className="px-3 py-1 border rounded">2</button>
                <button className="px-3 py-1 border rounded">3</button>
                <button className="px-3 py-1 border rounded">4</button>
                <button className="p-2 px-3 text-xs border rounded">
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="flex justify-center items-center">
                  <div className="flex items-center bg-white px-4 p-2 rounded-md border border-slate-300">
                    <span className="mr-2">10</span>
                    <i className="fas fa-chevron-down ml-2 text-xs text-slate-400 font-extralight" />
                  </div>
                  <span className="ml-1">/page</span>
                </div>
              </div>
            </div>
          </div>
        </main>
    </>
  );
}

export default Home;