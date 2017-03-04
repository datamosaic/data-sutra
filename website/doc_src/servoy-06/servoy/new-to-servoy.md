# New to Servoy

If you are new to Servoy, there are two things you should be aware of.
First, Servoy has both development and deployment components. Second,
Servoy is not a database.

Depending on your previous experience, either one or both of these facts
may be different than what you are used to.

## Resources

We have a number of useful coding related videos posted here:

- [Servoy essentials on YouTube](https://www.youtube.com/playlist?list=PLC09FE4E71E2A99F8)

Important Servoy links:.

- [Servoy’s quick start guide](https://wiki.servoy.com/display/Serv60/Quick-Start+Guide)
- [Servoy forum](http://forum.servoy.com/)

## RAD tool and deployment platform

From the [Servoy Quickstart Guide](https://wiki.servoy.com/display/Serv60/Quick-Start+Guide):

> Servoy is unique in that it is both a Rapid Application Development
(RAD) tool and a production deployment platform.

This matters because installation is different for developer and
deployment machines. The Servoy developer component is based on Eclipse
and is a stand-alone IDE with an integrated server for debugging. The
Servoy server component is typically installed as a headless process and
comes with a browser-based administration interface.

Running Servoy Developer and Servoy Server on the same machine at the
same time is only possible if you change the port number for one of the
instances (default is 8080). Generally, it is not recommended to have
both on the same machine just because that would be really weird for a
whole bunch of IT deployment and development workflow related reasons.

One of which would be that at no time do you develop on a “live”
application. Instead, you write code in Servoy Developer, export your
solution to a file, and then import this file into Servoy Server via the
administration interface.

If you catch an error after importing to the live production
environment, Servoy Server has a really cool feature that allows you to
rollback the deployed application to any previously uploaded version of
the application.

Installing Servoy Server can be a bit involved and is beyond the scope
of this document. When you download and install Servoy for the first
time, it will most likely be for the reason of setting up the Servoy
developer component. And this process is about as easy as an
installation can be so no need to elaborate further here. Except to note
that…

## Servoy is not a database

Whoa…what?!? Again, from the [quickstart guide](https://wiki.servoy.com/display/Serv60/Quick-Start+Guide):

> Servoy is NOT a database. There are plenty great databases out there and Servoy can connect any modern RDBMS (and even some that aren’t so modern).

The confusion here is twofold:

-   Servoy ships with PostgreSQL
-   Most Servoy applications you develop use a database

Having PostgreSQL bundled into your developer install is really
convenient for your first foray into Servoy development as it is just
one less thing you have to think about. A drawback to this setup is that
the PostgreSQL database engine starts up and shuts down as you open and
close Servoy Developer. It also runs on the default PostgreSQL ports so
if you already have PostgreSQL running, the Servoy install of PostgreSQL
won’t start up at all.

The key to all this is to recognize that Servoy allows you to connect to
any database you want. We basically never install the default database
nowadays when installing Servoy but instead [connect to RDBMS’s] already
installed on our machines (developer and server) after we have installed
Servoy. This allows us to manage the database layer in one place no
matter how many various development environments and client projects
we’re juggling at any given time.

We primarily test against MySQL and occasionally PostgreSQL No
recommendation implied here—just the way we roll. In Sutra CMS we have
avoided using non-standard SQL queries and unique database features so
feel free to use with the RDMS of your choice. Please let us know if you
come across any database related issues.
