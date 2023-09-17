import { useEffect, useState } from 'react';

import { Marker, MapContainer, TileLayer, Popup, useMap } from 'react-leaflet';
import { useAtom } from 'jotai';
import { filteredPropertiesAtom } from 'src/state/filteredProperties';
import { selectedPropertyAtom } from 'src/state/selectedProperty';
import { LatLngExpression } from 'leaflet';

function ChangeView({ center }: { center: LatLngExpression }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function Map({ center }: { center: LatLngExpression }) {
  const [filteredProperties] = useAtom(filteredPropertiesAtom);

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
      <ChangeView center={center} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {filteredProperties.map((item) => (
        <Marker
          position={item.location?.latitude ? [item.location?.latitude, item.location?.longitude] : [0, 0]}
          key={item.id}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

const LeaflatMap = () => {
  const [selectedProperty] = useAtom(selectedPropertyAtom);
  const [center, setCenter] = useState<LatLngExpression>([51.505, -0.09]);

  useEffect(() => {
    if (typeof selectedProperty === 'object' && 'id' in selectedProperty) {
      setCenter(
        selectedProperty.location?.latitude
          ? [selectedProperty.location?.latitude, selectedProperty.location?.longitude]
          : [0, 0],
      );
    }
  }, [selectedProperty]);

  return <Map center={center} />;
};

export default LeaflatMap;
