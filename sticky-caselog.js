var StickyCaselogHelper = {
	addCaselogHeader: function() {
		StickyCaselogHelper.getCaselogContainersList().each(function (index, element) {
			var $this = $(element),
				$caselogTable = $this.find("table");

			console.debug("caselog header", $this, $caselogTable);
			$this.prepend("<div class='caselog-sticky-button'><button><i class=\"fas fa-thumbtack\"></i> Make sticky !</button></div>");
		})
	},

	addStickyButtonsHandlers: function() {
		StickyCaselogHelper.getCaselogContainersList().find("div.caselog-sticky-button>button").on("click", function () {
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

	/**
	 * If at least one sticky caselog entry exists, then all other caselogs are closed and we open all sticky entries
	 */
	refreshCaseLogs: function() {
		var $stickyCaselogEntries = this.getCaselogEntries("sticky_log"),
			iNbOfStickyCaselogEntries = $stickyCaselogEntries.length;

		if (iNbOfStickyCaselogEntries === 0)
		{
			StickyCaselogHelper.getCaselogContainer("sticky_log").closest("fieldset").hide();
			return;
		}

		StickyCaselogHelper.getCaselogContainersList().each(function(index, element) {
			var $me = $(element);
			console.debug("loop caselog", $me);
			if ($me.parent().is("[data-attribute-code='sticky_log']"))
			{
				return true; // simply skip this occurrence
			}

			$me.find('.caselog_header').removeClass('open');
			$me.find('.caselog_entry, .caselog_entry_html').hide();
		});
	},

	getCaselogContainersList: function () {
		return $("div.caselog");
	},

	getCaselogContainer: function (sAttributeCode) {
		return $("fieldset>div[data-attribute-code='"+sAttributeCode+"']");
	},

	getCaselogEntryParent: function ($caselogEntrySubnode) {
		return $caselogEntrySubnode.closest("div.caselog_entry_html");
	},

	getCaselogEntries: function (sAttributeCode) {
		return StickyCaselogHelper.getCaselogContainer(sAttributeCode).find("div.caselog>table div.caselog_entry_html");
	}
};


$(document).ready(function () {
	// StickyCaselogHelper.addCaselogHeader(); //FIXME
	// StickyCaselogHelper.addStickyButtonsHandlers();
	StickyCaselogHelper.refreshCaseLogs();
});