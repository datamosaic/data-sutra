items:[
{
anchors:6,
formIndex:10300,
location:"310,206",
mediaOptions:14,
mnemonic:"r",
onActionMethodID:"546A7745-9A6B-4312-91CE-045236C925AC",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"70,15",
styleClass:"fidaction",
text:"Replace",
toolTipText:"Perform the search",
transparent:true,
typeid:7,
uuid:"0CCBFA98-E164-4E88-8BCC-BBF79CF50D0B"
},
{
formIndex:11200,
horizontalAlignment:4,
location:"10,130",
mediaOptions:14,
name:"lbl_two",
showClick:false,
showFocus:false,
size:"185,20",
tabSeq:-1,
text:"Increment by:",
transparent:true,
typeid:7,
uuid:"1092A1C5-CC4E-4438-BA36-42412580147C"
},
{
formIndex:10800,
horizontalAlignment:4,
location:"10,80",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"185,20",
tabSeq:-1,
text:"Replacement method:",
transparent:true,
typeid:7,
uuid:"269448A4-A97B-45A1-9DDC-911DBBC840EB"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_field_value",
displayType:2,
editable:false,
formIndex:12000,
location:"206,105",
name:"fld_field_value__vl",
size:"185,22",
styleClass:"combobox",
transparent:true,
typeid:4,
uuid:"29DBD997-DD80-420D-A505-5D21BDC4896C",
valuelistID:"4D80F086-29ED-4BA0-9B71-2BFA8F600E40"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_field_value_options",
displayType:2,
editable:false,
formIndex:11700,
location:"206,105",
name:"fld_field_value_options",
onDataChangeMethodID:"4796A83A-B82C-4BE2-9EA3-1C8219BD3920",
size:"185,22",
styleClass:"combobox",
transparent:true,
typeid:4,
uuid:"32E698AF-DD4D-400D-AA5F-7DF4828C503F",
valuelistID:"77615F0C-BEA7-47D9-A2AD-81F089C37812"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_step_start",
formIndex:11100,
location:"205,104",
name:"fld_step_start",
size:"85,22",
typeid:4,
uuid:"37617A53-F99C-46EB-91AF-39A4270ACE14"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_field",
displayType:2,
editable:false,
formIndex:10900,
location:"205,39",
onDataChangeMethodID:"83EDDD80-AE31-4165-AA6C-650C0F622E84",
size:"185,22",
styleClass:"combobox",
transparent:true,
typeid:4,
uuid:"376C6D6C-3DE5-41B6-8377-9BDBDE0EB6CD",
valuelistID:"F877FD53-BA9E-4AB8-AC4E-6AD7F11AEF8A"
},
{
anchors:11,
formIndex:10100,
imageMediaID:"CE53A863-E2EB-4ECC-A84B-9E7D8DB56674",
location:"0,28",
mediaOptions:6,
showClick:false,
showFocus:false,
size:"400,6",
tabSeq:-1,
typeid:7,
uuid:"51D01EF6-A9CA-4821-81D8-DB565755A404"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_step_increment",
formIndex:11300,
location:"205,129",
name:"fld_step_increment",
size:"85,22",
typeid:4,
uuid:"5914D20E-646C-4F0D-9738-03560417BA00"
},
{
anchors:11,
background:"#323a4b",
formIndex:10000,
location:"0,0",
mediaOptions:6,
showClick:false,
showFocus:false,
size:"400,28",
tabSeq:-1,
typeid:7,
uuid:"5E8E79D1-8AC7-4D68-87BE-7265A3D86214"
},
{
anchors:11,
formIndex:10400,
location:"10,5",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"378,25",
styleClass:"heading1",
tabSeq:-1,
text:"Power Replace",
transparent:true,
typeid:7,
uuid:"8248AEC0-18EF-42AB-BEE0-65DA7ED0D799"
},
{
height:222,
partType:5,
typeid:19,
uuid:"873F06C3-F84B-48E8-9ADF-B9DB4AC2B5C9"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_field_value",
formIndex:11900,
location:"205,104",
name:"fld_field_value__text",
size:"185,22",
typeid:4,
uuid:"92C19149-B13E-42E6-AC6C-F959B5127789"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,",
formIndex:11400,
horizontalAlignment:4,
location:"10,67",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"380,4",
tabSeq:-1,
transparent:true,
typeid:7,
uuid:"95824E26-26E2-47AF-BBE4-095422935AD0"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_field_value",
displayType:1,
formIndex:11500,
location:"205,131",
name:"fld_field_value__field",
scrollbars:33,
size:"185,70",
styleClass:"textarea",
typeid:4,
uuid:"9B435498-0067-4831-846D-1BC68B1861FA"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_field_value_date",
displayType:5,
formIndex:11800,
format:"MM-dd-yyyy",
location:"205,104",
name:"fld_field_value_date",
size:"185,22",
styleClass:"date",
typeid:4,
uuid:"B9BBB373-C1CB-4B03-80EA-1BC6BEDEDC40"
},
{
anchors:3,
dataProviderID:"globals.NAV_replace_method",
displayType:2,
editable:false,
formIndex:10500,
location:"205,79",
name:"fld_replace_method",
onDataChangeMethodID:"8A40E8ED-2A91-4106-8836-38F9639D6C37",
size:"185,22",
styleClass:"combobox",
transparent:true,
typeid:4,
uuid:"BA9D7660-F772-4755-8727-CE516C2FFFFF",
valuelistID:"765F1AA3-4B85-488E-B87D-9FF00F740801"
},
{
formIndex:11000,
horizontalAlignment:4,
location:"10,105",
mediaOptions:14,
name:"lbl_one",
showClick:false,
showFocus:false,
size:"185,20",
tabSeq:-1,
text:"Starting value:",
transparent:true,
typeid:7,
uuid:"C5182715-5C9E-4DF4-9220-421497B09A90"
},
{
anchors:12,
formIndex:10600,
location:"20,206",
mediaOptions:14,
mnemonic:"c",
onActionMethodID:"AA9EFFF3-F7DB-4A26-A728-CB45DF39FE3B",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"70,15",
styleClass:"fidaction",
text:"Cancel",
toolTipText:"Cancel the search",
transparent:true,
typeid:7,
uuid:"D5857F2A-4B64-49BB-8B25-19F872D4F2F2"
},
{
anchors:14,
formIndex:10200,
imageMediaID:"1811396E-6434-4F6C-AEB8-5FBCEF2C0461",
location:"0,205",
mediaOptions:6,
showClick:false,
showFocus:false,
size:"400,17",
tabSeq:-1,
typeid:7,
uuid:"DCEFD84E-70AF-4BB5-B7F7-8E8C67E08DAC"
},
{
formIndex:10700,
horizontalAlignment:4,
location:"10,40",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"185,20",
tabSeq:-1,
text:"Choose a field to replace:",
transparent:true,
typeid:7,
uuid:"E76ACB03-DC78-42AA-A935-7CFE05434616"
}
],
name:"NAV_P__replace",
navigatorID:"-1",
onDeleteAllRecordsCmdMethodID:"-1",
onDeleteRecordCmdMethodID:"-1",
onDuplicateRecordCmdMethodID:"-1",
onFindCmdMethodID:"-1",
onHideMethodID:"AA9EFFF3-F7DB-4A26-A728-CB45DF39FE3B",
onInvertRecordsCmdMethodID:"-1",
onNewRecordCmdMethodID:"-1",
onNextRecordCmdMethodID:"-1",
onOmitRecordCmdMethodID:"-1",
onPreviousRecordCmdMethodID:"-1",
onPrintPreviewCmdMethodID:"-1",
onSearchCmdMethodID:"-1",
onShowAllRecordsCmdMethodID:"-1",
onShowMethodID:"21B3CA1A-B85A-4A59-9C86-66E5AC7F8751",
onShowOmittedRecordsCmdMethodID:"-1",
onSortCmdMethodID:"-1",
paperPrintScale:100,
size:"400,222",
styleClass:"workarea2",
styleName:"_DATASUTRA_",
typeid:3,
uuid:"52951A21-66E7-47F8-813C-16B429B27F74"