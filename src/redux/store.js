import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import collapsible from './reducers/CollapsedReducer'
import isLoding from './reducers/LoadingReducer'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['isLoding']
}

const AllReducers = combineReducers({
  collapsible,
  isLoding
})

const persistedReducer = persistReducer(persistConfig, AllReducers)

const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

export { store, persistor }
