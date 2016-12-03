# Team-C
TelerikAcademy NodeJs Teamwork

### Automation

#### gulp inject-resources
this task will inject scripts and styles to the 
`views/layout/` scripts.pug and styles.pug
Run it with a watcher or attach it to a post install hook
You can also start it manually by `npm run inject-resources` without global gulp

- sources are read from `source/public` and the `bower.json`
- destination is the `views/layout` resources layout files