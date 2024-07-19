/* eslint-disable camelcase */
const path = require("path");

// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all projects from the database
    const projects = await tables.project.readAll();

    // Respond with the projects in JSON format
    res.json(projects);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific project from the database based on the provided ID
    const project = await tables.project.read(req.params.id);

    // If the project is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the project in JSON format
    if (project === null) {
      res.sendStatus(404);
    } else {
      res.json(project);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the project data from the request body
  const { title, stack_technique, project_management, description} = req.body;

  const image = req.file ? path.basename(req.file.path) : null; // Utilise seulement le nom de fichier

  try {
    const project = {
      title,
      stack_technique,
      project_management,
      description,
      image,
    };

    // Insert the project into the database
    const insertId = await tables.project.create(project);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted project
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the item id from the request body
  const { id } = req.body;
  try {
    // Delete the Projects from the database
    const deletedProjects = await tables.project.delete(id);

    // Respond with HTTP 200 (OK) and the response data
    res.status(200).json({ deletedProjects });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  destroy,
};
