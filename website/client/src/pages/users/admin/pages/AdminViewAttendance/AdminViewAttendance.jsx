import React, { useState } from "react";
import axios from "axios";
import "./AdminViewAttendance.css";
import PageTitle from "../../../../../components/PageTitles/PageTitle";

const AdminViewAttendance = () => {
  const [email, setEmail] = useState("");
  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const rowsPerPage = 10;

  const fetchAttendanceDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/promoter/fetchPromoterAttendanceDetails",
        { email }
      );
      if (response.data && response.data.data) {
        setAttendanceDetails(response.data.data);
        setErrorMessage("");
        setCurrentPage(1);
      } else {
        setAttendanceDetails(null);
        setErrorMessage("No attendance details found for this email.");
      }
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      setAttendanceDetails(null);
      setErrorMessage("Email Entry doesn't exist");
    }
  };

  const handleNextPage = () => {
    if (
      attendanceDetails &&
      currentPage * rowsPerPage < attendanceDetails.attendanceDetails.length
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateDuration = (punchInTime, punchOutTime) => {
    if (!punchInTime || !punchOutTime) return "N/A";
    const punchIn = new Date(punchInTime);
    const punchOut = new Date(punchOutTime);
    const duration = (punchOut - punchIn) / 1000 / 60; // Duration in minutes
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    return `${hours}h ${minutes}m`;
  };

  const handleImageClick = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const handleExitFullScreen = () => {
    setFullScreenImage(null);
  };

  const displayedRows = attendanceDetails
    ? attendanceDetails.attendanceDetails.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : [];

  return (
    <div className="admin-view-attendance">
      <PageTitle title="View Attendance" />
      <div className="admin-view-attendance-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter promoter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="search-input"
          />
          <button onClick={fetchAttendanceDetails} className="search-button">
            Search
          </button>
        </div>

        {attendanceDetails ? (
          <>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Promoter Email</th>
                  <th>Attendance Date</th>
                  <th>Punch In</th>
                  <th>Punch Out</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedRows.map((attendance, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        attendance.status === "Present"
                          ? "#64E3A1"
                          : attendance.status === "Absent"
                          ? "#F48B81"
                          : "transparent",
                    }}
                  >
                    <td>{attendanceDetails.promoterEmail}</td>
                    <td>{new Date(attendance.date).toLocaleDateString()}</td>
                    <td>
                      {attendance.punchInTime
                        ? new Date(attendance.punchInTime).toLocaleTimeString()
                        : "N/A"}
                      <br />
                      {attendance.punchInImage && (
                        <img
                          src={attendance.punchInImage}
                          alt="Punch In"
                          className="attendance-image"
                          onClick={() =>
                            handleImageClick(attendance.punchInImage)
                          }
                        />
                      )}
                    </td>
                    <td>
                      {attendance.punchOutTime
                        ? new Date(attendance.punchOutTime).toLocaleTimeString()
                        : "N/A"}
                      <br />
                      {attendance.punchOutImage && (
                        <img
                          src={attendance.punchOutImage}
                          alt="Punch Out"
                          className="attendance-image"
                          onClick={() =>
                            handleImageClick(attendance.punchOutImage)
                          }
                        />
                      )}
                    </td>
                    <td>
                      {calculateDuration(
                        attendance.punchInTime,
                        attendance.punchOutTime
                      )}
                    </td>
                    <td>{attendance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-controls">
              <button
                onClick={handlePreviousPage}
                className="previous-button"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className="next-button"
                disabled={
                  currentPage * rowsPerPage >=
                  (attendanceDetails
                    ? attendanceDetails.attendanceDetails.length
                    : 0)
                }
              >
                Next
              </button>
            </div>

            {/* Full-screen image view */}
            {fullScreenImage && (
              <div
                className="fullscreen-image-container"
                onClick={handleExitFullScreen}
              >
                <img
                  src={fullScreenImage}
                  alt="Full View"
                  className="fullscreen-image"
                />
                <span className="close-button">&times;</span>
              </div>
            )}
          </>
        ) : (
          <p className="info-message">
            {errorMessage ||
              "Please enter an email to view attendance details."}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminViewAttendance;
