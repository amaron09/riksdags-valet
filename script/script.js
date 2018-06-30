const parti = ["Socialdemokraterna", "Sverigedemokraterna", "Miljöpartiet", "Cenerpartiet", "Vänsterpartiet",
 "Liberalerna", "Kristdemokraterna", "Utan partibeteckning", "Ny demokrati"];
const valkrets = ["Blekinge län", "Dalarnas län", "Gotlands län", "Gävleborgs län", "Göteborgs län", "Hallands län",
 "Jämtlands län", "Jönköpings län", "Kalmar län", "Kronobergs län", "Malmö län", "Norrbottens län", "Skåne läns norra och östra", 
 "Skåne läns södra", "Skåne läns västra", "Stockholms kommun", "Södermanlands län", "Uppsala län", "Värmlands län", 
 "Västerbottens län", "Västernorrlands län", "Västmanlands län", "Västra Götalands län norra", "Västra Götalands läns södra",
 "Västra Götalands län västra", "Västra Götalands län östra", "Örebro län", "Östergötlands län"];
const utskott = ["Arbetsmarknadsutskottet", "Civilutskottet", "Finansutskottet", "Försvarsutskottet", "Justiteutskottet", 
"Konstitutionsutskottet", "Kulturutskottet", "Miljö och jordbruksutskottet", "Näringsutskottet", "Skatteutskottet", 
"Socialförsäkringsutskottet", "Socialutskottet", "Trafikutskottet", ""]


const date = new Date();
const currentYear = date.getFullYear();

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
	const personObject = matches.personlista.person[randomPerson];

	cardContainer.append(`
		<div class="ledamotCard row">
			<div class="col-md-12 col-lg-3 pr-3">
				<h2>${personObject.tilltalsnamn} ${personObject.efternamn}</h2>
				<img src="${personObject.bild_url_192}" alt="${personObject.sorteringsnamn} profilbild">
			</div>
			<div class="col-md-12 col-lg-9">
				<p id="candidate"></p>
				<p><b>Parti: </b>${personObject.parti}</p>
				<p><b>Ålder: </b>${currentYear-personObject.fodd_ar}</p>
				<p><b>Status: </b>${personObject.status}</p>
				<p><b>Valkrets: </b>${personObject.valkrets}</p>
				<p id="education"></p>
				<p id="employments"></p>
				
				
				<div class="row">
					<div id="websiteLink" class="col-12">
						
					</div>
				</div>

			</div>

			
			

		</div>
		`);

	const educationContainer = $("#education");
	const websiteLinkButton = $("#websiteLink");
	const candidateContainer = $("#candidate");
	const employmentsContainer = $("#employments");

	for (let uppgift of personObject.personuppgift.uppgift) {
		if (uppgift.kod === "Utbildning") {
			educationContainer.append(`<b>Utbildning: </b>${uppgift.uppgift}`)
		}
		if (uppgift.kod === "Webbsida") {
			websiteLinkButton.append(`<a href="${uppgift.uppgift}" target="_blank">Läs mer</a>`)
		}
		if (uppgift.kod === "Anställningar") {
			employmentsContainer.append(`<b>Anställningar: </b>${uppgift.uppgift}`)
		}
		if (uppgift.kod === "KandiderarINastaVal") {
			if (uppgift.uppgift[0] === "true") {
				candidateContainer.append(`<b>Kandiderar i nästa val: </b> Ja`)
			}
			else {
				candidateContainer.append(`<b>Kandiderar i nästa val: </b> Nej`)
			}
		}
	}

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