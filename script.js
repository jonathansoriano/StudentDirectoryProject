document.getElementById("searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    searchStudentsUpdated();
});

document.getElementById('clearBtn').addEventListener('click', function() {
            document.getElementById('searchForm').reset();
            document.getElementById('resultsSection').style.display = 'none';
        });

function searchStudentsUpdated(){
    const params = buildAxiosParams(
        document.getElementById('studentId').value,
        document.getElementById('firstName').value,
        document.getElementById('lastName').value,
        document.getElementById('dob').value,
        document.getElementById('city').value,
        document.getElementById('state').value,
        document.getElementById('universityId').value,
        document.getElementById('grade').value
    );

    axios.get('http://localhost:8080/students/searchStudent',{
        params
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

function buildAxiosParams(id, firstName, lastName, dob, residentCity, residentState, universityId, grade) {
    const params = {};
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
    return params;
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

//Function No longer used. Retained for reference.
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