import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminOverViewPage from "../AdminOverViewPage/AdminOverViewPage";
import AdminViewClientsPage from "../AdminViewClientsPage/AdminViewClientsPage";
import AdminProfilePage from "../AdminProfilePage/AdminProfilePage";
import AdminViewCampaignsPage from "../AdminViewCampaignsPage/AdminViewCampaignsPage";
import AdminCreateNewClient from "../AdminCreateNewClient/AdminCreateNewClient";
import AdminCampaignDetailsPage from "../AdminCampaignDetailsPage/AdminCampaignDetailsPage";
import AdminFormDetails from "../AdminFormDetails/AdminFormDetails";
import AdminCreateNewCampaign from "../AdminCreateNewCampaign/AdminCreateNewCampaign";
import AdminFormItems from "../AdminFormItems/AdminFormItems";
import AdminCreateNewUser from "../AdminCreateNewUser/AdminCreateNewUser";
import "./AdminLandingPage.css"; // Removed duplicate import
import Logo from "./SAND 1 logo.png";
import AdminViewAttendance from "../AdminViewAttendance/AdminViewAttendance";
import AdminPromoterParent from "../AdminPromoterParent/AdminPromoterParent";
import AdminViewPromoters from "../AdminViewPromoters/AdminViewPromoters";
import AdminCreatePromoter from "../AdminCreatePromoter/AdminCreatePromoter";

const AdminLandingPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams(); // Destructure to get the `id` from useParams
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="LandingPage-container">
      <div className="sidebar">
        <div className="navbar">
          <img src={Logo} alt="" />
          <a onClick={() => setActiveTab("overview")}>Overview</a>
          <a onClick={() => setActiveTab("newClient")}>New Client</a>
          <a onClick={() => setActiveTab("viewClients")}>View Clients</a>
          <a onClick={() => setActiveTab("profile")}>Profile</a>
          <a onClick={() => setActiveTab("newUser")}>New User</a>
          <a onClick={() => setActiveTab("promoterParent")}>Manage Promoters</a>
          <input type="button" value="Logout" onClick={handleLogout} />
        </div>
      </div>
      <div className="content">
        {activeTab === "overview" && (
          <AdminOverViewPage setActiveTab={setActiveTab} />
        )}
        {activeTab === "newClient" && <AdminCreateNewClient />}
        {activeTab === "viewClients" && (
          <AdminViewClientsPage setActiveTab={setActiveTab} />
        )}
        {activeTab === "profile" && <AdminProfilePage userId={id} />}
        {activeTab === "newUser" && <AdminCreateNewUser />}
        {activeTab === "promoterAttendance" && (
          <AdminViewAttendance setActiveTab={setActiveTab} />
        )}
        {activeTab === "viewPromoters" && (
          <AdminViewPromoters setActiveTab={setActiveTab} />
        )}
        {activeTab === "promoterParent" && (
          <AdminPromoterParent setActiveTab={setActiveTab} />
        )}

        {activeTab === "createPromoter" && (
          <AdminCreatePromoter setActiveTab={setActiveTab} />
        )}
        {activeTab.startsWith("client-detail") && (
          <AdminViewCampaignsPage
            clientId={activeTab.substring("client-detail".length + 1)}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab.startsWith("createNewCampaign") && (
          <AdminCreateNewCampaign
            clientId={activeTab.substring("createNewCampaign".length + 1)}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab.startsWith("campaignDetailsPage") && (
          <AdminCampaignDetailsPage
            campaignId={activeTab.substring("campaignDetailsPage".length + 1)}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab.startsWith("view-all-forms") && (
          <AdminFormDetails
            campaignId={activeTab.substring("view-all-forms".length + 1)}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab.startsWith("viewFormData") && (
          <AdminFormItems
            formId={activeTab.substring("viewFormData".length + 1)}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLandingPage;
