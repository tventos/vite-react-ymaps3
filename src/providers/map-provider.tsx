import { ReactifiedModule } from '@yandex/ymaps3-types/reactify';
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { loadJs } from '../helpers/load-js.ts';

export type ReactifyApi = ReactifiedModule<
  typeof import('@yandex/ymaps3-types')
>;

type MountedMapsContextValue = {
  reactifyApi: ReactifyApi | null;
};

export const MountedMapsContext = createContext<MountedMapsContextValue>({
  reactifyApi: null,
});

export const MapProvider: FC<{
  children?: ReactNode;
  apiUrl: string;
}> = ({ children, apiUrl }) => {
  const [reactifyApi, setReactifyApi] = useState<ReactifyApi | null>(null);
  const contextValue = useMemo(() => ({ reactifyApi }), [reactifyApi]);

  useEffect(() => {
    (async () => {
      await loadJs(apiUrl);

      const [ymaps3React] = await Promise.all([
        ymaps3.import('@yandex/ymaps3-reactify'),
        ymaps3.ready,
      ]);

      const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
      setReactifyApi(reactify.module(ymaps3));
    })();
  }, [apiUrl]);

  return (
    <MountedMapsContext.Provider value={contextValue}>
      {children}
    </MountedMapsContext.Provider>
  );
};

export const useMap = () => useContext(MountedMapsContext);
