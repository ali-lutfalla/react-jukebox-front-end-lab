import TrackList from './TrackList';
import NowPlaying from './NowPlaying';

const Home = (props) => {
    return (
        <>
        <h1>JukeBox</h1>
        <TrackList trackList={props.trackList} updateSelected={props.updateSelected} deleteTrack={props.deleteTrack} updatePlay={props.updatePlay} setPlay={props.setPlay}/>
        {props.play ? <NowPlaying play={props.play} /> : null}
        </>
    )
}

export default Home;