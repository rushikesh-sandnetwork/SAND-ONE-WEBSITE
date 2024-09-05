import React, { useState } from 'react';
import axios from 'axios';
import './AdminViewAttendance.css';
import PageTitle from '../../../../../components/PageTitles/PageTitle';

const AdminViewAttendance = () => {
  const [email, setEmail] = useState('');
  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchAttendanceDetails = async () => {
    try {
      const response = await axios.post('https://sand-one-website.onrender.com/api/v1/promoter/fetchPromoterAttendanceDetails', { email });
      if (response.data && response.data.data) {
        setAttendanceDetails(response.data.data);
        setErrorMessage(''); // Clear any previous error message
        setCurrentPage(1); // Reset to the first page
      } else {
        setAttendanceDetails(null);
        setErrorMessage('No attendance details found for this email.');
      }
    } catch (error) {
      console.error('Error fetching attendance details:', error);
      setAttendanceDetails(null);
      setErrorMessage('Error fetching attendance details. Please try again.');
    }
  };

  const handleNextPage = () => {
    if (attendanceDetails && (currentPage * rowsPerPage) < attendanceDetails.attendanceDetails.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateDuration = (punchInTime, punchOutTime) => {
    if (!punchInTime || !punchOutTime) return 'N/A';
    
    const punchIn = new Date(punchInTime);
    const punchOut = new Date(punchOutTime);
    const duration = (punchOut - punchIn) / 1000 / 60; // Duration in minutes
    
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    
    return `${hours}h ${minutes}m`;
  };

  const displayedRows = attendanceDetails
    ? attendanceDetails.attendanceDetails.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
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
          <button onClick={fetchAttendanceDetails} className="search-button">Search</button>
        </div>

        {attendanceDetails ? (
          <>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Promoter Email</th>
                  <th>Attendance Date</th>
                  <th>Punch In Time</th>
                  <th>Punch Out Time</th>
                  <th>Duration</th> {/* New column */}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedRows.map((attendance, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        attendance.status === 'Present'
                          ? '#64E3A1' // Set your preferred color for 'Present'
                          : attendance.status === 'Absent'
                          ? '#F48B81' // Set your preferred color for 'Absent'
                          : 'transparent', // Default color for other statuses
                    }}
                  >
                    <td>{attendanceDetails.promoterEmail}</td>
                    <td>{new Date(attendance.date).toLocaleDateString()}</td>
                    <td>{attendance.punchInTime ? new Date(attendance.punchInTime).toLocaleTimeString() : 'N/A'}</td>
                    <td>{attendance.punchOutTime ? new Date(attendance.punchOutTime).toLocaleTimeString() : 'N/A'}</td>
                    <td>{calculateDuration(attendance.punchInTime, attendance.punchOutTime)}</td> {/* New column */}
                    <td>{attendance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-controls">
              <button onClick={handlePreviousPage} className="previous-button" disabled={currentPage === 1}>Previous</button>
              <button onClick={handleNextPage} className="next-button" disabled={currentPage * rowsPerPage >= (attendanceDetails ? attendanceDetails.attendanceDetails.length : 0)}>Next</button>
            </div>
          </>
        ) : (
          <p className="info-message">{errorMessage || 'Please enter an email to view attendance details.'}</p>
        )}
      </div>
    </div>
  );
};

export default AdminViewAttendance;
