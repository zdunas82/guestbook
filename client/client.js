const messageForm = document.querySelector("#messageForm");
const messagesContainer = document.querySelector("#messagesContainer");

async function handleSubmit(event) {
  event.preventDefault();

  // Getting the information from the form
  const formData = new FormData(messageForm);
  const body = Object.fromEntries(formData);
  console.log("Form Data", body);

    // Make a post request
    const response = await fetch("http://localhost:8080/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      // Reload messages after submission to include the newly added message
      loadMessages();
  }
// Load all messages from the server and display them
async function loadMessages() {
    const response = await fetch("http://localhost:8080/messages");

      const messages = await response.json();
      messagesContainer.innerHTML = ""; // clear previous messages

      messages.forEach((msg) => {
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = `${msg.msg_name}: ${msg.content}`;
        messagesContainer.appendChild(messageElement);

        //function to reset the input fields after submission
        messageForm.reset();
      });
    } 
    
// Adding an event listener to the form
messageForm.addEventListener("submit", handleSubmit);

// Load messages when the page loads
window.addEventListener("DOMContentLoaded", loadMessages);
