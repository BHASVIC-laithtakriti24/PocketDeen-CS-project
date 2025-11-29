
function TimeSet() {
    let TimeTill = document.getElementById("timer"); // sets the timer till the next prayer
    const day = data.getDate();
    const hour = data.getHours();
    const minutes = data.getMinutes();

    console.log(day, hours, minutes);
}
// Object holding all the prayer times
const prayerTimes = {
    fajr: "5:15",
    dhuhr: "11:50",
    asr: "15:15",
    maghrib: "17:30",
    isha: "20:30"
};

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