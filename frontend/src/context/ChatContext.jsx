import { createContext, useContext, useReducer } from "react";
import { invokeBattle } from "../services/api";

const ChatContext = createContext();

const initialState = {
  currentInteraction: null, // { query: "", modelA: "", modelB: "", judge: null, isLoading: false, error: "" }
  history: [], // Stores past interactions
};

function chatReducer(state, action) {
  switch (action.type) {
    case "START_BATTLE":
      return {
        ...state,
        currentInteraction: {
          query: action.payload,
          modelA: "",
          modelB: "",
          judge: null,
          isLoading: true,
          error: "",
        },
      };
    case "BATTLE_SUCCESS":
      return {
        ...state,
        currentInteraction: {
          ...state.currentInteraction,
          modelA: action.payload.solution_1,
          modelB: action.payload.solution_2,
          judge: action.payload.judge,
          isLoading: false,
        },
      };
    case "BATTLE_ERROR":
      return {
        ...state,
        currentInteraction: {
          ...state.currentInteraction,
          isLoading: false,
          error: action.payload,
        },
      };
    case "SAVE_CURRENT_TO_HISTORY":
      if (state.currentInteraction && !state.currentInteraction.isLoading) {
        return {
          ...state,
          history: [...state.history, state.currentInteraction],
          currentInteraction: null,
        };
      }
      return state;
    case "CLEAR_HISTORY":
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
}

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const startBattle = async (query) => {
    // If there is an existing finished interaction, push it to history
    if (state.currentInteraction && !state.currentInteraction.isLoading) {
       dispatch({ type: "SAVE_CURRENT_TO_HISTORY" });
    }
    
    dispatch({ type: "START_BATTLE", payload: query });

    try {
      const resp = await invokeBattle(query);
      if (resp && resp.result) {
         dispatch({ type: "BATTLE_SUCCESS", payload: resp.result });
      } else {
         throw new Error("Invalid response from server");
      }
    } catch (error) {
      dispatch({ 
        type: "BATTLE_ERROR", 
        payload: error.response?.data?.error || "Failed to communicate with AI servers. Ensure backend is running." 
      });
    }
  };

  return (
    <ChatContext.Provider value={{ state, dispatch, startBattle }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
