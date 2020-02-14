<?php

class StickyCaseLogUiExtension extends AbstractApplicationUIExtension
{
	public function OnDisplayProperties($oObject, WebPage $oPage, $bEditMode = false)
	{
		if (!($oObject instanceof Ticket)) //FIXME should detect caselog automatically
		{
			return;
		}

		$sModuleJsUrl = utils::GetAbsoluteUrlModulesRoot().basename(__DIR__).'/sticky-caselog.js';
		$oPage->add_linked_script($sModuleJsUrl);
	}
}