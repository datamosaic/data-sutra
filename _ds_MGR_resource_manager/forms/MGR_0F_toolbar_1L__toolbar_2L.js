/**
 *
 * @properties={typeid:24,uuid:"B2C082BE-00CB-49B2-9D6C-CBBD5FDFBD10"}
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
recordCurr.row_order = recordNext.row_order
recordNext.row_order --

foundset.sort('row_order asc')

//TODO: find issue
if (recOne) {
	controller.setSelectedIndex(2)
}


}

/**
 *
 * @properties={typeid:24,uuid:"7EC9E6C4-372C-4663-9404-A0E2BD892639"}
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
recordCurr.row_order = recordPrev.row_order
recordPrev.row_order ++

foundset.sort('row_order asc')
}

/**
 *
 * @properties={typeid:24,uuid:"F3DEEA3A-D419-48A5-A3C3-A6AB9C1DC611"}
 */
function REC_delete()
{

/*
 *	TITLE    :	REC_delete
 *			  	
 *	MODULE   :	rsrc_TOOL_toolbar
 *			  	
 *	ABOUT    :	delete record
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_delete()
 *			  	
 *	MODIFIED :	July 24, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var delRec = plugins.dialogs.showWarningDialog('Delete record','Do you really want to delete this toolbar?','Yes','No')
if (delRec == 'Yes') {
	var recSelect = controller.getSelectedIndex()
	
	controller.deleteRecord()
		
	var loop = recSelect
	
	//decrement tab number
	while (loop <= foundset.getMaxRecordIndex()) {
		foundset.setSelectedIndex(loop)
		row_order--
		loop++
	}
	
	controller.setSelectedIndex(recSelect)
}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"469B31A1-7F20-4AB4-B7F2-61524CB8BCDB"}
 */
function FLD_tab_name__data_change(oldValue, newValue, event) {
	var fsDupe = databaseManager.getFoundSet('sutra','sutra_toolbar')
	
	fsDupe.find()
	fsDupe.toolbar_type = 1
	fsDupe.tab_name = newValue
	var results = fsDupe.search()
	
	if (results > 1) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'The registry must be unique'
			)
		return false
	}
	
	return true
}
