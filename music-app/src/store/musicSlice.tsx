import {createSlice} from '@reduxjs/toolkit';
import { ISongsState } from '../types';

const initialState: ISongsState = {
  music: [],
  isLoading: false
}

export const musicSlice = createSlice({
  name: 'music',
  initialState: initialState,
  reducers: {
    getMusicFetch: (state) => {
        state.isLoading = true;
    },

    addSong: (state, action) => {
        state.isLoading = true;
        action.payload = action.payload
    },

    editSong: (state, action) => {
        state.isLoading = true;
        action.payload = action.payload
    },

    deleteSong: (state, action) => {
        state.isLoading = true;
        action.payload = action.payload
    },

    getAddSongSuccess: (state, action) => {        
        state.music.push(action.payload);
        state.isLoading = false;
    },

    getEditSongSuccess: (state, action) => {
      state.music = state.music.map((song) => {
        if (song.id === action.payload.id) {
            return {
                ...song,  
                title: action.payload.title,
                artist: action.payload.artist,
                album: action.payload.album,
                year: action.payload.year
            }
        }
        return song;
        })
        state.isLoading = false;
    },

    getDeleteSongSuccess: (state, action) => {
        state.music = state.music.filter((song) => song.id !== action.payload);
        state.isLoading = false;
    },
    
    getMusicSuccess: (state, action) => {
        state.music = action.payload;
        state.isLoading = false;
    },  

    getMusicFailure: (state) => {
        state.isLoading = false;
    }
  },
});

export const { getMusicFetch, getMusicSuccess, getMusicFailure, editSong, deleteSong, getDeleteSongSuccess, getEditSongSuccess, getAddSongSuccess, addSong   } = musicSlice.actions;

export default musicSlice.reducer;