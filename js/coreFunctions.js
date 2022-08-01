 function currencyChange() {
     if (resultsLoaded == true) {
         window.history.pushState("object or string", "Title", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
         getWishlist();
         closeNav();
     }
 }

 $(document).ready(function() { //Must be called upon page load or the home page will not display.
     document.getElementById("selectItems").firstChild.setAttribute("class", "sameAsSelected");
     onResize();
     window.addEventListener('resize', onResize);

     formSubmission(); //Call this upon page load. This also allows for manual calling.

     let element = document.getElementById("selectItems");
     $("#selectList").change(function() {
         let opt = document.getElementById("selectList").value;
         document.getElementById("selectSelected").setAttribute("value", opt);
         currencyChange();
     });
     element.addEventListener("click", function() { //If the currency dropdown gets changed then recalculate the wishlist in the selected currency.
         currencyChange();
         callCancelFetch();
     });

     let filterDropDown = document.getElementById("FilterLineBreak");
     filterDropDown.addEventListener("click", function() {
         let filterDPContent = document.getElementById("content");
             if (filterDPContent.style.maxHeight){
                 filterDPContent.style.maxHeight = null;
             } else {
                 filterDPContent.style.maxHeight = filterDPContent.scrollHeight + "px";
             }
       });

     $("#sort").change(function() {
         sortBy();
         getHyperLinks = createHyperLinks();
         tabSwitch();
     });

/* Testing with PHP Instead.
     let date = new Date(); //Automatically updates the date in the footer.
     let newYear = date.getFullYear();
     if (newYear > 2018) {
         document.getElementById("newYear").innerHTML = newYear;
     }
 */
 });

 function tabSwitch() {
     switch (tab) {
         case 9:
             unlistedIds();
             break;
         case 8:
             free();
             break;
         case 7:
             preOrder();
             break;
         case 6:
             onWishlist();
             break;
         case 5:
             hasPrice();
             break;
         case 4:
             withoutPrice();
             break;
         case 3:
             appidList();
             break;
         case 2:
             Sale();
             break;
         case 1:
             unlisted();
             break;
     }
 }

 function sortBy() {
     let sortValue = document.getElementById("sort").value;
     switch (sortValue) {
         case "priority":
             dataArray.sort(sort_by_exported('priority', false, parseInt));
             break;
         case "price":
             dataArray.sort(sort_by_exported('price', false));
             break;
         case "title":
             dataArray.sort(sort_by_exported('title', false, function(a) {
                 return a;
             }));
     }
 }

 function priceToFloat(currencyString) {
     switch (countryCode) {
         case "AR":
         case "BR":
         case "JP":
         case "NL":
         case "NO":
         case "PL":
         case "EU":
             currencyString = currencyString.replace('.', '').replace(',', '.');
             break;
         case "PH":
         case "IN":
         case "TH":
             currencyString = currencyString.replace(',', '');
             break;
         case "ID":
         case "KZ":
         case "UA":
             currencyString = currencyString.replace(/ /g, '');
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
     let preOrderUrl = "";
     let freeUrl = "";
     let appidWithoutTitles = "";
     let withPriceUrl = "";
     let priceEmptyUrl = "";
     let onSaleUrl = "";
     for (let i = 0; i < dataArray.length; i++) { //Generating a hyperlinks for each game in the wishlists by looping over both the appidArray and the titleArray.
         titles += dataArray[i]["url"] + seperator;
         appidWithoutTitles += '<a href="https://store.steampowered.com/app/' + dataArray[i]["appid"] + '/" class="titleLinks" title="' + dataArray[i]["title"] + '" target="_blank">' + dataArray[i]["appid"] + "</a>" + seperator;
         if (dataArray[i]["withPriceBoolean"] == true) {
             withPriceUrl += dataArray[i]["url"] + seperator;
         }
         if (dataArray[i]["onSaleBoolean"] == true) {
             onSaleUrl += dataArray[i]["url"] + seperator;
         }
         if (dataArray[i]["priceEmptyBoolean"] == true) {
             priceEmptyUrl += dataArray[i]["url"] + seperator;
         }
         if (dataArray[i]["free"] == true) {
             freeUrl += dataArray[i]["url"] + seperator;
         }
         if (dataArray[i]["preOrderBoolean"] == true) {
             preOrderUrl += dataArray[i]["url"] + seperator;
         }
     }
     return {
         titles: titles.slice(0, -9),
         freeUrl: freeUrl.slice(0, -9),
         preOrderUrl: preOrderUrl.slice(0, -9),
         onSaleUrl: onSaleUrl.slice(0, -9),
         withPriceUrl: withPriceUrl.slice(0, -9),
         priceEmptyUrl: priceEmptyUrl.slice(0, -9),
         appidWithoutTitles: appidWithoutTitles.slice(0, -9)
     };
 }


 //This creates, fills and displays the tables on the webpage.
 function displayTable() {
     rowArray = [];
     $("#wishlistTableBody .tr").remove();
     $("#wishlistEmpty").remove();

     if (dataArray.length == 0) {
         let tableWishlistEmpty = document.getElementById("wishlistTableBody");

         let rowEmptyWishlist = document.createElement("div");
         $(rowEmptyWishlist).attr({
             "class": "tr tableClass",
             "id": "wishlistEmpty"
         });

         let cell = document.createElement("div");
         $(cell).attr({
             "class": "td tableWishlistEmpty tableTitle",
             "style":  "font-weight: bold;"
         }).html("Wishlist is empty");

         rowEmptyWishlist.append(cell);
         tableWishlistEmpty.append(rowEmptyWishlist);

         document.getElementsByClassName("tableClass")[0].style.display = "none";
     } else {
         let table = document.getElementById("wishlistTableBody");
         let row, cell1, cell2, cell3, cell4, cell5, cell6;
         for (let key in dataArray) {

             row = document.createElement("div");
             row.setAttribute("class", "tr tableClass");

             cell1 = document.createElement("div");
             $(cell1).attr({
                 "class": "td tableTitle",
                 "data-label": "Title",
                 "type": dataArray[key]["type"] //Will set to true or false.
             });

             cell2 = document.createElement("div");
             $(cell2).attr({
                 "class": "td",
                 "data-label": "Release Date"
             });

             cell3 = document.createElement("div");
             $(cell3).attr({
                 "class": "td",
                 "data-label": "AppID"
             });

             cell4 = document.createElement("div");
             $(cell4).attr({
                 "class": "td",
                 "data-label": "On Sale"
             });

             cell5 = document.createElement("div");
             $(cell5).attr({
                 "class": "td",
                 "data-label": "Pre Order"
             });

             cell6 = document.createElement("div");
             $(cell6).attr({
                 "class": "td",
                 "data-label": "Price"
             });

             $(cell1).html(dataArray[key]["url"]);

             $(cell2).html(dataArray[key]["releaseDateFormatted"]);

             /*if (dataArray[key]["releaseString"]) {
                 $(cell2).html(dataArray[key]["releaseString"]);
             }*/ //I added this but forgot why, leaving it here incase i need it for some reason.

             $(cell3).html(dataArray[key]["appid"]);

             if (dataArray[key]["onSaleBoolean"] == false) {
                 $(cell4).html("No");
             } else {
                 $(cell4).html(dataArray[key]["discountPercentage"]);
             }
             let priceText = "";
             let originalPriceText = "";
             if (dataArray[key]["price"] == "" || dataArray[key]["price"] == undefined) {
                 if (dataArray[key]["free"] == true) {
                     priceText = "Free";
                 } else {
                     priceText = "N/A";
                 }
             } else {
                 priceText = dataArray[key]["price"];
                 originalPriceText = dataArray[key]["originalPrice"];
             }

             if (dataArray[key]["preOrderBoolean"] == true) {
                 $(cell5).html("Yes");
             } else {
                 $(cell5).html("No");
             }

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
             row.append(cell1, cell2, cell3, cell4, cell5, cell6);
             rowArray.push(row);
             table.append(rowArray[key]);
         }
     }
     document.getElementById("wishlistTable").style.display = "table";
     document.getElementById("wishlistDataTable").style.display = "table";
 }

function onResize() { //Places the currency dropdown either in the hamburger menu or in the header depending on the screen resolution.
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
}

function wishlistCounter() {
    var req = new XMLHttpRequest();
    req.open('POST', 'php/counter.php', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() {
        if (req.readyState == 4 || req.status == 200) {
            var wishlistCount = formatNumber(req.responseText);
            document.getElementById("wishlistCount").innerHTML = wishlistCount;
        }
    };
    req.send();
}

function formatNumber(numOne) {
    return numOne.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function formSubmission() { //Called upon page load. Gets the URL params and sets the correct page.
    switch (location.hash) {
        case "#contact":
            formResetContact();
            break;
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
            urlProfileLookup(location.hash);
            break;
    }
}

window.onhashchange = formSubmission; //If the hash changes, put the user on the correct page.

function urlProfileLookup(locationHash) {
    if (locationHash !== '#privacy-policy' || '#contact' || '#faq' || '#partners') { //If the hash is NOT equal to #privacy-policy, #contact or #faq then check if it has URL paremeters.
        t = window.location.href; //Assign the URL to "T".
        u = t.indexOf("?id" || "&currency"); //Check whether the URL contains "&currency" or "?id".
        if (u !== -1) { //If the URL contains a "&currency" or "?id" then we get the currency from the URL.
            currency = getAllUrlParams(t).currency; //Assign the currency from the URL to a global variable.
            document.getElementById("userInput").value = getAllUrlParams(t).id; //Append the ID to the userInput form.
            getWishlist(); //Submit the form using the ID and Currency from the URL.
        } else {
            formReset(); //If js is enabled then display the form but only display it if the hash is NOT equal to #privacy-policy or #contact also clear the hash for the home page.
            document.getElementById("wishlist-container").style.textAlign = "center";
            window.history.pushState("object or string", "Title", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]); //Clear the parameters and reset the URL.
        }
    } else { //If none of the above works then direct the user to the home page.
        location.href = 'https://www.steamwishlistcalculator.com/';
        window.history.pushState("object or string", "Title", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]); //Clear the parameters and reset the URL.
    }
    //document.getElementById("mobile-bottom").style.display = "block";
}

function setProgressBarWidth(progessPercentage) { //Sets the width of the loading bar to move dynamically.
    document.getElementById("bar").style.width = progessPercentage + "%";
}

function setUnlistedGameProgressBarWidth(progessPercentage) { //Sets the width of the loading bar to move dynamically.
    document.getElementById("unlistedGameBar").style.width = progessPercentage + "%";
}

function cancel() {
    location.href = 'https://www.steamwishlistcalculator.com/';
}

function styleSetDataContainer() {
    $("#loader").fadeOut(500);
    $("#result-box").fadeIn(500);
    document.getElementById("loader").style.display = "none";
    document.getElementById("result-box").style.display = "Block";
    document.getElementById("container-results").style.display = "flex";
    document.getElementById("profileName").style.display = "block";
    document.getElementById("wishlist-container").style.width = "auto";
    document.getElementById("resetButtonContact").style.display = "none";
    document.getElementById("resetButtonError").style.display = "none";
    document.getElementById("wishlist-container").style.textAlign = "left";
    document.getElementById("successMsg").style.display = "none";
    document.getElementById("bar").style.width = "0%";
    document.getElementById("errorBox").style.display = "none";
    pageLoadComplete = true; //Sets the page load to true, e.g page has finished loading.
    resultsLoaded = true;

/* //No longer in use. Keeping it here incase I need it later.
    if (window.IntersectionObserver) {
        observer.observe(document.getElementById('tableHeader'));
    }
*/
}


/* //No longer in use. Keeping it here incase I need it later.
const observer = new IntersectionObserver(handleTableHeaderIntersection, {
    threshold: 1
});

function handleTableHeaderIntersection(entries, observer) {
    if (resultsLoaded == true) {
        let tableHeader = document.getElementById('tableHeader');
        entries.forEach((entry) => {
            //Make sure the First element in the table body exists and make sure the element is not visible within the viewport.
            if (entry.intersectionRatio !== 1) {
                //Append the cloned element to the beginning of the table and add the sticky class.
                let clonedElement = tableHeader.cloneNode(true);
                clonedElement.classList.add("stickyTableHeader");
                document.getElementById("thead").append(clonedElement);
                document.getElementsByClassName("stickyTableHeader")[0].style.marginTop = "0px";
            } else {
                $(".stickyTableHeader").remove();
            }
        });
    }
}
*/
function displayLoader() { //Displays the loader.
    document.getElementById("wishlist-container").style.width = "100%";
    $("#form-display").fadeOut(500);
    $("#result-box").fadeOut(500);
    $("#loader").fadeIn(500);
    document.getElementById("form-display").style.display = "none";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("loader").style.display = "block";
    document.getElementById("wishlist-container").style.maxWidth = "none";
}

function displayUnlistedGameLoader() { //Displays the loader.
    $("#unlistedGameloader").fadeIn(500);
    $("#titles").fadeOut(500);
    document.getElementById("titles").style.display = "none";
    document.getElementById("unlistedGameloader").style.display = "block";
}

function changeStyles() { //This contains all the styles that are changed in several functions. We use this as a default function to be called in other functions so we do not end up with duplicates. Shortens the code and makes it cleaner.
    pageLoadComplete = true;
    resultsLoaded = false;
    window.history.pushState("object or string", "Title", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]); //Clear the parameters and reset the URL.
    document.getElementById("loader").style.display = "none";
    document.getElementById("privacyPolicy").style.display = "none";
    document.getElementById("partners").style.display = "none";
    document.getElementById("faq").style.display = "none";
    document.getElementById("form-display").reset();
    document.getElementById("wishlist-inner-container").style.paddingBottom = "16px";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("wishlist-container").style.paddingBottom = "1em";
    document.getElementById("wishlist-container").style.paddingTop = "1em";
    document.getElementById("container-results").style.display = "none";
    //document.getElementById("mobile-bottom").style.display = "block";
    document.getElementById("resetButtonContact").style.display = "none";
    document.getElementById("FilterLineBreak").style.display = "block";
    document.getElementById("wishlist-container").style.textAlign = "left";
    document.getElementById("wishlist-container").style.width = "500px";
    document.getElementById("ajax-contact").style.display = "none";
    document.getElementById("form-display").style.display = "none";
    document.getElementById("profileName").style.display = "none";
    document.getElementById("resetButtonContactSuccess").style.display = "none";
}

function formReset() { //Clears the main form!
    if (pageLoadComplete == true) { //Checks if the page is loading or not.
        changeStyles();
        $("#form-display").fadeIn(500);
        $("#result-box").fadeOut(500);
        document.getElementById("form-display").style.display = "block";
        document.getElementById("result-box").style.display = "none";
        document.getElementById("ajax-contact").reset();
        history.pushState("", document.title, window.location.pathname + window.location.search); //Clear the Anchor Hash from the url.
        document.title = 'Steam Wishlist Calculator'; //changes the title.
        document.getElementById("wishlist-container").style.textAlign = "center";
        document.getElementById("wishlist-container").style.width = "100%";
        document.getElementById("wishlist-container").style.maxWidth = "100%";
    } else {
        location.href = 'https://www.steamwishlistcalculator.com/';
    }
}

function wishlistSizeLimitReached() { //Prevents wishlists with over 8000 items being calculated.
    throwError();
    document.getElementById("errorText").innerHTML = "Error: Wishlist is too big!";
}

function formResetContact() { //Clears the contact form!
    if (pageLoadComplete == true) { //Checks if the page is loading or not.
        changeStyles();
        $("#result-box").fadeOut(500);
        $("#ajax-contact").fadeIn(500);
        document.getElementById("result-box").style.display = "none";
        document.getElementById("ajax-contact").style.display = "block";
        document.getElementById("checkbox").checked = false;
        document.getElementById("wishlist-container").style.width = "90%";
        document.getElementById("ajax-contact").reset();
        document.getElementById("name").style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
        document.getElementById("email").style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
        document.getElementById("message").style.background = "#EFEFEF url('/media/invalid.png') no-repeat 98% center";
        document.getElementById("checkboxValidationSymbol").style.content = "url('/media/invalid.png')";
        document.getElementById("wishlistTable").style.removeProperty("display");
        document.getElementById("wishlistDataTable").style.display = "block";
        location.hash = 'contact'; //Sets a hash!
        document.title = 'Steam Wishlist Calculator - Contact'; //Changes the title!
    } else {
        location.href = "#contact";
        location.reload();
    }
}

function throwError() { //This contains the styling to create the error container. If we ecounter an error then call this function.
    changeStyles();
    resultsLoaded = false;
    $("#loader").fadeOut(500);
    $("#result-box").fadeIn(500);
    $("#ajax-contact").fadeOut(500);
    document.getElementById("ajax-contact").style.display = "none";
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
    document.getElementById("container-results").style.setProperty("display", "none", "important");
}

function success() { //This contains the styling to create the success container for the contact form. If the form was successful then call this function.
    changeStyles();
    $("#loader").fadeOut(500);
    $("#result-box").fadeIn(500);
    $("#ajax-contact").fadeOut(500);
    document.getElementById("ajax-contact").style.display = "none";
    document.getElementById("result-box").style.display = "block";
    document.getElementById("loader").style.display = "none";
    document.getElementById("FilterLineBreak").style.display = "none";
    document.getElementById("wishlistTable").style.display = "none";
    document.getElementById("wishlistDataTable").style.display = "none";
    document.getElementById("resetButtonContactSuccess").style.display = "block";
    document.getElementById("resetButtonError").style.display = "none";
    document.getElementById("wishlist-container").style.width = "550px";
    document.getElementById("container-results").style.setProperty("display", "none", "important");
}

function privacypolicy() { //Displays the privacy policy container!
    if (pageLoadComplete == true) { //Checks if the page is loading or not.
        changeStyles();
        $("#ajax-contact").fadeOut(500);
        $("#result-box").fadeOut(500);
        $("#privacyPolicy").fadeIn(500);
        document.getElementById("ajax-contact").style.display = "none";
        document.getElementById("result-box").style.display = "none";
        document.getElementById("privacyPolicy").style.display = "block";
        document.getElementById("wishlist-container").style.width = "initial";
        location.hash = 'privacy-policy'; //Sets a hash for the privacy policy page!
        document.title = 'Steam Wishlist Calculator - Privacy Policy'; //Changes the title for the privacy policy page!
    } else {
        location.href = "#privacy-policy";
        location.reload();
    }
}

function faq() { //Displays the FAQ container!
    if (pageLoadComplete == true) { //Checks if the page is loading or not.
        changeStyles();
        $("#ajax-contact").fadeOut(500);
        $("#result-box").fadeOut(500);
        $("#faq").fadeIn(500);
        document.getElementById("ajax-contact").style.display = "none";
        document.getElementById("result-box").style.display = "none";
        document.getElementById("faq").style.display = "block";
        document.getElementById("wishlist-container").style.width = "initial";
        location.hash = 'faq'; //Sets a hash for the FAQ page!
        document.title = 'Steam Wishlist Calculator - FAQ'; //Changes the title for the FAQ page!
    } else {
        location.href = "#faq";
        location.reload();
    }
}

function partners() {
    if (pageLoadComplete == true) { //Checks if the page is loading or not.
        changeStyles();
        $("#ajax-contact").fadeOut(500);
        $("#result-box").fadeOut(500);
        $("#partners").fadeIn(500);
        document.getElementById("ajax-contact").style.display = "none";
        document.getElementById("result-box").style.display = "none";
        document.getElementById("partners").style.display = "block";
        document.getElementById("wishlist-container").style.width = "initial";
        location.hash = 'partners';
        document.title = 'Steam Wishlist Calculator - Partners';
    } else {
        location.href = "#partners";
        location.reload();
    }
}

function openNav() { //This controls the side navigation panel for mobile.
    $("#sideNavBG").fadeIn(500);
    document.getElementById("mySidenav").style.right = "0";
    document.getElementById("mySidenav").style["boxShadow"] = "0px 1px 10px 0px black"; //Shows a shadow when the navigation panel is opened.
}


function closeNav() { //This controls the side navigation panel for mobile.
    $("#sideNavBG").fadeOut(500);
    document.getElementById("mySidenav").style.right = "-250px";
    document.getElementById("mySidenav").style["boxShadow"] = "none";
}

window.onclick = function(event) { //Allows the user to click outside the navigation panel to close it.
    if (event.target == document.getElementById('sideNavBG')) {
        closeNav();
    }
}

window.onmousedown = function(event) {
    if (event.target == modal) {
        callCancelFetch();
        modal.style.display = "none";
        document.getElementsByTagName("body")[0].style.overflow = "auto";

    }
}

//Display the results in the dropdown.
let tab = 0;
let UnlistedGameloopCounter = 0;
let cancelFetch = false;

function displayUnlisted() {
    $("#titles").fadeIn(700);
    $("#unlistedGameloader").fadeOut(700);
    document.getElementById("unlistedGameloader").style.display = "none";
    document.getElementById("titles").style.display = "block";
}

function preOrderable() {
    tab = 7;
    if (getHyperLinks.preOrderUrl !== "") {
        document.getElementById("titles").innerHTML = getHyperLinks.preOrderUrl;
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Pre Order";
        document.getElementById("guide").innerHTML = "";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    } else {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Pre Order";
        document.getElementById("titles").innerHTML = "There are no games for Pre Order on your wishlist.";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    }
}


function Sale() {
    tab = 2;
    if (getHyperLinks.onSaleUrl !== "") {
        document.getElementById("titles").innerHTML = getHyperLinks.onSaleUrl;
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - On Sale";
        document.getElementById("guide").innerHTML = "";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    } else {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - On Sale";
        document.getElementById("titles").innerHTML = "There are no games on sale on your wishlist.";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    }
}

function appidList() {
    tab = 3;
    if (getHyperLinks.appidWithoutTitles !== "") {
        document.getElementById("titles").innerHTML = getHyperLinks.appidWithoutTitles;
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Appids";
        document.getElementById("guide").innerHTML = "";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    } else {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Appids";
        document.getElementById("titles").innerHTML = "Wishlist is empty.";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    }
}

function withoutPrice() {
    tab = 4;
    if (getHyperLinks.priceEmptyUrl !== "") {
        document.getElementById("titles").innerHTML = getHyperLinks.priceEmptyUrl;
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Without Price";
        document.getElementById("guide").innerHTML = "";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    } else {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Without Price";
        document.getElementById("titles").innerHTML = "There are no games without prices on your wishlist.";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    }
}

function hasPrice() {
    tab = 5;
    if (getHyperLinks.withPriceUrl !== "") {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - With Price";
        document.getElementById("titles").innerHTML = getHyperLinks.withPriceUrl;
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    } else {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - With Price";
        document.getElementById("titles").innerHTML = "There are no titles with prices on your wishlist.";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    }
}

function onWishlist() {
    tab = 6;
    if (getHyperLinks.titles !== "") {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items";
        document.getElementById("titles").innerHTML = getHyperLinks.titles;
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    } else {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items";
        document.getElementById("titles").innerHTML = "Wishlist is empty.";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    }
}

function free() {
    tab = 8;
    if (getHyperLinks.freeUrl !== "") {
        document.getElementById("titles").innerHTML = getHyperLinks.freeUrl;
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Free";
        document.getElementById("guide").innerHTML = "";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    } else {
        document.getElementById("guide").innerHTML = "";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Free";
        document.getElementById("titles").innerHTML = "There are no free games on your wishlist.";
        document.getElementById("sort").disabled = false;
        cancelFetch = false;
    }
}

function unlistedIds() {
    tab = 9;
    document.getElementById("sort").disabled = true;
    document.getElementById("guide").innerHTML = 'To learn how to remove unlisted games, check out this <a class="link" href="https://steamcommunity.com/sharedfiles/filedetails/?id=1746978201" target="_blank">Steam Guide</a>.';
    document.getElementById("exportTitle").innerHTML = "Wishlist Items - Unlisted Appids";
    if (unlistedAppids !== "") {
        document.getElementById("titles").innerHTML = unlistedAppids.slice(0, -9);
        displayUnlisted();
        cancelFetch = false;
    } else {
        document.getElementById("titles").innerHTML = "There are no unlisted games on your wishlist.";
        document.getElementById("exportTitle").innerHTML = "Wishlist Items - Unlisted";
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
    setTimeout(function() {
        $("#myTooltip").css("visibility", "hidden")
    }, 1000);
}

$(document).ready(function() {

    let modal = document.getElementById("modal");
    let modalButton = document.getElementById("showModal");
    let span = document.getElementsByClassName("close")[0];

    modalButton.onclick = function() {
        modal.style.display = "block";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        document.getElementById("footer").style.zIndex = "0";
        document.getElementById("header").style.zIndex = "1";
    }

    span.onclick = function() {
        callCancelFetch();
        modal.style.display = "none";
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        document.getElementById("footer").style.zIndex = "2";
        document.getElementById("header").style.zIndex = "2";
    }

});

let flag = true;
let isTitleSorted = true;
let isReleaseDateSorted = false;
let isAppidSorted = false;
let isOnSaleSorted = false;
let isPreOrderSorted = false;
let isPriceSorted = false;

//I know... this function is disgusting... but it works.
function headerSort(key) {
    let arrow = "";
    switch (key) {
        case 0:
            dataArray.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
            isTitleSorted = !isTitleSorted;
            if (isTitleSorted !== false) {
                if (document.getElementsByClassName("arrow")[5] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[0];
                    arrow.classList.remove('down');
                    arrow.classList.add('up');
                    arrow = document.getElementsByClassName("arrow")[5];
                } else {
                    arrow = document.getElementsByClassName("arrow")[0];
                }
                arrow.classList.remove('down');
                arrow.classList.add('up');
            } else {
                dataArray.reverse();
                if (document.getElementsByClassName("arrow")[5] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[0];
                    arrow.classList.remove('up');
                    arrow.classList.add('down');
                    arrow = document.getElementsByClassName("arrow")[5];
                } else {
                    arrow = document.getElementsByClassName("arrow")[0];
                }
                arrow.classList.remove('up');
                arrow.classList.add('down');
            }
            break;
        case 1:
			dataArray.sort(function(a, b) {
				const COMING_SOON = 'Coming soon';
				const DATE_UNKNOWN = 'Date Unknown';
				if (a.releaseDateFormatted === COMING_SOON) return 0;
				if (b.releaseDateFormatted === COMING_SOON) return 1;
				if (a.releaseDateFormatted === DATE_UNKNOWN) return 1;
				if (b.releaseDateFormatted === DATE_UNKNOWN) return 0;
				return Number(a.releaseDate) - Number(b.releaseDate);
			});
            isReleaseDateSorted = !isReleaseDateSorted;
            if (isReleaseDateSorted) {
                if (document.getElementsByClassName("arrow")[6] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[1];
                    arrow.classList.remove('up');
                    arrow.classList.add('down');
                    arrow = document.getElementsByClassName("arrow")[6];
                } else {
                    arrow = document.getElementsByClassName("arrow")[1];
                }
                arrow.classList.remove('up');
                arrow.classList.add('down');
            } else {
                dataArray.reverse();
                if (document.getElementsByClassName("arrow")[6] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[1];
                    arrow.classList.remove('down');
                    arrow.classList.add('up');
                    arrow = document.getElementsByClassName("arrow")[6];
                } else {
                    arrow = document.getElementsByClassName("arrow")[1];
                }
                arrow.classList.remove('down');
                arrow.classList.add('up');
            }
            break;
        case 2:
			dataArray.sort((a, b) => a.appid - b.appid);
            isAppidSorted = !isAppidSorted;
            if (isAppidSorted) {
                if (document.getElementsByClassName("arrow")[7] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[2];
                    arrow.classList.remove('up');
                    arrow.classList.add('down');
                    arrow = document.getElementsByClassName("arrow")[7];
                } else {
                    arrow = document.getElementsByClassName("arrow")[2];
                }
                arrow.classList.remove('up');
                arrow.classList.add('down');
            } else {
                dataArray.reverse();
                if (document.getElementsByClassName("arrow")[7] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[2];
                    arrow.classList.remove('down');
                    arrow.classList.add('up');
                    arrow = document.getElementsByClassName("arrow")[7];
                } else {
                    arrow = document.getElementsByClassName("arrow")[2];
                }
                arrow.classList.remove('down');
                arrow.classList.add('up');
            }
            break;
        case 3:
        dataArray.sort(function(a, b) {
            const NO_SALE = 'No';
            if (a.discountPercentUnformatted === NO_SALE) return 1;
            if (b.discountPercentUnformatted === NO_SALE) return 0;
            return b.discountPercentUnformatted - a.discountPercentUnformatted;
        });
            isOnSaleSorted = !isOnSaleSorted;
            if (isOnSaleSorted) {
                if (document.getElementsByClassName("arrow")[8] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[3];
                    arrow.classList.remove('up');
                    arrow.classList.add('down');
                    arrow = document.getElementsByClassName("arrow")[8];
                } else {
                    arrow = document.getElementsByClassName("arrow")[3];
                }
                arrow.classList.remove('up');
                arrow.classList.add('down');
            } else {
                dataArray.reverse();
                if (document.getElementsByClassName("arrow")[8] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[3];
                    arrow.classList.remove('down');
                    arrow.classList.add('up');
                    arrow = document.getElementsByClassName("arrow")[8];
                } else {
                    arrow = document.getElementsByClassName("arrow")[3];
                }
                arrow.classList.remove('down');
                arrow.classList.add('up');
            }
            break;
        case 4:
			dataArray.sort((a, b) => b.preOrderBoolean - a.preOrderBoolean);
            isPreOrderSorted = !isPreOrderSorted;
            if (isPreOrderSorted) {
                if (document.getElementsByClassName("arrow")[9] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[4];
                    arrow.classList.remove('up');
                    arrow.classList.add('down');
                    arrow = document.getElementsByClassName("arrow")[9];
                } else {
                    arrow = document.getElementsByClassName("arrow")[4];
                }
                arrow.classList.remove('up');
                arrow.classList.add('down');
            } else {
                dataArray.reverse();
                if (document.getElementsByClassName("arrow")[9] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[4];
                    arrow.classList.remove('down');
                    arrow.classList.add('up');
                    arrow = document.getElementsByClassName("arrow")[9];
                } else {
                    arrow = document.getElementsByClassName("arrow")[4];
                }
                arrow.classList.remove('down');
                arrow.classList.add('up');
            }
            break;
        case 5:
            dataArray.sort(function(a, b) { //Broken. All Free Objects must be moved to the top, All N/A Objects must be placed on the bottom and then the price must be sorted accurately. dataArray[#].free = True = free. dataArray[#].free = False = N/A.
                const FREE = "false";
				if (a.free === FREE) return 0;
				if (b.free === FREE) return 1;
				return Number(a.priceUnformatted) - Number(b.priceUnformatted);
            });
            isPriceSorted = !isPriceSorted;
            if (isPriceSorted) {
                if (document.getElementsByClassName("arrow")[10] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[5];
                    arrow.classList.remove('up');
                    arrow.classList.add('down');
                    arrow = document.getElementsByClassName("arrow")[10];
                } else {
                    arrow = document.getElementsByClassName("arrow")[5];
                }
                arrow.classList.remove('up');
                arrow.classList.add('down');
            } else {
                dataArray.reverse();
                if (document.getElementsByClassName("arrow")[10] !== undefined) {
                    arrow = document.getElementsByClassName("arrow")[5];
                    arrow.classList.remove('down');
                    arrow.classList.add('up');
                    arrow = document.getElementsByClassName("arrow")[10];
                } else {
                    arrow = document.getElementsByClassName("arrow")[5];
                }
                arrow.classList.remove('down');
                arrow.classList.add('up');
            }
            break;
    }
    displayTable();
}

function cookieEasterEgg() {
        document.getElementById("cookieTooltip").style.visibility = "visible";
        setTimeout(cookieEasterEggHide, 3000)
}

function cookieEasterEggHide() {
        document.getElementById("cookieTooltip").style.visibility = "hidden";
}
