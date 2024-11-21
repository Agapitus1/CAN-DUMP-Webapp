import { Link } from 'react-router-dom'
import { useEffect, useState, } from 'react'
import { format } from 'date-fns'
import Fuse from 'fuse.js'

const Cars = (req, res) => {
  const[cars, setCars] = useState(null)

  let searchResults

  const fetchCars = async () => {
    const res = await fetch(`/api/car/`)
    const json = await res.json()
    if (res.ok) {
      setCars(json)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const handleSearch = (searchStr) => {
    if (searchStr.length > 0 && cars !== undefined && cars.length > 0) {
      const fuse = new Fuse(cars, {
        shouldSort: true,
        threshold: 0.5,
        keys: ["manufacturer", "model", "year"]
      })
      searchResults = fuse.search(searchStr)
      setCars([...new Set(searchResults?.map(item => item.item))])
    }
    if (searchStr === "") {
      fetchCars()
    }
  }

  return(    
    <>
    <div className="page">

      <div className='flex relative justify-between'>
        <Link to={'/'}>
          <button className='btn btn-blue my-6'>
            {"Home"}
          </button>
        </Link>
        <Link to={'/cars/create'}>
          <button className='btn btn-green my-6'>
            Add Car
          </button>
        </Link>
      </div>

      <input className='input' type='text' placeholder='Search' 
        onChange={e => {handleSearch(e.target.value)}} 
      />

      <h1 className='my-4 text-3xl text-start font-bold'>List of cars</h1>

      <div className='flex flex-col'>
        {cars === undefined || !cars || cars.length === 0 && (//no car entry / search result
          <h2 className='mx-auto block w-2/3 text-center mt-[80px] mb-[80px] text-xl text'>No car entry</h2>
        )} 

        {cars != undefined && cars.length > 0 && cars.map((car) => (
          <div className="flex flex-col my-3 w-full" key={car._id}>
            <Link to={`/cars/${car._id}`}>
              <div className="item-list"> 
                <h4><strong>{car.manufacturer + ' ' + car.model + ' ' + car.year + ' | ' + format(new Date(car.createdAt), "dd-MM-yyyy HH:mm")}</strong></h4>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
    </>
  )
}

export default Cars;
