import { useMemo } from "react";
import * as THREE from "three";
import { geoMercator } from "d3-geo";

function SubwayStations({ stationData }) {
  const projection = geoMercator()
    .center([-73.95, 40.7]) // Center on NYC
    .scale(100000); // Adjust scale to zoom into NYC

  const stations = useMemo(() => {
    return stationData.map((station) => {
      const { coordinates } = station.georeference;
      const [x, y] = projection([coordinates[0], coordinates[1]]);
      return new THREE.Vector3(x, 0.1, y);
    });
  }, [stationData]);

  return (
    <group>
      {stations.map((station, i) => (
        <mesh key={i} position={station}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="red" />
        </mesh>
      ))}
    </group>
  );
}

export default SubwayStations;
