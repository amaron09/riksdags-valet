const parti = ["Socialdemokraterna", "Sverigedemokraterna", "Miljöpartiet", "Cenerpartiet", "Vänsterpartiet",
 "Liberalerna", "Kristdemokraterna", "Utan partibeteckning", "Ny demokrati"];
const valkrets = ["Blekinge län", "Dalarnas län", "Gotlands län", "Gävleborgs län", "Göteborgs län", "Hallands län",
 "Jämtlands län", "Jönköpings län", "Kalmar län", "Kronobergs län", "Malmö län", "Norrbottens län", "Skåne läns norra och östra", 
 "Skåne läns södra", "Skåne läns västra", "Stockholms kommun", "Södermanlands län", "Uppsala län", "Värmlands län", 
 "Västerbottens län", "Västernorrlands län", "Västmanlands län", "Västra Götalands län norra", "Västra Götalands läns södra",
 "Västra Götalands län västra", "Västra Götalands län östra", "Örebro län", "Östergötlands län"];

createPartiSelector();

async function searchLedamot(searchCriteria) {
	const baseURL = "";
	const responseObj = await fetch(baseURL + searchCriteria);
	const matches = await responseObj.json();

	console.log(matches);
	createCard(matches);

}

function createCard(matches) {
	const cardContainer = $("#cardContainer");
	const randomPerson = Math.floor(Math.random() * 349);

	console.log("Hej");
	console.log(matches.personlista.person[randomPerson]);
}

function createPartiSelector() {
	const selectContainer = $("#partiFilter");
	const valkretsContainer = $("#valkretsFilter");
	console.log(selectContainer)
	for (let i = 0; i < parti.length; i++) {
		selectContainer.append(`<option value="${parti[i]}">${parti[i]}</option>`);
	}

	for (let i = 0; i < valkrets.length; i++) {
		valkretsContainer.append(`<option value="${valkrets[i]}">${valkrets[i]}</option>`)
	}
}


const url = "http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&termlista=";

searchLedamot(url);