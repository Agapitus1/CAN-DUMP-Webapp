import { Link } from "react-router-dom";

const NotFound = () => {
  return(
    <div className="page">
      <h1 className="text-2xl font-medium">Page not found</h1>
      <div className="flex justify-between m-6">
        <Link to={'/'}>
          <button className="btn btn-blue">
            Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound;