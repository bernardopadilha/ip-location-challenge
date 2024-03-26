import { Header } from "./components/header";
import { useGetLocation } from "./hooks/useGetLocation";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";

export function App() {
  const { response } = useGetLocation()

  const [location, setLocation] = useState<LatLngExpression>([-27.593500, -48.558540])

  useEffect(() => {
    const newLocation: LatLngExpression = [response?.location.lat ?? -27.593500, response?.location.lat ?? -48.558540]

    setLocation(newLocation)
  }, [response])

  return (
    <>
      <div className="w-full">
        <Header />
      </div>

      <div className="bg-white rounded-xl flex flex-col md:flex-row items-center justify-center gap-5 md:gap-20 py-5 px-14 absolute top-[180px] md:top-[270px] z-[1000] left-1/2 -translate-x-1/2 ">
        <div className="flex flex-col items-start justify-center gap-2 md:gap-5">
          <span className="text-zinc-500/80">IP Adress</span>
          <h1 className="text-xl font-bold">{response ? response.ip : '192.212.174.101'}</h1>
        </div>

        <div className="flex flex-col items-start justify-center gap-2 md:gap-5 border-t md:border-t-0 md:border-l border-black pt-2 md:pt-0  md:pl-6">
          <span className="text-zinc-500/80">Location</span>
          <h1 className="text-xl font-bold whitespace-nowrap">{response ? `${response.location.city}, ${response.location.country}` : 'Santa Catarina, BR 10001'}</h1>
        </div>

        <div className="flex flex-col items-start justify-center gap-2 md:gap-5 border-t md:border-t-0 md:border-l border-black pt-2 md:pt-0 md:pl-6">
          <span className="text-zinc-500/80">Timezone</span>
          <h1 className="text-xl font-bold whitespace-nowrap">{response ? response.location.timezone : 'UTC -03:00'}</h1>
        </div>

        <div className="flex flex-col items-start justify-center gap-2 md:gap-5 border-t md:border-t-0 md:border-l border-black pt-2 md:pt-0 md:pl-6">
          <span className="text-zinc-500/80">ISP</span>
          <h1 className="text-xl font-bold">{response ? response.isp : 'SpaceX StarLink'}</h1>
        </div>


      </div>

      <div className="h-200px">
        <MapContainer center={location} zoom={1000} scrollWheelZoom={true}  >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup>
              {response ? (`${response.location.city}, ${response.location.country}`) : 'Santa Catarina, Brazil'}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}


