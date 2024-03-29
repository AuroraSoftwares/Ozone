/*!
 * Ozone-v1.0
 * ozone.js
 * Copyright : ©2021 | Aurora Softwares
 */

(function (global, factory) 
{
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports):
	typeof define === 'function' && define.amd ? define(['exports'], factory):
	(factory((global.Ozone = {})));
}

(this, (function (exports)
{
	'use strict';
   /*!
	* Functions and variables for core functionalities. 
	* These functions and variables are kept private, to prevent collision with other files, 
	* and cannot be called outside of this file, until the code is modified. 
	*/

	function format12Hour(hour)
	{
		var hr = 0;
		if (hour > 12 || hour === 0)
		{
			switch(hour)
			{
				case 13 : hr = 1; break; case 14 : hr = 2; break; case 15 : hr = 3; break; case 16 : hr = 4; break;
				case 17 : hr = 5; break; case 18 : hr = 6; break; case 19 : hr = 7; break; case 20 : hr = 8; break;
				case 21 : hr = 9; break; case 22 : hr = 10; break; case 23 : hr = 11; break; case 0 : hr = 12; break;
			}
		} 
		else
		{
			hr = hour;
		}
		return hr;
	}

	function getTimeShift()
	{
		var ts = (new Date().getHours()*3600)+(new Date().getMinutes()*60)+new Date().getSeconds();
		var sft = null;
		if(ts < 43201)
		{
			sft = "am";
		}
		else if(ts > 43200)
		{
			sft = "pm";
		}
		return sft;
	}

	function getDayName(dayCount)
	{
		var dys = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return dys[dayCount];
	}

	function getDayNameShort(dayCount)
	{
		var dys = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return dys[dayCount];
	}

	function getDateSuffix(date)
	{
		var suf = "";
		switch (date)
		{
			case 1: case 21: case 31 : suf = "st"; break;
			case 2: case 22 : suf = "nd"; break;
			case 3: case 23 : suf = "rd"; break;
			default: suf = "th";
		}
		return suf;
	}

	function getMonthName(month)
	{
		var mons = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return mons[month];
	}

	function getMonthNameShort(month)
	{
		var mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return mons[month];
	}

	function setCalendar()
	{
		var d = new Date();
		var dt = d.getDate();
		var mn = d.getMonth();
		var yr = d.getYear() + 1900;

		$(".oz-calendar-full").html(dt+getDateSuffix(dt)+" " + getMonthName(mn) + ", " + yr + ", " + getDayName(d.getDay()));
		$(".oz-calendar-short").html(addZero(dt, 2)+" " + getMonthNameShort(mn) + ", " + yr + ", " + getDayNameShort(d.getDay()));
		$(".oz-calendar").html(addZero(dt, 2)+"-" + addZero((mn+1), 2) + "-" + yr);

		$(".oz-calendar-full").val(dt+getDateSuffix(dt)+" " + getMonthName(mn) + ", " + yr + ", " + getDayName(d.getDay()));
		$(".oz-calendar-short").val(addZero(dt, 2)+" " + getMonthNameShort(mn) + ", " + yr + ", " + getDayNameShort(d.getDay()));
		$(".oz-calendar").val(addZero(dt, 2)+"-" + addZero((mn+1), 2) + "-" + yr);
		var t = setTimeout(function()
		{
			setCalendar();
		}, 1);
	}

	function setClock12()
	{
		var d = new Date();
		var h = format12Hour(d.getHours());
		var m = d.getMinutes();
		var s = d.getSeconds();

		h = addZero(h, 2);
		m = addZero(m, 2);
		s = addZero(s, 2);
		$(".oz-clock-12").html(h + ":" + m + ":" + s + " " + getTimeShift());
		$(".oz-clock-12").val(h + ":" + m + ":" + s + " " + getTimeShift());
		var t = setTimeout(function()
		{
			setClock12();
		}, 1);
	}

	function setClock24()
	{
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();

		h = addZero(h, 2);
		m = addZero(m, 2);
		s = addZero(s, 2);
		$(".oz-clock-24").html(h + ":" + m + ":" + s);
		$(".oz-clock-24").val(h + ":" + m + ":" + s);
		var t = setTimeout(function()
		{
			setClock24();
		}, 1);
	}

	function setYear()
	{
		$(".oz-year").html(new Date().getFullYear());
		$(".oz-year").val(new Date().getFullYear());
		var t = setTimeout(function()
		{
			setYear();
		}, 1);
	}

	function setMonth()
	{
		$(".oz-month").html(new Date().getMonth()+1);
		$(".oz-month").val(new Date().getMonth()+1);
		var t = setTimeout(function()
		{
			setYear();
		}, 1);
	}

	function setFormattedMonth()
	{
		$(".oz-month-formatted").html(addZero((new Date().getMonth()+1), 2));
		$(".oz-month-formatted").val(addZero((new Date().getMonth()+1), 2));
		var t = setTimeout(function()
		{
			setYear();
		}, 1);
	}

	function setDate()
	{
		$(".oz-date").html(new Date().getDate());
		$(".oz-date").val(new Date().getDate());
		var t = setTimeout(function()
		{
			setYear();
		}, 1);
	}

	function setFormattedDate()
	{
		$(".oz-date-formatted").html(addZero(new Date().getDate(), 2));
		$(".oz-date-formatted").val(addZero(new Date().getDate(), 2));
		var t = setTimeout(function()
		{
			setYear();
		}, 1);
	}

	function setMonthName()
	{
		$(".oz-month-name").html(getMonthName(new Date().getMonth()));
		$(".oz-month-name").val(getMonthName(new Date().getMonth()));
		var t = setTimeout(function()
		{
			setYear();
		}, 1);
	}

	function setDayName()
	{
		$(".oz-day-name").html(getDayName(new Date().getDay()));
		$(".oz-day-name").val(getDayName(new Date().getDay()));
		var t = setTimeout(function()
		{
			setYear();
		}, 1);
	}

	var navbarToggled = false;
	var sidebarToggled = false;
	var navBar = $("nav .navbar");
	var foo = $("footer");
	var navMenu = $("nav .navbar .navbar-menu");

	var sbarTogCont = "<span class='sidebar-toggler'></span>";
	var sbar = $("nav .sidebar");
	var sbarMenu = $("nav .sidebar .sidebar-menu");
	var sbarMenuIt = $("nav .sidebar .sidebar-menu .sidebar-menu-item a.sidebar-link");
	var sbarTogL = "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><g><path d='m 17.002946,5.476938 -5.983318,10.627085 5.983318,10.269873 4.197251,0 -4.326058,-10.269873 4.326058,-10.627085 z' style='fill:#66ff66;stroke:none'/></g></svg>";
	var sbarTogR = "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><g><path d='m 15.216879,5.476938 5.983318,10.627085 -5.983318,10.269873 -4.197251,0 4.326058,-10.269873 -4.326058,-10.627085 z' style='fill:#00ffff;stroke:none'/></g></svg>";

	function fixNavbar()
	{
		var togThemeCol = navBar.attr("toggle-button-color");
		if(togThemeCol==null)
		{
			togThemeCol = "#ffffff";
		}

		var navTogCon = 
		"<button class='navbar-toggler'>" +
		"<svg xmlns='http://www.w3.org/2000/svg' width='40px' height='34px'>" +
		"<rect width='28px' height='4px' x='6.4px' y='7.5' style='fill:"+togThemeCol+"; stroke:none'/>" +
		"<rect width='28px' height='4px' x='6.4px' y='16.5' style='fill:"+togThemeCol+"; stroke:none'/>" +
		"<rect width='28px' height='4px' x='6.4px' y='25.5' style='fill:"+togThemeCol+"; stroke:none'/>" +
		"</svg>" +
		"</button>";

		var useTogBtn = navBar.attr("use-toggle-button");
		if(useTogBtn.toLowerCase()=="true")
		{
			navBar.prepend(navTogCon);
			var navBarTogBtn = $("nav .navbar .navbar-toggler");
			navBarTogBtn.animate({opacity:1}, 1800);
		}
		else if(useTogBtn.toLowerCase()=="false")
		{
			var navBarTogBtn = $("nav .navbar .navbar-toggler");
			navBarTogBtn.remove();
		}
	}

	function toggleNavbar()
	{
		var navBarTogBtn = $("nav .navbar .navbar-toggler");
		navBarTogBtn.click(function()
		{
			navMenu.stop(true, true);

			var sbarTog = $("nav .sidebar .sidebar-toggler");
			if(sidebarToggled)
			{
				sbarMenuIt.animate({opacity:0}, 150);
				sbarMenu.hide(500);
				sbarTog.animate({left:9.6}, 500);
				sbarTog.html(sbarTogR);
				sbarTog.css("border-color", "#06d");
				foo.animate({left:0}, 500);
				sidebarToggled = false;
			}

			if(!navbarToggled)
			{
				navMenu.css("display", "block").css("padding-bottom", "2rem");
				navMenu.hide(0);
				navMenu.show(500);
				navbarToggled = true;
			}
			else
			{
				navMenu.hide(500).css("display", "block").css("padding-bottom", "0");
				navbarToggled = false;
			}
		});
	}

	function fixSidebar()
	{
		var sbarW = sbar.width();
		sbar.prepend(sbarTogCont);
		var sbarTog = $("nav .sidebar .sidebar-toggler");
		sbarTog.html(sbarTogR);
		sbarTog.css("left",sbarW-(sbarTog.width()/2));
		sbarTog.animate({left:9.6}, 800);
		sbarMenuIt.animate({opacity:0}, 200);
		sbarMenu.hide(800);
		foo.animate({opacity:1}, 800);
	}

	function toggleSidebar()
	{
		var sbarW = sbar.width();
		var sbarTog = $("nav .sidebar .sidebar-toggler");

		sbarTog.click(function()
		{
			$(this).stop(true, true);
			sbarMenu.stop(true, true);
			sbarMenuIt.stop(true, true);

			if(navbarToggled)
			{
				navMenu.hide(500).css("display", "block").css("padding-bottom", "0");
				navbarToggled = false;
			}

			if(!sidebarToggled)
			{
				sbarMenu.show(500);
				sbarMenuIt.animate({opacity:1}, 1500);
				$(this).animate({left:sbarW - (($(this).width() / 2) + 7)}, 500);
				$(this).html(sbarTogL);
				$(this).css("border-color", "#0c0");
				foo.animate({left:sbarW}, 500);
				sidebarToggled = true;
			}
			else
			{
				sbarMenuIt.animate({opacity:0}, 150);
				sbarMenu.hide(500);
				$(this).animate({left:9.6}, 500);
				$(this).html(sbarTogR);
				$(this).css("border-color", "#06d");
				foo.animate({left:0}, 500);
				sidebarToggled = false;
			}
		});
	}

	function fixDialog()
	{
		var dlgBtn = $(".dialog-pop-btn");
		var dlgHdr = $(".dialog .dialog-wrapper .dialog-header:not(.hdr5d2ff9a215396da28ac90c5bbd1f824b)");
		var dlgCloser = "<span id='dialog-close-btn' class='dialog-close-btn' title='Close'>&times;</span>";
		dlgHdr.after(dlgCloser);

		dlgBtn.click(function()
		{
			var dlgId = $(this).attr("dialog");
			var dlg = $(dlgId);
			dlg.css("display","inline-block");

			$(".dialog-close-btn:not(.btn62c8322ae54a0f9281094481820c732e)").click(function()
			{
				dlg.css("display","none");
			});
		});
	}

	function fixContainer()
	{
		var cont = $(".container");
		var bg = cont.attr("background");
		cont.css("background", bg);
	}

	$(document).ready(function()
	{
		fixNavbar();
		fixSidebar();
		setCalendar();
		setClock12();
		setClock24();
		setYear();
		setMonth();
		setFormattedMonth();
		setMonthName();
		setDate();
		setFormattedDate();
		setDayName();
		toggleNavbar();
		toggleSidebar();
		fixDialog();
		fixContainer();

		$("button:not(.dropdown-button), *[type='button']:not(.dropdown-button), *[type='reset'], *[type='submit'], *[type='file'], *[type='date'], *[type='datetime-local'], select, *[type='month'], *[type='week'], *[type='time'], .navbar-toggler, .sidebar-toggler").click(function()
		{
			$(".dropdown-menu").css("display", "none");
		});
	});

   /*!
	* Public functions and variables
	*/
	function addZero(i, digits)
	{
		if(digits==2)
		{
			if(i<10)
			{
				i = "0" + i;
			}
		}
		else if(digits==3)
		{
			if(i<10)
			{
				i = "00" + i;
			}
			else if(i<100 && i>9)
			{
				i = "0" + i;
			}
		}
		else if(digits==4)
		{
			if(i<10)
			{
				i = "000" + i;
			}
			else if(i<100 && i>9)
			{
				i = "00" + i;
			}
			else if(i<1000 && i>99)
			{
				i = "0" + i;
			}
		}
		return i;
	}

	function getFileExtension(filepath)
	{
		return filepath.split('.').pop();
	};

	function getFilename(filepath)
	{
		return filepath.split('/').pop();
	};

	function loadMedia(fileInput, mediaOutput)
	{
		/*!
		 * 'mediaOutput' is any of the <img>, <video>, <iframe>, <embed> or <audio> element.
		 * 'fileInput' is the an <input type='file'> element.
		 */
		fileInput.change(function(event)
		{
			var tmp_url = URL.createObjectURL(event.target.files[0]);
			mediaOutput.attr("src", tmp_url);
		});
	};

	function loadBackgroundImage(fileInput, container, backgroundSize)
	{
		fileInput.change(function(event)
		{
			var tmp_url = URL.createObjectURL(event.target.files[0]);
			container.css("background", "url('"+tmp_url+"')");
			container.css("background-size", backgroundSize);
		});
	};

	function createAndShowDialog(dialogHeader, dialogBodyContents, themeColor, headerColor)
	{
		if(dialogHeader==null || dialogBodyContents==null || dialogHeader=="" || dialogBodyContents=="" || dialogHeader==" " || dialogBodyContents==" ")
		{
			dialogBodyContents = 
			"CAUSE : <code>createAndShowDialog("+dialogHeader+", "+dialogBodyContents+", "+themeColor+", "+headerColor+")</code><br><br>"+
			"Dialog header and dialog-body contents<br>should not be empty or null. Please add<br>header and dialog-body contents."+
			"<br><br><center><button class='btn62c8322ae54a0f9281094481820c732e'>&emsp;&emsp;&emsp;&emsp;OK&emsp;&emsp;&emsp;&emsp;</button></center>";
			dialogHeader = "WARNING !";
			themeColor = "#f50";
			headerColor = "#fff";
		}
		if(themeColor==null)
		{
			themeColor = "#333";
		}
		if(headerColor==null)
		{
			headerColor = "#fff";
		}
		var dlg = 
			"<div class='dialog dlg355109b2dba1b7ef8c62f5565989f362' style='display:inline-block;'>"+
			"<div class='dialog-wrapper' style='background:"+themeColor+"; border-color:"+themeColor+";'>"+
			"<div class='dialog-header hdr5d2ff9a215396da28ac90c5bbd1f824b' style='color:"+headerColor+";'>"+dialogHeader+"</div>"+
			"<span id='dialog-close-btn' class='dialog-close-btn btn62c8322ae54a0f9281094481820c732e' title='Close'>&times;</span>"+
			"<div class='dialog-body' style='color:"+themeColor+";'>"+dialogBodyContents+"</div>"+
			"</div></div>";
		$("body").append(dlg);
		$(".btn62c8322ae54a0f9281094481820c732e").click(function()
		{
			$(".dlg355109b2dba1b7ef8c62f5565989f362").css("display","none");
			$(".dlg355109b2dba1b7ef8c62f5565989f362").remove();
		});
		$(".dialog-close-btn").click(function()
		{
			$(".dlg355109b2dba1b7ef8c62f5565989f362").css("display","none");
			$(".dlg355109b2dba1b7ef8c62f5565989f362").remove();
		});
	}

	function compareInputValues(firstInput, secondInput)
	{
		var defCol = secondInput.css("color");
		var defBCol = secondInput.css("border-color");
		function compare()
		{
			var m = false;
			if(firstInput.val() == secondInput.val())
			{
				m = true;
			}
			else
			{
				m = false;
			}
			var t2 = setTimeout(function()
			{
				compare();
			}, 1);
			return m;
		}
		return compare();
	}

	function setDropdown(dropdown)
	{
		var dd = $(dropdown);
		var dbtn = $(dropdown+" .dropdown-button");
		var dmenu = $(dropdown+" .dropdown-menu");
		dbtn.click(function()
		{
			$(".dropdown-menu:not("+dropdown+" .dropdown-menu)").css("display", "none");
			if(dmenu.css("display")=="none")
			{
				dmenu.css("display", "block");
			}
			else if(dmenu.css("display")=="block")
			{
				dmenu.css("display", "none");
			}
		});
	}

	function setFilter(object, filterPanel)
	{
		$(object).css("-webkit-filter", "hue-rotate("+$(filterPanel+" #hueFltr").val()+"deg) saturate("+$(filterPanel+" #satFltr").val()+"%) brightness("+$(filterPanel+" #brgFltr").val()+"%) contrast("+$(filterPanel+" #ctrFltr").val()+"%) grayscale("+$(filterPanel+" #grsFltr").val()+"%) sepia("+$(filterPanel+" #sepFltr").val()+"%) blur("+$(filterPanel+" #blrFltr").val()+"px) invert("+$(filterPanel+" #invFltr").val()+"%)");
		$(object).css("filter", "hue-rotate("+$(filterPanel+" #hueFltr").val()+"deg) saturate("+$(filterPanel+" #satFltr").val()+"%) brightness("+$(filterPanel+" #brgFltr").val()+"%) contrast("+$(filterPanel+" #ctrFltr").val()+"%) grayscale("+$(filterPanel+" #grsFltr").val()+"%) sepia("+$(filterPanel+" #sepFltr").val()+"%) blur("+$(filterPanel+" #blrFltr").val()+"px) invert("+$(filterPanel+" #invFltr").val()+"%)");
	}

	function registerFilter(filterPanel)
	{
		var obj = $(filterPanel).attr("filter-object");
		var fd = "<div class='panel-title' read-only>"+$(filterPanel).attr('panel-title')+"</div><label for='fltrReset'><span class='filter-reset-button' title='Reset'></span></label><div class='label-pane'><span read-only>Hue</span><span read-only>Saturation</span><span read-only>Brightness</span><span read-only>Contrast</span><span read-only>Grayscale</span><span read-only>Sepia</span><span read-only>Blur</span><span read-only>Invert</span></div><div class='control-pane'><form><input class='ip-blue' id='hueFltr' type='range' max='180' min='-180' step='0.1' value='0' oninput='Ozone.setFilter(\""+obj+"\", \""+filterPanel+"\")' title='Adjust Hue'><input class='ip-purple' id='satFltr' type='range' max='300' min='0' step='0.1' value='100' oninput='Ozone.setFilter(\""+obj+"\", \""+filterPanel+"\")' title='Adjust Saturation'><input class='ip-pink' id='brgFltr' type='range' max='300' min='0' step='0.1' value='100' oninput='Ozone.setFilter(\""+obj+"\", \""+filterPanel+"\")' title='Adjust Brightness'><input class='ip-red' id='ctrFltr' type='range' max='300' min='0' step='0.1' value='100' oninput='Ozone.setFilter(\""+obj+"\", \""+filterPanel+"\")' title='Adjust Contrast'><input class='ip-orange' id='grsFltr' type='range' max='100' min='0' step='0.1' value='0' oninput='Ozone.setFilter(\""+obj+"\", \""+filterPanel+"\")' title='Adjust Grayscale'><input class='ip-yellow' id='sepFltr' type='range' max='100' min='0' step='0.1' value='0' oninput='Ozone.setFilter(\""+obj+"\", \""+filterPanel+"\")' title='Adjust Sepia'><input class='ip-green' id='blrFltr' type='range' max='15' min='0' step='0.01' value='0' oninput='Ozone.setFilter(\""+obj+"\", \""+filterPanel+"\")' title='Adjust Blur Amount'><input class='ip-blue' id='invFltr' type='range' max='100' min='0' step='0.1' value='0' oninput='Ozone.setFilter(\""+obj+"\", \""+filterPanel+"\")' title='Adjust Invert Amount'><input id='fltrReset' type='reset' class='hidden'></form></div>";
		$(filterPanel).html(fd);
		$(obj).css("-webkit-filter", "hue-rotate("+$(filterPanel+" #hueFltr").val()+"deg) saturate("+$(filterPanel+" #satFltr").val()+"%) brightness("+$(filterPanel+" #brgFltr").val()+"%) contrast("+$(filterPanel+" #ctrFltr").val()+"%) grayscale("+$(filterPanel+" #grsFltr").val()+"%) sepia("+$(filterPanel+" #sepFltr").val()+"%) blur("+$(filterPanel+" #blrFltr").val()+"px) invert("+$(filterPanel+" #invFltr").val()+"%)");
		$(obj).css("filter", "hue-rotate("+$(filterPanel+" #hueFltr").val()+"deg) saturate("+$(filterPanel+" #satFltr").val()+"%) brightness("+$(filterPanel+" #brgFltr").val()+"%) contrast("+$(filterPanel+" #ctrFltr").val()+"%) grayscale("+$(filterPanel+" #grsFltr").val()+"%) sepia("+$(filterPanel+" #sepFltr").val()+"%) blur("+$(filterPanel+" #blrFltr").val()+"px) invert("+$(filterPanel+" #invFltr").val()+"%)");

		$(filterPanel+" .filter-reset-button").click(function()
		{
			$(obj).css("-webkit-filter", "hue-rotate(0deg) saturate(100%) brightness(100%) contrast(100%) grayscale(0%) sepia(0%) blur(0px) invert(0%)");
			$(obj).css("filter", "hue-rotate(0deg) saturate(100%) brightness(100%) contrast(100%) grayscale(0%) sepia(0%) blur(0px) invert(0%)");
		});
	}

	exports.addZero = addZero;
	exports.getFileExtension = getFileExtension;
	exports.getFilename = getFilename;
	exports.loadMedia = loadMedia;
	exports.loadBackgroundImage = loadBackgroundImage;
	exports.createAndShowDialog = createAndShowDialog;
	exports.compareInputValues = compareInputValues;
	exports.setDropdown = setDropdown;
	exports.setFilter = setFilter;
	exports.registerFilter = registerFilter;
})));

/* Independent functions */
var Canvas = function(canvas)
{
	this.loadImage = function(imagePath)
	{
		var ecacffffc22141f3 = canvas.getContext("2d");
		var b798abe6e1b1318e = new Image();
		b798abe6e1b1318e.onload = function()
		{
			ecacffffc22141f3.drawImage(b798abe6e1b1318e, 0, 0);
		};
		b798abe6e1b1318e.src = imagePath;
	};

	this.getImageData = function(imageFormat)
	{
		return canvas.toDataURL("image/"+imageFormat);
	};
};
