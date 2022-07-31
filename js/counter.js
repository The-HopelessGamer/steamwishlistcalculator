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
