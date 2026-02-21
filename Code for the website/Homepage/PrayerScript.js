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
    try {
        const response = await fetch("https://api.aladhan.com/v1/timingsByAddress/01-01-2025?address=Brighton%2C+UK&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ");// The prayer Api
        const data = await response.json();
		
		if(!response.ok){
			throw new Error("could not fetch");
		}
		
		prayerTimes = {
            fajr: data.data.timings.Fajr,
            dhuhr: data.data.timings.Dhuhr,
            asr: data.data.timings.Asr,
            maghrib: data.data.timings.Maghrib,
            isha: data.data.timings.Isha
		}

		getIDForPrayers();
		
    } 
	catch (error) { 
        console.error(error);
    }
}


function findNextPrayerCountdown() {
	// get curret date
    let now = new Date();

	// list for the prayers
    let list = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

	// go through each one of the prayers.
    for (let i = 0; i < list.length; i++) {
        let p = list[i];
		
		//split the timer into hours and minutes
        let parts = prayerTimes[p].split(":");
        let hour = parseInt(parts[0]);
        let minute = parseInt(parts[1]);

		//make a full date for the current prayer times
        let prayerTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            minute
        );

		// checks if this prayer is after the current time
        if (prayerTime > now) {
            nextPrayerName = p; // stores the next prayer name
            nextPrayerTime = prayerTime; // stores the next prayer time
            return;
        }
	}

	// If all prayers passed, set Fajr for next day
	let parts = prayerTimes["fajr"].split(":");
	nextPrayerName = "fajr";
	nextPrayerTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        parseInt(parts[0]),
		parseInt(parts[1])
	);
}


function updateCountdown(){
	if(!prayerTimes.fajr) return;
	
	findNextPrayerCountdown();
	
	let now = new Date();
	let diff = nextPrayerTime - now;
	
	let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
	
	let hoursText;
	let minutesText;
	let secondsText;

	if (hours < 10) {
		hoursText = "0" + hours;
	} else {
		hoursText = hours;
	}

	if (minutes < 10) {
		minutesText = "0" + minutes;
	} else {
		minutesText = minutes;
	}

	if (seconds < 10) {
		secondsText = "0" + seconds;
	} else {
		secondsText = seconds;
	}

	document.getElementById("timer").textContent =
		nextPrayerName.toUpperCase() + " in " + hoursText + ":" + minutesText + ":" + secondsText;
}

setInterval(updateCountdown, 1000);
fetchPrayerTimes();
