 


// function to update the table in the HTML
function getIDForPrayers() {
    document.getElementById("fajr").textContent = prayerTimes.fajr;
    document.getElementById("dhuhr").textContent = prayerTimes.dhuhr;
    document.getElementById("asr").textContent = prayerTimes.asr;      
    document.getElementById("maghrib").textContent = prayerTimes.maghrib;
    document.getElementById("isha").textContent = prayerTimes.isha;
}


// calls the function so the table updates
fetchPrayerTimes();

async function fetchPrayerTimes() {
    try {// Sends request to API for Brighton, UK prayer timings
        const response = await fetch("https://api.aladhan.com/v1/timingsByAddress/01-01-2025?address=Brighton%2C+UK&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ");// The prayer Api
        const data = await response.json();
		
		// Throws an error if the response was unsuccessful
		if(!response.ok){
			throw new Error("could not fetch");
		}
		
		// Object holding all the prayer times
		prayerTimes = {
            fajr: data.data.timings.Fajr,// timings from the API
            dhuhr: data.data.timings.Dhuhr,
            asr: data.data.timings.Asr,
            maghrib: data.data.timings.Maghrib,
            isha: data.data.timings.Isha
		}
		// Updates the HTML table with the new prayer times
		getIDForPrayers();
		
    } 
	catch (error) { 
		 // catches any error that occurs during the request or processing
        console.error(error);
    }
}

countDownForNextPrayer();

function countDownForNextPrayer() {
    // Create a countdown variable 
    s
	let timer = "1hr 30m 21s"

    // Update the element with id="timer"
    document.getElementById("timer").textContent = timer;

    // Get the current date and time
    const now = new Date();
    console.log("Current time:", now);
}
