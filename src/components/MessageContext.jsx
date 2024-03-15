import { createContext, useReducer } from "react";

const messageReducer = (state, action) => {
  if (action.type === "NEW") {
    return action.payload;
  } else if (action.type === "RESET") {
    return null;
  }
  return state;
};

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, "");

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
