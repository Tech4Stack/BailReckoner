import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
            <div className="loader"></div>
            <p className="mt-4 font-bold text-teal-400 text-2xl ">Generating reports</p>
            <style jsx>{`
        .loader {
          width: 150px;
          padding: 8px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #25b09b;
          --_m: 
            conic-gradient(#0700 10%,#000),
            linear-gradient(#000 0 0) content-box;
          -webkit-mask: var(--_m);
                  mask: var(--_m);
          -webkit-mask-composite: source-out;
                  mask-composite: subtract;
          animation: l3 1s infinite linear;
        }

        @keyframes l3 {
          to {
            transform: rotate(1turn);
          }
        }
      `}</style>
        </div>
    );
};

const CaseDetails = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [showPopup, setShowPopup] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [reportGenerated, setReportGenerated] = useState(false);
    const [sendingReport, setSendingReport] = useState(false);
    const [hearingDate, setHearingDate] = useState('');
    const [showReport, setShowReport] = useState(false);

    const Data = [
        { bailAccepted: 'Bail Accepted', prob: 79 },
        { bailAccepted: 'Bail Rejected', prob: 21 },
    ];

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.bailAccepted),
        datasets: [
            {
                label: 'Bail Probability',
                data: Data.map((data) => data.prob),
                backgroundColor: ['rgb(37 99 235)', 'rgb(120 162 230)'],
                borderWidth: 0,
            },
        ],
    });

    const handleUploadClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const blobUrl = URL.createObjectURL(file);
                setPdfFiles([...pdfFiles, { name: file.name, url: blobUrl }]);
            }
        };
        input.click();
    };

    const handleShowPdf = (file, name) => {
        setShowPopup({ file, name });
        console.log({ file, name });
    };

    const handleClosePopup = () => {
        setShowPopup(null);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        // Simulate a report generation process
        setTimeout(() => {
            setIsLoading(false);
            setReportGenerated(true);
        }, 3500);
    };

    const handleSendReport = () => {
        setSendingReport(true);
        // Simulate sending report process
        setTimeout(() => {
            setSendingReport(false);
            alert('Report for this case uploaded successfully.');
        }, 2000);
    };

    const handleScheduleHearing = () => {
        if (hearingDate) {
            alert(`Meeting successfully scheduled for ${hearingDate}`);
        } else {
            alert('Please select a date for scheduling the hearing.');
        }
    };

    return (
        <div className="main md:ml-64 p-3 bg-gray-100 h-max">
            <h1 className="text-3xl font-bold mb-6 h-10">Case ABC123 Details and Analytics</h1>

            <nav className="text-gray-500 mb-6 space-x-2">
                <a href="#" className="hover:underline">
                    Home
                </a>
                <span>/</span>
                <a href="#" className="hover:underline">
                    Cases
                </a>
                <span>/</span>
                <span className="text-black font-semibold">Case ABC123</span>
            </nav>

            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 bg-blue-50 border border-blue-100 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Case History</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>
                            <strong>Case Number:</strong> ABC123
                        </li>
                        <li>
                            <strong>Accused Name:</strong> XYZ Kumar
                        </li>
                        <li>
                            <strong>Gender:</strong> Male
                        </li>
                        <li>
                            <strong>Age:</strong> 29 Years
                        </li>
                        <li>
                            <strong>Charges:</strong> Theft, Assault
                        </li>
                        <li>
                            <strong>Relevant Law:</strong> Indian Penal Code (IPC) Section 378
                        </li>
                        <li>
                            <strong>Summary:</strong> The accused is charged with theft under IPC Section 378, which involves the unlawful taking of someone else's property without consent, intending to deprive the rightful owner of it permanently.
                        </li>
                        <li>
                            <strong>Date of Arrest:</strong> 21 August 2024
                        </li>
                        <li>
                            <strong>Prior Crime History:</strong> None
                        </li>
                        <li>
                            <strong>Bail Request Status:</strong> Initial Review
                        </li>
                    </ol>
                </div>

                <div className="md:w-1/3 md:pl-6 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold mb-4">Defendant Profile</h2>
                    <ul>
                        <li>
                            <strong>Applicant Name:</strong> ABC Kumar
                        </li>
                        <li>
                            <strong>Applicant’s Phone Number:</strong> 9998887770
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold mb-4">Bail Analysis</h2>
                    <div>
                        <p>Bail probability</p>
                        <Doughnut data={chartData} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row mt-6">
                <div className="md:w-2/3 bg-blue-50 border border-blue-100 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Evidence to Witnesses</h2>
                    <div className="space-y-4 mb-6">
                        <button
                            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
                            onClick={() => handleShowPdf('/assets/witness.pdf', 'Applicant Testimonial.pdf')}
                        >
                            <i className="fas fa-user mr-2"></i> Applicant Testimonial
                        </button>
                        <button
                            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
                            onClick={() => handleShowPdf('/assets/witness.pdf', 'Witness 1 Statement.pdf')}
                        >
                            <i className="fas fa-file-alt mr-2"></i> Witness 1 Statement
                        </button>
                        <button
                            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
                            onClick={() => handleShowPdf('/assets/fir.pdf', 'Police FIR.pdf')}
                        >
                            <i className="fas fa-file-alt mr-2"></i> Police FIR
                        </button>
                        <button
                            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
                            onClick={() => handleShowPdf('/assets/Case Report Generated.pdf', 'Case Report Generated.pdf')}
                        >
                            <i className="fas fa-file-alt mr-2"></i> Report from LAA
                        </button>
                        <div className="space-y-4 mb-6">
                            {pdfFiles.map((file, index) => (
                                <button
                                    key={index}
                                    className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
                                    onClick={() => handleShowPdf(file.url, file.name)}
                                >
                                    <i className="fas fa-file-alt mr-2"></i> {file.name}
                                </button>
                            ))}
                            <button
                                className="w-full border-2 border-yellow-500 text-yellow-500 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-100 transition"
                                onClick={handleUploadClick}
                            >
                                <i className="fas fa-upload mr-2"></i> Upload more
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/3 md:pl-6 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold mb-4">Witness Analysis</h2>
                    <div className="space-y-4 mb-6">
                        <p>Witness statements and credibility assessment</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row mt-6">
                <div className="md:w-2/3 bg-blue-50 border border-blue-100 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Evidence Overview</h2>
                    <div className="space-y-4 mb-6">
                        <p>Summary of all evidence</p>
                    </div>
                </div>

                <div className="md:w-1/3 md:pl-6 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold mb-4">Case Timeline</h2>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <ul className="space-y-4 relative">
                            <div className="absolute left-4 top-5 h-56 border-l-2 border-gray-800"></div>
                            <li className="flex items-start relative">
                                <img src='/assets/hammer.svg' className='bg-[#796CFF] p-2 w-10 mr-1 rounded-md' />
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Bail Hearing 2 <span className="text-green-500">(Upcoming)</span></span>
                                        <span className="text-gray-500 text-sm">29 August 2024</span>
                                    </div>
                                    <p className="text-gray-500 text-sm">Scheduled at Bombay High Court on 29 August 2024 at 11:00 am</p>
                                </div>
                            </li>
                            <li className="flex items-start relative">
                                <img src='/assets/hammer.svg' className='bg-[#796CFF] p-2 w-9 mr-1 rounded-md' />
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Bail Hearing 1</span>
                                        <span className="text-gray-500 text-sm ">24 August 2024</span>
                                    </div>
                                    <p className="text-gray-500 text-sm">Status: Awaiting Judge's Decision</p>
                                </div>
                            </li>
                            <li className="flex items-start relative">
                                <i className="fas fa-file-alt text-black bg-yellow-400 p-3 w-9 rounded-md mr-1"></i>
                                <div className='w-full justify-start flex flex-col'>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Bail Application</span>
                                        <span className="text-gray-500 text-sm">22 August 2024</span>
                                    </div>
                                    <p className="text-gray-500 text-sm">Applicant ABC applied for bail</p>
                                </div>
                            </li>
                            <li className="flex items-start relative">
                                <img src='/assets/handcuff.svg' className='bg-[#FF987B] p-2 w-9 mr-1 rounded-md' />
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Arrest</span>
                                        <span className="text-gray-500 text-sm">21 August 2024</span>
                                    </div>
                                    <p className="text-gray-500 text-sm">Arrested at Dadar Police Station</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Schedule Hearing</h2>
                <input
                    type="date"
                    value={hearingDate}
                    onChange={(e) => setHearingDate(e.target.value)}
                    className="p-2 border-2 border-gray-300 rounded-lg w-full mb-4"
                />
                <button
                    onClick={handleScheduleHearing}
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Schedule Hearing
                </button>
            </div>

            <div className="mt-6">
                <button
                    className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    onClick={handleSubmit}
                >
                    <i className="fas fa-file-export mr-2"></i> Generate Report
                </button>
            </div>

            {isLoading && <LoadingScreen />}

            {reportGenerated && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Report Generated Successfully</h2>
                        <p>The report has been generated and is ready to be sent to the judicial authority. Do you want to send it now?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setShowReport(true);
                                    setReportGenerated(false);
                                }}
                                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
                            >
                                View Report
                            </button>
                            <button
                                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
                                onClick={handleSendReport}
                            >
                                Upload Report
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setReportGenerated(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-8/12 h-3/4 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Report Generated Successfully</h2>
                        <p>The report has been generated and is ready to be sent to the judicial authority. Do you want to send it now?</p>
                        <iframe
                            src="/assets/Case Report Generated.pdf"
                            title="PDF Viewer"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                        ></iframe>
                        <button
                            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                            onClick={() => {
                                setReportGenerated(false);
                                setShowReport(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {sendingReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96 flex flex-col items-center">
                        <div className="loader"></div>
                        <p className="mt-4 font-bold text-teal-400 text-2xl">Sending report...</p>
                        <style jsx>{`
              .loader {
                width: 200px;
                height: 40px;
                background: linear-gradient(#000 0 0) 0/0% no-repeat #ddd;
                animation: l1 2s infinite linear;
              }
              @keyframes l1 {
                100% {
                  background-size: 100%;
                }
              }
            `}</style>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-2/3 h-3/4 relative">
                        <button onClick={handleClosePopup} className="absolute top-4 right-4 text-gray-600 hover:text-black">
                            ✖
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Viewing PDF</h2>
                        <div className="overflow-auto h-full">
                            <p>This is where the PDF content for {showPopup.name} will be displayed.</p>
                            <iframe
                                src={showPopup.file}
                                title="PDF Viewer"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
        .main::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default CaseDetails;