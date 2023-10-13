import {fetchAnyUrl} from "/js/modulejson.js";

const urlParams = new URLSearchParams(window.location.search);
const seatShowtimeIds = urlParams.get("seatShowtimeId");

//Simple hardcoded fullprice
if (!seatShowtimeIds) {
    alert("No seatShowtimeIds found in the URL.");
} else {
    const ids = seatShowtimeIds.split(',');
    const totalPrice = ids.length * 100;

    document.getElementById("fullPrice").value = totalPrice;
}

//Book button
const bookButton = document.getElementById("book-button");
if (bookButton) {
    bookButton.addEventListener("click", () => {
        // Get user details from the form
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const age = document.getElementById("age").value;
        const reservationData = {
            name: name,
            email: email,
            age: age,
        };

        // Create a reservation
        const reservationUrl = `http://localhost:8080/reservations/create?seatShowtimeIds=${seatShowtimeIds}`;
        fetch(reservationUrl, {
            method: "POST",
            body: JSON.stringify(reservationData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log("Reservation created successfully.");
                    alert("Reservation created successfully.");
                } else {
                    console.error("Failed to create a reservation.");
                    alert("Failed to create a reservation.");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });
}
