//Global Variables
const seperator = "<span class='seperator'> | </span>";
let pageLoadComplete = true;
let resultsLoaded = false;
let steamData = [];
let originalFormattedPriceTotal = 0;
let formattedCurrentPrice = 0;
let toggle = false;
let getHyperLinks = [];
let countryCodeCheck = "";
let countryCodesList = [
	"AR",
	"AT",
	"AU",
	"AZ",
	"BE",
	"BR",
	"CA",
	"CR",
	"DE",
	"EE",
	"EU",
	"FI",
	"FR",
	"GB",
	"GR",
	"ID",
	"IE",
	"IL",
	"IN",
	"IT",
	"JP",
	"KW",
	"KZ",
	"LI",
	"LU",
	"LV",
	"MX",
	"NL",
	"NO",
	"NZ",
	"PH",
	"PL",
	"PT",
	"QA",
	"RU",
	"SG",
	"SI",
	"SK",
	"SP",
	"TH",
	"TR",
	"UA",
	"US",
	"VN",
];

$(document).ready(function () {
	initialPageLoad();
	onResize();
	currencyDropdown();
	modal();
	lineBreak();
	readCounter();

	$("#sort").change(function () {
		sortBy();
		getHyperLinks = createHyperLinks();
		tabSwitch();
	});
	document
		.getElementById("selectItems")
		.firstChild.setAttribute("class", "sameAsSelected");
});

async function calculateWishlist(steamId, countryCode) {
	//Display results once called by the main function.
	let currentPriceTotal = 0;
	let originalPriceTotal = 0;
	let saleCountTotal = 0;
	let preOrderCountTotal = 0;
	let priceEmptyCountTotal = 0;
	let withPriceCountTotal = 0;
	let isFreeCountTotal = 0;
	const currencyData = callSwitch(countryCode);
	for (data of steamData) {
		//For each using keys instead of indexes.
		let currentPrice = data.bestPurchaseOption?.formattedFinalPrice;
		let originalPrice = data.bestPurchaseOption?.formattedOriginalPrice;
		if (currencyData.currencyBoolean == false && currentPrice !== undefined) {
			//If the price has a symbol on the right side of the price then we will keep only the contents on the left of split. If not then we will keep whats on the right of the split.
			//Check if it has a price (check if it's a number) Alt: Check that the symbol matches the character location.
			currentPriceTotal += priceToFloat(
				currentPrice.split(currencyData.currencySymbolCheck)[1],
				countryCode
			);
			if (originalPrice !== undefined) {
				saleCountTotal++;
				originalPriceTotal += priceToFloat(
					originalPrice.split(currencyData.currencySymbolCheck)[1],
					countryCode
				);
			} else {
				originalPriceTotal += priceToFloat(
					currentPrice.split(currencyData.currencySymbolCheck)[1],
					countryCode
				);
			}
		} else if (
			currencyData.currencyBoolean == true &&
			currentPrice !== undefined
		) {
			currentPriceTotal += priceToFloat(
				currentPrice.split(currencyData.currencySymbolRight)[0],
				countryCode
			);
			if (originalPrice !== undefined) {
				saleCountTotal++;
				originalPriceTotal += priceToFloat(
					originalPrice.split(currencyData.currencySymbolRight)[0],
					countryCode
				);
			} else {
				originalPriceTotal += priceToFloat(
					currentPrice.split(currencyData.currencySymbolRight)[0],
					countryCode
				);
			}
		}
		if (saleCountTotal > 0) {
			document.getElementById("salePricingButton").disabled = false;
		} else {
			document.getElementById("salePricingButton").disabled = true;
		}
		if (currentPrice !== undefined && data.release.isComingSoon === true) {
			preOrderCountTotal++;
		}
		if (currentPrice == undefined) {
			priceEmptyCountTotal++;
		} else {
			withPriceCountTotal++;
		}
		if (data.isFree == true) {
			isFreeCountTotal++;
		}
	}

	switch (
		countryCode //Check what currency type was selected and use the corrosponding formatting for the selected currency type.
	) {
		case "VN":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					3,
					".",
					"."
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					3,
					".",
					"."
				) + currencyData.currencySymbolRight;
			break;
		case "AR":
		case "AT":
		case "BE":
		case "FR":
		case "DE":
		case "IT":
		case "SP":
		case "PL":
		case "TR":
		case "NL":
		case "NO":
		case "EU":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					2,
					".",
					","
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					2,
					".",
					","
				) + currencyData.currencySymbolRight;
			break;
		case "JP":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					0,
					",",
					","
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					0,
					",",
					","
				) + currencyData.currencySymbolRight;
			break;
		case "IN":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					0,
					",",
					"."
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					0,
					",",
					"."
				) + currencyData.currencySymbolRight;
			break;
		case "PH":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					2,
					"",
					"."
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					2,
					"",
					"."
				) + currencyData.currencySymbolRight;
			break;
		case "CR":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					3,
					",",
					"."
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					3,
					",",
					"."
				) + currencyData.currencySymbolRight;
			break;
		case "RU":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					0,
					"",
					""
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					0,
					"",
					""
				) + currencyData.currencySymbolRight;
			break;
		case "BR":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					2,
					".",
					","
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					2,
					".",
					","
				) + currencyData.currencySymbolRight;
			break;
		case "KZ":
		case "ID":
		case "UA":
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol,
					0,
					" ",
					" "
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(
					currentPriceTotal,
					currencyData.currencySymbol,
					0,
					" ",
					" "
				) + currencyData.currencySymbolRight;
			break;
		default:
			originalFormattedPriceTotal =
				accounting.formatMoney(
					originalPriceTotal,
					currencyData.currencySymbol
				) + currencyData.currencySymbolRight;
			formattedCurrentPrice =
				accounting.formatMoney(currentPriceTotal, currencyData.currencySymbol) +
				currencyData.currencySymbolRight;
			break;
	}
	displayFinalResult(
		steamId,
		countryCode,
		saleCountTotal,
		preOrderCountTotal,
		priceEmptyCountTotal,
		withPriceCountTotal,
		isFreeCountTotal
	);
}

async function displayFinalResult(
	steamId,
	countryCode,
	saleCountTotal,
	preOrderCountTotal,
	priceEmptyCountTotal,
	withPriceCountTotal,
	isFreeCountTotal
) {
	let profileInfo = await getProfileInfo(steamId);
	const profileNameHyperLink = `<a href="https://store.steampowered.com/wishlist/profiles/${steamId}" class="titleLinks" title="${profileInfo.personaname}" target="_blank">${profileInfo.personaname}</a>`;
	document.getElementById("profileName").innerHTML = profileNameHyperLink;
	ToggleSalePricing();
	getHyperLinks = createHyperLinks();
	onWishlist(getHyperLinks); //Loads the correct page (On wishlist) for the wishlist exportation modal.
	styleSetDataContainer(); //Sets the styling for the Data Container and displays it.
	generateShareableUrl(steamId, countryCode);

	document.getElementById("titleCount").innerHTML = formatNumber(
		steamData.length
	);

	document.getElementById("onSale").innerHTML = formatNumber(saleCountTotal);
	document.getElementById("preOrder").innerHTML =
		formatNumber(preOrderCountTotal);
	document.getElementById("withoutPrice").innerHTML =
		formatNumber(priceEmptyCountTotal);
	document.getElementById("withPrice").innerHTML =
		formatNumber(withPriceCountTotal);
	document.getElementById("isFree").innerHTML = formatNumber(isFreeCountTotal);
	updateCounter(true);
}

async function updateCounter(flag) {
	let response = await fetch(
		"/counterUpdate?" +
			new URLSearchParams({
				flag,
			}).toString()
	);

	response = await response.text();
	document.getElementById("wishlistCount").innerHTML = formatNumber(response);
}

async function readCounter() {
	let response = await fetch("/counterRead");
	response = await response.text();
	document.getElementById("wishlistCount").innerHTML = formatNumber(response);
}

async function getProfileInfo(steamId) {
	let response = await fetch(
		"/getProfileInfo?" +
			new URLSearchParams({
				steamId,
			}).toString()
	);
	response = await response.json();

	return response;
}

async function getWishlist(steamIdOrVanityUrl, countryCode) {
	pageLoadComplete = false; //Sets the page load to false, e.g page is currently loading. Prevents the page from changing before the results display. Otherwise it causes issues with the results displaying on a different page and doing weird stuff.
	resultsLoaded = false;
	displayLoader();
	const steamId = await isVanityUrl(steamIdOrVanityUrl);

	if (steamId === 400) {
		throwError("Error: Invalid Steam ID");
	} else {
		const response = await fetch(
			"/wishlist?" +
				new URLSearchParams({
					steamId,
					countryCode,
				}).toString()
		);
		steamData = await response.text();
		if (response.status !== 400) {
			steamData = await JSON.parse(steamData);
			calculateWishlist(steamId, countryCode);
		} else {
			throwError(steamData);
		}
	}
}

async function isVanityUrl(steamIdOrVanityUrl) {
	let steamId = "";
	if (
		Number.isInteger(Number(steamIdOrVanityUrl)) &&
		steamIdOrVanityUrl.length === 17
	) {
		steamId = steamIdOrVanityUrl;
	} else {
		let response = await fetch(
			"/resolveVanityUrl?" +
				new URLSearchParams({
					vanityUrl: steamIdOrVanityUrl,
				}).toString()
		);
		steamId = await response.text();
		if (response.status === 400) {
			steamId = response.status;
		}
	}
	return steamId;
}

function generateShareableUrl(steamId, countryCode) {
	let urlShare =
		window.location.protocol +
		"//" +
		window.location.host +
		window.location.pathname +
		"?id=" +
		steamId +
		"&currency=" +
		countryCode; //Set the parameters for the URL.
	window.history.pushState(
		{
			path: urlShare,
		},
		"",
		urlShare
	);
}

function generateTableStructure(saleOff) {
	let rowArray = [];
	$("#wishlistTableBody .tr").remove();
	let table = document.getElementById("wishlistTableBody");
	let row, cell1, cell2, cell3, cell4, cell5, cell6;
	for (const [key, data] of Object.entries(steamData)) {
		let releaseDateFormatted = "";
		let currentPrice = data.bestPurchaseOption?.formattedFinalPrice;
		let originalPrice =
			data.bestPurchaseOption?.formattedOriginalPrice || currentPrice;
		let priceText = "";
		let originalPriceText = "";
		let url = "";

		row = document.createElement("div");
		row.setAttribute("class", "tr tableClass");

		cell1 = document.createElement("div");
		$(cell1).attr({
			class: "td tableTitle",
			"data-label": "Title",
		});

		cell2 = document.createElement("div");
		$(cell2).attr({
			class: "td",
			"data-label": "Release Date",
		});

		cell3 = document.createElement("div");
		$(cell3).attr({
			class: "td",
			"data-label": "AppID",
		});

		cell4 = document.createElement("div");
		$(cell4).attr({
			class: "td",
			id: "onSale",
			"data-label": "On Sale",
		});

		cell5 = document.createElement("div");
		$(cell5).attr({
			class: "td",
			"data-label": "Pre Order",
		});

		cell6 = document.createElement("div");
		$(cell6).attr({
			class: "td",
			"data-label": "Price",
		});

		if (data.visible !== false) {
			url =
				'<a href="http://store.steampowered.com/app/' +
				data.appid +
				'/" class="titleLinks" title="' +
				data.name +
				'" target="_blank">' +
				data.name +
				"</a>";
		} else {
			url =
				'<a href="https://steamdb.info/app/' +
				data.appid +
				'/" class="titleLinks" title="' +
				"Game Unlisted on Steam" +
				'" target="_blank">' +
				"Game Unlisted on Steam" +
				"</a>";
		}

		$(cell1).html(url);

		if (data.release?.steamReleaseDate !== undefined) {
			releaseDateFormatted = new Date(
				data.release?.steamReleaseDate * 1000
			).toLocaleDateString();
		} else {
			releaseDateFormatted = "Date Unknown";
		}
		if (data.release?.isComingSoon === true) {
			releaseDateFormatted = "Coming Soon";
		}

		$(cell2).html(releaseDateFormatted);

		$(cell3).html(data.appid);

		if (data.bestPurchaseOption?.activeDiscounts == undefined) {
			$(cell4).html("No");
		} else {
			$(cell4).html(data.bestPurchaseOption?.discountPct + "%");
		}

		if (
			saleOff == false &&
			data.bestPurchaseOption?.activeDiscounts !== undefined
		) {
			$(cell4).html("No");
		}

		if (currentPrice == "" || currentPrice == undefined) {
			if (data.isFree == true) {
				priceText = "Free";
			} else {
				priceText = "N/A";
			}
		} else if (
			data.bestPurchaseOption?.formattedOriginalPrice !== undefined &&
			data.bestPurchaseOption?.activeDiscounts !== undefined
		) {
			priceText = currentPrice;
			originalPriceText =
				"<span style='text-decoration: line-through;'>" +
				data.bestPurchaseOption?.formattedOriginalPrice +
				"</span>";
		} else {
			priceText = currentPrice;
		}

		if (currentPrice == "" || currentPrice == undefined) {
			if (data.isFree == true) {
				originalPrice = "Free";
			} else {
				originalPrice = "N/A";
			}
		} else if (
			data.bestPurchaseOption?.formattedOriginalPrice !== undefined &&
			data.bestPurchaseOption?.activeDiscounts !== undefined
		) {
			priceText = currentPrice;
			originalPriceText =
				"<span style='text-decoration: line-through;'>" +
				data.bestPurchaseOption?.formattedOriginalPrice +
				"</span>";
		} else {
			priceText = currentPrice;
		}

		if (currentPrice !== undefined && data.release.isComingSoon === true) {
			$(cell5).html("Yes");
		} else {
			$(cell5).html("No");
		}
		if (saleOff == false) {
			$(cell6).html(
				`<span class="desktopPrice">
                       <span class="tr" style="text-decoration: none; font-size: small; color: gray;line-height: 0px;box-shadow: none;">
                             <span style="text-decoration: line-through; text-align: center;width: 100%;"></span>
                         </span>
   
                         <span class="tr" style="line-height: 0px;box-shadow: none;">
                             <span style="text-align: center;width: 100%;">${originalPrice}</span>
                         </span>
                   </span>
   
                   <span class="mobilePrice">${originalPrice}<span style='text-decoration: none; font-size: small; color: gray;'></span></span>`
			);
		} else {
			$(cell6).html(
				`<span class="desktopPrice">
                       <span class="tr" style="text-decoration: none; font-size: small; color: gray;line-height: 0px;box-shadow: none;">
                             <span style="text-decoration: line-through; text-align: center;width: 100%;">${originalPriceText}</span>
                         </span>
   
                         <span class="tr" style="line-height: 0px;box-shadow: none;">
                             <span style="text-align: center;width: 100%;">${priceText}</span>
                         </span>
                   </span>
   
                   <span class="mobilePrice">${priceText}<span style='text-decoration: none; font-size: small; color: gray;'> ${originalPriceText}</span></span>`
			);
		}

		row.append(cell1, cell2, cell3, cell4, cell5, cell6);
		rowArray.push(row);
		table.append(rowArray[key]);
	}

	document.getElementById("wishlistTable").style.display = "table";
	document.getElementById("wishlistDataTable").style.display = "table";
}

function initForm() {
	document
		.getElementById("form-display")
		.addEventListener("submit", async function (event) {
			event.preventDefault();
			const formData = new FormData(document.getElementById("form-display"));
			let steamIdOrVanityUrl = formData.get("steamIdOrVanityUrl");

			if (steamIdOrVanityUrl !== "") {
				if (steamIdOrVanityUrl.indexOf("id/") !== -1) {
					steamIdOrVanityUrl = steamIdOrVanityUrl.split("id/")[1].split("/")[0];
				} else if (steamIdOrVanityUrl.indexOf("profiles/") !== -1) {
					steamIdOrVanityUrl = steamIdOrVanityUrl
						.split("profiles/")[1]
						.split("/")[0];
				}
			}

			let countryCode = await getCountryCode();
			getWishlist(steamIdOrVanityUrl, countryCode);
		});
}

window.addEventListener("DOMContentLoaded", function () {
	initForm();
});

function lineBreak() {
	let filterDropDown = document.getElementById("FilterLineBreak");
	filterDropDown.addEventListener("click", function () {
		let filterDPContent = document.getElementById("content");
		if (filterDPContent.style.maxHeight) {
			filterDPContent.style.maxHeight = null;
		} else {
			filterDPContent.style.maxHeight = filterDPContent.scrollHeight + "px";
		}
	});
}

function currencyDropdown() {
	let currencyDropdown = document.getElementById("selectItems");

	$("#selectList").change(function () {
		//Mobile
		if (resultsLoaded == true) {
			let opt = document.getElementById("selectList").value;
			document.getElementById("selectSelected").setAttribute("value", opt);
			toggle = false;
			currencyChange(opt);
			callCancelFetch();
		}
	});

	currencyDropdown.addEventListener("click", function () {
		//Desktop
		//If the currency dropdown gets changed then recalculate the wishlist in the selected currency.
		if (resultsLoaded == true) {
			toggle = false;
			let opt = document.getElementById("selectList").value;
			document.getElementById("selectSelected").setAttribute("value", opt);
			currencyChange(opt);
			callCancelFetch();
		}
	});
}

function modal() {
	let modal = document.getElementById("modal");
	let modalButton = document.getElementById("showModal");
	let span = document.getElementsByClassName("close")[0];

	modalButton.onclick = function () {
		modal.style.display = "block";
		document.getElementsByTagName("body")[0].style.overflow = "hidden";
		document.getElementById("footer").style.zIndex = "0";
		document.getElementById("header").style.zIndex = "1";
	};

	span.onclick = function () {
		callCancelFetch();
		modal.style.display = "none";
		document.getElementsByTagName("body")[0].style.overflow = "auto";
		document.getElementById("footer").style.zIndex = "2";
		document.getElementById("header").style.zIndex = "2";
	};
}

function initialPageLoad() {
	//If the hash is NOT equal to #privacy-policy or #faq then check if it has URL paremeters.
	let urlParams = window.location.href; //Assign the URL to "urlParams".
	let urlParamsCheck = urlParams.indexOf("?id" || "&currency"); //Check whether the URL contains "&currency" or "?id".

	if (urlParamsCheck !== -1) {
		//If the URL contains a "&currency" or "?id" then we get the id and currency from the URL Params.
		const steamIdOrVanityUrl = getAllUrlParams(urlParams).id;
		let countryCode = getAllUrlParams(urlParams).currency;
		countryCodeCheck = countryCodesList.includes(countryCode);
		if (countryCode !== undefined && countryCodeCheck !== false) {
			callSwitch(countryCode);
		} else {
			alert("Error: Unable to detect currency. Defaulted to USD.");
			countryCode = "US";
		}
		getWishlist(steamIdOrVanityUrl, countryCode);
	} else {
		switch (location.hash) {
			case "#faq":
				faq();
				break;
			case "#privacy-policy":
				privacypolicy();
				break;
			case "#partners":
				partners();
				break;
			default:
				formReset();
		}
	}
}

async function getCountryCode() {
	let countryCode = "";
	let response = "";
	let switchResponse = [];
	let urlParams = window.location.href; //Assign the URL to "urlParams".
	let urlParamsCheck = urlParams.indexOf("&currency");
	if (urlParamsCheck !== -1) {
		//If the URL contains "&currency" then we get the currency from the URL.
		countryCode = getAllUrlParams(urlParams).currency; //Assign the currency from the URL to a global variable.
	} else {
		countryCode = document
			.getElementById("selectSelected")
			.getAttribute("value");
	}
	countryCodeCheck = countryCodesList.includes(countryCode);
	if (
		countryCode === "AutoDetect" ||
		(countryCode === "autodetect" && countryCodeCheck !== false)
	) {
		response = await fetch("/ip2Country");
		response = await response.text();
		switchResponse = callSwitch(response);
		countryCode = switchResponse.countryCode;
	} else {
		countryCode = callSwitch(countryCode);
		countryCode = countryCode.countryCode;
	}
	return countryCode;
}

function callSwitch(setVariables) {
	//Sets the currency for the calculator and the currency dropdown.
	var optList = document.getElementById("selectItems").childNodes;

	let countryCode = "";
	let currencySymbol = "";
	let currencySymbolCheck = ""; //Sets the symbol to look for when looking for the symbol through the prices.
	let currencySymbolRight = " "; //Adds a space for the right currency symbol.
	let currencySymbolNumber = ""; //Sets the amount of characters that are before the Currency Symbol. Example for the Canadian Currency: "CDN$ = 3" So there are 3 characters before the Currency Symbol: $.
	let currencyBoolean = false;

	for (let i = 0; i < optList.length; i++) {
		$(optList).removeClass("sameAsSelected");
	}

	switch (
		setVariables //Check what the user selected and set the variables to the corresponding values.
	) {
		case "AR":
			countryCode = "AR";
			currencySymbol = "$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "1";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode); //Sets the selection for the currency dropdown.
			document.getElementById("selectSelected").innerHTML =
				"Argentinian Peso (ARS)";
			optList[1].setAttribute("class", "sameAsSelected");
			break;
		case "AU":
			countryCode = "AU";
			currencySymbol = "A$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "2";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Australian Dollar (AUD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[2].setAttribute("class", "sameAsSelected");
			break;
		case "AZ":
			countryCode = "AZ";
			currencySymbol = "$";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "3";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Azerbaijani (AZN - CIS)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[3].setAttribute("class", "sameAsSelected");
			break;
		case "BR":
			countryCode = "BR";
			currencySymbol = "R$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "4";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Brazilian Reais (BRL)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[4].setAttribute("class", "sameAsSelected");
			break;
		case "GB":
			countryCode = "GB";
			currencySymbol = "£";
			currencySymbolCheck = "£";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "5";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"British Pound (GBP)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[5].setAttribute("class", "sameAsSelected");
			break;
		case "CA":
			countryCode = "CA";
			currencySymbol = "C$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "6";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Canadian Dollar (CAD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[6].setAttribute("class", "sameAsSelected");
			break;
		case "CR":
			countryCode = "CR";
			currencySymbol = "₡";
			currencySymbolCheck = "₡";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "7";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Costa Rican Colón (CRC)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[7].setAttribute("class", "sameAsSelected");
			break;
		case "IN":
			countryCode = "IN";
			currencySymbol = "₹ ";
			currencySymbolCheck = "₹";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "8";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Indian Rupee (INR)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[8].setAttribute("class", "sameAsSelected");
			break;
		case "ID":
			countryCode = "ID";
			currencySymbol = "Rp ";
			currencySymbolCheck = "p";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "9";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Indonesian Rupiah (IDR)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[9].setAttribute("class", "sameAsSelected");
			break;
		case "IL":
			countryCode = "IL";
			currencySymbol = "₪";
			currencySymbolCheck = "₪";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "10";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Israeli New Shekel (ILS)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[10].setAttribute("class", "sameAsSelected");
			break;
		case "JP":
			countryCode = "JP";
			currencySymbol = "¥ ";
			currencySymbolCheck = "¥";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "11";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Japanese Yen (JPY)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[11].setAttribute("class", "sameAsSelected");
			break;
		case "KZ":
			countryCode = "KZ";
			currencySymbol = "";
			currencySymbolRight = "₸";
			currencySymbolCheck = "₸";
			currencyBoolean = true;
			document.getElementById("selectList").selectedIndex = "12";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Kazakhstani Tenge (KZT)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[12].setAttribute("class", "sameAsSelected");
			break;
		case "KW":
			countryCode = "KW";
			currencySymbol = "";
			currencySymbolRight = " KD";
			currencySymbolCheck = "KD";
			currencyBoolean = true;
			document.getElementById("selectList").selectedIndex = "13";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Kuwaiti Dinar (KWD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[13].setAttribute("class", "sameAsSelected");
			break;
		case "MX":
			countryCode = "MX";
			currencySymbol = "Mex$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "3";
			document.getElementById("selectList").selectedIndex = "14";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Mexican Peso (MXN)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[14].setAttribute("class", "sameAsSelected");
			break;
		case "AT":
		case "BE":
		case "DE":
		case "EE":
		case "EU":
		case "FI":
		case "FR":
		case "GR":
		case "IE":
		case "IT":
		case "LI":
		case "LU":
		case "LV":
		case "NL":
		case "PT":
		case "SI":
		case "SK":
		case "SP":
			countryCode = "NL";
			currencySymbol = "";
			currencySymbolRight = "€";
			currencyBoolean = true;
			currencySymbolCheck = "€";
			document.getElementById("selectList").selectedIndex = "15";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Europe (EUR)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[15].setAttribute("class", "sameAsSelected");
			break;
		case "NZ":
			countryCode = "NZ";
			currencySymbol = "NZ$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "2";
			document.getElementById("selectList").selectedIndex = "16";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"New Zealand Dollar (NZD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[16].setAttribute("class", "sameAsSelected");
			break;
		case "NO":
			countryCode = "NO";
			currencySymbol = "";
			currencySymbolRight = " kr";
			currencySymbolCheck = "kr";
			currencyBoolean = true;
			document.getElementById("selectList").selectedIndex = "17";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Norwegian Krone (NOK)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[17].setAttribute("class", "sameAsSelected");
			break;
		case "PH":
			countryCode = "PH";
			currencySymbol = "₱";
			currencySymbolCheck = "₱";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "18";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Philippine Peso (PHP)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[18].setAttribute("class", "sameAsSelected");
			break;
		case "PL":
			countryCode = "PL";
			currencySymbol = "";
			currencySymbolRight = "zł";
			currencyBoolean = true;
			currencySymbolCheck = "zł";
			document.getElementById("selectList").selectedIndex = "19";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Polish Zloty (PLN)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[19].setAttribute("class", "sameAsSelected");
			break;
		case "QA":
			countryCode = "QA";
			currencySymbol = "";
			currencySymbolRight = " QR";
			currencyBoolean = true;
			currencySymbolCheck = "QR";
			document.getElementById("selectList").selectedIndex = "20";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Qatari Rial (QAR)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[20].setAttribute("class", "sameAsSelected");
			break;
		case "RU":
			countryCode = "RU";
			currencySymbol = "";
			currencySymbolRight = " pуб";
			currencyBoolean = true;
			currencySymbolCheck = "pуб";
			document.getElementById("selectList").selectedIndex = "21";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Russian Rubles (RUB)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[21].setAttribute("class", "sameAsSelected");
			break;
		case "SG":
			countryCode = "SG";
			currencySymbol = "S$";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "22";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Singapore Dollar (SGD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[22].setAttribute("class", "sameAsSelected");
			break;
		case "TH":
			countryCode = "TH";
			currencySymbol = "฿";
			currencySymbolCheck = "฿";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "23";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Thai Baht (THB)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[23].setAttribute("class", "sameAsSelected");
			break;
		case "TR":
			countryCode = "TR";
			currencySymbol = "";
			currencySymbolRight = " TL";
			currencyBoolean = true;
			currencySymbolCheck = "TL";
			document.getElementById("selectList").selectedIndex = "24";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Turkish Lira (TRY)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[24].setAttribute("class", "sameAsSelected");
			break;
		case "UA":
			countryCode = "UA";
			currencySymbol = "";
			currencySymbolRight = "₴";
			currencyBoolean = true;
			currencySymbolCheck = "₴";
			document.getElementById("selectList").selectedIndex = "25";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Ukrainian Hryvnia (UAH)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[25].setAttribute("class", "sameAsSelected");
			break;
		case "US":
			countryCode = "US";
			currencySymbol = "$";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "26";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"United States Dollar (USD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[26].setAttribute("class", "sameAsSelected");
			break;
		case "VN":
			countryCode = "VN";
			currencySymbol = "";
			currencySymbolRight = "₫";
			currencySymbolCheck = "₫";
			currencyBoolean = true;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "27";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"Vietnamese Dong (VND)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[27].setAttribute("class", "sameAsSelected");
			break;
		default:
			countryCode = "US";

			cc = "US";
			currencySymbol = "$";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencyBoolean = false;
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "26";
			document
				.getElementById("selectSelected")
				.setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML =
				"United States Dollar (USD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[26].setAttribute("class", "sameAsSelected");
			alert("Error: Unable to detect currency. Defaulted to USD.");
			break;
	}
	return {
		countryCode: countryCode,
		currencySymbol: currencySymbol,
		currencySymbolCheck: currencySymbolCheck,
		currencySymbolRight: currencySymbolRight,
		currencySymbolNumber: currencySymbolNumber,
		currencyBoolean: currencyBoolean,
	};
}

async function currencyChange(countryCode) {
	const formData = new FormData(document.getElementById("form-display"));
	let steamIdOrVanityUrl = formData.get("steamIdOrVanityUrl");
	if (steamIdOrVanityUrl == "") {
		let urlParams = window.location.href; //Assign the URL to "urlParams".
		let urlParamsCheck = urlParams.indexOf("?id"); //Check whether the URL contains "?id".
		if (urlParamsCheck !== -1) {
			//If the URL contains a "&currency" or "?id" then we get the id and currency from the URL Params.
			steamIdOrVanityUrl = getAllUrlParams(urlParams).id;
		}
	}
	if (countryCode === null) {
		countryCode = await getCountryCode();
	}
	getWishlist(steamIdOrVanityUrl, countryCode);
	closeNav();
}

function tabSwitch() {
	switch (tab) {
		case 7:
			free();
			break;
		case 6:
			preOrder();
			break;
		case 5:
			onWishlist();
			break;
		case 4:
			hasPrice();
			break;
		case 3:
			withoutPrice();
			break;
		case 2:
			appidList();
			break;
		case 1:
			Sale();
			break;
	}
}

function ToggleSalePricing() {

	if (toggle == false) {
		toggle = true;
		document.getElementById("priceTotal").innerHTML = formattedCurrentPrice;
		document.getElementById("salePricingButton").innerHTML =
			"Turn Sale Pricing Off";
		generateTableStructure(toggle);
	} else {
		toggle = false;
		document.getElementById("priceTotal").innerHTML =
			originalFormattedPriceTotal;
		document.getElementById("salePricingButton").innerHTML =
			"Turn Sale Pricing On";
		generateTableStructure(toggle);
	}
}

/*
function sortBy() { //Broken
	let sortValue = document.getElementById("sort").value;
	switch (sortValue) {
		case "priority":
			steamData.sort(sort_by_exported("priority", false, parseInt));
			break;
		case "price":
			steamData.sort(sort_by_exported("price", false));
			break;
		case "title":
			steamData.sort(
				sort_by_exported("title", false, function (a) {
					return a;
				})
			);
	}
}
*/

function priceToFloat(currencyString, countryCode) {
	switch (countryCode) {
		case "AR":
		case "JP":
			if (currencyString !== undefined) {
				currencyString = currencyString.replace(",", "");
			}
			break;
		case "BR":
			if (currencyString !== undefined) {
				currencyString = currencyString.replace(",", ".");
			}
			break;
		case "DE":
		case "EU":
		case "FI":
		case "FR":
		case "IT":
		case "LV":
		case "NL":
		case "NO":
		case "PL":
		case "PT":
		case "SK":
			currencyString = currencyString.replace(".", "").replace(",", ".");
			break;
		case "PH":
		case "IN":
		case "TH":
			currencyString = currencyString.replace(",", "");
			break;
		case "ID":
		case "KZ":
		case "UA":
			currencyString = currencyString.replace(/ /g, "");
			break;
		default:
			//Do nothing. Just somewhere to default to.
			break;
	}
	return parseFloat(currencyString);
}

function createHyperLinks() {
	//Reset the variables.
	let titles = "";
	let url = "";
	let preOrderUrl = "";
	let freeUrl = "";
	let appidWithoutTitles = "";
	let withPriceUrl = "";
	let priceEmptyUrl = "";
	let onSaleUrl = "";
	for (data of steamData) {
		//Generating a hyperlinks for each game in the wishlists by looping over both the appidArray and the titleArray.
		titles +=
			'<a href="http://store.steampowered.com/app/' +
			data.appid +
			'/" class="titleLinks" title="' +
			data.name +
			'" target="_blank">' +
			data.name +
			"</a>" +
			seperator;
		appidWithoutTitles +=
			'<a href="http://store.steampowered.com/app/' +
			data.appid +
			'/" class="titleLinks" title="' +
			data.appid +
			'" target="_blank">' +
			data.appid +
			"</a>" +
			seperator;
		url =
			'<a href="http://store.steampowered.com/app/' +
			data.appid +
			'/" class="titleLinks" title="' +
			data.name +
			'" target="_blank">' +
			data.name +
			"</a>";
		if (data.bestPurchaseOption?.formattedFinalPrice !== undefined) {
			withPriceUrl += url + seperator;
		}
		if (data.bestPurchaseOption?.activeDiscounts !== undefined) {
			onSaleUrl += url + seperator;
		}
		if (data.bestPurchaseOption?.formattedFinalPrice === undefined) {
			priceEmptyUrl += url + seperator;
		}
		if (data.isFree === true) {
			freeUrl += url + seperator;
		}
		if (
			data.bestPurchaseOption?.formattedFinalPrice !== undefined &&
			(data.release.isComingSoon === true) == true
		) {
			preOrderUrl += url + seperator;
		}
	}
	return {
		titles: titles.slice(0, -9),
		freeUrl: freeUrl.slice(0, -9),
		preOrderUrl: preOrderUrl.slice(0, -9),
		onSaleUrl: onSaleUrl.slice(0, -9),
		withPriceUrl: withPriceUrl.slice(0, -9),
		priceEmptyUrl: priceEmptyUrl.slice(0, -9),
		appidWithoutTitles: appidWithoutTitles.slice(0, -9),
	};
}

function onResize() {
	//Places the currency dropdown either in the hamburger menu or in the header depending on the screen resolution.
	if ($(window).width() <= 1050) {
		$(".customSelect").appendTo("#select");
		$(".selectSelected").css("display", "none");
		$("#customSelect").css("width", "auto");
		$("#customSelect").removeClass("customSelect");
	} else {
		$(".customSelect").appendTo("#currencyDropdown");
		$("#customSelect").css("width", "250");
		$(".selectSelected").css("display", "block");
		$("#customSelect").addClass("customSelect");
	}
	window.addEventListener("resize", onResize);
}

function formatNumber(numOne) {
	return numOne.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function setProgressBarWidth(progessPercentage) {
	//Sets the width of the loading bar to move dynamically.
	document.getElementById("bar").style.width = progessPercentage + "%";
}

function cancel() {
	location.href = "https://www.steamwishlistcalculator.com/";
}

function styleSetDataContainer() {
	$("#loader").fadeOut(500);
	$("#result-box").fadeIn(500);
	document.getElementById("loader").style.display = "none";
	document.getElementById("result-box").style.display = "Block";
	document.getElementById("container-results").style.display = "flex";
	document.getElementById("profileName").style.display = "block";
	document.getElementById("wishlist-container").style.width = "auto";
	document.getElementById("resetButtonError").style.display = "none";
	document.getElementById("wishlist-container").style.textAlign = "left";
	document.getElementById("successMsg").style.display = "none";
	document.getElementById("bar").style.width = "0%";
	document.getElementById("errorBox").style.display = "none";
	pageLoadComplete = true; //Sets the page load to true, e.g page has finished loading.
	resultsLoaded = true;
}

function displayLoader() {
	//Displays the loader.
	document.getElementById("wishlist-container").style.width = "100%";
	$("#form-display").fadeOut(500);
	$("#result-box").fadeOut(500);
	$("#loader").fadeIn(500);
	document.getElementById("form-display").style.display = "none";
	document.getElementById("result-box").style.display = "none";
	document.getElementById("loader").style.display = "block";
	document.getElementById("wishlist-container").style.maxWidth = "none";
	document.getElementById("bar").style.width = "100%";
}

function changeStyles() {
	//This contains all the styles that are changed in several functions. We use this as a default function to be called in other functions so we do not end up with duplicates. Shortens the code and makes it cleaner.
	pageLoadComplete = true;
	resultsLoaded = false;
	window.history.pushState(
		"object or string",
		"Title",
		"/" +
			window.location.href
				.substring(window.location.href.lastIndexOf("/") + 1)
				.split("?")[0]
	); //Clear the parameters and reset the URL.
	document.getElementById("loader").style.display = "none";
	document.getElementById("privacyPolicy").style.display = "none";
	document.getElementById("partners").style.display = "none";
	document.getElementById("faq").style.display = "none";
	document.getElementById("form-display").reset();
	document.getElementById("wishlist-inner-container").style.paddingBottom =
		"16px";
	document.getElementById("result-box").style.display = "none";
	document.getElementById("wishlist-container").style.paddingBottom = "1em";
	document.getElementById("wishlist-container").style.paddingTop = "1em";
	document.getElementById("container-results").style.display = "none";
	document.getElementById("FilterLineBreak").style.display = "block";
	document.getElementById("wishlist-container").style.textAlign = "left";
	document.getElementById("wishlist-container").style.width = "500px";
	document.getElementById("form-display").style.display = "none";
	document.getElementById("profileName").style.display = "none";
}

function formReset() {
	//Clears the main form!
	toggle = false;
	if (pageLoadComplete == true) {
		//Checks if the page is loading or not.
		changeStyles();
		$("#form-display").fadeIn(500);
		$("#result-box").fadeOut(500);
		document.getElementById("form-display").style.display = "block";
		document.getElementById("result-box").style.display = "none";
		history.pushState(
			"",
			document.title,
			window.location.pathname + window.location.search
		); //Clear the Anchor Hash from the url.
		document.title = "Steam Wishlist Calculator"; //changes the title.
		document.getElementById("wishlist-container").style.textAlign = "center";
		document.getElementById("wishlist-container").style.width = "100%";
		document.getElementById("wishlist-container").style.maxWidth = "100%";
	} else {
		location.href = "https://www.steamwishlistcalculator.com/";
	}
}

function throwError(error) {
	//This contains the styling to create the error container. If we ecounter an error then call this function.
	changeStyles();
	resultsLoaded = false;
	$("#loader").fadeOut(500);
	$("#result-box").fadeIn(500);
	document.getElementById("FilterLineBreak").style.display = "none";
	document.getElementById("result-box").style.display = "block";
	document.getElementById("loader").style.display = "none";
	document.getElementById("resetButtonError").style.display = "block";
	document.getElementById("errorBox").style.display = "block";
	document.getElementById("errorText").style.display = "block";
	document.getElementById("successMsg").style.display = "none";
	document.getElementById("wishlistTable").style.display = "none";
	document.getElementById("wishlistDataTable").style.display = "none";
	document.getElementById("wishlist-container").style.width = "600px";
	document
		.getElementById("container-results")
		.style.setProperty("display", "none", "important");

	document.getElementById("errorText").innerHTML = error;
}

function privacypolicy() {
	//Displays the privacy policy container!
	if (pageLoadComplete == true) {
		//Checks if the page is loading or not.
		changeStyles();
		$("#result-box").fadeOut(500);
		$("#privacyPolicy").fadeIn(500);
		document.getElementById("result-box").style.display = "none";
		document.getElementById("privacyPolicy").style.display = "block";
		document.getElementById("wishlist-container").style.width = "initial";
		location.hash = "privacy-policy"; //Sets a hash for the privacy policy page!
		document.title = "Steam Wishlist Calculator - Privacy Policy"; //Changes the title for the privacy policy page!
	} else {
		location.href = "#privacy-policy";
		location.reload();
	}
}

function faq() {
	//Displays the FAQ container!
	if (pageLoadComplete == true) {
		//Checks if the page is loading or not.
		changeStyles();
		$("#result-box").fadeOut(500);
		$("#faq").fadeIn(500);
		document.getElementById("result-box").style.display = "none";
		document.getElementById("faq").style.display = "block";
		document.getElementById("wishlist-container").style.width = "initial";
		location.hash = "faq"; //Sets a hash for the FAQ page!
		document.title = "Steam Wishlist Calculator - FAQ"; //Changes the title for the FAQ page!
	} else {
		location.href = "#faq";
		location.reload();
	}
}

function partners() {
	if (pageLoadComplete == true) {
		//Checks if the page is loading or not.
		changeStyles();
		$("#result-box").fadeOut(500);
		$("#partners").fadeIn(500);
		document.getElementById("result-box").style.display = "none";
		document.getElementById("partners").style.display = "block";
		document.getElementById("wishlist-container").style.width = "initial";
		location.hash = "partners";
		document.title = "Steam Wishlist Calculator - Partners";
	} else {
		location.href = "#partners";
		location.reload();
	}
}

function openNav() {
	//This controls the side navigation panel for mobile.
	$("#sideNavBG").fadeIn(500);
	document.getElementById("mySidenav").style.right = "0";
	document.getElementById("mySidenav").style["boxShadow"] =
		"0px 1px 10px 0px black"; //Shows a shadow when the navigation panel is opened.
}

function closeNav() {
	//This controls the side navigation panel for mobile.
	$("#sideNavBG").fadeOut(500);
	document.getElementById("mySidenav").style.right = "-250px";
	document.getElementById("mySidenav").style["boxShadow"] = "none";
}

window.onclick = function (event) {
	//Allows the user to click outside the navigation panel to close it.
	if (event.target == document.getElementById("sideNavBG")) {
		closeNav();
	}
};

window.onmousedown = function (event) {
	if (event.target == modal) {
		callCancelFetch();
		modal.style.display = "none";
		document.getElementsByTagName("body")[0].style.overflow = "auto";
	}
};

//Display the results in the dropdown.
let tab = 0;
let cancelFetch = false;

function preOrder() {
	tab = 6;
	if (getHyperLinks.preOrderUrl !== "") {
		document.getElementById("titles").innerHTML = getHyperLinks.preOrderUrl;
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - Pre Order";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	} else {
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - Pre Order";
		document.getElementById("titles").innerHTML =
			"There are no games for Pre Order on your wishlist.";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	}
}

function Sale() {
	tab = 1;
	if (getHyperLinks.onSaleUrl !== "") {
		document.getElementById("titles").innerHTML = getHyperLinks.onSaleUrl;
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - On Sale";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	} else {
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - On Sale";
		document.getElementById("titles").innerHTML =
			"There are no games on sale on your wishlist.";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	}
}

function appidList() {
	tab = 2;
	if (getHyperLinks.appidWithoutTitles !== "") {
		document.getElementById("titles").innerHTML =
			getHyperLinks.appidWithoutTitles;
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - Appids";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	} else {
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - Appids";
		document.getElementById("titles").innerHTML = "Wishlist is empty.";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	}
}

function withoutPrice() {
	tab = 3;
	if (getHyperLinks.priceEmptyUrl !== "") {
		document.getElementById("titles").innerHTML = getHyperLinks.priceEmptyUrl;
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - Without Price";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	} else {
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - Without Price";
		document.getElementById("titles").innerHTML =
			"There are no games without prices on your wishlist.";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	}
}

function hasPrice() {
	tab = 4;
	if (getHyperLinks.withPriceUrl !== "") {
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - With Price";
		document.getElementById("titles").innerHTML = getHyperLinks.withPriceUrl;
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	} else {
		document.getElementById("exportTitle").innerHTML =
			"Wishlist Items - With Price";
		document.getElementById("titles").innerHTML =
			"There are no titles with prices on your wishlist.";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	}
}

function onWishlist() {
	tab = 5;
	if (getHyperLinks.titles !== "") {
		document.getElementById("exportTitle").innerHTML = "Wishlist Items";
		document.getElementById("titles").innerHTML = getHyperLinks.titles;
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	} else {
		document.getElementById("exportTitle").innerHTML = "Wishlist Items";
		document.getElementById("titles").innerHTML = "Wishlist is empty.";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	}
}

function free() {
	tab = 7;
	if (getHyperLinks.freeUrl !== "") {
		document.getElementById("titles").innerHTML = getHyperLinks.freeUrl;
		document.getElementById("exportTitle").innerHTML = "Wishlist Items - Free";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	} else {
		document.getElementById("exportTitle").innerHTML = "Wishlist Items - Free";
		document.getElementById("titles").innerHTML =
			"There are no free games on your wishlist.";
		document.getElementById("sort").disabled = false;
		cancelFetch = false;
	}
}

let counterCancel = false;

function callCancelFetch() {
	if (counterCancel == true) {
		cancelFetch = true;
	}
	counterCancel = true;
}

function copy() {
	let element = document.getElementById("titles");
	let $text = $("<input>");
	$("body").append($text);
	$text.val($(element).text()).select();
	document.execCommand("copy");
	$text.remove();
	document.getElementById("myTooltip").style.visibility = "visible";
	setTimeout(function () {
		$("#myTooltip").css("visibility", "hidden");
	}, 1000);
}

let isTitleSorted = false;
let isReleaseDateSorted = false;
let isAppidSorted = false;
let isOnSaleSorted = false;
let isPreOrderSorted = false;
let isPriceSorted = false;

//Flags

let isTitleSortedFlag = false;
let isReleaseDateSortedFlag = false;
let isAppidSortedFlag = false;
let isOnSaleSortedFlag = false;
let isPreOrderSortedFlag = false;
let isPriceSortedFlag = false;

function headerSort(key) {
	let arrow = "";
	switch (key) {
		case 0:
			if (!isTitleSorted) {
				steamData.sort(function (a, b) {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
				isReleaseDateSorted = false;
				isTitleSorted = true;
				isTitleSortedFlag = true;
			}
			if (isTitleSortedFlag == true) {
				steamData.reverse();
				if (document.getElementsByClassName("arrow")[5] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[0];
					arrow.classList.remove("up");
					arrow.classList.add("down");
					arrow = document.getElementsByClassName("arrow")[5];
				} else {
					arrow = document.getElementsByClassName("arrow")[0];
				}
				arrow.classList.remove("up");
				arrow.classList.add("down");
				isTitleSortedFlag == false;
			} else {
				steamData.reverse();
				if (document.getElementsByClassName("arrow")[5] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[0];
					arrow.classList.remove("down");
					arrow.classList.add("up");
					arrow = document.getElementsByClassName("arrow")[5];
				} else {
					arrow = document.getElementsByClassName("arrow")[0];
				}
				arrow.classList.remove("down");
				arrow.classList.add("up");
			}
			break;
		case 1:
			if (!isReleaseDateSorted) {
				steamData.sort(function (a, b) {
					if (
						a.release?.isComingSoon !== undefined ||
						b.release?.isComingSoon !== undefined ||
						a.release?.steamReleaseDate == undefined ||
						b.release?.steamReleaseDate == undefined
					) {
						return -1;
					} else if (
						a.release?.steamReleaseDate > b.release?.steamReleaseDate
					) {
						return 1;
					}
					return 0;
				});
				isReleaseDateSorted = true;
				isTitleSorted = false;
				isReleaseDateSortedFlag = true;
			}

			if (isReleaseDateSortedFlag == true) {
				steamData.reverse();
				if (document.getElementsByClassName("arrow")[6] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[1];
					arrow.classList.remove("up");
					arrow.classList.add("down");
					arrow = document.getElementsByClassName("arrow")[6];
				} else {
					arrow = document.getElementsByClassName("arrow")[1];
				}
				arrow.classList.remove("up");
				arrow.classList.add("down");

				isReleaseDateSortedFlag = false;
			} else {
				steamData.reverse();
				if (document.getElementsByClassName("arrow")[6] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[1];
					arrow.classList.remove("down");
					arrow.classList.add("up");
					arrow = document.getElementsByClassName("arrow")[6];
				} else {
					arrow = document.getElementsByClassName("arrow")[1];
				}
				arrow.classList.remove("down");
				arrow.classList.add("up");
			}

			break;
		case 2:
			steamData.sort((a, b) => a.appid - b.appid);
			isAppidSorted = !isAppidSorted;
			if (isAppidSorted) {
				if (document.getElementsByClassName("arrow")[7] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[2];
					arrow.classList.remove("up");
					arrow.classList.add("down");
					arrow = document.getElementsByClassName("arrow")[7];
				} else {
					arrow = document.getElementsByClassName("arrow")[2];
				}
				arrow.classList.remove("up");
				arrow.classList.add("down");
			} else {
				steamData.reverse();
				if (document.getElementsByClassName("arrow")[7] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[2];
					arrow.classList.remove("down");
					arrow.classList.add("up");
					arrow = document.getElementsByClassName("arrow")[7];
				} else {
					arrow = document.getElementsByClassName("arrow")[2];
				}
				arrow.classList.remove("down");
				arrow.classList.add("up");
			}
			break;
		case 3:
			steamData.sort(function (a, b) {
				const NO_SALE = "No";
				if (a.discountPercentUnformatted === NO_SALE) return 1;
				if (b.discountPercentUnformatted === NO_SALE) return 0;
				return b.discountPercentUnformatted - a.discountPercentUnformatted;
			});
			isOnSaleSorted = !isOnSaleSorted;
			if (isOnSaleSorted) {
				if (document.getElementsByClassName("arrow")[8] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[3];
					arrow.classList.remove("up");
					arrow.classList.add("down");
					arrow = document.getElementsByClassName("arrow")[8];
				} else {
					arrow = document.getElementsByClassName("arrow")[3];
				}
				arrow.classList.remove("up");
				arrow.classList.add("down");
			} else {
				steamData.reverse();
				if (document.getElementsByClassName("arrow")[8] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[3];
					arrow.classList.remove("down");
					arrow.classList.add("up");
					arrow = document.getElementsByClassName("arrow")[8];
				} else {
					arrow = document.getElementsByClassName("arrow")[3];
				}
				arrow.classList.remove("down");
				arrow.classList.add("up");
			}
			break;
		case 4:
			steamData.sort((a, b) => b.preOrderBoolean - a.preOrderBoolean);
			isPreOrderSorted = !isPreOrderSorted;
			if (isPreOrderSorted) {
				if (document.getElementsByClassName("arrow")[9] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[4];
					arrow.classList.remove("up");
					arrow.classList.add("down");
					arrow = document.getElementsByClassName("arrow")[9];
				} else {
					arrow = document.getElementsByClassName("arrow")[4];
				}
				arrow.classList.remove("up");
				arrow.classList.add("down");
			} else {
				steamData.reverse();
				if (document.getElementsByClassName("arrow")[9] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[4];
					arrow.classList.remove("down");
					arrow.classList.add("up");
					arrow = document.getElementsByClassName("arrow")[9];
				} else {
					arrow = document.getElementsByClassName("arrow")[4];
				}
				arrow.classList.remove("down");
				arrow.classList.add("up");
			}
			break;
		case 5:
			steamData.sort(function (a, b) {
				//Broken. All Free Objects must be moved to the top, All N/A Objects must be placed on the bottom and then the price must be sorted accurately. steamData[#].free = True = free. steamData[#].free = False = N/A.
				const FREE = "false";
				if (a.free === FREE) return 0;
				if (b.free === FREE) return 1;
				return Number(a.priceUnformatted) - Number(b.priceUnformatted);
			});
			isPriceSorted = !isPriceSorted;
			if (isPriceSorted) {
				if (document.getElementsByClassName("arrow")[10] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[5];
					arrow.classList.remove("up");
					arrow.classList.add("down");
					arrow = document.getElementsByClassName("arrow")[10];
				} else {
					arrow = document.getElementsByClassName("arrow")[5];
				}
				arrow.classList.remove("up");
				arrow.classList.add("down");
			} else {
				steamData.reverse();
				if (document.getElementsByClassName("arrow")[10] !== undefined) {
					arrow = document.getElementsByClassName("arrow")[5];
					arrow.classList.remove("down");
					arrow.classList.add("up");
					arrow = document.getElementsByClassName("arrow")[10];
				} else {
					arrow = document.getElementsByClassName("arrow")[5];
				}
				arrow.classList.remove("down");
				arrow.classList.add("up");
			}
			break;
	}
	generateTableStructure();
}
