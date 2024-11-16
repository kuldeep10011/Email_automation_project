import React, { useEffect, useState } from "react";
import "./RecentMail.css";
import { useNavigate } from "react-router-dom";


const RecentMail = () => {
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("recentCsvData");
    if (data) {
      setCsvData(JSON.parse(data));
    }
  }, []);

  return (
    <>
    <nav className="navbar">
        <div className="navbar-left">EmailAI</div>
        <div className="navbar-right">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/recent-mail")}>Recent Mail</button>
        </div>
      </nav>
    <div className="recent-mail-container">


      <h2>Recent CSV Uploads</h2>
      {csvData.length > 0 ? (
        <table className="csv-table">
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No CSV data available. Upload a CSV file to view here.</p>
      )}
    </div>
    </>

  );
};

export default RecentMail;
