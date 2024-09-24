import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./AdminCreatePromoter.css"; // Ensure this path is correct
import PageTitle from "../../../../../components/PageTitles/PageTitle";
import createIcon from "../AdminPromoterParent/createIcon.png";

const AdminCreatePromoter = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    promoterName: "",
    promoterEmailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        alert("Promoter created successfully!");
        setFormData({ promoterName: "", promoterEmailId: "", password: "" });
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000);
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

  return (
    <>
      <PageTitle title="Create Promoter" />
      <div className="x1-createpromoter-parent">
        <button
          onClick={() => setActiveTab("promoterParent")}
          className="x1-back-button"
        >
          Back
        </button>
        <center>
          <div className="x1-form-card">
            <div className="x1-image-container">
              <img src={createIcon} alt="Form Icon" className="x1-form-icon" />
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
                className={`x1-submit-button ${isSubmitted ? "submitted" : ""}`}
              >
                {isSubmitted ? "Created!" : "Create"}
              </button>
            </form>
            {error && <p className="x1-error-message">{error}</p>}
          </div>
        </center>
      </div>
    </>
  );
};

export default AdminCreatePromoter;
