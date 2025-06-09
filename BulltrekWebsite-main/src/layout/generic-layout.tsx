import Footer from '@/components/footer'
import Header from '@/components/header'
import { ReactNode } from 'react'

const GenericLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className="flex flex-col w-full  min-h-screen h-full bg-[#F8F8F8]">
    <Header />
    <div className="flex w-full h-full justify-center flex-grow items-center">
      {children}
    </div>
    <Footer />
  </main>
  )
}

export default GenericLayout