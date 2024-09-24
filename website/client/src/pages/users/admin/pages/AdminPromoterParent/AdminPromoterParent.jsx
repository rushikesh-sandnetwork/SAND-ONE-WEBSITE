import React from "react";
import PageTitle from "../../../../../components/PageTitles/PageTitle";
import "./AdminPromoterParent.css";

const AdminPromoterParent = ({ setActiveTab }) => {
  return (
    <div className="x2-adminPromoterParent-container">
      <PageTitle title="Manage Promoters" />
      <div className="x2-background-blue-container">
        <div className="x2-content-area">
          <button className="x2-button"onClick={() => setActiveTab("viewPromoters")}>
            View Promoters
          </button>
          <button className="x2-button" onClick={() => setActiveTab("promoterAttendance")}>
            View Promoters Attendance
          </button>
          <button className="x2-button" onClick={() => setActiveTab("createPromoter")}>
            Create Promoter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPromoterParent;
