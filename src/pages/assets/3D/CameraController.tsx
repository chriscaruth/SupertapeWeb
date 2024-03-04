import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

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

    if (moveForward.current) {
      camera.position.addScaledVector(direction, moveSpeed);
    }
    if (moveBackward.current) {
      camera.position.addScaledVector(direction, -moveSpeed);
    }
    if (strafeLeft.current) {
      camera.position.addScaledVector(right, -moveSpeed);
    }
    if (strafeRight.current) {
      camera.position.addScaledVector(right, moveSpeed);
    }
  });

  return null;
};
