//Global Variables
let getHyperLinks = "";
let jsonAppids = "";
let seperator = "<span class='seperator'> | </span>";
let pageLoadComplete = true;
let resultsLoaded = false; //Sets whether the wishlist data has loaded or not.
let unlistedAppidTotal = 0;
let unlistedTitles = "";
let unlistedAppids = "";
//Global Arrays
let rowArray = []; //Contains all the row elements.
let dataArray = []; //Append all retrieved appids/keys/titles to an Array.
//Global CDS Variables.
let currency = "";
let countryCode = "";
let currencySymbol = "";
let currencySymbolCheck = ""; //Sets the symbol to look for when looking for the symbol through the prices.
let currencySymbolRight = " "; //Adds a space for the right currency symbol.
let currencySymbolNumber = ""; //Sets the amount of characters that are before the Currency Symbol. Example for the Canadian Currency: "CDN$ = 3" So there are 3 characters before the Currency Symbol: $.

let originalFormattedPriceTotal = 0;
let formattedPrice = 0;


function calculateResult(profileNameHyperLink, profileId, countryCode, sale, withPrice, priceEmpty, freeTitles, preOrder) {
  //Display results once called by the main function.
  setTimeout(function () {
    sortBy();
    let priceTotal = 0;
    let originalPriceTotal = 0;
    for (key in dataArray) {
      //For each using keys instead of indexes.
      if (dataArray.hasOwnProperty(key)) {
        if (dataArray[key]["priceUnfiltered"] !== "") {
          //Extract the price and add it to the total.
          let price = dataArray[key]["priceUnfiltered"].split('final_price">')[1].split("<")[0];
          let originalPrice = dataArray[key]["originalPrice"];
          if (currencySymbolRight !== currencySymbolCheck) { //If the price has a symbol on the right side of the price then we will keep only the contents on the left of split. If not then we will keep whats on the right of the split.
            //Check if it has a price (check if it's a number) Alt: Check that the symbol matches the character location.
            priceTotal += priceToFloat(price.split(currencySymbolCheck)[1]); //Calculates the prices and appends them to a variable.
            if (originalPrice !== "" && originalPrice !== undefined && sale > 0) {
              originalPriceTotal += priceToFloat(originalPrice.split(currencySymbolCheck)[1]);
              document.getElementById("salePricingButton").disabled = false;
            } else {
              originalPriceTotal = priceTotal;
              document.getElementById("salePricingButton").disabled = true;
            }
          } else if (currencySymbolRight == currencySymbolCheck) {
            priceTotal += priceToFloat(price.split(currencySymbolRight)[0]);
            if (originalPrice !== "" && originalPrice !== undefined && sale > 0) {
              originalPriceTotal += priceToFloat(originalPrice.split(currencySymbolRight)[0]);
              document.getElementById("salePricingButton").disabled = false;
            } else {
              originalPriceTotal = priceTotal;
              document.getElementById("salePricingButton").disabled = true;
            }
          }
        }
      }
    }
    switch (
      countryCode //Check what currency type was selected and use the corrosponding formatting for the selected currency type.
    ) {
      case "VN":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 3, ".", ".") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 3, ".", ".") + currencySymbolRight;
        break;
      case "AR":
      case "PL":
      case "TR":
      case "NL":
      case "NO":
      case "EU":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 2, ".", ",") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 2, ".", ",") + currencySymbolRight;
        break;
      case "JP":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 0, ",", ",") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 0, ",", ",") + currencySymbolRight;
        break;
      case "IN":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 0, ",", ".") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 0, ",", ".") + currencySymbolRight;
        break;
      case "PH":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 2, "", ".") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 2, "", ".") + currencySymbolRight;
        break;
      case "CR":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 3, ",", ".") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 3, ",", ".") + currencySymbolRight;
        break;
      case "RU":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 0, "", "") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 0, "", "") + currencySymbolRight;
        break;
      case "BR":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 2, ".", ",") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 2, ".", ",") + currencySymbolRight;
        break;
      case "KZ":
      case "ID":
      case "UA":
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol, 0, " ", " ") + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol, 0, " ", " ") + currencySymbolRight;
        break;
      default:
        originalFormattedPriceTotal = accounting.formatMoney(originalPriceTotal, currencySymbol) + currencySymbolRight;
        formattedPrice = accounting.formatMoney(priceTotal, currencySymbol) + currencySymbolRight;
        break;
    }
    toggle = false;
    ToggleSalePricing();

    //Display the data
    document.getElementById("titleCount").innerHTML = formatNumber(dataArray.length);
    document.getElementById("onSale").innerHTML = formatNumber(sale);
    document.getElementById("preOrder").innerHTML = formatNumber(preOrder);
    document.getElementById("withoutPrice").innerHTML = formatNumber(priceEmpty);
    document.getElementById("withPrice").innerHTML = formatNumber(withPrice);
    document.getElementById("isFree").innerHTML = formatNumber(freeTitles);
    document.getElementById("unlisted").innerHTML = formatNumber(unlistedAppidTotal);
    document.getElementById("profileName").innerHTML = profileNameHyperLink;
    let urlShare = window.location.protocol + "//" + window.location.host + window.location.pathname + "?id=" + profileId + "&currency=" + countryCode; //Set the parameters for the URL.
    window.history.pushState(
      {
        path: urlShare,
      },
      "",
      urlShare
    ); //Append the parameters to the URL.
    //Remove the loader and un-hide the result box
    displayTable();
    getHyperLinks = createHyperLinks();
    onWishlist(); //Loads the correct page (On wishlist) for the wishlist exportation modal.
    wishlistCounter(); //Increments the total for the wishlists that have been calculated.
    styleSetDataContainer(); //Sets the styling for the Data Container and displays it.
  }, 700);
}

//CORE FUNCTION:

function main(wishlistUrlType = "profiles") {
  (async () => {
    let sale = 0,
      priceEmpty = 0,
      priceEmptyBoolean,
      freeTitles = 0,
      priceEmptyIds = "",
      withPriceIds = "",
      onSaleIds = "",
      allAppids = "",
      priceUnformatted,
      macCompatible = false,
      winCompatible = false,
      linuxCompatible = false,
      vrSupported = false,
      vrOnly = false,
      releaseDateFormatted = "",
      withPrice = 0,
      withPriceBoolean,
      preOrder = 0,
      preOrderBoolean,
      freeBoolean = false;

    //Values to be reset
    dataArray = [];
    unlistedAppidTotal = 0;
    unlistedTitles = "";
    unlistedAppids = "";
    preOrderIds = "";

    try {
      let extraMain = document.getElementById("extraMain").value.length; //If main form is empty, halt submission.
      if (extraMain !== 0) {
        return false;
      }
      pageLoadComplete = false; //Sets the page load to false, e.g page is currently loading. Prevents the page from changing before the results display. Otherwise it causes issues with the results displaying on a different page and doing weird stuff.
      displayLoader();
      //Starting scraping process!
      if (wishlistUrlType) {
        let wishlistSize, i, windowLocation; //Currency list. Check what currency the user selected then change the variables to the corresponding values.
        windowLocation = window.location.href;
        let urlCurrencyIndex = windowLocation.indexOf("&currency"); //Get the paremeters from the URL.
        let empty = document.getElementById("userInput").value; //Get the value from the input field in the main form.
        if (empty === "") {
          //Checking if form input is empty. If so dont submit form. If not submit form.
          return false;
        } else {
          let urlId = "";
          let xmlhttp = new XMLHttpRequest();
          let httpCheck = document.getElementById("userInput").value.replace(/ /g, ""); //assign the contents of the input field to httpCheck. We also remove the spaces.
          let http = httpCheck.indexOf("http://"); //Check if httpCheck includes http.
          let https = httpCheck.indexOf("https://"); //Check if httpCheck includes https.
          if (http && https == -1) {
            //If the variables "http" and "https" do not equal "https://" or "http://" then we will use the following method for getting the wishlist.
            url = "https://store.steampowered.com/wishlist/" + wishlistUrlType + "/" + document.getElementById("userInput").value.replace(/ /g, "");
          } else {
            //If the http and/or https variables include "https://" or "http://" in the input field then we will check if it has "ID" or "Profiles" in the url then grab the ID.
            let httpId = httpCheck.indexOf("id/"); //Check if httpCheck includes "id/" then assign that letiable to httpId.
            let httpProfile = httpCheck.indexOf("profiles/"); //Check if httpCheck includes "profiles/" then assign that letiable to httpProfile.
            if (httpId !== -1) {
              //If httpId includes "id/" then we split what is on the right of that.
              urlId = httpCheck.split("id/")[1];
            } else if (httpProfile !== -1) {
              //If httpProfile includes "profiles/" then we split what is on the right of that.
              urlId = httpCheck.split("profiles/")[1];
            } else {
              throwError();
              document.getElementById("errorText").innerHTML = "Error: Invalid id!";
              return false;
            }
            let urlIdFinal = urlId.split("/")[0].split("#")[0]; //If we have a user ID then we split what is on the right of the ID. Then we assign the ID to the letiable "urlIdFinal".
            document.getElementById("userInput").value = urlIdFinal; //Assign the ID taken from the URL to the input field to be added to the URL as a parameter later.
          }
          xmlhttp.open("GET", "php/main.php?urlType=" + wishlistUrlType + "&profileId=" + document.getElementById("userInput").value.replace(/[\s\/]|#| /g, "") + "&switch=false", true); //Get the steam wishlist webpage using PHP.
          xmlhttp.send();
          xmlhttp.onreadystatechange = function () {
            //If the request was successful
            let profileId = document.getElementById("userInput").value.replace(/[\s\/]|#| /g, ""); //Assign the user profile id to a letiable and remove the spaces and forward slashes.
            if (this.readyState == 4 && this.status == 200) {
              let html = this.responseText; //This contain the raw code from the wishlist page.
              let titleCheck = html.indexOf("wishlist</title>"); //Check the title in the response to see if we got redirected.
              if (titleCheck === -1) {
                //If the final url does NOT contain "wishlist</title>" then we were redirected.
                if (wishlistUrlType == "profiles") {
                  //Have we tried using "id" yet?
                  main("id"); //Try everything again with the other url type "id".
                } else {
                  throwError();
                  document.getElementById("errorText").innerHTML = "Error: Invalid id!";
                }
              } else {
                //We weren't redirected
                try {
                  let htmlAppid = html.split("var g_rgWishlistData = ")[1].split("var g_rgAppInfo = ")[0].trim().replace(/;+$/, "");
                  var pageCount = html.split("var g_nAdditionalPages = ")[1].split(";")[0];
                  if (pageCount > 500) {
                    wishlistSizeLimitReached();
                    return false;
                  }
                  jsonAppids = JSON.parse(htmlAppid); //This now contains the json data from the wishlist on steam.
                } catch (error) {
                  console.log(error);
                  throwError();
                  document.getElementById("errorText").innerHTML = "Error: Unknown!";
                  return false;
                }
                let profileName = html.split("<title>")[1]; //Get the users profile name to display at the top of the wishlist container.
                profileName = profileName.split("</title>")[0]; //https://store.steampowered.com/wishlist/id/The_HopelessGamer/
                let profileNameHyperLink = '<a href="https://store.steampowered.com/wishlist/' + wishlistUrlType + "/" + profileId + '" class="titleLinks" title="' + profileName + '" target="_blank">' + profileName + "</a>";
                wishlistSize = html.indexOf("g_nAdditionalPages = 0;");
                if (wishlistSize == -1) {
                  //The wishlist is empty or the profile is private.
                  let wishlistData = "";
                  const getData = async () => {
                    //Get each wishlist page that contains the json for the wishlist.
                    if (urlCurrencyIndex !== -1) {
                      countryCode = currency;
                    } else {
                      countryCode = document.getElementById("selectSelected").getAttribute("value");
                    }
                    if (countryCode == "AutoDetect" || countryCode == "autodetect") {
                      //Auto detection system for the currency.
                      try {
                        let response = await fetch("php/ip2country.php");
                        response = await response.text();
                        countryCode = response.slice(0, 2);
                        callSwitch(countryCode);
                      } catch (error) {
                        countryCode = "US";
                        callSwitch(countryCode);
                        console.log(error);
                        alert("Error: Unable to detect currency. Defaulted to USD.");
                      }
                    } else {
                      callSwitch(countryCode);
                    }

                    for (let pageNumber = 0; pageNumber < pageCount; pageNumber++) {
                      wishlistData = await fetch("php/main.php?urlType=" + wishlistUrlType + "&profileId=" + profileId + "&pageNumber=" + pageNumber + "&cc=" + countryCode + "&switch=true");
                      try {
                        wishlistData = await wishlistData.json(); //parse it as json.
                        if (wishlistData.error == "true") {
                          throwError();
                          document.getElementById("errorText").innerHTML = "Error: Rate Limit Exceeded! Please try again in 60 seconds.";
                          return false;
                        }
                        allAppids += Object.keys(wishlistData);
                        let progress = (100.0 / pageCount) * (pageNumber + 1); //calculates the percentage for the loading bar.
                        setProgressBarWidth(progress); //Sets the percentage of the loading bar.
                      } catch (error) {
                        console.log(error);
                        throwError();
                        document.getElementById("errorText").innerHTML = "Error: Unknown!";
                        return false;
                      }
                      for (key in wishlistData) {
                        //For each key we will loop over the response from the fetch.
                        if (wishlistData[key]["subs"][0] !== undefined) {
                          //Only grab games that have a price.
                          var priceUnfiltered = wishlistData[key]["subs"][0]["discount_block"];
                          var price = wishlistData[key]["subs"][0]["discount_block"].split('final_price">')[1].split("<")[0];
                          var discountPercent = "N/A";
                          var discountPercentUnformatted = 0;
                          var originalPrice = "";
                          var originalPriceStyled = "";
                          var onSaleBoolean;
                          priceUnformatted = wishlistData[key]["subs"][0]["price"];
                          console.log(priceUnformatted);
                          if (wishlistData[key]["subs"][0]["discount_pct"] !== null) {
                            sale++;
                            onSaleIds += key + seperator;
                            discountPercent = "-" + wishlistData[key]["subs"][0]["discount_pct"] + "%";
                            discountPercentUnformatted = wishlistData[key]["subs"][0]["discount_pct"];
                            /*
                             * For some weird reason during scraping, some game data is not obtained which means it will skip a price and cause an error. Looking into it atm.
                             * Added a temporary solution for the time being. If a game bugs out during scraping, skip it, log it in the console and continue on.
                             * This prevents the scrape from stopping completely. Not the best way of handling the issue but for the meantime it works.
                             * This has a side effect of adding a small discrepancy in total price accuracy. Big problem. Must fix.
                             */
                            try {
                              if (wishlistData[key]["win"] !== undefined) {
                                winCompatible = true;
                              } else {
                                winCompatible = false;
                              }
                              originalPrice = wishlistData[key]["subs"][0]["discount_block"].split('original_price">')[1].split("<")[0];
                              originalPriceStyled = "<span style='text-decoration: line-through;'>" + originalPrice + "</span>";
                            } catch (error) {
                              originalPriceStyled = "<span style='text-decoration: none;'> N/A </span>";
                              console.log(error + " | Appid: " + key);
                            }
                          } else {
                            originalPrice = price;
                          }
                          withPrice++;
                          withPriceIds += key + seperator;
                        } else {
                          priceEmpty++;
                          priceEmptyIds += key + seperator;
                          priceUnformatted = 0;
                          priceUnfiltered = "";
                        }
                        if (wishlistData[key]["mac"] !== undefined) {
                          macCompatible = true;
                        } else {
                          macCompatible = false;
                        }
                        if (wishlistData[key]["win"] !== undefined) {
                          winCompatible = true;
                        } else {
                          winCompatible = false;
                        }
                        if (wishlistData[key]["linux"] !== undefined) {
                          linuxCompatible = true;
                        } else {
                          linuxCompatible = false;
                        }
                        if (wishlistData[key]["platform_icons"].includes("VR Supported")) {
                          vrSupported = true;
                        } else {
                          vrSupported = false;
                        }
                        if (wishlistData[key]["vr_only"] !== undefined) {
                          vrOnly = true;
                          vrSupported = true;
                        } else {
                          vrOnly = false;
                        }
                        if (wishlistData[key]["prerelease"] === 1) {
                          preRelease = wishlistData[key]["prerelease"];
                        } else {
                          preRelease = "";
                        }
                        if (preRelease === 1) {
                          if (wishlistData[key]["subs"][0] !== undefined) {
                            preOrder++;
                            preOrderIds += key + seperator;
                          }
                          releaseDateFormatted = "Coming Soon";
                        } else if (wishlistData[key]["release_date"] <= 1) {
                          releaseDateFormatted = "Date Unknown";
                        } else {
                          releaseDateFormatted = new Date(wishlistData[key]["release_date"] * 1000).toLocaleDateString();
                        }
                        if (onSaleIds.includes(key)) {
                          onSaleBoolean = true;
                        } else {
                          onSaleBoolean = false;
                          discountPercentUnformatted = 0;
                          discountPercent = "N/A";
                        }
                        if (withPriceIds.includes(key)) {
                          withPriceBoolean = true;
                        } else {
                          withPriceBoolean = false;
                        }
                        if (preOrderIds.includes(key)) {
                          preOrderBoolean = true;
                        } else {
                          preOrderBoolean = false;
                        }
                        if (priceEmptyIds.includes(key)) {
                          priceEmptyBoolean = true;
                        } else {
                          priceEmptyBoolean = false;
                        }
                        if (wishlistData[key]["is_free_game"] === true && releaseDateFormatted !== "Coming Soon") {
                          freeTitles++;
                          freeBoolean = true;
                        } else {
                          freeBoolean = false;
                        }
                        dataArray.push({
                          title: wishlistData[key]["name"],
                          free: freeBoolean,
                          type: wishlistData[key]["type"],
                          preRelease: preRelease,
                          onSaleBoolean: onSaleBoolean,
                          preOrderBoolean: preOrderBoolean,
                          priceEmptyBoolean: priceEmptyBoolean,
                          withPriceBoolean: withPriceBoolean,
                          priceEmpty: priceEmpty,
                          withPrice: withPrice,
                          macCompatible: macCompatible,
                          linuxCompatible: linuxCompatible,
                          winCompatible: winCompatible,
                          vrSupported: vrSupported,
                          vrRequired: vrOnly,
                          tags: wishlistData[key]["tags"],
                          releaseString: wishlistData[key]["release_string"],
                          releaseDate: wishlistData[key]["release_date"],
                          releaseDateFormatted: releaseDateFormatted,
                          discountPercentage: discountPercent,
                          discountPercentUnformatted: discountPercentUnformatted,
                          originalPriceStyled: originalPriceStyled,
                          originalPrice: originalPrice,
                          appid: key,
                          price: price,
                          priority: wishlistData[key]["priority"],
                          url: '<a href="http://store.steampowered.com/app/' + key + '/" class="titleLinks" title="' + wishlistData[key]["name"] + '" target="_blank">' + wishlistData[key]["name"] + "</a>",
                          priceUnformatted: priceUnformatted,
                          priceUnfiltered: priceUnfiltered
                        });
                        price = "";
                      }
                    }
                    dataArray.sort(function (a, b) {
                      if (a.title !== null && b.title !== null) {
                        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
                      }
                    }); //Sort by title A - B.
                    for (let i = 0; i < jsonAppids.length; i++) {
                      //Get unlisted games
                      if (allAppids.includes(jsonAppids[i]["appid"])) {
                        jsonAppids[i].unlistedGame = false;
                      } else {
                        unlistedAppidTotal++;
                        jsonAppids[i].unlistedGame = true;
                        unlistedAppids += '<a href="https://steamdb.info/app/' + jsonAppids[i]["appid"] + '/" class="titleLinks" title="' + jsonAppids[i]["appid"] + '" target="_blank">' + jsonAppids[i]["appid"] + "</a>" + seperator;
                      }
                    }
                    calculateResult(profileNameHyperLink, profileId, countryCode, sale, withPrice, priceEmpty, freeTitles, preOrder);
                    return wishlistData;
                  };
                  getData();
                } else if (wishlistSize !== -1) {
                  throwError();
                  document.getElementById("wishlist-container").style.width = "500px";
                  document.getElementById("profileName").style.display = "block";
                  document.getElementById("profileName").innerHTML = profileName;
                  document.getElementById("errorText").innerHTML = "Error: Wishlist is Empty or Private!";
                }
              }
            }
          };
        }
      }
    } catch (error) {
      console.log(error);
      throwError();
      document.getElementById("errorText").innerHTML = "Error: Unknown!";
      return false;
    }
  })();
}

//END CORE FUNCTION!
