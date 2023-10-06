

const movieInfoContainer = document.getElementById("theaterandseats");

export async function fetchTheaterDetails(theaterId) {
    try {
        const response = await fetch(`http://localhost:8080/theaters/${theaterId}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const theaterData = await response.json();
        return theaterData;
    } catch (error) {
        console.error("Error fetching theater details:", error);
        throw error;
    }
}

export async function fetchAvailableSeats(showtimeId) {
    try {
        const response = await fetch(`http://localhost:8080/showtimes/${showtimeId}/available-seats`);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const availableSeats = await response.json();
        return availableSeats;
    } catch (error) {
        console.error("Error fetching available seats:", error);
        throw error;
    }
}

export async function reserveSeat(showtimeId, seatId, userId) {
    try {
        const response = await fetch(`http://localhost:8080/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                showtimeId,
                seatId,
                userId,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const reservationData = await response.json();
        return reservationData;
    } catch (error) {
        console.error("Error reserving seat:", error);
        throw error;
    }
}
