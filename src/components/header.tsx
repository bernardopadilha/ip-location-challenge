import { useGetLocation } from '../hooks/useGetLocation'
import { CaretRight } from '@phosphor-icons/react'

export function Header() {
  const { handleSubmit, register, handleGetLocationForAddress } = useGetLocation()

  return(
    <header className="w-full h-[350px] flex items-center justify-center md:pt-14 pb-40 bg-header bg-no-repeat bg-cover bg-center ">
        <div className="flex flex-col justify-center items-center gap-10 md:gap-14">
          <h1 className="font-semibold text-3xl md:text-5xl text-white">IP Address Tracker</h1>

          <form
            onSubmit={handleSubmit(handleGetLocationForAddress)}
            className="w-full flex items-center justify-center"
          >
            <input
              type="text" 
              placeholder="Procure sua localidade pelo seu indereço de IP"
              className="w-full py-3 pl-2 rounded-l-xl focus:outline-none whitespace-nowrap focus:ring-2 focus:ring-purple-500"
              {...register('ipAddress')}
            />
            
            <button
              type='submit'
              className='bg-black h-full p-2 rounded-r-xl'
            >
              <CaretRight size={32} color='#fff' />
            </button>
          </form>
        </div>
    </header>
  )
}