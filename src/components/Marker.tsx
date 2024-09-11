import { FC, useCallback } from 'react';
import { ReactifyApi } from '../providers/map-provider.tsx';

interface Props {
  coordinates: [number, number];
  index: number;
  reactifyApi: ReactifyApi;
  onClick?: (index: number) => void;
}

export const Marker: FC<Props> = ({
  coordinates,
  index,
  onClick,
  reactifyApi,
}) => {
  const { YMapMarker } = reactifyApi;

  const selectMarker = useCallback(() => {
    onClick?.(index);
  }, [index, onClick]);

  return (
    <YMapMarker coordinates={coordinates}>
      <button className="ymap-point" onClick={selectMarker} />
    </YMapMarker>
  );
};
