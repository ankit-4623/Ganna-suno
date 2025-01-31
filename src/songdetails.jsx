import songalldata from '../api/songData.json';

export const song_all_Det = ({ params }) => {
    const ide = parseInt(params.id, 10); // Convert string param to a number
    const dataofsong = songalldata.find((cur) => cur.id === ide);

    return dataofsong || { error: "Song not found" }; // Return the song data or an error object
};
