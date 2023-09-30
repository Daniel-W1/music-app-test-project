import { put, call, takeEvery } from 'redux-saga/effects';
import { getAddSongSuccess, getDeleteSongSuccess, getEditSongSuccess, getMusicSuccess } from './musicSlice';
import axios, { AxiosResponse } from 'axios';
import { SongType } from '../types';

function* getMusic(): Generator<any, void, AxiosResponse<SongType>> {
  try {
    const response: AxiosResponse<SongType> = yield call(() => {
      return axios.get("http://localhost:3000/songs").then((res) => res);
    });
    yield put(getMusicSuccess(response.data));
  } catch (err) {
    console.log("[ERROR WHILE FETCHING SONGS]", err);
  }
}

function* addMusic(action: {
  type: string;
  payload: {
    title: string;
    artist: string;
    album: string;
    year: number;
  };
}): Generator<any, void, AxiosResponse<SongType>> {
  try {
    const response: AxiosResponse<SongType> = yield call(() => {
      return axios.post("http://localhost:3000/songs", action.payload).then((res) => res);
    });
    yield put(getAddSongSuccess(response.data));
  } catch (err) {
    console.log("[ERROR WHILE ADDING SONG]", err);
  }
}


function* editSong(action: {
  type: string;
  payload: {
    id: number;
    formData: {
      title: string;
      artist: string;
      album: string;
      year: number;
    };
  };
}): Generator<any, void, AxiosResponse<SongType>> {
  try {
    console.log("[EDITING SONG]", action.payload);
    
    const response: AxiosResponse<SongType> = yield call(() => {
      return axios.put(`http://localhost:3000/songs/${action.payload.id}`, action.payload).then((res) => res);
    });
    yield put(getEditSongSuccess(response.data));
  } catch (err) {
    console.log("[ERROR WHILE EDITING SONG]", err);
  }
}

function* deleteSong(action:{
  type: string;
  payload: number;
}): Generator<any, void, AxiosResponse<SongType>> {
  try {
    const response: AxiosResponse<SongType> = yield call(() => {
      return axios.delete(`http://localhost:3000/songs/${action.payload}`).then((res) => res);
    });
    
    
    yield put(getDeleteSongSuccess(action.payload));
  } catch (err) {
    console.log("[ERROR WHILE DELETING SONG]", err);
  }
}

function* musicSaga() {
  yield takeEvery("music/getMusicFetch", getMusic);
}

function* addMusicSaga() {
  yield takeEvery("music/addSong", addMusic);
}

function* editSongSaga() {
  yield takeEvery("music/editSong", editSong);
}

function* deleteSongSaga() {
  yield takeEvery("music/deleteSong", deleteSong);
}

export {musicSaga, editSongSaga, deleteSongSaga, addMusicSaga};
