import axios from "axios";

// GET Endpoint for Spring Boot API
axios.get("http://localhost:8080/students/searchStudent")
    .then(response => {console.log(response)})
    .catch(error => {
        console.error("There was an error fetching the student data!", error);
    });

// POST Endpoint for Spring Boot API
// axios.post("http://localhost:8080/students/insertNewStudent")
// .