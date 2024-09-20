import React, { useState, useEffect } from "react";
import PageTitle from "../../../../../components/PageTitles/PageTitle";
import axios from "axios";
import "./AdminAssignCreatedForm.css";
import { useParams } from "react-router-dom";
import { FcDeleteRow } from "react-icons/fc";
import { IoTrashBinSharp } from "react-icons/io5";

import { FaClockRotateLeft } from "react-icons/fa6";

const AdminAssignCreatedForm = () => {
  const [promoters, setPromoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [promoterName, setPromoterName] = useState("");
  const [promoterEmailId, setPromoterEmailId] = useState("");
  const [password, setPassword] = useState("");

  const { formId } = useParams();

  const fetchPromoters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/promoter/fetchPromoters"
      );
      if (response.status === 200) {
        const promotersWithAssignment = response.data.data.map((promoter) => ({
          ...promoter,
          hasFormAssigned: promoter.forms.includes(formId),
        }));
        setPromoters(promotersWithAssignment);
      } else {
        setError("Failed to fetch promoters.");
      }
    } catch (error) {
      setError("An error occurred while fetching promoters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoters();
  }, [formId]);

  // Function to fetch promoter history and open it in a new tab
  const viewHistory = async (promoterId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/fetchPromoterActionHistory",
        { promoterId }
      );

      if (response.status === 200) {
        const actionHistory = response.data.data;

        // Create a table layout with action and timestamp columns
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
          <html>
          <head>
            <title>Promoter Action History</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: #f4f4f4;
                color: #333;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 1em;
                background-color: #fff;
                border: 1px solid #ddd;
                box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
              }
              th, td {
                padding: 12px 15px;
                text-align: left;
                border-bottom: 1px solid #ddd;
              }
              th {
                background-color: #4CAF50;
                color: white;
              }
              tr:nth-child(even) {
                background-color: #f2f2f2;
              }
              tr:hover {
                background-color: #ddd;
              }
            </style>
          </head>
          <body>
            <h1>Promoter Action History</h1>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                ${actionHistory
                  .map(
                    (history) => `
                  <tr>
                    <td>${history.action}</td>
                    <td>${history.timestamp}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
          </html>
        `);
        newWindow.document.close();
      } else {
        alert("Failed to fetch promoter action history.");
      }
    } catch (error) {
      alert("An error occurred while fetching the promoter action history.");
    }
  };

  const assignFormToPromoter = async (promoterId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/assignCreatedForms",
        {
          formId,
          promoterId,
        }
      );

      if (response.status === 200) {
        alert("Form assigned successfully!");
        setPromoters((prevPromoters) =>
          prevPromoters.map((promoter) => {
            if (promoter._id === promoterId) {
              return {
                ...promoter,
                hasFormAssigned: true,
              };
            }
            return promoter;
          })
        );
      } else {
        alert("Failed to assign form.");
      }
    } catch (error) {
      alert("An error occurred while assigning the form.");
    }
  };

  const unassignFormFromPromoter = async (promoterId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/unassignCreatedForms",
        {
          formId,
          promoterId,
        }
      );

      if (response.status === 200) {
        alert("Form unassigned successfully!");
        setPromoters((prevPromoters) =>
          prevPromoters.map((promoter) => {
            if (promoter._id === promoterId) {
              return {
                ...promoter,
                hasFormAssigned: false,
              };
            }
            return promoter;
          })
        );
      } else {
        alert("Failed to unassign form.");
      }
    } catch (error) {
      alert("An error occurred while unassigning the form.");
    }
  };

  const deletePromoter = async (promoterId) => {
    const areyousure = window.confirm(
      "Are you sure you want to delete this promoter?"
    );

    if (areyousure) {
      try {
        const response = await axios.delete(
          "http://localhost:8080/api/v1/admin/deletePromoter", // Update with your endpoint
          { data: { promoterId } }
        );

        if (response.status === 200) {
          alert("Promoter deleted successfully!");
          setPromoters((prevPromoters) =>
            prevPromoters.filter((promoter) => promoter._id !== promoterId)
          );
        } else {
          alert("Failed to delete promoter.");
        }
      } catch (error) {
        alert("An error occurred while deleting the promoter.");
      }
    }
  };
  const handleCreatePromoter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/promoter/registerNewPromoter",
        {
          promoterName,
          promoterEmailId,
          password,
        }
      );
      if (response.status === 200) {
        alert("Promoter created successfully!");
        fetchPromoters();
        setPromoterName("");
        setPromoterEmailId("");
        setPassword("");
        setShowForm(false);
        setError(""); // Reset error message
      } else {
        setError("Failed to create promoter.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Email already exists. Please use a different email.");
  
        // Fade away the error message after 3 seconds
        setTimeout(() => {
          setError("");
          setPromoterName("");
          setPromoterEmailId("");
          setPassword("");
        }, 2000); // 2 seconds
      } else {
        setError("An error occurred while creating the promoter.");
      }
    }
  };
  
  
  return (
    <div className="assignFormContainer">
      <div className="title">
        <PageTitle title="Assign Promoters" />
      </div>
      <div className="formDetails">
        <button
          className="create-promoter-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create New Promoter"}
        </button>

        {showForm && (
          <div className="promoter-form">
            <form onSubmit={handleCreatePromoter}>
              <div className="form-row">
                <input
                  type="text"
                  id="promoterName"
                  className="inputField"
                  placeholder="Promoter Name"
                  value={promoterName}
                  onChange={(e) => setPromoterName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  id="promoterEmailId"
                  className="inputField"
                  placeholder="Promoter Email"
                  value={promoterEmailId}
                  onChange={(e) => setPromoterEmailId(e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="password"
                  id="password"
                  className="inputField"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="submit-promoter-btn">
                  Create Promoter
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="promoterTable">
            <thead>
              <tr>
                <th>Promoter Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {promoters.map((promoter) => (
                <tr key={promoter._id}>
                  <td>{promoter.promoterName}</td>
                  <td className="email-td">{promoter.promoterEmailId}</td>
                  <td>
                    {promoter.hasFormAssigned ? (
                      <button
                        className="unassignFormBtn"
                        onClick={() => unassignFormFromPromoter(promoter._id)}
                      >
                        Revoke Form
                      </button>
                    ) : (
                      <button
                        className="assignFormBtn"
                        onClick={() => assignFormToPromoter(promoter._id)}
                      >
                        Assign Form
                      </button>
                    )}
                    {/* Delete button */}
                    <button
                      className="deletePromoterBtn"
                      onClick={() => deletePromoter(promoter._id)}
                    >
                      <IoTrashBinSharp />
                    </button>
                    <button
                      className="historyPromoterBtn"
                      onClick={() => viewHistory(promoter._id)}
                    >
                      <FaClockRotateLeft />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminAssignCreatedForm;
