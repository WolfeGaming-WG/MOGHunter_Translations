//=============================================================================
// MOG_SkipWindowLog.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Disable the Log window.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param Lag Time
 * @desc Setting the waiting time after the action.
 * @default 10
 * @type number
 *
 * @param Display Start Message
 * @desc Display the initial message with the names of enemies.
 * @default false
 * @type boolean 
 *
 * @param Display Preemptive Message
 * @desc Display the preemptive strike message.
 * @default true
 * @type boolean 
 *
 * @help  
 * =============================================================================
 * +++ MOG - Skip Window Log (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * UNOFFICIAL VERSION
 * =============================================================================
 * +++ MOG - Skip Window Log + (English Translastion) +++
 * Author   -   WolfGaming-WG
 * Version  -   1.0
 * Updated  -   2023/09/13
 * https://github.com/WolfeGaming-WG
 * =============================================================================
 * Disable the Log window.
 *
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
  var Imported = Imported || {};
  Imported.MOG_SkipWindowLog = true;
  var Moghunter = Moghunter || {}; 

   Moghunter.parameters = PluginManager.parameters('MOG_SkipWindowLog');
    Moghunter.winLogSpeed = Number(Moghunter.parameters['Lag Time'] || 10);
	Moghunter.battleStartMessage = String(Moghunter.parameters['Display Start Message'] || "false");
	Moghunter.battlePreemptiveMessage = String(Moghunter.parameters['Display Preemptive Message'] || "true");
	
//=============================================================================
// +++ Window BattleLog +++
//=============================================================================

//==============================
// + OVERWRITE + Refresh 
//==============================
Window_BattleLog.prototype.refresh = function() {
   this.visible = false;
};

//==============================
// + OVERWRITE + Message Speed
//==============================
Window_BattleLog.prototype.messageSpeed = function() {
	if (Imported.MOG_FlashDamage) {if ($gameTemp._flashDamage) {return 0}};
    return Moghunter.winLogSpeed;
};


//=============================================================================
// +++ Battle Manager +++
//=============================================================================

//==============================
// + OVERWRITE + Refresh 
//==============================
BattleManager.displayStartMessages = function() {
    if (String(Moghunter.battleStartMessage) === "true") {
		for (const name of $gameTroop.enemyNames()) {
			$gameMessage.add(TextManager.emerge.format(name));
		}
	};
	if (String(Moghunter.battlePreemptiveMessage) === "true") {
		if (this._preemptive) {
			$gameMessage.add(TextManager.preemptive.format($gameParty.name()));
		} else if (this._surprise) {
			$gameMessage.add(TextManager.surprise.format($gameParty.name()));
		}
	};
};