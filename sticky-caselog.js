var StickyCaselogHelper = {
	refreshCaselogsDisplay: function(bEditMode) {
		(bEditMode) ? this.refreshCaselogsDisplayOnEdit() : this.refreshCaselogsDisplayOnDetails();
	},

	/**
	 * For object edition : hides sticky caselog
	 */
	refreshCaselogsDisplayOnEdit: function() {
		this.hideStickyCaselog();
	},

	/**
	 * For object details :
	 *
	 * * if at least one sticky entry exists, collapse all other caselog entries, and expand all sticky entries
	 * * if sticky caselog is empty, hides it and does nothing else
	 * * add a button on each caselog entry to add them to the sticky caselog
	 */
	refreshCaselogsDisplayOnDetails: function() {
		var $stickyCaselogEntries = this.getCaselogEntries("sticky_log"),
			iNbOfStickyCaselogEntries = $stickyCaselogEntries.length;

		this.getCaselogContainersList().each(function(index, element) {
			var $me = $(element),
				$headers = $me.find('.caselog_header');

			if (!$me.parent().is("[data-attribute-code='sticky_log']"))
			{
				$headers.prepend('<i class="far fa-star sticky-add-content"></i>&nbsp;');
			}
		});
		this.addStickyButtonsHandlers();

		if (iNbOfStickyCaselogEntries === 0)
		{
			this.hideStickyCaselog();
			return;
		}

		this.getCaselogContainersList().each(function(index, element) {
			var $me = $(element),
				$headers = $me.find('.caselog_header'),
				$entries = $me.find('.caselog_entry, .caselog_entry_html');

			if ($me.parent().is("[data-attribute-code='sticky_log']"))
			{
				$headers.addClass('open');
				$entries.show();
			}
			else {
				$headers.removeClass('open');
				$entries.hide();
			}
		});
	},

	addStickyButtonsHandlers: function() {
		this.getCaselogContainersList().find(".sticky-add-content").on("click", function (event) {
			console.debug("clicked !", this);
			event.stopPropagation(); // we do not want to trigger entry expand/collapse
		});
	},

	hideStickyCaselog: function() {
		this.getCaselogContainer("sticky_log").closest("fieldset").hide();
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
		return this.getCaselogContainer(sAttributeCode).find("div.caselog>table div.caselog_entry_html");
	}
};