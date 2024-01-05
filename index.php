<!DOCTYPE html>
<?php

	$cssVersion = "3.7";
	$jsVersion = "3.8";

	$_GET = filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);
	$_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
	$count = file_get_contents("counter.txt");
?>

<html>

	<head>
		<title>Steam Wishlist Calculator</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="msapplication-TileColor" content="#2d89ef">
		<meta name="msapplication-TileImage" content="media/mstile-144x144.png">
		<meta name="msapplication-config" content="media/browserconfig.xml">
		<meta name="theme-color" content="#ffffff">
		<meta property="og:site_name" content="Steam Wishlist Calculator">
		<meta property="og:title" content="Steam Wishlist Calculator">
		<meta property="og:url" content="https://SteamWishlistCalculator.com">
		<meta property="og:description" content="Steam Wishlist Calculator allows you to calculate the total cost of your Steam wishlist!">
		<meta property="og:type" content="website">
		<meta property="og:image" content="https://www.steamwishlistcalculator.com/logo.png">
		<meta property="og:image:alt" content="Steam Wishlist Calculator Logo">
		<meta name="keywords" content="Steam Wishlist Calculator, Steam Calculator, Wishlist Calculator, Calculator, Steam Wishlist Price Calculator, Wishlist Tool, Steam Tool, Wishlist">
		<meta name="author" content="The HopelessGamer">
		<meta name="description" content="Steam Wishlist Calculator allows you to calculate the total cost of your Steam wishlist!">
		<meta name="google-site-verification" content="sSsmTYMxwocPjXiPi-NmL9bpRmExX4XZiFngOvjHA_4">
		<link rel="apple-touch-icon" sizes="57x57" href="media/apple-touch-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="media/apple-touch-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="media/apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="media/apple-touch-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="media/apple-touch-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="media/apple-touch-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="media/apple-touch-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="media/apple-touch-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="media/apple-touch-icon-180x180.png">
		<link rel="icon" type="image/png" sizes="32x32" href="media/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="192x192" href="media/android-chrome-192x192.png">
		<link rel="icon" type="image/png" sizes="16x16" href="media/favicon-16x16.png">
		<link rel="manifest" href="media/site.webmanifest">
		<link rel="mask-icon" href="media/safari-pinned-tab.svg" color="#5bbad5">
		<link rel="shortcut icon" href="favicon.ico">
		<link rel="stylesheet" href="css/THG.min.css?v=<?php echo $cssVersion; ?>">
		<link rel="stylesheet" type="text/css" href="css/calculator.css?v=<?php echo $cssVersion; ?>">
		<link rel="stylesheet" href="css/bootstrap-progress.min.css?v=<?php echo $cssVersion; ?>">
		<link rel="stylesheet" href="css/fontawesome-all.min.css?v=<?php echo $cssVersion; ?>">
		<link rel="stylesheet" href="css/select.min.css?v=<?php echo $cssVersion; ?>">
		<script src="js/jquery-3.3.1.min.js?v=<?php echo $jsVersion; ?>"></script>
		<script src="js/select.js?v=<?php echo $jsVersion; ?>"></script>
		<script src="js/core.js?v=<?php echo $jsVersion; ?>"></script>
		<script src="js/sortBy.js?v=<?php echo $jsVersion; ?>"></script>
		<script src="js/coreFunctions.js?v=<?php echo $jsVersion; ?>"></script>
		<script src="js/currencySwitch.js?v=<?php echo $jsVersion; ?>"></script>
		<script src="js/getallurlparams.min.js?v=<?php echo $jsVersion; ?>"></script>
		<script src="js/accounting.min.js?v=<?php echo $jsVersion; ?>"></script>
		<script src="js/contact-form.js?v=<?php echo $jsVersion; ?>"></script>
	</head>
	<div id="container">
		<div id="header">
			<header>
				<nav>
					<span class="hamburger" onclick="openNav()" href="javascript:void(0)">
						<i class="fas fa-bars"></i>
					</span>
					<a class="menu-button sitename" title="Home" href="https://www.steamwishlistcalculator.com/" alt="Home">Steam Wishlist Calculator</a>
					<div class="menu-buttons">
						<a class="menu-button hide-menu-mobile" style="transition: none;" title="Home" href=" " onclick="formReset(); event.preventDefault(); callCancelFetch();" alt="Home">
							<i class="fas fa-home button-menu" alt="Home"></i>
						</a>
						<a class="menu-button hide-menu-mobile" style="transition: none;" title="Contact" href="#contact" onclick="formResetContact(); event.preventDefault(); callCancelFetch();" alt="Contact">
							<i class="fas fa-envelope button-menu" alt="Contact"></i>
						</a>
						<a class="menu-button hide-menu-mobile" style="transition: none;" title="FAQ" href="#faq" onclick="faq(); event.preventDefault(); callCancelFetch();" alt="faq">
							<i class="far fa-question-circle button-menu" alt="faq"></i>
						</a>
						<a class="menu-button hide-menu-mobile" style="transition: none;" title="Partners" href="#partners" onclick="partners(); event.preventDefault(); callCancelFetch();" alt="Partners" target="_blank">
							<i class="fa fa-handshake button-menu" alt="Partners"></i>
						</a>
						<a class="menu-button hide-menu-mobile" style="transition: none;" title="Steam Group" href="https://steamcommunity.com/groups/SteamWishlistCalculator" alt="Steam Group" target="_blank">
							<i class="fab fa-steam-symbol button-menu" alt="Steam Group"></i>
						</a>
						<a class="menu-button hide-menu-mobile" style="transition: none;" title="Discord" href="https://discord.gg/abyAUJU" alt="Discord" target="_blank">
							<i class="fab fa-discord button-menu" alt="Discord"></i>
						</a>
						<a class="menu-button hide-menu-mobile" style="transition: none;" title="Github" href="https://github.com/The-HopelessGamer/steamwishlistcalculator" alt="Github" target="_blank">
							<i class="fab fa-github button-menu" alt="Github"></i>
						</a>
					</div>
					<span id="currencyDropdown"></span>
					<div class="customSelect" id="customSelect" style="width:250px;">
						<select id="selectList" title="Currency">
							<option value="AutoDetect" selected="selected">Currency: Auto Detect</option>
							<option value="AR">Argentinian Peso (ARS)</option>
							<option value="AU">Australian Dollar (AUD)</option>
							<option value="AZ">Azerbaijani (AZN - CIS)</option>
							<option value="BR">Brazilian Reais (BRL)</option>
							<option value="GB">British Pound (GBP)</option>
							<option value="CA">Canadian Dollar (CAD)</option>
							<option value="CR">Costa Rican Colón (CRC)</option>
							<option value="IN">Indian Rupee (INR)</option>
							<option value="ID">Indonesian Rupiah (IDR)</option>
							<option value="IL">Israeli New Shekel (ILS)</option>
							<option value="JP">Japanese Yen (JPY)</option>
							<option value="KZ">Kazakhstani Tenge (KZT)</option>
							<option value="KW">Kuwaiti Dinar (KWD)</option>
							<option value="MX">Mexican Peso (MXN)</option>
							<option value="NL">Netherlands (EUR)</option>
							<option value="NZ">New Zealand Dollar (NZD)</option>
							<option value="NO">Norwegian Krone (NOK)</option>
							<option value="PH">Philippine Peso (PHP)</option>
							<option value="PL">Polish Zloty (PLN)</option>
							<option value="QA">Qatari Rial (QAR)</option>
							<option value="RU">Russian Rubles (RUB)</option>
							<option value="SG">Singapore Dollar (SGD)</option>
							<option value="TH">Thai Baht (THB)</option>
							<option value="TR">Turkish Lira (TRY)</option>
							<option value="UA">Ukrainian Hryvnia (UAH)</option>
							<option value="US">United States Dollar (USD)</option>
							<option value="VN">Vietnamese Dong (VND)</option>
						</select>
					</div>
					<div id="mySidenav" class="sidenav">
						<a class="closebtn" href="javascript:void(0)" onclick="closeNav()">&#10060;</a>
						<div style="margin-top: 50px;">
							<a class="menu-button sidenav-buttons" title="Home" href=" " onclick="formReset(); closeNav(); event.preventDefault(); callCancelFetch();" alt="Home">Home</a>
							<a class="menu-button sidenav-buttons" title="Contact" onclick="formResetContact(); closeNav(); event.preventDefault(); callCancelFetch();" alt="Contact" href="#contact">Contact</a>
							<a class="menu-button sidenav-buttons" title="FAQ" onclick="faq(); closeNav(); event.preventDefault(); callCancelFetch();" alt="faq" href="#faq">FAQ</a>
							<a class="menu-button sidenav-buttons" title="Partners" onclick="partners(); closeNav(); event.preventDefault(); callCancelFetch();" alt="partners" href="#partners">Partners</a>
							<a class="menu-button sidenav-buttons" title="Discord" href="https://discord.gg/abyAUJU" alt="Discord" target="_blank">Discord</a>
							<a class="menu-button sidenav-buttons" title="Steam Group" href="https://steamcommunity.com/groups/SteamWishlistCalculator" alt="Steam Group" target="_blank">Steam Group</a>
							<a class="menu-button sidenav-buttons" title="Github" href="https://github.com/The-HopelessGamer/steamwishlistcalculator" alt="Github" target="_blank">Github</a>
							<a id="select" style="text-align: center;"></a>
						</div>
					</div>
				</nav>
			</header>
			<div class="sideNavBG" id="sideNavBG"></div>
		</div>
		<div id="body">
			<div id="wishlist-container">
				<div class="image1"></div>
				<div class="image2"></div>
				<div class="THG-form progressBarMain" id="loader">
					<a class="titleLinks" style="float: right;" onclick="cancel()">Cancel</a>
					<h1 class="loadingText">Calculating your wishlist<span class="blink">.</span><span class="blink">.</span><span class="blink">.</span></h1>
					<div class="progress">
						<div class="progress-bar progress-bar-striped active" style="width: 0%" id="bar"></div>
					</div>
				</div>
				<div class="THG-form privacypolicy" id="privacyPolicy">
					<h1 style="text-align: center;">Privacy Policy</h1>
					<p>
						<strong>Scope of this Privacy Policy</strong>
						<br>This privacy policy discloses the privacy practices for
						<a class="link" href="https://www.steamwishlistcalculator.com/" title="Steam Wishlist Calculator">https://www.steamwishlistcalculator.com/</a>
						and applies solely to information collected by this website.
					</p>
					<p>
						<strong>Information Collection, Use, and Sharing</strong>
						<br>We are the sole owners of the information collected on this site. We only have access to publicly available information and are only able to collect information that you voluntarily provide via email or other direct contact from you. We will not
							sell or rent this information to anyone.</p>
					<p>We will use your information to respond to you, regarding the reason you contacted us.</p>
					<p>
						<strong>Third-Party Services</strong>
						<br>We use
						<a class="link" href="https://opengeoscience.github.io/geojs/" target="_blank">GeoJS</a>
						to set the Currency based on the users location. Please refer to
						<a class="link" href="https://opengeoscience.github.io/geojs/" target="_blank">GeoJS's Website</a>
						for more information.
						<br><br>Your IP Address will only be provided to
						<a class="link" href="https://opengeoscience.github.io/geojs/" target="_blank">GeoJS</a>
						If you calculate your wishlist whilst using the Currency Auto Detect Feature on this website.
						<br><br>If you would prefer not to provide your IP Address to
						<a class="link" href="https://www.geojs.io" target="_blank">GeoJS</a>
						to set the currency based on your location whilst using the Currency Auto Detect Feature then please choose one of the preset Currencies from the Currency Dropdown instead.
					</p>
					<p>
						<strong>Cookies</strong>
						<br>We do not use cookies that collect personal information on this website.
					</p>
					<p>
						<strong>Security</strong>
						<br>We take precautions to protect your information. When you submit sensitive information on our contact form in which you must provide information such as Full Name and Email via the website, your information is protected both online and offline.</p>
					<p>
						<strong>If you have any concerns regarding this privacy policy, you should contact us immediately&nbsp;via our email:
							<a class="link" href="mailto:Admin@steamwishlistcalculator.com" target="_top">Admin@steamwishlistcalculator.com</a>
						</strong>
					</p>
					<p>
						<b>- Updated: 1/01/2020</b>
					</p>
				</div>
				<div class="THG-form faq" id="faq">
					<h1 style="text-align: center; margin-bottom: 10px;">FAQ</h1>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							Does this calculate discount prices?</p>
						<p>
							<b>Answer:</b>
							If a product is on sale, it will calculate the sale price instead of its normal price.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							Does this calculate dlc?</p>
						<p>
							<b>Answer:</b>
							Any wishlisted DLC are included in the calculation.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							What is Steam Wishlist Calculator and what does it do?</p>
						<p>
							<b>Answer:</b>
							Steam Wishlist Calculator is a website devoted to calculating the total value of a Steam users wishlist.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							Can this website compromise my account?</p>
						<p>
							<b>Answer:</b>
							This website will not compromise your account in any way shape or form. We do not collect or store user data.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							Is this website safe?</p>
						<p>
							<b>Answer:</b>
							This website does not store user data and it does not have any login forms, meaning there is no risk of your credentials being phished. This website uses your Steam ID which is publicly available and used to get your wishlist data (Assuming your
							wishlist is public in the first place) to calculate the total cost and provide additional information.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							My Steam ID goes into the URL. Can that compromise my account?</p>
						<p>
							<b>Answer:</b>
							The URL parameters are generated from your steam ID or Custom Steam ID if your wishlist succesfully calculates. It uses the parameters for form submission for the purpose of allowing the user to share their wishlist calculation result.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							Does this website use cookies that collect personal information?</p>
						<p>
							<div class="tooltip" style="float: unset;">
								<b>Answer:</b>
								This website does not use cookies that collect personal information. Sadly the
								<a class="" onmouseover="cookieEasterEgg()">
									<span class="tooltiptext cookieTooltip" style="margin-left: unset; margin-bottom: 15px;" id="cookieTooltip"><img src="media/cookie.png" alt="" width="64" height="64"><br>What?! Is this a Cookie?!</span>
									Cookie
								</a>
								Monster ate all my chocolate chip cookies.
							</div>

						</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							My currency is not in the currency dropdown. What can i do?</p>
						<p>
							<b>Answer:</b>
							If steam supports the currency, you can contact us and request your currency to be added via the
							<a class="link" onclick="formResetContact(); event.preventDefault();" href="#contact" title="Contact">
								<u>Contact Page</u>
							</a>.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							The website is not working. What can i do?</p>
						<p>
							<b>Answer:</b>
							Contact the developer by using the
							<a class="link" onclick="formResetContact(); event.preventDefault();" href="#contact" title="Contact">
								<u>Contact Form</u>
							</a>.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							What is the maximum wishlist Size that this website will calculate and why?</p>
						<p>
							<b>Answer:</b>
							The maximum wishlist this website will calculate is 10000 games. Calculating bigger wishlists could result in Steam Rate Limiting the website.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							Why did i make this website?</p>
						<p>
							<b>Answer:</b>
							I decided to use this as a project for learning javascript and getting better at over all web development. I have been looking for years to find a website like this and never found one.
							<br>
							Because i was learning web development, i thought this would be a good project to work on.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							What was the goal of this website?</p>
						<p>
							<b>Answer:</b>
							The goal was that this website had to be user friendly, clean, easy to use and overly simplistic. So far i think i have achieved that pretty well.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							Does this website use the Steam API?</p>
						<p>
							<b>Answer:</b>
							As of writing this FAQ, the Steam API does not support getting wishlists.</p>
					</div>
					<br>
					<div class="faqQA">
						<p>
							<b>Question:</b>
							Does this website have a database?</p>
						<p>
							<b>Answer:</b>
							This website does not currently have a database. Maybe one day it will but for the time being it does not.</p>
					</div>
					<p style="margin-bottom: 0px;">Got any more questions? Please contact us via our
						<a class="link" onclick="formResetContact(); event.preventDefault();" href="#contact" title="Contact">
							<u>Contact Page</u>
						</a>.</p>
				</div>
				<p class="detectIE">Sorry, This browser is not supported.</p>
				<noscript>
					<p>Please enable JavaScript to use this website!</p>
				</noscript>
				<div class="THG-form partners" id="partners">
					<h2 style="text-align: center;">Partners</h2>
					<div class="partnersRow">
						<div class="partnersColumn">
							<h4 class="partnersTitle">
								<a class="link" href="https://steamladder.com/" title="Steam Ladder is a ranking and stats website for Steam profiles. View your worldwide or country rank in playtime, level, games owned, and more." target="_blank">Steam Ladder</a>
							</h4>
							<p style="margin: 0; ">Steam Ladder is a ranking and stats website for Steam profiles. View your worldwide or country rank in playtime, level, games owned, and more.</p>
						</div>
						<div class="partnersColumn">
							<h4 class="partnersTitle">
								<a class="link" href="https://steam-backlog.com/" title="Steam Backlog is a Steam library manager built with simplicity in mind." target="_blank">Steam BackLog</a>
							</h4>
							<p style="margin: 0;">Steam Backlog is a Steam library manager built with simplicity in mind.</p>
						</div>
						<div class="partnersColumn">
							<h4 class="partnersTitle">
								<a class="link" href="https://steam.design/" title="A small tool to crop Steam profile backgrounds to showcases." target="_blank">Steam.Design</a>
							</h4>
							<p style="margin: 0; ">A small tool to crop Steam profile backgrounds to showcases.</p>
						</div>
					</div>
				</div>
				<form name="userInputForm" action="javascript:;" onsubmit="main();" class="THG-form" id="form-display">
					<input id="extraMain" name="extra" type="text">
					<div class="THG-form-box">
						<h1 class="form-font-size" style="text-align: center;">Calculate Your Wishlist</h1>
						<p class="wishlistCount">Total Wishlists Calculated:
							<span id="wishlistCount"></span></p>
						<input name="userInput" class="THG-input userInput" id="userInput" type="text" placeholder="Steam ID" required="required">
					</div>
					<p style="font-size: 15px;">Supports:</p>
					<ul>
						<li>Steam ID64</li>
						<li>Steam Custom ID</li>
						<li>Steam Profile URL</li>
						<li>Steam Wishlist URL</li>
					</ul>
					<input type="submit" name="submit" class="THG-submit button-main" value="Calculate">
				</form>
				<form action="Going no where until a real user clicks submit." name="contactForm" method="POST" class="THG-form" id="ajax-contact" autocomplete="off">
					<div class="THG-form-box-validation">
						<label for="nameBox">Email Address:</label>
						<input name="nameBox" type="email" placeholder="Insert Email" maxlength="254">
					</div>
					<div class="THG-form-box-validation">
						<label for="emailBox">Email Address:</label>
						<input name="emailBox" type="email" placeholder="Insert Email" maxlength="254">
					</div>
					<div class="THG-form-box-validation">
						<label for="messageBox">Message:</label>
						<textarea name="messageBox" type="text" placeholder="Type here" maxlength="2000"></textarea>
					</div>
					<fieldset>
						<legend>Contact Form</legend>
						<div class="THG-form-box">
							<label for="name">Name:</label>
							<span id="nameError" style="display: none; color: red;">Please fill in this field.</span>
							<input oninput="nameValidation()" name="name" id="name" type="text" class="THG-input" placeholder="Insert Full Name" pattern="[a-zA-Z\s0-9]{1,}" maxlength="50">
						</div>
						<div class="THG-form-box">
							<label for="email">Email Address:</label>
							<span id="emailError" style="display: none; color: red;">Please insert a valid email address.</span>
							<input oninput="emailValidation()" name="email" id="email" type="email" class="THG-input" placeholder="Insert Email" maxlength="254">
						</div>
						<div class="THG-form-box" style="padding-bottom: 0px!important;">
							<label for="message">Message:</label>
							<span id="messageError" style="display: none; color: red;">Please fill in this field.</span>
							<textarea oninput="messageValidation()" name="message" id="message" type="text" class="THG-input-textarea THG-input" placeholder="Type here" maxlength="2000"></textarea>
						</div>
						<div style="padding: 0px 0px 10px 0px;">
							<input oninput="checkboxValidation()" type="checkbox" class="checkbox" id="checkbox" name="checkbox">
							<label for="checkbox" class="checkboxMobile">I have read & accepted the
								<a class="link" onclick="privacypolicy(); event.preventDefault();" href="#privacy-policy" title="Privacy Policy">
									<u>Privacy Policy</u>
								</a>
								<a></a>
							</label>
							<span id="checkboxValidationSymbol" class="THG-require"></span>
							<span id="checkboxError" style="display: none; color: red;">Please tick this box if you want to proceed.</span>
						</div>
						<input type="submit" name="submit" class="THG-submit button-main" id="submit" value="Submit">
						<p style="margin-bottom: 0px; margin-top: 7px;">
							<span class="THG-require"></span>
							= Required
						</p>
					</fieldset>
				</form>

				<div id="modal" class="modal">
					<div class="modalContent">
						<div class="modalHeader">
							<span class="close">&times;</span>
							<h2 style="margin: revert;">Export Wishlist</h2>
						</div>
						<div class="modalBody">
							<div class="modalButtonHeader">
								<a class="modalHeaderButtons" onclick="onWishlist(); callCancelFetch()">Titles</a>
								<a class="modalHeaderButtons" onclick="withoutPrice(); callCancelFetch()">Without Price</a>
								<a class="modalHeaderButtons" onclick="hasPrice(); callCancelFetch()">With Price</a>
								<a class="modalHeaderButtons" onclick="unlistedIds(); callCancelFetch()">Unlisted Appids</a>
								<a class="modalHeaderButtons" onclick="Sale(); callCancelFetch()">On Sale</a>
								<a class="modalHeaderButtons" onclick="free(); callCancelFetch()">Free</a>
								<a class="modalHeaderButtons" onclick="preOrderable(); callCancelFetch()">Pre Order</a>
								<a class="modalHeaderButtons" onclick="appidList(); callCancelFetch()">Appids</a>
							</div>
							<h4 id="exportTitle"></h4>
							<div class="THG-input-textarea THG-input titleBox" id="titles" spellcheck="false" autocomplete="off"></div>
							<div class="progressBarMain" id="unlistedGameloader" style="margin: 10px auto 20px auto; max-width: none; display: none;">
								<h1 class="loadingText">Retrieving Unlisted Games<span class="blink">.</span><span class="blink">.</span><span class="blink">.</span></h1>
								<div class="progress" style="background-color: #e6e6e6;">
									<div class="progress-bar progress-bar-striped active" style="width: 0%" id="unlistedGameBar"></div>
								</div>
							</div>
							<p id="guide"></p>
						</div>
						<div class="modalFooter">
							<div class="tooltip" id="tooltip">
								<a class="modalHeaderButtons modalCopyClippy" onclick="copy()">
									<span class="tooltiptext" id="myTooltip">Copied!</span>
									Copy to Clipboard
								</a>
							</div>
							<select id="sort" class="sortSelect">
								<option value="title">Sort By: Name</option>
								<option value="price">Sort By: Price</option>
								<option value="priority">Sort By: Priority</option>
							</select>
						</div>
					</div>

				</div>
				<div id="result-box" class="wishlist-sizing">
					<div class="wishlist">
						<div class="wishlist-inner-container" id="wishlist-inner-container">
							<h1 class="wishlist-text" id="profileName"></h1>
							<button class="Reset-Button Reset-Button-Cal" id="resetButtonError" onclick="formReset()">Back</button>
							<button class="Reset-Button Reset-Contact" id="resetButtonContactSuccess" onclick="formResetContact()">Back</button>
							<div class="container-results" id="container-results">
								<div class="item">
									<button style="left:16px;right:unset;" id="salePricingButton" class="modalButtonStyle" onclick="ToggleSalePricing()">Toggle Sale Pricing Off</button>
									<button class="modalButtonStyle" id="showModal">Export Wishlist</button>
								</div>
							</div>
							<table style="margin-top: 10px;" id="wishlistTable">
								<thead>
									<tr>
										<th>Current Value</th>
										<th>On Wishlist</th>
										<th>Without Price</th>
										<th>With Price</th>
										<th>Free</th>
										<th>On Sale</th>
										<th>Pre Order</th>
										<th>Unlisted</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td data-label="Current Value" id="priceTotal">0</td>
										<td data-label="On Wishlist" id="titleCount">0</td>
										<td data-label="Without Price" id="withoutPrice">0</td>
										<td data-label="With Price" id="withPrice">0</td>
										<td data-label="Free" id="isFree">0</td>
										<td data-label="On Sale" id="onSale">0</td>
										<td data-label="Pre Order" id="preOrder">0</td>
										<td data-label="Unlisted" id="unlisted">0</td>
									</tr>
								</tbody>
							</table>
							<h2 class="FilterLineBreak" id="FilterLineBreak">
							</h2>
							<div class="table tableRow wishlistDataTable" id="wishlistDataTable">
								<p class="caption">Wishlist Items</p>
								<div class="thead" id="thead">
									<div class="tr tableClass" id="tableHeader">
										<div class="th tableTitle" onclick="headerSort(0)">
											<span>Title</span>
											<i class="arrow up"></i>
										</div>
										<div class="th" onclick="headerSort(1)">
											<span>Release Date</span>
											<i class="arrow up"></i>
										</div>
										<div class="th" onclick="headerSort(2)">
											<span>AppID</span>
											<i class="arrow up"></i>
										</div>
										<div class="th" onclick="headerSort(3)">
											<span>On Sale</span>
											<i class="arrow up"></i>
										</div>
										<div class="th" onclick="headerSort(4)">
											<span>Pre Order</span>
											<i class="arrow up"></i>
										</div>
										<div class="th" onclick="headerSort(5)">
											<span>Price</span>
											<i class="arrow up"></i>
										</div>
									</div>
								</div>
								<div id="wishlistTableBody" class="tbody"></div>
							</div>
							<button class="Reset-Button Reset-Contact" id="resetButtonContact" onclick="formResetContact()">Back</button>
							<div class="errorBox" id="errorBox">
								<h1 id="errorText" class="errorText"></h1>
								<p id="successMsg" class="successMsg"></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="image3"></div>
		<div id="footer">
			<p>
				<a class="link" onclick="privacypolicy(); event.preventDefault();" href="#privacy-policy" title="Privacy Policy">
					<u>Privacy Policy</u>
				</a>
				-
				<a class="link" onclick="faq(); event.preventDefault();" href="#faq" title="FAQ">
					<u>FAQ</u>
				</a>
				-
				<a class="link" href="https://github.com/The-HopelessGamer/steamwishlistcalculator" href="#faq" title="FAQ">
					<u>Source Code</u>
				</a>
				-
				<b>Partners:</b>
				<a class="link" href="https://steam.design/" title="A small tool to crop Steam profile backgrounds to showcases." target="_blank">Steam.Design</a>
				|
				<a class="link" href="https://steamladder.com/" title="Steam Ladder is a ranking and stats website for Steam profiles. View your worldwide or country rank in playtime, level, games owned, and more." target="_blank">Steam Ladder</a>
				|
				<a class="link" href="https://steam-backlog.com/" title="Steam Backlog is a Steam library manager built with simplicity in mind." target="_blank">Steam BackLog</a>
				-
				<a class="link" onclick="partners();" href="#partners" title="View All Partners">View All Partners</a>
				<p>This website is Not affiliated with Valve Corporation, Steam, or any of their partners. All Copyrights & Trademarks reserved to their respective owners.</p>
				<p style="margin: 0px;">Website owned & developed by
					<a class="link" href="http://steamcommunity.com/id/The_HopelessGamer" target="_blank">The HopelessGamer</a> 2018 - <?php echo date("Y"); ?>. Want to become a Partner?
					<a class="link" onclick="formResetContact(); event.preventDefault();" href="#contact" title="Contact">Contact us</a>.</p>
			</div>
		</div>
		<script>
			//This is handled with PHP.
			document.getElementById("wishlistCount").innerHTML = formatNumber("<?php echo $count ?>");
		</script>

</html>
