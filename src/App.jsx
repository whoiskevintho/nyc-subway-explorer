import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { useEffect, useState } from "react";
import SubwayLines from "./Components/nyc_subway_routes";
import { useControls } from "leva";
import axios from "axios";

function App() {
  const [subwayData, setSubwayData] = useState(null);
  const [stationData, setStationData] = useState(null);

  // Add rotation control
  const { rotation } = useControls({
    rotation: {
      value: Math.PI / 0.13,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
      label: "Y Rotation",
    },
  });

  const getStationData = () => {
    axios("https://data.ny.gov/resource/39hk-dx4f.json").then((response) => {
      setStationData(response.data);
    });
  };

  const getSubwayData = () => {
    fetch("/nyc_subway_routes.geojson")
      .then((response) => response.json())
      .then((data) => {
        setSubwayData(data);
      })
      .catch((error) => {
        console.error("Error loading subway data:", error);
      });
  };

  useEffect(() => {
    getStationData();
    getSubwayData();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Stats />
      <Canvas
        camera={{
          position: [8, 9, 10],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {subwayData && stationData && (
          <group rotation={[0, 0.49, 0]}>
            <group position={[-205, 0, -86]} scale={0.5}>
              <SubwayLines geojsonData={subwayData} stationData={stationData} />
            </group>
          </group>
        )}
        <OrbitControls enableDamping dampingFactor={0.05} screenSpacePanning={true} target={[0, 0, 0]} />
        <gridHelper args={[10, 10]} />
      </Canvas>
    </div>
  );
}

export default App;
