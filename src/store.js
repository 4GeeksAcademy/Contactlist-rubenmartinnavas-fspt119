export const initialStore = () => ({
  Contacts: []
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "setContacts":
      return { ...store, Contacts: action.payload };

    case "addContact":
      return { ...store, Contacts: [...store.Contacts, action.payload] };

    case "updateContact":
      return {
        ...store,
        Contacts: store.Contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    default:
      throw new Error("Unknown action.");
  }
}
