import React, { useState, useEffect } from "react";
import PageTitle from "../../../../../components/PageTitles/PageTitle";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import "./AdminViewPromoters.css";

const AdminViewPromoters = ({ setActiveTab }) => {
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
        setPromoters(response.data.data);
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

  const viewHistory = async (promoterId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/fetchPromoterActionHistory",
        { promoterId }
      );
      if (response.status === 200) {
        const actionHistory = response.data.data;

        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
          <html>
          <head>
            <title>Promoter Action History</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 1em; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); }
              th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background-color: #4CAF50; color: white; }
              tr:nth-child(even) { background-color: #f2f2f2; }
              tr:hover { background-color: #ddd; }
            </style>
          </head>
          <body>
            <h1>Promoter Action History</h1>
            <table>
              <thead>
                <tr><th>Action</th><th>Timestamp</th></tr>
              </thead>
              <tbody>
                ${actionHistory
                  .map(
                    (history) =>
                      `<tr><td>${history.action}</td><td>${history.timestamp}</td></tr>`
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

  const deletePromoter = async (promoterId) => {
    const areyousure = window.confirm(
      "Are you sure you want to delete this promoter?"
    );

    if (areyousure) {
      try {
        const response = await axios.delete(
          "http://localhost:8080/api/v1/admin/deletePromoter",
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
  return (
    <div className="viewPromoterContainer">
      <div className="title">
        <PageTitle title="View Promoters" />
      </div>
      <div className="background-blue-container">
      <button
          onClick={() => setActiveTab("promoterParent")}
          className="back-button"
        >
          Back
        </button>{" "}
        {/* Navigate back using setActiveTab */}
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
                <th className="emailPromoterTd">Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {promoters.map((promoter) => (
                <tr key={promoter._id}>
                  <td>{promoter.promoterName}</td>
                  <td className="emailPromoterTd">
                    {promoter.promoterEmailId}
                  </td>
                  <td>
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

export default AdminViewPromoters;
