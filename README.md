### THIS REPOSITORY IS NO LONGER MAINTAINED, THIS EXISTS SOLELY FOR HISTORICAL VALUE.

# BibleBot
A Discord bot for Bible verses.

To use it, just say a Bible verse.

---

Installation:

```sh
git clone https://git.vypr.space/BibleBot/BibleBot.git;
npm install;
mv src/config.example.js src/config.js;
$EDITOR src/config.js;
npm run build;
npm start;
```

---

Commands:

* `+versions` - show all Bible translations you can set
* `+setversion VER` - set a preferred version
* `+version` - display your current version
* `+versioninfo VER` - read information about a version, using the acronym
* `+random` - get a random Bible verse
* `+verseoftheday` (`+votd`) - get the verse of the day
* `+headings enable/disable` - enable or disable the headings that display on certain verses
* `+versenumbers enable/disable` - enable or disable verse numbers from showing on each line
* `+languages` - show all available language translations you can set
* `+setlanguage LANG` - set a preferred language
* `+language` - display your current language
* `+allusers` - list all users throughout all servers (not counting duplicates or bots)
* `+users` - list all users in the server where the message is sent
* `+listservers` - list all servers BibleBot is in
* `+invite` - get the invite link for BibleBot

Bot Owner Commands:

* `+addversion versionname abbv hasOT hasNT hasAPO` - add a version (`+av`)
* `+puppet message` - say something as the bot
* `+eval javascript` - execute javascript code

---

Versioning:

Every commit, add 1 to the last number of the version, if the result is 10,
add 1 to the second number of the version. If the result of the second number is 10,
add 1 to the first number of the version.

Examples:  
2.8.9 --> Commit --> 2.9.0  
2.9.8 --> Commit --> 2.9.9  
2.9.9 --> Commit --> 3.0.0  

Every commit done involving the code itself must have the version number updated.   
Commits done to the README, the package.json file (except when adding dependencies),   
and the dotfiles do not need to have the version number updated.   

---

### Special Thanks

**adfizz, apocz, audiovideodisco, Banská Bystrica, Blubb, BonaventureSissokovitch, Buggyrcobra, Coal, DeadPixels, jznsamuel, Koockies, Mark Nunberg, Manelic, Raven Melodie, omeratagun, Sezess, sunray.steemit, SwedishMeatball, Tuonela, TySpeedy, Viva98, xnkmevaou, Zyxl** - for their hard work on helping BibleBot reach the world by translating languages :heart:
