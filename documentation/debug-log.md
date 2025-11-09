# Error Log — Student Directory Project

## 2025-10-31 — Axios 403 Problem
**Issue:** Received a 403 Forbidden error when making an Axios request from the frontend to the Spring Boot backend.  
**Cause:** The frontend was running at `https://127.0.0.1:5500`, but the Spring Boot application's CORS configuration only allowed requests from `http://localhost:5500`. Since browsers treat `localhost` and `127.0.0.1` as different origins, the backend blocked the request.  
**Fix:** Added `http://127.0.0.1:5500` to the list of allowed origins in the Spring Boot `corsConfigurer()` configuration, allowing both URLs to access the backend API.

---

## 2025-10-31 — Uncaught SyntaxError: Cannot use import statement outside a module
**Issue:** Browser console showed `Uncaught SyntaxError: Cannot use import statement outside a module` when trying to use Axios with `import axios from "axios";`.  
**Cause:** The `<script>` tag in the HTML did not specify that the JavaScript file was an ES module, so the browser didn’t recognize `import` syntax. Additionally, the script was loaded in the `<head>` before the DOM was ready.  
**Fix:** Replaced the local Axios import with a CDN `<script>` tag (inside the head tags), and moved the custom `script.js` and the script tags inside the `<body>` (but before the `</body>`).

---

## 2025-10-31 — Missing Backticks for HTML Template String and Undefined Fields in Results
**Issue:** The HTML template inside `innerHTML` wasn’t rendering correctly, and student fields displayed as `undefined` in the results section.  
**Cause:**  
- The HTML template string didn’t use backticks (`` ` ``), so JavaScript didn’t recognize it as a valid template literal.  
- The API returned a **List of Student objects**, so accessing properties directly through `response.data.fieldName` caused `undefined` errors.  
**Fix:**  
- Added missing backticks around the HTML template string.  
- Used `response.data.map(student => ...)` to loop through each student object in the array.  
- Replaced incorrect property access (`response.data.fieldName`) with `student.fieldName` inside the map function.  
**Result:**  
This fixed both the template rendering issue and the `undefined` field values in the results section.

---

## 2025-10-31 — “No Students Found” Message Not Displaying
**Issue:** The “No students found matching the criteria” message wasn’t showing when no matching student was found in the API.  
**Cause:** The check for an empty result list wasn’t handling API errors or 404 responses properly.  
**Fix:** Added logic in the `catch` block to handle all 400–500 status errors, specifically checking for 404 errors:  

```javascript
.catch(error => {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsSection = document.getElementById('resultsSection');

    resultsSection.style.display = 'block';

    if (error.response && error.response.status === 404) {
        resultsContainer.innerHTML = '<p>No students found matching the criteria.</p>';
    } else {
        resultsContainer.innerHTML = '<p>There was an error fetching the student data.</p>';
    }

    console.error("Error fetching student data:", error);
});
```

---

## 2025-11-01 — Date of Birth UI field is buggy at times. Sometimes returns a 404 or 500
**Issue** Browser console was giving the occational 500 when inputing things in DOB field.
**Cause** Invalid input type (Ex. DOB and Student ID can't be a string) in textboxes. 
**Fix** (Fix not implemented yet) Handle invalid input types in textboxes using JS or HTML. Type tag, or something like it.

