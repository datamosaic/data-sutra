# Installation

<!-- toc -->

## 1. Servoy

Download Servoy developer from [Servoy’s website]. ***Note that Servoy
6.1.6 was the our tested and production version.***

Run the installer and install with or without the PostgreSQL database
(see recommendation in next section).

[Servoy installation instructions](https://wiki.servoy.com/pages/viewpage.action?pageId=13312557)

## 2. Database

Servoy can connect to any JDBC compliant database. We recommend
installing your database of choice using the recommended installer from the vendor. If you go this route, be sure to also download their
recommended JDBC driver and place in the
`../Servoy/application_server/drivers` directory.

Data Sutra is extensively tested with [MySQL]. and [PostgreSQL].

### Set up database connections

The following named database connections are required:

1.  sutra
2.  sutra\_example
3.  sutra\_log

We also recommend at least one more database connection to store all of your business application data in.

[Setting up database connections instructions](https://wiki.servoy.com/display/Serv60/Managing+Database+Connections)


## 3. Plugins

Install the following plugins into the
`../Servoy/application_server/plugins` directory:

1.  [ScrollerPlus.jar]
2.  [keyListener.jar]
3.  [Web Client Utils]
4.  [Velocity Report]


## 4. URL rewrite

Download the [Tuckey URL Rewrite Filter].

Add the `urlrewritefilter-4.x.jar` to the
`../Servoy/application_server/server/webapps/ROOT/WEB-INF/lib` directory (create the `lib` directory)


## 5. Data Sutra files

Download the latest Data Sutra zip file from the files section.

1.  `sutra.jar` jar goes in the `/Servoy/application_server/plugins`
    directory
2.  Copy the contents of the `ROOT` directory into Servoy’s server ROOT directory: `/Servoy/application_server/server/webapps/ROOT`. Note that this will overwrite some files.


## 6. Server settings

With developer running, open up the Servoy administration application at
`http://localhost:8080/servoy-admin/`. Change the following settings:

#### ADMIN SETTINGS section

`servoy.application_server.allowClientRepositoryAccess: TRUE`

#### NETWORK SETTINGS section

`SocketFactory.tunnelConnectionMode: HTTP`  
`SocketFactory.compress: CHECKED`  
`SocketFactory.useSSL: CHECKED`  
`SocketFactory.tunnelUseSSLForHttp: CHECKED`

#### FILE PLUGIN section

`servoy.FileServerService.defaultFolder: /`

[Servoy admin page instructions](https://wiki.servoy.com/display/Serv60/Servoy+Admin+page)


## 7. Data Sutra modules

In this section you import the Data Sutra modules into your workspace.
With Servoy Developer running, go to
`File > Import... > Servoy > Import Solution`.

First time install: import the `sutra.servoy` file.

If Data Sutra is already installed and you want to update to the latest
Data Sutra (and you are not hooked into our SVN repository), import the
`sutra_no_connector.servoy` file.

[Servoy import instructions](https://wiki.servoy.com/display/Serv60/Exporting+and+Importing+Solutions)


## 8. Starting up the clients

Data Sutra comes preconfigured with a sample solution, sample users and security turned on. This allows you to jump right in to a complete
working solution once you are done with the installation. In both of the following cases, you should be presented with a login screen.

#### Login info

username: `mbolton`  
password: `rocks`

#### Starting Smart Client

Click on the Smart Client button in the Servoy toolbar. It’s the
prominent green circle button with a single yellow arrow:

![](../attachments/servoy-client-buttons.png)

#### Starting Web Client

Web client is handled a little differently than the Servoy default
approach (clicking the prominent green circle button with the DOUBLE
yellow arrow). This is because we run Servoy web client via an iframe on our own html pages (which you installed).

Instead, open up the following url in your Google Chrome browser:
`http://localhost:8080/`

[Servoy web client reference](https://wiki.servoy.com/display/Serv60/Web+Client)


  [Servoy’s website]: http://crm.servoy.com/servoy-webclient/ss/s/myServoy/m/downloadServoy
  [MySQL]: http://www.mysql.com
  [PostgreSQL]: http://www.postgresql.org
  [ScrollerPlus.jar]: http://www.servoyforge.net/projects/scroller
  [keyListener.jar]: http://www.servoyforge.net/projects/keylisteners
  [Web Client Utils]: https://www.servoyforge.net/projects/webclientutils
  [Velocity Report]: https://www.servoyforge.net/projects/velocity-report
  [Tuckey URL Rewrite Filter]: http://www.tuckey.org/urlrewrite/#download