import { useState } from "react";

import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const classMode = isDarkMode ? 'App' : 'App light'

  function handleClick(event) {
    fetch("http://localhost:4000/projects")
  .then(resp => resp.json())
  .then(projects =>setProjects(projects))
  }

  // # Deliverable 1: Configure a <button> in our App 
  // that will use json-server to fetch projects 
  // and store them in state

  // - Add an onClick event listener to the "Load Projects" 
  // button

  // - When the button is clicked, make a fetch 
  // request to "http://localhost:4000/projects"
  // and set the `projects` state to the value 
  // returned by the response

  return (
    <div className={classMode}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <ProjectForm />
      <button onClick={handleClick}>Load Projects</button>
      <ProjectList projects={projects} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
};

export default App;
