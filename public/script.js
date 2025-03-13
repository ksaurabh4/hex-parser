document.getElementById("analyzeBtn").addEventListener("click", function () {
    const hexInput = document.getElementById("hexInput").value.trim();
    const protocolType = document.getElementById("protocolType").value;
    const resultContainer = document.getElementById("resultContainer");
    const resultBox = document.getElementById("resultBox");
  
    if (!hexInput) {
      alert("Please enter a hex string.");
      return;
    }
  
    // Show the result container with a loading message
    resultContainer.style.display = "block";
    resultBox.textContent = "Processing...";
  
    // Send a POST request to our Express server at /analyze
    fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hex: hexInput, protocol: protocolType })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        resultBox.textContent = "Error: " + data.error;
      } else {

        console.log(data.JsonValue);
        // Display the jsonValue we received from the server
        resultBox.textContent = data.JsonValue;
      }
    })
    .catch(error => {
      console.error("Error:", error);
      resultBox.textContent = "An error occurred while processing.";
    });
  });
  