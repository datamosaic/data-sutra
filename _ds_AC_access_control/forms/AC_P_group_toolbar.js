/**
 *
 * @properties={typeid:24,uuid:"e9435d25-b833-488a-b323-3a2f857f3ebd"}
 */
function ACTION_cancel()
{
//not already ok to close, cancel
if (!globals.CODE_hide_form) {
	for ( var i = 0 ; i < foundset.getSize() ; i++ ) {
		var record = foundset.getRecord(i + 1)
		record.flag_chosen = 0
	}
	
	//turn autosave back on
	databaseManager.setAutoSave(true)
	
	//enaable closing the form
	globals.CODE_hide_form = 1
	
	application.closeFormDialog('accessGroupToolbars')
}
}

/**
 *
 * @properties={typeid:24,uuid:"5d0f61f0-ade9-46ee-9644-3cfe1f30e87e"}
 */
function ACTION_ok()
{
databaseManager.saveData()

//turn autosave back on
databaseManager.setAutoSave(true)

//enaable closing the form
globals.CODE_hide_form = 1

application.closeFormDialog('accessGroupToolbars')

//reload current records
forms.AC_0F_group__toolbar.LOAD_records()
}

/**
 *
 * @properties={typeid:24,uuid:"a8fd067f-9c45-4711-8f31-f2d513d7b7b4"}
 */
function ACTION_toggle_flags()
{

/*
 *	TITLE    :	ACTION_toggle_flags
 *			  	
 *	MODULE   :	ds_AC_access_control
 *			  	
 *	ABOUT    :	toggle flag_chosen field in FID
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	Mar 2008 -- David Workman, Data Mosaic
 *			  	
 */

//toggle logic
if (globals.AC_P_flag) {
	//toggle on
	var toggle = 1
}
else {
	//toggle off
	var toggle = 0
}

for ( var i = 0 ; i < foundset.getSize() ; i++ ) {
	var record = foundset.getRecord(i + 1)
	record.flag_chosen = toggle
	FLD_data_change__flag_chosen(record)
}

application.updateUI()
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"7904082f-4a49-43e2-9781-da03c1d208f4"}
 */
function FLD_data_change__flag_chosen(oldValue, newValue, event)
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

var record = (arguments[0]) ? arguments[0] : foundset.getRecord(foundset.getSelectedIndex())

//total records selected
if (utils.hasRecords(forms.AC_0F_group__toolbar_1L_group_toolbar.foundset)) {
	var total = forms.AC_0F_group__toolbar_1L_group_toolbar.foundset.getSize()
}
else {
	var total = 0
}

if (typeof this.addSome != 'number') {
	this.addSome = 0
}

if (record.flag_chosen) {
	this.addSome++
}
else {
	this.addSome--
	var removeOrder = true
}

if (removeOrder) {
	record.order_by = null
}
else {
	record.order_by = total + this.addSome
}
}

/**
 *
 * @properties={typeid:24,uuid:"e170bf6f-0b78-4efc-b9dd-0e05ae3bb358"}
 */
function FORM_on_show()
{

/*
 *	TITLE    :	FORM_on_show
 *			  	
 *	MODULE   :	ds_AC_access_control
 *			  	
 *	ABOUT    :	set default status of check box
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	Mar 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var state = 1

for ( var i = 0 ; i < foundset.getSize() && state ; i++ ) {
	var record = foundset.getRecord(i + 1)
	
	if (record.flag_chosen == 0 || record.flag_chosen == null) {
		state = 0
	}
}

globals.AC_P_flag = state

//sort
foundset.sort('ac_access_group_toolbar_to_toolbar.row_order asc')

//disable closing the form
globals.CODE_hide_form = 0

//form variable
this.addSome = 0

}
