/**
 *
 * @properties={typeid:24,uuid:"26a96dd5-bf8f-461c-9ec4-fddcd31f3ce4"}
 */
function DIR_down()
{

/*
 *	TITLE:		DIR_down
 *
 *	MODULE:		ds_NAV_navigation_standard
 *
 *	ABOUT:		Move navigation_item down in list
 *
 *	MODIFIED:	Aug 27, 2007 - Troy Elliott, Data Mosaic
 *
 */

//if max index, exit
if (foundset.getSelectedIndex() == foundset.getSize()) {
	return
}

//if index = 1, set flag to avoid glitch recSelected
//TODO: find issue
if (foundset.getSelectedIndex() == 1) {
	var recOne = true
}
else {
	var recOne = false
}

//get current record
var recordCurr = foundset.getRecord(foundset.getSelectedIndex())

//get next record
var recordNext = foundset.getRecord(foundset.getSelectedIndex() + 1)

//swap with next record
recordCurr.order_by = recordNext.order_by
recordNext.order_by --

foundset.sort('order_by asc') //need to order by id_navigation_item and category first?

//TODO: find issue
if (recOne) {
	controller.setSelectedIndex(2)
}
}

/**
 *
 * @properties={typeid:24,uuid:"15fcc655-7f2b-43b0-a4ed-e786291e8b6c"}
 */
function DIR_up()
{

/*
 *	TITLE:		DIR_up
 *
 *	MODULE:		ds_NAV_navigation_standard
 *
 *	ABOUT:		Move navigation_item up in list
 *
 *	MODIFIED:	Aug 27, 2007 - Troy Elliott, Data Mosaic
 *
 */

//if index = 1, exit
if (foundset.getSelectedIndex() == 1) {
	return
}

//get current record
var recordCurr = foundset.getRecord(foundset.getSelectedIndex())

//get previous record
var recordPrev = foundset.getRecord(foundset.getSelectedIndex() - 1)

//swap with previous record
recordCurr.order_by = recordPrev.order_by
recordPrev.order_by ++

foundset.sort('order_by asc')
}

/**
 *
 * @properties={typeid:24,uuid:"f7171fd7-d770-47a2-8d7d-c20fb38fc26a"}
 */
function FLD_data_change__filter_type()
{


//make sure current list view is selected
REC_on_select()

databaseManager.saveData()

TOGGLE_sub_list()
}

/**
 *
 * @properties={typeid:24,uuid:"2728d36b-873f-43f4-9d63-a18b3dbcce34"}
 */
function REC_delete()
{

/*
 *	TITLE    :	REC_delete
 *			  	
 *	MODULE   :	ds_NAV_engine
 *			  	
 *	ABOUT    :	deletes record; if last record deleted, blanks out filter spec tab
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_delete()
 *			  	
 *	MODIFIED :	July 16, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var delRec = globals.DIALOGS.showWarningDialog('Delete record','Do you really want to delete this record?','Yes','No')

if (delRec == 'Yes') {
	var recSelect = foundset.getSelectedIndex()
	
	/*
	//TODO: this is preferred way to delete once the web of relations gets untangled
	foundset.deleteRecord()
	*/
	
	//TODO: this is NOT the preferred way
		//MEMO: it will leave orphans if there are action items 2 levels deep
	var serverName = controller.getServerName()
	var tableName = controller.getTableName()
	
	//pks so can delete child records
	var filterIDs = new Array()
	filterIDs[0] = id_action_item
	
	//delete current record
	var sql = 'DELETE from sutra_action_item WHERE id_action_item = ?'
	
	var success = plugins.rawSQL.executeSQL(serverName,tableName,sql,filterIDs)
	
	//clean up and flush cache if successfully deleted
	if (success) {
		//clean up
		sql = 'DELETE from sutra_action_item_filter WHERE id_action_item = ?'
		success = plugins.rawSQL.executeSQL(serverName,'sutra_action_item_filter',sql,filterIDs)
		
		//notify servoy of action_item deletions
		success = plugins.rawSQL.notifyDataChange(serverName,tableName,databaseManager.convertToDataSet(filterIDs),1)
	}
	//log error
	else {
		
	}
	
	//there are still records, update order_by on all items
	if (utils.hasRecords(foundset)) {
		var loop = recSelect
		while (loop <= foundset.getSize()) {
			foundset.setSelectedIndex(loop)
			foundset.order_by --
			loop++
		}	
		foundset.sort('order_by asc')
		foundset.setSelectedIndex(recSelect)
		
		//hack to make last record selected if last record deleted
		if (foundset.getSelectedIndex() != recSelect) {
			foundset.setSelectedIndex(foundset.getSize())
		}
	}
	else {
		forms.NAV_0F_navigation_item_1F__button_2F_action_item__filter.elements.tab_detail.tabIndex = 4
	}
}



}

/**
 *
 * @properties={typeid:24,uuid:"daa6bbae-9c7e-48ab-93b6-53c3a99f005a"}
 */
function REC_new()
{

/**
 *	Create new record and earmark it for the position it was created in
 *		Position: sub 1
 */

//get foundset
var actionItems = databaseManager.getFoundSet(controller.getServerName(),'sutra_action_item')
actionItems.clear()

var formName = 'NAV_0F_navigation_item_1F__button'
var relnName = 'nav_navigation_item_to_action_item__filter'
var relnMain = 'nav_action_item_to_action_item__main'
var relnSub1 = 'nav_action_item_to_action_item__sub1'
var relnSub2 = 'nav_action_item_to_action_item__sub2'

//add filter item
var record = actionItems.getRecord(actionItems.newRecord(true, true))
record.category = 'Filters'
record.id_navigation_item = forms[formName].id_navigation_item
record.id_action_item_parent = forms[formName][relnName][relnMain].id_action_item
record.order_by = (forms[formName][relnName].getSize() && forms[formName][relnName][relnSub1].getSize()) ? forms[formName][relnName][relnSub1].getSize() + 1 : 1

databaseManager.saveData()

//select newly created record
controller.setSelectedIndex(controller.getMaxRecordIndex())

//request focus
application.updateUI()
elements.fld_menu_name.requestFocus(false)



}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"ee83760a-04b3-4910-82c4-79c3f691df3f"}
 * @AllowToRunInFind
 */
function REC_on_select(event)
{
	
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

//get font string (font,normal/bold/italic/bolditalic,size)
if (application.__parent__.solutionPrefs) {
	//on a mac
	if (solutionPrefs.clientInfo.typeOS) {
		var fontSelect = 'Verdana,1,10'
		var fontUnselect = 'Verdana,0,10'
	}
	//on windows, linux, etc.
	else {
		var fontSelect = 'Tahoma,1,11'
		var fontUnselect = 'Tahoma,0,11'	
	}
}
//use mac settings when not running in the shell //TODO: change to windows settings when deployed
else {
	var fontSelect = 'Verdana,1,10'
	var fontUnselect = 'Verdana,0,10'
}

var formName = 'NAV_0F_navigation_item_1F__button_2F_action_item__filter'

//set list header label bold so we know where we are
forms[formName].elements.lbl_list_main.setFont(fontUnselect)
forms[formName].elements.lbl_list_sub1.setFont(fontSelect)
forms[formName].elements.lbl_list_sub2.setFont(fontUnselect)

//METHOD BEGINS
//
//

var skipSubLoad = arguments[0]
	
//set list that is highlighted (used for adding new filter records)
globals.NAV_filter_level = 2
	
//there are filter items
if (foundset.getSize()) {
	//populate globals that makes the other lists work
	globals.NAV_action_item_filter_sub2 = id_action_item
	
	//menu not named yet, clear details tab panel
	if (!menu_name) {
		forms[formName].elements.tab_detail.tabIndex = 4
	}
	//normal custom values
	else if (filter_type != 2) {
		//specs tab panel
		forms[formName].elements.tab_detail.tabIndex = 1
		
		//sub list tab panel
		forms[formName].elements.tab_list_sub2.tabIndex = 1
	}
	
	//toggle sublist tabs
	TOGGLE_sub_list()
	
	//load correct filter items
	//MEMO: shared foundset between custom and derived
	var filterItem = 'NAV_0F_navigation_item_1F__button_2F_action_item__filter_3L_action_item_filter__custom'
	forms[filterItem].foundset.find()
	forms[filterItem].foundset.id_action_item = id_action_item
	var results = forms[filterItem].foundset.search()
	
	//derived valuelist at runtime
	if (filter_type == 2) {
		forms[formName].elements.tab_detail.tabIndex = 2
	}
	//if child records in sub1, change selection
	else if (filter_type == 1 && !skipSubLoad) {
		//fire rec on select
		forms.NAV_0F_navigation_item_1F__button_2F_action_item__filter_3L__sub2.REC_on_select()
	}
	//if nodes below
	else if (filter_type) {
		forms[formName].elements.tab_detail.tabIndex = 3
	}
	
	//toggle detail tab-panel if there is a valid name, unless derived list
	if (menu_name && !skipSubLoad && filter_type != 2) {
		TOGGLE_details()
	}
	//enter menu item field if empty
	else if (!menu_name) {
		elements.fld_menu_name.requestFocus(false)
	}
}
//no filter items
else {
	forms[formName].elements.tab_detail.tabIndex = 4
}


}

/**
 *
 * @properties={typeid:24,uuid:"9872a40b-364b-4569-9315-92e4bfff9cb5"}
 */
function REC_save_data()
{

databaseManager.saveData()

TOGGLE_details()
}

/**
 *
 * @properties={typeid:24,uuid:"4d288314-11f5-483c-a47c-2bf91bbe9938"}
 */
function TOGGLE_details()
{

/*
 *	TITLE    :	TOGGLE_details
 *			  	
 *	MODULE   :	wf_NAV_engine
 *			  	
 *	ABOUT    :	
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TOGGLE_details()
 *			  	
 *	MODIFIED :	July 16, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

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

var disable = arguments[0]

//disable adding filters to a divider or manually disable
if (menu_name == '-' || utils.stringPatternCount(menu_name, '---') || disable) {
	forms.NAV_0F_navigation_item_1F__button_2F_action_item__filter_3L_action_item_filter__custom.TOGGLE_readonly(true)
}
//enable filter options if not a divider
else {
	forms.NAV_0F_navigation_item_1F__button_2F_action_item__filter_3L_action_item_filter__custom.TOGGLE_readonly(false)
}
}

/**
 *
 * @properties={typeid:24,uuid:"1161b9fa-a97d-4e74-8c21-00c6437cdf3e"}
 */
function TOGGLE_sub_list()
{


var formName = 'NAV_0F_navigation_item_1F__button_2F_action_item__filter'

//toggle next tab panel(s)
if (filter_type == 1) {
	forms[formName].elements.tab_list_sub2.enabled = true
	forms[formName].elements.lbl_list_sub2.enabled = true
	
	forms[formName].elements.btn_actions_sub2.enabled = true
}
else {
	forms[formName].elements.tab_list_sub2.enabled = false
	forms[formName].elements.lbl_list_sub2.enabled = false
	
	forms[formName].elements.btn_actions_sub2.enabled = false
}

}
