// src/App.jsx
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import * as trackService from "./services/trackService";
import Home from "./components/Home";
import TrackForm from "./components/TrackForm";

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [play, setPlay] = useState(null);

  const updateSelected = (track) => {
    setSelected(track);
  };

  const updatePlay = (track) => {
    setPlay(track);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      setTrackList([...trackList, newTrack]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId);
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }
      const updatedTrackList = trackList.map((track) =>
        // If the id of the current pet is not the same as the updated pet's id, return the existing pet. If the id's match, instead return the updated pet.
        track._id !== updatedTrack._id ? track : updatedTrack
      );
      // Set petList state to this updated array
      setTrackList(updatedTrackList);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);
      if (deletedTrack.error) {
        throw new Error(deletedTrack.error);
      }
      const updatedTrackList = trackList.filter((track) => {
        return track._id !== trackId;
      });
      setTrackList(updatedTrackList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await trackService.index();
        setTrackList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTracks();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              trackList={trackList}
              updateSelected={updateSelected}
              selected={selected}
              deleteTrack={deleteTrack}
              play={play}
              updatePlay={updatePlay}
              setPlay={setPlay}
            />
          }
        />
        <Route
          path="/add-track"
          element={
            <TrackForm
              handleAddTrack={handleAddTrack}
              handleUpdateTrack={handleUpdateTrack}
              selected={selected}
            />
          }
        />
        <Route
          path="/edit-track/:trackId"
          element={
            <TrackForm
              handleAddTrack={handleAddTrack}
              handleUpdateTrack={handleUpdateTrack}
              selected={selected}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
