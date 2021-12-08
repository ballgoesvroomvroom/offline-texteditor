$(document).ready(function() {
	var currentpreferencesopenedid = "";
	var openedtabscount = $(".tabpages").length;

	/* store all contents */
	var currentopentabid = ""
	function storeeditorcontents(contents)
	function loadeditor(contents) {
		$("#editoreditable").html(contents);
	}
	function loadnewpage(filename, filecontents = "", toshow = false) {
		openedtabscount += 1;

		var newid_wo_hash = "tabpage-".concat(openedtabscount);
		var newid = "#".concat(newid_wo_hash)
		/* main container; constructing new html */
		jQuery("<div>", {
			id: newid_wo_hash,
			"class": "tabpages",
		}).appendTo("#editortopbar");
		jQuery("<p>", {
			"class": "tabpages-title",
		}).appendTo(newid).html(filename);
		jQuery("<p>", {
			"class": "tabpages-closebutton",
		}).appendTo(newid).html("x");

		if (toshow) {
			loadeditor(filecontents);
		}
	}

	function createnewpage() {
		loadnewpage("untitled", "", true)
	}

	$(".menutext").click(function() {
		var targetoptions = "#".concat(event.target.id.concat("options"));

		if ($(targetoptions).css("display") == "none") {
			if (currentpreferencesopenedid != "" && targetoptions != currentpreferencesopenedid) {
				/* close the current opened one*/
				$(currentpreferencesopenedid).css("display", "none");
			}
			$(targetoptions).css("display", "flex");

			currentpreferencesopenedid = targetoptions;
		} else {
			$(targetoptions).css("display", "none");
			currentpreferencesopenedid = "";
		}
	});

	/*key binds*/
	var IS_SHIFT_DOWN = false;
	var IS_CTRL_DOWN  = false;
	var IS_ALT_DOWN   = false;
	$(document).on("keyup", function(e) {
		//detect 'tab' key
		if (e.keyCode == 9) {
			//add tab
			document.execCommand("insertHTML", false, "&#009");
			//prevent focusing on next element
			e.preventDefault();
		} else if (e.keyCode == 88 && IS_CTRL_DOWN == true) {
			e.preventDefault();

			createnewpage();
		} else if (e.keyCode == 16) {
			IS_SHIFT_DOWN = false;
		} else if (e.keyCode == 17) {
			IS_CTRL_DOWN = false;
		} else if (e.keyCode == 18) {
			IS_ALT_DOWN = false;
		}
	});
	$(document).on("keydown", function(e) {
		if (e.keyCode == 16) {
			IS_SHIFT_DOWN = true;
		} else if (e.keyCode == 17) {
			IS_CTRL_DOWN = true;
		} else if (e.keyCode == 18) {
			IS_ALT_DOWN = true;
		}
	});
	$("#editoreditable").on("paste", function(e) {
		console.log("BYE")
		e.preventDefault();
		var text = '';
		if (e.clipboardData || e.originalEvent.clipboardData) {
			text = (e.originalEvent || e).clipboardData.getData("text/plain");
		} else if (window.clipboardData) {
			text = window.clipboardData.getData("Text");
		}
		if (document.queryCommandSupported("insertText")) {
			document.execCommand("insertText", false, text);
		} else {
			document.execCommand("paste", false, text);
		}
	});
});