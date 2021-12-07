$(document).ready(function() {
	var currentopenedid = "";

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

	$(document).bind('keydown', 'ctrl+n', function(e) {
		e.preventDefault();
		console.log("HELLO ".concat(e));
	});
});