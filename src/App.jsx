import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import SubwayMap from "./SubwayMap";
import axios from "axios";
import SocketManager from "./SocketManager";

function App() {
  const [subwayData, setSubwayData] = useState(null);
  const [stationData, setStationData] = useState(null);
  const socketManager = useRef(null);

  const getStationData = () => {
    axios("https://data.ny.gov/resource/39hk-dx4f.json").then((response) => {
      setStationData(response.data);
    });
  };

  const getSubwayData = () => {
    fetch("/nyc_subway_routes.geojson")
      .then((response) => response.json())
      .then((data) => {
        console.log("data =>", data);
        setSubwayData(data);
      })
      .catch((error) => {
        console.error("Error loading subway data:", error);
      });
  };

  const connectToSocket = () => {
    socketManager.current = new SocketManager("ws://localhost:8000/ws");
    socketManager.current.connect();
  };

  useEffect(() => {
    getStationData();
    getSubwayData();
    connectToSocket();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Stats />
      <Canvas
        camera={{
          position: [0, 10, 10],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <axesHelper />
        {subwayData && stationData && (
          <group rotation={[0, 0.49, 0]}>
            <SubwayMap subwayData={subwayData} stationData={stationData} />
          </group>
        )}
        <OrbitControls enableDamping dampingFactor={0.05} screenSpacePanning={true} target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
