 


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
        const response = await fetch("https://api.aladhan.com/v1/timingsByAddress?address=Brighton,UK");// The prayer Api
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

function countDownForNextPrayer(){//For the countDown
	const now = new date();
	
}
