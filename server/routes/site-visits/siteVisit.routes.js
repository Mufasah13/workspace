const express = require("express");
const authenticateJWT = require("../../middleware/authenticateJWT");
const AccessRoles = require("../../constants/accessRoles");
const router = express.Router();

// Middleware for checking user permissions
const checkPermissions = (allowedRoles) => {
  return (req, res, next) => {
    const userAccessRole = req.user.Accessrole;

    if (allowedRoles.some((role) => userAccessRole.includes(role))) {
      next();
    } else {
      res.status(403).json({
        message: "Forbidden: You don't have permission to perform this action.",
      });
    }
  };
};

module.exports = (connection) => {
  // Create a new site visit request
  router.post("/", authenticateJWT, async (req, res) => {
    const { project_id, pickup_location, pickup_time, pickup_date, clients } =
      req.body;
    const marketer_id = req.body.marketer_id; // Get the authenticated user ID from the JWT payload

    try {
      // Insert the site visit request into the `site_visits` table
      connection.query(
        "INSERT INTO site_visits (marketer_id, project_id, pickup_location, pickup_time, pickup_date, status) VALUES (?, ?, ?, ?, ?, 'pending')",
        [marketer_id, project_id, pickup_location, pickup_time, pickup_date],
        (err, result) => {
          if (err) throw err;

          const siteVisitId = result.insertId; // Get the site_visit_id of the created site visit request

          // Insert clients associated with this site visit request into the `clients` table
          const clientValues = clients.map((client) => [
            client.name,
            client.email,
            client.phone_number,
            siteVisitId, // Add the siteVisitId here
          ]);
          connection.query(
            "INSERT INTO clients (name, email, phone_number, site_visit_id) VALUES ?",
            [clientValues],
            (err, result) => {
              if (err) throw err;
              res
                .status(201)
                .json({ message: "Site visit request created successfully!" });
            }
          );
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating the site visit request.",
      });
    }
  });

  // Retrieve all site visit requests
  router.get("/", authenticateJWT, async (req, res) => {
    try {
      connection.query(
        `SELECT site_visits.*, 
          clients.id as client_id, 
          clients.name, 
          clients.email, 
          clients.phone_number
         FROM site_visits
         LEFT JOIN clients 
         ON site_visits.id = clients.site_visit_id`,
        (err, results) => {
          if (err) throw err;

          // Process the results here, then send the response
          const siteVisitsMap = {};

          results.forEach((row) => {
            if (!siteVisitsMap[row.id]) {
              siteVisitsMap[row.id] = {
                id: row.id,
                site_name: row.site_name,
                pickup_location: row.pickup_location,
                pickup_time: row.pickup_time,
                pickup_date: row.pickup_date,
                status: row.status,
                created_by: row.created_by,
                clients: [],
              };
            }

            if (row.client_id) {
              siteVisitsMap[row.id].clients.push({
                id: row.client_id,
                name: row.name,
                email: row.email,
                phone_number: row.phone_number,
              });
            }
          });

          const siteVisitsArray = Object.values(siteVisitsMap);

          res.json(siteVisitsArray);
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching site visit requests.",
      });
    }
  });

  // Update site visit request status
  router.patch(
    "/:id",
    authenticateJWT,
    checkPermissions([
      AccessRoles.isAdmin1,
      AccessRoles.isAdmin2,
      AccessRoles.isAdmin3,
      AccessRoles.isMarketer,
    ]),
    async (req, res) => {
      const { status } = req.body;
      const { id } = req.params;

      try {
        connection.query(
          "UPDATE site_visits SET status = ? WHERE id = ?",
          [status, id],
          (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
              res
                .status(404)
                .json({ message: "Site visit request not found." });
            } else {
              res.json({
                message: "Site visit request status updated successfully.",
              });
            }
          }
        );
      } catch (error) {
        res.status(500).json({
          message:
            "An error occurred while updating the site visit request status.",
        });
      }
    }
  );

  // Delete a site visit request
  router.delete(
    "/:id",
    authenticateJWT,
    checkPermissions([
      AccessRoles.isAdmin1,
      AccessRoles.isAdmin2,
      AccessRoles.isAdmin3,
    ]),
    async (req, res) => {
      const { id } = req.params;

      try {
        connection.query(
          "DELETE FROM site_visits WHERE id = ?",
          [id],
          (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
              res
                .status(404)
                .json({ message: "Site visit request not found." });
            } else {
              res.json({ message: "Site visit request deleted successfully." });
            }
          }
        );
      } catch (error) {
        res.status(500).json({
          message: "An error occurred while deleting the site visit request.",
        });
      }
    }
  );

  return router;
};
