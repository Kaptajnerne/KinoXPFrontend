// Sample data for booked seats (replace with your dynamic data)
const bookedSeats = [2, 5, 8];
const numberOfSeats = 399;

// Function to generate dynamic seats
function generateSeats() {
    let seats = document.querySelector(".all-seats");
    for (let i = 1; i <= numberOfSeats; i++) {
        let isBooked = bookedSeats.includes(i);
        let bookedClass = isBooked ? "booked" : "";
        let disabledAttr = isBooked ? "disabled" : "";
        seats.insertAdjacentHTML(
            "beforeend",
            `<input type="checkbox" name="tickets" id="s${i}" ${disabledAttr} /><label for="s${i}" class="seat ${bookedClass}"></label>`
        );
    }

    // Update event listeners for dynamically generated seats
    let tickets = seats.querySelectorAll("input");
    tickets.forEach((ticket) => {
        ticket.addEventListener("change", () => {
            let amount = document.querySelector(".amount").innerHTML;
            let count = document.querySelector(".count").innerHTML;
            amount = Number(amount);
            count = Number(count);

            if (!ticket.disabled) {
                if (ticket.checked) {
                    count += 1;
                    amount += 150;
                } else {
                    count -= 1;
                    amount -= 150;
                }
                document.querySelector(".amount").innerHTML = amount;
                document.querySelector(".count").innerHTML = count;
            }
        });
    });
}

// Call the function to generate seats
generateSeats();





/*
let seats = document.querySelector(".all-seats");
for (var i = 0; i < 239; i++) {
    let randint = Math.floor(Math.random() * 2);
    let booked = randint === 1 ? "booked" : "";
    seats.insertAdjacentHTML(
        "beforeend",
        '<input type="checkbox" name="tickets" id="s' +
        (i + 2) +
        '" /><label for="s' +
        (i + 2) +
        '" class="seat ' +
        booked +
        '"></label>'
    );
}

let tickets = seats.querySelectorAll("input");
tickets.forEach((ticket) => {
    ticket.addEventListener("change", () => {
        let amount = document.querySelector(".amount").innerHTML;
        let count = document.querySelector(".count").innerHTML;
        amount = Number(amount);
        count = Number(count);

        if (ticket.checked) {
            count += 1;
            amount += 150;
        } else {
            count -= 1;
            amount -= 150;
        }
        document.querySelector(".amount").innerHTML = amount;
        document.querySelector(".count").innerHTML = count;
    });
});
*/








/*
// Fetch movie and showtime data from your backend API
fetch('your_backend_api_url')
    .then(response => response.json())
    .then(data => {
        // Process the data and generate the schedule dynamically
        generateSchedule(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to generate the schedule based on the data
function generateSchedule(data) {
    const scheduleContainer = document.getElementById('schedule-container');

    // Loop through the data to create schedule elements
    data.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        // Create a title for the movie
        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;

        // Create a table to display showtimes for each day
        const tableElement = document.createElement('table');

        // Loop through showtimes for each day
        movie.showtimes.forEach(day => {
            const row = tableElement.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);

            cell1.textContent = day.day;
            cell2.textContent = day.showtime;
        });

        // Append title and table to the movie element
        movieElement.appendChild(titleElement);
        movieElement.appendChild(tableElement);

        // Append the movie element to the schedule container
        scheduleContainer.appendChild(movieElement);
    });
}

*/
