var StickyCaselogHelper = {
	addCaselogHeader: function() {
		this.getCaselogContainer().each(function (index, element) {
			var $this = $(element),
				$caselogTable = $this.find("table");

			console.debug("caselog header", $this, $caselogTable);
			$this.prepend("<div class='caselog-sticky-button'><button><i class=\"fas fa-thumbtack\"></i> Make sticky !</button></div>");
		})
	},

	getCaselogContainer: function () {
		return $("div.caselog");
	}
};


$(document).ready(function () {
	StickyCaselogHelper.addCaselogHeader();
});