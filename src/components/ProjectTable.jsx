import React, { useState } from "react";
import "../styles/Table.css";

const ProjectTable = ({ projects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(projects.length / recordsPerPage);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return projects.slice(startIndex, startIndex + recordsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-card">
        <table className="project-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((project) => (
              <tr key={project["s.no"]}>
                <td>{project["s.no"]}</td>
                <td>{project["percentage.funded"]}</td>
                <td>{project["amt.pledged"].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length > 0 && (
          <div className="pagination">
            <button
              className="btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTable;
