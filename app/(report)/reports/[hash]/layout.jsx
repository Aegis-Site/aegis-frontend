import '@styles/globals.css'
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@components/reports/Navbar'
import Footer from '@components/Footer'

export const metadata = {
    title: "Aegis Report",
    description: "Test"
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <Navbar />

          <main className='appReport'>
            {children}
          </main>
          <Toaster />
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout