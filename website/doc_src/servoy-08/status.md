# Status

> Tossing ideas around, nothing concrete as yet (early 2017)

## Thoughts

> Servoy 7 set back Servoy years.

Servoy 7 was essentially Servoy 6 with a mobile feature tacked on. A mobile feature that was [180 degrees opposite](http://forum.servoy.com/viewtopic.php?f=16&t=19471&start=15#p105151) of anything reasonable.

Servoy 8's marque feature, [ngClient](https://wiki.servoy.com/display/public/DOCS/NGClient) is implemented in the same vein as Servoy 7's mobile client — tight coupling everywhere. *Nothing to see here.*

However, several new features are worth investigating:

1. **WAR deployment**
2. **Services architecture**
3. **Websockets transport**

## Goals

> Bring over best practices and tools from ecosystems outside of Servoy. Uncouple, automate and leverage cloud services for key services.

1. Get current functionality working
2. Library with middlewear architecture over websockets to uncouple services from Angular1 
3. Move security out of Servoy into middlewear layer
4. Modernize installation
5. Automate deployment
6. New client (based around either VueJS or React ecosystems)

