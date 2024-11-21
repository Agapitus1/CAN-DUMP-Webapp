import { Router, Link } from 'react-router-dom';

const Home = () => {
  return(
    <>
      <br></br>
      <h1 class="font-medium text-center leading-tight text-5xl mt-0 mb-2 text-slate-500">CAN testing webapp</h1>
      <br></br>
      <div className="flex flex-row justify-center">
        
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5" >
          <a href="/cars" className="nav-card">
            <h5 class="card-title">
              Cars
            </h5>
            <p className="card-subtext">
              Car detail dashboard and associated CAN log data
            </p>
          </a>

          <a href="/attack" className="nav-card">
            <h5 className="card-title">
              Attack
            </h5>
            <p class="card-subtext">
              Set up CAN interface, perform replay and fuzzing attacks
            </p>
          </a>

          <a href="/re" className="nav-card">
            <h5 class="card-title">
              Reverse Engineering
            </h5>
            <p className="card-subtext">
              Perform analysis on log data
            </p>
          </a>
        </div>
      </div>


      {/* <div className="flex flex-row justify-center">
        <Link to="/cars" className="nav-item">
          <button>Cars</button>
          
          Upload car details
          View associated CAN log data
        </Link>
        <Link to="/attack" className="nav-item">
          <button>Attack</button>
          Create CAN interface 
          Perform replay attacks 
        </Link>
        <Link to="/re" className="nav-item">
          <button>Reverse Engineering</button>
          Perform analysis on log data 
        </Link>
      </div> */}
      
    </>
  )
}

export default Home
