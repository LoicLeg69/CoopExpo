const AbstractRepository = require("./AbstractRepository");

class ProjectRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "Recipe" as configuration
    super({ table: "project" });
  }

  // The C of CRUD - Create operation

  async create(project) {

 // Execute the SQL INSERT query to add a new Project to the "project" table
const [result] = await this.database.query(
  `INSERT INTO project (title, stack_technique, project_management, description, image, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
  [project.title, project.stack_technique, project.project_management, project.description, project.image, project.user_id]
);

    // Return the ID of the newly inserted Recipe
    return result.insertId;
  }

  // The Read method - R from CRUD (all users)
  async readAll() {
    // Execute the SQL SELECT query to retrieve all the rows in the "user" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    //  Return the table of rows
    return rows;
  }

  // The update method - CRUD U
  async update(id, updatedFields) {
    // Build the update SQL query
    const fields = Object.keys(updatedFields)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(updatedFields);
    values.push(id);

    await this.database.query(
      `UPDATE ${this.table} SET ${fields} WHERE id = ?`,
      values
    );

    return this.readById(id); // Return the updated project
  }

  // The Delete method - CRUD D
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);

    return true; // Return true to indicate that the project has been deleted
  }

  async readByUser(userId) {
    // Execute the SQL SELECT query to retrieve all rows from the "project" table
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} 
       INNER JOIN user ON project.user_id = user.id 
       WHERE user.id = ?`,
      [userId]
    );
  
    // Return the array of rows
    return rows;
  }
  

}

module.exports = ProjectRepository;
