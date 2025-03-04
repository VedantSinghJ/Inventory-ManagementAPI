# Inventory Project (Ongoing)

## About the Project

The Satellite Inventory Project is designed to manage satellite data alongside secure user management. The project leverages MongoDB with Mongoose for data storage and Bcrypt for password hashing, ensuring robust security practices. Environment variables set in the `.env` file configure sensitive information, and the `.gitignore` file excludes unnecessary or sensitive files such as `node_modules/`, `.env`, `package-lock.json`, and `passwordTest.js`.

## Role-Based Access Control (RBAC)

The system uses RBAC to manage user permissions based on their roles. The following roles are defined:

- **Admin**
  - **Access:** Full access to all functionalities including user management and satellite operations.
  
- **Engineer**
  - **Access:** Can create, read, and update satellite data.
  - **Restrictions:** Limited deletion capabilities, per project policies.
  
- **Manager**
  - **Access:** Primarily read access to satellite data and inventory summaries.
  - **Restrictions:** Some functionalities may be restricted to ensure data integrity.
  
- **Viewer**
  - **Access:** Read-only access to satellite data and personal user details.
  - **Restrictions:** No permission to create, update, or delete data.

## Additional Information

- **Database Connection:** Configuration for MongoDB is defined in `src/config/db.js`.
- **Middleware:** Security, logging, and error handling are implemented through dedicated middleware.
- **Environment Control:** Essential variables, such as database connection strings and server ports, are managed using the `.env` file.

This overview provides insights into the project’s architecture and security aspects without including details on specific API routes.
