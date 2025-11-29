

// function to update the table in the HTML
function getIDForPrayers() {
	// put the prayers time inside the prayers ids
    document.getElementById("fajr").textContent = prayerTimes.fajr;
    document.getElementById("dhuhr").textContent = prayerTimes.dhuhr;
    document.getElementById("maghrib").textContent = prayerTimes.asr;
    document.getElementById("asr").textContent = prayerTimes.maghrib;
    document.getElementById("isha").textContent = prayerTimes.isha;
}
// calls the function so the table actually updates
getIDForPrayers();