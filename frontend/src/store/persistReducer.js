import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'shawee', // a chave redireciona qual aplicacao vai usar qual storage
      storage,
      whiteList: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
