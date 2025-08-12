
export const clientsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CLIENT":
      return [...state, 
        {
          ...action.payload,
           //id: new Date().getTime() Genera un ID único basado en la fecha actual
        }
      ];

    case "DELETE_CLIENT":
      return state.filter(client => client.id !== action.payload);

    case "UPDATE_CLIENT":
      return state.map(client => {
        if (client.id === action.payload.id) {
          return { ...action.payload };
        }
        return client;
      });

    case "LOAD_CLIENTS":
      return action.payload;

    default:
      return state;
  }
};
