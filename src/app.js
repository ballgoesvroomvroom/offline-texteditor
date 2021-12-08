$(document).ready(function() {
	var currentopenedid = "";
	var openedtabscount = 0;

	function loadnewpage(filename, filecontents, toshow = false) {
		openedtabscount += 1;

		jQuery('<div>', {
			id: "tabpage-".concat(openedtabscount),
			class: 'tabpages',
		}).appendTo('#editortopbar');
	}

	$(".menutext").click(function() {
		var targetoptions = "#".concat(event.target.id.concat("options"));

		if ($(targetoptions).css("display") == "none") {
			if (currentopenedid != "" && targetoptions != currentopenedid) {
				/* close the current opened one*/
				$(currentopenedid).css("display", "none");
			}
			$(targetoptions).css("display", "flex");

			currentopenedid = targetoptions;
		} else {
			$(targetoptions).css("display", "none");
			currentopenedid = "";
		}
	});

	/*$(document).bind('keydown', 'ctrl+n', function(e) {
		e.preventDefault();
		console.log("HELLO ".concat(e));
	});*/
	$("#editoreditable").on("keyup", function(e) {
		console.log(e.keyCode)
		//detect 'tab' key
		if (e.keyCode == 9) {
			//add tab
			document.execCommand("insertHTML", false, "&#009");
			//prevent focusing on next element
			e.preventDefault();
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