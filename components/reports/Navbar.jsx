import Link from "next/link"
import { FaHome } from "react-icons/fa"

const Navbar = () => {
    return (
        <div className="py-10 pb-20 text-center">
            <Link href="/"><h1 className="text-5xl font-semibold">Home</h1></Link>
        </div>
    )
  }
  
export default Navbar