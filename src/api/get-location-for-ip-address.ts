import { api } from '../lib/axios'

export interface GetLocationForAddressProps {
  ip: string
  location: {
    country: string
    region: string
    city: string
    lat: number
    lng: number
    postalCode: string
    timezone: string
    geonameId: number
  }
  as: {
    asn: number
    name: string
    route: string
    domain: string
    type: string
  }
  isp: string
}

export async function GetLocationForAddress(ipAddress: string) {
  const response = await api.get<GetLocationForAddressProps>(`/country,city`, {
    params: {
      apiKey: import.meta.env.API_KEY,
      ipAddress,
    }
  })

  return response.data
}

// https://geo.ipify.org/api/v2/country,city?apiKey=at_ngrHT5InENKVKmQL8n8DehhMmqO9U&ipAddress=187.55.14.151