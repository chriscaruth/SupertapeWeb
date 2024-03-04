import { Text } from "@react-three/drei";
import * as THREE from "three";

interface PanelProps {
  position?: THREE.Vector3;
  text: string;
}

export const Panel = ({
  position = new THREE.Vector3(0, 0, 0),
  text,
}: PanelProps) => {
  return (
    <mesh position={position}>
      <planeGeometry attach="geometry" args={[0.2, 0.2]} />
      <meshBasicMaterial attach="material" transparent={true} />
      <Text
        position={[0, 0, 0.001]}
        fontSize={0.02}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </mesh>
  );
};
