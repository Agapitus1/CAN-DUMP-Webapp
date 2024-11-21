
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LogUpdateForm from '../Components/LogUpdateForm'
import DataTable from "react-data-table-component"
import { Line } from 'react-chartjs-2'
import Chart from "chart.js/auto";
import zoomPlugin from 'chartjs-plugin-zoom'
Chart.register(zoomPlugin)

const LogDetails = () => {
  const navigate = useNavigate()
  const { carid, logid } = useParams()
  const [log, setLog] = useState(null)
  const [logData, setLogData] = useState(null)
  const [edit, setEdit] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [updateFile, setUpdateFile] = useState(false)
  //data table 
  const [tableData, setTableData] = useState([])
  const columns = [
    {
      name: 'Timestamp',
      selector: (row) => row.TimeStamp
    },
    {
      name: 'ID',
      selector: (row) => row.ID
    },
    {
      name: 'Extended',
      selector: (row) => row.Extended
    },
    {
      name: 'Dir',
      selector: (row) => row.Dir
    },
    {
      name: 'Bus',
      selector: (row) => row.Bus
    },
    {
      name: 'LEN',
      selector: (row) => row.LEN
    },
    {
      name: 'D1',
      selector: (row) => row.D1
    },
    {
      name: 'D2',
      selector: (row) => row.D2
    },
    {
      name: 'D3',
      selector: (row) => row.D3
    },
    {
      name: 'D4',
      selector: (row) => row.D4
    },
    {
      name: 'D5',
      selector: (row) => row.D5
    },
    {
      name: 'D6',
      selector: (row) => row.D6
    },
    {
      name: 'D7',
      selector: (row) => row.D7
    },
    {
      name: 'D8',
      selector: (row) => row.D8
    },
  ]

  const handleDelete = async () => {
    const res = await fetch(`/api/log/${logid}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      if (logData != null && !loadingData)
        deleteLogData()
      else
        navigate(-1)
    }
  }

  const deleteLogData = async () => {
    const res = await fetch(`/api/logdata/${logid}`, {
      method: 'DELETE'
    })
    if (res.ok)
      navigate(-1)
  }

  const handleSearch = () => {

  }

  const fetchLogData = async () => {
    setLoadingData(true)
    const res = await fetch(`/api/logdata/${logid}`)
    const json = await res.json()
    if (res.ok) {
      setTableData(json)
      setLogData(json)
      setLoadingData(false)
    }
    else
      setLoadingData(false)
  }

  useEffect(() => {
    setLoadingDetails(true)
    setLoadingData(true)
    const fetchLog = async () => {
      const res = await fetch(`/api/log/${carid}/${logid}`)
      const json = await res.json()
      if (res.ok) {
        setLog(json)
        setLoadingDetails(false)
      }
    }
    fetchLog()
    fetchLogData()
  }, [carid, logid])

  //chart data
  //y-axis timestamps
  const timeStamps = !loadingData && logData && logData.map(
    function (index) {
      return index.TimeStamp
    })


  //function for converting hex to dec 
  function hexToDec(index) {
    const uncleanD = index
    try {
      //copy of array to be able to write to it
      const uncleanDCopy = [...uncleanD]
      //converting hexadecimal letters to decimal
      for (let i = 0; i < 2; i++) {
        switch (uncleanDCopy[i]) {
          case "A":
            uncleanDCopy[i] = "10"
            break;
          case "B":
            uncleanDCopy[i] = "11"
            break;
          case "C":
            uncleanDCopy[i] = "12"
            break;
          case "D":
            uncleanDCopy[i] = "13"
            break;
          case "E":
            uncleanDCopy[i] = "14"
            break;
          case "F":
            uncleanDCopy[i] = "15"
            break;
        }
      }
      //converting hexadecimal to decimal
      const decimalD = (parseInt(uncleanDCopy[0] * 16) + parseInt(uncleanDCopy[1]))
      return decimalD
    } catch (error) {
      console.log("error", error)
    }
  }

  //x-axis data from each byte from the CAN message
  const D1 = !loadingData && logData && logData.map(
    function (index) {
      const D1 = hexToDec(index.D1)
      return D1
    }
  )
  const D2 = !loadingData && logData && logData.map(
    function (index) {
      const D2 = hexToDec(index.D2)
      return D2
    }
  )
  const D3 = !loadingData && logData && logData.map(
    function (index) {
      const D3 = hexToDec(index.D3)
      return D3
    }
  )
  const D4 = !loadingData && logData && logData.map(
    function (index) {
      const D4 = hexToDec(index.D4)
      return D4
    }
  )
  const D5 = !loadingData && logData && logData.map(
    function (index) {
      const D5 = hexToDec(index.D5)
      return D5
    }
  )
  const D6 = !loadingData && logData && logData.map(
    function (index) {
      const D6 = hexToDec(index.D6)
      return D6
    }
  )
  const D7 = !loadingData && logData && logData.map(
    function (index) {
      const D7 = hexToDec(index.D7)
      return D7
    }
  )
  const D8 = !loadingData && logData && logData.map(
    function (index) {
      const D8 = hexToDec(index.D8)
      return D8
    }
  )

  if (!edit) {
    return (
      <div className='page'>
        <div className='flex flex-row relative my-6'>

          <div className="basis-1/2">
            <Link to={`/cars/${carid}`}>
              <button className="btn btn-blue">
                {"< Back"}
              </button>
            </Link>
          </div>

          <div className="basis-1/4"></div>
          <div className="basis-1/4"></div>

          <div className="basis-1/4">
            <div className="flex justify-end">
              <button className='btn btn-green mx-3' onClick={e => setEdit(true)}>
                Edit
              </button>
              <button className='btn btn-red' onClick={e => handleDelete()}>
                Delete
              </button>
            </div>
          </div>

        </div>
        {
          //car details
        }
        {loadingDetails && (
          <div className='mx-auto block w-full text-center mt-[80px] mb-[80px] text-2xl text'>
            Loading...
          </div>
        )}

        {!loadingDetails && (
          <>
            <h1 className='text-4xl font-bold pt-4'>{log?.carModel}</h1>
            <br />
            <p className='text-xl font-medium pt-4'><strong>Log Title: </strong>{log?.title}</p>
            <p className='text-xl font-medium py-4'><strong>Descriptions: </strong>{log?.descriptions}</p>
            <br />
          </>
        )}

        {
          //split line section
        }
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">***</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {
          //log data section
        }
        <div className='flex flex-row relative my-3 w-full'>
          <div className="basis-1/2">
            <h1 className='text-2xl font-semibold m-auto'>Log Data:</h1>
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

        {loadingData && (
          <div className='mx-auto block w-full text-center mt-[80px] mb-[80px] text-2xl text'>
            Loading...
          </div>
        )}

        {!loadingData && !logData && (
          <div className='mx-auto block w-full text-center mt-[80px] mb-[80px] text-2xl text'>
            No log data
          </div>
        )}

        {
          //Chart for data
        }

        <div>
          <Line
            data = {
              {
                labels: timeStamps,
                datasets: [
                  {
                    label: 'D1',
                    data: D1,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    transparency: 0.5,
                    onClick: {
                      hidden: true
                    }
                  },
                  {
                    label: 'D2',
                    data: D2,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    onClick: {
                      hidden: true
                    }
                  },
                  {
                    label: 'D3',
                    data: D3,
                    borderColor: 'darkorange',
                    backgroundColor: 'darkorange',
                    onClick: {
                      hidden: true
                    }
                  },
                  {
                    label: 'D4',
                    data: D4,
                    borderColor: 'purple',
                    backgroundColor: 'purple',
                    onClick: {
                      hidden: true
                    }
                  },
                  {
                    label: 'D5',
                    data: D5,
                    borderColor: 'black',
                    backgroundColor: 'black',
                    onClick: {
                      hidden: true
                    }
                  },
                  {
                    label: 'D6',
                    data: D6,
                    borderColor: 'darkturquoise',
                    backgroundColor: 'darkturquoise',
                    onClick: {
                      hidden: true
                    }
                  },
                  {
                    label: 'D7',
                    data: D7,
                    borderColor: 'sienna',
                    backgroundColor: 'sienna',
                    onClick: {
                      hidden: true
                    }
                  },
                  {
                    label: 'D8',
                    data: D8,
                    borderColor: 'hotpink',
                    backgroundColor: 'hotpink',
                    onClick: {
                      hidden: true
                    }
                  },
                ],
              }
            }

            options={{
              elements: {
                point: {
                  borderWidth: 2,
                  radius: 1
                },
                line: {
                  borderWidth: 1
                }
              },
              scales: {
                y: {
                  min: 0,
                  max: 300,
                },
                x: {
                  min: 0,
                  max: 200,
                }
              },

            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'x',
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  drag: {
                    enabled: true,
                    modifierKey: 'shift'
                  },
                  mode: 'x',
                }
              }
            }
          }}
          />
        </div>

        {
          //Table for logData
        }
        <DataTable
          title={"Log Data Table"}
          columns={columns}
          data={tableData}
          progressPending={loadingData}
          pagination
        />
      </div>
    )
  } else {
    return (
      <div className='page'>
        <div className='flex flex-row relative my-6'>

          <div className="basis-1/2">
            <Link to={`/cars/${carid}`}>
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

        <LogUpdateForm key={logid} log={log} />

      </div>
    )
  }
}

export default LogDetails