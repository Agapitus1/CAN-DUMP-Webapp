import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const LogUpdateForm = (log) => {
  const navigate = useNavigate()
  const { carid, logid } = useParams()
  const [car, setCar] = useState(null)
  const [title, setTitle] = useState(log.log.title)
  const [descriptions, setDescriptions] = useState(log.log.descriptions)
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(`/api/car/${carid}`)
      const json = await res.json()
      if (res.ok) 
        setCar(json)
    }
    fetchCar()
  }, [carid, logid])

  const updateLogDetails = async () => {
    const log = { title, descriptions }
    const res = await fetch(`/api/log/${logid}`, {
      method: 'PATCH',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    if (!res.ok)
      setError(json.error)
    else {
      if (file != null) {
        deleteLogData()
        fileSubmit(logid)
      }
      setError(null)
    }
  }

  const deleteLogData = async () => {
    const res = await fetch(`/api/logdata/${logid}`, {
      method: 'DELETE'
    })
  }

  const fileSubmit = async (logid) => {
    const data = new FormData()
    data.append('file', file)

    const res = await fetch(`/api/logdata/${logid}/create`, {
      method: 'POST',
      body: data,
    })
    const json = await res.json()
    if (res.ok) {
      setFile(null)
      setLoading(false)
      navigate(0)
    } 
    else {
      setLoading(false)
      setError(json.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    updateLogDetails()
  }

  return (
    <div className="page">
      {
        //form
      }
      <div className="align-top block p-6 rounded-lg shadow-lg max-w-2xl">
        <div className="form-group mb-6">
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <h3 className='text-2xl font-medium'>Update log entry for '{car?.manufacturer} {car?.model} {car?.year}'</h3>

            <label className='block mb-2 text-md font-medium text-gray-900'>Log ID</label>
            <input className='input' placeholder='e.g. Honda' required disabled
              value={logid}
            />
            <label className='block mb-2 text-md font-medium text-gray-900'>Log Title</label>
            <input className='input' placeholder='Log title' required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <label className='block mb-2 text-md font-medium text-gray-900'>Descriptions</label>
            <input className='input' placeholder='Description'
              value={descriptions}
              onChange={e => setDescriptions(e.target.value)}
            />
            {
              //file input
            }
            <input type='file' accept='.csv' className='mt-6' 
              onChange={e => 
                setFile(e.target.files[0])
              }
            />
            
            <div className='mx-auto w-32'>
              <button className="btn btn-slate my-3 mx-auto">Update</button>
              {loading && (
                <span className='mx-5' >Loading...</span>
              )}
            </div>

            {error && <div className="my-3 w-32 mx-auto">{error}</div>}

          </form>
        </div>
      </div>
    </div>
  )
}

export default LogUpdateForm