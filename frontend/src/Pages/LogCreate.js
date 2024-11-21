import { useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'

const LogCreate = () => {
  const navigate = useNavigate()
  const { carid } = useParams()
  const [car, setCar] = useState(null)
  const [title, setTitle] = useState('')
  const [descriptions, setDescriptions] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  let logid

  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(`/api/car/${carid}`)
      const json = await res.json()
      if (res.ok) 
        setCar(json)
        logid = json._id
    }
    fetchCar()
  }, [carid])

  const submitLogDetails = async (carModel) => {
    const log = { carid, carModel, title, descriptions }
    
    const res = await fetch(`/api/log/${carid}/create`, {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    if (!res.ok)
      setError(json.error)
    else {
      fileSubmit(json._id)
    }
  }

  const fileSubmit = async (logid) => {
    if (file != null) {
      const data = new FormData()
      data.append('file', file)

      const res = await fetch(`/api/logdata/${logid}/create`, {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (res.ok) {
        setLoading(false)
        navigate(-1)
        setFile(null)
        setError(null)
      } 
      else {
        setError(json.error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const carModel = `${car?.manufacturer} ${car?.model} ${car?.year}`
    submitLogDetails(carModel)
  }

  return (
    <div className="page">
      {
        //buttons
      }
      <div className='flex flex-row relative my-6'>
        <div className="basis-1/2">
          <button className='btn btn-blue' onClick={e => navigate(-1)}>
            {"< Back"}
          </button>
        </div>
      </div>
      {
        //form
      }
      <div className="align-top block p-6 rounded-lg shadow-lg max-w-2xl">
        <div className="form-group mb-6">
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <h3 className='text-2xl font-medium'>New log entry for '{car?.manufacturer} {car?.model} {car?.year}'</h3>

            <label className='block mb-2 text-md font-medium text-gray-900'>Car ID</label>
            <input className='input' placeholder='e.g. Honda' required disabled
              value={carid}
            />
            <label className='block mb-2 text-md font-medium text-gray-900'>Car Model</label>
            <input className='input' placeholder='e.g. Civic' required disabled
              value={`${car?.manufacturer} ${car?.model} ${car?.year}`}
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
              <button className="btn btn-slate my-3 mx-auto">Add Log</button>
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

export default LogCreate