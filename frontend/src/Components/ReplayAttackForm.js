import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ReplayAttackForm = () => {
  const [can_int, setCan_int] = useState('')
  const [can_id, setCan_id] = useState('')
  const [d0, setD0] = useState('')
  const [d1, setD1] = useState('')
  const [d2, setD2] = useState('')
  const [d3, setD3] = useState('')
  const [d4, setD4] = useState('')
  const [d5, setD5] = useState('')
  const [d6, setD6] = useState('')
  const [d7, setD7] = useState('')
  const [loopInterval, setLoopInterval] = useState('')
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)
  const [isReplaying, setIsReplaying] = useState(false)

  const handleReplayAttack = async (e) => {
    e.preventDefault()
    const message = { can_int, can_id, d0, d1, d2, d3, d4, d5, d6, d7, loopInterval }
    setStatus('Replaying message. Please wait...')
    const res = await fetch(`/api/attack/replay`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    if (res.ok) {
      if (json.error) {
        setStatus(null)
        setError("Error trying to perform replay, have you setup the interface?")
      }
      else {
        setError(json.stdout)
        setStatus('Done')
      }
    }
    else {
      setError('Cannot reach backend')
    }
  }

  const handleStopREplayAttack = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/attack/stop_replay')
    const json = await res.json()
    if (res.ok) {
      setIsReplaying(false)
      setStatus("Stopped.")
      setError(null)
    }
  }

  //* Example of how to display terminal output to the webpage (using .then)
  // const handleSendCommandClick = async () => {
  //   const res = await fetch(`/api/attack/replay`)
  //   const promise = res.json()
  //   if (res.ok) {
  //     //access the value of promise
  //     promise.then(result => {
  //       setResult(result)
  //     })
  //   }  
  // }

  return (
    <div className="align-top block p-6 rounded-lg shadow-lg max-w">
      <h1 className='my-4 text-3xl text-start font-bold'>Replay Attack</h1>

      <form onSubmit={e => handleReplayAttack(e)}>
        <div className="grid md:grid-cols-11 md:gap-3">
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>Can Interface</label>
            <input className='input' placeholder='e.g. vcan0' required
              value={can_int}
              onChange={e => setCan_int(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>Can ID</label>
            <input className='input' placeholder='e.g. 10D' required
              value={can_id}
              onChange={e => setCan_id(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>D0</label>
            <input className='input' placeholder='e.g. 00' required
              value={d0}
              onChange={e => setD0(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>D1</label>
            <input className='input' placeholder='e.g. 00' required
              value={d1}
              onChange={e => setD1(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>D2</label>
            <input className='input' placeholder='e.g. 00' required
              value={d2}
              onChange={e => setD2(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>D3</label>
            <input className='input' placeholder='e.g. 00' required
              value={d3}
              onChange={e => setD3(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>D4</label>
            <input className='input' placeholder='e.g. 00' required
              value={d4}
              onChange={e => setD4(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>D5</label>
            <input className='input' placeholder='e.g. 00' required
              value={d5}
              onChange={e => setD5(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>D6</label>
            <input className='input' placeholder='e.g. 00' required
              value={d6}
              onChange={e => setD6(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>D7</label>
            <input className='input' placeholder='e.g. 00' required
              value={d7}
              onChange={e => setD7(e.target.value)}
            />
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className='block mb-2 text-md font-medium text-gray-900'>Loop (milisec.)</label>
            <input className='input' type='number' placeholder='e.g. 5' required
              value={loopInterval}
              onChange={e => setLoopInterval(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <button className='btn btn-blue mt-[20px]'>Replay Message</button>
          {isReplaying && (
            <button className='btn btn-red' onClick={e => handleStopREplayAttack(e)}>Stop Replay</button>
          )}
          {error && (
            <h1 className='text-red-500'>{error}</h1>
          )}
          {status && (
            <h1 className='text-center mt-3'>{status}</h1>
          )}
        </div>

      </form>
    </div>
  )
}

export default ReplayAttackForm