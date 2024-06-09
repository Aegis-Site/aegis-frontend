import Link from "next/link"

const Footer = () => {
  return (
    <div className='w-full text-center py-10'>
        <div className="text-lg">
            Built with ❤️ by
            <Link className="blue_gradient px-1.5" href="https://www.linkedin.com/in/yashpatil7426/">
            Yash Patil
            </Link>
        </div>
        <br />
        <Link className="blue_gradient text-lg font-bold" href="https://github.com/yashpatil74">Github</Link>
    </div>
  )
}

export default Footer