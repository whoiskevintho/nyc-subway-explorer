import React from "react";
import SubwayLines from "./Components/SubwayLines";
import SubwayStations from "./Components/SubwayStations";

const SubwayMap = ({ subwayData, stationData }) => {
  return (
    <group position={[-205, 0, -86]} scale={0.5}>
      <SubwayLines geojsonData={subwayData} />
      <SubwayStations stationData={stationData} />
    </group>
  );
};
export default SubwayMap;
