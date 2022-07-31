$(document).ready(function() {
	let x, i, j, selElmnt, opt = "AutoDetect",
		a, b, c;
	x = document.getElementsByClassName("customSelect");
	for (i = 0; i < x.length; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		a = document.createElement("DIV");
		a.setAttribute("class", "selectSelected");
		a.setAttribute("id", "selectSelected");
		a.setAttribute("value", opt);
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		b = document.createElement("DIV");
		b.setAttribute("class", "selectItems selectHide");
		b.setAttribute("id", "selectItems");
		for (j = 0; j < selElmnt.length; j++) {
			c = document.createElement("DIV");
			opt = selElmnt.options[j].value;
			c.setAttribute("value", opt);
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function(e) {
				let y, i, k, s, h;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				h = this.parentNode.previousSibling;
				for (i = 0; i < s.length; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						var tet = document.getElementById("selectList");
						tet.selectedIndex = i;
						let opt = selElmnt.options[selElmnt.selectedIndex].getAttribute('value');
						h.setAttribute("value", opt);
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("sameAsSelected");
						for (k = 0; k < y.length; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "sameAsSelected");
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("selectHide");
			this.classList.toggle("selectArrowActive");
		});
	}

	function closeAllSelect(elmnt) {
		let x, y, i, arrNo = [];
		x = document.getElementsByClassName("selectItems");
		y = document.getElementsByClassName("selectSelected");
		for (i = 0; i < y.length; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("selectArrowActive");
			}
		}
		for (i = 0; i < x.length; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("selectHide");
			}
		}
	}
	document.addEventListener("click", closeAllSelect);
});
