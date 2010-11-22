/**
 * @properties={typeid:35,uuid:"78c3311e-2401-4b46-afbf-1f66d20c2d1b"}
 */
var DATASUTRA_display = null;

/**
 * @properties={typeid:35,uuid:"ffc611ec-e9cf-4980-bb0c-def2045aa93e",variableType:-4}
 */
var DATASUTRA_feedback;

/**
 * @properties={typeid:35,uuid:"f30d47f9-1fbb-4c6c-abe4-fb8dd77c4c83"}
 */
var DATASUTRA_find = null;

/**
 * @properties={typeid:35,uuid:"1e40b95d-c1f9-412e-af82-63b6e4b860f7"}
 */
var DATASUTRA_find_field = '';

/**
 * @properties={typeid:35,uuid:"eee1d8a8-d004-43ff-b546-89ac718bfe9b"}
 */
var DATASUTRA_find_pretty = '';

/**
 * @properties={typeid:35,uuid:"28d6987c-cde4-4c1a-b2c6-3eac80aa1cd1"}
 */
var DATASUTRA_log_status = '';

/**
 * @properties={typeid:35,uuid:"ec493450-b6e1-4cdf-85e0-77b537d600cd",variableType:4}
 */
var DATASUTRA_navigation_set = null;

/**
 * @properties={typeid:35,uuid:"7b178c56-8131-4a29-a948-9cab3f772e44"}
 */
var DATASUTRA_sort = null;

/**
 * Callback method for when solution is closed, force boolean argument tells if this is a force (not stopable) close or not.
 *
 * @param {Boolean} force if false then solution close can be stopped by returning false
 *
 * @returns {Boolean} allow close
 *
 * @properties={typeid:24,uuid:"3431c36a-d389-49ca-81f5-07e2ae81720e"}
 */
function _DATASUTRA_close()
{

/*
 *	TITLE    :	_DATASUTRA_close
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	set logout time for session
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Feb 29, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */
	//check to make sure this method isn't called twice
		//MEMO: called explicitly from 
	
	// still at login screen, just close
	if (application.__parent__.solutionPrefs && solutionPrefs.clientInfo && !solutionPrefs.clientInfo.logID) {
		//mark this client as non-validated
		application.setUserProperty('sutraValid-' + application.getSolutionName() + '-' + application.getServerURL().substr(7),'false')
	
		//when closed from x icon in windowing, will close client
		application.exit()
	}
	//go through proper logout
	else {
		var logOut = plugins.dialogs.showQuestionDialog(
						'Logout',
						'Do you really want to log out?',
						'Yes',
						'No'
					)
	
		if (logOut == 'Yes') {
		
			if (!globals._DATASUTRA_close.inProcess) {
				globals._DATASUTRA_close.inProcess = true	
			
				//working with a validated session
				if (application.__parent__.solutionPrefs && solutionPrefs.clientInfo && solutionPrefs.clientInfo.logID) {
					//punch down solutionPrefs
					//MEMO: any methods (Functions) assigned as a property must be removed
				
					var baseForm = solutionPrefs.config.formNameBase
					var outGroup
					var outSolution
					var shutSolution
					var logoutOK
				
					//only run in client
					if (solutionPrefs.clientInfo.typeServoy == 'client') {
						//repository information
						var fileName = application.getUserProperty('sutraRepository-' + application.getSolutionName() + '-' + application.getServerURL().substr(7))
						if (fileName && !solutionPrefs.repository.api) {
							var repoFile = plugins.file.createFile(fileName)
							plugins.file.writeTXTFile(repoFile,plugins.serialize.toJSON(solutionPrefs.repository))
						}
						/*
						//navigation information
						var fileName = '/Users/yort/.servoy/naviTest.txt' //application.getUserProperty('sutraNavigation-' + application.getSolutionName() + '-' + application.getServerURL().substr(7))
						if (fileName) {
							var navFile = plugins.file.createFile(fileName)
						
							//null out values that should not be saved down
							navigationPrefs.foundsetPool = ''
						
							for (var i in navigationPrefs.byNavItemID) {
								//data in records with universal lists
								if (navigationPrefs.byNavItemID[i].listData && navigationPrefs.byNavItemID[i].listData.clientUUID) {
									navigationPrefs.byNavItemID[i].listData.clientUUID = ''
									navigationPrefs.byNavItemID[i].listData.dateFullRefresh = ''
									navigationPrefs.byNavItemID[i].listData.dateModified = ''
									navigationPrefs.byNavItemID[i].listData.tabFormInstance = ''
									navigationPrefs.byNavItemID[i].listData.tabNumber = ''
								
									navigationPrefs.byNavItemID[i].listData.foundsets = ''
									navigationPrefs.byNavItemID[i].listData.visitedPKs = ''
								}
								//data in records without universal lists
								else {
									navigationPrefs.byNavItemID[i].listData.tabNumber = ''
								}
							}
						
							plugins.file.writeTXTFile(navFile,plugins.serialize.toJSON(navigationPrefs))
						}*/
					}
				
					//run group logout method
					if (solutionPrefs.access.accessControl && globals[solutionPrefs.access.logoutMethod]) {
						outGroup = globals[solutionPrefs.access.logoutMethod]()
					}
				
					//ok to continue?
					if (typeof outGroup != 'boolean' || (typeof outGroup == 'boolean' && outGroup)) {
				
						//run solution logout method
						if (forms[baseForm].method_logout && globals[forms[baseForm].method_logout]) {
							outSolution = globals[forms[baseForm].method_logout]()
						}
					
						//ok to continue?
						if (typeof outSolution != 'boolean' || (typeof outSolution == 'boolean' && outSolution)) {
				
							//run shutdown method
							if (forms[baseForm].method_shutdown && globals[forms[baseForm].method_shutdown]) {
								shutSolution = globals[forms[baseForm].method_shutdown]()
							}
						
							//ok to continue?
							if (typeof shutSolution != 'boolean' || (typeof shutSolution == 'boolean' && shutSolution)) {
								logoutOK = true
							}
						}
					}
				}
			}
			else {
				logoutOK = true
			}
		
			if (logoutOK) {
				//do session logging
				var accessLog = databaseManager.getFoundSet(forms[baseForm].controller.getServerName(),'sutra_access_log')
			
				//find record for current user
				accessLog.find()
				accessLog.id_log = solutionPrefs.clientInfo.logID
				var results = accessLog.search()
			
				if (results == 1) {
					accessLog.date_logout = application.getServerTimeStamp()
					databaseManager.saveData()
				}
			
				//do access control logging, pref update
				if (solutionPrefs.access.accessControl) {
					//save down developer mode state
					var fsUser = databaseManager.getFoundSet(forms[baseForm].controller.getServerName(),'sutra_access_user')
				
					//find record for current user
					fsUser.find()
					fsUser.id_user = solutionPrefs.access.userID
					var results = fsUser.search()
				
					//there is a user and the developer mode setting has changed during the session
					if (results == 1 && (fsUser.developer_mode != ((solutionPrefs.design.statusDesign) ? 1 : 0))) {
						fsUser.developer_mode = (solutionPrefs.design.statusDesign) ? 1 : 0
						databaseManager.saveData()
					}
				}						
			
				//mark this client as non-validated
				application.setUserProperty('sutraValid-' + application.getSolutionName() + '-' + application.getServerURL().substr(7),'false')
			
				//when closed from logout option in action wheel, will reopen
				//when closed from x icon in windowing, will close client
				application.closeSolution(application.getSolutionName())
			}
		}
	
		if (!logoutOK) {
			//if method gets this far, time to invalidate it
			globals._DATASUTRA_close.inProcess = null
		
			if (logOut == 'Yes') {
				//show info that logout canceled
				plugins.dialogs.showErrorDialog(
						'Error',
						'Log out aborted'
				)
			}
		
			return false
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"88e6212c-4262-49fa-b8a6-0b23cceaab7d"}
 */
function _DATASUTRA_error()
{

/*
 *	TITLE    :	_DATASUTRA_error
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	log any errors to the sutra_error table
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	_DATASUTRA_error()
 *			  	
 *	MODIFIED :	July 16, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */


var x = arguments[0]
var y = arguments[1]
var z = arguments[2]

plugins.dialogs.showErrorDialog('Global error','Arguments: '+x)
/*
var error = arguments[0];
application.output("Exception Object: " + error)
application.output("MSG: " + error.getMessage())
if (error.isServoyException)
{
	application.output("is a ServoyException")
	application.output("Errorcode: " + error.getErrorCode())
  if (error.getErrorCode() == ServoyException.SAVE_FAILED)
  {
	  plugins.dialogs.showErrorDialog( "Error",  "It seems you did not fill in a required field", 'OK');
	  
	  //Get the failed records after a save
	  var array = databaseManager.getFailedRecords()
	  for( var i = 0 ; i < array.length ; i++ )
	  {
		  var record = array[i];
		  application.output(record.exception);
		  if (record.exception.isDataException)
		  {
			  application.output("SQL: "+record.exception.getSQL())
			  application.output("SQLState: "+record.exception.getSQLState())
			  application.output("VendorErrorCode: "+record.exception.getVendorErrorCode())
		  }
	  }
  }
}*/
}

/**
 *
 * @properties={typeid:24,uuid:"b3b6d503-9f36-459f-9cbd-256e1d068c77"}
 */
function _DATASUTRA_open()
{

/*
 *	TITLE    :	_DATASUTRA_open
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	Set soltuionPrefs code global
 *			  	Set window size/location and toolbars showing
 *			  	Get the names of all forms in this solution and all included modules
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	March 27, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */


//headless client
if (application.getApplicationType() == APPLICATION_TYPES.HEADLESS_CLIENT) {
	return arguments[0]
}
//normal startup
else {
	var navigationList = 'NAV_0L_solution'
	var prefForm = 'DATASUTRA_0F_solution__error_1F'
	var baseForm = 'DATASUTRA_0F_solution'
	var serverName = forms[prefForm].controller.getServerName()
	
	//bring in new data if necessary
	//globals.DATA_import()
	
	// //PART I: Create large code global to be used elsewhere
	
	if (! application.__parent__.solutionPrefs) {
		
		solutionPrefs = new Object()
	
	}
	
	/*
	//	//check for correct version of plugin
	//if incorrect version, abort
	if (!globals.PLUGIN_check()) {
		forms.DATASUTRA_0F_solution__error.controller.show()
	}
	//continue with method
	else {*/
	
	//mark this client as non-validated
	application.setUserProperty('sutraValid' + application.getSolutionName() + '-' + application.getServerURL().substr(7),'false')
	
	//if no license or invalid license, show license key enter place
	if (utils.hasRecords(forms[prefForm].foundset) && 
		(forms[prefForm].license_type != 'Demo') && 
		!forms.PREF_0F_solution__license.ACTION_validate(true,true)) {
		
		forms.DATASUTRA_0F_solution__error.controller.show()
		forms.PREF_0L_deployment.GO_five()
	}
	//if no engine data, show import/export screen
	else if (!utils.hasRecords(forms[prefForm].foundset)) {
		forms.DATASUTRA_0F_solution__error.controller.show()
		forms.PREF_0L_deployment.GO_three()
	}
	//continue with method
	else {
		
		// //PART II: swap stylesheets (do before!!! touching any form)
		var verOS = (plugins.sutra) ? plugins.sutra.getOSVersion() : ''
		var styleNames = new Array('_DATASUTRA_','ds_WIN','ds_MAC','ds_MAC_leopard','ds_LINUX')
		
		//grab the textual values for all style sheets from repository in <= 3.5.x or >= 4.x client
		if ((utils.stringToNumber(application.getVersion()) < 4) ||
			(utils.stringToNumber(application.getVersion()) >= 4 && application.getApplicationType() == 3) ||
			(utils.stringToNumber(application.getVersion()) >= 5 && !application.isInDeveloper())) {
			
			//get root_element_id/revision
			var repositoryServer = 'repository_server'
			var args = styleNames
			var query = "SELECT name, root_element_id, active_release FROM servoy_root_elements WHERE name IN (?"
				for (var i = 1; i < styleNames.length ; i++) {
					query += ', ?'
				}
				query += ') ' +
						'AND object_type_id = 10' //only get styles
			var dataset = databaseManager.getDataSetByQuery(
							repositoryServer,
							query,
							args,
							-1
						)
			
			//overwrite style array so that in same order
			dataset.sort(1,true)
			var styleNames = new Object()
			
			for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
				//get style text
				query = "SELECT property_value FROM servoy_element_properties " +
							"WHERE element_id = ? AND revision = " +
								"(SELECT revision FROM servoy_releases where element_id = ? AND release_number = ?) " +
							"AND content_id = 280"
				args = [dataset.getValue(i,2),dataset.getValue(i,2),dataset.getValue(i,3)]
				var datasetTwo = databaseManager.getDataSetByQuery(
								repositoryServer,
								query,
								args,
								-1
							)
				
				//we got the style's text, punch into object to check later
				if (datasetTwo) {
					styleNames[dataset.getValue(i,1)] = datasetTwo.getValue(1,1)
				}
			}
		}
		//TODO: workspace based
		else {
			//not required so much because style bug fixed
		}
		
		//swap stylesheets (expected behavior is that only _DATASUTRA_ has anything assigned to it, but to cover the old ID 10 T error....
		if (application.getOSName() == 'Mac OS X') {
			//special leopard stylesheet
			if (utils.stringPatternCount(verOS,'10.5') || utils.stringPatternCount(verOS,'10.6')) {
				//if _DATASUTRA_ is the same as *, don't swap
				if (styleNames['_DATASUTRA_'] != styleNames['ds_MAC_leopard']) {
					application.overrideStyle('_DATASUTRA_','ds_MAC_leopard')
				}
				application.overrideStyle('ds_WIN','ds_MAC_leopard')
				application.overrideStyle('ds_MAC','ds_MAC_leopard')
				application.overrideStyle('ds_LINUX','ds_MAC_leopard')
			}
			//tiger, panther, jaguar or there isn't a fw plugin installed
			else {
				//if _DATASUTRA_ is the same as *, don't swap
				if (styleNames['_DATASUTRA_'] != styleNames['ds_MAC']) {
					application.overrideStyle('_DATASUTRA_','ds_MAC')
				}
				application.overrideStyle('ds_WIN','ds_MAC')
				application.overrideStyle('ds_MAC_leopard','ds_MAC')
				application.overrideStyle('ds_LINUX','ds_MAC')
			}
		}
		//linux
		else if (utils.stringPatternCount(application.getOSName(),'Linux')) {
			//if _DATASUTRA_ is the same as *, don't swap
			if (styleNames['_DATASUTRA_'] != styleNames['ds_LINUX']) {
				application.overrideStyle('_DATASUTRA_','ds_LINUX')
			}
			application.overrideStyle('ds_MAC','ds_LINUX')
			application.overrideStyle('ds_MAC_leopard','ds_LINUX')
			application.overrideStyle('ds_WIN','ds_LINUX')
		}
		else {
			//if _DATASUTRA_ is the same as *, don't swap
			if (styleNames['_DATASUTRA_'] != styleNames['ds_WIN']) {
				application.overrideStyle('_DATASUTRA_','ds_WIN')
			}
			application.overrideStyle('ds_MAC','ds_WIN')
			application.overrideStyle('ds_MAC_leopard','ds_WIN')
			application.overrideStyle('ds_LINUX','ds_WIN')
		}
		
		
		
		if (!forms.PREF_0F_solution__license.ACTION_validate(true,true)) {
		/*	plugins.dialogs.showErrorDialog(
							'Licensing error',
							'The license entered has expired'
						)
			return	
			
			//running in client in demo mode, show license entry page
			if (application.getApplicationType() == 2 && solutionPrefs.config.demoMode) {
				forms.DATASUTRA_0F_solution__error.controller.show()
				forms.DATASUTRA_0F_solution__error.elements.tab_main.tabIndex = 3
				
				return
			}
			//running in non-developer
			else if (application.getApplicationType() != 3) {
				plugins.dialogs.showErrorDialog(
						'Demo mode',
						'Data Sutra is running in demo mode.\n\n' +
						'Client will now close.'
					)
				
				application.exit()
			}
			//set status text that in demo mode
			else {*/
				application.setStatusText(
							'Data Sutra is running in Demo mode',
							'Visit http://www.data-sutra.com/ to license Data Sutra'
						)
			//}
		}
		
		//set up jasper directory
		if (forms[prefForm].jasper_directory) {
			var jasperDir = utils.stringReplace(forms[prefForm].jasper_directory,"\\", "/")
			if (jasperDir && plugins.jasperPluginRMI) {
				plugins.jasperPluginRMI.reportDirectory = jasperDir
			}
		}
		
		// //PART III: fill code global
			solutionPrefs.config = {
						//default language
						language : (forms[prefForm].i18n_default) ? forms[prefForm].i18n_default : 'en',
						//container form name
						formNameBase : baseForm,
						//toggle status
						navigationCollapse : (forms[prefForm].navigation_collapse_auto) ? true : false,
						//timer object
						timer : new Object(),
						//object for frameworks engine, design bar, preload, etc. changes
						prefs : { 
								formPreload : ((forms[prefForm].preload_toplevel) ? true : false),
								formPreloadGray : ((forms[prefForm].preload_blackout) ? false : true)
							},
						//helpMode status
						helpMode : false,
						//record navigator status
						recordNavigatorStatus : true
					}
		
		//information about client
			solutionPrefs.clientInfo = globals.PREF_set_client_info()
			
		//default screen attributes
			solutionPrefs.screenAttrib = globals.PREF_set_screen_attrib()
			
		//default sleep value for list
			solutionPrefs.listSetup = globals.PREF_set_list_attrib()
			
		//find settings
			solutionPrefs.fastFind = {
						currentSearch : new Object(),
						findWildcard : (forms[prefForm].find_wildcard) ? forms[prefForm].find_wildcard : '#',
						dateFormat : (forms[prefForm].find_dateformat) ? forms[prefForm].find_dateformat : i18n.getDefaultDateFormat()
					}
			
		//browsing history
			solutionPrefs.history = new Array()
		
		//get tooltips
		//TODO: store on client
			solutionPrefs.i18n = globals.TIP_load_tips()
		
		
		// //PART V: Get the names of all modules and all forms in this solution
		
		var dsRepoFile = application.getUserProperty('sutraRepository-' + application.getSolutionName() + '-' + application.getServerURL().substr(7))
		var dsRepoChecksum = application.getUserProperty('sutraRepositoryChecksum-' + application.getSolutionName() + '-' + application.getServerURL().substr(7))
		
		//set flag that this it first time solution run on this machine
		if (!dsRepoFile) {
			solutionPrefs.config.firstRun = true
		}
		
		solutionPrefs.repository = new Object()
		
		//set true/false based on whether running in Servoy 4 developer
		if (forms[prefForm].repository_api || (utils.stringToNumber(solutionPrefs.clientInfo.verServoy) >= 4 && solutionPrefs.clientInfo.typeServoy == 'developer')) {
			solutionPrefs.repository.api = true
		}
		
		//running in serclipse using a workspace
		if (solutionPrefs.clientInfo.typeServoy == 'developer' && utils.stringToNumber(solutionPrefs.clientInfo.verServoy) >= 4) {
			solutionPrefs.repository.workspace = new Object()
			
			//get everything in the workspace directory (forms and relations)
			globals.CODE_workspace_data()
			
			//limit to included modules
			globals.CODE_workspace_module()
			solutionPrefs.repository.allModules = repositoryPrefs.allModules
		}		
		//only get methods from repository in <= 3.5.x or >= 4.x client
		else if (!solutionPrefs.repository.api) {
			//when in developer, rebuild repositoryPrefs fresh each time
			if (application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT && application.isInDeveloper()) {
				globals.VL_module_names()
				solutionPrefs.repository.allModules = repositoryPrefs.allModules
				
				globals.VL_form_names()
				solutionPrefs.repository.allForms = repositoryPrefs.allForms
				solutionPrefs.repository.allFormsByTable = repositoryPrefs.allFormsByTable
				
				globals.VL_relation_names()
				solutionPrefs.repository.relations = repositoryPrefs.relations
				
				//null out temporary global var
				repositoryPrefs = undefined
			}
			//client json is not the same as the server's, pump it down
			else if (dsRepoChecksum != forms[prefForm].repository_checksum && forms[prefForm].repository_node) {
				//load server json into client memory
				solutionPrefs.repository = plugins.serialize.fromJSON(forms[prefForm].repository_node)
				
				//save json into servoy properties file
				
				var fileName = plugins.file.getHomeDirectory()+'/.servoy/sutraRepository.properties'
				var repoFile = plugins.file.createFile(fileName)
				plugins.file.writeTXTFile(repoFile,plugins.serialize.toJSON(solutionPrefs.repository))
				application.setUserProperty('sutraRepository-' + application.getSolutionName() + '-' + application.getServerURL().substr(7),fileName)
				application.setUserProperty('sutraRepositoryChecksum-' + application.getSolutionName() + '-' + application.getServerURL().substr(7),forms[prefForm].repository_checksum)
				
				//set module value list
				var modulesDistinct = new Array()
				for (var i in solutionPrefs.repository.allModules) {
					modulesDistinct[modulesDistinct.length] = solutionPrefs.repository.allModules[i].moduleName
				}
				modulesDistinct.sort()
				
				application.setValueListItems('NAV_modules_included', modulesDistinct)
			}
			//client json is the same as the server's, use it
			else if (dsRepoFile && dsRepoFile.length) {
				//read in file
				var dsRepo = plugins.file.readTXTFile(dsRepoFile)
				
				//load client json into client memory
				solutionPrefs.repository = plugins.serialize.fromJSON(dsRepo)
				
				//set module value list
				var modulesDistinct = new Array()
				for (var i in solutionPrefs.repository.allModules) {
					modulesDistinct[modulesDistinct.length] = solutionPrefs.repository.allModules[i].moduleName
				}
				modulesDistinct.sort()
				
				application.setValueListItems('NAV_modules_included', modulesDistinct)
			}
			//something is amiss, disable repo hits
			else {
				solutionPrefs.repository.api = true
			}
		}
		
		/*
		//turn off all toolbars if in 4 developer
		if (utils.stringToNumber(solutionPrefs.clientInfo.verServoy) >= 4 && solutionPrefs.clientInfo.typeServoy == 'developer') {
			application.setToolbarVisible('align',false)
			application.setToolbarVisible('design',false)
			application.setToolbarVisible('distribute',false)
			application.setToolbarVisible('draw',false)
			application.setToolbarVisible('edit',false)
			application.setToolbarVisible('text',false)
		}
		*/
		//hide toolbars, disable data import/export unless in developer
		if (solutionPrefs.clientInfo.typeServoy != 'developer') {
			
			//running servoy classic, turn off all other rif-raf
			if (utils.stringToNumber(solutionPrefs.clientInfo.verServoy) < 4) {
				application.setToolbarVisible('align',false)
				application.setToolbarVisible('design',false)
				application.setToolbarVisible('distribute',false)
				application.setToolbarVisible('draw',false)
			}
			
			application.setToolbarVisible('edit',false)
			application.setToolbarVisible('text',false)
			
			if (plugins.textxport && plugins.excelxport) {
				//disable data export
				plugins.textxport.exportEnabled = false
				plugins.excelxport.exportEnabled = false
				
				//disable data import
				plugins.textxport.importEnabled = false
				plugins.excelxport.importEnabled = false
			}
			
			//kiosk mode, now inside of window
			if (plugins.window && plugins.window.setFullScreen) {
				plugins.window.getMenuBar().setVisible(solutionPrefs.screenAttrib.kiosk.showMenu)
				plugins.window.setToolBarVisible(solutionPrefs.screenAttrib.kiosk.showToolbar)
				plugins.window.setStatusBarVisible(solutionPrefs.screenAttrib.kiosk.showStatusBar)
				
				if (solutionPrefs.screenAttrib.kiosk.fullScreen) {
					plugins.window.setFullScreen(true)
				}
			}
			//window plugin not available, use deprecated kioskmode
			else if (plugins.kioskmode) {
				plugins.kioskmode.setMenuVisible(solutionPrefs.screenAttrib.kiosk.showMenu)
				plugins.kioskmode.setToolBarVisible(solutionPrefs.screenAttrib.kiosk.showToolbar)
				plugins.kioskmode.setStatusBarVisible(solutionPrefs.screenAttrib.kiosk.showStatusBar)
				
				if (solutionPrefs.screenAttrib.kiosk.fullScreen) {
					plugins.kioskmode.setFullScreen(true)
				}
			}
		}
		
		//in webclient, go to different base form
		if (solutionPrefs.clientInfo.typeServoy == 'web client') {
			//
		}
		
		
		// //PART X: check for included framework components
			solutionPrefs.design = {
							modes 	: {
								dictionary : {
										navigation : 'DEV_0F_solution__designbar_1F__navigation',
										universallist : 'DEV_0F_solution__designbar_1F__universallist',
										fastfind : 'DEV_0F_solution__designbar_1F__fastfind',
										buttonadd : 'DEV_0F_solution__designbar_1F__button_add',
										buttonaction : 'DEV_0F_solution__designbar_1F__button_action',
										buttonreport : 'DEV_0F_solution__designbar_1F__button_report',
										spec : 'DEV_0F_solution__designbar_1F__spec',
										task : 'DEV_0L_task',
										help : 'DEV_0F_solution__designbar_1F__help'
									}
								}
						}
			
			/*
			var developModule = false
			if (!solutionPrefs.repository.api) {
				for (var j in solutionPrefs.repository.allModules) {
					if (j == 'dev_DEV_developer') {
						developModule = true
						solutionPrefs.design = new Object()
					}
				}
			}
			else {
				developModule = true
				solutionPrefs.design = new Object()
			}
			*/
	
			
		//	//PART WHOKNOWS: run startup method
		if (forms[prefForm].method_startup && globals[forms[prefForm].method_startup]) {
			globals[forms[prefForm].method_startup]()
		}
		
		//punch in id of configuration navigation set
		var navigationSet = databaseManager.getFoundSet(serverName,'sutra_navigation')
		navigationSet.clear()
		navigationSet.find()
		navigationSet.flag_config = 1
		var results = navigationSet.search()
		if (results) {
			solutionPrefs.config.fwNavigationID = navigationSet.id_navigation
		}
		
		//hack to get rid of color flashing issues
		var bkgndLight = new Packages.java.awt.Color(13752290)
		forms[baseForm].elements.bean_wrapper_1.background = bkgndLight
		forms[baseForm].elements.bean_wrapper_2.background = bkgndLight
		
		//access and control is bypassed --> running in single user mode
		if (forms[prefForm].login_disabled) {
			
			//login form
			forms.AC_R__login.elements.tab_login.tabIndex = 2
			forms.AC_R__login.loginDisabled = true
			forms[baseForm].elements.tab_content_C.addTab(forms.AC_R__login,'')
			
			//go to workflow maximized view
			globals.SPACE_change('btn_space_7',true)
			
			//set up title toolbar
			solutionPrefs.panel = globals.TOOL_load_panels(null,true)
			
			//set flag that access and control is disabled
			solutionPrefs.access = new Object()
			solutionPrefs.access.accessControl = false
			
			//create log entry for this user
			var fsAccessLog = databaseManager.getFoundSet(serverName,'sutra_access_log')
			
			accessLog = fsAccessLog.getRecord(fsAccessLog.newRecord())
		
			accessLog.servoy_uuid = solutionPrefs.clientInfo.servoyUUID
			accessLog.os_type = solutionPrefs.clientInfo.typeOS
			accessLog.os_version = solutionPrefs.clientInfo.verOS
			accessLog.java_version = solutionPrefs.clientInfo.verJava
			accessLog.servoy_type = solutionPrefs.clientInfo.typeServoy
			accessLog.servoy_version = solutionPrefs.clientInfo.verServoy
			accessLog.laf_type = solutionPrefs.clientInfo.typeLAF
			accessLog.host_name = solutionPrefs.clientInfo.hostName
			accessLog.ip_internal = solutionPrefs.clientInfo.internalIP
			accessLog.ip_external = solutionPrefs.clientInfo.externalIP
			accessLog.time_difference = solutionPrefs.clientInfo.timeOffset
			
			databaseManager.saveData(accessLog)
			
			//save down the access record created
			solutionPrefs.clientInfo.logID = accessLog.id_log
			
			
			// //PART VII: load navigation sets
			//navigation code global
			navigationPrefs = solutionPrefs.config.navEngine = new Object()
			
			//when in developer, rebuild navigationPrefs fresh each time
			if (true) {//solutionPrefs.clientInfo.typeServoy == 'developer') {
				navigationPrefs.foundsetPool = {
												recyclePKs : new Array(),
												omitPKs : new Array(),
												resetRequired : false
											}
				
				//starting position
				var dsUniversalList = databaseManager.getDataSetByQuery(
										serverName, 
										'SELECT id_universal_list FROM sutra_universal_list',
										null,
										1)
				navigationPrefs.foundsetPool.nextFreePK = dsUniversalList.getValue(1,1)
				
				//build navigationPrefs with all navigation sets available
				globals.FX_load_navset(true)
				
			}
			//not in developer, use navigation_node
			else if (forms[prefForm].navigation_node_date && forms[prefForm].navigation_node) {
			//plugins.dialogs.showErrorDialog('client')
				navigationPrefs = forms[prefForm].navigation_node
				
				//set value list used for changing navigation sets
				var navSetNames = new Array()
				var navigationSets = new Array()
				
				for (var i in navigationPrefs.byNavSetName) {
					if (i != 'configPanes') {
						navSetNames.push(navigationPrefs.byNavSetName[i].navSetName)
						navigationSets.push(navigationPrefs.byNavSetName[i].navSetID)
					}
				}
				
				application.setValueListItems('NAV_navigation_set', navSetNames, navigationSets)
			}
			//something not set up correctly
			else {
				return
			}
			
			// //PART VIII: set display status and client info
			
			// set lower right display logged in status
				var loggedUserIP = (solutionPrefs.clientInfo.externalIP == 'UNDEFINED' || utils.stringPatternCount(solutionPrefs.clientInfo.externalIP,'Error') || solutionPrefs.clientInfo.externalIP == 'UNKNOWN') ? solutionPrefs.clientInfo.internalIP : solutionPrefs.clientInfo.externalIP
				
				var loggedHost = solutionPrefs.clientInfo.hostName
				
				var loggedIn = globals.CODE_date_format() + utils.dateFormat(new Date(),  " H:mm")
				globals.DATASUTRA_log_status = 'HOST: ' + loggedHost + '    LOGIN TIME: ' + loggedIn
				
				var lblStatus = '<html><head></head><body>' +
								'HOST: ' + loggedHost + '<br>' +
								'IP: ' + loggedUserIP + '<br>' +
								'</body></html>'
				forms[baseForm + '__footer'].elements.lbl_status.toolTipText = lblStatus
				
		
			// add client info to the server
		
				//clear current info
				application.removeAllClientInfo()
				
				//flag that this client has been validated
				application.addClientInfo('<strong>Data Sutra client</strong>')
				
				var clientInfo = '<!-- User information begin -->'+
						'<table border="0" cellpadding="0" cellspacing="0" width="100%">\n'+
						'<tr><td width="125">Operating system:</td><td>'+solutionPrefs.clientInfo.typeOS+'</td>\n'+
						'<tr><td width="125">OS version:</td><td>'+solutionPrefs.clientInfo.verOS+'</td>\n'+
						'<tr><td width="125">Java version:</td><td>'+solutionPrefs.clientInfo.verJava+'</td>\n'+
						'<tr><td width="125">Servoy LAF:</td><td>'+solutionPrefs.clientInfo.typeLAF+'</td>\n'+
						'<tr><td width="125">Host name:</td><td>'+solutionPrefs.clientInfo.hostName+'</td>\n'+
						'<tr><td width="125">LAN IP:</td><td>'+solutionPrefs.clientInfo.internalIP+'</td>\n'+
						'<tr><td width="125">WAN IP:</td><td>'+solutionPrefs.clientInfo.externalIP+'</td>\n'+
						'<tr><td width="125">Server URL:</td><td>'+application.getServerURL()+'</td>\n'+
						'<tr><td width="125">Time offset:</td><td>'+solutionPrefs.clientInfo.timeOffset+' seconds</td>\n'+
						'<tr><td width="125">Log ID:</td><td>'+solutionPrefs.clientInfo.logID+'</td>\n'+
				        '</table>' +
						'<!-- User information end -->'
						
				//set newly logged in user info
				application.addClientInfo(clientInfo)
				solutionPrefs.clientInfo.adminPage = clientInfo
			
					
			// //PART IV: Set window size/location and toolbars showing
				//only runs on first time solution loaded if fullscreen isn't active
			if (solutionPrefs.config.firstRun && (!solutionPrefs.screenAttrib.kiosk.fullScreen || solutionPrefs.clientInfo.typeServoy == 'developer')) {
				application.setWindowSize(solutionPrefs.screenAttrib.initialScreenWidth,solutionPrefs.screenAttrib.initialScreenHeight)
				
				if (solutionPrefs.screenAttrib.locationCenter) {
					application.setWindowLocation(-1,-1)
				}
				else {
					application.setWindowLocation(solutionPrefs.screenAttrib.locationX,solutionPrefs.screenAttrib.locationY)
				}
			}
			
		}
		//access and control
		else {
			//used to tack on password to actions list
				//deprecated....set flag for FORM_on_load to finish loading in access/control pages
			solutionPrefs.access = {accessControl : true}
			
			//login form
			forms.AC_R__login.elements.tab_login.tabIndex = 1
			forms[baseForm].elements.tab_content_C.addTab(forms.AC_R__login,'')
			
			//re-size screen if too small
			if (application.getWindowWidth() < 950 || application.getWindowHeight() < 650) {
				application.setWindowSize(solutionPrefs.screenAttrib.initialScreenWidth,solutionPrefs.screenAttrib.initialScreenHeight)
				
				if (solutionPrefs.screenAttrib.locationCenter) {
					application.setWindowLocation(-1,-1)
				}
				else {
					application.setWindowLocation(solutionPrefs.screenAttrib.locationX,solutionPrefs.screenAttrib.locationY)
				}
			}
			
			//go to workflow maximized view
			globals.SPACE_change('btn_space_7',true)
			
			//	LOAD defaults for password
			globals.AC_set_password()
				
			//set up title toolbar
			solutionPrefs.panel = globals.TOOL_load_panels(null,true)
			
		}
		
		//	//PART XXXX: deactivate all buttons
		forms[baseForm + '__header'].elements.btn_navset.visible = false
		forms[baseForm + '__header'].elements.btn_space_1.visible = false
		forms[baseForm + '__header'].elements.btn_space_2.visible = false
		forms[baseForm + '__header'].elements.btn_space_3.visible = false
		forms[baseForm + '__header'].elements.btn_space_4.visible = false
		forms[baseForm + '__header'].elements.btn_space_5.visible = false
		forms[baseForm + '__header'].elements.btn_space_6.visible = false
		forms[baseForm + '__header'].elements.btn_space_7.visible = false
		forms[baseForm + '__header'].elements.btn_space_8.visible = false
		forms[baseForm + '__header'].elements.btn_space_9.visible = false
		forms[baseForm + '__header'].elements.btn_space_10.visible = false
		forms[baseForm + '__header'].elements.btn_space_11.visible = false
		forms[baseForm + '__header'].elements.btn_space_12.visible = false
		forms[baseForm + '__header'].elements.btn_space_13.visible = false
		forms[baseForm + '__header'].elements.btn_space_14.visible = false
		forms[baseForm + '__header'].elements.btn_space_dividers.visible = false
		forms[baseForm + '__header__toolbar'].elements.btn_toolbar_toggle.visible = false
		forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.visible = false
		forms[baseForm + '__header__fastfind'].elements.btn_find.visible = false
		forms[baseForm + '__header__fastfind'].elements.find_mid.visible = false
		forms[baseForm + '__header__fastfind'].elements.find_end.visible = false
		forms[baseForm + '__header__fastfind'].elements.fld_find.visible = false
		forms[baseForm + '__header'].elements.btn_pref.visible = false
		forms[baseForm + '__header'].elements.btn_fw_action.visible = false
		forms[baseForm + '__header'].elements.btn_sidebar_expand.visible = false
		forms[baseForm + '__footer'].elements.lbl_status.visible = false
		
		//no top border when... //TODO: really when no toolbars showing on mac
			//mac client or >4 developer
		if (solutionPrefs.clientInfo.typeOS == 'Mac OS X' && !(solutionPrefs.clientInfo.typeServoy == 'developer' && utils.stringToNumber(solutionPrefs.clientInfo.verServoy) < 4)) {
			forms[baseForm + '__header'].elements.gfx_header.setBorder('MatteBorder,0,0,1,0,#333333')
			forms.SIDE_sidebar__header.elements.gfx_header.setBorder('MatteBorder,0,0,1,0,#333333')
		}
		//set top border on graphic when...
		else {
			forms[baseForm + '__header'].elements.gfx_header.setBorder('MatteBorder,1,0,1,0,#333333')
			forms.SIDE_sidebar__header.elements.gfx_header.setBorder('MatteBorder,1,0,1,0,#333333')
		}
			
		// //PART IX: load up title toolbar
		globals.TOOLBAR_load()
		
	}
}


}

/**
 *
 * @properties={typeid:24,uuid:"0d123e49-aae2-458f-abb2-daefe014614e"}
 */
function DATA_import()
{

/*
 *	TITLE    :	DATA_import
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	add new navigation items to configuration navigation set
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Mar 26, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var serverName = forms.DATASUTRA_0F_solution.controller.getServerName()
var navSet = databaseManager.getFoundSet(serverName, 'sutra_navigation')
var navSetItem = databaseManager.getFoundSet(serverName, 'sutra_navigation_item')
var nav_to_navItem = 'nav_navigation_to_navigation_item__all'
var navItem_to_action = 'nav_navigation_item_to_action_item'
var navItem_to_column = 'nav_navigation_item_to_column'
var navItem_to_listDisplay = 'nav_navigation_item_to_list_display'
var listDisplay_to_listDisplayItem = 'nav_list_display_to_list_display_item'

//find config navigation set
navSet.find()
navSet.flag_config = 1
var results = navSet.search()

//set 12 to be the default navigation set if there isn't one
if (results == 0) {
	navSet.find()
	navSet.id_navigation = 12
	var results = navSet.search()
	
	//they are using my default set, set it
	if (results == 1) {
		navSet.flag_config = 1
		databaseManager.saveData()
	}
}

//by hook or crook, the navSet contains the configuration nav set
if (results) {
	var navSetID = navSet.id_navigation
	
	//check to see if config records categorized
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.config_type = 'Admin'
	results = navSetItem.search()
	
	//no admin records, set all configs to be admin
	if (results == 0) {
		navSetItem.find()
		navSetItem.id_navigation = navSetID
		results = navSetItem.search()
	
		var fsUpdater = databaseManager.getFoundSetUpdater(navSetItem)
		fsUpdater.setColumn('config_type','Admin')
		fsUpdater.performUpdate()
	}
	
	//check to see if access and control already created
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.item_name = 'Access & control'
	results = navSetItem.search()
	
	//create access and control
	if (results == 0) {
		//create navigation item
		var record = navSetItem.getRecord(navSetItem.newRecord(false,true))
		
		record.id_navigation = navSetID
		record.item_name = 'Access & control'
		record.description = 'Settings for multi-user mode'
		record.form_to_load = 'AC_0F_group'
		record.node_1 = navSet[nav_to_navItem].getSize() + 1
		record.node_2 = 0
		record.row_status_show = 1
		record.use_fw_list = 1
		record.ds_list_title = 'Security'
		record.bar_item_add = 1
		record.bar_item_action = 1
		record.bar_item_filter = 0
		record.bar_item_tab = 1
		record.form_to_load_table = 'sutra_access_group'
		record.module_filter = 'ds_AC_access_control'
		record.config_type = 'Admin'
		
	}
/*
	//check to see if blog already created
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.item_name = 'Blog setup'
	var results = navSetItem.search()
	
	if (results) {
		navSetItem.deleteAllRecords()
	}
	
	//blog setup
	if (results == 0) {
		//create navigation item
		var record = navSetItem.getRecord(navSetItem.newRecord(false,true))
		
		record.id_navigation = navSetID
		record.node_1 = navSet[nav_to_navItem].getSize() + 1
		record.node_2 = 0
		record.row_status_show = 1
		record.use_fw_list = 1
		record.bar_item_filter = 0
		record.bar_item_tab = 0
		record.module_filter = 'ds_AC_access_control'
		record.config_type = 'Admin'
	}
	else {
		//get navigation item
		var record = navSetItem.getRecord(1)
		
		record[navItem_to_listDisplay].deleteAllRecords()
	}
	
	//continue pumping in the data
	record.item_name = 'Blog setup'
	record.form_to_load_table = 'sutra_blog'
	record.form_to_load = 'AC_0F_blog'
	record.fw_list_title = 'Blogs'
	record.bar_item_add = 1
	record.bar_item_action = 1
	record.space_available = '14\n2\n7'
	record.space_default = 2
	
	//create universal list display
	var record2 = record[navItem_to_listDisplay].getRecord(record[navItem_to_listDisplay].newRecord(false,true))
	
	record2.display_default = 1
	
	//create universal list display items
	var record3 = record2[listDisplay_to_listDisplayItem].getRecord(record2[listDisplay_to_listDisplayItem].newRecord(false,true))
	
	record3.display = '<<blog_name>>'
	record3.row_order = 1
	record3.display_align = 'left'
	record3.header = 'Name'
	record3.field_name = 'blog_name'
	record3.display_width_percent = 80
	
	var record4 = record2[listDisplay_to_listDisplayItem].getRecord(record2[listDisplay_to_listDisplayItem].newRecord(false,true))
	
	record4.display = '<<total_posts>>'
	record4.row_order = 2
	record4.display_align = 'left'
	record4.header = 'Post'
	record4.display_format = 'Number'
	record4.format_mask = '###,###,###'
	record4.field_name = 'total_posts'
	record4.display_width_percent = 20
*/	
	//check to see if report already created
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.item_name = 'Report registry'
	var results = navSetItem.search()
	
	//report setup
	if (results == 0) {
		//create navigation item
		var record = navSetItem.getRecord(navSetItem.newRecord(false,true))
		
		record.id_navigation = navSetID
		record.item_name = 'Report registry'
		record.description = 'Register report layouts for the print action'
		record.form_to_load = 'MGR_0F_report'
		record.node_1 = navSet[nav_to_navItem].getSize() + 1
		record.node_2 = 0
		record.row_status_show = 1
		record.use_fw_list = 0
		record.bar_item_add = 0
		record.bar_item_action = 0
		record.bar_item_filter = 0
		record.bar_item_tab = 0
		record.form_to_load_table = 'sutra_report'
		record.module_filter = 'rsrc_RPT_report'
		record.config_type = 'Admin'
	}
	else {
		//get navigation item
		var record = navSetItem.getRecord(1)
		
		record.space_available = '7'
	}
	
	
	
	//check to see if deployment node already created
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.item_name = 'Deployment'
	var results = navSetItem.search()
	
	//deployment setup
	if (results == 0) {
		//create navigation item
		var record = navSetItem.getRecord(navSetItem.newRecord(false,true))
		
		record.id_navigation = navSetID
		record.item_name = 'Deployment'
		record.description = 'Licensing, static object creation, and other things deployment related'
		record.node_1 = navSet[nav_to_navItem].getSize() + 1
		record.node_2 = 0
		record.row_status_show = 1
		record.use_fw_list = 0
		record.bar_item_add = 0
		record.bar_item_action = 0
		record.bar_item_filter = 0
		record.bar_item_tab = 0
		record.config_type = 'Admin'
	}
	
	
	//check to see if developer tools already created
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.item_name = 'Developer tools'
	var results = navSetItem.search()
	
	//developer tools setup
	if (results == 0) {
		//create navigation item
		var record = navSetItem.getRecord(navSetItem.newRecord(false,true))
		
		record.id_navigation = navSetID
		record.item_name = 'Developer tools'
		record.description = 'Useful tools and reports for the Data Sutra developer'
		record.node_1 = navSet[nav_to_navItem].getSize() + 1
		record.node_2 = 0
		record.row_status_show = 1
		record.use_fw_list = 0
		record.bar_item_add = 0
		record.bar_item_action = 0
		record.bar_item_filter = 0
		record.bar_item_tab = 0
		record.config_type = 'Admin'
	}
		
	//check to see if feedback already created
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.item_name = 'Feedback'
	var results = navSetItem.search()
	
	//feedback setup
	if (results == 0) {
		//create navigation item
		var record = navSetItem.getRecord(navSetItem.newRecord(false,true))
		
		record.id_navigation = navSetID
		record.item_name = 'Feedback'
		record.description = 'Leave feedback for the current screen showing'
		record.node_1 = navSet[nav_to_navItem].getSize() + 1
		record.node_2 = 0
		record.row_status_show = 1
		record.use_fw_list = 0
		record.bar_item_add = 0
		record.bar_item_action = 0
		record.bar_item_filter = 0
		record.bar_item_tab = 0
		record.config_type = 'User'
	}
		
	//check to see if power replace already created
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.item_name = 'Power Replace'
	var results = navSetItem.search()
	
	//power replace setup
	if (results == 0) {
		//create navigation item
		var record = navSetItem.getRecord(navSetItem.newRecord(false,true))
		
		record.id_navigation = navSetID
		record.item_name = 'Power Replace'
		record.description = 'Replace the existing contents of a field in all current records'
		record.node_1 = navSet[nav_to_navItem].getSize() + 1
		record.node_2 = 0
		record.row_status_show = 1
		record.use_fw_list = 0
		record.bar_item_add = 0
		record.bar_item_action = 0
		record.bar_item_filter = 0
		record.bar_item_tab = 0
		record.config_type = 'User'
	}
		
	//check to see if help already created
	navSetItem.find()
	navSetItem.id_navigation = navSetID
	navSetItem.item_name = 'Help'
	var results = navSetItem.search()
	
	//help setup
	if (results == 0) {
		//create navigation item
		var record = navSetItem.getRecord(navSetItem.newRecord(false,true))
		
		record.id_navigation = navSetID
		record.item_name = 'Help'
		record.description = 'Toggle inline help for the workflow screen showing'
		record.node_1 = navSet[nav_to_navItem].getSize() + 1
		record.node_2 = 0
		record.row_status_show = 1
		record.use_fw_list = 0
		record.bar_item_add = 0
		record.bar_item_action = 0
		record.bar_item_filter = 0
		record.bar_item_tab = 0
		record.config_type = 'User'
	}
	
	databaseManager.saveData()
}





}

/**
 *
 * @properties={typeid:24,uuid:"8907f601-f8fb-4dd1-a674-6a20a3473796"}
 */
function DATA_universal_list()
{

var fsUniversalList = databaseManager.getFoundSet(forms[solutionPrefs.config.formNameBase].controller.getServerName(),'sutra_universal_list')
fsUniversalList.loadAllRecords()

var totalRecs = databaseManager.getFoundSetCount(fsUniversalList)

for (var i = totalRecs; i < 100000; i++) {
//for (var i = 1; i < 5000; i++) {
	fsUniversalList.newRecord(false,false)
	
	//save data periodically to avoid lockup at the end
	if (i % 100 == 0) {
		databaseManager.saveData()
	}
}
}

/**
 *
 * @properties={typeid:24,uuid:"48174bfa-d0a4-4e64-935e-b4b73feffa12"}
 */
function DS_ACTIONS_list()
{

/*
 *	TITLE    :	DS_ACTIONS_list
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	show frameworks actions available for current user
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Mar 24, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

//check license
forms.PREF_0F_solution__license.ACTION_validate(true,true)

//name for non-named item
var noName = '**No name**'

if (application.__parent__.solutionPrefs) {
	
	//timed out, throw up error
	if (solutionPrefs.config.prefs.thatsAllFolks) {
		forms.PREF_0F_solution__license.ACTION_status()
		
		plugins.dialogs.showErrorDialog(
							'Demo expired',
							'Demo time expired\n' +
							'Please restart.'
						)
	}
	
	var baseForm = solutionPrefs.config.formNameBase
	var fwAction = application.getMethodTriggerElementName()
	var btnInvisible = 'btn_fw_action_left'
	var inPref = solutionPrefs.config.prefs.preferenceMode
	var currentNavItem = solutionPrefs.config.currentFormID
	
	//using access and control, need allowed configuration modes
	if (solutionPrefs.access && solutionPrefs.access.accessControl) {
		var admin = globals.CODE_copy_object(solutionPrefs.access.allowedAdminPrefs)
		var user = globals.CODE_copy_object(solutionPrefs.access.allowedUserPrefs)
	}
	//no access and control, use default configuration modes
	else {
		var navigationSets = new Array()
		
		//there is a fw config navigation set
		if (solutionPrefs.config.fwNavigationID) {
			//get admin prefs
			var admin = globals.FX_modes_sub('Admin',solutionPrefs.config.fwNavigationID)
			
			//get user prefs
			var user = globals.FX_modes_sub('User',solutionPrefs.config.fwNavigationID)
		}
	}
	
	//help available?
	if (navigationPrefs.byNavItemID[currentNavItem] && navigationPrefs.byNavItemID[currentNavItem].navigationItem) {
	//	var helpAvailable = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpAvailable
		
		var helpForm = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpFormToLoad
		var helpList = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpListToLoad
		var helpDesc = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpDescription
		
		var helpAvailable = helpForm || helpList || helpDesc
	}
	
	//loop over admin modes
	for (var i = 0; i < admin.itemName.length ; i++) {
		//check for design mode
		if (admin.itemName[i] == 'Design mode') {
			var designMode = {
					name	: admin.itemName[i],
					tooltip	: admin.itemDescription[i]
				}
			
			admin.itemName.splice(i,1)
			admin.formName.splice(i,1)
			admin.navItemID.splice(i,1)
			admin.itemDescription.splice(i,1)
			
			//set counter back one
			i--
		}
	}
	
	//loop over user modes
	for (var i = 0; i < user.itemName.length ; i++) {
		//remove if present
			//1- power replace
			//2- feedback when in a preference
			//3- lock solution
			//4- help
		if (user.itemName[i] == 'Power Replace' || 
			(inPref && user.itemName[i] == 'Feedback') ||
			user.itemName[i] == 'Lock session' ||
			user.itemName[i] == 'Help') {
			
			if (user.itemName[i] == 'Lock session') {
				var lockSession = {
						name	: user.itemName[i],
						tooltip	: user.itemDescription[i]
					}
			}
			else if (user.itemName[i] == 'Help' && helpAvailable) {
				var flagHelp = {
						name	: user.itemName[i],
						tooltip	: user.itemDescription[i]
					}
			}
			
			user.itemName.splice(i,1)
			user.formName.splice(i,1)
			user.navItemID.splice(i,1)
			user.itemDescription.splice(i,1)
			
			//set counter back one
			i--
		}
	}
	
	//tack on help when not in a preference or devmode
	if (flagHelp && !inPref && !solutionPrefs.design.statusDesign) {
		var helpText = (solutionPrefs.config.helpMode) ? 'Leave help' : 'Help'
		user.itemName.unshift(helpText)
		user.formName.unshift(null)
		user.navItemID.unshift(null)
		user.itemDescription.unshift(flagHelp.tooltip)
	}
	//add option to change password if access and control enabled and password changing isn't disabled
	if (solutionPrefs.access && solutionPrefs.access.accessControl && !solutionPrefs.access.passNoChange) {
		user.itemName.push('Change password')
		user.formName.push('AC_P_password')
		user.navItemID.push(null)
		user.itemDescription.push('Periodically change your password to ensure security')
	}
	//add option to set custom screen size if access and control
	if (solutionPrefs.access && solutionPrefs.access.accessControl ) {
		user.itemName.push('Save window metrics')
		user.formName.push('AC_P_screen')
		user.navItemID.push(null)
		user.itemDescription.push('Set the current window size, position, and spaces as your new default')
	}
	
	//create arrays
	var valueList = new Array()
	var formList = new Array()
	var navIDList = new Array()
	var descList = new Array()
	var typeList = new Array()
	
	//design mode toggle
	if (!inPref) {
		//design mode is an option, show it
		if (designMode) {
			valueList[valueList.length] = '<html><body><strong>' + ((designMode.name) ? designMode.name : noName) + '</strong></body></html>'
			formList[formList.length] = ''
			navIDList[navIDList.length] = ''
			descList[descList.length] = designMode.tooltip
			typeList.push(null)
		}
		
		//divider required
		if (designMode && ((admin.itemName && admin.itemName.length) || (user.itemName && user.itemName.length))) {
			valueList[valueList.length] = '-'
			formList[formList.length] = ''
			navIDList[navIDList.length] = ''
			descList[descList.length] = ''
			typeList.push(null)
		}
	}
	
	//admin screens
	if (admin.itemName && admin.itemName.length) {
		for (var i = 0; i < admin.itemName.length; i++) {
			valueList[valueList.length] = ((admin.itemName[i]) ? admin.itemName[i] : noName)
			formList[formList.length] = admin.formName[i]
			navIDList[navIDList.length] = admin.navItemID[i]
			descList[descList.length] = admin.itemDescription[i]
			typeList.push('Admin')
		}
	}
	
/*	//sidebars
	if (!inPref && solutionPrefs.panel.sidebar && solutionPrefs.panel.sidebar.length) {
		//there are admin modes, show divider
		if (admin.itemName && admin.itemName.length) {
			valueList[valueList.length] = '----'
			formList[formList.length] = ''
			navIDList[navIDList.length] = ''
			descList[descList.length] = ''
			typeList.push(null)
		}
		
		//punch down all active sidebars
		for (var i = 0; i < solutionPrefs.panel.sidebar.length; i++) {
			valueList[valueList.length] = (solutionPrefs.panel.sidebar[i].tabName) ? solutionPrefs.panel.sidebar[i].tabName : noName
			formList[formList.length] = solutionPrefs.panel.sidebar[i].formName
			navIDList[navIDList.length] = i + 1
			descList[descList.length] = solutionPrefs.panel.sidebar[i].description
			typeList.push('Sidebar')
		}
		
		//there are user modes, show divider
		if (user.itemName && user.itemName.length) {
			valueList[valueList.length] = '----'
			formList[formList.length] = ''
			navIDList[navIDList.length] = ''
			descList[descList.length] = ''
			typeList.push(null)
		}
	}
	//there are admin modes and user modes, show divider
	else*/ if (admin.itemName && admin.itemName.length && user.itemName && user.itemName.length) {
		valueList[valueList.length] = '-'
		formList[formList.length] = ''
		navIDList[navIDList.length] = ''
		descList[descList.length] = ''
		typeList.push(null)
	}
	
	//user screens
	if (user.itemName && user.itemName.length) {
		for (var i = 0; i < user.itemName.length; i++) {
			valueList[valueList.length] = ((user.itemName[i]) ? user.itemName[i] : noName)
			formList[formList.length] = user.formName[i]
			navIDList[navIDList.length] = user.navItemID[i]
			descList[descList.length] = user.itemDescription[i]
			typeList.push('User')
		}
	}
	
	//add on exit preference if in one
	if (inPref) {
		valueList.push('-','<html><body><font color="#FF2823">Exit configuration</font></body></html>')
		formList.push(null,null)
		navIDList.push(null,null)
		descList.push(null,'Return to workflow')
		typeList.push(null)
	}
	
	//there are already some values, show divider
	if (valueList.length) {
		valueList[valueList.length] = '-'
		formList[formList.length] = ''
		navIDList[navIDList.length] = ''
		descList[descList.length] = ''
		typeList.push(null)
	}
	
	//lock screen if a/c enabled, it is an option, and not in a preference
	if (solutionPrefs.access.accessControl && lockSession && !inPref) {
		valueList.push(lockSession.name)
		formList.push(null)
		navIDList.push(null)
		descList.push(lockSession.tooltip)
		typeList.push(null)
	}
	
	//logout
	valueList.push('<html><body><font color="#FF2823">Logout</font></body></html>')
	formList.push(null)
	navIDList.push(null)
	descList.push('Re-open solution as a different user')
	typeList.push(null)
	
	//build menu and set arguments
	var menu = new Array()
	var maxLength = 0
	for ( var j = 0 ; j < valueList.length ; j++ ) {
		//strip away all html until the centermost text piece remains
		var htmlTags = new Array(null,null,valueList[j])
		var htmlTags2 = htmlTags
		while (typeof htmlTags2 == 'object' && htmlTags2 != null) {
			htmlTags2 = htmlTags2[2].match(/<([A-Z][A-Z0-9]*)[^>]*>(.*?)<\/\1>/i)
			if (htmlTags2 != null) {
				htmlTags = htmlTags2
			}
		}
		
		//determine left shift amount
		if (htmlTags[0] != null) {
			if (htmlTags[2].length > maxLength) {
				maxLength = htmlTags[2].length
			}
		}
		else {
			if (valueList[j].length > maxLength) {
				maxLength = valueList[j].length
			}
		}
		
		//when...  ...create checkbox menu item if selected
			//1- in a preference, 
			//2- design mode active
			//3- sidebar showing
		if ((solutionPrefs.config.prefs.preferenceMode && solutionPrefs.config.prefs.paneSelected == navIDList[j]) || 
			(solutionPrefs.design.statusDesign && designMode && designMode.tooltip == descList[j]) || 
			(solutionPrefs.screenAttrib.sidebar.status && typeList[j] == 'Sidebar' && forms[baseForm].elements.tab_content_D.tabIndex == navIDList[j])) {
			
			menu[j] = plugins.popupmenu.createCheckboxMenuItem(valueList[j] + "", DS_ACTIONS_list_control)
			menu[j].setSelected(true)
		}
		//create a normal menu item
		else {
			menu[j] = plugins.popupmenu.createMenuItem(valueList[j] + "", DS_ACTIONS_list_control)
		}
		
		//pass arguments
		menu[j].setMethodArguments(htmlTags[2],formList[j],navIDList[j],typeList[j])
		
		//set tooltip, if there is one
//		if (descList[j]) {
//			menu[j].setToolTipText(descList[j])
//		}
		
		//disable dividers
		if (valueList[j] == '-') {
			menu[j].setEnabled(false)
		}
	}
	
	//move "left" button to correct location
	var currentLocationX = forms[baseForm + '__header'].elements[btnInvisible].getLocationX()
	var currentLocationY = forms[baseForm + '__header'].elements[btnInvisible].getLocationY()
	
	forms[baseForm + '__header'].elements[btnInvisible].setLocation(currentLocationX - maxLength * 5.5, currentLocationY)
	
	//pop left popup menu
	var elem = forms[baseForm + '__header'].elements[btnInvisible]
	if (elem != null) {
		plugins.popupmenu.showPopupMenu(elem, menu)
	}
	
	//set invisible btn back to original location
	forms[baseForm + '__header'].elements[btnInvisible].setLocation(currentLocationX, currentLocationY)
}	
}

/**
 *
 * @properties={typeid:24,uuid:"f98ef471-980b-4629-aabe-d7dba7836022"}
 */
function DS_ACTIONS_list_control()
{

/*
 *	TITLE    :	DS_ACTIONS_list_control
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	July 16, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {
	
	var itemClicked = arguments[0]
	var itemFormName = arguments[1]
	var itemID = arguments[2]
	var itemType = arguments[3]
	var baseForm = solutionPrefs.config.formNameBase
	
	//if a sidebar
	//MEMO: not used; seet SIDE_sidebar__header.TAB_popdown()
	if (itemType == 'Sidebar') {
		//MEMO: itemID overloaded with the tab number of the sidepanel
		
		//turn sidebar off
		if (forms[baseForm].elements.tab_content_D.tabIndex == itemID && forms[baseForm].elements.tab_content_D.visible) {
			globals.SIDEBAR_toggle(false)
		}
		//set tab in sidebar
		else {
			forms[baseForm].elements.tab_content_D.tabIndex = itemID
			
			//if not showing, show sidebar
			globals.SIDEBAR_toggle(true)
		}
		

	}
	//check for non-standard prefpane logout
	else if (itemClicked == 'Logout') {
		application.closeSolution(application.getSolutionName())
	}
	//check for non-standard prefpane lock session
	else if (itemClicked == 'Lock session') {
		//blank screen out
		forms[baseForm].elements.gfx_curtain.transparent = false
		forms[baseForm].elements.gfx_curtain.setImageURL(null)
		forms[baseForm].elements.gfx_curtain.setBorder('MatteBorder,0,0,100,0,#323A4B')
		
		//set location
		forms[baseForm].elements.gfx_curtain.setLocation(0,0)
		//set size
		forms[baseForm].elements.gfx_curtain.setSize(application.getWindowWidth(),application.getWindowHeight())
		
		//set text
		forms[baseForm].elements.gfx_curtain.text = forms[baseForm].solution_name + ' is locked'
		forms[baseForm].elements.gfx_curtain.toolTipText = 'Click to unlock'
		
		//show curtain
		forms[baseForm].elements.gfx_curtain.enabled = true
		forms[baseForm].elements.gfx_curtain.visible = true
		
		//set flag
		solutionPrefs.access.lockStatus = true
	}
	//check for non-standard prefpane feedback
	else if (itemClicked == 'Feedback') {
		//get screensize of window
		var x = application.getWindowX()
		var y = application.getWindowY()
		var width = application.getWindowWidth()
		var height =  application.getWindowHeight()
		
		//make pop-up get out of the way
		forms[baseForm + '__header'].elements.fld_constant.requestFocus(false)
		application.sleep(175)
		
		//get screenshot
		var screenShot = (new java.awt.Robot()).createScreenCapture(new java.awt.Rectangle(x,y,width,height))
		var rawData = new java.io.ByteArrayOutputStream()
		Packages.javax.imageio.ImageIO.write(screenShot,'png',rawData)
		globals.DATASUTRA_feedback = rawData.toByteArray()
		
		//show popup dialog
		application.showFormInDialog(forms.DEV_P_feedback,-1,-1,-1,-1,'Submit feedback',false,false,'feedback',true)
	}
	//check for non-standard prefpane design mode
	else if (itemClicked == 'Design mode') {
		//make sure not in help mode
		if (solutionPrefs.config.helpMode) {
			globals.HELP()
		}
		
		solutionPrefs.design.statusDesign = !solutionPrefs.design.statusDesign
		globals.DEV_mode_toggle()
	}
	//check for non-standard prefpane change password
	else if (itemClicked == 'Change password') {
		forms.AC_P_password.FORM_fid(solutionPrefs.access.userID)
	}
	//check for non-standard prefpane configure screen
	else if (itemClicked == 'Save window metrics') {
		forms.AC_P_screen.FORM_on_show(solutionPrefs.access.userID)
	}
	//anything that needs to exit design mode (help or preferences)
	else {
		//if in design mode, exit it
			//MEMO: we do this to eliminate using design mode where it shouldn't be used
		if (solutionPrefs.design.statusDesign) {
			//we were in design mode
			var designMode = true
			
			//check for where exactly we are
			var possibleModes = new Array(
									'buttonaction',
									'buttonadd',
									'buttonreport',
									'navigation',
									'fastfind',
									'universallist',
									'spec',
									'task',
									'help',
									'prototyper'
								)
			for (var i = 0; i < possibleModes.length; i++) {
				if (solutionPrefs.design.modes[possibleModes[i]]) {
					solutionPrefs.config.prefs.currentMode = possibleModes[i]
					break
				}
			}
			
			solutionPrefs.design.statusDesign = false
			globals.DEV_mode_toggle(true)
		}
		
		//check for non-standard prefpane help
		if (itemClicked == 'Help' || itemClicked == 'Leave help') {
			globals.HELP()
		}
		//exit from settings mode
		else if (itemClicked == 'Exit configuration') {
			//turn on progress indicator
			globals.CALLBACK_progressbar_start(-273,'Loading new configuration data...','This process will soon only update changed information')
			
			//recreate navigationPrefs
			//with a/c
			if (solutionPrefs.access && solutionPrefs.access.accessControl) {
				globals.FX_load_navset(false,solutionPrefs.access.groupID)
			}
			//login disabled
			else {
				globals.FX_load_navset(false)
			}
			
			//save information about current config space setup
			if (solutionPrefs.config.currentFormID && navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID]) {
				navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].spaceStatus = new Array()
				navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].spaceStatus.lastSpace = solutionPrefs.config.activeSpace
				
				for (var i = 1; i <= 14; i++) {
					navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].spaceStatus.push(forms[baseForm + '__header'].elements['btn_space_' + i].visible)
				}
			}
			
			//enable nav_chooser, find, and toolbar toggle buttons
			forms[baseForm + '__header'].elements.btn_navset.enabled = true
			forms[baseForm + '__header__fastfind'].elements.btn_find.enabled = true
			forms[baseForm + '__header__fastfind'].elements.find_mid.enabled = true
			forms[baseForm + '__header__fastfind'].elements.find_end.enabled = true
			forms[baseForm + '__header__fastfind'].elements.fld_find.enabled = true
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_toggle.visible = true
			
			//set current form back to workflow
				//MEMO: may be changed by other stuff below
			solutionPrefs.config.currentFormName = solutionPrefs.config.prefs.workflowFormName
			solutionPrefs.config.currentFormID = solutionPrefs.config.prefs.workflowFormID
			
			//load navigation set list back in
			if (forms[baseForm].elements.tab_content_A.tabIndex > 0) {
				forms[baseForm].elements.tab_content_A.removeTabAt(1)
			}
			forms[baseForm].elements.tab_content_A.addTab(forms.NAV_0L_solution,'',null,null,null,null)
			forms[baseForm].elements.tab_content_A.tabIndex = forms[baseForm].elements.tab_content_A.getMaxTabIndex()
			
			//check that last viewed navigation set still ok
			var foundSet = false
			for (var i in navigationPrefs.byNavSetID ) {
				if (i == globals.DATASUTRA_navigation_set && navigationPrefs.byNavSetID[i] != null) {
					foundSet = true
				}
			}
			
			//check that last viewed navigation item still ok
			var foundItem = false
			if (navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set]) {
				for (var j = 0; j < navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set].itemsByOrder.length && !foundItem; j++) {
					if (navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set].itemsByOrder[j].navigationItem.idNavigationItem == solutionPrefs.config.currentFormID) {
						foundItem = true
					}
				}
			}
			
			//this hack disables our licensing checks until after the navigation item list has redrawn
			//it is necessary to prevent our unofficial way of getting two threads going in servoy
			//from backfiring and killing the whole solution
			if (solutionPrefs.config.prefs.thatsAllFolks) {
				var baDeeBaDee = true
				solutionPrefs.config.prefs.thatsAllFolks = null
			}
			
			//last navigation set still present, load at will
			if (foundSet && foundItem) {
				globals.NAV_loadset(true)
				
				//refire load forms method to bring in previous display
				globals.FX_load_forms(null,solutionPrefs.config.currentHistoryPosition,null,null,solutionPrefs.config.prefs.workflowSpace)
			}
			//find how much has changed
			else {
				//get new item to highlight
				if (navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set]) {
					if (navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set].lastNavItem) {
						var lastItemID = navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set].lastNavItem
					}
					//go to first item in the navigation set
					else if (navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set].itemsByOrder.length) {
						var lastItemID = navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set].itemsByOrder[0].navigationItem.idNavigationItem
					}
					//there aren't any nav items in this set, load blanks
					else {
						
					}
				}
				
				//there are still items in this set, go to one of them
				if (foundSet && lastItemID) {
					globals.NAV_loadset(true,true)
					
					//refire default load forms method
					globals.FX_load_forms(lastItemID,null,true)
				}
				//load blank screen
				else {
					globals.DATASUTRA_navigation_set = 0
					
					globals.NAV_loadset(true,null)
					
					//refire default load forms method
					globals.FX_load_forms(null,null)
				}
			}
			
			//reload toolbars and sidebars
			solutionPrefs.panel = globals.TOOL_load_panels()
			globals.TOOLBAR_load()
			globals.SIDEBAR_load()
			
			//return toolbar window to most recent position and then clear out the stored value
			if (solutionPrefs.config.prefs.toolbarTabSelected) {
				//formerly selected tab no longer available
				if (solutionPrefs.config.prefs.toolbarTabSelected <= forms[baseForm + '__header__toolbar'].elements.tab_toolbar.getMaxTabIndex()) {
					forms[baseForm + '__header__toolbar'].elements.tab_toolbar.tabIndex = solutionPrefs.config.prefs.toolbarTabSelected
				}
				solutionPrefs.config.prefs.toolbarTabSelected = null
			}
			
			//return sidebar window to most recent position and then clear out the stored value
			if (solutionPrefs.config.prefs.sidebarTabSelected) {
				//formerly selected tab no longer available
				if (solutionPrefs.config.prefs.sidebarTabSelected <= forms[baseForm].elements.tab_content_D.getMaxTabIndex()) {
					forms[baseForm].elements.tab_content_D.tabIndex = solutionPrefs.config.prefs.sidebarTabSelected
				}
				solutionPrefs.config.prefs.sidebarTabSelected = null
			}
			
			//show sidebar
			if (solutionPrefs.config.prefs.sidebar) {
				globals.SIDEBAR_toggle(true,null,true)
				
				solutionPrefs.config.prefs.sidebar = null
			}
			
			//reload tooltips
			solutionPrefs.i18n = globals.TIP_load_tips()
			
			//if we were in designMode, go back to it
			if (solutionPrefs.config.prefs.designMode) {
				solutionPrefs.design.statusDesign = true
				
				if (solutionPrefs.config.prefs.currentMode) {
					solutionPrefs.design.modes[solutionPrefs.config.prefs.currentMode] = true
				}
				
				globals.DEV_mode_toggle()
			}
			
			//show normal frameworks action graphic if not in design mode
			if (!solutionPrefs.design.statusDesign) {
				forms[baseForm + '__header'].elements.btn_fw_action.visible = true
			}
			
			//remove preference related flags
			//solutionPrefs.config.prefs.preferenceMode = false	//MEMO: moved to FX_load_forms
			solutionPrefs.config.prefs.workflowSpace = null
			solutionPrefs.config.prefs.workflowFormName = null
			solutionPrefs.config.prefs.workflowFormID = null
			solutionPrefs.config.prefs.preferenceMode = false
			solutionPrefs.config.prefs.designMode = false
			
			//in servoy 4 or greater
			if (utils.stringToNumber(solutionPrefs.clientInfo.verServoy) >= 4) {
				//retrigger the shown UL to reload
				forms.NAV_T_universal_list.DISPLAY_cycle(true)
				
				if (navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].listData.withButtons) {
					forms.NAV_T_universal_list.FORM_on_show(true)
					forms[baseForm].elements.tab_content_B.tabIndex = 2
					forms.NAV_T_universal_list.elements.tab_ul.tabIndex = navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].listData.tabNumber
				}
				else {
					forms.NAV_T_universal_list__no_buttons.FORM_on_show(true)
					forms[baseForm].elements.tab_content_B.tabIndex = 3
					forms.NAV_T_universal_list__no_buttons.elements.tab_ul.tabIndex = navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].listData.tabNumber
				}
			}
			
			//re-set progress indicator toolbar (already removed from toolbar area)
			globals.CALLBACK_progressbar_stop()
			
			//turn licensing check back on
			if (baDeeBaDee) {
				solutionPrefs.config.prefs.thatsAllFolks = true
			}
		}
		//go to a specific preference
		else if (itemClicked != '----' && itemClicked != 'Design mode') {
			//entering a preference for the first time
			if (!solutionPrefs.config.prefs.preferenceMode) {
				forms[baseForm].elements.sheetz.visible = false
				
				//add preference flag
				solutionPrefs.config.prefs.preferenceMode = true
				
				//save current toolbar tab
				solutionPrefs.config.prefs.toolbarTabSelected = forms[baseForm + '__header__toolbar'].elements.tab_toolbar.tabIndex
				
				//save current sidebar tab
				solutionPrefs.config.prefs.sidebarTabSelected = forms[baseForm].elements.tab_content_D.tabIndex
				
				//if sidebar showing, save it and turn off
				if (solutionPrefs.screenAttrib.sidebar.status) {
					solutionPrefs.config.prefs.sidebar = true
					
					globals.SIDEBAR_toggle(false,null,true)
					application.updateUI()
				}
				
				
				//if we were in design mode, save it
				if (designMode) {
					solutionPrefs.config.prefs.designMode = true
				}
				
				//save down workflow name, id and selected space
				solutionPrefs.config.prefs.workflowFormName = solutionPrefs.config.currentFormName
				solutionPrefs.config.prefs.workflowFormID = 
				navigationPrefs.byNavSetID[globals.DATASUTRA_navigation_set].lastNavItem = 
					solutionPrefs.config.currentFormID
				solutionPrefs.config.prefs.workflowSpace = solutionPrefs.config.activeSpace
				
				//save information about current workflow space setup
				if (solutionPrefs.config.prefs.workflowFormID && navigationPrefs.byNavItemID[solutionPrefs.config.prefs.workflowFormID]) {
					navigationPrefs.byNavItemID[solutionPrefs.config.prefs.workflowFormID].spaceStatus = new Array()
					navigationPrefs.byNavItemID[solutionPrefs.config.prefs.workflowFormID].spaceStatus.lastSpace = solutionPrefs.config.prefs.workflowSpace
					
					for (var i = 1; i <= 14; i++) {
						navigationPrefs.byNavItemID[solutionPrefs.config.prefs.workflowFormID].spaceStatus.push(forms[baseForm + '__header'].elements['btn_space_' + i].visible)
					}
				}
				
				//make sure find graphics are the unselected variety
				forms[baseForm + '__header__fastfind'].elements.btn_find.setImageURL('media:///find_magnify.png')
				forms[baseForm + '__header__fastfind'].elements.find_mid.setImageURL('media:///find_middle.png')
				forms[baseForm + '__header__fastfind'].elements.find_end.setImageURL('media:///find_stop.png')
				forms[baseForm + '__header'].elements.fld_constant.requestFocus(false)
				
				//disable nav_chooser, find, and toolbar cycle button
				forms[baseForm + '__header'].elements.btn_navset.enabled = false
				forms[baseForm + '__header__fastfind'].elements.btn_find.enabled = false
				forms[baseForm + '__header__fastfind'].elements.find_mid.enabled = false
				forms[baseForm + '__header__fastfind'].elements.find_end.enabled = false
				forms[baseForm + '__header__fastfind'].elements.fld_find.enabled = false
				forms[baseForm + '__header__toolbar'].elements.btn_toolbar_toggle.visible = false
				
				//hide frameworks action graphic, showing red outline underneath
				forms[baseForm + '__header'].elements.btn_fw_action.visible = false
				
				var prefTab = 'TOOL_config_pane'
				
				//add in preference tab
				forms[baseForm + '__header__toolbar'].elements.tab_toolbar.removeAllTabs()
				if (forms[prefTab]) {
					forms[baseForm + '__header__toolbar'].elements.tab_toolbar.addTab(forms[prefTab],null,'Preference',null,null)
				}
			}
			
			//set flag for check of selected preference
			solutionPrefs.config.prefs.paneSelected = itemID
			
			//load selected preference
			globals.FX_load_preference(itemClicked,itemID)
			
			//change header to display preference selected
			forms.TOOL_config_pane.elements.lbl_title.text = itemClicked
		}
	}
}


}

/**
 *
 * @properties={typeid:24,uuid:"3f630f30-79cc-4c9b-b1dd-c0dee4e28dfb"}
 */
function HELP()
{

/*
 *	TITLE    :	HELP
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	activate help mode for the current screen
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Mar 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {

//MEMO: need to somehow put this section in a Function of it's own
//running in Tano...strip out jsevents for now
if (utils.stringToNumber(application.getVersion()) >= 5) {
	//cast Arguments to array
	var Arguments = new Array()
	for (var i = 0; i < arguments.length; i++) {
		Arguments.push(arguments[i])
	}
	
	//reassign arguments without jsevents
	arguments = Arguments.filter(globals.CODE_jsevent_remove)
}
	var baseForm = solutionPrefs.config.formNameBase
	var currentNavItem = solutionPrefs.config.currentFormID
	var helpDesc = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpDescription
	var helpForm = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpFormToLoad
	var helpList = 'DEV_0F_navigation_item__help'
	var prefName = 'Inline Help'
	var helpTextColor = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpColorText
	var helpBkgndColor = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpColorBackground
	var helpAvailable = helpForm || helpDesc //navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpAvailable
	var stayInHelp = arguments[0]
	
	if (helpAvailable || solutionPrefs.design.statusDesign) {
		//activate
		if (!solutionPrefs.config.helpMode || stayInHelp) {
			//set flag that in helpmode
			globals.DEV_clear_modes()
			solutionPrefs.config.helpMode = true
			
			//we're in design mode, mark that we are in the help config pane
			if (solutionPrefs.design.statusDesign) {
				solutionPrefs.design.modes.help = true
				solutionPrefs.design.currentMode = 'help'
			}
			
			//replace workflow area with help screen, if defined and available
			if ((helpForm) ? forms[helpForm] : false) {
				forms[baseForm].elements.tab_content_C.removeAllTabs()
				forms[baseForm].elements.tab_content_C.addTab(forms[helpForm],'')
				forms[baseForm].elements.tab_content_C.tabIndex = forms[baseForm].elements.tab_content_C.getMaxTabIndex()
			}
			
			//set help text
			globals.DEV_help_description = helpDesc
			forms[helpList].elements.lbl_record_heading.text = 'Help: ' + navigationPrefs.byNavItemID[currentNavItem].navigationItem.itemName
			
			//set colors
			if (helpTextColor) {
				forms[helpList].elements.fld_help_description.fgcolor = '#'+helpTextColor
			}
			else {
				forms[helpList].elements.fld_help_description.fgcolor = '#000000'
			}
			if (helpBkgndColor) {
				forms[helpList].elements.color_background.bgcolor = '#'+helpBkgndColor
			}
			else {
				forms[helpList].elements.color_background.bgcolor = '#D1D7E2'
			}
			
			//if not loaded, add tab
			if (!navigationPrefs.byNavSetName.configPanes.itemsByName[prefName]) {
				
				//assign to list tab panel
				forms[baseForm].elements.tab_content_B.addTab(forms[helpList],'View help',null,null,null,null)
				forms[baseForm].elements.tab_content_B.tabIndex = forms[baseForm].elements.tab_content_B.getMaxTabIndex()
				
				//save status info
				navigationPrefs.byNavSetName.configPanes.itemsByName[prefName] = new Object()
				navigationPrefs.byNavSetName.configPanes.itemsByName[prefName].listData = {
											tabNumber : forms[baseForm].elements.tab_content_B.tabIndex,
											dateAdded : application.getServerTimeStamp()
									}
				
			}
			//form already exists, set tab index
			else {
				forms[baseForm].elements.tab_content_B.tabIndex = navigationPrefs.byNavSetName.configPanes.itemsByName[prefName].listData.tabNumber
			}
		}
		//deactivate
		else {
			//set flag that not in helpmode
			solutionPrefs.config.helpMode = false
			
			//fire load_forms
			globals.FX_load_forms(null,solutionPrefs.config.currentHistoryPosition)
		}
	}
	else {
		plugins.dialogs.showWarningDialog('No help','There is no active help screen for this area')
		solutionPrefs.config.helpMode = false
	}
}

}

/**
 *
 * @properties={typeid:24,uuid:"235b4e76-981c-41f5-831e-bdc6b60daee9"}
 */
function HELP_archive()
{

/*
 *	TITLE    :	HELP
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	activate help mode for the current screen
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Mar 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {
	var baseForm = solutionPrefs.config.formNameBase
	var currentNavItem = solutionPrefs.config.currentFormID
	var helpDesc = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpDescription
	var helpForm = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpFormToLoad
	var helpList = 'DEV_0F_navigation_item__help'
	var prefName = 'Inline Help'
	var helpTextColor = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpColorText
	var helpBkgndColor = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpColorBackground
	var helpAvailable = helpForm || helpDesc //navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpAvailable
	var stayInHelp = arguments[0]
	
	if (helpAvailable || solutionPrefs.design.statusDesign) {
		//activate
		if (!solutionPrefs.config.helpMode || stayInHelp) {
			//set flag that in helpmode
			globals.DEV_clear_modes()
			solutionPrefs.config.helpMode = true
			
			//we're in design mode, mark that we are in the help config pane
			if (solutionPrefs.design.statusDesign) {
				solutionPrefs.design.modes.help = true
				solutionPrefs.design.currentMode = 'help'
			}
			
			//replace workflow area with help screen, if defined and available
			if ((helpForm) ? forms[helpForm] : false) {
				forms[baseForm].elements.tab_content_C.removeAllTabs()
				forms[baseForm].elements.tab_content_C.addTab(forms[helpForm],'')
				forms[baseForm].elements.tab_content_C.tabIndex = forms[baseForm].elements.tab_content_C.getMaxTabIndex()
			}
			
			//set help text
			globals.DEV_help_description = helpDesc
			forms[helpList].elements.lbl_record_heading.text = 'Help: ' + navigationPrefs.byNavItemID[currentNavItem].navigationItem.itemName
			
			//set colors
			if (helpTextColor) {
				forms[helpList].elements.fld_help_description.fgcolor = '#'+helpTextColor
			}
			else {
				forms[helpList].elements.fld_help_description.fgcolor = '#000000'
			}
			if (helpBkgndColor) {
				forms[helpList].elements.color_background.bgcolor = '#'+helpBkgndColor
			}
			else {
				forms[helpList].elements.color_background.bgcolor = '#D1D7E2'
			}
			
			//if not loaded, add tab
			if (!navigationPrefs.byNavSetName.configPanes.itemsByName[prefName]) {
				
				//assign to list tab panel
				forms[baseForm].elements.tab_content_B.addTab(forms[helpList],'View help',null,null,null,null)
				forms[baseForm].elements.tab_content_B.tabIndex = forms[baseForm].elements.tab_content_B.getMaxTabIndex()
				
				//save status info
				navigationPrefs.byNavSetName.configPanes.itemsByName[prefName] = new Object()
				navigationPrefs.byNavSetName.configPanes.itemsByName[prefName].listData = {
											tabNumber : forms[baseForm].elements.tab_content_B.tabIndex,
											dateAdded : application.getServerTimeStamp()
									}
				
			}
			//form already exists, set tab index
			else {
				forms[baseForm].elements.tab_content_B.tabIndex = navigationPrefs.byNavSetName.configPanes.itemsByName[prefName].listData.tabNumber
			}
		}
		//deactivate
		else {
			//set flag that not in helpmode
			solutionPrefs.config.helpMode = false
			
			//fire load_forms
			globals.FX_load_forms(null,solutionPrefs.config.currentHistoryPosition)
		}
	}
	else {
		plugins.dialogs.showWarningDialog('No help','There is no active help screen for this area')
		solutionPrefs.config.helpMode = false
	}
}

}

/**
 *
 * @properties={typeid:24,uuid:"a77efe4c-7006-4568-b006-c0779bb7b647"}
 */
function HELP_sidebar()
{

/*
 *	TITLE    :	HELP
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	activate help mode for the current screen
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Mar 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {
	var baseForm = solutionPrefs.config.formNameBase
	var currentNavItem = solutionPrefs.config.currentFormID
	var helpDesc = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpDescription
	var helpForm = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpFormToLoad
	var helpList = 'DEV_0F_navigation_item__help'
	var prefName = 'Inline Help'
	var helpTextColor = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpColorText
	var helpBkgndColor = navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpColorBackground
	var helpAvailable = helpForm || helpDesc //navigationPrefs.byNavItemID[currentNavItem].navigationItem.helpAvailable
	var stayInHelp = arguments[0]
	
	if (helpAvailable || solutionPrefs.design.statusDesign) {
		//activate
		if (!solutionPrefs.config.helpMode || stayInHelp) {
			//set flag that in helpmode
			globals.DEV_clear_modes()
			solutionPrefs.config.helpMode = true
			
			//we're in design mode, mark that we are in the help config pane
			if (solutionPrefs.design.statusDesign) {
				solutionPrefs.design.modes.help = true
				solutionPrefs.design.currentMode = 'help'
			}
			
			//replace workflow area with help screen, if defined and available
			if ((helpForm) ? forms[helpForm] : false) {
				forms[baseForm].elements.tab_content_C.removeAllTabs()
				forms[baseForm].elements.tab_content_C.addTab(forms[helpForm],'')
				forms[baseForm].elements.tab_content_C.tabIndex = forms[baseForm].elements.tab_content_C.getMaxTabIndex()
			}
			
			//set help text
			globals.DEV_help_description = helpDesc
			forms[helpList].elements.lbl_record_heading.text = 'Help: ' + navigationPrefs.byNavItemID[currentNavItem].navigationItem.itemName
			
			//set colors
			if (helpTextColor) {
				forms[helpList].elements.fld_help_description.fgcolor = '#'+helpTextColor
			}
			else {
				forms[helpList].elements.fld_help_description.fgcolor = '#000000'
			}
			if (helpBkgndColor) {
				forms[helpList].elements.color_background.bgcolor = '#'+helpBkgndColor
			}
			else {
				forms[helpList].elements.color_background.bgcolor = '#D1D7E2'
			}
			
			//if not loaded, add tab
			if (!navigationPrefs.byNavSetName.configPanes.itemsByName[prefName]) {
				
				//assign to list tab panel
				forms[baseForm].elements.tab_content_B.addTab(forms[helpList],'View help',null,null,null,null)
				forms[baseForm].elements.tab_content_B.tabIndex = forms[baseForm].elements.tab_content_B.getMaxTabIndex()
				
				//save status info
				navigationPrefs.byNavSetName.configPanes.itemsByName[prefName] = new Object()
				navigationPrefs.byNavSetName.configPanes.itemsByName[prefName].listData = {
											tabNumber : forms[baseForm].elements.tab_content_B.tabIndex,
											dateAdded : application.getServerTimeStamp()
									}
				
			}
			//form already exists, set tab index
			else {
				forms[baseForm].elements.tab_content_B.tabIndex = navigationPrefs.byNavSetName.configPanes.itemsByName[prefName].listData.tabNumber
			}
		}
		//deactivate
		else {
			//set flag that not in helpmode
			solutionPrefs.config.helpMode = false
			
			//fire load_forms
			globals.FX_load_forms(null,solutionPrefs.config.currentHistoryPosition)
		}
	}
	else {
		plugins.dialogs.showWarningDialog('No help','There is no active help screen for this area')
		solutionPrefs.config.helpMode = false
	}
}

}

/**
 *
 * @properties={typeid:24,uuid:"b3e74e7e-5da7-4752-a6aa-b154b093649f"}
 */
function NAVSET_list()
{

/*
 *	TITLE    :	NAVSET_list
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	show navigation sets
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	June 25, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var formName = application.getMethodTriggerFormName()
var fwNavSet = application.getMethodTriggerElementName()

//validate license
forms.PREF_0F_solution__license.ACTION_validate(true,true)

//timed out, throw up error
if (solutionPrefs.config.prefs.thatsAllFolks) {
	forms.PREF_0F_solution__license.ACTION_status()
	
	plugins.dialogs.showErrorDialog(
						'Demo expired',
						'Demo time expired\n' +
						'Please restart.'
					)
}

//get menu list from a value list
var vlItems = application.getValueListItems('NAV_navigation_set')
var vlDisplay = vlItems.getColumnAsArray(1)
var vlReal = vlItems.getColumnAsArray(2)

//build menu
var menu = new Array()
for ( var i = 0 ; i < vlDisplay.length ; i++ ) {
	//create checkbox menu item if selected
	if (globals.DATASUTRA_navigation_set == vlReal[i]) {
		menu[i] = plugins.popupmenu.createCheckboxMenuItem(vlDisplay[i] + "", NAVSET_list_control)
		menu[i].setSelected(true)
	}
	//create a normal menu item
	else {
		menu[i] = plugins.popupmenu.createMenuItem(vlDisplay[i] + "", NAVSET_list_control)
	}
	
	//set arguments
	menu[i].setMethodArguments(vlReal[i])
	
	//disable dividers
	if (vlDisplay[i] == '----') {
		menu[i].setEnabled(false)
	}
	
}

//pop menu down
var elem = forms[formName].elements[fwNavSet]
if (elem != null && menu.length) {
	plugins.popupmenu.showPopupMenu(elem, menu)
}


}

/**
 *
 * @properties={typeid:24,uuid:"f82228b9-8182-4b66-9ec8-1814d171f819"}
 */
function NAVSET_list_control()
{

/*
 *	TITLE    :	NAVSET_list_control
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	show navigation sets
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	June 25, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs && application.__parent__.navigationPrefs) {

	var itemClicked = arguments[0]
	var oldItem = globals.DATASUTRA_navigation_set
	
	if (itemClicked) {
		//save last selected item when changing navigation sets
		if (oldItem != itemClicked) {
			if (oldItem) {
				navigationPrefs.byNavSetID[oldItem].lastNavItem = solutionPrefs.config.currentFormID
			}
			
			globals.DATASUTRA_navigation_set = itemClicked
			
			globals.NAV_loadset()
		}
	}
}
}

/**
 *
 * @properties={typeid:24,uuid:"9a9bd7c9-df44-4438-a84a-a39224a3ac08"}
 */
function PLUGIN_check()
{

/*
 *	TITLE    :	PLUGIN_check
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	Check for version of Data Sutra plugin
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	version number if present, otherwise false
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Apr 15, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var args = new Array(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6])
var success = plugins.sutra.executeFunction(globals.PLUGIN_check,args,"00000000-1111-1111-1111-000000000000")

//check if plugin
if (success && plugins.sutra) {
	//check if plugin has Fxion
	if (plugins.sutra.getVersion) {
		//check for version of plugin
		if (plugins.sutra.getVersion() == '3.0.0' && success) {
			return true
		}
		//fail
		else {
			return false
		}
	}
	//fail
	else {
		return false
	}
}
//fail
else {
	return false
}
}

/**
 *
 * @properties={typeid:24,uuid:"2eb247e4-13ad-4e7e-852d-e112480a5d00"}
 */
function SIDEBAR_load()
{

/*
 *	TITLE    :	SIDEBAR_load
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	loads enabled sidebars into sidebar area
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	SIDEBAR_load()
 *			  	
 *	MODIFIED :	September 10, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {
	var baseForm = solutionPrefs.config.formNameBase
	var sideForm = 'SIDE_sidebar'
	var sidebars = solutionPrefs.panel.sidebar
	
	//remove all tabs from the sidebar
	forms[sideForm].elements.tab_content.removeAllTabs()
	
	//add in help tab (always the first)	
	forms[sideForm].elements.tab_content.addTab(forms['HELP_0S_documentation'],null,"Help...I'm melting",null,null,null,null,null,1)
	
	//add in tabs to popdown
	if (sidebars.length) {
		//loop through array and add tabs
		for (var i = 0 ; i < sidebars.length ; i++) {
			var statusTab = sidebars[i]
			
			//selected form exists in solution
			if (forms[statusTab.formName]) {
				forms[sideForm].elements.tab_content.addTab(forms[statusTab.formName],null,statusTab.tabName,null,null,null,null,null,i + 2)
			}
			//remove from sidebars
			else {
				sidebars.splice(i,1)
			}
		}
		
		//select first tab
		forms[sideForm].elements.tab_content.tabIndex = 2
		solutionPrefs.panel.sidebar.selectedTab = forms[sideForm].elements.tab_content.tabIndex
		
		/*
		//if first tab, set title
		if (sidebars.length && sidebars[0].tabName) {
			forms[sideForm + '__header'].elements.lbl_header.text = sidebars[0].tabName.toUpperCase()
		}
		else {
			forms[sideForm + '__header'].elements.lbl_header.text = 'Sidebar'.toUpperCase()
		}
		
		//if first tab has pop-out, show it
		if (sidebars.length && sidebars[0].popOut) {
			forms[sideForm + '__header'].elements.btn_popout.visible = true
		}
		else {
			forms[sideForm + '__header'].elements.btn_popout.visible = false
		}
		*/
	}
	
	//show sidebar expand button
	if (sidebars && sidebars.length) {
		forms[baseForm + '__header'].elements.btn_sidebar_expand.visible = true
	}
	
	//toggle action buttons
	forms[sideForm + '__header'].BUTTONS_toggle()
	
	//if only one tab, remove tab changer button
	if (sidebars.length > 1) {
		forms[sideForm + '__header'].elements.btn_tab.visible = true
	}
	else {
		forms[sideForm + '__header'].elements.btn_tab.visible = false
	}
}


}

/**
 * Toggle the right-hand sidebar area.
 * 
 * @param	{Boolean}	[sideToggle] Force the sidebar to be shown or hidden.
 * @param	{Integer}	[sideWidth] Override the default sidebar width.
 * @param	{Boolean}	[sideExpand=false] Changes the behavior from resizing the window to resizing the window's contents when showing a sidebar.
 * 
 * @author	Troy Elliott, Data Mosaic
 * 
 * @properties={typeid:24,uuid:"b2bbd2c2-2b6e-4918-accc-74b3ab9769d6"}
 */
function SIDEBAR_toggle()
{

/*
 *	TITLE    :	SIDEBAR_toggle
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	show/hide sidebar
 *			  	
 *	INPUT    :	1 - true/false to show/hide sidebar
 *			  	2 - override default width for sidebar (optional)
 *			  	3 - don't change expansion status
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	SIDEBAR_toggle()
 *			  	
 *	MODIFIED :	September 8, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */	//MEMO: sideExpand changes the behavior from resizing the window to resizing the window's contents when showing a sidebar

var sideExpand = !globals.CODE_key_pressed('shift')

if (application.__parent__.solutionPrefs) {	

//MEMO: need to somehow put this section in a Function of it's own
//running in Tano...strip out jsevents for now
if (utils.stringToNumber(application.getVersion()) >= 5) {
	//cast Arguments to array
	var Arguments = new Array()
	for (var i = 0; i < arguments.length; i++) {
		Arguments.push(arguments[i])
	}
	
	//reassign arguments without jsevents
	arguments = Arguments.filter(globals.CODE_jsevent_remove)
}

	//timed out, throw up error
	if (solutionPrefs.config.prefs.thatsAllFolks) {
		forms.PREF_0F_solution__license.ACTION_status()
		
		plugins.dialogs.showErrorDialog(
							'Demo expired',
							'Demo time expired\n' +
							'Please restart.'
						)
	}
	
	var baseForm = solutionPrefs.config.formNameBase
	
	var toggle = (typeof arguments[0] == 'boolean') ? arguments[0] : !solutionPrefs.screenAttrib.sidebar.status
	var sidebarWidth = arguments[1] || solutionPrefs.screenAttrib.sidebar.currentSize
	var maxWidth = application.getWindowWidth(null)
	
	if (arguments[2]) {
		sideExpand = false
	}
	
	var headerHeight = forms[baseForm].elements.bean_header.getHeight()
	var mainHeight = forms[baseForm].elements.bean_main.getHeight()
	
	//developer windows
	if (false) {
		
	}
	//windows
	else if (utils.stringPatternCount(solutionPrefs.clientInfo.typeOS,'Windows')) {
		var theme = plugins.sutra.getWindowsTheme()
		
		//aero
		if (utils.stringToNumber(solutionPrefs.clientInfo.verOS) > 6 && theme != 'Classic') {
			var offset = 16
		}
		//luna
		else if (utils.stringPatternCount(solutionPrefs.clientInfo.verOS,'5.1') && theme == 'Luna') {
			var offset = 8
		}
		//classic
		else {
			var offset = 8
		}
	}
	//3.5 developer (mac?)
	else if (solutionPrefs.clientInfo.typeServoy == 'developer' && utils.stringToNumber(solutionPrefs.clientInfo.verServoy) < 4) {
		var offset = 1
	}
	//linux
	else if (false) {
		var offset = 99
	}
	else {
		var offset = 0
	}
	
	
	//toggle on
	if (toggle && sidebarWidth) {
		
		forms[baseForm].elements.bean_wrapper_1.leftComponent = forms[baseForm].elements.bean_wrapper_2
		forms[baseForm].elements.bean_wrapper_1.rightComponent = forms[baseForm].elements.tab_content_D
		forms[baseForm].elements.bean_wrapper_1.resizeWeight = 1
		//sidebar makes window grow
		if (sideExpand) {
			var mainWidth = maxWidth - offset
			maxWidth += sidebarWidth
			application.setWindowSize(maxWidth,application.getWindowHeight(null),null)
			
			forms[baseForm].elements.bean_wrapper_1.dividerLocation = mainWidth
			
			//TODO: reset dividerlocation if dividers showing
			//see DATASUTRA_0F_solution__header.SIDEBAR_expand()
		}
		//sidebar fits inside window
		else {
			var mainWidth = maxWidth - sidebarWidth - offset
			forms[baseForm].elements.bean_wrapper_1.dividerLocation = mainWidth
		}
		
		solutionPrefs.screenAttrib.sidebar.status = true
		
		//hide toggle on graphic
		forms[baseForm + '__header'].elements.btn_sidebar_expand.visible = false
		//forms[baseForm + '__header'].elements.lbl_drag.visible = true
		
		//if first tab showing (help), enter help mode
		if (forms.SIDE_sidebar.elements.tab_content.tabIndex == 1) {
			globals.HELP(true)
		}
		//not on first tab, but in help mode; leave help
		else if (solutionPrefs.config.helpMode) {
			globals.HELP(false)
		}
		
	}
	//toggle off
	else {
		//sidebar makes window shrink
		if (sideExpand) {
			var mainWidth = maxWidth - sidebarWidth
			application.setWindowSize(mainWidth,application.getWindowHeight(null),null)
		}
		//sidebar fits inside window
		else {
			var mainWidth = maxWidth - offset
		}
		
		forms[baseForm].elements.bean_wrapper_1.leftComponent = forms[baseForm].elements.bean_wrapper_2
		forms[baseForm].elements.bean_wrapper_1.rightComponent = null
		
		solutionPrefs.screenAttrib.sidebar.status = false
		
		//show toggle on graphic
		forms[baseForm + '__header'].elements.btn_sidebar_expand.visible = true
	//	forms[baseForm + '__header'].elements.lbl_drag.visible = false
		
		//in help, leave it
		if (solutionPrefs.config.helpMode) {
			//set flag that not in helpmode
			solutionPrefs.config.helpMode = false
		}
	}
}


}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2f83dc35-1e2c-4f72-a40c-bc8f6c92df3a"}
 */
function SPACE_change(event)
{
	
/*
 *	TITLE    :	SPACE_change
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	adjust spaces
 *			  	
 *	INPUT    :	(optional) the space to switch to
 *			  	(optional) skip the optional custom method
 *			  	(optional) if same space called, do not flip
 *			  	(optional) don't fire application update uis (used for exiting design mode prior to entering preferences
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	SPACE_change(newSpace, skipCustomMethod, noFlip)
 *			  	
 *	MODIFIED :	June 25, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {	

//MEMO: need to somehow put this section in a Function of it's own
//running in Tano...strip out jsevents for now
if (utils.stringToNumber(application.getVersion()) >= 5) {
	//cast Arguments to array
	var Arguments = new Array()
	for (var i = 0; i < arguments.length; i++) {
	//TODO WARNING: do rewrite your code to not depend on 'arguments', append them to the parameter list.
		Arguments.push(arguments[i])
	}
	
	//reassign arguments without jsevents
	arguments = Arguments.filter(globals.CODE_jsevent_remove)
}

	//timed out, throw up error
	if (solutionPrefs.config.prefs.thatsAllFolks) {
		forms.PREF_0F_solution__license.ACTION_status()
		
		plugins.dialogs.showErrorDialog(
							'Demo expired',
							'Demo time expired\n' +
							'Please restart.'
						)
	}
	
	var baseForm = solutionPrefs.config.formNameBase
	var buttonName = (arguments[0]) ? arguments[0] : application.getMethodTriggerElementName()
	var skipCustomMethod = arguments[1]
	var noFlip = arguments[2]
	var skipUI = arguments[3]
	
	var prefix = 'btn_space_'
	var suffix = utils.stringToNumber(buttonName.substr(prefix.length))
	var oldSpace = solutionPrefs.config.activeSpace
	
	var spaceRealNames = [	'standard','list','vertical','centered','classic','wide','workflow',
							'standard flip','list flip','vertical flip','centered flip','classic flip','wide flip','workflow flip']
	
	if (application.__parent__.navigationPrefs && solutionPrefs.config.currentFormID && navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID]) {
		var spacesOK = navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].spaceSetup
	}
	else {
		var spacesOK = [true,true,true,true,true,true,true,true,true,true,true,true,true,true]
	}
	
	//find out what last button 'pressed' was
	var found = false
	for (var i = 0; i < spaceRealNames.length && !found; i++) {
		if (spaceRealNames[i] == oldSpace) {
			found = true
		}
	}
	//if same button pressed twice, go to opposite if available
	if (prefix + i == buttonName && !noFlip) {
		//get other value
		if (suffix < 8) {
			var complement = suffix + 7
		}
		else {
			var complement = suffix - 7
		}
		
		//if complement is available, show it and continue method running as it; otherwise do nothing
		if (spacesOK[complement - 1]) {
			forms[baseForm + '__header'].elements['btn_space_'+complement].visible = true
			forms[baseForm + '__header'].elements['btn_space_'+suffix].visible = false
			
			buttonName = prefix + complement
		}
	}
	
	
	//activate correct button and set space to that value
	for (var i = 1 ; i <= 14; i++) {
	
		//name of space button
		var elem = prefix + i
		
		//get details about the space we're in
		switch (elem) {
			case 'btn_space_1':
				var spaceName = 'standard'
				
				var imageURL = 'media:///space_standard.png'
				var imageActiveURL = 'media:///space_standard_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.standard.currentHorizontal
				
				var listLevel_A = 'tab_content_A'
				var listLevel_B = 'tab_content_B'
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = solutionPrefs.screenAttrib.spaces.standard.currentVertical
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.standard.currentHorizontal
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.standard.currentVertical
				
				break
			
			case 'btn_space_2':
				var spaceName = 'list'
				
				var imageURL = 'media:///space_list.png'
				var imageActiveURL = 'media:///space_list_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.list.currentHorizontal
				
				var listLevel_A = 'tab_content_B'
				var listLevel_B = null
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = 0
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.list.currentHorizontal
				
				break
			
			case 'btn_space_3':
				var spaceName = 'vertical'
				
				var imageURL = 'media:///space_vertical.png'
				var imageActiveURL = 'media:///space_vertical_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne + solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo
				
				var listLevel_A = 'tab_content_A'
				var listLevel_B = 'tab_content_B'
				var listLevelOrient = 1	//left-right orientation
				var listLevelDivLocation = solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo
				
				break
			
			case 'btn_space_4':
				var spaceName = 'centered'
				
				var imageURL = 'media:///space_centered.png'
				var imageActiveURL = 'media:///space_centered_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne
				
				var listLevel_A = 'tab_content_A'
				var listLevel_B = null
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = 2000
				
				var workflowLevel_A = 'tab_content_C'
				var workflowLevel_B = 'tab_content_B'
				var workflowLevelOrient = 1	//left-right orientation
				var workflowLevelDivLocation = forms[baseForm].elements.bean_main.getWidth() - solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne - solutionPrefs.screenAttrib.spaces.centered.currentHorizontalTwo
				var workflowLevelResizeWeight = 1
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.centered.currentHorizontalTwo
				
				break
			
			case 'btn_space_5':
				var spaceName = 'classic'
				
				var imageURL = 'media:///space_classic.png'
				var imageActiveURL = 'media:///space_classic_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
				
				var listLevel_A = 'tab_content_A'
				var listLevel_B = null
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = 2000
				
				var workflowLevel_A = 'tab_content_B'
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient =  0	//top-bottom orientation
				var workflowLevelDivLocation = solutionPrefs.screenAttrib.spaces.classic.currentVertical
				var workflowLevelResizeWeight = 1 / 4
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.classic.currentVertical
				
				break
			
			case 'btn_space_6':
				var spaceName = 'wide'
				
				var imageURL = 'media:///space_wide.png'
				var imageActiveURL = 'media:///space_wide_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 0	//top-bottom orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.wide.currentVertical
				
				var listLevel_A = 'tab_content_A'
				var listLevel_B = 'tab_content_B'
				var listLevelOrient = 1	//left-right orientation
				var listLevelDivLocation = solutionPrefs.screenAttrib.spaces.wide.currentHorizontal
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.wide.currentHorizontal
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.wide.currentVertical
				
				break
			
			case 'btn_space_7':
				var spaceName = 'workflow'
				
				var imageURL = 'media:///space_workflow.png'
				var imageActiveURL = 'media:///space_workflow_active.png'
				
				var mainLevel_A = null
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = 0
				
				var listLevel_A = null
				var listLevel_B = null
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = 180
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = 0
				
				break
		
			case 'btn_space_8':
				var spaceName = 'standard flip'
				
				var imageURL = 'media:///space_standard_flip.png'
				var imageActiveURL = 'media:///space_standard_flip_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.standard.currentHorizontal
				
				var listLevel_A = 'tab_content_B'
				var listLevel_B = 'tab_content_A'
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = solutionPrefs.screenAttrib.spaces.standard.currentVertical
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.standard.currentHorizontal
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.standard.currentVertical
				
				break
			
			case 'btn_space_9':
				var spaceName = 'list flip'
				
				var imageURL = 'media:///space_list_flip.png'
				var imageActiveURL = 'media:///space_list_flip_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.list.currentHorizontal
				
				var listLevel_A = 'tab_content_A'
				var listLevel_B = null
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = 0
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.list.currentHorizontal
				
				break
			
			case 'btn_space_10':
				var spaceName = 'vertical flip'
				
				var imageURL = 'media:///space_vertical_flip.png'
				var imageActiveURL = 'media:///space_vertical_flip_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne + solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo
				
				var listLevel_A = 'tab_content_B'
				var listLevel_B = 'tab_content_A'
				var listLevelOrient = 1	//left-right orientation
				var listLevelDivLocation = solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo
				
				break
			
			case 'btn_space_11':
				var spaceName = 'centered flip'
				
				var imageURL = 'media:///space_centered_flip.png'
				var imageActiveURL = 'media:///space_centered_flip_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne
				
				var listLevel_A = 'tab_content_B'
				var listLevel_B = null
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = 2000
				
				var workflowLevel_A = 'tab_content_C'
				var workflowLevel_B = 'tab_content_A'
				var workflowLevelOrient = 1	//left-right orientation
				var workflowLevelDivLocation = forms[baseForm].elements.bean_main.getWidth() - solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne - solutionPrefs.screenAttrib.spaces.centered.currentHorizontalTwo
				var workflowLevelResizeWeight = 1
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.centered.currentHorizontalTwo
				
				break
			
			case 'btn_space_12':
				var spaceName = 'classic flip'
				
				var imageURL = 'media:///space_classic_flip.png'
				var imageActiveURL = 'media:///space_classic_flip_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
				
				var listLevel_A = 'tab_content_B'
				var listLevel_B = null
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = 2000
				
				var workflowLevel_A = 'tab_content_A'
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient =  0	//top-bottom orientation
				var workflowLevelDivLocation = solutionPrefs.screenAttrib.spaces.classic.currentVertical
				var workflowLevelResizeWeight = 1 / 4
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.classic.currentVertical
				
				break
			
			case 'btn_space_13':
				var spaceName = 'wide flip'
				
				var imageURL = 'media:///space_wide_flip.png'
				var imageActiveURL = 'media:///space_wide_flip_active.png'
				
				var mainLevel_A = 'bean_list'
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 0	//top-bottom orientation
				var mainLevelDivLocation = solutionPrefs.screenAttrib.spaces.wide.currentVertical
				
				var listLevel_A = 'tab_content_B'
				var listLevel_B = 'tab_content_A'
				var listLevelOrient = 1	//left-right orientation
				var listLevelDivLocation = solutionPrefs.screenAttrib.spaces.wide.currentHorizontal
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_C'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = solutionPrefs.screenAttrib.spaces.wide.currentHorizontal
				var dimensionTwo = solutionPrefs.screenAttrib.spaces.wide.currentVertical
				
				break
			
			case 'btn_space_14':
				var spaceName = 'workflow flip'
				
				var imageURL = 'media:///space_workflow_flip.png'
				var imageActiveURL = 'media:///space_workflow_flip_active.png'
				
				var mainLevel_A = null
				var mainLevel_B = 'bean_workflow'
				var mainLevelOrient = 1	//left-right orientation
				var mainLevelDivLocation = 0
				
				var listLevel_A = null
				var listLevel_B = null
				var listLevelOrient = 0	//top-bottom orientation
				var listLevelDivLocation = 180
				
				var workflowLevel_A = null
				var workflowLevel_B = 'tab_content_B'
				var workflowLevelOrient = 0	//top-bottom orientation
				var workflowLevelDivLocation = 0
				var workflowLevelResizeWeight = 0
				
				//needed for logging
				var dimensionOne = 0
				
				break
		}
			
		//activate this space; only if the space switching to is different (unless forced to fire)
		if (buttonName == elem && (oldSpace != spaceName || noFlip)) {
			plugins.sutra.busyCursor = true
			
			var bkgndLight = new Packages.java.awt.Color(13752290)
			var bkgndDark = new Packages.java.awt.Color(10596559)
			
			//set background color to be light so we don't notice the massive redraws as much
				forms[baseForm].elements.bean_wrapper_1.background = bkgndLight
				forms[baseForm].elements.bean_wrapper_2.background = bkgndLight
				forms[baseForm].elements.bean_main.background = bkgndLight
				forms[baseForm].elements.bean_list.background = bkgndLight
				forms[baseForm].elements.bean_workflow.background = bkgndLight
			
			//BEAN SETUP
				//null everything out so we don't get any lockouts
				forms[baseForm].elements.bean_main.leftComponent = null
				forms[baseForm].elements.bean_main.rightComponent = null
				forms[baseForm].elements.bean_list.topComponent = null
				forms[baseForm].elements.bean_list.bottomComponent = null
				forms[baseForm].elements.bean_workflow.topComponent = null
				forms[baseForm].elements.bean_workflow.bottomComponent = null
				
				//top-level bean
				forms[baseForm].elements.bean_main.leftComponent = forms[baseForm].elements[mainLevel_A]
				forms[baseForm].elements.bean_main.rightComponent = forms[baseForm].elements[mainLevel_B]
				forms[baseForm].elements.bean_main.orientation = mainLevelOrient
				forms[baseForm].elements.bean_main.dividerLocation = mainLevelDivLocation
				
				
				//left-side (list) bean
				forms[baseForm].elements.bean_list.topComponent = forms[baseForm].elements[listLevel_A]
				forms[baseForm].elements.bean_list.bottomComponent = forms[baseForm].elements[listLevel_B]
				forms[baseForm].elements.bean_list.orientation = listLevelOrient
				forms[baseForm].elements.bean_list.dividerLocation = listLevelDivLocation
				
				
				//right-side (workflow) bean
				forms[baseForm].elements.bean_workflow.topComponent = forms[baseForm].elements[workflowLevel_A]
				forms[baseForm].elements.bean_workflow.bottomComponent = forms[baseForm].elements[workflowLevel_B]
				forms[baseForm].elements.bean_workflow.resizeWeight = workflowLevelResizeWeight
				forms[baseForm].elements.bean_workflow.orientation = workflowLevelOrient
				forms[baseForm].elements.bean_workflow.dividerLocation = workflowLevelDivLocation
			
			//re-wiggle beans if needed for the wide space
			if (spaceName == 'wide' || oldSpace == 'wide' || spaceName == 'wide flip' || oldSpace == 'wide flip') {
				application.updateUI()
				
				//main bean setup
				forms[baseForm].elements.bean_main.orientation = mainLevelOrient
				forms[baseForm].elements.bean_main.dividerLocation = mainLevelDivLocation
				
				//list bean setup
				forms[baseForm].elements.bean_list.orientation = listLevelOrient
				forms[baseForm].elements.bean_list.dividerLocation = listLevelDivLocation
				
				//workflow bean setup
				forms[baseForm].elements.bean_workflow.orientation = workflowLevelOrient
				forms[baseForm].elements.bean_workflow.dividerLocation = workflowLevelDivLocation
			}
			
			//save down which space we are in
			solutionPrefs.config.activeSpace = spaceName
			
			//TODO: only do if changed spaces have different dimensions
			//running in 3.5?
			if (utils.stringToNumber(solutionPrefs.clientInfo.verServoy) < 4) {
				//re-fire UL if configured and changing spaces
				if (solutionPrefs.config.currentFormID && navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID]) {
					var currentNavItem = navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID]
					if (oldSpace != spaceName && currentNavItem.navigationItem.useFwList) {
						forms[currentNavItem.listData.tabFormInstance].UL_fill_data()
					}
				}
			}
			
			//LOG windowing
			globals.CALLBACK_log_create('Flexible windowing',
					oldSpace,
					spaceName,
					null,
					null,
					dimensionOne,
					dimensionTwo,
					application.getWindowWidth(),
					application.getWindowHeight()
					)
			
			//set graphic to be depressed
			forms[baseForm + '__header'].elements[elem].setImageURL(imageActiveURL)
			
			//SPACE_flexible method sets the correct border and turns off dividers if showing
			globals.SPACE_flexible(true,skipUI)
			
			//set background color to be dark again (so dividers show up)
				forms[baseForm].elements.bean_wrapper_1.background = bkgndDark
				forms[baseForm].elements.bean_wrapper_2.background = bkgndDark
				forms[baseForm].elements.bean_main.background = bkgndDark
				forms[baseForm].elements.bean_list.background = bkgndDark
				forms[baseForm].elements.bean_workflow.background = bkgndDark
				
			//run post-space change method
			if (!skipCustomMethod && navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID] && navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].navigationItem.spaceMethod) {
				var spaceManMethod = navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].navigationItem.spaceMethod.split('.')
				
				//check to see if it is a global method
				if (spaceManMethod[0] ==  'globals') {
					spaceManMethod.shift()
					var spaceManGlobal = true
				}
				
				//if global method and it exists
				if (spaceManMethod[0] && globals[spaceManMethod[0]]) {
					globals[navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].navigationItem.spaceMethod](oldSpace,spaceName,mainLevelDivLocation,listLevelDivLocation,workflowLevelDivLocation)
				}
				
				//if form (non-global) method and it exists
				if (spaceManMethod[0] && forms[currentNavItem.navigationItem.formToLoad][spaceManMethod[0]]) {
					forms[currentNavItem.navigationItem.formToLoad][spaceManMethod[0]](oldSpace,spaceName,mainLevelDivLocation,listLevelDivLocation,workflowLevelDivLocation)
				}
			}
			
			plugins.sutra.busyCursor = false
		}
		//leave graphic on depressed state if same button clicked
		else if (buttonName == elem && oldSpace == spaceName) {
			forms[baseForm + '__header'].elements[elem].setImageURL(imageActiveURL)
		}
		//set graphic to normal state (non-depressed)
		else {
			forms[baseForm + '__header'].elements[elem].setImageURL(imageURL)
		}		
	}
	
	//refresh screen if required
	if (solutionPrefs.config.activeSpace != oldSpace) {
		application.updateUI()
	}

}


}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"f3690976-7b6c-490a-ab24-c649ab97dc2c"}
 */
function SPACE_flexible(event)
{
	
/*
 *	TITLE    :	SPACE_flexible
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	toggle show/hide both horizontal and vertical dividers for resizing workflow/lists areas
 *			  	
 *	INPUT    :	1- true/false to force expanders
 *			  	2- don't do the application.updateUIs
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	solutionPrefs
 *			  	
 *	MODIFIED :	February 22, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {

//MEMO: need to somehow put this section in a Function of it's own
//running in Tano...strip out jsevents for now
if (utils.stringToNumber(application.getVersion()) >= 5) {
	//cast Arguments to array
	var Arguments = new Array()
	for (var i = 0; i < arguments.length; i++) {
	//TODO WARNING: do rewrite your code to not depend on 'arguments', append them to the parameter list.
		Arguments.push(arguments[i])
	}
	
	//reassign arguments without jsevents
	arguments = Arguments.filter(globals.CODE_jsevent_remove)
}

	var baseForm = solutionPrefs.config.formNameBase
	var forceHide = arguments[0]
	var skipUI = arguments[1]
	var sidebarStatus = solutionPrefs.screenAttrib.sidebar.status
	
	var borderTop = 'MatteBorder,1,0,0,0,#333333'
	var borderEmpty = 'EmptyBorder,0,0,0,0'
	
	//determine which ones to show and which to hide
	switch (solutionPrefs.config.activeSpace) {
			case 'standard':
				var mainLevel = true
				var listLevel = true
				var workflowLevel = false
				
				var contentArea_A_Show = 'MatteBorder,0,1,1,0,#333333'
				var contentArea_B_Show = 'MatteBorder,1,1,0,0,#333333'
				var contentArea_C_Show = 'MatteBorder,0,0,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_C_Show = 'MatteBorder,0,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = 'MatteBorder,1,0,0,0,#333333'
				var contentArea_C_Hide = 'MatteBorder,0,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.standard.currentHorizontal : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.standard.currentVertical : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_list.dividerLocation
				
				break
				
			case 'list':
				var mainLevel = true
				var listLevel = false
				var workflowLevel = false
				
				var contentArea_A_Show = borderEmpty
				var contentArea_B_Show = 'MatteBorder,0,1,0,0,#333333'
				var contentArea_C_Show = 'MatteBorder,0,0,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_C_Show = 'MatteBorder,0,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = 'MatteBorder,0,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.list.currentHorizontal : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				
				break
				
			case 'vertical':
				var mainLevel = true
				var listLevel = true
				var workflowLevel = false
				
				var contentArea_A_Show = 'MatteBorder,0,1,0,0,#333333'
				var contentArea_B_Show = 'MatteBorder,0,1,0,1,#333333'
				var contentArea_C_Show = 'MatteBorder,0,0,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_C_Show = 'MatteBorder,0,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_C_Hide = 'MatteBorder,0,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_list.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_main.dividerLocation - forms[baseForm].elements.bean_list.dividerLocation
				
				break
				
			case 'centered':
				var mainLevel = true
				var listLevel = false
				var workflowLevel = true
				
				var contentArea_A_Show = 'MatteBorder,0,1,0,0,#333333'
				var contentArea_B_Show = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_C_Show = 'MatteBorder,0,1,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_B_Show = 'MatteBorder,0,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_C_Hide = 'MatteBorder,0,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_main.getWidth() - forms[baseForm].elements.bean_main.dividerLocation - forms[baseForm].elements.bean_workflow.dividerLocation
				
				break
				
			case 'classic':
				var mainLevel = true
				var listLevel = false
				var workflowLevel = true
				
				var contentArea_A_Show = 'MatteBorder,0,1,0,0,#333333'
				var contentArea_B_Show = 'MatteBorder,0,0,1,1,#333333'
				var contentArea_C_Show = 'MatteBorder,1,0,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_B_Show = 'MatteBorder,0,1,1,1,#333333'
					contentArea_C_Show = 'MatteBorder,1,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_C_Hide = 'MatteBorder,1,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.classic.currentHorizontal : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.classic.currentVertical : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_workflow.dividerLocation
				
				break
				
			case 'wide':
				var mainLevel = true
				var listLevel = true
				var workflowLevel = false
				
				var contentArea_A_Show = 'MatteBorder,0,1,1,0,#333333'
				var contentArea_B_Show = 'MatteBorder,0,0,1,1,#333333'
				var contentArea_C_Show = 'MatteBorder,1,0,0,0,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_B_Show = 'MatteBorder,0,1,1,1,#333333'
					contentArea_C_Show = 'MatteBorder,1,1,0,0,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_C_Hide = 'MatteBorder,1,0,0,0,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.wide.currentVertical : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.wide.currentHorizontal : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_list.dividerLocation
				
				break
				
			case 'workflow':
				var mainLevel = false
				var listLevel = false
				var workflowLevel = false
				
				var contentArea_A_Show = borderEmpty
				var contentArea_B_Show = borderEmpty
				var contentArea_C_Show = borderEmpty
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_C_Show = 'MatteBorder,0,1,0,0,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = borderEmpty
				
				break
			
			case 'standard flip':
				var mainLevel = true
				var listLevel = true
				var workflowLevel = false
				
				var contentArea_A_Show = 'MatteBorder,1,1,0,0,#333333'
				var contentArea_B_Show = 'MatteBorder,0,1,1,0,#333333'
				var contentArea_C_Show = 'MatteBorder,0,0,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_C_Show = 'MatteBorder,0,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = 'MatteBorder,1,0,0,0,#333333'
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = 'MatteBorder,0,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.standard.currentHorizontal : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.standard.currentVertical : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_list.dividerLocation
				
				break
				
			case 'list flip':
				var mainLevel = true
				var listLevel = false
				var workflowLevel = false
				
				var contentArea_A_Show = 'MatteBorder,0,1,0,0,#333333'
				var contentArea_B_Show = borderEmpty
				var contentArea_C_Show = 'MatteBorder,0,0,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_C_Show = 'MatteBorder,0,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = 'MatteBorder,0,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.list.currentHorizontal : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				
				break
				
			case 'vertical flip':
				var mainLevel = true
				var listLevel = true
				var workflowLevel = false
				
				var contentArea_A_Show = 'MatteBorder,0,1,0,1,#333333'
				var contentArea_B_Show = 'MatteBorder,0,1,0,0,#333333'
				var contentArea_C_Show = 'MatteBorder,0,0,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_C_Show = 'MatteBorder,0,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = 'MatteBorder,0,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_list.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_main.dividerLocation - forms[baseForm].elements.bean_list.dividerLocation
				
				break
				
			case 'centered flip':
				var mainLevel = true
				var listLevel = false
				var workflowLevel = true
				
				var contentArea_A_Show = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_B_Show = 'MatteBorder,0,1,0,0,#333333'
				var contentArea_C_Show = 'MatteBorder,0,1,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_A_Show = 'MatteBorder,0,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = 'MatteBorder,0,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_main.getWidth() - forms[baseForm].elements.bean_main.dividerLocation - forms[baseForm].elements.bean_workflow.dividerLocation
				
				break
				
			case 'classic flip':
				var mainLevel = true
				var listLevel = false
				var workflowLevel = true
				
				var contentArea_A_Show = 'MatteBorder,0,0,1,1,#333333'
				var contentArea_B_Show = 'MatteBorder,0,1,0,0,#333333'
				var contentArea_C_Show = 'MatteBorder,1,0,0,1,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_A_Show = 'MatteBorder,0,1,1,1,#333333'
					contentArea_C_Show = 'MatteBorder,1,1,0,1,#333333'
				}
				
				var contentArea_A_Hide = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = 'MatteBorder,1,0,0,1,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.classic.currentHorizontal : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.classic.currentVertical : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_workflow.dividerLocation
				
				break
				
			case 'wide flip':
				var mainLevel = true
				var listLevel = true
				var workflowLevel = false
				
				var contentArea_A_Show = 'MatteBorder,0,0,1,1,#333333'
				var contentArea_B_Show = 'MatteBorder,0,1,1,0,#333333'
				var contentArea_C_Show = 'MatteBorder,1,0,0,0,#333333'
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_A_Show = 'MatteBorder,0,1,1,1,#333333'
					contentArea_C_Show = 'MatteBorder,1,1,0,0,#333333'
				}
				
				var contentArea_A_Hide = 'MatteBorder,0,0,0,1,#333333'
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = 'MatteBorder,1,0,0,0,#333333'
				
				var dimensionOneStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.wide.currentVertical : 0
				var dimensionTwoStart = (solutionPrefs.screenAttrib) ? solutionPrefs.screenAttrib.spaces.wide.currentHorizontal : 0
				var dimensionOneEnd = forms[baseForm].elements.bean_main.dividerLocation
				var dimensionTwoEnd = forms[baseForm].elements.bean_list.dividerLocation
				
				break
				
			case 'workflow flip':
				var mainLevel = false
				var listLevel = false
				var workflowLevel = false
				
				var contentArea_A_Show = borderEmpty
				var contentArea_B_Show = borderEmpty
				var contentArea_C_Show = borderEmpty
				
				//override defaults when sidebar visible
				if (sidebarStatus) {
					contentArea_B_Show = 'MatteBorder,0,1,0,0,#333333'
				}
				
				var contentArea_A_Hide = borderEmpty
				var contentArea_B_Hide = borderEmpty
				var contentArea_C_Hide = borderEmpty
				
				break
		}
	
	
	//dividers showing, hide
	if (forceHide || solutionPrefs.config.flexibleSpace) {
		//Navigation item area
		forms[baseForm].elements.tab_content_A.setBorder(contentArea_A_Hide)
		
		//UL record area
		forms[baseForm].elements.tab_content_B.setBorder(contentArea_B_Hide)
		
		//bottom part of right-side tab panel
		forms[baseForm].elements.tab_content_C.setBorder(contentArea_C_Hide)
		
		//pseudo-border in header
		forms[baseForm].elements.tab_header.setBorder(borderEmpty)
		forms.SIDE_sidebar__header.elements.gfx_flexible.visible = false
		forms[baseForm].elements.gfx_flexible.visible = false
		
		//status of flexible spaces
		solutionPrefs.config.flexibleSpace = false
		
		//save status, log current view, and refresh UL if not forceHidden
		if (!forceHide) {
			switch (solutionPrefs.config.activeSpace) {
				case 'standard' : 
				case 'standard flip' : 
						solutionPrefs.screenAttrib.spaces.standard.currentHorizontal = forms[baseForm].elements.bean_main.dividerLocation
						solutionPrefs.screenAttrib.spaces.standard.currentVertical = forms[baseForm].elements.bean_list.dividerLocation
						break
							
				case 'list' : 
				case 'list flip' : 
						solutionPrefs.screenAttrib.spaces.list.currentHorizontal = forms[baseForm].elements.bean_main.dividerLocation
						break
							
				case 'vertical' : 
				case 'vertical flip' : 
						solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne = forms[baseForm].elements.bean_list.dividerLocation
						solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo = forms[baseForm].elements.bean_main.dividerLocation - forms[baseForm].elements.bean_list.dividerLocation
						break
							
				case 'centered' :
				case 'centered flip' : 
						solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne = forms[baseForm].elements.bean_main.dividerLocation
						solutionPrefs.screenAttrib.spaces.centered.currentHorizontalTwo = forms[baseForm].elements.bean_main.getWidth() - forms[baseForm].elements.bean_main.dividerLocation - forms[baseForm].elements.bean_workflow.dividerLocation
						break
							
				case 'classic' : 
				case 'classic flip' : 
						solutionPrefs.screenAttrib.spaces.classic.currentHorizontal = forms[baseForm].elements.bean_main.dividerLocation
						solutionPrefs.screenAttrib.spaces.classic.currentVertical = forms[baseForm].elements.bean_workflow.dividerLocation
						break
							
				case 'wide' : 
				case 'wide flip' : 
						solutionPrefs.screenAttrib.spaces.wide.currentVertical = forms[baseForm].elements.bean_main.dividerLocation
						solutionPrefs.screenAttrib.spaces.wide.currentHorizontal = forms[baseForm].elements.bean_list.dividerLocation
						break
			}
			
			if (sidebarStatus) {
				solutionPrefs.screenAttrib.sidebar.currentSize = application.getWindowWidth(null) - forms[baseForm].elements.bean_wrapper_1.dividerLocation
			}
			
			//LOG windowing
			globals.CALLBACK_log_create('Flexible windowing',
					solutionPrefs.config.activeSpace,
					solutionPrefs.config.activeSpace,
					dimensionOneStart,
					dimensionTwoStart,
					dimensionOneEnd,
					dimensionTwoEnd,
					application.getWindowWidth(),
					application.getWindowHeight()
					)
			
			//TODO: only do if changed spaces have different dimensions
			//running in 3.5?
			if (utils.stringToNumber(solutionPrefs.clientInfo.verServoy) < 4) {
				//re-fire UL if configured and changing spaces
				if (solutionPrefs.config.currentFormID && navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID]) {
					var currentNavItem = navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID]
					if (currentNavItem.navigationItem.useFwList) {
						forms[currentNavItem.listData.tabFormInstance].UL_fill_data()
					}
				}
			}
		}
		
		//top-level bean
		forms[baseForm].elements.bean_main.dividerSize = 0
		
		//left-side (list) bean
		forms[baseForm].elements.bean_list.dividerSize = 0
		
		//right-side (workflow) bean
		forms[baseForm].elements.bean_workflow.dividerSize = 0
		
		//sidebar bean
		forms[baseForm].elements.bean_wrapper_1.dividerSize = 0
		
		//header tool/find bean
		forms[baseForm + '__header'].elements.split_tool_find.dividerSize = 0
	}
	//show dividers
	else {
		//Navigation item area
		forms[baseForm].elements.tab_content_A.setBorder(contentArea_A_Show)
		
		//UL record area
		forms[baseForm].elements.tab_content_B.setBorder(contentArea_B_Show)
		
		//bottom part of right-side tab panel
		forms[baseForm].elements.tab_content_C.setBorder(contentArea_C_Show)
		
		//pseudo-border in header
		if (sidebarStatus) {
			forms[baseForm].elements.tab_header.setBorder('MatteBorder,0,1,0,0,#757575')
			forms.SIDE_sidebar__header.elements.gfx_flexible.visible = true
		//	forms[baseForm].elements.gfx_flexible.visible = true
		}
		
		//status of flexible spaces
		solutionPrefs.config.flexibleSpace = true
		
		//top-level bean
		forms[baseForm].elements.bean_main.dividerSize = (mainLevel) ? 8 : 0
		
		//left-side (list) bean
		forms[baseForm].elements.bean_list.dividerSize = (listLevel) ? 8 : 0
		
		//right-side (workflow) bean
		forms[baseForm].elements.bean_workflow.dividerSize = (workflowLevel) ? 8 : 0
		
		//sidebar bean
		forms[baseForm].elements.bean_wrapper_1.dividerSize = (sidebarStatus) ? 8 : 0
		
		//header tool/find bean
		forms[baseForm + '__header'].elements.split_tool_find.dividerSize = 8
	}
	
	//don't fire when exiting design mode and going into preference
	if (!skipUI) {
		application.updateUI()
	}
	
	//in design mode and locked, update lock
	if (solutionPrefs.design.statusDesign && solutionPrefs.design.statusLockWorkflow) {
		globals.DEV_lock_workflow(true,solutionPrefs.design.statusLockList)
	}
}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0aa82afc-9ecd-4b63-b3af-87d9170abb24"}
 */
function TOOLBAR_cycle(event)
{
	
/*
 *	TITLE    :	TOOLBAR_cycle
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	toggle through toolbars
 *			  	
 *	INPUT    :	1- name or number of tab to show (optional)
 *			  	2- form with toolbar (optional)
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	elements listed below
 *			  	
 *	USAGE    :	TOOLBAR_cycle(toolbarName) The name of the toolbar to select
 *			  	
 *	MODIFIED :	August 20, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {

//MEMO: need to somehow put this section in a Function of it's own
//running in Tano...strip out jsevents for now
if (utils.stringToNumber(application.getVersion()) >= 5) {
	//cast Arguments to array
	var Arguments = new Array()
	for (var i = 0; i < arguments.length; i++) {
		Arguments.push(arguments[i])
	}
	
	//reassign arguments without jsevents
	arguments = Arguments.filter(globals.CODE_jsevent_remove)
}

	//timed out, throw up error
	if (solutionPrefs.config.prefs.thatsAllFolks) {
		forms.PREF_0F_solution__license.ACTION_status()
		
		plugins.dialogs.showErrorDialog(
							'Demo expired',
							'Demo time expired\n' +
							'Please restart.'
						)
	}
	
	var tabShow = arguments[0]
	var baseForm = (arguments[1]) ? arguments[1] : solutionPrefs.config.formNameBase
	var popForm = 'TOOL__popdown'
	
	var currentTab = forms[baseForm + '__header__toolbar'].elements.tab_toolbar.tabIndex
	var statusTabs = solutionPrefs.panel.toolbar
	
	var shiftKey = globals.CODE_key_pressed('shift')
	
	//hide popDown sheet when moving to a new item, but not when showing options to choose from
	if (tabShow || !shiftKey) {
		forms[baseForm].elements.sheetz.visible = false
	}
	
	//if passed tab name equal to current tab, set tabShow to be index of it
	for (var i = 0; i < statusTabs.length ; i++) {
		if (tabShow == statusTabs[i].tabName) {
			tabShow = i + 1
		}
	}
	
	//if requested index, go to it
	if (tabShow > 0) {
		forms[baseForm + '__header__toolbar'].elements.tab_toolbar.tabIndex = tabShow
	}
	//change visible view
	else {
		//show popup of views to be chosen if shift key held
		if (shiftKey) {
			//get menu list and build menu
			var menu = new Array()
			for ( var i = 0 ; i < statusTabs.length ; i++ ) {
				menu[i] = plugins.popupmenu.createCheckboxMenuItem(statusTabs[i].tabName, globals.TOOLBAR_cycle)
				
				//set menu method arguments
				menu[i].setMethodArguments(statusTabs[i].tabName)
				
				//set check mark
				if (i + 1 == forms[baseForm + '__header__toolbar'].elements.tab_toolbar.tabIndex) {
					menu[i].setSelected(true)
				}
				else {
					menu[i].setSelected(false)
				}	
			}
			
			//pop up the popup menu
			var elem = forms[baseForm + '__header__toolbar'].elements[application.getMethodTriggerElementName()]
			if (elem != null) {
				plugins.popupmenu.showPopupMenu(elem, menu)
			}
			
			return
		}
		//cycle through views
		else {
			//if not the last tab
			if (currentTab < statusTabs.length) {
				forms[baseForm + '__header__toolbar'].elements.tab_toolbar.tabIndex = currentTab + 1
			}
			//last tab, loop
			else {
				forms[baseForm + '__header__toolbar'].elements.tab_toolbar.tabIndex = 1
			}
		}
	}
	
	//save which tab is currently selected
	solutionPrefs.panel.toolbar.selectedTab = forms[baseForm + '__header__toolbar'].elements.tab_toolbar.tabIndex
	
	var statusTab = statusTabs[solutionPrefs.panel.toolbar.selectedTab - 1]
	var popDown = statusTab.popDown
	var tabParent = statusTab.formName
	//set up popDown, if activated
	if (popDown) {
		//popdown showing
		if (forms[tabParent].popDown == 'show') {
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.setImageURL('media:///toolbar_popdown_up.png')
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.toolTipText = 'Hide additional ' + statusTab.tabName + ' info'
		}
		//popdown not showing
		else {
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.setImageURL('media:///toolbar_popdown_down.png')
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.toolTipText = 'Show more info for ' + statusTab.tabName
		}
		forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.visible = true
		
		forms[popForm].elements.tab_toolbar_popdown.tabIndex = popDown.tabIndex
		
		if (forms[statusTab.formName].popDown == 'show') {
			globals.TOOL_popdown(true)
		}
	}
	else {
		forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.visible = false
		forms[baseForm].elements.tab_toolbar_popdown.visible = false
	}
}
}

/**
 *
 * @properties={typeid:24,uuid:"038f39ac-ede5-4439-b594-217f5ba1d3c5"}
 */
function TOOLBAR_load()
{

/*
 *	TITLE    :	TOOLBAR_load
 *			  	
 *	MODULE   :	_DATASUTRA_
 *			  	
 *	ABOUT    :	loads enabled toolbars into toolbar area
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TOOLBAR_load()
 *			  	
 *	MODIFIED :	August 20, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {
	var baseForm = solutionPrefs.config.formNameBase
	var popForm = 'TOOL__popdown'
	var toolbars = solutionPrefs.panel.toolbar
	
	forms[baseForm + '__header__toolbar'].elements.tab_toolbar.visible = false
	
	//remove all tabs from toolbar and popdown
	forms[baseForm + '__header__toolbar'].elements.tab_toolbar.removeAllTabs()
	forms[popForm].elements.tab_toolbar_popdown.removeAllTabs()
	
	//add in tabs to viewer and popdown
	if (toolbars.length) {
		//loop through array and add tabs
		for (var i = 0 ; i < toolbars.length ; i++) {
			var toolTab = toolbars[i]
			
			//selected form exists in solution
			if (forms[toolTab.formName]) {
				forms[baseForm + '__header__toolbar'].elements.tab_toolbar.addTab(forms[toolTab.formName],null,toolTab.tabName,null,null,null,null,null,i + 1)
				//popDown activated
				if (toolTab.popDown) {
					//selected form exists in solution
					if (forms[toolTab.popDown.formName]) {
						forms[popForm].elements.tab_toolbar_popdown.addTab(forms[toolTab.popDown.formName],null,toolTab.tabName,null,null,null,null,null,toolTab.popDown.tabIndex)
					}
				}
			}
			//remove from toolbars
			else {
				toolbars.splice(i,1)
			}
		}
		
		//select first tab
		globals.TOOLBAR_cycle(1)
	}
	
	//turn tab panel back on
	forms[baseForm + '__header__toolbar'].elements.tab_toolbar.visible = true
	
	//if only one tab, remove tab changer button
	if (toolbars.length > 1) {
		forms[baseForm + '__header__toolbar'].elements.btn_toolbar_toggle.visible = true
	}
	else {
		forms[baseForm + '__header__toolbar'].elements.btn_toolbar_toggle.visible = false
	}
}


}

/**
 *
 * @properties={typeid:24,uuid:"2f146964-fe02-4774-9868-01a0139722a7"}
 */
function TOOL_load_panels()
{

/*
 *	TITLE    :	TOOL_load_panels
 *			  	
 *	MODULE   :	rsrc_TOOL_toolbar
 *			  	
 *	ABOUT    :	
 *			  	
 *	INPUT    :	1- group id to get toolbars for
 *			  	2- only use the title toolbar
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TOOL_load_panels(groupID, onlyTitle) Create panel object with all allowed toolbars & sidebars
 *			  	
 *	MODIFIED :	July 24, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var groupID = arguments[0]
var onlyTitle = arguments[1]

//load title toolbar
if (onlyTitle) {
	var theToolbars = [{
		tabName : 'Solution title',
		formName : 'TOOL_title',
		display : 1,
		popDown : 0
	}]
	
	//punch back out all our toolbar and sidebar panels
	return {
				toolbar	: theToolbars
			}
}
//load everything
else {
	var theToolbars = globals.TOOL_load_panels_fx(1,groupID)
	
	var theSidebars = globals.TOOL_load_panels_fx(2,groupID)	
	
	//punch back out all our toolbar and sidebar panels
	return {
				toolbar	: theToolbars,
				sidebar	: theSidebars
			}
}








}

/**
 *
 * @properties={typeid:24,uuid:"85957dcb-ced3-4b4a-aa4b-fda4f36e9429"}
 */
function TOOL_load_panels_fx()
{

/*
 *	TITLE    :	TOOL_load_panels
 *			  	
 *	MODULE   :	rsrc_TOOL_toolbar
 *			  	
 *	ABOUT    :	
 *			  	
 *	INPUT    :	1- group id to get toolbars for
 *			  	2- only use the title toolbar
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TOOL_load_panels(groupID, onlyTitle) Create toolbar object with all allowed toolbars
 *			  	
 *	MODIFIED :	July 24, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var panelType = arguments[0]
var groupID = arguments[1]

var panel = new Array()
var panelPop = 1

var toolFormName = 'MGR_0F_toolbar'
var serverName = forms[toolFormName].controller.getServerName()
var fsToolbar = databaseManager.getFoundSet(serverName, 'sutra_toolbar')

//get toolbars for an access/control group
if (typeof groupID == 'number') {
	//get toolbars allowed for selected group
	var query = 'SELECT id_toolbar FROM sutra_access_group_toolbar WHERE toolbar_type = ? AND id_group = ? AND flag_chosen = ? ORDER BY order_by ASC'
	var args = [panelType,groupID,1]
	var dataset = databaseManager.getDataSetByQuery(serverName, query, args, 100)
	
	//get foundset with allowed toolbars
	fsToolbar.clear()
	fsToolbar.loadRecords(dataset)
}
//get all enabled toolbars
else {
	fsToolbar.find()
	fsToolbar.toolbar_type = panelType
	fsToolbar.row_status_show = 1
	fsToolbar.search()
}

//there are some toolbars
if (utils.hasRecords(fsToolbar)) {
	//order by for a/c toolbars
	if (utils.hasRecords(fsToolbar.ac_toolbar_to_access_group_toolbar)) {
		fsToolbar.sort('ac_toolbar_to_access_group_toolbar.order_by asc')
	}
	//order by for default toolbars
	else {
		fsToolbar.sort('row_order asc')
	}
	
	//get from the workspace
	if (solutionPrefs.repository.workspace) {
		var repoType = 'workspace'
	}
	//get from repository via queries way
	else if (!solutionPrefs.repository.api) {
		var repoType = 'allForms'
	}
	
	for (var i = 1; i <= fsToolbar.getSize() ; i++) {
		var record = fsToolbar.getRecord(i)
		
		var moduleFilter = (record.module_filter_2) ? record.module_filter_2 : record.module_filter
		//get size of pop-down form
		if (record.pop_down_autosize && 
			solutionPrefs.repository[repoType][moduleFilter] && 
			solutionPrefs.repository[repoType][moduleFilter][record.pop_down_form] &&
			solutionPrefs.repository[repoType][moduleFilter][record.pop_down_form].formSize) {
			
			var sizeSplit = solutionPrefs.repository[repoType][moduleFilter][record.pop_down_form].formSize.split(',')
			var sizeWidth = utils.stringToNumber(sizeSplit[0])
			var sizeHeight = utils.stringToNumber(sizeSplit[1])
		}
		
		//only add tabs that have a form assigned
		if (record.form_name) {
			panel.push({
					tabName : record.tab_name,
					formName : record.form_name,
					display : record.row_status_show,
					description : record.description,
					popDown : (record.pop_down_show) ?
										{
									autoSize : record.pop_down_autosize,
									formName : record.pop_down_form,
									hook : record.pop_down_hook,
									height : (record.pop_down_autosize && sizeHeight) ? sizeHeight : record.pop_down_height,
									width : (record.pop_down_autosize && sizeWidth) ? sizeWidth : record.pop_down_width,
									tabIndex : panelPop++
								} :
								record.pop_down_show
				})
			
			//sidebars can have background color and gradient
			if (panelType == 2) {
				panel[panel.length - 1].gradient = (record.gradient) ? true : false
				if (record.background_color) {
					panel[panel.length - 1].gradientColor = record.background_color
				}
			}
		}
	}
}

return panel



}

/**
 *
 * @properties={typeid:24,uuid:"4a6fa8c4-215e-4493-bc6a-b5c74e42161f"}
 */
function TOOL_popdown()
{
	
/*
 *	TITLE    :	TOOL_popdown
 *			  	
 *	MODULE   :	rsrc_TOOL_toolbar
 *			  	
 *	ABOUT    :	
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TOOL_popdown(expandStatus)
 *			  	
 *	MODIFIED :	March 8, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {

//MEMO: need to somehow put this section in a Function of it's own
//running in Tano...strip out jsevents for now
if (utils.stringToNumber(application.getVersion()) >= 5) {
	//cast Arguments to array
	var Arguments = new Array()
	for (var i = 0; i < arguments.length; i++) {
		Arguments.push(arguments[i])
	}
	
	//reassign arguments without jsevents
	arguments = Arguments.filter(globals.CODE_jsevent_remove)
}

	var expanded = arguments[0]
	
	var baseForm = solutionPrefs.config.formNameBase
	var statusStartX = forms[baseForm + '__header'].elements.split_tool_find.getX()
	var statusWidth = forms[baseForm + '__header__toolbar'].elements.tab_toolbar.getWidth()
	var rollSize = 30
	var indent = 40
	var numRolls = 13
	var tabWidth = statusWidth-(indent*2)
	var tabHeight = 390
	
	var currentTab = solutionPrefs.panel.toolbar.selectedTab
	var statusTabs = solutionPrefs.panel.toolbar
	
	//using a pop down
	if (statusTabs[currentTab - 1].popDown) {
		var downPop = statusTabs[currentTab - 1].popDown
		var tabName = downPop.formName
		var tabParent = statusTabs[currentTab - 1].formName
		
		//location offset for design mode
		if (solutionPrefs.design.statusDesign) {
			var y = 42 + 44
		}
		else {
			var y = 0 + 44
		}
		
		tabWidth = (downPop.width) ? downPop.width : tabWidth
		tabHeight = (downPop.height) ? downPop.height + 40 : tabHeight
		
		//check if larger than current window
		if (tabHeight >= (application.getWindowHeight() - (50 + y))) {
			tabHeight = application.getWindowHeight() - 130
		}	
		indent = (statusWidth-tabWidth)/2
		numRolls = Math.ceil(tabHeight/rollSize)
		
		//first time popDown called
		if (! forms[tabParent].popDown) {
			forms[tabParent].popDown = 'hide'
		}
		
		//expand if called from toolbar_cycle method
		if (expanded) {
			//resize and show tabpanel
			forms[baseForm].elements.tab_toolbar_popdown.setLocation(statusStartX+indent,y)
			forms[baseForm].elements.tab_toolbar_popdown.setSize(tabWidth,tabHeight)
			forms[baseForm].elements.tab_toolbar_popdown.visible = true
			
//			forms[baseForm].elements.sheetz.reshape(statusStartX+indent,y+11,tabWidth,tabHeight)
//			forms[baseForm].elements.sheetz.visible = true
//			application.updateUI()
		}
		//roll down
		else if (forms[tabParent].popDown == 'hide') {
			//set to up/down status to current status
			forms[tabParent].popDown = 'show'
			
			//resize and show tabpanel
			forms[baseForm].elements.tab_toolbar_popdown.setLocation(statusStartX+indent,y)
			forms[baseForm].elements.tab_toolbar_popdown.setSize(tabWidth,tabHeight)
			forms[baseForm].elements.tab_toolbar_popdown.visible = true
			
			//activate correct tab and make viewable
//			forms[baseForm].elements.sheetz.layeredPane
//			forms[baseForm].elements.sheetz.visible = true
			
//			forms[baseForm].elements.sheetz.reshape(statusStartX+indent,y+11,tabWidth,tabHeight)
			
			/*
			//roll down (bottom fixed)
			for (var i = 1; i <= numRolls; i++) {
				forms[baseForm].elements.sheetz.reshape(statusStartX+indent,-(rollSize*(numRolls-i))+11,tabWidth,tabHeight)
				application.updateUI()
			}
			*/
			
		}
		//roll up
		else {
			//set to up/down status to current status
			forms[tabParent].popDown = 'hide'
			forms[baseForm].elements.tab_toolbar_popdown.visible = false
			
			/*
			//roll up (top fixed)
			for (var i = 1; i <= numRolls; i++) {
				forms[baseForm].elements.sheetz.reshape(statusStartX+indent,y+11,tabWidth,tabHeight-(rollSize*i))
				application.updateUI()
			}
			*/
			
//			forms[baseForm].elements.sheetz.visible = false
		}
		
		var statusTab = statusTabs[currentTab - 1]
		//popdown showing
		if (forms[tabParent].popDown == 'show') {
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.setImageURL('media:///toolbar_popdown_up.png')
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.toolTipText = 'Hide additional ' + statusTab.tabName + ' info'
			
			//fire hook
			if (downPop.hook) {
				//global method
				if (downPop.hook.substr(0,7) == 'globals') {
					eval(downPop.hook)
				}
				//form method
				else if (forms[tabName] && forms[tabName][downPop.hook.slice(0,downPop.hook.length-2)]) {
					eval('forms.' + tabName + '.' + downPop.hook)
				}
			}
		}
		//popdown not showing
		else {
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.setImageURL('media:///toolbar_popdown_down.png')
			forms[baseForm + '__header__toolbar'].elements.btn_toolbar_popdown.toolTipText = 'Show more info for ' + statusTab.tabName
			
			forms[baseForm].elements.tab_toolbar_popdown.visible = false
		}
	}
}

}

/**
 *
 * @properties={typeid:24,uuid:"f87b9e88-2116-4e43-ba20-d27a8b6bbc92"}
 */
function TOOL_popout()
{
	
/*
 *	TITLE    :	TOOLBAR_popout
 *			  	
 *	MODULE   :	rsrc_TOOL_toolbar
 *			  	
 *	ABOUT    :	open a non-modal dialog from sidebar
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TOOLBAR_popout(expandStatus)
 *			  	
 *	MODIFIED :	September 10, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {

//MEMO: need to somehow put this section in a Function of it's own
//running in Tano...strip out jsevents for now
if (utils.stringToNumber(application.getVersion()) >= 5) {
	//cast Arguments to array
	var Arguments = new Array()
	for (var i = 0; i < arguments.length; i++) {
		Arguments.push(arguments[i])
	}
	
	//reassign arguments without jsevents
	arguments = Arguments.filter(globals.CODE_jsevent_remove)
}

	var expanded = (typeof arguments[0] == 'boolean') ? arguments[0] : null
	
	var sideForm = 'SIDE_sidebar'
	
	var currentTab = solutionPrefs.panel.sidebar.selectedTab
	var sidebarTabs = solutionPrefs.panel.sidebar
	var thisTab = (currentTab - 2 >= 0) ? sidebarTabs[currentTab - 2] : new Object()
	
	//help, close sidebar and pop the help screen out into non-modal dialog
	if (solutionPrefs.config.helpMode) {
		globals.SIDEBAR_toggle(false)
		
		application.showFormInDialog(
				forms.HELP_P_documentation,
				-1,-1,-1,-1,
				'Help',
				true,
				false,
				'popoutHelp',
				false
			)
	}
	//using a pop down
	else if (thisTab.popDown) {
		var downPop = thisTab.popDown
		var tabName = downPop.formName
		var tabParent = thisTab.formName
		
		var tabWidth = (downPop.width) ? downPop.width : -1
		var tabHeight = (downPop.height) ? downPop.height : -1
		
		//show form in dialog
		if (expanded) {
			application.showFormInDialog(
					forms[tabName],
					-1,-1,tabWidth,tabHeight,
					thisTab.tabName,
					true,
					false,
					'SIDE_' + currentTab + '_' + tabParent,
					false
				)
		
			//fire hook
			if (downPop.hook) {
				//global method
				if (downPop.hook.substr(0,7) == 'globals') {
					eval(downPop.hook)
				}
				//form method
				else if (forms[tabName] && forms[tabName][downPop.hook.slice(0,downPop.hook.length-2)]) {
					eval('forms.' + tabName + '.' + downPop.hook)
				}
			}

		}
		//close form in dialog
		else {
			application.closeFormDialog('SIDE_' + currentTab + '_' + tabParent)
		}
		
		forms[sideForm + '__header'].elements.btn_popin.visible = expanded
		forms[sideForm + '__header'].elements.btn_popout.visible = !expanded
	}
}

}

/**
 *
 * @properties={typeid:24,uuid:"0f1d350b-c5ab-4dba-95cd-3bf67898992e"}
 */
function TIP_load_tips()
{

/*
 *	TITLE    :	TIP_load_tips
 *			  	
 *	MODULE   :	rsrc_TIP_tooltip
 *			  	
 *	ABOUT    :	
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TIP_load_tips()
 *			  	
 *	MODIFIED :	July 9, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

//query for all languages set up and create nodes for them

var dataset = databaseManager.getDataSetByQuery(
						forms.MGR_0F_tooltip.controller.getServerName(), 
						'SELECT DISTINCT i18n_language FROM sutra_tooltip',
						null,
						1000)
		
		
var languages = dataset.getColumnAsArray(1)

var L10n = new Object()
var formName = 'MGR_0F_tooltip'
var fsTooltip = databaseManager.getFoundSet(forms[formName].controller.getServerName(),forms[formName].controller.getTableName())

//loop through all languages
for (var i = 0; i < languages.length; i++) {
	
	var language = languages[i]
	
	//language value present
	if (language) {
		
		//create object to store locale strings
		var locale = L10n[language] = new Object()
		
		//find tips for selected language
		fsTooltip.find()
		fsTooltip.i18n_language = language
		var results = fsTooltip.search()
		
		//sort tips by form
		fsTooltip.sort('form_name asc, element_name asc')
		
		var formFilter = null
		
		//loop through all tips, creating new form objects as needed
		for (var j = 1; j <= fsTooltip.getSize(); j++) {
			var record = fsTooltip.getRecord(j)
			
			//check that record is valid (has enough information)
			if (record.form_name) {
			
				//create new form object if different than prior one
				if (record.form_name != formFilter) {
					formFilter = record.form_name
					locale[formFilter] = new Object()
					var formArray = 0
				}
				
				//named element
				if (record.element_name) {
					//actual tip
					locale[formFilter][record.element_name] = {
										toolTip : record.tooltip,
										inlineHelp : record.inline_help
									}
				}
				//element not named, create in numeric order
				else {
					//actual tip
					locale[formFilter]['noname_help_'+formArray++] = {
										toolTip : record.tooltip,
										inlineHelp : record.inline_help
									}
				}
			}
		}
	}
}

return L10n

}

/**
 *
 * @properties={typeid:24,uuid:"4eb47047-70ba-4963-a948-beb31e5feb31"}
 */
function zTEST_rewrite()
{

var args = new Array(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6])
var success = plugins.sutra.tryFWMethod(globals.zTEST_rewrite,args,"1")

//successful creation and execution for that iteration
if (success) {
	//overwrite plugin call (this method) with unscrambled
	globals.CODE_method_rewrite(globals.zTEST_rewrite, globals.zTEST_rewrite.ac)
}

}

/**
 *
 * @properties={typeid:24,uuid:"C0753EB2-B01E-4679-A5BA-522B17FBEBFE"}
 */
function ztestz() {
	return true
}
