// Deliverable 3: Add navigation to the application using the `Link`
// component

import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectListItem = ({
  project,
  enterProjectEditModeFor,
  onDeleteProject,
}) => {
  const { id, image, about, name, link, phase } = project;

  const [clapCount, setClapCount] = useState(0);

  const handleClap = () => setClapCount(clapCount + 1);

  const handleEditClick = () => {
    enterProjectEditModeFor(id);
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/projects/${id}`, {
      method: "DELETE",
    });
    onDeleteProject(project)
      .then((resp) => console.log(resp))
      .then(onDeleteProject(project));
  };

  return (
    <li className="card">
      <figure className="image">
        <img src={image} alt={name} />
        <button onClick={handleClap} className="claps">
          👏{clapCount}
        </button>
      </figure>

      <section className="details">
        <h4>{name}</h4>
        <p>{about}</p>
        {link ? (
          <p>
            <a href={link}>Link</a>
          </p>
        ) : null}
      </section>

      <footer className="extra">
        <span className="badge blue">Phase {phase}</span>
        <div className="manage">
          <Link to={`/projects/${id}/edit`}>
          <button onClick={handleEditClick}>
            <FaPencilAlt />
          </button>
          </Link>
          <Link>
          <button onClick={handleDeleteClick}>
            <FaTrash />
          </button>
          </Link>
        </div>
      </footer>
    </li>
  );
};

export default ProjectListItem;
