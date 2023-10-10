// login.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginData = {
            username: username,
            password: password
        };

        // Make an HTTP POST request to your backend's login endpoint
        console.log('Before fetch');
        fetch('http://localhost:8080/admins/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                console.log('Response status:', response.status);
                if (response.ok) {
                    // Login successful
                    console.log('Login successful');
                    window.location.href = 'manage.html'; // Redirect to a dashboard page
                } else {
                    // Handle login failure, display an error message, etc.
                    console.error('Login failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    });
});

