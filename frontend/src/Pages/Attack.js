import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReplayAttackForm from '../Components/ReplayAttackForm'
import SetupInterfaceForm from '../Components/SetupInterfaceForm'

const Attack = () => {
  return(
    <div className="page">
      <div className='flex flex-row relative justify-between'>
        <Link to={'/'}>
          <button className='btn btn-blue my-6'>
            {"Home"}
          </button>
        </Link>
      </div>
      
      <div className="flex flex-row items-center">
        <div className="w-full max-w-md">
          <SetupInterfaceForm />
        </div>
      </div>

      <div className="flex flex-row items-center">
        <div className="w-full max-w">
          <ReplayAttackForm />
        </div>
      </div>
    </div>
  )
}

export default Attack