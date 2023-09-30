export type SongType = {
    id?: number;
    title: string;
    artist: string;
    album: string;
    year: number;
};

export type ISongsState = {
    music: SongType[];
    isLoading: boolean;
};


export type AddSong = (song: SongType) => void;

export type DeleteSong = (id: number) => void;

export type EditSong = (id: number, song: SongType) => void;

export type GetSongs = () => void;


export type SongsStateType = {
    music: ISongsState
}