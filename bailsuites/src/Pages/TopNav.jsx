import React from 'react';

const TopNav = () => {
    return (
        <main className=" bg-gray-100 m-0">
            <div className="flex justify-end items-center p-4">
                <div className="flex space-x-4">
                    <button className="bg-white px-4 rounded-md border border-slate-300">
                        <i className="fas fa-bell text-xl relative">
                            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full">
                            </span>
                        </i>
                    </button>
                    <button className="bg-white px-4 rounded-md border border-slate-300">
                        <i className="fas fa-envelope text-xl">
                        </i>
                    </button>
                    <div className="flex items-center bg-white px-4 p-2 rounded-md border border-slate-300">
                        <img alt="Profile picture" className="w-8 h-8 rounded-full" height="30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmkyOF1Y-D0kRoVFxtoee5rtjzx3leZylOf-4mRpa0OBg4GXC869j54jnhBiYBtMu2BYg&usqp=CAU" width="30" />
                        <span className="ml-2">
                            Justice ABCD
                        </span>
                        <i className="fas fa-chevron-down ml-2 text-slate-400 font-extralight"/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default TopNav;