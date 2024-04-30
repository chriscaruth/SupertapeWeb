import { LumaSplatsSemantics, LumaSplatsThree } from "@lumaai/luma-web";
import { Canvas, Object3DNode, extend } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { CameraController } from "./CameraController";
import { Panel } from "./Panel";
import { useAsset3D } from "../../../context/Asset3DContext";
import { Vector3, AxesHelper, Euler } from "three";
import { calculatePositionInFront } from "../../../utilities/utils";

// Make LumaSplatsThree available to R3F
extend({ LumaSplats: LumaSplatsThree });

// For typeScript support:
declare module "@react-three/fiber" {
  interface ThreeElements {
    lumaSplats: Object3DNode<LumaSplatsThree, typeof LumaSplatsThree>;
  }
}

interface ViewerProps {
  assetUrl: string;
}

export const Viewer = ({ assetUrl }: ViewerProps) => {
  const {
    state: { selectedScope },
  } = useAsset3D();

  const gridConfig = {
    gridSize: [10.5, 10.5],
    cellSize: 0.6,
    cellThickness: 1,
    cellColor: "#6f6f6f",
    sectionSize: 3.3,
    sectionThickness: 1.5,
    sectionColor: "#c1c1c1",
    fadeDistance: 25,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0.5], rotation: [0, 0, 0], fov: 60 }}
    >
      <primitive object={new AxesHelper(5)} />
      <Grid
        position={[0, -1, 0]}
        args={[10.5, 10.5]}
        {...gridConfig}
        renderOrder={-1}
      />

      {selectedScope &&
        selectedScope.scopeItems.map((scopeItem) => {
          const position = new Vector3(
            scopeItem.cameraEntity?.posX ?? 0,
            scopeItem.cameraEntity?.posY ?? 0,
            scopeItem.cameraEntity?.posZ ?? 0
          );

          const rotation = new Euler(
            scopeItem.cameraEntity?.rotX ?? 0,
            scopeItem.cameraEntity?.rotY ?? 0,
            scopeItem.cameraEntity?.rotZ ?? 0,
            "YXZ"
          );

          const markerPosition = calculatePositionInFront(
            position,
            rotation,
            scopeItem.cameraEntity?.distanceToPointOfInterest ?? 0.5
          );

          return (
            <>
              <Panel
                key={scopeItem.id}
                position={position}
                rotation={rotation}
                text={scopeItem.summary}
              />
              <mesh position={markerPosition}>
                <sphereGeometry args={[0.01, 24, 24]} />
                <meshBasicMaterial color={"blue"} />
              </mesh>
            </>
          );
        })}

      <CameraController />

      <lumaSplats
        semanticsMask={
          LumaSplatsSemantics.FOREGROUND | LumaSplatsSemantics.BACKGROUND
        }
        source={assetUrl}
        position={[0, 0, 0]}
        scale={0.5}
        rotation={[0, Math.PI, 0]}
      />
    </Canvas>
  );
};
