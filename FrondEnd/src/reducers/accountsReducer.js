

export const accountsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ACCOUNT":
      return [
        ...state, 
        {
          ...action.payload,
           //id: new Date().getTime() // Genera un ID único basado en la fecha actual
        }
      ];
    
    case "REMOVE_ACCOUNT":
      return state.filter(account => account.id !== action.payload);

    case "UPDATE_ACCOUNT":
      return state.map(account => {
        if (account.id === action.payload.id) {
          return {  ...account, ...action.payload };
        }
        return account;
    });

    case "LOAD_ACCOUNTS":
      return action.payload;

    case "ACCOUNTS_BY_CLIENT":
      return action.payload;

    default:
      return state;

  }
};
