import { format } from 'date-fns'
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'

import CarUpdateForm from '../Components/CarUpdateForm'

const CarDetails = (req, res) => {
  const { carid } = useParams()
  const [car, setCar] = useState(null)
  const [logs, setLogs] = useState(null)
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()
  let searchResults

  const fetchLogs = async () => {
    const res = await fetch(`/api/log/${carid}`)
    const json = await res.json()
    if (res.ok)
      setLogs(json)
  }

  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(`/api/car/${carid}`)
      const json = await res.json()
      if (res.ok) 
        setCar(json)
    }
    fetchCar()
    fetchLogs()
  }, [carid])

  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/car/${carid}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      if (logs !== undefined || logs.length > 0)
        deleteLogs()
      navigate("/cars")
    }
  }

  const deleteLogs = async () => {
    logs.forEach(async log => {
      const id = log._id
      const res = await fetch(`/api/log/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        deleteLogData(id)
      }
    })
  }

  const deleteLogData = async (id) => {
    const res = await fetch(`/api/logdata/${id}`, {
      method: 'DELETE'
    })
  }

  const handleSearch = (searchStr) => {
    if (searchStr.length > 0 && logs !== undefined && logs.length > 0) {
      const fuse = new Fuse(logs, {
        shouldSort: true,
        threshold: 0.5,
        keys: ["title"]
      })
      searchResults = fuse.search(searchStr)
      setLogs([...new Set(searchResults?.map(item => item.item))])
    }
    if (searchStr === "") {
      fetchLogs()
    }
  }



  if (!edit) {
    return (
      <div className='page'>
        <div className='flex flex-row relative my-6'>

          <div className="basis-1/2">
            <Link to={'/cars'}>
              <button className='btn btn-blue'>
                {"< Back"}
              </button>
            </Link>
          </div>

          <div className="basis-1/4"></div>
          <div className="basis-1/4"></div>

          <div className="basis-1/4">
            <div className="flex justify-end">
              <button className='btn btn-green mx-3' onClick={(e) => setEdit(true)}>
                Edit
              </button>
              <button className='btn btn-red' onClick={(e) => handleDelete(e)}>
                Delete
              </button>
            </div>
          </div>
        {
          //car details section
        }
        </div>
        <h1 className='text-4xl font-bold pt-4'>{car?.manufacturer} || {car?.model} || {car?.year}</h1>
        <br />
        <h1 className='text-xl font-medium pt-4'><strong>Description: </strong>{car?.descriptions}</h1>
        <br />
        <h1 className='text-xl font-medium pt-4'><strong>Created: </strong>{car?.createdAt && format(new Date(car.createdAt), "dd-MM-yyyy HH:mm")}</h1>
        <h1 className='text-xl font-medium py-4'><strong>Updated: </strong>{car?.updatedAt && format(new Date(car.updatedAt), "dd-MM-yyyy HH:mm")}</h1>
        <br />
        <Link to={`/logs/${carid}/create`}>
          <button className='btn btn-green'>Add Log</button>
        </Link>
        
        {
          //split line section
        }
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">***</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        {
          //log section
        }
        <div className='flex flex-row relative my-3 w-full'>
          <div className="basis-1/2">
            <h1 className='text-2xl font-semibold m-auto'>Logs:</h1>
          </div>
          <div className="basis-1/4"></div>
          <div className="basis-1/4"></div>
          {
            //search bar
          }
          <div className="basis-1/4">
            <input className='input' placeholder='Search' 
              onChange={e => handleSearch(e.target.value)}
            />        
          </div>
        </div>

        {logs === undefined || !logs || logs.length === 0 && (
          <div className='mx-auto block w-full text-center mt-[80px] mb-[80px] text-2xl text'>
            No log entry
          </div>
        )}

        {logs && logs.length > 0 && logs.map((log) => (
          <div className="flex flex-col my-3 w-full" key={log._id}>
            <Link to={`/cars/${carid}/${log._id}`}>
              <div className='item-list'>
                <h4><strong>{log.title + ' || ' + format(new Date(log.createdAt), "dd-MM-yyyy HH:mm")}</strong></h4>
              </div>
            </Link>
          </div>
        ))}

      </div>

    )
  } else {
    return (
      <div className='page'>
        <div className='flex flex-row relative my-6'>

          <div className="basis-1/2">
            <Link to={'/cars'}>
              <button className='btn btn-blue'>
                {"< Back"}
              </button>
            </Link>
          </div>

          <div className="basis-1/4"></div>
          <div className="basis-1/4"></div>

          <div className="basis-1/4">
            <div className="flex justify-end">
              <button className='btn btn-red' onClick={(e) => setEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <CarUpdateForm key={carid} car={car}/>

      </div>
    )
  }
}

export default CarDetails