import React from 'react'

const Home = () => {
  return (
    <>
      <div className='ml-64 w-full text-center '>
        <p className='text-4xl font-semibold  text-left ml-10'>Accused List</p>
        <p className='text-left ml-10 text-slate-400'>Home / <b className=' text-slate-800'>Accused List</b></p>
        <div>
          <div className='ml-10 flex justify-center items-center mt-3'>
            <button className='text-blue-600 border border-blue-600 px-4 py-2 rounded-md'>+ NEW CASE</button>
            <input type="text" className='border border-slate-500 px-4 py-2 rounded-md' placeholder='Search...'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;