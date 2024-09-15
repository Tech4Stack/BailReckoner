import React from 'react';

const TopNav = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <main style={{ display: token ? "block":"none"}} className=" bg-gray-100 m-0 border-b border-gray-200">
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
                        <img alt="Profile picture" className="w-8 h-8 rounded-full border border-slate-300" height="30" src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" width="30" />
                        <span className="ml-2">
                            {user && (user.fullname)}
                        </span>
                        <i className="fas fa-chevron-down ml-2 text-slate-400 font-extralight"/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default TopNav;