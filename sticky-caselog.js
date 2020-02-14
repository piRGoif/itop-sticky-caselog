var StickyCaselogHelper = {
	addCaselogHeader: function() {
		StickyCaselogHelper.getCaselogContainer().each(function (index, element) {
			var $this = $(element),
				$caselogTable = $this.find("table");

			console.debug("caselog header", $this, $caselogTable);
			$this.prepend("<div class='caselog-sticky-button'><button><i class=\"fas fa-thumbtack\"></i> Make sticky !</button></div>");
		})
	},

	addStickyButtonsHandlers: function() {
		StickyCaselogHelper.getCaselogContainer().find("div.caselog-sticky-button>button").on("click", function () {
			var selection = window.getSelection(),
				$selNodeStart = $(selection.anchorNode),
				$selNodeEnd = $(selection.focusNode),
				$caselogEntryStart = StickyCaselogHelper.getCaselogEntryParent($selNodeStart),
				$caselogEntryEnd = StickyCaselogHelper.getCaselogEntryParent($selNodeEnd),
				selText = selection.toString();

			console.debug("sticky button handler", selection, $caselogEntryStart, $caselogEntryEnd);
			if ($caselogEntryStart[0] !== $caselogEntryEnd[0])
			{
				alert("cannot save : selection is spanning multiple caselog entries !");
			}
		});
	},

	getCaselogContainer: function () {
		return $("div.caselog");
	},

	getCaselogEntryParent: function ($caselogEntrySubnode) {
		return $caselogEntrySubnode.closest("div.caselog_entry_html");
	}
};


$(document).ready(function () {
	StickyCaselogHelper.addCaselogHeader();
	StickyCaselogHelper.addStickyButtonsHandlers();
});