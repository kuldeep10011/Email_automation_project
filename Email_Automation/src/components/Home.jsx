import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import Typewriter from "typewriter-effect";
import "./Home.css";

const Home = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileSelected, setFileSelected] = useState(false); // Track if a file is selected
  const [loading, setLoading] = useState(false); // Track loading state
  const [modalMessage, setModalMessage] = useState(""); // Message for the modal
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setFileSelected(true); // Enable submit button when a valid file is selected
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          localStorage.setItem("recentCsvData", JSON.stringify(results.data)); // Save data to localStorage
        },
        error: (error) => {
          console.error("Error reading CSV:", error);
        },
      });
    } else {
      setModalMessage("Please upload a valid CSV file.");
      setShowModal(true); // Show error in the modal
      setFileSelected(false); // Disable submit button if file is invalid
    }
  };

  const handleSubmit = async () => {
    if (csvData.length > 0) {
      setLoading(true); // Show loading animation
      try {
        const response = await fetch("http://localhost:5000/send-emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: csvData }),
        });

        const result = await response.json();
        if (response.ok) {
          setModalMessage(result.message);
        } else {
          setModalMessage(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("Error sending emails:", error);
        setModalMessage(
          "Failed to send emails. Check the console for more details."
        );
      } finally {
        setLoading(false); // Hide loading animation
        setShowModal(true); // Show the modal
      }
    } else {
      setModalMessage("Please upload a CSV file first.");
      setShowModal(true); // Show warning in the modal
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
          <p
            className="type-writer"
            style={{
              color: "white",
            }}
          >
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
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <br />
            <button
              onClick={handleSubmit}
              disabled={!fileSelected} // Disable submit if no file is selected
              className="submit-button"
            >
              {loading ? (
                <> <span >Submitting...</span> <span className="loading-spinner"></span> </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </section>
        <div className="bgimage"></div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="modal-close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
