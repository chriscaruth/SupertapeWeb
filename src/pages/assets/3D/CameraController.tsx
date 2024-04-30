import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAsset3D } from "../../../context/Asset3DContext";
import { useDebouncedCallback } from "use-debounce";

export const CameraController = () => {
  const { camera, gl } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const strafeLeft = useRef(false);
  const strafeRight = useRef(false);
  const mouseDown = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const rotateSpeed = 0.005;
  const moveSpeed = 0.05;

  const { state, setCameraTransform, setFocusedScopeItem } = useAsset3D();

  const debouncedUpdate = useDebouncedCallback(
    (position: THREE.Vector3, rotation: THREE.Quaternion) => {
      setCameraTransform(position, rotation);
      setFocusedScopeItem(null);
    },
    100
  );

  useEffect(() => {
    if (state.cameraPosition && state.cameraRotation) {
      camera.position.copy(state.cameraPosition);
      camera.quaternion.copy(state.cameraRotation);
    }
  }, [state.cameraPosition, state.cameraRotation, camera]);

  useEffect(() => {
    camera.rotation.order = "YXZ";

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "w":
          moveForward.current = true;
          break;
        case "s":
          moveBackward.current = true;
          break;
        case "a":
          strafeLeft.current = true;
          break;
        case "d":
          strafeRight.current = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "w":
          moveForward.current = false;
          break;
        case "s":
          moveBackward.current = false;
          break;
        case "a":
          strafeLeft.current = false;
          break;
        case "d":
          strafeRight.current = false;
          break;
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        mouseDown.current = true;
        lastX.current = event.clientX;
        lastY.current = event.clientY;
      }
    };

    const handleMouseUp = () => {
      mouseDown.current = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (mouseDown.current) {
        const deltaX = event.clientX - lastX.current;
        const deltaY = event.clientY - lastY.current;
        lastX.current = event.clientX;
        lastY.current = event.clientY;

        camera.rotation.y -= deltaX * rotateSpeed;
        camera.rotation.x -= deltaY * rotateSpeed;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mouseup", handleMouseUp);
    gl.domElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gl.domElement, camera]);

  useFrame(() => {
    const direction = new THREE.Vector3();
    const right = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);

    camera.getWorldDirection(direction);
    right.crossVectors(direction, up).normalize();

    let positionChanged = false;

    if (moveForward.current) {
      camera.position.addScaledVector(direction, moveSpeed);
      positionChanged = true;
    }
    if (moveBackward.current) {
      camera.position.addScaledVector(direction, -moveSpeed);
      positionChanged = true;
    }
    if (strafeLeft.current) {
      camera.position.addScaledVector(right, -moveSpeed);
      positionChanged = true;
    }
    if (strafeRight.current) {
      camera.position.addScaledVector(right, moveSpeed);
      positionChanged = true;
    }

    if (positionChanged) {
      debouncedUpdate(camera.position, camera.quaternion);
      console.log(camera.position, camera.rotation);
    }
  });

  return null;
};
