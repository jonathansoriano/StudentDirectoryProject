// Triggered when the user input values into the Student ID input field using oninput event - occurs immediately after the content has been changed
document.getElementById("studentId").oninput = function() {
    
    validateNumericInputById("studentId");
}
// Triggered when the user input values into the First Name input field using oninput event - occurs immediately after the content has been changed
document.getElementById("firstName").oninput = function() {
    
    validateNameInputById("firstName");
}
// Triggered when the user input values into the Last Name input field using oninput event - occurs immediately after the content has been changed
document.getElementById("lastName").oninput = function() {
    
    validateNameInputById("lastName");
}
// Triggered when the user input values into the Date of Birth input field using onchange event - occurs when the element loses focus, after the content has been changed.
document.getElementById("dob").onchange = function() {

    validateDateInputById("dob");
}
// Triggered when the user input values into the City input field using oninput event
document.getElementById("city").oninput = function() {
    
    validateNameInputById("city");
}
// Triggered when the user input values into the State input field using onchange event
document.getElementById("state").onchange = function() {
    
    validateStateInputById("state");
}

// Triggered when the user input values into the University ID input field using oninput event
document.getElementById("universityId").oninput = function() {
    
    validateNumericInputById("universityId");
}

// Event listener for Search Form submission
document.getElementById("searchForm").addEventListener("submit", function(event){
    // Prevent default form submission behavior - This prevents:
    //The page from reloading
    //The browser from navigating away
    //The form data from being sent automatically
    event.preventDefault();

    // Call the updated searchStudents function to perform the search operation in our Spring Boot API
    searchStudents();
});

// Event listener for Clear Button click event
document.getElementById('clearBtn').addEventListener('click', function() {
            // Clear all input fields in the search form
            document.getElementById('searchForm').reset();
            // Hide the results section
            document.getElementById('resultsSection').style.display = 'none';
            
            // Remove any validation error styles from input fields
            const fieldsToClear = ['studentId','firstName', 'lastName','dob', 'city', 'state', 'universityId'];
            // Loop through each field ID and clear the borderBottom style
            for (const fieldId of fieldsToClear) {
                document.getElementById(fieldId).style.borderBottom = '';
            }
        });

// This function performs the search operation by sending a GET request to the Spring Boot API      
function searchStudents(){
    // Build the params object using the buildAxiosParams function
    const params = buildAxiosParams(
        document.getElementById('studentId').value,
        document.getElementById('firstName').value,
        document.getElementById('lastName').value,
        document.getElementById('dob').value,
        document.getElementById('city').value,
        document.getElementById('state').value.toUpperCase(),
        document.getElementById('universityId').value,
        document.getElementById('grade').value
    );
    // Send GET request to the Spring Boot API with constructed params
    axios.get('http://localhost:8080/students/searchStudent',{
        // Pass the constructed params object to Axios
        params                                  
    })
    .then(response => {
        console.log(response);      // Log the response for debugging
        displayResults(response);   //Display the results on the webpage results section
    })
    .catch(error => {
    // Display error message in results section
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsSection = document.getElementById('resultsSection');
    // Ensure results section is visible
    resultsSection.style.display = 'block';
    // Check if the error is a 404 Not Found
    if (error.response && error.response.status === 404) {
        resultsContainer.innerHTML = '<p>No students found matching the criteria.</p>';
    } else {
        resultsContainer.innerHTML = '<p>There was an error fetching the student data.</p>';
    }

    console.error("Error fetching student data:", error);
    });
}

// Function to build Axios params object based on provided input values
function buildAxiosParams(id, firstName, lastName, dob, residentCity, residentState, universityId, grade) {
    const params = {};          // Initialize an empty params object
    if (id && id.trim() !== '') {
        params.id = id.trim(); // Syntax to add id only if it's provided, instead of using fieldName: value
    }
    if (firstName && firstName.trim() !== '') {
        params.firstName = firstName.trim();
    }
    if (lastName && lastName.trim() !== '') {
        params.lastName = lastName.trim();
    }
    if (dob && dob.trim() !== '') {
        params.dob = dob.trim();
    }
    if (residentCity && residentCity.trim() !== '') {
        params.residentCity = residentCity.trim();
    }
    if (residentState && residentState.trim() !== '') {
        params.residentState = residentState.trim();
    }
    if (universityId && universityId.trim() !== '') {
        params.universityId = universityId.trim();
    }
    if (grade && grade.trim() !== '') {
        params.grade = grade.trim();
    }
    return params;              // Return the constructed params object
}

// Function to display search results in the results section
function displayResults(response){
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');

    resultsSection.style.display = 'block'; // Make sure the results section is visible

    // Loop through the response data, converting each student object into an HTML card
    // map() method creates a new array of HTML strings for each student
    resultsContainer.innerHTML = response.data.map(student =>  `
        <div class="student-card">
            <h3>${student.firstName} ${student.lastName}</h3>
            <div class="student-info">
                <div class="info-item">
                    <span class="info-label">Student ID:</span> ${student.id}
                </div>
                <div class="info-item">
                    <span class="info-label">City:</span> ${student.residentCity}
                </div>
                <div class="info-item">
                    <span class="info-label">State:</span> ${student.residentState}
                </div>
                <div class="info-item">
                    <span class="info-label">University ID:</span> ${student.universityId}
                </div>
                <div class="info-item">
                    <span class="info-label">Grade:</span> ${student.grade}
                </div>
            </div>
        </div>
    `).join(''); //That turns the array's elements into one big string, with no commas in between.
}
// Function that Validates that the input field contains only numeric characters and shows a client-side validation error if invalid.
function validateNumericInputById(elementId) {
    const element = document.getElementById(elementId);         // Get the input element (textbox) by its ID
    const elementInput = element.value.trim();                  // Get the trimmed value of the textbox
    const idPattern = /^\d*$/;                                  // Only zero or more (*) of the digits pattern allowed - regular expression pattern

    if (!idPattern.test(elementInput)) {                        // If the input isn't a valid whole numeric value
        element.style.borderBottom = '2px solid red';           // Apply red bottom border to indicate error
        element.setCustomValidity('Please enter a valid numeric value.'); // Set custom validity message (Client-side validation)
        element.reportValidity();                               // Show the validity message to the user
    }
    else {                                                      // Else If the input is valid             
        element.style.borderBottom = '';                        // Remove any error indication (red border)
        element.setCustomValidity('');                          // Set custom validity message (Client-side validation)
        element.reportValidity();                               // Show the validity message to the user
    }
}
// Function that Validates that the input field contains only a particular date format and shows a client-side validation error if invalid.
function validateDateInputById(elementId) {
    const element = document.getElementById(elementId);             // Get the input element (textbox) by its ID
    const elementInput = element.value.trim();                      // Get the trimmed value of the textbox
    const idPattern = /^(\d{4}-\d{2}-\d{2})*$/;                    // Only allow this date format - regular expression pattern

    if (!idPattern.test(elementInput)) {                        // If the input isn't a valid whole numeric value
        element.style.borderBottom = '2px solid red';           // Apply red bottom border to indicate error
        element.setCustomValidity('Please enter the correct data format'); // Set custom validity message (Client-side validation)
        element.reportValidity();                               // Show the validity message to the user
    }
    else {                                                      // Else If the input is valid             
        element.style.borderBottom = '';                        // Remove any error indication (red border)
        element.setCustomValidity('');                          // Set custom validity message (Client-side validation)
        element.reportValidity();                               // Show the validity message to the user
    }   
}
// Function that Validates that the input field contains only printable characters and shows a client-side validation error if invalid.
function validateNameInputById(elementId) {
    const element = document.getElementById(elementId);             // Get the input element (textbox) by its ID
    const elementInput = element.value.trim();
    const idPattern = /^[\x20-\x7E]*$/;                             // Only allow Zero or more occurrences of printable ASCII characters - regular expression pattern

    if(!idPattern.test(elementInput)) {                        // If the input isn't a valid whole numeric value
        element.style.borderBottom = '2px solid red';           // Apply red bottom border to indicate error
        element.setCustomValidity('Please enter a valid name with valid characters only.'); // Set custom validity message (Client-side validation)
        element.reportValidity();                               // Show the validity message to the user
    }
    else {                                                      // Else If the input is valid             
        element.style.borderBottom = '';                        // Remove any error indication (red border)
        element.setCustomValidity('');                          // Set custom validity message (Client-side validation)
        element.reportValidity();                               // Show the validity message to the user
    }
}

function validateStateInputById(elementId) {
    const element = document.getElementById(elementId);
    const elementInput = element.value.trim();
    const idPattern = /^([A-Za-z]{2})?$/;                       // Only allow up to two alphabetic characters or zero  - regular expression pattern

    if(!idPattern.test(elementInput)) {                        // If the input isn't a valid whole numeric value
        element.style.borderBottom = '2px solid red';
        element.setCustomValidity('Please enter a valid state with up to two alphabetic characters only.'); // Set custom validity message (Client-side validation)
        element.reportValidity();                               // Show the validity message to the user
    } else {
        element.style.borderBottom = '';
        element.setCustomValidity(''); // Clear any previous error messages
        element.reportValidity();      // Show the validity message to the user
    }
}
// POST Endpoint for Spring Boot API
// axios.post("http://localhost:8080/students/insertNewStudent")
// .