import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "./AdminCreatePromoter.css";
import PageTitle from "../../../../../components/PageTitles/PageTitle";
import createIcon from "../AdminPromoterParent/createIcon.png";

const AdminCreatePromoter = ({ activeTab, setActiveTab }) => {
  const [formData, setFormData] = useState({
    promoterName: "",
    promoterEmailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    promoterEmailId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleCreatePromoter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/promoter/registerNewPromoter",
        {
          promoterName: formData.promoterName,
          promoterEmailId: formData.promoterEmailId,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        setFormData({ promoterName: "", promoterEmailId: "", password: "" });
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setActiveTab("viewPromoters");
        }, 2000);
      } else {
        setError("Failed to create promoter.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Email already exists. Please use a different email.");
        setTimeout(() => setError(""), 3000);
      } else {
        setError("An error occurred while creating the promoter.");
      }
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/promoter/updatePromoterPassword",
        {
          promoterEmailId: updateFormData.promoterEmailId,
          password: updateFormData.password,
        }
      );
      if (response.status === 200) {
        setUpdateFormData({ promoterEmailId: "", password: "" });
        alert("Password updated successfully!");
        setShowUpdatePassword(false);
      } else {
        setError("Failed to update password.");
      }
    } catch (error) {
      setError("An error occurred while updating the password.");
    }
  };

  // Scroll to the bottom of the page when the active tab changes to "viewPromoters"
  useEffect(() => {
    if (activeTab === "viewPromoters") {
      // Scroll to the bottom smoothly when switching to "viewPromoters"
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 500); // Delay to allow content to load before scrolling
    }
  }, [activeTab]); // Track when activeTab changes

  return (
    <>
      <PageTitle
        title={
          showUpdatePassword ? "Update Promoter Password" : "Create Promoter"
        }
      />
      <div className="x1-createpromoter-parent">
        <button
          onClick={() => setActiveTab("promoterParent")}
          className="x1-back-button"
        >
          Back
        </button>

        <center>
          {!showUpdatePassword ? (
            <div className="x1-form-card">
              <div className="x1-image-container">
                <img
                  src={createIcon}
                  alt="Form Icon"
                  className="x1-form-icon"
                />
              </div>
              <form onSubmit={handleCreatePromoter} className="x1-form">
                <div className="x1-input-group">
                  <FaUser className="x1-input-icon" />
                  <input
                    type="text"
                    name="promoterName"
                    placeholder="Create Promoter"
                    value={formData.promoterName}
                    onChange={handleChange}
                    className="x1-input-field"
                    required
                  />
                </div>
                <div className="x1-input-group">
                  <FaEnvelope className="x1-input-icon" />
                  <input
                    type="email"
                    name="promoterEmailId"
                    placeholder="Email of Promoter"
                    value={formData.promoterEmailId}
                    onChange={handleChange}
                    className="x1-input-field"
                    required
                  />
                </div>
                <div className="x1-input-group">
                  <FaLock className="x1-input-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="x1-input-field"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`x1-submit-button ${
                    isSubmitted ? "submitted" : ""
                  }`}
                >
                  {isSubmitted ? "Created!" : "Create"}
                </button>
              </form>
              <button
                onClick={() => setShowUpdatePassword(true)}
                className="x1-forget-button"
              >
                Forgot Password?
              </button>
              {error && <p className="x1-error-message">{error}</p>}
            </div>
          ) : (
            <div className="x1-form-card">
              <form onSubmit={handleUpdatePassword} className="x1-form">
                <div className="x1-input-group">
                  <FaEnvelope className="x1-input-icon" />
                  <input
                    type="email"
                    name="promoterEmailId"
                    placeholder="Promoter Email"
                    value={updateFormData.promoterEmailId}
                    onChange={handleUpdateChange}
                    className="x1-input-field"
                    required
                  />
                </div>
                <div className="x1-input-group">
                  <FaLock className="x1-input-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={updateFormData.password}
                    onChange={handleUpdateChange}
                    className="x1-input-field"
                    required
                  />
                </div>
                <button type="submit" className="x1-submit-button">
                  Update
                </button>
              </form>
              <button
                onClick={() => setShowUpdatePassword(false)}
                className="x1-cancel-button"
              >
                Cancel
              </button>
              {error && <p className="x1-error-message">{error}</p>}
            </div>
          )}
        </center>
      </div>
    </>
  );
};

export default AdminCreatePromoter;
