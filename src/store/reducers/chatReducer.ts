import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "~store/initialStates";

const ChatReducer = (
  state = INITIAL_STATE.chat,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.SEND_MESSAGE: {
      return {
        ...state,
        step: state.step + 1,
        messages: action.payload,
      };
    }
    case ACTION_TYPES.LOAD_EARLIER_MESSAGES: {
      return {
        ...state,
        loadEarlier: true,
        isLoadingEarlier: false,
        messages: action.payload,
      };
    }
    case ACTION_TYPES.LOAD_EARLIER_START: {
      return {
        ...state,
        isLoadingEarlier: true,
      };
    }
    case ACTION_TYPES.SET_IS_TYPING: {
      return {
        ...state,
        isTyping: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default ChatReducer;
