document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const createAdminButton = document.getElementById('create-admin-btn');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginData = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/admins/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                console.log(response.status);  // Log HTTP status code
                if (response.ok) {
                    window.location.href = 'manage.html';
                } else {
                    throw new Error('Login failed');
                }
            })
            .catch(error => {
                console.error('Error during login:', error.message);
                alert('Login failed. Please check your credentials and try again.');
            });
    });

    createAdminButton.addEventListener('click', function (event) {
        event.preventDefault();

        const newAdminUsername = prompt('Enter new admin username:');
        const newAdminPassword = prompt('Enter new admin password:');

        if (newAdminUsername && newAdminPassword) {
            const newAdminData = {
                username: newAdminUsername,
                password: newAdminPassword
            };

            fetch('http://localhost:8080/admins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAdminData)
            })
                .then(response => {
                    console.log(response.status);  // Log HTTP status code
                    if (response.ok) {
                        alert('Admin created successfully!');
                    } else {
                        throw new Error('Failed to create admin');
                    }
                })
                .catch(error => {
                    console.error('Error during admin creation:', error.message);
                    alert('Failed to create admin. Please try again later.');
                });
        } else {
            alert('Invalid admin data. Please try again.');
        }
    });
});
