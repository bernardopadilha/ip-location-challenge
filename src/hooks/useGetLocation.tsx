import { GetLocationContext } from '../context/get-location-context';
import { useContext } from 'react';

export function useGetLocation() {
  const value = useContext(GetLocationContext);

  return value;
}
