<?php

class StickyCaseLogUiExtension extends AbstractApplicationUIExtension
{
	public function OnDisplayProperties($oObject, WebPage $oPage, $bEditMode = false)
	{
		if (!($oObject instanceof Ticket)) //FIXME should detect caselog automatically
		{
			return;
		}
		$sModuleDirName = basename(__DIR__);
		$sModuleUrl = utils::GetAbsoluteUrlModulesRoot().'/'.$sModuleDirName;
		$oPage->add_linked_script($sModuleUrl.'/sticky-caselog.js');
		$oPage->add_saas('env-'.utils::GetCurrentEnvironment().'/'.$sModuleDirName.'/sticky-caselog.scss');
	}
}