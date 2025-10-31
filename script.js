document.getElementById("searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    searchStudents();
});

document.getElementById('clearBtn').addEventListener('click', function() {
            document.getElementById('searchForm').reset();
            document.getElementById('resultsSection').style.display = 'none';
        });

function searchStudents(){
    axios.get('http://localhost:8080/students/searchStudent',{
        params: {
            id: document.getElementById('studentId').value.trim(),
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            dob: document.getElementById('dob').value.trim(),
            residentCity: document.getElementById('city').value.trim(),
            residentState: document.getElementById('state').value.trim(),
            universityId: document.getElementById('universityId').value.trim(),
            grade: document.getElementById('grade').value.trim()
        }
    })
    .then(response => {
        console.log(response);
        displayResults(response);
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

function displayResults(response){
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');

    resultsSection.style.display = 'block';

    resultsContainer.innerHTML = response.data.map(student =>  `
        <div class="student-card">
            <h3>${student.firstName} ${student.lastName}</h3>
            <div class="student-info">
                <div class="info-item">
                    <span class="info-label">Student ID:</span> ${student.id}
                </div>
                <div class="info-item">
                    <span class="info-label">Date of Birth:</span> ${student.dob}
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
    `).join('');
}
// POST Endpoint for Spring Boot API
// axios.post("http://localhost:8080/students/insertNewStudent")
// .