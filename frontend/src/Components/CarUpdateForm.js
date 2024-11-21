//import { set } from 'mongoose'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CarUpdateForm = (car) => {
  const { carid } = useParams()
  const navigate = useNavigate()
  const [manufacturer, setManufacturer] = useState(car.car.manufacturer)
  const [model, setModel] = useState(car.car.model)
  const [year, setYear] = useState(car.car.year)
  const [descriptions, setDescriptions] = useState(car.car.descriptions)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const car = { manufacturer, model, year, descriptions }

    const response = await fetch(`/api/car/${carid}`, {
      method: 'PATCH',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    else {
      navigate(0)
      setError(null)
    }
  }

  return (
    <>
      <div className="align-top block p-6 rounded-lg shadow-lg max-w-2xl">
        <div className="form-group mb-6">
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <h3 className='text-2xl font-medium'>Update details for car entry '{car.car.manufacturer} {car.car.model} {car.car.year}'</h3>

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

            <button className="btn btn-slate my-3 w-32 mx-auto">Update</button>

            {error && <div className="my-3 w-32 mx-auto">{error}</div>}

          </form>
        </div>
      </div>
    </>
  )
}

export default CarUpdateForm