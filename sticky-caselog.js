var StickyCaselogHelper = {
	addCaselogHeader: function() {
		this.getCaselogContainer().each(function (index, element) {
			var $this = $(element),
				$caselogTable = $this.find("table");

			console.debug("caselog header", $this, $caselogTable);
			$this.prepend("<div class='caselog-sticky-button'><button><i class=\"fas fa-thumbtack\"></i> Make sticky !</button></div>");
		})
	},

	addStickyButtonsHandlers: function() {
		this.getCaselogContainer().find("div.caselog-sticky-button>button").on("click", function () {
			console.debug("button click");
		});
	},

	getCaselogContainer: function () {
		return $("div.caselog");
	}
};


$(document).ready(function () {
	StickyCaselogHelper.addCaselogHeader();
	StickyCaselogHelper.addStickyButtonsHandlers();
});