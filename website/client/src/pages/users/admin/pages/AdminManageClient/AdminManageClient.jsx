"use client";
import React from "react";
import PageTitle from "../../../../../components/PageTitles/PageTitle";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "../../../../../components/3dCard/3dCard";
import "./AdminManageClient.css";
import calendarIcon from "../AdminPromoterParent/calendarIcon.png";
import createIcon from "../AdminPromoterParent/createIcon.png";
import detailsIcon from "../AdminPromoterParent/detailsIcon.png";

const AdminManageClient = ({ setActiveTab }) => {
  return (
    <div className="x3-adminPromoterParent-container">
      <PageTitle title="Manage Clients" />
      <div className="x3-background-blue-container">
        <div className="x3-content-area">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:bg-black border border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6">
              <CardItem
                translateZ="50"
                onClick={() => setActiveTab("viewClients")}
                className="x3-card-item text-xl font-bold text-neutral-600 dark:text-white"
              >
                <div className="card-content flex flex-col items-center">
                  <img
                    src={detailsIcon}
                    alt="View Promoters"
                    className="card-icon h-10 w-10"
                  />
                  <h3 className="card-title mt-2">View Clients</h3>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>

          {/* Card for Create Promoter */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:bg-black border border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6">
              <CardItem
                translateZ="50"
                onClick={() => setActiveTab("newClient")}
                className="x3-card-item text-xl font-bold text-neutral-600 dark:text-white"
              >
                <div className="card-content flex flex-col items-center">
                  <img
                    src={createIcon}
                    alt="Create Promoter"
                    className="card-icon h-10 w-10"
                  />
                  <h3 className="card-title mt-2">Create Client</h3>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminManageClient;
