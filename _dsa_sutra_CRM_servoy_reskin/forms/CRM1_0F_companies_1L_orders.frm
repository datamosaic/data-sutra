dataSource:"db:/sutra_example/orders",
initialSort:"order_date desc",
items:[
{
background:"#d1d7e2",
height:20,
partType:1,
typeid:19,
uuid:"3f986ea3-4225-4a2e-93a1-9c1efca3bebd"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
dataProviderID:"order_date",
editable:false,
formIndex:10200,
format:"MM-dd-yyyy",
location:"104,34",
size:"90,22",
styleClass:"tableview",
text:"Date",
typeid:4,
uuid:"42aeaac9-dc97-4a27-ad0c-7aa5e70af731"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
dataProviderID:"terms",
editable:false,
formIndex:10500,
location:"453,34",
size:"120,22",
styleClass:"tableview",
text:"Terms",
typeid:4,
uuid:"466c23a0-840c-4de0-915d-be774ed5ebc8"
},
{
anchors:3,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
formIndex:10800,
imageMediaID:"e838f55d-86d2-4582-9ea2-031a2143dbfa",
location:"0,34",
mediaOptions:1,
onActionMethodID:"902098dd-1a5b-4010-8e07-197e18035827",
rolloverCursor:12,
rolloverImageMediaID:"264d3d85-ce2d-4dfd-a5e7-a066a504fe35",
showClick:false,
showFocus:false,
size:"20,22",
toolTipText:"Goto selected order",
typeid:7,
uuid:"5aabc488-c138-4041-beda-93ace41c1eef"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
dataProviderID:"po_number",
editable:false,
formIndex:10000,
location:"195,34",
size:"80,22",
styleClass:"tableview",
text:"PO",
typeid:4,
uuid:"5e49eb96-6a88-4ef3-9006-a72bcab87e5b"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
dataProviderID:"paid_display",
displayType:8,
editable:false,
formIndex:10900,
location:"385,234",
scrollbars:36,
size:"70,22",
styleClass:"textareahtml",
text:"Paid",
typeid:4,
uuid:"8310eba0-0ceb-408f-b5e3-97e65dba0ee6"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
dataProviderID:"order_number",
editable:false,
formIndex:10100,
format:"###,###,###,###",
location:"23,34",
size:"80,22",
styleClass:"tableview",
text:"Order #",
typeid:4,
uuid:"85e5aad2-53d4-4583-a80c-2ea5846c6083"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
dataProviderID:"ship_via",
editable:false,
formIndex:10600,
location:"667,34",
size:"90,22",
styleClass:"tableview",
text:"Ship via",
typeid:4,
uuid:"8c6fc029-63c1-449f-a6e1-fb7779a939bc"
},
{
height:195,
partType:5,
typeid:19,
uuid:"ac17334b-78a5-4890-a86d-50e91a1284fc"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
dataProviderID:"order_total",
editable:false,
formIndex:10300,
format:"¤###,###,###.00",
horizontalAlignment:4,
location:"277,34",
size:"101,22",
styleClass:"tableview",
text:"Amount",
typeid:4,
uuid:"b5e32885-499b-47cc-8df8-190b540bf54d"
},
{
anchors:11,
borderType:"SpecialMatteBorder,0.0,0.0,1.0,0.0,#000000,#000000,#999999,#000000,0.0,1.0",
dataProviderID:"paid_display",
formIndex:10400,
location:"382,35",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"70,22",
tabSeq:-1,
text:"Paid",
typeid:7,
uuid:"bb813451-d059-4839-9a2f-412429279d1e"
},
{
anchors:3,
borderType:"EmptyBorder,0,0,0,0",
formIndex:10700,
imageMediaID:"ca71eeeb-624d-461d-a4b3-41a387f1304a",
location:"720,0",
mediaOptions:1,
onActionMethodID:"41a1f327-6a6a-4507-b783-2231e4f2ee51",
rolloverCursor:12,
rolloverImageMediaID:"e5ed6909-0205-4660-b805-94edf9739179",
showClick:false,
showFocus:false,
size:"20,20",
toolTipText:"Add new order",
transparent:true,
typeid:7,
uuid:"c0a5f102-fd68-47f9-8879-f96b4739f17c"
}
],
name:"CRM1_0F_companies_1L_orders",
paperPrintScale:100,
scrollbars:33,
size:"758,195",
styleName:"_DATASUTRA_",
typeid:3,
uuid:"8dba477d-fbad-45a5-9e12-11b062d47169",
view:3