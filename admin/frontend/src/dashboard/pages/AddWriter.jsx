import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import {base_url} from '../../config/config'
import { motion } from 'framer-motion';
import storeContext from '../../context/storeContext'

const AddWriter = () => {

  const navigate = useNavigate()
  const {store} = useContext(storeContext)
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  })
  const inputHandler = (e) =>{
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }
  const [loader,setLoader] = useState(false)
  
  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await axios.post(`${base_url}/api/news/writer/add`, 
        state, {
          headers : {
            'Authorization' : `Bearer ${store.token}`
          }
        })
        setLoader(false)
        toast.success(data.message)
        navigate('/dashboard/writers')
    }catch (error) {
      setLoader(false)
      toast.success(data.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-700">Add Writer</h2>
        <Link
          to="/dashboard/writers"
          className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200"
        >
          Writers
        </Link>
      </div>

      {/* Form */}
      <div className="p-4">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Name
            </label>
            <input
              onChange={inputHandler}
              value={state.name}
              required
              type="text"
              name="name"
              placeholder="Enter writer name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              onChange={inputHandler}
              value={state.email}
              required
              type="email"
              name="email"
              placeholder="Enter email address"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              onChange={inputHandler}
              value={state.password}
              required
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loader}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
          >
            {loader ? 'Adding Writer...' : 'Add Writer'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};


export default AddWriter
