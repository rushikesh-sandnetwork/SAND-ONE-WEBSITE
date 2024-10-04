"use client";

import React from "react";
import PageTitle from "../../../../../components/PageTitles/PageTitle";
import { CardContainer, CardBody, CardItem } from "../../../../../components/3dCard/3dCard";
import "./AdminPromoterParent.css";
import calendarIcon from "./calendarIcon.png";
import createIcon from "./createIcon.png";
import detailsIcon from "./detailsIcon.png";

const AdminPromoterParent = ({ setActiveTab }) => {
  return (
    <div className="x2-adminPromoterParent-container">
      <PageTitle title="Manage Promoters" />
      <div className="x2-background-blue-container">
        <div className="x2-content-area">
          {/* Card for View Promoters */}
          <CardContainer className="inter-var">
            <CardBody
              className="bg-gray-50 relative group/card dark:bg-black border border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6">
              <CardItem
                translateZ="50"
                onClick={() => setActiveTab("viewPromoters")}
                className="x2-card-item text-xl font-bold text-neutral-600 dark:text-white">
                <div className="card-content flex flex-col items-center">
                  <img src={detailsIcon} alt="View Promoters" className="card-icon h-10 w-10" />
                  <h3 className="card-title mt-2">View Promoters</h3>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>

          {/* Card for View Promoters Attendance */}
          <CardContainer className="inter-var">
            <CardBody
              className="bg-gray-50 relative group/card dark:bg-black border border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6">
              <CardItem
                translateZ="50"
                onClick={() => setActiveTab("promoterAttendance")}
                className="x2-card-item text-xl font-bold text-neutral-600 dark:text-white">
                <div className="card-content flex flex-col items-center">
                  <img src={calendarIcon} alt="View Promoters Attendance" className="card-icon h-10 w-10" />
                  <h3 className="card-title mt-2">View Promoters Attendance</h3>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>

          {/* Card for Create Promoter */}
          <CardContainer className="inter-var">
            <CardBody
              className="bg-gray-50 relative group/card dark:bg-black border border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6">
              <CardItem
                translateZ="50"
                onClick={() => setActiveTab("createPromoter")}
                className="x2-card-item text-xl font-bold text-neutral-600 dark:text-white">
                <div className="card-content flex flex-col items-center">
                  <img src={createIcon} alt="Create Promoter" className="card-icon h-10 w-10" />
                  <h3 className="card-title mt-2">Create Promoter</h3>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminPromoterParent;
