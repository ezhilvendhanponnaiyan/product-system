// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const form = document.querySelector(".products-container");
    const inputName = document.getElementById("inputName");
    const inputPrice = document.getElementById("inputPrice");
    const inputCategory = document.getElementById("inputCategory");
    const inputCondition = document.getElementById("inputCondition");
    const inputSearch = document.getElementById("inputSearch");
  
    // Get table body
    const tableBody = document.getElementById("tableBody");
  
    // Add event listener to form submission
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get input values
      const name = inputName.value.trim();
      const price = inputPrice.value.trim();
      const category = inputCategory.value;
      const condition = inputCondition.value;
  
      // Validate input values
      if (!name) {
        showAlert("alertName");
        return;
      }
  
      if (!price || isNaN(price)) {
        showAlert("alertPrice");
        return;
      }
  
      if (category === "none") {
        showAlert("alertCategory");
        return;
      }
  
      if (condition === "none") {
        showAlert("alertCondition");
        return;
      }
  
      // Create table row
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${tableBody.children.length + 1}</td>
        <td>${name}</td>
        <td>${price}</td>
        <td>${category}</td>
        <td>${condition}</td>
        <td>
          <button class="editBtn">Edit</button>
          <button class="deleteBtn">Delete</button>
        </td>
      `;
  
      // Append row to table body
      tableBody.appendChild(row);
  
      // Clear form inputs
      inputName.value = "";
      inputPrice.value = "";
      inputCategory.value = "none";
      inputCondition.value = "none";
  
      // Hide alerts
      hideAlerts();
  
      // Add event listeners to edit and delete buttons
      const editBtn = row.querySelector(".editBtn");
      const deleteBtn = row.querySelector(".deleteBtn");
  
      editBtn.addEventListener("click", function () {
        // Fill form with row data
        inputName.value = row.children[1].textContent;
        inputPrice.value = row.children[2].textContent;
        inputCategory.value = row.children[3].textContent;
        inputCondition.value = row.children[4].textContent;
  
        // Remove the row
        row.remove();
      });
  
      deleteBtn.addEventListener("click", function () {
        // Remove the row
        row.remove();
      });
    });
  
    // Add event listener to clear form button
    const clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener("click", function () {
      // Clear form inputs
      inputName.value = "";
      inputPrice.value = "";
      inputCategory.value = "none";
      inputCondition.value = "none";
  
      // Hide alerts
      hideAlerts();
    });
  
    // Add event listener to search input
    inputSearch.addEventListener("input", function () {
      const searchTerm = inputSearch.value.trim().toLowerCase();
  
      // Loop through table rows and hide/show based on search term
      Array.from(tableBody.children).forEach(function (row) {
        const name = row.children[1].textContent.toLowerCase();
  
        if (name.includes(searchTerm)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  
    // Function to show alert by ID
    function showAlert(alertId) {
      const alert = document.getElementById(alertId);
      alert.style.display = "block";
    }
  
    // Function to hide all alerts
    function hideAlerts() {
      const alerts = document.querySelectorAll(".alert");
      alerts.forEach(function (alert) {
        alert.style.display = "none";
      });
    }
  });
  