import { Link } from 'react-router-dom'

const NavBar = () => {
  return(
    <div className="flex sm:flex-row sm:text-left sm:justify-between px-6 shadow sm:items-baseline w-full bg-slate-500 text-white">
        <Link to="/" className="text-3xl no-underline justify-center text-grey-darkest hover:bg-slate-400 px-6 pb-3 pt-2 font-semibold text-teal-100">
          <button>Webapp</button>
        </Link>
      <div className="text-right">
        <Link to="/cars" className="nav-item">
          <button className='mb-1'>Cars</button>
        </Link>
        <Link to="/attack" className="nav-item">
          <button className='mb-1'>Attack</button>
        </Link>
        <Link to="/re" className="nav-item">
          <button className='mb-1'>Reverse Engineering</button>
        </Link>
      </div>
    </div>
  )       
}

export default NavBar