/**
 *
 * @properties={typeid:24,uuid:"D396393A-62E7-41D2-A3A3-FC95585EF416"}
 */
function console_about()
{
/********************************************************************************
	@method: console_license(oArg)

	@arg oArg: 
	@opt oArg.arg : [type] 

	@return: 

	@description: Displays the license text

	@note: 

	@history:	08/16/2006	JAG Created
********************************************************************************/

var formName = cmdVarBin.baseFormName

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Display information about this console"
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('about');
	return oSyntax;
}


var sEmailString = "javascript:forms."+formName+".showUrl('mailto:mphelps@adblocks.com')";

var sAbout = 	"<body><div class=Section1><p align=center style='text-align:center'>" +
				"<span style='font-size:14.0pt;font-family:Verdana'>The <span class=SpellE>" +
				'<a href="javascript:forms.'+formName+'.showUrl(\'http://forum.servoy.com/viewtopic.php?t=9467\')">' +
				"<i style='mso-bidi-font-style:normal'>Servoy Console</i></a> from</span></p>" + 
				'<table border=0 align="center" ><tr><td><img ' +
				'src="media:///adBlocksLogo_tiny.jpg" ></td></tr></table>' +
				"<p class=MsoNormal align=center style='text-align:center'>" +
				"<span style='font-size:14.0pt;font-family:Verdana'>Expert " +
				"<span class=SpellE>Servoy</span> Consulting<o:p></o:p></span></p>" +
				"<p class=MsoNormal align=center style='text-align:center'>" +
				"<span style='font-size:10.0pt;font-family:Verdana'>" +
				'Contact Michael Phelps (<a href="' + sEmailString + '">mphelps@adblocks.com</a>)' +
				"</span></p><p class=MsoNormal align=center style='text-align:center'>" +
				"<span style='font-size:10.0pt;font-family:Verdana'>207 967-2530<o:p></o:p></span></p>" +
				"</div></body>"


oArg.result = sAbout;

return true;


}

/**
 *
 * @properties={typeid:24,uuid:"6BAD5F46-823C-4706-A7C5-3D57EB40EA6C"}
 */
function console_copy()
{
/********************************************************************************
	@method: console_copy(oArg)

	@arg oArg: 
	@node oArg. : [type] 
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	11/17/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Copies the value of an expression to the clipboard. Examples: copy globals.accountid; copy globals.getTaskIcon('service');"
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('copy <i>expression</i>');
	return oSyntax;
}


var oCopy;
var bReturn = true;

try
{
	oCopy = eval(oArg.arg);
	application.setClipboardContent(oCopy)
	oArg.result = 'Copied ' + oArg.arg + ' to clipboard.';
}
catch (e)
{
	bReturn = false;
	oArg.result = e.message;
}

return bReturn;

}

/**
 *
 * @properties={typeid:24,uuid:"9AD3703F-4543-4CD2-B3A0-5AAF8E317ADC"}
 */
function console_dupe()
{
/********************************************************************************
	@method: console_dupe(oArg)

	@arg oArg: 
	@node oArg.arg : [string] 
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	03/13/2007	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Check for duplicates in a given table on a column. Optional <tt>-count</tt> argument allows for checking counters other than &gt; 1."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('dupe -table <i>tableName</i> -col <i>columnName</i> [-server <i>serverName</i>] [-count <i>greaterThan</i>] [-sort (<i>col</i>/<i>amt</i>) ASC/DESC] [-rows <i>maxRows</i>]');
	return oSyntax;
}

var bReturn = true;

var oDS;
var oHTML;
var sCmd;
var oWork = new Object();
var oRegEx = new Object();

oRegEx.col = /-col (\w+)/gi;
oRegEx.table = /-table (\w+)/gi;
oRegEx.server = /-server (\w+)/gi;
oRegEx.count = /-count (\d+)/gi;
oRegEx.rows = /-count (\d+)/gi;
oRegEx.sort = /-sort (.*)/gi;

for (var sArg in oRegEx)
{
	oWork[sArg] = oArg.arg.match(oRegEx[sArg]);
	if (oWork[sArg])
	{
		oWork[sArg] = oWork[sArg][0];
		sCmd = '-' + sArg + ' ';
		oWork[sArg] = utils.stringReplace(oWork[sArg], sCmd, '');
	}
}

var oSQL = new Object();
oSQL.holder = new Object();
oSQL.qArg = new Array();
oSQL.query = 	"SELECT <<column>>, COUNT(1) as occurences\n" +
				"FROM <<table>>\n" +
				"GROUP BY <<column>>\n" +
				"HAVING COUNT(1) > ?\n" +
				"ORDER BY <<sort>>";



if (!oWork.table)
{
	oArg.result = "No table specified.";
	return false;
}

if (!oWork.col)
{
	oArg.result = "No column expression specified.";
	return false;
}

if (!oWork.server)
{
	oWork.server = globals.getServerName();
}

if (!oWork.count)
{
	oWork.count = 1;
}

if (!oWork.rows)
{
	oWork.rows = cmdVarBin.queryRows;
}

if (!oWork.sort)
{
	oWork.sort = "<<column>> ASC";
}
else
{
	if (utils.stringPatternCount(oWork.sort, 'col'))
	{
		oWork.sort = utils.stringReplace(oWork.sort, 'col', '<<column>>');
	}
	else if (utils.stringPatternCount(oWork.sort, 'amt'))
	{
		oWork.sort = utils.stringReplace(oWork.sort, 'amt', 'COUNT(1)');
	}
	else
	{
		oArg.result = 'Invalid sort argument.';
		return false;
	}
}


oSQL.table = oWork.table;
oSQL.server = oWork.server;
oSQL.holder.table = oWork.table;
oSQL.holder.column = oWork.col;
oSQL.holder.sort = oWork.sort;
oSQL.qArg.push(oWork.count);
oSQL.maxRows = oWork.rows;

oDS = sqlHandler(oSQL);

if (!oDS || oSQL.error)
{
	oArg.result = oSQL.error;
	return false;
}


oArg.result = oDS.getAsHTML();

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"D9F121A5-EF82-4FB9-AE4B-02F718084D72"}
 */
function console_exit()
{
/********************************************************************************
	@method: commander_exit(oArg)

	@arg oArg: 
	@opt oArg.syntax : [boolean] Use to request syntax sample.

	@return: 

	@description: 

	@note: 

	@history:	11/2007	TSE Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Exit the Konsole Kommander."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('exit');
	return oSyntax;
}

console_hide()
globals.DS_toolbar_cycle()

return true;

}

/**
 *
 * @properties={typeid:24,uuid:"C1FFC764-CB7C-4695-8A3B-EC0F1621B059"}
 */
function console_help()
{
/********************************************************************************
	@method: console_help(oArg)

	@arg oArg: 
	@opt oArg.arg : [type] 

	@return: 

	@description: 

	@note: 

	@history:	07/26/2006	JAG Created
********************************************************************************/

var formName = cmdVarBin.baseFormName

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Get help on any and all commands."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('help [<i>commandName</i>]');
	return oSyntax;
}

var oWork = new Object();
oWork.cmdList = allmethods;
oWork.prefix = 'console_';

var oHTML = new Object();
oHTML.table = 	"<table cellpadding=0 cellspacing=2 border=0>\n" +
				"<<tableBody>>" +
				"</table>";
				
oHTML.header = 	"	<tr>\n" +
				"		<td width=\"100%\"><b><<cmd>></b></td><td><<description>></td>\n" +
				"	</tr>\n";
				
oHTML.syntax = 	"	<tr>\n" +
				"		<td>&nbsp;</td><td><b><<syntax>></b></td>\n" +
				"	</tr>\n";

oHTML.spacer = 	"	<tr> <td colspan=2 height=5></td> </tr>\n";
				
oHTML.tableBody = '';

var oSyntax;
var oSend = new Object();

oSend.syntax = true;

if (oArg.arg)
{
	oWork.cmd = oWork.prefix + utils.stringTrim(oArg.arg);
	if (forms[formName][oWork.cmd])
	{
		oSyntax = forms[formName][oWork.cmd](oSend);
		oSyntax.cmd = utils.stringTrim(oArg.arg);
		
		oHTML.tableBody += replaceHolders(oHTML.header, oSyntax);
		
		for (var k = 0; k < oSyntax.syntax.length; k++)
		{
			oWork.syntax = oSyntax.syntax[k];
			oHTML.tableBody += replaceHolders(oHTML.syntax, oWork);
		}
	}
	else
	{
		oArg.result = 'Command does not exist.';
		return false;
	}
}
else
{
	oHTML.table = 
		"<b>Useful keystrokes:</b><ul>\n" +
		"	<li>&lt;shift&gt;+&lt;enter&gt; to scroll through commands backwards</li>\n" +
		"	<li>&lt;ctrl&gt;+&lt;shift&gt;+&lt;enter&gt; to scroll forwards through commands</li>\n" +
		"</ul><br>\n" +
		"<b>Useful global settings:</b><ul>\n" +
		"	<li>cmdVarBin.verbose: When <i>run</i> command is used, if result is enumerable, this setting determines whether result is passed through the <i>view</i> command. Default is true.</li>\n" +
		"	<li>cmdVarBin.plaintext: When <i>run</i> command is used, if result is HTML, it is encoded as plaintext. Default is false.</li></ul>\n" +
		"<br>\n" +		
		oHTML.table;
		
	for (var i = 0; i < oWork.cmdList.length; i++)
	{
		if (utils.stringLeft(oWork.cmdList[i], oWork.prefix.length) == oWork.prefix)
		{
			oWork.cmd = oWork.cmdList[i];
			
			oSyntax = forms[formName][oWork.cmd](oSend);
			oSyntax.cmd = oWork.cmd.split('_')[1];
			
			//don't display this comand if there is no description (a way to hide deprecated methods)
			if (!oSyntax.description) {
				continue
			}
			
			
			oHTML.tableBody += replaceHolders(oHTML.header, oSyntax);
			
			for (var k = 0; k < oSyntax.syntax.length; k++)
			{
				oWork.syntax = oSyntax.syntax[k];
				oHTML.tableBody += replaceHolders(oHTML.syntax, oWork);
			} //for k		
			
			oHTML.tableBody += oHTML.spacer;
			
		} //if (utils...
	} //for i
} //else


oArg.result = replaceHolders(oHTML.table, oHTML);

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"39345127-309B-4896-8B8D-034C4C70F03D"}
 */
function console_hide()
{
/********************************************************************************
	@method: commander_hide(oArg)

	@arg oArg: 
	@opt oArg.syntax : [boolean] Use to request syntax sample.

	@return: 

	@description: 

	@note: 

	@history:	11/2007	TSE Created
********************************************************************************/

var oArg = arguments[0];

if (oArg) {
	if (oArg.syntax)
	{
		var oSyntax = new Object();
		oSyntax.description = "Retract the results window."
		oSyntax.syntax = new Array();
		oSyntax.syntax.push('hide');
		return oSyntax;
	}
}

//roll up if currently showing
var formName = solutionPrefs.config.formNameBase
var tabParent = solutionPrefs.panel.toolbar[solutionPrefs.panel.toolbar.selectedTab - 4].formName

if (forms[tabParent].popDown == 'show') {
	//set up/down status to hide
	forms[tabParent].popDown = 'hide'
	forms[formName].elements.tab_toolbar_popdown.visible = false
	
	//flag to keep from reopening
	cmdVarBin.hidden = true
}
//popdown not showing
else {
	
}

//popdown available
forms[formName + '__header__toolbar'].elements.btn_toolbar_expand.visible = forms[tabParent].popDown != 'show'
forms[formName + '__header__toolbar'].elements.btn_toolbar_collapse.visible = forms[tabParent].popDown == 'show'

return true

}

/**
 *
 * @properties={typeid:24,uuid:"58814FC5-17DA-4D75-9320-CA341D8706BA"}
 */
function console_license()
{
/********************************************************************************
	@method: console_license(oArg)

	@arg oArg: 
	@opt oArg.arg : [type] 

	@return: 

	@description: Displays the license text

	@note: 

	@history:	08/16/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Display the license"
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('license');
	return oSyntax;
}



var sLicense = 

"* Copyright (c) 2005, 2006, 2007, adBlocks <br>\n" +
"* All rights reserved.<br>\n" +
"*<br>\n" +
"* Redistribution and use in source and binary forms, with or without<br>\n" +
"* modification, are permitted provided that the following conditions are met:<br>\n" +
"*     * Redistributions of source code must retain the above copyright<br>\n" +
"*       notice, this list of conditions and the following disclaimer.<br>\n" +
"*     * Redistributions in binary form must reproduce the above copyright<br>\n" +
"*       notice, this list of conditions and the following disclaimer in the<br>\n" +
"*       documentation and/or other materials provided with the distribution.<br>\n" +
"*     * Neither the name of adBlocks nor the<br>\n" +
"*       names of its contributors may be used to endorse or promote products<br>\n" +
"*       derived from this software without specific prior written permission.<br>\n" +
"*<br>\n" +
"* THIS SOFTWARE IS PROVIDED BY adBlocks ``AS IS'' AND ANY<br>\n" +
"* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED<br>\n" +
"* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE<br>\n" +
"* DISCLAIMED. IN NO EVENT SHALL adBlocks BE LIABLE FOR ANY<br>\n" +
"* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES<br>\n" +
"* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;<br>\n" +
"* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND<br>\n" +
"* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT<br>\n" +
"* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS<br>\n" +
"* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.";


oArg.result = sLicense;

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"55E6E7E8-E058-4F94-B42C-CE5792E3A106"}
 */
function console_modal()
{
/********************************************************************************
	@method: commander_modal(oArg)

	@arg oArg: 
	@opt oArg.syntax : [boolean] Use to request syntax sample.

	@return: 

	@description: 

	@note: 

	@history:	11/2007	TSE Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Show modal Kommander window."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('modal');
	return oSyntax;
}

//hide the console toolbar
console_hide()

//select the next toolbar
globals.DS_toolbar_cycle()

//show the form in dialog console
globals._1()

//prevent the toolbar popdown from popping
cmdVarBin.hidden = true

return true;

}

/**
 *
 * @properties={typeid:24,uuid:"5C1F7347-19ED-475D-93AD-6C0BA89008C5"}
 */
function console_mosaic()
{
/********************************************************************************
	@method: console_mosaic(oArg)

	@arg oArg: 
	@opt oArg.arg : [type] 

	@return: 

	@description: Deprecated method

	@note: 

	@history:	08/16/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = null
	oSyntax.syntax = new Array();
	return oSyntax;
}



var sLicense = "The \"mosaic\" callback is deprecated.  See \"sutra\"";

oArg.result = sLicense;

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"16A430CA-75B6-42CA-AEA2-8A762A6938BD"}
 */
function console_print()
{
/********************************************************************************
	@method: console_print(oArg)

	@arg oArg: 
	@node oArg. : [type] 
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	10/16/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Print The Current Result Window"
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('print');
	return oSyntax;
}

var oRegEx = new Object();
var oWork = new Object();

oRegEx.preview = /-preview/gi;

oWork.preview = oArg.arg.match(oRegEx.preview);

oWork.original = globals.commanderOutput;

globals.commanderOutput = utils.stringReplace(oWork.original, "<body>", "<body style='font-size:9pt'>");

controller.saveData();

if (oWork.preview)
{
	controller.showPrintPreview(true);
	application.sleep(10000);
}
else
{
	controller.print(true, true);
	application.sleep(2000)
}

globals.commanderOutput = oWork.original;

oArg.result = true;

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"ED35FC1F-4147-470D-896A-5D62B0C6C25B"}
 */
function console_query()
{
/********************************************************************************
	@method: console_query(oArg)

	@arg oArg: 
	@node oArg.arg : [string] 
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "View a result set from database. Can alternatively write results to a file, using a given delimiter."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('query <i>sql-string</i>');
	oSyntax.syntax.push('query -sql <i>"sql-string"</i> [-server <i>serverName</i>] [-rows <i>maxRows</i>] [-file <i>"delimiter"</i>]');
	return oSyntax;
}

var bReturn = true;

var oDS;
var oHTML;

var oRegEx = new Object();

oRegEx.sql = /-sql "(.+?)"/gi;
oRegEx.server = /-server (\w+)/gi;
oRegEx.rows = /-rows (\d+)/gi;
oRegEx.file = /-file "(.+?)"/gi;

var oWork = new Object();
var oSQL = new Object();


oSQL.query = oArg.arg.match(oRegEx.sql);




if (oSQL.query)
{
	oSQL.query = oSQL.query[0];
	oSQL.query = utils.stringReplace(oSQL.query, '-sql', '');
	oSQL.query = utils.stringReplace(oSQL.query, '"', '');
	oSQL.query = utils.stringTrim(oSQL.query);
	
	oSQL.server = oArg.arg.match(oRegEx.server);
	oSQL.maxRows = oArg.arg.match(oRegEx.rows);

	if (oSQL.server)
	{
		oSQL.server = utils.stringTrim(utils.stringReplace(oSQL.server[0], '-server', ''));
	}
	else
	{
		oSQL.server = controller.getServerName();
	}
	
	if (oSQL.maxRows)
	{
		oSQL.maxRows = oSQL.maxRows[0];
		oSQL.maxRows = utils.stringReplace(oSQL.maxRows, '-rows', '');
		oSQL.maxRows = utils.stringTrim(oSQL.maxRows);
		oSQL.maxRows = parseInt(oSQL.maxRows, 10);
		
	}
	else
	{
		oSQL.maxRows = cmdVarBin.queryRows;
	}
		
}
else
{
	oSQL.query = oArg.arg;
	oSQL.server = controller.getServerName();
	oSQL.maxRows = cmdVarBin.queryRows;
}

oDS = sqlHandler(oSQL);

try
{
	oArg.result = oSQL.error;
	if (oArg.result)
	{
		return false
	}
}
catch (e)
{
	oArg.result = e.message;
	return false;
}

oWork.delim = oArg.arg.match(oRegEx.file);

if (oWork.delim)
{
	oWork.delim = oWork.delim[0];
	oWork.delim = oWork.delim.split('"')[1]
	oWork.file = plugins.file.showFileSaveDialog(cmdVarBin.lastDirectory);
	
	if (!oWork.file)
	{

	}
	else
	{
		cmdVarBin.lastDirectory = oWork.file.getAbsolutePath();
		plugins.bufferedWriter.setFile(oWork.file.getAbsolutePath(), false);
		plugins.bufferedWriter.write(oDS.getAsText(oWork.delim, "\r\n", '', true));
		plugins.bufferedWriter.close();
		oArg.result = "Wrote result to " + oWork.file.getAbsolutePath();
	}	
	
}
else
{
	oArg.result = oDS.getAsHTML() + "<br>Row Limit: " + oSQL.maxRows + " Rows Found: " + oDS.getMaxRowIndex();
}

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"F8392EC5-D6ED-42FA-8472-54A172E973A1"}
 * @AllowToRunInFind
 */
function console_run()
{
/********************************************************************************
	@method: console_run(oArg)

	@arg oArg: 
	@node oArg.arg : [string]  Method to run
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Evaluates argument. Valid examples: run globals.yourMethod('blah!'); run 3 + 5; run forms.formname.foundset.column"
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('run <i>expression</i>');
	return oSyntax;
}

var bReturn = true;

var oWork = new Object();
var oSend;
oWork.method = oArg.arg;

try
{
	oArg.result = eval(oWork.method)
}
catch (e)
{
	bReturn = false;
	oArg.result = e.message;
}


if (bReturn && isEnumerable(oArg.result) && cmdVarBin.verbose)
{
	oWork.searchID = 'run' + utils.dateFormat(new Date(), 'yyyyMMddHHmmssS');
	if (!cmdVarBin.runResult)
	{
		cmdVarBin.runResult = new Object();
	}
	cmdVarBin.runResult[oWork.searchID] = oArg.result;
	
	oSend = new Object()
	oSend.arg = 'cmdVarBin.runResult.' + oWork.searchID
	
	bReturn = console_view(oSend);
	oArg.result = oSend.result;
}
else if (bReturn && cmdVarBin.plaintext)
{
	oArg.result = utils.stringReplace(oArg.result, '<', '&lt;');
	oArg.result = utils.stringReplace(oArg.result, '>', '&gt;');
	oArg.result = utils.stringReplace(oArg.result, '\n', '<br>');
}

return bReturn;
}

/**
 *
 * @properties={typeid:24,uuid:"0CC2967D-F3A5-43BA-968F-9A53DD89AAAE"}
 * @AllowToRunInFind
 */
function console_schema()
{
/********************************************************************************
	@method: console_schema(oArg)

	@arg oArg: 
	@opt oArg.arg : [string] 


	@return: 

	@description: 

	@note: 

	@history:	07/26/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Examine database schema. -server option changes what server schema command is looking at."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('schema [<i>tableName</i>]');
	oSyntax.syntax.push('schema -like <i>searchString</i>');
	oSyntax.syntax.push('schema -col <i>searchString</i>');
	oSyntax.syntax.push('schema -server <i>serverName</i>');
	return oSyntax;
}

var bResult;
var oSend = new Object();
var oWork = new Object();

oSend.arg = 'cmdVarBin.schema';

if (oArg.arg)
{
	var oRegEx = new Object();
	oRegEx.like = /-like (\w+)/gi;
	oRegEx.col = /-col (\w+)/gi;
	oRegEx.server = /-server (\w+)/gi;
	oWork.like  = oArg.arg.match(oRegEx.like);
	oWork.col = oArg.arg.match(oRegEx.col);
	oWork.server = oArg.arg.match(oRegEx.server);
	
	if (oWork.server)
	{
		oWork.server = stringReplace(oWork.server[0], '-server ', '');
		schema_makeSchema(oWork.server);
		cmdVarBin.server = oWork.server;
	}
	
	
	if (oWork.like)
	{
		oWork.like = oWork.like[0];
		oWork.like = utils.stringTrim(oWork.like.split(' ')[1]);
	
		oWork.searchID = oWork.like + utils.dateFormat(new Date(), 'yyyyMMddHHmmssS');
	
		if (! cmdVarBin.schemaSearch )
		{
			cmdVarBin.schemaSearch = new Object();
		}
		
		cmdVarBin.schemaSearch[oWork.searchID] = new Object();
		
		for (var sTable in cmdVarBin.schema)
		{
			if (utils.stringPatternCount(sTable, oWork.like) > 0)
			{
				cmdVarBin.schemaSearch[oWork.searchID][sTable] = cmdVarBin.schema[sTable];
			}
		}
		
		oSend.arg = 'cmdVarBin.schemaSearch.' + oWork.searchID;
		
	}
	else if (oWork.col)
	{
		oWork.col = oWork.col[0];
		oWork.col = utils.stringTrim(oWork.col.split(' ')[1]);
	
		oWork.searchID = oWork.col + utils.dateFormat(new Date(), 'yyyyMMddHHmmssS');
	
		if (! cmdVarBin.schemaSearch )
		{
			cmdVarBin.schemaSearch = new Object();
		}
		
		cmdVarBin.schemaSearch[oWork.searchID] = new Object();
		
		for (var sTable in cmdVarBin.schema)
		{
			var oTable = databaseManager.getTable(cmdVarBin.server, sTable)
			if (oTable.getColumn(oWork.col))
			{
				cmdVarBin.schemaSearch[oWork.searchID][sTable] = cmdVarBin.schema[sTable];
			}
		}
		
		oSend.arg = 'cmdVarBin.schemaSearch.' + oWork.searchID;
	}
	else
	{	
		if (cmdVarBin.schema[oArg.arg])
		{
			oSend.arg += '.' + oArg.arg;
		}
		else
		{
			bResult = false;
			oArg.result = "No such table!";
		}
	}
}

bResult = console_view(oSend);
oArg.result = oSend.result;

return bResult;
}

/**
 *
 * @properties={typeid:24,uuid:"16429657-8EF8-4564-B200-A06F2C3FA87C"}
 */
function console_show()
{
/********************************************************************************
	@method: console_show(oArg)

	@arg oArg: 
	@node oArg.arg : [string] Name of form to show.
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Close debug window and show specified form."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('show <i>formName</i>');
	return oSyntax;
}

var bReturn = true;

if (forms[oArg.arg])
{
	oArg.result = "Closing Commander to show form '" + oArg.arg + "'...";
	globals.CODE_form_in_dialog_close(true);
	forms[oArg.arg].controller.show();
}
else
{
	bReturn = false;
	oArg.result = "Form '" + oArg.arg + "' does not exist.";
}

return bReturn;
}

/**
 *
 * @properties={typeid:24,uuid:"05E9C072-2C5D-4453-9F3B-69BD7F48B7EF"}
 */
function console_sql()
{
/********************************************************************************
	@method: console_sql(oArg)

	@arg oArg: 
	@node oArg.arg : [string] 
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	02/28/2007	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Execute a non SELECT query to database."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('sql -query <i>"sql-string"</i> -table <i>tablename</i> [-server <i>serverName</i>]');
	return oSyntax;
}

var bReturn = true;

var oDS;
var oHTML;

var oRegEx = new Object();

oRegEx.query = /-query "(.+?)"/gi;
oRegEx.server = /-server (\w+)/gi;
oRegEx.table = /-table (.+?)/gi;

var oWork = new Object();

oWork.query = oArg.arg.match(oRegEx.query);

var oSQL = new Object();


if (oWork.query)
{
	oSQL.query = oWork.query[0];
	oSQL.query = utils.stringReplace(oSQL.query, '-query', '');
	oSQL.query = utils.stringReplace(oSQL.query, '"', '');
	oSQL.query = utils.stringTrim(oSQL.query);
	
	oWork.server = oArg.arg.match(oRegEx.server);
	oWork.table = oArg.arg.match(oRegEx.table);

	if (oWork.server)
	{
		oSQL.server = utils.stringTrim(utils.stringReplace(oWork.server[0], '-server', ''));
	}
	else
	{
		oSQL.server = controller.getServerName();
	}
	
	if (oWork.table)
	{
		oSQL.table = oWork.table[0];
		oSQL.table = utils.stringReplace(oSQL.table, '-table', '');
		oSQL.table = utils.stringTrim(oSQL.table);
	}
	else
	{
		oArg.result = 'Missing <i>-table</i> argument.';
		return false;
	}
		
}
else
{
	oArg.result = 'Missing <i>-query</i> argument';
	return false;
}

var bResult = sqlHandler(oSQL);

if (bResult)
{
	oArg.result = bResult;
}
else
{
	oArg.result = oSQL.error;
}


return bResult;
}

/**
 *
 * @properties={typeid:24,uuid:"1F327020-2775-4086-B25E-24061940AC00"}
 */
function console_sutra()
{
/********************************************************************************
	@method: commander_exit(oArg)

	@arg oArg: 
	@opt oArg.syntax : [boolean] Use to request syntax sample.

	@return: 

	@description: 

	@note: 

	@history:	9/2008	TSE Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "View information used by Data Sutra."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('sutra <i>sitemap</i></b> (View the sitemap for navigation items web-client configured)');
	oSyntax.syntax.push('sutra <i>sol</i></b> (View the solutionPrefs object that stores all non-navigation meta-data)');
	oSyntax.syntax.push('sutra <i>nav</i></b> (View the navigationPrefs object with all navigation and action meta-data)');
	oSyntax.syntax.push('sutra <i>thisNav</i></b> (View the navigationPrefs node for the currently displayed form)');
	oSyntax.syntax.push('sutra <i>ver</i></b> (What version of Data Sutra is installed)');
	oSyntax.syntax.push('sutra <i>about</i></b> (The information for this session from the server admin pages)');
	/*
	oSyntax.syntax.push('sutra <i></i></b> ()');
	*/
	return oSyntax;
}

switch (oArg.arg) {
	case 'sitemap':
		globals.consoleInput = 'view navigationPrefs.siteMap';
		processInput(true);
		break
	case 'sol':
		globals.consoleInput = 'view solutionPrefs';
		processInput(true);
		break
	case 'nav':
		globals.consoleInput = 'view navigationPrefs';
		processInput(true);
		break
	case 'thisNav':
		globals.consoleInput = 'view navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID]';
		processInput(true);
		break
	case 'ver':
		globals.consoleInput = 'run plugins.sutra.getVersion()';
		processInput(true);
		break
	case 'about':
		globals.consoleInput = 'view solutionPrefs.clientInfo.adminPage';
		processInput(true);
		break
	default:
		if (oArg.arg) {
			oArg.result = oArg.arg + ' is not a valid option';
		}
		else {
			oArg.result = 'This command requires an argument to run.  Type <b>help <i>sutra</i></b> for more information';
		}
		return false;
}

return true;

}

/**
 *
 * @properties={typeid:24,uuid:"F3004B95-EFF4-4F25-AEC9-F452C0938605"}
 */
function console_toolbar()
{
/********************************************************************************
	@method: console_toolbar(oArg)

	@arg oArg: 
	@node oArg.arg : [type] 
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	09/26/2007	JAG Created
********************************************************************************/

var formName = cmdVarBin.baseFormName

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Turn the toolbar on or off."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('toolbar <i>true</i>/<i>false</i>');
	return oSyntax;
}

if ( ! (oArg.arg == 'true' || oArg.arg == 'false') )
{
	oArg.result = "Invalid argument. Please specifiy <i>true</i> or  <i>false</i>.";
	return false;
}

var bVisible = eval(oArg.arg);

var bDialog = false;

if (application.isFormInDialog(forms[formName]))
{
	bDialog = true;
	globals.CODE_form_in_dialog_close(true);
}

plugins.kioskmode.setToolBarVisible(bVisible);

if (bVisible)
{
	oArg.result = 'Toolbar Visible';
}
else
{
	oArg.result = 'Toolbar Invisible';
}

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"105F4848-939C-4E27-920D-680C91779865"}
 */
function console_view()
{
/********************************************************************************
	@method: console_view(oArg)

	@arg oArg: 
	@node oArg.arg : [type] 
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (!cmdVarBin.viewTree)
{
	cmdVarBin.viewTree = new Object();
	cmdVarBin.viewTreeIndex = new Object();
}	

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "Examine the contents of the specified object."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('view <i>objectName</i>');
	return oSyntax;
}


var oView;

try
{
	oView = eval(oArg.arg)
}
catch (e)
{
	oArg.result = e.message;
	return false;
}


if (isEnumerable(oView))
{
	var sID = oArg.arg + utils.dateFormat(new Date(), 'yyyyMMddHHmmssSS');
	cmdVarBin.viewTreeIndex[sID] = cmdVarBin.resultSet.length;
	cmdVarBin.viewTree[sID] = view_newTree(oView, sID + ':/');
	oArg.result = view_displayTree(sID);
}
else
{
	oArg.result = oView;
}

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"FCA2C402-3355-49C3-9DDB-E50C0823F3D7"}
 */
function console_watch()
{
/********************************************************************************
	@method: console_watch(oArg)

	@arg oArg: 
	@opt oArg.arg : [string] Variable list to add to watch list.


	@return: 

	@description: 

	@note: Variable list should be in the format var1, var2, var3, var4

	@history:	07/26/2006	JAG Created
********************************************************************************/

var oArg = arguments[0];

if (oArg.syntax)
{
	var oSyntax = new Object();
	oSyntax.description = "View or add items to watch list."
	oSyntax.syntax = new Array();
	oSyntax.syntax.push('watch [<i>var1, var2, var3...varX</i>]');
	return oSyntax;
}



var oWork = new Object();

if (! cmdVarBin.watchlist )
{
	cmdVarBin.watchlist = new Array();
}

if (oArg.arg)
{
	
	oWork.watch = oArg.arg.split(',');
	for (var i = 0; i < oWork.watch.length; i++)
	{
		oWork.varName = utils.stringTrim(oWork.watch[i]);
		cmdVarBin.watchlist.push(oWork.varName);
	}
}

cmdVarBin.watchlist.sort();


oArg.result = 	"<table cellpadding=3 cellspacing=0 border=1>\n" +
				"	<tr><td><b><u>Name</u></b></td><td><b><u>Value</u></b></td></tr>\n";
				
for (var i = 0; i < cmdVarBin.watchlist.length; i++)
{
	try
	{
		oWork.value = eval(cmdVarBin.watchlist[i])
	}
	catch (e)
	{
		oArg.result = e.message;
		return false;
	}
	
	oArg.result += 	
		"	<tr>\n" +
		"		<td nowrap><b>" + cmdVarBin.watchlist[i] + "</b></td>\n" +
		"		<td nowrap>" + oWork.value + "</td>\n" +
		"	</tr>\n";
}


oArg.result += "</table>";

return true;
}

/**
 *
 * @properties={typeid:24,uuid:"AA14B659-0C26-428E-B9C4-0BC759132A41"}
 */
function drawOutput()
{
/********************************************************************************
	@method: drawOutput(bScrollToBottom)

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

//TODO: put resizing bit in here so that tree view works

//var bScrollToBottom = arguments[0];
var formName = 'CODE_0F__konsole__popdown'
var oHTML = new Object();

oHTML.page = 	"<html><body>\n" +
				"	<table cellpadding=0 cellspacing=0 border=0 width=\"100%\" height=\"100%\">" +
				"		<tr>\n" +
				"			<td>\n" +
				"			<table cellpadding=0 cellspacing=2 border=0 width=\"100%\" height=\"100%\">\n" +
				"<<tableBody>>" +
				"			</table>\n" +
				"			</td>\n" +
				"		</tr>\n" +
				"	</table>\n" +
				"</body></html>";
				
oHTML.row = "	<tr>\n" +
			"		<td valign=top align=left>\n" +
			"			<<resultData>>\n" +
			"		</td>\n" +
			"	</tr>\n";

oHTML.tableBody = '';

//oHTML.windowHeight = utils.numberFormat(forms[formName].elements.fldOutput.getHeight()-20, '#######');

var oHolder = new Object();

var i = cmdVarBin.resultSet.length - 2

//if entering modal view, show last command
if (utils.stringPatternCount(cmdVarBin.resultSet[cmdVarBin.resultSet.length - 2],'modal')) {
	i = cmdVarBin.resultSet.length - 4
}

for ( ; i < cmdVarBin.resultSet.length; i++)
{
	oHolder.resultData = cmdVarBin.resultSet[i];
	oHTML.tableBody += replaceHolders(oHTML.row, oHolder);
}

oHTML.html = replaceHolders(oHTML.page, oHTML);

globals.consoleOutput = oHTML.html;

//save down new windowsize
cmdVarBin.miniWindowSize = new Object()
cmdVarBin.miniWindowSize.width = forms[solutionPrefs.config.formNameBase + '__header__toolbar'].elements.tab_toolbar.getWidth()
cmdVarBin.miniWindowSize.height = utils.stringPatternCount(globals.consoleOutput,'\n') * 15 + 25

}

/**
 *
 * @properties={typeid:24,uuid:"87F42D02-FF4D-4122-A99F-AD529B4BEF62"}
 */
function getColumnType()
{
/********************************************************************************
	@method: getColumnType(sFullColumn, [sServer])

	@arg sFullColumn: string
	@opt sServer. : string 

	@return: 

	@description: 

	@note: 

	@history:	05/27/2006	James Created
********************************************************************************/

var sFullColumn = arguments[0];
var sServer = arguments[1];

var sTable = sFullColumn.split('.')[0];
var sColumn = sFullColumn.split('.')[1];

if (!sServer)
{
	sServer = controller.getServerName();
}

var oTable = databaseManager.getTable(sServer, sTable);
var oColumn = oTable.getColumn(sColumn);

var nType;

if (oColumn == null)
{
	return false;
}
else
{
	nType = oColumn.getType();
}

var sRetval;

switch (nType)
{
	case -4:
		//MSSQL returns this for media type fields in some cases.
		sRetval = 'media';
		break;
	case 4:
		sRetval = 'integer';
		break;
	
	case 8:
		sRetval = 'number';
		break;
	
	case -1:	
	case 12:
	case 2005: //Very large text
		sRetval = 'string';
		break;
		
	case 93:
		sRetval = 'date';
		break;
		
	case 2004:
		sRetval = 'media';
		break;
		
	default:
		sRetval = 'unknown';
}

return sRetval;


}

/**
 *
 * @properties={typeid:24,uuid:"F220247B-E2F0-419B-B75A-E357073E493A"}
 */
function getLastInput()
{
/********************************************************************************
	@method: getLastInput(nDir)

	@arg nDir: Direction to cycle thru input (-1/1)

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var nDir = arguments[0];


var aOldCommands;
var nIndex;
var sLastCommand;

if (!cmdVarBin.commandIndex)
{
	cmdVarBin.commandIndex = 0;
}


cmdVarBin.commandIndex = cmdVarBin.commandIndex + nDir

if (cmdVarBin.commandIndex < 0)
{
	cmdVarBin.commandIndex = cmdVarBin.attemptSet.length-1;
}
else if (cmdVarBin.commandIndex >= cmdVarBin.attemptSet.length)
{
	cmdVarBin.commandIndex = 0;
}


nIndex = cmdVarBin.commandIndex;

if (cmdVarBin.attemptSet)
{
	sLastCommand = cmdVarBin.attemptSet[nIndex];
}

return sLastCommand;
}

/**
 *
 * @properties={typeid:24,uuid:"B0501DB9-E61B-49E9-94CE-B360DB40F652"}
 */
function getTypeOf()
{
/********************************************************************************
	@method: getTypeOf(oObject)

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var oObject = arguments[0];

var sTemp;

if (oObject == undefined)
{
	return 'Undefined'
}

try
{
	if (oObject.toString)
	{
		sTemp = (oObject.toString());
		
		if (sTemp)
		{
			sTemp = sTemp.split(':')[0];
			
			if (sTemp && sTemp == 'JSDataSet')
			{
				return 'JSDataSet';
			}
		}
	}
}
catch (e)
{

}

if (oObject instanceof Array)
{
	return 'Array';
}

//oObject instanceof Date
if (oObject.__proto__ == 'Invalid Date')
{
	return 'Date';
}


var sType;


try
{
	sType = typeof oObject;
}
catch (e)
{
	sType = Object.prototype.toString.apply(oObject);
	sType = sType.substring(8, (sType.length - 1));
}
//If it is of type 'object' find the class of of object.
if (sType == "object")
{
	sType = Object.prototype.toString.apply(oObject);
	sType = sType.substring(8, (sType.length - 1));
}

return sType;

}

/**
 *
 * @properties={typeid:24,uuid:"A9A5AC34-48F1-4652-AA1B-C6AC2448B49E"}
 */
function initialize()
{

if (! application.__parent__.cmdVarBin )
{
	cmdVarBin = new Object();
	cmdVarBin.windowSize = new Object();
	cmdVarBin.windowSize.width = 600;
	cmdVarBin.windowSize.height = 700;
	cmdVarBin.resultSet = new Array();
	cmdVarBin.commandSet = new Array();
	cmdVarBin.attemptSet = new Array();
	
	cmdVarBin.commandHash = new Object();
	cmdVarBin.attemptHash = new Object();
	
	
	var aEnum = new Array('object', 'array', 'creationalprototype', 'solutionscope', 'globalscope', 'formscope', 'elementscope', 'jsform', 'javaobject', 'foundset', 'func' + 'tion', 'javapackage');
	
	cmdVarBin.isEnumerable = new Object();

	for (var i = 0; i < aEnum.length; i++)
	{
		cmdVarBin.isEnumerable[aEnum[i]] = true;
	}
	
	cmdVarBin.verbose = true;
	cmdVarBin.plaintext = false;	
	cmdVarBin.queryRows = 100;
	if (! application.__parent__.solutionPrefs ) {
		cmdVarBin.server = forms.DATASUTRA_0F_solution.controller.getServerName();
	}
	schema_makeSchema();
	
}
}

/**
 *
 * @properties={typeid:24,uuid:"E59BF92B-69CB-4401-99FC-DE1954948F87"}
 */
function isEnumerable()
{
/********************************************************************************
	@method: isEnumerable(oObject)

	@arg oArg: 
	@node oArg.arg : [string]  Method to run
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var oObject = arguments[0];

var sType = getTypeOf(oObject).toLowerCase();

var bIsEnumerable = false;

if (cmdVarBin.isEnumerable[sType])
{
	bIsEnumerable = true;
}

return bIsEnumerable;
}

/**
 *
 * @properties={typeid:24,uuid:"8CB5C663-2ABB-4CA3-957D-A2E8FEB20CF6"}
 */
function onHide()
{


cmdVarBin.windowSize.width = elements.shpEdge.getWidth() + 8;
cmdVarBin.windowSize.height = elements.shpEdge.getHeight() + 12
}

/**
 *
 * @properties={typeid:24,uuid:"F216DD43-FB4B-4F3A-B43A-7982ED462057"}
 */
function onLoad()
{


initialize();


}

/**
 *
 * @properties={typeid:24,uuid:"F2873B2D-D7E5-4EC7-8917-D6182C860079"}
 */
function onShow(firstShow,event)
{
/********************************************************************************
	@method: onShow()

	@return: 

	@description: 

	@note: 

	@history:	07/26/2006	JAG Created
********************************************************************************/

if (firstShow) {
	plugins.WebClientUtils.setExtraCssClass(elements.fldInput, 'noWebkitOutline')
}

elements.fldInput.requestFocus();

}

/**
 *
 * @properties={typeid:24,uuid:"7FC87E4E-57C7-47B3-8E89-AF0B5ACA90C7"}
 */
function processInput()
{
/********************************************************************************
	@method: processInput()

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var formName = 'CODE_0F__konsole'

cmdVarBin.baseFormName = formName

var sInput = globals.consoleInput;

var nKey = application.getLastKeyModifiers();

var miniWidth = 0
var miniHeight = 0
//get current windowsize
if (cmdVarBin.miniWindowSize) {
	miniWidth = cmdVarBin.miniWindowSize.width
	miniHeight = cmdVarBin.miniWindowSize.height
}

//reset flag to keep from reopening
cmdVarBin.hidden = false

switch (nKey)
{
	case 1:
		var sLastCommand = getLastInput(-1);
		sInput = '';
		if (sLastCommand)
		{
			globals.consoleInput = sLastCommand;
			forms[formName].elements.fldInput.caretPosition = (sLastCommand.length) + 1;
		}
		break;
	
		
	case 3:
		var sLastCommand = getLastInput(1);
		sInput = '';
		if (sLastCommand)
		{
			globals.consoleInput = sLastCommand;
			forms[formName].elements.fldInput.caretPosition = (sLastCommand.length) + 1;
		}
		break;
}


if (!sInput)
{
	return false;
}


cmdVarBin.attemptHash[sInput] = cmdVarBin.attemptSet.length;
cmdVarBin.attemptSet.push(sInput)


cmdVarBin.commandIndex = cmdVarBin.attemptHash[sInput] + 1

globals.consoleInput = null;

var oWork = new Object();
var oSend = new Object();
var bResult;

oWork.split = sInput.split(' ');
oSend.command = ('console_' + oWork.split[0]).toLowerCase();

oWork.split.shift();
oSend.arg = oWork.split.join(' ');

oSend.dest = oSend.arg.split('->')[1];

oSend.arg = oSend.arg.split('->')[0];

sInput = stringReplace(sInput, '<', '&lt;');
sInput.result = stringReplace(sInput, '>', '&gt;');
sInput = stringReplace(sInput, '\n', '<br>');

cmdVarBin.resultSet.push('<b>kmd:></b> ' + sInput)

if (forms[formName][oSend.command])
{
	bResult = forms[formName][oSend.command](oSend);
	
	if (bResult)
	{
		cmdVarBin.resultSet.push(oSend.result);
		cmdVarBin.commandSet.unshift(sInput);
	}
	else
	{
		cmdVarBin.resultSet.push('<b>Error:</b>&nbsp;' + oSend.result);
	}
}
else
{
	cmdVarBin.resultSet.push('Invalid Command');
}

drawOutput();

elements.fldInput.requestFocus(false)

//number of lines
var numLines = utils.stringPatternCount(globals.consoleOutput,'\n')
var currentTab = solutionPrefs.panel.toolbar.selectedTab
var statusTabs = solutionPrefs.panel.toolbar
var tabParent = statusTabs[currentTab - 4].formName

//first time popDown called
if (! forms[tabParent].popDown) {
	forms[tabParent].popDown = 'hide'
}

//if popdown not showing, show...unless hide command invoked - otherwise resize as needed
if (cmdVarBin.hidden != true && sInput != 'hide') {
		
	var formName = solutionPrefs.config.formNameBase
	var statusStartX = (solutionPrefs.config.webClient) ? forms[formName + '__header'].elements.split_tool_find.getLocationX() : forms[formName + '__header'].elements.split_tool_find.getX()
	var statusWidth = forms[formName + '__header__toolbar'].elements.tab_toolbar.getWidth()
	var indent = 0
	var tabWidth = statusWidth-(indent*2)
	var tabHeight = numLines * 15 + 25
	var headerHeight = (solutionPrefs.config.webClient) ? 45 : 44
	
	//location offset for design mode
	if (solutionPrefs.design.statusDesign) {
		var y = 42 + headerHeight
	}
	else {
		var y = 0 + headerHeight
	}
	
	//check if larger than current window
	if (tabHeight >= (application.getWindowHeight() - 50 + y)) {
		tabHeight = application.getWindowHeight() - 130
		
		//save down new values
		cmdVarBin.miniWindowSize = new Object()
		cmdVarBin.miniWindowSize.width = forms[formName + '__header__toolbar'].elements.tab_toolbar.getWidth()
		cmdVarBin.miniWindowSize.height = tabHeight
	}
	
	//roll down
	if (forms[tabParent].popDown == 'hide') {
		//set to up/down status to current status
		forms[tabParent].popDown = 'show'
		
		//resize and show tabpanel
		forms[formName].elements.tab_toolbar_popdown.setLocation(statusStartX+indent,y)
		forms[formName].elements.tab_toolbar_popdown.setSize(tabWidth,tabHeight)
		forms[formName].elements.tab_toolbar_popdown.visible = true
		
		//popdown available
		forms[formName + '__header__toolbar'].elements.btn_toolbar_expand.visible = forms[tabParent].popDown != 'show'
		forms[formName + '__header__toolbar'].elements.btn_toolbar_collapse.visible = forms[tabParent].popDown == 'show'
	}
	//adjust roll based on height
	else if (miniHeight != cmdVarBin.miniWindowSize.height) {
		//negative number means that needs to go up, positive, go down
		var difference = cmdVarBin.miniWindowSize.height - miniHeight
		
		//check if larger than current window
		if (difference + miniHeight >= (application.getWindowHeight() - 50 + y)) {
			difference = (application.getWindowHeight() - 130) - miniHeight
			
			//save down new values
			cmdVarBin.miniWindowSize = new Object()
			cmdVarBin.miniWindowSize.width = forms[formName + '__header__toolbar'].elements.tab_toolbar.getWidth()
			cmdVarBin.miniWindowSize.height = application.getWindowHeight() - 130
		}
		
		//resize and show tabpanel
		forms[formName].elements.tab_toolbar_popdown.setLocation(statusStartX+indent,y)
		forms[formName].elements.tab_toolbar_popdown.setSize(tabWidth,tabHeight)
		forms[formName].elements.tab_toolbar_popdown.visible = true
	}
}



}

/**
 *
 * @properties={typeid:24,uuid:"7800AFD8-8096-4C73-A686-DB2869F17903"}
 */
function replaceHolders()
{
/******************************************************************************************

	method name : replaceHolders
	usage: replaceHolder(sString, oHolder)

	input: sString: A string containing 'holders' (see description for what a holder is)
		   oHolder: An associative array containing values to replace holders with.
	
	output: sString with all holders replaced for which values were supplied.
	
	description: replaceHolders is a method similar to replaceTags. a 'holder' is a segment
				of text formatted as follows <<holdername>>
				the '<<' & '>>' are the delimiters for a holder, and holdername can be any
				identifying string.
				
				For example
				sString = "<img width=16 height=16 src='<<icon>>'>";
				aHolder.icon = 'media:\\\RenewalPipeline.gif';
				sString = replaceHolders(sString, aHolder);
				**sString would now be: "<img width=16 height=16 src='media:\\\RenewalPipeline.gif'>"
	
	note: 
	
	Change history:
	11/28/05				James Garfield																		created method.

 ******************************************************************************************/

var sString = arguments[0];
var oHolder = arguments[1];

var sSearch;
var sReplace;

var nCount = 0;
var nTotal = 0;

for (var sCol in oHolder)
{
	nTotal++;
	sSearch = "<<" + sCol + ">>";
	sReplace = oHolder[sCol];
	if (null == sReplace)
	{
		sReplace = '';
	}
	
	if (utils.stringPatternCount(sString, sSearch) > 0)
	{
		sString = stringReplace(sString, sSearch, sReplace);
		nCount++;
	}
}

if (nCount == 0)
{
	return sString;
}

return replaceHolders(sString, oHolder);
}

/**
 *
 * @properties={typeid:24,uuid:"68BD750B-7CED-4F6E-A5BF-7BBED7157463"}
 */
function schema_makeSchema()
{
/********************************************************************************
	@method: schema_makeSchema(sServer)

	@arg sServer: 

	@return: 

	@description: 

	@note: 

	@history:	07/26/2006	JAG Created
********************************************************************************/

var sServer = arguments[0];

if (! sServer )
{
	sServer = currentcontroller.getServerName();
}

var aTableName = databaseManager.getTableNames(sServer);
var aColName;

aTableName.sort();
aTableName.reverse();

var aTable;
var aColumn;
var aProp;

var oTable;
var oColumn;

cmdVarBin.schema = new Object();
var oSchema = cmdVarBin.schema

var sRowTpl = ""+
				"	<tr>\n" +
				"		<td border=1 style='border-style:solid;' width=150>Type:&nbsp;<b><i><<Type>></i></b></td>\n" +
				"		<td border=1 style='border-style:solid;' width=150>Length:&nbsp;<i><<Length>></i></td>\n" +
				"		<td border=1 style='border-style:solid;' width=150>Primary Key?:&nbsp;<i><<PrimaryKey>></i></td>\n" +
				"		<td border=1 style='border-style:solid;' width=150>Allow Null?:&nbsp;<i><<NullAllowed>></i></td>\n" +
				"	</tr>\n";
				
var sHTML;

for (var i = 0; i < aTableName.length; i++)
{
	oTable = databaseManager.getTable(sServer, aTableName[i])
	aTable = new Array();
	aColName = oTable.getColumnNames();
	for (var k = 0; k < aColName.length; k++)
	{
		sHTML = "<table border=0 cellpadding=2 cellspacing=-1>\n";
		oColumn = oTable.getColumn(aColName[k]);
		aColumn = new Array();
		aColumn.NullAllowed = oColumn.getAllowNull();
		aColumn.PrimaryKey = oColumn.isRowIdentifier();
		aColumn.Type = getColumnType(aTableName[i] + '.' + aColName[k], sServer);
		aColumn.Length = utils.numberFormat(oColumn.getLength(), 0);
		
		if (aColumn.PrimaryKey)
		{
			aColumn.PrimaryKey = '<b>' + aColumn.PrimaryKey + '</b>';
		}
		if (aColumn.Length == 0)
		{
			aColumn.Length = '&nbsp;';
		}
		sHTML += sRowTpl;
		sHTML = replaceHolders(sHTML, aColumn);
		sHTML += "</table>\n";
		aTable['<b>' + aColName[k] + '</b>'] = sHTML;
	}	
	
	oSchema[aTableName[i]] = aTable;
}

}

/**
 *
 * @properties={typeid:24,uuid:"7E37AE7F-7CFE-4D5D-8733-47A0B3EA558D"}
 */
function showUrl()
{
/********************************************************************************
	@method: showUrl(theURL)

	@return: 

	@description: 

	@note: 

	@history:	10/2/2007 Created
********************************************************************************/

var sTo = arguments[0]

if (sTo)
{
	application.showURL(sTo)
}
}

/**
 *
 * @properties={typeid:24,uuid:"DCCACF81-67FB-4C69-B8F6-F20B76F339C9"}
 */
function SITE_adblocks()
{
globals.CODE_url_handler('http://www.adblocks.com/')
}

/**
 *
 * @properties={typeid:24,uuid:"F9D1A5F6-80D6-47EE-8B40-51F8255F8FF2"}
 */
function sqlHandler()
{
/********************************************************************************
	@method: sqlHandler(oArg)

	@arg oArg: 
	@node oArg.query : [string] SQL statement to execute
	@opt oArg.table : [string] Required if statement is being passed to rawSQL
	@opt oArg.server : [string] Defaults to currentcontroller.getServerName
	@opt oArg.maxRows : [integer] Defaults to 10000 (only statements passed to databaseManager)
	@opt oArg.qArg : [array] Query arguments (only statements passed to databaseManager)
	@opt oArg.holder : [object] Contains values for holder replacement
	@opt oArg.forcedType : [string] 'raw'/'query' Only required for complex queries that may break the simple RegEx filters.
	
	@return: 

	@description: 

	@note: 

	@history:	03/13/2007	JAG Created;
********************************************************************************/

var oArg = arguments[0];

var oReturn;
var oLog;

if (!oArg.query)
{
	oArg.error = "No query specified.";
	return false;
}

if (oArg.error)
{
	delete oArg.error;
}

var oWork = new Object();

for (var sArg in oArg)
{
	oWork[sArg] = oArg[sArg];
}


if (!oWork.server)
{
	oWork.server = controller.getServerName();
}


if (oWork.holder)
{
	oWork.query = replaceHolders(oWork.query, oWork.holder);
}


if (oArg.forcedType)
{
	switch (oArg.forcedType.toLowerCase())
	{
		case 'raw':
			oWork.rawSQL = true;
			break;
			
		case 'query':
			oWork.rawSQL = false;
			break;
			
		default:
			oArg.error = "Unrecognized forced type " + oArg.forcedType + ".";
			return false;
	}
}
else
{
	oWork.rawSQL = true;
	
	oWork.test1 = utils.stringTrim(stringReplace(oWork.query, '\n', ' '));
	oWork.test2 = oWork.test1;

	var rQuery = /^SELECT(.+?)FROM/i;
	var rException = /^SELECT(.+?)INTO/i;
	
	oWork.isSelect = false;
	
	if (rQuery.test(oWork.test1))
	{

		oWork.isSelect = true;
		if (! rException.test(oWork.test2) )
		{
			oWork.isSelectInto = false;
			oWork.rawSQL = false;
		}
		else
		{
			oWork.isSelectInto = true;
		}

	}
}

if (oWork.rawSQL)
{
	oReturn = plugins.rawSQL.executeSQL(oWork.server, oWork.table, oWork.query)
	if (!oReturn)
	{
		oArg.error = plugins.rawSQL.getExceptionMsg();
	}
}
else
{
	if (!oWork.maxRows)
	{
		oWork.maxRows = cmdVarBin.queryRows;
	}
	if (!oWork.qArg)
	{
		oWork.qArg = null;
	}
	
	try
	{
		oReturn = databaseManager.getDataSetByQuery(oWork.server, oWork.query, oWork.qArg, oWork.maxRows);
		oArg.error = oReturn.getExceptionMsg();
	}
	catch (e)
	{
		oArg.error = e.message;
	}
			
	if (oArg.error)
	{
		oReturn = false;
	}
	
}

return oReturn;
}

/**
 *
 * @properties={typeid:24,uuid:"A522FA60-2A4A-490C-A755-E447CEAAD0EF"}
 */
function stringReplace()
{
/********************************************************************************
	@method: stringReplace(sString, sSearch, sReplace)

	@arg sString: String to search/replace
	@arg sSearch: String to search for
	@arg sReplace: String to replace with

	@return: 

	@description: utils.stringReplace does gross stuff when the Replace text is NULL. This method aims to fix that

	@note: 

	@history:	10/24/2006	JAG Created
********************************************************************************/

var sString = arguments[0];
var sSearch = arguments[1];
var sReplace = arguments[2];

if (sString == null)
{
	return '';
}

if (sSearch == null)
{
	return sString;
}

if (sReplace == null)
{
	sReplace = '';
}
//TSE mod 8/10/2012
else if (typeof sReplace == 'boolean' || sReplace instanceof Date) {
	sReplace = sReplace.toString()
}

var sReturn = utils.stringReplace(sString, sSearch, sReplace);

return sReturn;


}

/**
 *
 * @properties={typeid:24,uuid:"E70D421E-EB09-4CC1-B2D3-FADCB996B2C3"}
 */
function view_displayTree()
{
/********************************************************************************
	@method: view_displayTree(sTreeName)

	@arg sTreeName: Tree to draw

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var sTreeName = arguments[0];

var aTree = cmdVarBin.viewTree[sTreeName];

var sHTML = view_drawBranch(aTree);
			
return sHTML;
}

/**
 *
 * @properties={typeid:24,uuid:"D978FD0E-C3B1-4AAB-B584-D662DB83004C"}
 */
function view_drawBranch()
{
/********************************************************************************
	@method: view_drawBranch(aTree)

	@arg aTree: Tree object

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var formName = cmdVarBin.baseFormName

var aTree = arguments[0];

var aNode;
var oVal;

var sLeafTpl   = "<tr><td width=10></td><td width=1 nowrap><<index>></td><td width=10></td><td width=80%><<value>></td></tr>\n";
var sBranchTpl = "<tr><td colspan=4><a class=nodeToggle href=" + '"javascript:forms.' + formName + '.view_toggleNode(<<path>>)"' + "><<state>></a> <<index>></td></tr>\n";
var sExpandTpl = "<tr><td width=10></td><td colspan=3><<branch>></td></tr>\n";

var aHolder;

var aNodeTree = new Array();
var sHTML;

for (var oIndex in aTree.data)
{
	aNode = new Array();

	aNode.index = oIndex;
	
	switch (aTree.state[oIndex])
	{
		case 'leaf':
			aNode.html = sLeafTpl;
			aNode.value = aTree.data[oIndex];
			if (cmdVarBin.plaintext)
			{
				aNode.value = stringReplace(aNode.value, '<', '&lt;');
				aNode.value = stringReplace(aNode.value, '>', '&gt;');
				aNode.value = stringReplace(aNode.value, '\n', '<br>');
			}

			break;
			
		case 'collapsed':
			aNode.html = sBranchTpl;
			if (! aTree.branch[oIndex] )
			{
				try
				{
					aTree.branch[oIndex] = view_newTree(aTree.data[oIndex], aTree.path + '/' + oIndex);
				}
				catch (e)
				{
				
				}
			}
			aNode.path = "'" + aTree.branch[oIndex].path + "'";
			aNode.state = '<tt>[+]</tt>';
			break;
			
		case 'expanded':
			aNode.html = sBranchTpl + sExpandTpl;
			if (! aTree.branch[oIndex] )
			{
				aTree.branch[oIndex] = view_newTree(aTree.data[oIndex], aTree.path + '/' + oIndex);
			}
			aNode.state = '<tt>[-]</tt>';
			aNode.path = "'" + aTree.branch[oIndex].path + "'";
			aNode.branch = view_drawBranch(aTree.branch[oIndex]);
			break;
			
		default:
			break;
	}
	
	aNode.html = replaceHolders(aNode.html, aNode);
	
	aNodeTree.push(aNode);
}


aNodeTree.sort();


sHTML = "<table cellpadding=0 cellspacing=0 border=0 width=\"100%\">\n";

for (var i = 0; i < aNodeTree.length; i++)
{
	sHTML += aNodeTree[i].html;
}

sHTML += "</table>";


return sHTML;
}

/**
 *
 * @properties={typeid:24,uuid:"F910C2F1-DEB7-4B2A-943A-6F9C1E7C2F73"}
 */
function view_drawTree()
{
/********************************************************************************
	@method: view_drawTree(aTree)

	@arg aTree: Tree object

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var aTree = arguments[0];

var sHTML = "<table cellpadding=0 cellspacing=0 border=0>\n";

var aNode;

var sType;

if (!aTree)
{
	return  '&nbsp;';
}

for (var i = 0; i < aTree.length; i++)
{
	aNode = aTree[i];
	
	if (aNode.type == 'leaf')
	{
		sHTML += aNode.html;
	}
}

for (var i = 0; i < aTree.length; i++)
{
	aNode = aTree[i];
	
	if (aNode.type == 'branch')
	{
		sHTML += aNode.html;

		if (aNode.expanded && aNode.value.length > 0)
		{
			sHTML += "<tr><td nowrap>&nbsp;</td><td></td><td>\n" + 
					view_drawTree(aNode.value) +
					"</td></tr>\n";
		}
	}
}

sHTML += "</table>";

return sHTML;
}

/**
 *
 * @properties={typeid:24,uuid:"FCD4312A-8114-40E0-A6FD-0EB38537A9AE"}
 */
function view_newTree()
{
/********************************************************************************
	@method: view_newTree(oObject, sPath)

	@arg oArg: 
	@node oArg.arg : [type] 
	@opt oArg. : [type] 

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var oObject = arguments[0];
var sPath = arguments[1];

if (!sPath)
{
	sPath = '';
}

var aTree = new Object();

var oVal;

aTree.data = oObject;

aTree.state = new Object();
aTree.branch = new Object();
aTree.path = sPath;

for (var oIndex in oObject)
{
	if (oIndex == 'helpMenu')
	{
		continue;
	}
	try
	{
		oVal = oObject[oIndex];
	}
	catch(e)
	{
		oVal = oIndex;
	}
	
	
	if ( isEnumerable(oObject[oIndex]) )
	{
		aTree.state[oIndex] = 'collapsed';
	}
	else
	{
		aTree.state[oIndex] = 'leaf';
	}
}

return aTree;
}

/**
 *
 * @properties={typeid:24,uuid:"AE19000A-7B85-45AE-B030-F8104B98D07F"}
 */
function view_sortNodeTree()
{
/********************************************************************************
	@method: view_sortNodeTree(aNodeA, aNodeB)

	@arg aNodeA: LHS Node
	@arg aNodeB: RHS Node

	@return: 

	@description: Sort Function for sorting a node tree

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

aNodeA = arguments[0];
aNodeB = arguments[1];

var oSortValA = aNodeA.index;
var oSortValB = aNodeB.index;

if (Math.abs(oSortValA) != 'NaN')
{
	oSortValA = parseFloat(oSortValA)
	oSortValB = parseFloat(oSortValB)
}

if (oSortValA <= oSortValB)
{
	return true;
}
else
{
	return false;
}
}

/**
 *
 * @properties={typeid:24,uuid:"D89FF7CF-4B36-4BB4-9457-43066C65A998"}
 */
function view_toggleNode()
{
/********************************************************************************
	@method: view_toggleNode(sPath)

	@arg sPath: Path to node to toggle

	@return: 

	@description: 

	@note: 

	@history:	07/25/2006	JAG Created
********************************************************************************/

var sPath = arguments[0];

var sTreeName = sPath.split(':/')[0];

sPath = sPath.split(':/')[1];

var aTree = cmdVarBin.viewTree[sTreeName];

var aPath = sPath.split('/');

var aBranch = aTree;
var aParent;

for (var i = 1; i < aPath.length; i++)
{
	aParent = aBranch;
	sPath = aPath[i];
	aBranch = aParent.branch[sPath];
}

if (aParent.state[sPath] == 'collapsed')
{
	aParent.state[sPath] = 'expanded';
}
else
{
	aParent.state[sPath] = 'collapsed';
}

cmdVarBin.resultSet[cmdVarBin.viewTreeIndex[sTreeName]] = view_displayTree(sTreeName)

//cmdVarBin.windowSize.width = elements.shpEdge.getWidth();
//cmdVarBin.windowSize.height = elements.shpEdge.getHeight();

drawOutput();

}
