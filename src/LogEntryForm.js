import React, { useState } from "react";
import "./LogEntryForm.css";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Input, Button } from "@material-ui/core";
import { postLogEntries } from "./Api";

function LogEntryForm({ latitude, longitude, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postToDB = async (e) => {
    e.preventDefault();
    const entry = {
      title: title,
      description: description,
      comments: Comments,
      rating: rating,
      visitDate: date,
      lattitude: latitude,
      longitude: longitude,
      image: imageLink,
    };
    try {
      setLoading(true);
      await postLogEntries(entry);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className="logEntryForm">
      {error ? <h3 className="error">{error}</h3> : null}
      <FormControl>
        <InputLabel htmlFor="my-location">Location Name</InputLabel>
        <Input
          id="my-location"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-description">Description</InputLabel>
        <Input
          id="my-description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="comment">Comments</InputLabel>
        <Input
          id="comment"
          value={Comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="visitDate"></InputLabel>
        <Input
          id="visitDate"
          type="Date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="rating">Rate 1 to 10</InputLabel>
        <Input
          id="rating"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="rating">Image Link</InputLabel>
        <Input
          id="rating"
          type="text"
          required
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
      </FormControl>
      <Button
        type="submit"
        disabled={loading}
        onClick={postToDB}
        style={{ margin: "5px", color: "#F88B3B " }}
      >
        {loading ? "Loading..." : "Create Entry"}
      </Button>
    </div>
  );
}

export default LogEntryForm;
