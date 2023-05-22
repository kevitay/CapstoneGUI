import React, { createContext, useReducer } from 'react';

const initialState = {
  eventsList: [],
};

export const EventContext = createContext();

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        eventsList: [...state.eventsList, action.payload],
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        eventsList: state.eventsList.filter((event) => event.id !== action.payload),
      };
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  return <EventContext.Provider value={{ state, dispatch }}>{children}</EventContext.Provider>;
};
