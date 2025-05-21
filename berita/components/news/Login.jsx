import React from 'react';

const Login = () => {
  return (
    <div className='min-w-screen min-h-screen bg-slate-200 flex justify-center items-center'>
      <div className='w-[340px] text-slate-600 shadow-md'>
        <div className='bg-white h-full px-7 py-8 rounded-md'>
          <div className='w-full justify-center items-center flex'>
            <img className='w-[200px]' src={""} alt="logo" />
          </div>
          <form>
            <div className='flex flex-col gap-y-2'>
              <label className='text-md font-medium text-gray-600' htmlFor='email'>Email</label>
              <input type='email' placeholder='email' name='email' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='email'/>
            </div>
            <div className='flex flex-col gap-y-2 mt-3'>
              <label className='text-md font-medium text-gray-600' htmlFor='password'>Password</label>
              <input type='password' placeholder='password' name='password' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='password'/>
            </div>
            <div className='mt-4'>
              <button className='px-3 py-[6px] w-full bg-red-500 rounded-md text-white hover:bg-red-600'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
