const NowPlaying = (props) => {
    return (
        <>
        <h1>Now Playing</h1>
        <p>{props.play.title} by {props.play.artist}</p>
        </>
    )
};

export default NowPlaying;