import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const CarCreate = () => {
  const navigate = useNavigate()
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [descriptions, setDescriptions] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const car = { manufacturer, model, year, descriptions }

    const res = await fetch(`/api/car/create`, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()

    if (!res.ok) {
      setError(json.error)
    }
    else {
      navigate(-1)
      setError(null)
    }
  }

  return (
    <div className="page">
      <div className='flex flex-row relative my-6'>
        <div className="basis-1/2">
          <button className='btn btn-blue' onClick={e => navigate(-1)}>
            {"< Back"}
          </button>
        </div>
      </div>

      <div className="align-top block p-6 rounded-lg shadow-lg max-w-2xl">
        <div className="form-group mb-6">
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <h3 className='text-2xl font-medium'>Create a new car entry</h3>

            <label className='block mb-2 text-md font-medium text-gray-900'>Car Manufacturer</label>
            <input className='input' placeholder='e.g. Honda' required
              value={manufacturer}
              onChange={e => setManufacturer(e.target.value)}
            />
            <label className='block mb-2 text-md font-medium text-gray-900'>Car Model</label>
            <input className='input' placeholder='e.g. Civic' required
              value={model}
              onChange={e => setModel(e.target.value)}
            />
            <label className='block mb-2 text-md font-medium text-gray-900'>Car Year</label>
            <input className='input' placeholder='e.g. 2010' type='number' required
              value={year}
              onChange={e => setYear(e.target.value)}
            />
            <label className='block mb-2 text-md font-medium text-gray-900'>Descriptions</label>
            <input className='input' placeholder='Description'
              value={descriptions}
              onChange={e => setDescriptions(e.target.value)}
            />

            <button className="btn btn-slate my-3 w-32 mx-auto">Add Car</button>

            {error && <div className="my-3 w-32 mx-auto">{error}</div>}

          </form>
        </div>
      </div>
    </div>
  )
}

export default CarCreate