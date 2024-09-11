import { FC, useRef } from 'react';
import { YMap } from '@yandex/ymaps3-types/imperative/YMap';

import { useMap } from '../providers/map-provider';
import { Loading } from './Loading.tsx';
import { Marker } from './Marker.tsx';

export const Map: FC = () => {
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null);
  const { reactifyApi } = useMap();

  if (!reactifyApi) {
    return <Loading />;
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
    reactifyApi;

  const selectMarker = (index: number) => {
    console.log('selected marker: ', index);
  };

  return (
    <div className="map">
      <YMap
        margin={[20, 20, 20, 20]}
        location={{ center: [37.623082, 55.75254], zoom: 9 }}
        ref={mapRef}
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        <Marker
          index={0}
          coordinates={[37.623082, 55.75254]}
          onClick={selectMarker}
          reactifyApi={reactifyApi}
        />

        <Marker
          index={1}
          coordinates={[37.539628, 55.766763]}
          onClick={selectMarker}
          reactifyApi={reactifyApi}
        />
      </YMap>
    </div>
  );
};
