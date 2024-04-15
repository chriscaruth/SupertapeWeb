import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Scope } from "../models/Scope";
import { Vector3 } from "three";

enum Asset3DActionType {
  SetScopeItems = "SET_SCOPE_ITEMS",
  FocusOnScopeItem = "FOCUS_ON_SCOPE_ITEM",
  SetCameraPosition = "SET_CAMERA_POSITION",
  SetSelectedScope = "SET_SELECTED_SCOPE",
}

interface Asset3DState {
  scopes: Scope[];
  selectedScope: Scope | null;
  focusedScopeItem: Scope | null;
  cameraPosition: Vector3;
}

interface SetScopeItemsAction {
  type: Asset3DActionType.SetScopeItems;
  payload: Scope[];
}

interface SetSelectedScopeAction {
  type: Asset3DActionType.SetSelectedScope;
  payload: Scope;
}

interface FocusOnScopeItemAction {
  type: Asset3DActionType.FocusOnScopeItem;
  payload: Scope;
}

interface SetCameraPositionAction {
  type: Asset3DActionType.SetCameraPosition;
  payload: Vector3;
}

type Asset3DAction =
  | SetScopeItemsAction
  | FocusOnScopeItemAction
  | SetCameraPositionAction
  | SetSelectedScopeAction;

interface IAsset3DContext {
  state: Asset3DState;
  setScopeItems: (items: Scope[]) => void;
  setCameraPosition: (position: Vector3) => void;
  setSelectedScope: (scope: Scope) => void;
}

interface IAsset3DProvider {
  children: ReactNode;
}

const Asset3DContext = createContext<IAsset3DContext>({} as IAsset3DContext);

export const useAsset3D = () => useContext(Asset3DContext);

const asset3DReducer = (state: Asset3DState, action: Asset3DAction) => {
  switch (action.type) {
    case Asset3DActionType.SetScopeItems:
      console.log("Setting scope items");
      return { ...state, scopes: action.payload };
    case Asset3DActionType.FocusOnScopeItem:
      return { ...state, focusedScopeItem: action.payload };
    case Asset3DActionType.SetCameraPosition:
      return { ...state, cameraPosition: action.payload };
    case Asset3DActionType.SetSelectedScope:
      return { ...state, selectedScope: action.payload };
    default:
      return state;
  }
};

export const Asset3DProvider = ({ children }: IAsset3DProvider) => {
  const [state, dispatch] = useReducer(asset3DReducer, {
    scopes: [],
    focusedScopeItem: null,
    selectedScope: null,
    cameraPosition: new Vector3(0, 0, 0),
  });

  useEffect(() => {
    dispatch({
      type: Asset3DActionType.SetCameraPosition,
      payload: new Vector3(0, 0, 0.5), // use the scope item camera position
    });
  }, [state.focusedScopeItem]);

  return (
    <Asset3DContext.Provider
      value={{
        state,
        setScopeItems: (items: Scope[]) =>
          dispatch({ type: Asset3DActionType.SetScopeItems, payload: items }),
        setCameraPosition: (position: Vector3) =>
          dispatch({
            type: Asset3DActionType.SetCameraPosition,
            payload: position,
          }),
        setSelectedScope: (scope: Scope) =>
          dispatch({
            type: Asset3DActionType.SetSelectedScope,
            payload: scope,
          }),
      }}
    >
      {children}
    </Asset3DContext.Provider>
  );
};

export default Asset3DProvider;
