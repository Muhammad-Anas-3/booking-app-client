import { useReducer, createContext } from "react";

const initial_state = {
  search: "",
  startDate: undefined,
  endDate: undefined,
};

const SearchContext = createContext();

const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_STATE":
      return {
        ...state,
        search: action.payload.search,
      };

    case "RESET_STATE":
      return initial_state;

    default:
      return state;
  }
};

const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initial_state);

  return (
    <SearchContext.Provider
      value={{
        search: state.search,
        startDate: state.startDate,
        endDate: state.endDate,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
