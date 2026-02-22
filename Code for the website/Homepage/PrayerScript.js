// function to update the table in the HTML
function getIDForPrayers() {
	 // puts the prayer time into the element with "prayer" id
    document.getElementById("fajr").textContent = prayerTimes.fajr;
    document.getElementById("dhuhr").textContent = prayerTimes.dhuhr;
    document.getElementById("asr").textContent = prayerTimes.asr;      
    document.getElementById("maghrib").textContent = prayerTimes.maghrib;
    document.getElementById("isha").textContent = prayerTimes.isha;
}


// calls the function so the table updates
fetchPrayerTimes();

async function fetchPrayerTimes() {// async function to get prayer times from the API
    try { // code that might cause an error
        const response = await 
			fetch("https://api.aladhan.com/v1/timingsByCity/2026-02-21?city=Brighton%20and%20Hove&country=United%20Kingdom&method=2");// sends request to the prayer API website
        const data = await response.json();// checks if the request worked
		

		if(!response.ok){  // checks if the request worked
			throw new Error("could not fetch"); // if it didn’t work, show an error
		}
		
		prayerTimes = {// stores the prayer times into an object
            fajr: data.data.timings.Fajr,
            dhuhr: data.data.timings.Dhuhr,
            asr: data.data.timings.Asr,
            maghrib: data.data.timings.Maghrib,
            isha: data.data.timings.Isha
		}
		// updates the table with the new times
		getIDForPrayers();
		
    } 
	catch (error) { // shows error in console if something goes wrong
        console.error(error);
    }
}


function findNextPrayerCountdown() {// function to find the next prayer
	// get curret date
    let now = new Date();

	// array that stores prayer names
    let list = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

	// loop through all prayers
    for (let i = 0; i < list.length; i++) {
        let p = list[i];

        let parts = prayerTimes[p].split(":"); // split time into hours and minutes
        let hour = parseInt(parts[0]);// converts hour to number
        let minute = parseInt(parts[1]); // converts minute to number
		
		// create full date object for that prayer today
        let prayerTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            minute
        );

		// check if this prayer time is still in the future
        if (prayerTime > now) {
            nextPrayerName = p; // stores the next prayer name
            nextPrayerTime = prayerTime; // stores the next prayer time
            return;// stop the loop
        }
	}

	// If all prayers passed, set Fajr for next day
	let parts = prayerTimes["fajr"].split(":"); // split fajr time for tomorrow
	nextPrayerName = "fajr";// set next prayer to fajr
	
	// set fajr time for the next day
	nextPrayerTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        parseInt(parts[0]),
		parseInt(parts[1])
	);
}

// function to update countdown timer
function updateCountdown(){
	if(!prayerTimes.fajr) return;// if prayer times not loaded yet, stop
	
	findNextPrayerCountdown();// find the next prayer first
	
	let now = new Date();// get current time
	let diff = nextPrayerTime - now; // calculate difference between next prayer and now
	
	let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));// calculate hours left
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));// calculate minutes left
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);// calculate seconds left
	
	// variables to store formatted text
	let hoursText;
	let minutesText;
	let secondsText;

	if (hours < 10) {// if hours less than 10 add a 0 in front
		hoursText = "0" + hours;
	} else {
		hoursText = hours;
	}

	if (minutes < 10) {// if minutes less than 10 add a 0
		minutesText = "0" + minutes;
	} else {
		minutesText = minutes;
	}

	if (seconds < 10) {// if seconds less than 10 add a 0
		secondsText = "0" + seconds;
	} else {
		secondsText = seconds;
	}
// display the countdown in the element with id "timer"
	document.getElementById("timer").textContent = 
		nextPrayerName.toUpperCase() + " in " + hoursText + ":" + minutesText + ":" + secondsText;
}

setInterval(updateCountdown, 1000);// runs the countdown every 1 second (1000 milliseconds)
fetchPrayerTimes();// calls the function again to get prayer times
