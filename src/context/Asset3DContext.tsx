import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Scope } from "../models/Scope";
import { Euler, Quaternion, Vector3 } from "three";
import { ScopeItem } from "../models/ScopeItem";
import { CategoryMap } from "../models/Category";

enum Asset3DActionType {
  SetScopeItems = "SET_SCOPE_ITEMS",
  SetScopeItemsCategoryMap = "SET_SCOPE_ITEM_CATEGORY_MAP",
  FocusOnScopeItem = "FOCUS_ON_SCOPE_ITEM",
  SetCameraTransform = "SET_CAMERA_TRANSFORM",
  SetSelectedScope = "SET_SELECTED_SCOPE",
}

interface Asset3DState {
  scopes: Scope[];
  scopeItemsCategoryMap: Map<string, CategoryMap[]>;
  selectedScope: Scope | null;
  focusedScopeItem: ScopeItem | null;
  cameraPosition: Vector3;
  cameraRotation: Quaternion;
}

interface SetScopeItemsAction {
  type: Asset3DActionType.SetScopeItems;
  payload: Scope[];
}

interface SetScopeItemsCategoryMapAction {
  type: Asset3DActionType.SetScopeItemsCategoryMap;
  payload: Map<string, CategoryMap[]>;
}

interface SetSelectedScopeAction {
  type: Asset3DActionType.SetSelectedScope;
  payload: Scope;
}

interface FocusOnScopeItemAction {
  type: Asset3DActionType.FocusOnScopeItem;
  payload: ScopeItem | null;
}

interface SetCameraTransformAction {
  type: Asset3DActionType.SetCameraTransform;
  payload: {
    position: Vector3;
    rotation: Quaternion;
  };
}

type Asset3DAction =
  | SetScopeItemsAction
  | FocusOnScopeItemAction
  | SetCameraTransformAction
  | SetSelectedScopeAction
  | SetScopeItemsCategoryMapAction;

interface IAsset3DContext {
  state: Asset3DState;
  setScopeItems: (items: Scope[]) => void;
  setScopeItemsCategoryMap: (map: Map<string, CategoryMap[]>) => void;
  setCameraTransform: (position: Vector3, rotation: Quaternion) => void;
  setSelectedScope: (scope: Scope) => void;
  setFocusedScopeItem: (scopeItem: ScopeItem | null) => void;
}

interface IAsset3DProvider {
  children: ReactNode;
}

const Asset3DContext = createContext<IAsset3DContext>({} as IAsset3DContext);

export const useAsset3D = () => useContext(Asset3DContext);

const asset3DReducer = (state: Asset3DState, action: Asset3DAction) => {
  switch (action.type) {
    case Asset3DActionType.SetScopeItems:
      return { ...state, scopes: action.payload };
    case Asset3DActionType.SetScopeItemsCategoryMap:
      return { ...state, scopeItemsCategoryMap: action.payload };
    case Asset3DActionType.FocusOnScopeItem:
      return { ...state, focusedScopeItem: action.payload };
    case Asset3DActionType.SetCameraTransform:
      return {
        ...state,
        cameraPosition: action.payload.position,
        cameraRotation: action.payload.rotation,
      };
    case Asset3DActionType.SetSelectedScope:
      return { ...state, selectedScope: action.payload };
    default:
      return state;
  }
};

export const Asset3DProvider = ({ children }: IAsset3DProvider) => {
  const [state, dispatch] = useReducer(asset3DReducer, {
    scopes: [],
    scopeItemsCategoryMap: new Map<string, CategoryMap[]>(),
    focusedScopeItem: null,
    selectedScope: null,
    cameraPosition: new Vector3(0, 0, 0),
    cameraRotation: new Quaternion(),
  });

  useEffect(() => {
    if (!state.focusedScopeItem) {
      return;
    }

    dispatch({
      type: Asset3DActionType.SetCameraTransform,
      payload: {
        position: new Vector3(
          state.focusedScopeItem.cameraEntity?.posX,
          state.focusedScopeItem.cameraEntity?.posY,
          state.focusedScopeItem.cameraEntity?.posZ
        ),
        rotation: new Quaternion().setFromEuler(
          new Euler(
            state.focusedScopeItem.cameraEntity?.rotX,
            state.focusedScopeItem.cameraEntity?.rotY,
            state.focusedScopeItem.cameraEntity?.rotZ,
            "YXZ"
          )
        ),
      },
    });
  }, [state.focusedScopeItem]);

  return (
    <Asset3DContext.Provider
      value={{
        state,
        // Change scope type type here so we can get rid of setSCopeItemsCategoryMap
        setScopeItems: (items: Scope[]) =>
          dispatch({ type: Asset3DActionType.SetScopeItems, payload: items }),
        setScopeItemsCategoryMap: (map: Map<string, CategoryMap[]>) =>
          dispatch({
            type: Asset3DActionType.SetScopeItemsCategoryMap,
            payload: map,
          }),
        setCameraTransform: (position: Vector3, rotation: Quaternion) =>
          dispatch({
            type: Asset3DActionType.SetCameraTransform,
            payload: {
              position,
              rotation,
            },
          }),
        setSelectedScope: (scope: Scope) =>
          dispatch({
            type: Asset3DActionType.SetSelectedScope,
            payload: scope,
          }),
        setFocusedScopeItem: (scopeItem: ScopeItem | null) =>
          dispatch({
            type: Asset3DActionType.FocusOnScopeItem,
            payload: scopeItem,
          }),
      }}
    >
      {children}
    </Asset3DContext.Provider>
  );
};

export default Asset3DProvider;
