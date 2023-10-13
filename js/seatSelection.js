import {fetchAnyUrl} from "/js/modulejson.js";

document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.querySelector(".all-seats");
    let tickets = [];
    let showtimeId;

    // Generate seats
    function generateSeats(theater, seatShowtimeData) {
        const seatsPerLine = theater.seatsPrLine;
        const numberOfLines = theater.numberOfLines;

        for (let row = 1; row <= numberOfLines; row++) {
            for (let seatNumber = 1; seatNumber <= seatsPerLine; seatNumber++) {
                const seatId = `r${row}c${seatNumber}`;
                const seatShowtimeId = getSeatShowtimeIdForSeat(seatShowtimeData, row, seatNumber);
                // Add property to grey out a booked seat (no grey-out logic is yet applied)

                const seatHTML = `
                    <input type="checkbox" name="tickets" id="${seatId}" data-seatShowtimeId="${seatShowtimeId}" />
                    <label for="${seatId}" class="seat"></label>
                `;
                seatsContainer.insertAdjacentHTML("beforeend", seatHTML);
            }
        }
        const numColumns = Math.ceil((seatsPerLine * numberOfLines) / numberOfLines);
        seatsContainer.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
    }

    //ShowtimeID for each seat
    function getSeatShowtimeIdForSeat(seatShowtimeData, row, seatNumber) {
        for (const seatShowtime of seatShowtimeData) {
            if (seatShowtime.seat.line === row && seatShowtime.seat.seat === seatNumber) {
                return seatShowtime.seatShowTimeID;
            }
        }
    }

    //Fetch theater and seatShowtime
    const urlParams = new URLSearchParams(window.location.search);
    showtimeId = urlParams.get("showtimeId");
    fetchAnyUrl(`http://localhost:8080/showtimes/${showtimeId}/theater`)
        .then((theater) => {
            fetchAnyUrl(`http://localhost:8080/seatshowtimes/getByShowtimeId?showtimeId=${showtimeId}`)
                .then((seats) => {
                    generateSeats(theater, seats);
                    tickets = Array.from(seatsContainer.querySelectorAll("input"));
                })
                .catch((error) => {
                    console.error("Error fetching seatShowtime information:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching theater size:", error);
        });

    // Book button gets selected seatShowtimeID
    document.querySelector("button").addEventListener("click", () => {
        const selectedSeats = tickets
            .filter((ticket) => ticket.checked)
            .map((ticket) => ({
                seatId: ticket.id,
                seatShowtimeId: ticket.getAttribute("data-seatShowtimeId"),
            }));

        //URL
        const seatShowtimeIds = selectedSeats.map((seat) => seat.seatShowtimeId).join(",");
        const reservationUrl = `createReservation.html?showtimeId=${showtimeId}&seatShowtimeId=${seatShowtimeIds}`;
        window.location.href = reservationUrl;
    });
});

