import { PageHeader } from "../../components/layout/PageHeader";
import { PageContent } from "../../components/layout/PageContent";
import { useServices } from "../../context/ServiceContext";
import { useParams } from "react-router-dom";
import { LumaSplatsSemantics, LumaSplatsThree } from "@lumaai/luma-web";
import { Canvas, Object3DNode, extend } from "@react-three/fiber";
import { Grid, OrbitControls, PivotControls } from "@react-three/drei";
import { CameraController } from "./3D/CameraController";
import { Panel } from "./3D/Panel";
import { ScopesList } from "../../components/scopes/ScopesList";

// Make LumaSplatsThree available to R3F
extend({ LumaSplats: LumaSplatsThree });

// For typeScript support:
declare module "@react-three/fiber" {
  interface ThreeElements {
    lumaSplats: Object3DNode<LumaSplatsThree, typeof LumaSplatsThree>;
  }
}

export const AssetsEdit = () => {
  const { assetId } = useParams();

  if (!assetId) {
    return;
  }

  const { assetService, scopeService } = useServices();
  const { data: asset } = assetService.getAssetByIdQuery(assetId);
  const { data: scopes } = scopeService.getScopesByAssetId(assetId);

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
    <div className="flex flex-col h-screen">
      <PageHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {asset?.streetAddress} {asset?.city}, {asset?.state}{" "}
            {asset?.zipCode}
          </h1>
        </div>
      </PageHeader>
      <PageContent className="flex-grow overflow-auto">
        <div className="flex flex-row h-full">
          <div className="w-1/2 p-4 overflow-auto">
            <div>Display and edit asset</div>
            <div>Create New Scope</div>
            <div>{asset?.id}</div>
            <ScopesList scopes={scopes} />
          </div>
          <div className="w-1/2">
            <Canvas
              shadows
              camera={{ position: [0, 0, 0.5], rotation: [0, 0, 0], fov: 60 }}
            >
              <Grid
                position={[0, -1, 0]}
                args={[10.5, 10.5]}
                {...gridConfig}
                renderOrder={-1}
              />

              <CameraController />

              <Panel text="Test Panel" />

              <lumaSplats
                semanticsMask={
                  LumaSplatsSemantics.FOREGROUND |
                  LumaSplatsSemantics.BACKGROUND
                }
                source={asset?.assetMapURL}
                position={[0, 0, 0]}
                scale={0.5}
                rotation={[0, Math.PI, 0]}
              />
            </Canvas>
          </div>
        </div>
      </PageContent>
    </div>
  );
};
