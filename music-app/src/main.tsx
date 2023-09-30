import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import musicReducer from "./store/musicSlice.tsx"
import modalReducer from "./store/modalSlice.ts"
import { musicSaga, editSongSaga, deleteSongSaga, addMusicSaga } from './store/musicSaga.tsx'
import { all } from 'redux-saga/effects'

function* rootSaga(){
  yield all([
    musicSaga(),
    editSongSaga(),
    deleteSongSaga(),
    addMusicSaga()  
  ]);
}

const saga = createSagaMiddleware()
const store = configureStore({
  reducer: {
    music: musicReducer,
    modal: modalReducer
  },
  middleware: [saga]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

saga.run(rootSaga);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
