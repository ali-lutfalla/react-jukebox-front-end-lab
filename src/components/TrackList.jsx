import { Link } from 'react-router-dom';

const TrackList = ({ trackList, updateSelected, deleteTrack, updatePlay }) => {
    
    return (
        <>
            <Link to={'/add-track'}>add new track</Link>
            <ul>
                {trackList.map((track) => (
                    <li key={track._id}>
                        {track.title} by {track.artist}
                        <div onClick={() => { updateSelected(track); console.log(track);}}>
                            <Link to={`/edit-track/${track._id}`}>update</Link>
                        </div>
                        <button onClick={() => {deleteTrack(track._id)}}>delete</button>
                        <button onClick={() => updatePlay(track)}>Play</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TrackList;