import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import Typewriter from "typewriter-effect";
import "./Home.css";

const Home = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileSelected, setFileSelected] = useState(false); // Track if a file is selected
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setFileSelected(true); // Enable submit button when a valid file is selected
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          console.log("CSV Data:", results.data);
        },
        error: (error) => {
          console.error("Error reading CSV:", error);
        },
      });
    } else {
      alert("Please upload a valid CSV file.");
      setFileSelected(false); // Disable submit button if file is invalid
    }
  };

  const handleSubmit = () => {
    if (csvData.length > 0) {
      alert("CSV imported successfully!");
      setFileSelected(false); // Reset file selection after submission
    } else {
      alert("Please upload a CSV file first.");
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">EmailAI</div>
        <div className="navbar-right">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/recent-mail")}>Recent Mail</button>
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="main-content">
        {/* About Us Section */}
        <section className="about-us">
          <h2>Email AI</h2>
          <p>
            <Typewriter
              options={{
                strings: [
                  "Welcome to EmailAI, your go-to tool for automating business operations.",
                  "We help businesses automate repetitive tasks like email sending, saving time and reducing errors.",
                  "Our AI-driven system makes it easy to manage subscriptions, clients, and more.",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </p>

          {/* CSV Upload Section */}
          <div className="csv-upload">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ padding: "10px", margin: "20px 0" }}
            />
            <br />
            <button
              onClick={handleSubmit}
              disabled={!fileSelected} // Disable submit if no file is selected
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: fileSelected ? "pointer" : "not-allowed",
              }}
            >
              Submit
            </button>
          </div>
        </section>

        {/* Image Section */}
        <div className="image-section">
          <img src="src/assets/Email.png" alt="Email AI" />
        </div>
      </div>
    </div>
  );
};

export default Home;

