import React, { useState } from 'react';

const resumebuilder = () => {
  const [sections, setSections] = useState([
    { id: 1, name: 'Profile Summary', description: 'Enter a brief summary of your professional profile.', enabled: true, editing: false, showDescription: false },
    { id: 2, name: 'Academic and Cocurricular Achievements', description: 'Highlight your academic accomplishments and cocurricular activities.', enabled: true, editing: false, showDescription: false },
    { id: 3, name: 'Summer Internship Experience', description: 'Showcase your experience and skills gained from summer internships.', enabled: true, editing: false, showDescription: false },
    { id: 4, name: 'Work Experience', description: 'Provide details of your previous work experience and responsibilities.', enabled: true, editing: false, showDescription: false },
    { id: 5, name: 'Projects', description: 'Highlight the projects you have worked on and the skills utilized.', enabled: true, editing: false, showDescription: false },
    { id: 6, name: 'Certifications', description: 'Include any certifications or professional courses you have completed.', enabled: true, editing: false, showDescription: false },
    { id: 7, name: 'Leadership Positions', description: 'Outline your leadership roles and responsibilities in organizations.', enabled: true, editing: false, showDescription: false },
    { id: 8, name: 'Extracurricular', description: 'Mention your involvement in extracurricular activities and clubs.', enabled: true, editing: false, showDescription: false },
    { id: 9, name: 'Education', description: 'Provide details of your educational qualifications and achievements.', enabled: true, editing: false, showDescription: false },
  ]);

  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
    setDraggingIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    if (draggingIndex !== null && draggingIndex !== index) {
      const updatedSections = [...sections];
      const draggedSection = updatedSections[draggingIndex];
      updatedSections.splice(draggingIndex, 1);
      updatedSections.splice(index, 0, draggedSection);
      setSections(updatedSections);
      setDraggingIndex(index);
    }
  };

  const handleToggleSection = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].enabled = !updatedSections[index].enabled;
    setSections(updatedSections);
  };

  const handleDescriptionToggle = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].showDescription = !updatedSections[index].showDescription;
    setSections(updatedSections);
  };

  const handleEditClick = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].editing = true;
    setSections(updatedSections);
  };

  const handleSaveEd = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].editing = false;
    setSections(updatedSections);
  };

  const handleSectionNameChange = (event, index) => {
    const updatedSections = [...sections];
    updatedSections[index].name = event.target.value;
    setSections(updatedSections);
  };

  const handleSave = () => {
    // Save logic here
    console.log('Selected Sections: ', sections);
  };

  return (
    <div className="resume-builder">
      <h1>Select your sections</h1>
      <ul id="sections-list" style={{ listStyleType: 'none', padding: 0 }}>
        {sections.map((section, index) => (
          <li
            key={section.id}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => handleDragOver(event, index)}
          >
            <div className="section">
              <span className="drag-handle">&#9776;</span>
              <button className="description-button" onClick={() => handleDescriptionToggle(index)}></button>
              {section.showDescription && <p className="section-description">{section.description}</p>}
              {section.editing ? (
                <>
                  <input className="section-name" type="text" value={section.name} onChange={(e) => handleSectionNameChange(e, index)} autoFocus />
                  <button className="save-button" onClick={() => handleSaveEd(index)}>
                    Save
                  </button>
                </>
              ) : (
                <span className="section-name">{section.name}</span>
              )}

              <button className="edit-button" onClick={() => handleEditClick(index)}>
                
              </button>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={section.enabled}
                  onChange={() => handleToggleSection(index)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      <button id="save-button" onClick={() => handleSave}>Save and Next</button>
    </div>
  );
};

export default resumebuilder;
