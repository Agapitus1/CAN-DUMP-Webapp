import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const SetupInterfaceForm = () => {
  const [can_int, setCan_int] = useState('can0')
  const [bitrate, setBitrate] = useState('500000')
  const [error, setError] = useState(null)
  const [setupSuccessful, setSetupSuccessful] = useState(false)
  const [shutdownIntBtn, setShutdownIntBtn] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSetupInterface = async (e) => {
    e.preventDefault()
    const command = { can_int, bitrate }
    const res = await fetch(`/api/attack/setup_interface`, {
      method: "POST",
      body: JSON.stringify(command),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    if (res.ok) {
      if (json.error) {
        setError("Error setting up the interface")
      }
      else {
        setShutdownIntBtn(true)
        setSetupSuccessful(true)
        setStatus(null)
        setError(json.stderr)
      }
    }
  }

  const handleShutdownInterface = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/attack/shutdown_interface', {
      method: 'POST',
      body: JSON.stringify({ can_int }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    if (res.ok) {
      setStatus(json.stdout)
      setSetupSuccessful(false)
      setShutdownIntBtn(false)
      setError(null)
    }
    else {
      setError(`Cannot shutdown interface ${can_int}`)
    }
  }

  return (
    <div className="align-top block p-6 rounded-lg shadow-lg max-w-3xl">
      <div className="form-group mb-6">
        <h1 className='my-4 text-3xl text-start font-bold'>Setup Interface</h1>
        <form className='flex flex-col' onSubmit={e => handleSetupInterface(e)}>
          <label className="block mb-2 text-md font-medium text-gray-900">Interface</label>
          <select value={can_int} onChange={e => {
            setCan_int(e.target.value)
            setSetupSuccessful(false)
            setError(null)
          }}>
            <option value="can0">can0</option>
            <option value="vcan0">vcan0</option>
          </select>

          <label className="block mb-2 text-md font-medium text-gray-900">Bitrate</label>
          <select value={bitrate} onChange={e => {
            setBitrate(e.target.value)
            setSetupSuccessful(false)
            setError(null)
          }}>
            <option value="500000">500000</option>
            <option value="250000">250000</option>
            <option value="125000">125000</option>
          </select> 
           
          <button className='btn btn-green my-6'>
            Setup Interface
          </button>

          {shutdownIntBtn && (
            <button className='btn btn-red' onClick={e => handleShutdownInterface(e)}>
              Shutdown Interface
            </button>
          )}

          {error && (
            <h1 className='text-red-500'>{error}</h1>
          )}

          {status && (
            <h1>{status}</h1>
          )}
          
          {setupSuccessful && (
            <h1>Setup successful on interface {can_int} with bitrate {bitrate}</h1>
          )}
        </form>
      </div>
    </div>
  )
}

export default SetupInterfaceForm