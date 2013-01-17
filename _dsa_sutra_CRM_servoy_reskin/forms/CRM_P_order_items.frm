dataSource:"db:/sutra_example/order_items",
items:[
{
formIndex:10800,
horizontalAlignment:4,
location:"10,155",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"85,22",
styleClass:"heading2",
tabSeq:-1,
text:"Price Each",
transparent:true,
typeid:7,
uuid:"33af9ede-d625-4299-8a9f-a7f32f4e679d"
},
{
anchors:6,
formIndex:11100,
location:"290,186",
mediaOptions:14,
mnemonic:"d",
onActionMethodID:"7dce009e-65c8-4d37-bdb9-8679fc89051c",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"70,15",
styleClass:"fidaction",
tabSeq:-2,
text:"Done",
transparent:true,
typeid:7,
uuid:"3795eafa-3d6e-4c1d-a99d-fd8da637d06c"
},
{
formIndex:10600,
horizontalAlignment:4,
location:"10,125",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"85,22",
styleClass:"heading2",
tabSeq:-1,
text:"Quantity",
transparent:true,
typeid:7,
uuid:"3938ccdb-3078-4851-9f14-e36de5f1fe8d"
},
{
formIndex:10200,
horizontalAlignment:4,
location:"10,45",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"85,22",
styleClass:"heading2",
tabSeq:-1,
text:"Product ID",
transparent:true,
typeid:7,
uuid:"4517777c-06ee-4d13-ab4b-ba50b0b27265"
},
{
anchors:12,
formIndex:11200,
location:"10,186",
mediaOptions:14,
mnemonic:"c",
onActionMethodID:"1B94F29A-1471-44C2-8776-2EAD218FC39D",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"70,15",
styleClass:"fidaction",
tabSeq:-2,
text:"Cancel",
transparent:true,
typeid:7,
uuid:"47f0d46a-05b1-4f90-ac19-b8159d68d55c"
},
{
formIndex:10400,
horizontalAlignment:4,
location:"10,75",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"85,22",
styleClass:"heading2",
tabSeq:-1,
text:"Description",
transparent:true,
typeid:7,
uuid:"59ea1f89-8cf0-433d-a821-c00598f80c54"
},
{
anchors:11,
formIndex:11400,
imageMediaID:"75106851-5fe4-493b-86db-616ebd8df83b",
location:"0,28",
mediaOptions:6,
showClick:false,
showFocus:false,
size:"370,6",
tabSeq:-1,
typeid:7,
uuid:"5bf40952-8dc6-4cad-90e6-90ecc31b9338"
},
{
anchors:11,
dataProviderID:"product_id",
displayType:2,
editable:false,
formIndex:10100,
location:"100,45",
onActionMethodID:"1ec6ce0e-208d-49b2-ab76-a3d9660f0777",
size:"250,22",
tabSeq:1,
transparent:true,
typeid:4,
uuid:"610ed66c-c8d7-4398-b0fc-82f09ac26728",
valuelistID:"2230974f-5136-41b3-bee6-0640a854bf53"
},
{
dataProviderID:"price_each",
formIndex:10700,
format:"¤###,###,###.00|#.00",
location:"100,157",
size:"90,20",
tabSeq:4,
typeid:4,
uuid:"7e404535-b857-4bf7-b834-6d5a8e8f2892"
},
{
anchors:14,
formIndex:11000,
imageMediaID:"5100a0f7-e408-4698-b0a3-65059779b12b",
location:"0,185",
mediaOptions:6,
showClick:false,
showFocus:false,
size:"370,17",
tabSeq:-1,
typeid:7,
uuid:"870484b6-02df-4083-85ad-191d219e6f70"
},
{
anchors:11,
dataProviderID:"description",
displayType:1,
formIndex:10300,
location:"100,75",
scrollbars:33,
size:"250,42",
tabSeq:2,
typeid:4,
uuid:"98d69255-9a40-404a-b7c9-c382eb4a4b9f"
},
{
anchors:3,
formIndex:11500,
horizontalAlignment:4,
location:"190,155",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"65,22",
styleClass:"heading2",
tabSeq:-1,
text:"Extended",
transparent:true,
typeid:7,
uuid:"99d4fcf9-7bb9-4533-9eef-30c639f241f8"
},
{
anchors:11,
formIndex:11300,
location:"10,5",
mediaOptions:14,
name:"lbl_header",
showClick:false,
showFocus:false,
size:"350,25",
styleClass:"heading1",
tabSeq:-1,
text:"Edit order item",
transparent:true,
typeid:7,
uuid:"b3a9a6c4-7ddb-413e-8354-772fc2f92725"
},
{
height:202,
partType:5,
typeid:19,
uuid:"b5314fdf-4e5e-4152-b813-bc8f2bb7405d"
},
{
dataProviderID:"quantity",
formIndex:10500,
location:"100,127",
size:"90,20",
tabSeq:3,
typeid:4,
uuid:"c19bc0b0-c95c-41b3-83bf-bfe9ca56c3b8"
},
{
anchors:11,
background:"#323a4b",
formIndex:10000,
location:"0,0",
mediaOptions:6,
showClick:false,
showFocus:false,
size:"370,28",
tabSeq:-1,
typeid:7,
uuid:"e6538e3d-9c3a-4516-b12b-429b198dedee"
},
{
anchors:3,
dataProviderID:"extended_price",
editable:false,
formIndex:10900,
format:"¤###,###,###.00|#.00",
location:"260,157",
size:"90,20",
styleClass:"bold",
tabSeq:5,
typeid:4,
uuid:"f4cfcaa2-8567-41a9-81c3-872e1dab5a0e"
}
],
name:"CRM_P_order_items",
navigatorID:"-1",
onDeleteAllRecordsCmdMethodID:"-1",
onDeleteRecordCmdMethodID:"-1",
onDuplicateRecordCmdMethodID:"-1",
onFindCmdMethodID:"-1",
onHideMethodID:"1B94F29A-1471-44C2-8776-2EAD218FC39D",
onInvertRecordsCmdMethodID:"-1",
onNewRecordCmdMethodID:"-1",
onNextRecordCmdMethodID:"-1",
onOmitRecordCmdMethodID:"-1",
onPreviousRecordCmdMethodID:"-1",
onPrintPreviewCmdMethodID:"-1",
onSearchCmdMethodID:"-1",
onShowAllRecordsCmdMethodID:"-1",
onShowMethodID:"9e9cae27-e014-4ebc-ae5e-41c87f00afc9",
onShowOmittedRecordsCmdMethodID:"-1",
onSortCmdMethodID:"-1",
paperPrintScale:100,
scrollbars:36,
size:"370,202",
styleName:"_DATASUTRA_",
typeid:3,
uuid:"b53860db-9a83-43ce-80ee-8b2411892461"