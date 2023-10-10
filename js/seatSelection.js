import {fetchAnyUrl} from "/js/modulejson.js";

document.addEventListener("DOMContentLoaded", function () {

    const seatsContainer = document.querySelector(".all-seats");

    //Generate seats
    function generateSeats(theater) {
        const seatsPerLine = theater.seatsPrLine;
        const numberOfLines = theater.numberOfLines;

        for (let row = 1; row <= numberOfLines; row++) {
            for (let seatNumber = 1; seatNumber <= seatsPerLine; seatNumber++) {
                const seatId = `r${row}c${seatNumber}`;
                const isBooked = false;
                const bookedClass = isBooked ? "booked" : "";
                const disabledAttr = isBooked ? "disabled" : "";

                seatsContainer.insertAdjacentHTML(
                    "beforeend",
                    `<input type="checkbox" name="tickets" id="${seatId}" ${disabledAttr} />
                    <label for="${seatId}" class="seat ${bookedClass}"></label>`
                );
            }
        }
        //Calculate the number of columns for CSS
        const totalSeats = seatsPerLine * numberOfLines;
        const numColumns = Math.ceil(totalSeats / numberOfLines);
        seatsContainer.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

    }

    //Update seats for dynamic flow
    function updateSeatCount() {
        let amount = document.querySelector(".amount").innerHTML;
        let count = document.querySelector(".count").innerHTML;
        amount = Number(amount);
        count = Number(count);

        return (ticket) => {
            if (!ticket.disabled) {
                if (ticket.checked) {
                    count += 1;
                    amount += 100;
                } else {
                    count -= 1;
                    amount -= 100;
                }
                document.querySelector(".amount").innerHTML = amount;
                document.querySelector(".count").innerHTML = count;
            }
        };
    }


    const urlParams = new URLSearchParams(window.location.search);
    const showtimeId = urlParams.get('showtimeId');

    if (!showtimeId) {
        console.error('Showtime ID not found in URL parameters.');
    } else {

        fetchAnyUrl(`http://localhost:8080/showtimes/${showtimeId}/theater`)
            .then((theaterSize) => {
                generateSeats(theaterSize);

                //Update event listeners for dynamically generated seats
                const tickets = seatsContainer.querySelectorAll("input");
                const updateSeatCountFn = updateSeatCount();

                tickets.forEach((ticket) => {
                    ticket.addEventListener("change", () => {
                        updateSeatCountFn(ticket);
                    });
                });
            })
            .catch((error) => {
                console.error('Error fetching theater size:', error);
            });
    }
});