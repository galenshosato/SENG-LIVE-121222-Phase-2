// Deliverable 5: Using the useHistory hook, automatically redirect the user 
// to the `ProjectShow` page upon submit

import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

const ProjectEditForm = ({ onUpdateProject }) => {
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    phase: "",
    link: "",
    image: "",
  });

  const history = useHistory()

  const { name, about, phase, link, image } = formData;
  const {id} = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/projects/${id}`)
      .then((res) => res.json())
      .then((project) => setFormData(project));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(`http://localhost:4000/projects/${id}`, configObj)
      .then((resp) => resp.json())
      .then((updatedProj) => {
        onUpdateProject(updatedProj);
        history.push(`/projects/${id}`)
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form" autoComplete="off">
      <h3>Edit Project</h3>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleChange}
      />

      <label htmlFor="about">About</label>
      <textarea id="about" name="about" value={about} onChange={handleChange} />

      <label htmlFor="phase">Phase</label>
      <select name="phase" id="phase" value={phase} onChange={handleChange}>
        <option value="1">Phase 1</option>
        <option value="2">Phase 2</option>
        <option value="3">Phase 3</option>
        <option value="4">Phase 4</option>
        <option value="5">Phase 5</option>
      </select>

      <label htmlFor="link">Project Homepage</label>
      <input
        type="text"
        id="link"
        name="link"
        value={link}
        onChange={handleChange}
      />

      <label htmlFor="image">Screenshot</label>
      <input
        type="text"
        id="image"
        name="image"
        value={image}
        onChange={handleChange}
      />

      <button type="submit">Update Project</button>
    </form>
  );
};

export default ProjectEditForm;
