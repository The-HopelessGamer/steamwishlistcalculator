function callSwitch(setVariables) { //Sets the currency for the calculator and the currency dropdown.
	var optList = document.getElementById("selectItems").childNodes;

	for (let i = 0; i < optList.length; i++) {
	  $(optList).removeClass("sameAsSelected");
	}

	switch (setVariables) { //Check what the user selected and set the variables to the corresponding values.
		case "AR":
			countryCode = "AR";
			currencySymbol = "ARS$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "3";
			document.getElementById("selectList").selectedIndex = "1";
			document.getElementById("selectSelected").setAttribute("value", countryCode); //Sets the selection for the currency dropdown.
			document.getElementById("selectSelected").innerHTML = "Argentinian Peso (ARS)";
			optList[1].setAttribute("class", "sameAsSelected");
			break;
		case "AU":
			countryCode = "AU";
			currencySymbol = "A$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "2";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Australian Dollar (AUD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[2].setAttribute("class", "sameAsSelected");
			break;
		case "AZ":
			countryCode = "AZ";
			currencySymbol = "$";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "3";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Azerbaijani (AZN - CIS)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[3].setAttribute("class", "sameAsSelected");
			break;
		case "BR":
			countryCode = "BR";
			currencySymbol = "R$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "4";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Brazilian Reais (BRL)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[4].setAttribute("class", "sameAsSelected");
			break;
		case "GB":
			countryCode = "GB";
			currencySymbol = "£";
			currencySymbolCheck = "£";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "5";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "British Pound (GBP)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[5].setAttribute("class", "sameAsSelected");
			break;
		case "CA":
			countryCode = "CA";
			currencySymbol = "C$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "6";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Canadian Dollar (CAD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[6].setAttribute("class", "sameAsSelected");
			break;
		case "CR":
			countryCode = "CR";
			currencySymbol = "₡";
			currencySymbolCheck = "₡";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "7";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Costa Rican Colón (CRC)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[7].setAttribute("class", "sameAsSelected");
			break;
		case "IN":
			countryCode = "IN";
			currencySymbol = "₹ ";
			currencySymbolCheck = "₹";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "8";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Indian Rupee (INR)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[8].setAttribute("class", "sameAsSelected");
			break;
		case "ID":
			countryCode = "ID";
			currencySymbol = "Rp ";
			currencySymbolCheck = "p";
			currencySymbolRight = "";
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "9";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Indonesian Rupiah (IDR)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[9].setAttribute("class", "sameAsSelected");
			break;
		case "IL":
			countryCode = "IL";
			currencySymbol = "₪";
			currencySymbolCheck = "₪";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "10";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Israeli New Shekel (ILS)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[10].setAttribute("class", "sameAsSelected");
			break;
		case "JP":
			countryCode = "JP";
			currencySymbol = "¥ ";
			currencySymbolCheck = "¥";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "1`";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Japanese Yen (JPY)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[11].setAttribute("class", "sameAsSelected");
			break;
		case "KZ":
			countryCode = "KZ";
			currencySymbol = "";
			currencySymbolRight = "₸";
			currencySymbolCheck = "₸";
			document.getElementById("selectList").selectedIndex = "11";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Kazakhstani Tenge (KZT)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[12].setAttribute("class", "sameAsSelected");
			break;
		case "KW":
			countryCode = "KW";
			currencySymbol = "";
			currencySymbolRight = " KD";
			currencySymbolCheck = "KD";
			document.getElementById("selectList").selectedIndex = "12";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Kuwaiti Dinar (KWD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[13].setAttribute("class", "sameAsSelected");
			break;
		case "MX":
			countryCode = "MX";
			currencySymbol = "Mex$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "3";
			document.getElementById("selectList").selectedIndex = "14";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Mexican Peso (MXN)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[14].setAttribute("class", "sameAsSelected");
			break;
		case "EU":
		case "NL":
			countryCode = "NL";
			currencySymbol = "";
			currencySymbolRight = "€";
			currencySymbolCheck = "€";
			document.getElementById("selectList").selectedIndex = "15";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Netherlands (EUR)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[15].setAttribute("class", "sameAsSelected");
			break;
		case "NZ":
			countryCode = "NZ";
			currencySymbol = "NZ$ ";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "2";
			document.getElementById("selectList").selectedIndex = "16";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "New Zealand Dollar (NZD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[16].setAttribute("class", "sameAsSelected");
			break;
		case "NO":
			countryCode = "NO";
			currencySymbol = "";
			currencySymbolRight = " kr";
			currencySymbolCheck = "kr";
			document.getElementById("selectList").selectedIndex = "17";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Norwegian Krone (NOK)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[17].setAttribute("class", "sameAsSelected");
			break;
		case "PH":
			countryCode = "PH";
			currencySymbol = "₱";
			currencySymbolCheck = "₱";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "18";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Philippine Peso (PHP)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[18].setAttribute("class", "sameAsSelected");
			break;
		case "PL":
			countryCode = "PL";
			currencySymbol = "";
			currencySymbolRight = "zł";
			currencySymbolCheck = "zł";
			document.getElementById("selectList").selectedIndex = "19";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Polish Zloty (PLN)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[19].setAttribute("class", "sameAsSelected");
			break;
		case "QA":
			countryCode = "QA";
			currencySymbol = "";
			currencySymbolRight = " QR";
			currencySymbolCheck = "QR";
			document.getElementById("selectList").selectedIndex = "20";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Qatari Rial (QAR)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[20].setAttribute("class", "sameAsSelected");
			break;
		case "RU":
			countryCode = "RU";
			currencySymbol = "";
			currencySymbolRight = " pуб.";
			currencySymbolCheck = "pуб.";
			document.getElementById("selectList").selectedIndex = "21";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Russian Rubles (RUB)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[21].setAttribute("class", "sameAsSelected");
			break;
		case "SG":
			countryCode = "SG";
			currencySymbol = "S$";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "1";
			document.getElementById("selectList").selectedIndex = "22";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Singapore Dollar (SGD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[22].setAttribute("class", "sameAsSelected");
			break;
		case "TH":
			countryCode = "TH";
			currencySymbol = "฿";
			currencySymbolCheck = "฿";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "23";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Thai Baht (THB)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[23].setAttribute("class", "sameAsSelected");
			break;
		case "TR":
			countryCode = "TR";
			currencySymbol = "";
			currencySymbolRight = " TL";
			currencySymbolCheck = "TL";
			document.getElementById("selectList").selectedIndex = "24";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Turkish Lira (TRY)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[24].setAttribute("class", "sameAsSelected");
			break;
		case "UA":
			countryCode = "UA";
			currencySymbol = "";
			currencySymbolRight = "₴";
			currencySymbolCheck = "₴";
			document.getElementById("selectList").selectedIndex = "25";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Ukrainian Hryvnia (UAH)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[25].setAttribute("class", "sameAsSelected");
			break;
		case "US":
			countryCode = "US";
			currencySymbol = "$";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "26";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "United States Dollar (USD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[26].setAttribute("class", "sameAsSelected");
			break;
		case "VN":
			countryCode = "VN";
			currencySymbol = "";
			currencySymbolRight = "₫";
			currencySymbolCheck = "₫";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "27";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "Vietnamese Dong (VND)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[27].setAttribute("class", "sameAsSelected");
			break;
		default:
			countryCode = "US";
			cc = "US";
			currencySymbol = "$";
			currencySymbolCheck = "$";
			currencySymbolRight = "";
			currencySymbolNumber = "0";
			document.getElementById("selectList").selectedIndex = "26";
			document.getElementById("selectSelected").setAttribute("value", countryCode);
			document.getElementById("selectSelected").innerHTML = "United States Dollar (USD)";
			var optList = document.getElementById("selectItems").childNodes;
			optList[26].setAttribute("class", "sameAsSelected");
			alert("Error: Detected currency not supported. Reverting to USD.");
			break;
	}
}
