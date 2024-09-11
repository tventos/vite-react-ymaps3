import { FC } from 'react';
import { Map } from './components/Map';
import { MapProvider } from './providers/map-provider.tsx';

export const App: FC = () => {
  const apiUrl = `https://api-maps.yandex.ru/v3/?apikey=${import.meta.env.VITE_YMAPS_API_KEY}&lang=ru_RU`;

  return (
    <MapProvider apiUrl={apiUrl}>
      <Map />
    </MapProvider>
  );
};
