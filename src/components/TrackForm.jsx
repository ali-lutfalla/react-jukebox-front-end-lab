import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrackForm = (props) => {
  const navigate = useNavigate();

  const initialState = {
    title: "",
    artist: "",
  };

  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  );

  console.log(props.selected)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.selected) {
      props.handleUpdateTrack(formData, props.selected._id);
      navigate("/");
    } else {
      props.handleAddTrack(formData);
      setFormData(initialState);
      navigate("/");
    }
  };

  return (
    <>
      <h1>New Banger!!!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="artist">Artist: </label>
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default TrackForm;
