import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecentMail.css";

const RecentMail = () => {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching recent emails
    axios
      .get("http://localhost:5000/recent-mails") // Example endpoint
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recent emails:", error);
      });
  }, []);

  return (
    <div className="recent-mail-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">EmailAI</div>
        <div className="navbar-right">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/recent-mail")}>Recent Mail</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="recent-mails-content">
        <h1>Recent Mails</h1>
        {emails.length > 0 ? (
          <ul className="email-list">
            {emails.map((email, index) => (
              <li key={index} className="email-item">
                <h3>{email.subject}</h3>
                <p>
                  <strong>To:</strong> {email.recipient}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(email.date).toLocaleString()}
                </p>
                <p>{email.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent emails found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentMail;
