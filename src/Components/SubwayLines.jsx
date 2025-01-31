import { useMemo } from "react";
import * as THREE from "three";
import { geoMercator } from "d3-geo";

function SubwayLines({ geojsonData }) {
  const projection = geoMercator()
    .center([-73.95, 40.7]) // Center on NYC
    .scale(100000); // Adjust scale to zoom into NYC
  const lines = useMemo(() => {
    const allLines = [];

    geojsonData.features.forEach((feature) => {
      const coordinates = feature.geometry.coordinates;
      const color = feature.properties.colour || "#FFFFFF";
      const name = feature.properties.name;

      const lineArrays = feature.geometry.type === "MultiLineString" ? coordinates : [coordinates];

      lineArrays.forEach((lineCoords) => {
        const points = [];
        lineCoords.forEach((coord) => {
          const [x, y] = projection(coord);
          points.push(new THREE.Vector3(x, 0, y));
        });

        if (points.length > 0) {
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          allLines.push({
            geometry,
            color,
            name,
          });
        }
      });
    });

    return allLines;
  }, [geojsonData]);

  return (
    <group>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry {...line.geometry} />
          <lineBasicMaterial color={line.color} linewidth={3} linecap="round" linejoin="round" />
        </line>
      ))}
    </group>
  );
}

export default SubwayLines;
