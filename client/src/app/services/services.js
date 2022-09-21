export const storage = (key) => {
  let store = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];
  const save = () => localStorage.setItem(key, JSON.stringify(store));
  return {
    getStoreItem: () => store,
    setStoreItem: (value) => {
      store.push(value);
      save();
    },
    updateStoreItem: (newStore) => {
      store = newStore;
      save();
    },
    removeStoreItem: (newStore) => {
      store = newStore;
      save();
    },
  };
};
