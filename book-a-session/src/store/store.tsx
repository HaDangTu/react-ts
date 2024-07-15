import { createContext, useContext, useReducer, type ReactNode } from 'react';

export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  duration: number;
  date: string;
  image: string;
};

type BookSessionState = {
  items: Session[];
};

const initialState: BookSessionState = {
  items: [],
};

type BookSessionPayload = {
  name: string;
  email: string;
  session: Session;
};

type BookSessionAction = {
  type: 'BOOK_SESSION';
  payload: BookSessionPayload;
};

type CancelSessionAction = {
  type: 'CANCEL_SESSION';
  payload: string;
};

const appReducer = (
  state: BookSessionState,
  action: BookSessionAction | CancelSessionAction
) => {
  switch (action.type) {
    case 'BOOK_SESSION':
      const isExist = state.items.find(
        (item) => item.id === action.payload.session.id
      );
      if (!isExist) {
        return {
          ...state,
          items: [...state.items, action.payload.session],
        };
      }

      return state;
    case 'CANCEL_SESSION':
      const removeIdx = state.items.findIndex(
        (item) => item.id === action.payload
      );
      return {
        ...state,
        items: state.items.splice(removeIdx, 1),
      };
    default:
      return state;
  }
};

type AppContextValue = {
  state: BookSessionState;
  bookSession: (data: BookSessionPayload) => void;
  cancelSession: (sessionId: string) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

export const useAppContext = (): AppContextValue =>  {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('App Context is null');
  }

  return context;
};

type AppContextProviderProps = {
  children: ReactNode;
};

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue: AppContextValue = {
    state,
    bookSession: (data: BookSessionPayload) => {
      dispatch({ type: 'BOOK_SESSION', payload: data });
    },
    cancelSession: (sessionId: string) => {
      dispatch({ type: 'CANCEL_SESSION', payload: sessionId });
    },
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
