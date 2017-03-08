# TODOs

- [x] update main readme


## v8 Migration

Migrate this beast to Servoy v8. Smart Client should work...Webclient is SOL. Has to deploy semi-elegantly. Move to Postgres from Mysql. Etc.

Notes along the way on what is needed to migrate from v6 to v8. What is whacked, best practices, challenges, order of tasks, etc.

*Goal:* how to extend life of legacy Servoy apps

- [ ] SVN to Git
- [ ] Eclipse setup
- [ ] Develop on Master or Branch?
- [ ] Deployment strategy (Docker, test script, build script, deploy script, Zeit Now preferably)
  - [ ] Johan posted something about speeding up Smart Client initial load times on the forum awhile back
- [ ] Database deployment strategy. Look up how ppl are doing PG in continuous integration setups. Schema changes, default data, sharing multi-developer, test server, emergency rollback, etc. Reduce big subject down to base concepts with reasonable starter scripts to implement

Stuff likely to remove:

- [ ] DS plugin dependency
- [ ] All webclient stuff :cry:

Sample apps

- [ ] Demo simple CRM
- [ ] Sutra CMS? All the data and the CMS is solid. Have to spit out to a different server setup minimally. Maybe do a static build using the main controller entry point. Use Nuxtjs as inspiration.
