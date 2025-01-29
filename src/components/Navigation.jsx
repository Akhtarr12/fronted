import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <nav className="bg-light-blue p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-mint-green">
            Home
          </Link>
        </li>
        <li>
          <Link to="/analyze" className="text-white hover:text-mint-green">
            Analyze Image
          </Link>
        </li>
        <li>
          <Link to="/chat" className="text-white hover:text-mint-green">
            Chat
          </Link>
        </li>
        <li>
          <Link to="/clinics" className="text-white hover:text-mint-green">
            Find Clinics
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

