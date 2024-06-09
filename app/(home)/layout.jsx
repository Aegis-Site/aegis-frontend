import '@styles/globals.css'
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

export const metadata = {
    title: "Aegis",
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

          <main className='app'>
            {children}
          </main>
          <Toaster />
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout