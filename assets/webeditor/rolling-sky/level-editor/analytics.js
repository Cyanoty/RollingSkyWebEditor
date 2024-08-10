const params = new URLSearchParams(window.location.search);
var maxtile = RollingSky.maxtile,
  allowdraw = !1,
  allowscroll = !0,
  canvas = document.getElementById("canvas"),
  canvasAlt = document.getElementById("canvasAlt"),
  line = canvas.innerHTML,
  levellengthinput = document.getElementById("length"),
  isUsingTempEraser = !1;
function autostart() {
  askToLoadOverwrite() &&
    (loadnumber(parseInt(levellengthinput.value) + 1),
    start(levellengthinput.value));
}
function loadDebugLevel() {
  start(128);
}
function scrollpos(e) {
  (document.documentElement.style.scrollBehavior = "revert !important"),
    (document.body.scrollTop = e),
    (document.documentElement.scrollTop = e),
    window.scrollTo(0, e),
    (document.documentElement.style.scrollBehavior = "smooth !important");
}
function askToLoadOverwrite() {
  return (
    !loadlevelcollection("lastleveldata", !0, !0) ||
    (!!confirm(Lang.resolve("webeditor.alerts.overwritesessionlevel.one")) &&
      (!!confirm(Lang.resolve("webeditor.alerts.overwritesessionlevel.two")) ||
        void 0))
  );
}
function start(t) {
  console.log("Creating a new level with " + t + " rows...");
  try {
    if (1 <= t) {
      var l = (canvas.innerHTML = line);
      for (let e = 1; e < t; e++) l += line;
      (canvas.innerHTML = l),
        scrollpos(document.body.scrollHeight),
        (document.getElementById("startmenu").style.display = "none"),
        (document.getElementById("level").style.visibility = "visible");
    }
  } catch {
    console.error("Creating new level with " + t + " rows failed.");
  }
}
var firstselectobj,
  a,
  tileselectinput = document.getElementById("input"),
  tileselectval = 0;
function changeval() {
  tileselectval = parseInt(tileselectinput.value);
}
function detectLeftButton(e) {
  return "buttons" in (e = e || window.event)
    ? 1 == e.buttons
    : 1 == (e.which || e.button);
}
function detectRightButton(e) {
  return "buttons" in (e = e || window.event)
    ? 2 == e.buttons
    : 1 == (e.which || e.button);
}
(document.onmousemove = function (e) {
  (e = e || window.event), draw((evt = e));
}),
  (document.onmousedown = function (e) {
    (e = e || window.event), draw((evt = e));
  }),
  (document.onmouseup = function (e) {
    (e = e || window.event), (evt = e);
  });
const queryString = window.location.search,
  urlParams = new URLSearchParams(queryString),
  leveldata = urlParams.get("l");
function tryloadfromurl() {
  null != leveldata &&
    ((a = leveldata.replaceAll("-", "\n")), delay(10).then(() => load001(a)));
}
function load001(e) {
  load(e), window.history.replaceState(null, null, window.location.pathname);
}
function delay(t) {
  return new Promise((e) => setTimeout(e, t));
}
function loadtourl() {
  document.getElementById("copyout");
  var e =
    window.location.href.split("?")[0] +
    "?l=" +
    generate(!0).replaceAll("\n", "-");
  (copyout.value = e),
    copyout.select(),
    copyout.setSelectionRange(0, 99999),
    navigator.clipboard.writeText(copyout.value);
}
var touchHasMoved = !1;
function mobiledraw(e) {
  if ((preventNaNval(), 1 == detectLeftButton(e)))
    return "C-TILEPREV" == e.target.tagName
      ? ((tileselectval = parseInt(e.target.classList[0])),
        void Obstacle.hideCounter())
      : void 0;
  if (allowdraw && "C-TILE" == e.target.tagName && !iscolorpicking) {
    if (isGeoStartBrush) {
      switch (elem.className) {
        case "0":
          elem.className = "181";
          break;
        case "1":
          elem.className = "182";
          break;
        case "2":
          elem.className = "184";
          break;
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
          elem.className = "183";
          break;
        case "586":
          elem.className = "589";
      }
      return;
    }
    if (isGeoEndBrush) {
      switch (elem.className) {
        case "0":
          elem.className = "185";
          break;
        case "1":
          elem.className = "186";
          break;
        case "2":
          elem.className = "188";
          break;
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
          elem.className = "187";
      }
      return;
    }
    isUsingRandomizer && updaterandomizer(e),
      isGeoStartBrush ||
        isUsingRandomizer ||
        (e.target.className = tileselectval.toString());
  }
  "C-SEL" == e.target.tagName &&
    ((tileselectval = parseInt(e.target.className)),
    geostartbrushoff(),
    geoendbrushoff(),
    (document.getElementById("brushRandom").checked = !1)),
    checkcolorpicker(e),
    checkgeostartbrush(e);
}
function mobiledrawsv(e) {
  mobiledraw(e);
}
document.addEventListener(
  "touchstart",
  (e) => {
    touchHasMoved = !1;
  },
  !1
),
  document.addEventListener(
    "touchmove",
    (e) => {
      (touchHasMoved = !0), "C-TILE" == e.target.tagName && mobiledragdraw(e);
    },
    !1
  ),
  document.addEventListener(
    "touchend",
    (e) => {
      touchHasMoved || mobiledrawsv(e);
    },
    !1
  ),
  document.addEventListener("touchmove", function (e) {
    1 !== e.scale && e.preventDefault();
  });
var isGeoStartBrush = !1,
  isGeoEndBrush = !1;
function mobiledragdraw(e) {
  e.preventDefault(), preventNaNval();
  try {
    var t = document.elementsFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    )[0];
    if ("C-TILEPREV" == t.tagName)
      return (
        (tileselectval = parseInt(e.target.classList[0])),
        void Obstacle.hideCounter()
      );
    if (allowdraw && "C-TILE" == t.tagName && !iscolorpicking) {
      if (isGeoStartBrush) {
        switch (t.className) {
          case "0":
            t.className = "181";
            break;
          case "1":
            t.className = "182";
            break;
          case "2":
            t.className = "184";
            break;
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
            t.className = "183";
            break;
          case "586":
            t.className = "589";
        }
        return;
      }
      if (isGeoEndBrush) {
        switch (t.className) {
          case "0":
            t.className = "185";
            break;
          case "1":
            t.className = "186";
            break;
          case "2":
            t.className = "188";
            break;
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
            t.className = "187";
        }
        return;
      }
      isUsingRandomizer && updaterandomizermobile(t),
        isGeoStartBrush ||
          isUsingRandomizer ||
          (t.className = tileselectval.toString());
    }
    "C-SEL" == t.tagName &&
      ((tileselectval = parseInt(t.className)),
      geostartbrushoff(),
      geoendbrushoff(),
      (document.getElementById("brushRandom").checked = !1)),
      checkcolorpicker(e),
      checkgeostartbrush(e);
  } catch {}
}
function draw(e) {
  if (
    (preventNaNval(),
    1 == detectLeftButton(e) && "C-TILEPREV" == e.target.tagName)
  )
    return (
      (tileselectval = parseInt(e.target.classList[0])),
      void Obstacle.hideCounter()
    );
  if (allowdraw) {
    if (
      1 == detectLeftButton(e) &&
      "C-TILE" == e.target.tagName &&
      !iscolorpicking
    ) {
      if (isGeoStartBrush) {
        switch (e.target.className) {
          case "0":
            e.target.className = "181";
            break;
          case "1":
            e.target.className = "182";
            break;
          case "2":
            e.target.className = "184";
            break;
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
            e.target.className = "183";
            break;
          case "586":
            e.target.className = "589";
        }
        return;
      }
      if (isGeoEndBrush) {
        switch (e.target.className) {
          case "0":
            e.target.className = "185";
            break;
          case "1":
            e.target.className = "186";
            break;
          case "2":
            e.target.className = "188";
            break;
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
            e.target.className = "187";
        }
        return;
      }
      isUsingRandomizer && updaterandomizer(e),
        isGeoStartBrush ||
          isGeoEndBrush ||
          isUsingRandomizer ||
          (e.target.className = isUsingTempEraser
            ? "0"
            : tileselectval.toString());
    }
    1 == detectRightButton(e) &&
      "C-TILE" == e.target.tagName &&
      (e.preventDefault(), (e.target.className = "0"));
  }
  1 == detectLeftButton(e) &&
    ("C-SEL" == e.target.tagName &&
      "clp" != e.target.className &&
      "georepl" != e.target.className &&
      "georeplAlt" != e.target.className &&
      "idb" != e.target.className &&
      "rnd" != e.target.className &&
      ((tileselectval = parseInt(e.target.className)),
      geostartbrushoff(),
      geoendbrushoff(),
      (document.getElementById("brushRandom").checked = !1)),
    checkcolorpicker(e),
    checkgeostartbrush(e));
}
var iscolorpicking = !1,
  colorpickerbutton = document.getElementById("cpb");
function checkcolorpicker(e) {
  preventNaNval(),
    iscolorpicking &&
      "C-TILE" == e.target.tagName &&
      (isNaN(parseInt(e.target.className)) ||
        ((tileselectval = parseInt(e.target.className)), colorpickeroff())),
    "clp" == e.target.className && colorpickeron();
}
function preventNaNval() {
  isNaN(tileselectval) && (tileselectval = 0);
}
function colorpickeron() {
  (iscolorpicking = !0),
    geostartbrushoff(),
    geoendbrushoff(),
    colorpickerbutton.classList.add("selected");
}
function colorpickeroff() {
  (iscolorpicking = !1), colorpickerbutton.classList.remove("selected");
}
var geostartbrushbutton = document.getElementById("geobrush"),
  geoendbrushbutton = document.getElementById("geobrushAlt");
function checkgeostartbrush(e) {
  "georepl" == e.target.className && geostartbrushon(),
    "georeplAlt" == e.target.className && geoendbrushon();
}
function geostartbrushon() {
  (isGeoStartBrush = !0),
    colorpickeroff(),
    geostartbrushbutton.classList.add("selected"),
    geoendbrushoff();
}
function geostartbrushoff() {
  (isGeoStartBrush = !1), geostartbrushbutton.classList.remove("selected");
}
function geoendbrushon() {
  (isGeoEndBrush = !0),
    colorpickeroff(),
    geoendbrushbutton.classList.add("selected"),
    geostartbrushoff();
}
function geoendbrushoff() {
  (isGeoEndBrush = !1), geoendbrushbutton.classList.remove("selected");
}
var trgt,
  CMath = {
    percent: function (e, t) {
      return e / t;
    },
    intRandom: function (e, t) {
      return Math.floor(Math.random() * t) + e;
    },
  },
  randomizerChoices = [0],
  isUsingRandomizer = !1;
function updaterandomizer(e) {
  if (
    0 <
      (randomizerChoices = splitNewline(
        document.getElementById("askrandomin").value
      )).length &&
    "" != randomizerChoices[0]
  ) {
    for (var t = 0; t < randomizerChoices.length; t++)
      randomizerChoices[t] > maxtile && (randomizerChoices[t] = 0);
    var l = randomizerChoices[CMath.intRandom(0, randomizerChoices.length)];
    e.target.className = l;
  }
}
function updaterandomizermobile(e) {
  if (
    0 <
      (randomizerChoices = splitNewline(
        document.getElementById("askrandomin").value
      )).length &&
    "" != randomizerChoices[0]
  ) {
    for (var t = 0; t < randomizerChoices.length; t++)
      randomizerChoices[t] > maxtile && (randomizerChoices[t] = 0);
    var l = randomizerChoices[CMath.intRandom(0, randomizerChoices.length)];
    e.className = l;
  }
}
function tryScrollToTile() {
  var e = parseInt(prompt(Lang.resolve("webeditor.prompts.findtile"), "0"));
  if (null != e)
    try {
      console.log("Scrolling to tile " + e + "..."), scrollToTile(e);
    } catch {
      console.error("Could not scroll to tile " + e + ".");
    }
}
function scrollToTile(e) {
  var t;
  0 != e &&
    ((t = document.querySelectorAll(
      "#selmenu > c-sel.\\3" +
        e.toString().charAt(0) +
        " " +
        e.toString().substring(1)
    )[0]).scrollIntoView(),
    t.classList.remove("focused"),
    t.classList.add("focused"),
    delay(750).then(() => t.classList.remove("focused")));
}
document.getElementById("rnd").addEventListener("click", function () {
  document.getElementById("askrandom").style.display = "block";
});
const body = document.body;
let scrollPosition = 0;
var check = document.getElementById("check"),
  check2 = document.getElementById("check2");
function oncheck() {
  (check.checked ? enable : disable)();
}
function ontoggleedit() {
  check2.checked
    ? ((allowdraw = !0), canvas.classList.add("notouchaction"))
    : ((allowdraw = !1), canvas.classList.remove("notouchaction"));
}
function enable() {
  (allowscroll = !1),
    (scrollPosition = window.pageYOffset),
    (body.style.overflow = "hidden"),
    (body.style.position = "fixed"),
    (body.style.top = "-" + scrollPosition - 8 + "px"),
    (body.style.left = "-6pt"),
    (body.style.width = "100%");
}
function disable() {
  (allowscroll = !0),
    body.style.removeProperty("overflow"),
    body.style.removeProperty("position"),
    body.style.removeProperty("top"),
    body.style.removeProperty("left"),
    body.style.removeProperty("width"),
    scrollpos(scrollPosition);
}
var m_lastGenerateDataLength = 0;
function generate(e = !1) {
  var t = canvas.children,
    l = [],
    n = [],
    a = "",
    o = ",";
  for (let e = 0; e < t.length; e++) l.push(t[e].classList[0]);
  function r(e) {
    e = e.replace(/\D/g, "");
    return e.length < 1 && (e = "0"), e;
  }
  for (let e = 0; e < l.length; e += 5) {
    var s = r(l[e]),
      i = r(l[e + 1]),
      c = r(l[e + 2]),
      d = r(l[e + 3]),
      u = r(l[e + 4]);
    n.push(s + o + i + o + c + o + d + o + u + o + "\n");
  }
  a = (a = n.join("").toString().replace("NaN", "0")).substring(
    0,
    a.length - 2
  );
  var m =
    "[header]\nwidth=5\nheight=" +
    n.length.toString() +
    "\ntilewidth=64\ntileheight=64\norientation=orthogonal\n\n[tilesets]\ntileset=../tileset/tileset01.png,64,64,0,0\n\n[layer]\ntype=Level\ndata=\n" +
    a +
    "\n\n";
  return (m_lastGenerateDataLength = n.length), e ? (e ? a : void 0) : m;
}
window.addEventListener("beforeunload", function (e) {
  e.preventDefault(),
    setlevelcollection("lastleveldata", generate(!0)),
    (e.returnValue = "");
});
var tbi,
  uploadfile = document.getElementById("upload"),
  uploadtxt = "",
  uploadtxtarr = [],
  htmtxt = [],
  leveldetectlength = 0;
function changefile() {
  var e = new FileReader();
  (e.onload = function () {
    (uploadtxt = e.result).startsWith("rh733FEzge") &&
      (uploadtxt = LevelEncryptor.decrypt(uploadtxt)),
      (uploadtxtarr = splitNewline(uploadtxt));
  }),
    e.readAsText(uploadfile.files[0]);
}




function upload() {
  var t = [];
  for (let e = uploadtxtarr.indexOf("data=") + 1; e < uploadtxtarr.length; e++)
    t.push(
      (horiz = uploadtxtarr[e]
        .replace("\r", "")
        .replace("\n", "")
        .split(",")
        .filter((e) => e))
    );
  uploadtxt.startsWith("[header]")
    ? load(t.filter((e) => e).join(",\n"))
    : uploadtxt.startsWith("<?")
    ? loadTiled(uploadtxt)
    : alert(Lang.resolve(""));
}








function load(e, t = !1) {
  if (t || askToLoadOverwrite())
    try {
      (htmtxt = []), (canvas.innerHTML = ""), (leveldetectlength = 0);
      var l = splitNewline(e);
      for (let e = 0; e < l.length; e++) {
        var n,
          a = l[e].replace("\r", "").replace("\n", "").split(",");
        function o(e) {
          return e.replace("<", "").replace(">", "");
        }
        5 <= (a = a.filter((e) => e)).length &&
          ((n = '<c-tile class="{#}"></c-tile>'),
          htmtxt.push(
            n.replace("{#}", o(a[0])) +
              n.replace("{#}", o(a[1])) +
              n.replace("{#}", o(a[2])) +
              n.replace("{#}", o(a[3])) +
              n.replace("{#}", o(a[4]))
          ),
          leveldetectlength++);
      }
      loadnumber(leveldetectlength + 1),
        (canvas.innerHTML = htmtxt.join("")),
        scrollpos(document.body.scrollHeight),
        (document.getElementById("startmenu").style.display = "none"),
        (document.getElementById("level").style.visibility = "visible");
    } catch {
      console.error("Load Level Failed."),
        window.alert(Lang.resolve("webeditor.alerts.loadinvalidlevel"));
    }
}
function exportlevel() {
  try {
    console.log('Exporting level with name "' + levelnamein.value + "..."),
      setlevelcollection("lastleveldata", exportmenu_leveldefault_noheader),
      download(levelnamein.value + ".txt", exportmenu_leveldefault);
  } catch {
    console.error('Exporting level "' + levelnamein.value + '" failed.');
  }
}
function exportlevelencrypted() {
  try {
    console.log(
      'Exporting encrypted level with name "' + levelnamein.value + "..."
    ),
      setlevelcollection("lastleveldata", exportmenu_leveldefault),
      download(levelnamein.value + "-Encrypted.txt", exportmenu_levelenc);
  } catch {
    console.error(
      'Exporting encrypted level "' + levelnamein.value + '" failed.'
    );
  }
}
function loadTiled(e) {
  console.log("Loading Tiled TMX level...");
  try {
    var t = e;
    (xmlDoc = new DOMParser().parseFromString(t, "text/xml")),
      load(
        xmlDoc.children[0].children[1].children[0].innerHTML.replace(
          /\r\n|\n\r|\n|\r/,
          ""
        )
      );
  } catch {
    console.error("Invalid Tiled TMX!");
  }
}
function saveTiled() {
  console.log("Exporting Tiled TMX...");
  try {
    var e = generate(!0),
      e =
        '<?xml version="1.0" encoding="UTF-8"?>\n<map version="0" tiledversion="0" orientation="orthogonal" renderorder="right-down" width="5" height="' +
        m_lastGenerateDataLength +
        '" tilewidth="64" tileheight="64" infinite="0" nextlayerid="2" nextobjectid="1">\n <tileset firstgid="1" source="RollingSky.tsx"/>\n <layer id="1" name="' +
        levelnamein.value +
        '" width="5" height="' +
        m_lastGenerateDataLength +
        '">\n  <data encoding="csv">\n' +
        e +
        "\n</data>\n </layer>\n</map>\n";
    download(levelnamein.value + ".tmx", e);
  } catch {
    console.error("Export Tiled TMX Failed!");
  }
}
LevelEncryptor.setup();
var loadedlength = 0;
function loadnumber(e) {
  console.log("Setting Internal Level Length: " + e + "."),
    document.querySelector(":root").style.setProperty("--rows-number-start", e),
    (loadedlength = e);
}
var startmenuhtm = document.getElementById("startmenu").innerHTML,
  prevlevel = "";
function back() {
  confirm(Lang.resolve("webeditor.prompts.backtohome")) &&
    ((prevlevel = canvas.innerHTML),
    setlevelcollection("lastleveldata", generate(!0)),
    (canvas.innerHTML = ""),
    scrollpos(0),
    (document.getElementById("startmenu").style.display = "block"),
    (document.getElementById("level").style.visibility = "hidden"));
}
function loadprevlevel() {
  loadlevelcollection("lastleveldata", !1, !1, !0)
    ? (scrollpos(document.body.scrollHeight),
      (document.getElementById("startmenu").style.display = "none"),
      (document.getElementById("level").style.visibility = "visible"))
    : alert(Lang.resolve("webeditor.alerts.previouslevelnone"));
}
function setlevelcollection(e, t) {
  console.log("Saving Level: " + e), localStorage.setItem(e, t);
}
function isLocalStorageAvailable() {
  var e = "testitem";
  try {
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch (e) {
    return !1;
  }
}
function loadlevelcollection(e, t = !1, l = !1, n = !1) {
  if ((console.log("Loading Level: " + e), isLocalStorageAvailable())) {
    try {
      var a = localStorage.getItem(e).replaceAll("'", "");
      if (
        l
          ? 0 <
            a
              .replaceAll(",", "")
              .replaceAll("0", "")
              .replaceAll("\r", "")
              .replaceAll("\n", "").length
          : 5 < a.length
      )
        return t || load(a, n), !0;
    } catch {
      return !1;
    }
    return !1;
  }
  return !1;
}
isLocalStorageAvailable() ||
  (document.getElementById("sessionlevelload").innerHTML = Lang.resolve(
    "webeditor.alerts.localstorageunusable"
  ));
var themecss = document.getElementById("theme");
function setcookie(e = 0, t = "") {
  var l = ["", "", "", "", ""];
  (l[e] = t), (document.cookie = "mode=" + l[0]);
}
function getcookie(e) {
  for (
    var t = e + "=", l = document.cookie.split(";"), n = 0;
    n < l.length;
    n++
  ) {
    for (var a = l[n]; " " == a.charAt(0); ) a = a.substring(1, a.length);
    if (0 == a.indexOf(t)) return a.substring(t.length, a.length);
  }
  return null;
}
var exportmenu = document.getElementById("exportmenu"),
  selmenu = document.getElementById("selmenu"),
  checkcontainer = document.getElementsByClassName("checkcontainer")[0],
  levelnamein = document.getElementById("levelname");
let exportscrollpos = 0;
function openexport() {
  (exportscrollpos = window.pageYOffset),
    (canvas.style.display = "none"),
    (exportmenu.style.display = "block"),
    (selmenu.style.display = "none"),
    (checkcontainer.style.display = "none"),
    scrollpos(0),
    (exportmenu_leveldefault = generate()),
    (exportmenu_leveldefault_noheader = generate(!0)),
    (exportmenu_levelenc = LevelEncryptor.encrypt(generate())),
    (document.getElementById("backuptxtdownload").value =
      exportmenu_leveldefault),
    (document.getElementById("backupencryptdownload").value =
      exportmenu_levelenc);
}
function closeexport() {
  (canvas.style.display = "flex"),
    (exportmenu.style.display = "none"),
    (selmenu.style.display = "flex"),
    (checkcontainer.style.display = "block"),
    scrollpos(exportscrollpos);
}
function download(e, t) {
  console.log("Downloading File: " + e);
  try {
    var l = document.createElement("a");
    l.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(t)
    ),
      l.setAttribute("download", e),
      (l.style.display = "none"),
      document.body.appendChild(l),
      l.click(),
      document.body.removeChild(l);
  } catch {
    console.error("Download Failed! (" + e + ")");
  }
}
(exportmenu_leveldefault = ""), (exportmenu_leveldefault_noheader = "");
const levels = [(exportmenu_levelenc = "")].concat(levelsdata.names),
  levelsLower = levels.map((e) => e.toLowerCase());
function getlevel(e, t = !1) {
  !(function (e) {
    if (null != e)
      !(async function (e) {
        let t = await fetch(e),
          l = await t.text();
        load(l.split("data=\n")[1]);
      })("levels/" + e);
    else
      t && alert(Lang.resolve("webeditor.alerts.invalidname")),
        console.warn("Invalid level name. Please check your spelling.");
  })(levelsdata.namestofiles[e.toLowerCase()]);
}
var ln,
  spl,
  author,
  levelname,
  loadexistinginput = document.getElementById("loadexisting");
function getexistlevel() {
  getlevel(loadexistinginput.value);
}
function autocomplete(o, r) {
  var s;
  function l(e) {
    e &&
      ((function (e) {
        for (var t = 0; t < e.length; t++)
          e[t].classList.remove("autocomplete-active");
      })(e),
      s >= e.length && (s = 0),
      s < 0 && (s = e.length - 1),
      e[s].classList.add("autocomplete-active"));
  }
  function i(e) {
    for (
      var t = document.getElementsByClassName("autocomplete-items"), l = 0;
      l < t.length;
      l++
    )
      e != t[l] && e != o && t[l].parentNode.removeChild(t[l]);
  }
  o.addEventListener("input", function (e) {
    var t,
      l,
      n,
      a = this.value;
    if ((i(), !a)) return !1;
    for (
      s = -1,
        (t = document.createElement("DIV")).setAttribute(
          "id",
          this.id + "autocomplete-list"
        ),
        t.setAttribute("class", "autocomplete-items"),
        this.parentNode.appendChild(t),
        n = 0;
      n < r.length;
      n++
    )
      r[n].toLowerCase().includes(a.toLowerCase()) &&
        (((l = document.createElement("DIV")).innerHTML = r[n]),
        (l.innerHTML += "<input type='hidden' value='" + r[n] + "'>"),
        l.addEventListener("click", function (e) {
          (o.value = this.getElementsByTagName("input")[0].value), i();
        }),
        t.appendChild(l));
  }),
    o.addEventListener("keydown", function (e) {
      var t =
        (t = document.getElementById(this.id + "autocomplete-list")) &&
        t.getElementsByTagName("div");
      40 == e.keyCode
        ? (s++, l(t))
        : 38 == e.keyCode
        ? (s--, l(t))
        : 13 == e.keyCode && (e.preventDefault(), -1 < s && t && t[s].click());
    }),
    document.addEventListener("click", function (e) {
      i(e.target);
    });
}
function checkInput(e) {
  var t = /[^0-9\n\r]/gi;
  t.test(e.value) && (e.value = e.value.replace(t, ""));
}
params.get("load") &&
  ("rollingsky" == (spl = (ln = params.get("load")).split("."))[0]
    ? getlevel(spl[1].replaceAll("_", " "))
    : "fanmade" == spl[0]
    ? ((author = spl[1]), (levelname = spl[2]))
    : alert(Lang.resolve("webeditor.alerts.invalidname"))),
  autocomplete(loadexistinginput, levels);
var tprev = document.getElementById("tprev"),
  brushrandom = document.getElementById("brushRandom"),
  inputrandomin = document.getElementById("askrandomin"),
  isShownTranslationWarning = !(tprev.onclick = function () {
    getTileToBrush();
  }),
  isShownStencilsWarning = !1;
function isNumberBetween(e, t, l) {
  return t <= e && e <= l;
}
setInterval(function () {
  var e;
  checkInput(inputrandomin),
    (isUsingRandomizer = brushrandom.checked),
    isShownTranslationWarning ||
      ((document.documentElement.classList.contains("translated-ltr") ||
        document.documentElement.classList.contains("translated-rtl")) &&
        ((isShownTranslationWarning = !0),
        alert(Lang.resolve("webeditor.alerts.translationwarning")))),
    isShownStencilsWarning ||
      ((isNumberBetween((e = tileselectval), 250, 253) ||
        isNumberBetween(e, 461, 468) ||
        isNumberBetween(e, 828, 835) ||
        isNumberBetween(e, 791, 795)) &&
        (showStencilWarning(), (isShownStencilsWarning = !0))),
    (tprev.style.opacity = allowdraw ? "1" : "0.5"),
    (tprev.className = iscolorpicking
      ? "colorpicker"
      : isGeoStartBrush
      ? "startGeo"
      : isGeoEndBrush
      ? "endGeo"
      : 0 == tileselectval
      ? "erase"
      : tileselectval);
}),
  PopupManager.setupPopup();
var isAlwaysHideStencilWarning =
  "1" == localStorage.getItem("isAlwaysHideStencilWarning");
function showStencilWarning() {
  isAlwaysHideStencilWarning ||
    PopupManager.showMessage(
      '<img src="stencils/stencil-tutorial.gif">',
      Lang.resolve("webeditor.stencilWarn.title"),
      [
        Lang.resolve("webeditor.stencilWarn.hide") + ">hideStencilWarning()",
        Lang.resolve("webeditor.stencilWarn.hideForever") +
          ">foreverHideStencilWarning()~red",
      ],
      !1
    );
}
function hideStencilWarning() {
  PopupManager.hideMessage();
}
function foreverHideStencilWarning() {
  PopupManager.hideMessage(),
    localStorage.setItem("isAlwaysHideStencilWarning", "1");
}
function togglePortalOpacity() {
  document.body.classList.toggle("portalHalfOpacity");
}
function getTileToBrush() {
  var e = prompt(Lang.resolve("webeditor.prompts.tiletobrush"), "0"),
    e = parseInt(e);
  console.log(e),
    null == e ||
      null == e ||
      isNaN(e) ||
      (e && e <= maxtile && 0 <= e
        ? (tileselectval = e)
        : alert(Lang.resolve("webeditor.prompts.tiletobrusherror")));
}
const editor = {
  help: function () {
    console.log(
      "Commands:\n\n" +
        [
          "editor.setCustomTiles(tilesIntArray)",
          "editor.setCurrentTileDialog()",
          "editor.blacklistTiles(tilearray)",
          "editor.loadExistingLevel(levelname)",
        ].join("\n")
    );
  },
  setCustomTiles: function (e) {
    try {
      for (var t = [], l = [], n = 0; n < e.length; n++) {
        t.push("<c-sel class=" + e[n].split(":")[0] + "></c-sel>");
        var a =
          ".\\3" +
          e[n].split(":")[0].substring(0, 1) +
          " " +
          e[n].split(":")[0].substring(1, e[n].split(":")[0].length) +
          " {background: url('" +
          e[n].split(":")[1] +
          "'); opacity: 1;}";
        l.push(a.toString());
      }
      var o = document.getElementById("customPallet");
      (o.innerHTML = t.join("\n")),
        o.innerHTML.length < 2
          ? (o.style.display = "none")
          : (o.style.display = "flex");
    } catch {
      console.log(
        "Usage:\n\neditor.setCustomTiles(<string[] ID:base64_tile_PNG>);\n\nExample:\n\nvar customTile = ['1115:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABiSURBVChTY/wTEfGfAQe49vgxA1jBhyNnoEKoYA/zbwYWKBsMhJMToCwGhrdzF4BpJjAJBJy62gzfTp2G8hCK4Qq4zEzBGB3AFcCMhAEMK2AAXSHjJWvr/9eePIFy0QEDAwATSh9LKkGaRgAAAABJRU5ErkJggg=='];\neditor.setCustomTiles(customTile);"
      );
    }
  },
  setCurrentTileDialog: function () {
    getTileToBrush();
  },
  blacklistTiles: function (e) {
    try {
      blacklist = document.getElementById("blacklist");
      for (var t = [], l = 0; l < e.length; l++) {
        var n =
          ".\\3" +
          e[l].toString().substring(0, 1) +
          " " +
          e[l].toString().substring(1, e[l].toString().length) +
          "{opacity: 0.2;}";
        t.push(n.toString());
      }
      blacklist.innerHTML = t.join("\n");
    } catch {
      console.log(
        "Usage:\n\neditor.blacklistTiles(<int[] BlacklistedTiles>);\n\nExample:\n\nvar toBlacklist = [31,482,583,721,802];\neditor.blacklistTiles(toBlacklist);"
      );
    }
  },
  loadExistingLevel: function (e) {
    try {
      getlevel(e);
    } catch {
      console.log(
        "Usage:\n\neditor.loadExistingLevel(<string LevelName>);\n\nExample:\n\neditor.loadExistingLevel('mAsSiF');\n\n// *Capitalization doesn't matter"
      );
    }
  },
  selcont: function (e) {
    e = e.nextElementSibling;
    console.log(e),
      "hide" === e.className ? (e.className = "show") : (e.className = "hide");
  },
  DisplayOptionsMenu: {
    MainMenu: document.getElementById("displayOptions"),
    Offset: 2,
    showDisplayOptions: function () {
      editor.DisplayOptionsMenu.MainMenu.style.display = "block";
    },
    updateDisplayOptions: function () {
      var e = editor.DisplayOptionsMenu.MainMenu.children[0],
        t = document.getElementById("doc");
      function l(e) {
        t.classList.add("displayOptions" + e);
      }
      function n(e) {
        t.classList.remove("displayOptions" + e);
      }
      (e.children[editor.DisplayOptionsMenu.Offset + 0].children[0].checked
        ? l
        : n)("0"),
        (e.children[editor.DisplayOptionsMenu.Offset + 1].children[0].checked
          ? l
          : n)("1"),
        (e.children[editor.DisplayOptionsMenu.Offset + 2].children[0].checked
          ? l
          : n)("2"),
        (e.children[editor.DisplayOptionsMenu.Offset + 3].children[0].checked
          ? l
          : n)("3"),
        (e.children[editor.DisplayOptionsMenu.Offset + 4].children[0].checked
          ? l
          : n)("4"),
        (e.children[editor.DisplayOptionsMenu.Offset + 5].children[0].checked
          ? l
          : n)("5"),
        (e.children[editor.DisplayOptionsMenu.Offset + 6].children[0].checked
          ? l
          : n)("6"),
        (editor.DisplayOptionsMenu.MainMenu.style.display = "none");
    },
  },
  Zoom: {
    toggleZoom: function () {
      canvas.classList.toggle("isSmall"), canvasAlt.classList.toggle("isSmall");
    },
  },
  TilePallet: {
    Elements: { content: document.getElementById("selmenuContent") },
    Data: {
      excludedTiles: [
        48, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 221, 222, 223,
        224, 225, 226, 227, 228, 229, 230, 231, 232, 334, 538, 707, 749, 761,
        767, 901, 1090,
      ],
      tileGroups: [
        {
          name: "Ground Items",
          tiles: [
            1, 2, 3, 4, 5, 6, 7, 8, 117, 269, 281, 315, 397, 461, 462, 463, 464,
            465, 466, 467, 468, 474, 510, 511, 512, 513, 586, 620, 621, 624,
            625, 738, 739, 740, 741, 742, 743,
          ],
        },
        { name: "Fragiles (Glass)", tiles: [3, 4, 5, 6, 7, 8, 434, 620, 624] },
        {
          name: "Powerups",
          tiles: [
            246, 247, 255, 301, 307, 308, 315, 328, 333, 352, 364, 368, 369,
            384, 386, 387, 397, 425, 469, 470, 514, 585, 604, 605, 627, 628,
            671, 704, 705, 824, 883, 884, 942, 995, 996, 997, 998, 1072,
          ],
        },
        {
          name: "Special Effects",
          tiles: [
            197, 259, 349, 413, 414, 521, 783, 836, 837, 858, 859, 860, 861,
            862, 941, 999, 1041,
          ],
        },
        {
          name: "Mover Separators",
          tiles: [13, 14, 15, 16, 17, 18, 19, 20, 37, 38, 39, 40, 59, 60],
        },
        {
          name: "Path Markers",
          tiles: [
            201, 202, 203, 204, 205, 206, 221, 222, 223, 224, 225, 226, 227,
            228, 229, 230, 231, 232,
          ],
        },
      ],
      favorites: [{ name: "", tiles: [] }],
    },
    Functions: {
      GroupedSegment: function (e = []) {
        for (var t = e, l = [], n = 0; n < t.length; n++) {
          for (var a = [], o = t[n].tiles, r = 0; r < o.length; r++)
            "NaN" != parseInt(o[r]).toString() &&
              a.push('<c-sel class="' + o[r] + '"></c-sel>');
          l.push(
            '<div class="tileGroup"><div class="tileGroupTitle">' +
              t[n].name +
              '</div><div class="tilesContainer">' +
              a.join("") +
              "</div></div>"
          );
        }
        editor.TilePallet.Elements.content.innerHTML = l.join("");
      },
      ReloadFavorites: function () {
        (editor.TilePallet.Data.favorites[0].name =
          '<span data-lang="webeditor.tilepallet.favorites.title">' +
          Lang.resolve("webeditor.tilepallet.favorites.title") +
          '</span><button onclick="editor.TilePallet.Favorites.add()" style="margin-left: 10pt;position: relative;" data-lang="webeditor.tilepallet.favorites.edit">' +
          Lang.resolve("webeditor.tilepallet.favorites.edit") +
          "</button>"),
          editor.TilePallet.Functions.GroupedSegment(
            editor.TilePallet.Data.favorites
          );
      },
    },
    set: function (e) {
      switch (e) {
        case 0:
          for (var t = [], l = 1; l < RollingSky.maxtile; l++)
            this.Data.excludedTiles.includes(l) ||
              t.push('<c-sel class="' + l + '"></c-sel>');
          this.Elements.content.innerHTML = t.join("");
          break;
        case 1:
          this.Functions.GroupedSegment(this.Data.tileGroups);
          break;
        case 2:
          this.Functions.ReloadFavorites();
      }
    },
    Favorites: {
      get: function () {
        try {
          var e = localStorage.getItem("webeditorTilePalletFavorites");
          return "[object Array]" === Object.prototype.toString.call(e)
            ? e
            : JSON.parse(e);
        } catch {
          return [];
        }
      },
      set: function (e) {
        try {
          return (
            localStorage.setItem(
              "webeditorTilePalletFavorites",
              JSON.stringify(e)
            ),
            !0
          );
        } catch {
          return !1;
        }
      },
      add: function () {
        PopupManager.showMessage(
          '<textarea id="editorFavoritesInput"></textarea>',
          Lang.resolve("webeditor.tilepallet.favorites.set.title"),
          [
            Lang.resolve("webeditor.tilepallet.favorites.set.enter") +
              ">editor.TilePallet.Favorites.setFromInput(document.getElementById('editorFavoritesInput').value)",
          ],
          !1
        ),
          (document.getElementById("editorFavoritesInput").value =
            editor.TilePallet.Data.favorites[0].tiles.join(",\n"));
      },
      remove: function () {},
      setFromInput: function (e) {
        for (
          var t = e.replaceAll("\r", "").replaceAll("\n", "").split(","),
            l = [],
            n = 0;
          n < t.length;
          n++
        ) {
          var a = parseInt(t[n]);
          "NaN" != a.toString() && l.push(a);
        }
        (editor.TilePallet.Data.favorites[0].tiles = l),
          PopupManager.hideMessage(),
          editor.TilePallet.Functions.GroupedSegment(
            editor.TilePallet.Data.favorites
          ),
          editor.TilePallet.Favorites.set(editor.TilePallet.Data.favorites);
      },
    },
  },
};
function onChangeLangFunc() {
  editor.TilePallet.Functions.ReloadFavorites();
}
(Lang.events.onchange = function () {
  onChangeLangFunc();
}),
  editor.TilePallet.set(0);
var palletGet = editor.TilePallet.Favorites.get();
//editor.TilePallet.Data.favorites[0].tiles =
//  palletGet == [] || null == palletGet || null == palletGet
//    ? (
//        Lang.resolve("webeditor.tilepallet.favorites.tutorial") +
//        "1,27,28,2,6,7,8,3,4,5,21,25,26,9,10,41,42,81,82,83,86,87,88,261,263,264,262,265,266,161,163,164,165,167,168,101,102,103,104,105,106,107,108,201,202,203,204,205,206"
//      ).split(",")
//    : palletGet[0].tiles;
var GeoBuffer = {
  create: function (e) {
    for (var t = splitNewline(e), l = t, n = 0; n < t.length; n++)
      for (var a = t[n].split(","), o = 0; o < a.length; o++) {
        var r = parseInt(a[o]);
        if (
          181 == r ||
          182 == r ||
          183 == r ||
          184 == r ||
          185 == r ||
          186 == r ||
          187 == r ||
          188 == r
        ) {
          console.log(n + ": " + t[n]), (l[n] = "geoline");
          break;
        }
      }
    for (var s = l.join("").split("geoline"), n = 0; n < s.length; n++) {
      var i = s[n].split(",").join("").split(""),
        c = removeDuplicates(i);
      console.log(i);
      for (o = 0; o < c.length; o++)
        for (
          var d = obstacledat.obstacles[parseInt(c[o])], u = 0;
          u < d.geobuffers.all.length;
          u++
        )
          console.log(d.geobuffers.all[u] + "," + d.geotype + ",");
    }
  },
};
const Obstacle = {
  showCounter: function () {
    exportscrollpos = window.pageYOffset;
    for (
      var e = generate(!0)
          .replaceAll("\n", "")
          .replaceAll("\r", "")
          .replaceAll("\\n", "")
          .replaceAll("\\r", "")
          .split(",")
          .reduce(function (e, t) {
            return e[t] ? ++e[t] : (e[t] = 1), e;
          }, {}),
        t = [],
        l = 0;
      l < maxtile;
      l++
    )
      e[l] &&
        t.push(
          '<c-tilecont><c-tileprev class="' +
            l +
            '"></c-tileprev>Name: ' +
            obstacledat.obstacles[l].name +
            "<br>GeoBuffers: " +
            obstacledat.obstacles[l].geobuffers.all.join(", ") +
            "<br>Count: " +
            e[l] +
            "</c-tilecont>"
        );
    scrollpos(0),
      (document.getElementById("obstaclecount").innerHTML =
        '<button onclick="Obstacle.hideCounter();" class="exitobjcount">Exit</button><h1 style="margin-top: 5pt;">' +
        Lang.resolve("webeditor.main.objectcount.title") +
        "</h1><p>" +
        Lang.resolve("webeditor.main.objectcount.tutorial") +
        "</p>" +
        t.join("") +
        "<br>"),
      (document.getElementById("level").style.display = "none"),
      (document.getElementById("obstaclecount").style.display = "block");
  },
  hideCounter: function () {
    (document.getElementById("level").style.display = "block"),
      (document.getElementById("obstaclecount").style.display = "none"),
      scrollpos(exportscrollpos);
  },
  generateGeobuffers: function (e = "z") {
    for (
      var t = generate(!0)
          .replaceAll("\n", "")
          .replaceAll("\r", "")
          .replaceAll("\\n", "")
          .replaceAll("\\r", "")
          .split(",")
          .reduce(function (e, t) {
            return e[t] ? ++e[t] : (e[t] = 1), e;
          }, {}),
        l = [],
        n = 0;
      n < maxtile + 1;
      n++
    )
      if (t[n]) {
        var a = obstacledat.obstacles[n].geobuffers.all;
        if (obstacledat.obstacles[n].include)
          for (var o = 0; o < a.length; o++)
            l.push(a[o] + "," + obstacledat.obstacles[n].geotype + "," + e);
      }
    return l.filter(function (e, t, l) {
      return l.indexOf(e) == t;
    });
  },
  copyGeobuffers: function () {
    var e = document.getElementById("gbZv").value;
    copyTextToClipboard(Obstacle.generateGeobuffers(e).join("\n")),
      alert(Lang.resolve("webeditor.alerts.geobuffercopydone", e));
  },
};
function fallbackCopyTextToClipboard(e) {
  var t = document.createElement("textarea");
  (t.value = e),
    (t.style.top = "0"),
    (t.style.left = "0"),
    (t.style.position = "fixed"),
    (t.style.opacity = "0"),
    (t.style.display = "none"),
    document.body.appendChild(t),
    t.focus(),
    t.select();
  try {
    document.execCommand("copy");
  } catch {
    console.error('Unable to copy text: "' + e + '"');
  }
  document.body.removeChild(t);
}
function copyTextToClipboard(e) {
  navigator.clipboard
    ? navigator.clipboard.writeText(e).then(
        function () {},
        function (e) {}
      )
    : fallbackCopyTextToClipboard(e);
}
const Level = {
  getEndRow: function () {
    for (var e = canvas.children, t = e.length / 5, l = 0; l < t - 1; l++)
      for (var n = 0; n < 5; n++)
        if ("0" != e[5 * l + n].className) return t - l;
  },
  getScrollPercent: function () {},
  getSpeedAtRow: function (e, t, l, n = null) {
    return lerp(e, t, percentage(l / 100, null == n ? loadedlength : n));
  },
  
  
  
  switchDisplaySide: function () {
    650 < window.innerWidth
      ? localStorage.setItem(
          "editorSide",
          canvas.parentElement.classList.toggle("side")
        )
      : (canvas.parentElement.classList.remove("side"),
        alert(Lang.resolve("webeditor.alerts.widescreenlevelwarn")));
  },

  
  
};
function removeDuplicates(l) {
  return l.filter((e, t) => l.indexOf(e) === t);
}
function percentage(e, t) {
  return (100 * e) / t;
}
function tween(e, t, l) {
  return e + (l / 99) * (t - e);
}
function lerp(e, t, l) {
  return (1 - l) * e + l * t;
}
function savelevelastemp() {
  alert(Lang.resolve("webeditor.alerts.saveinsession")),
    setlevelcollection("lastleveldata", generate(!0));
}
function splitNewline(e) {
  return e.split(/\r\n|\n\r|\n|\r/);
}
if (
  ("true" == localStorage.getItem("editorSide") &&
    canvas.parentElement.classList.add("side"),
  !window.matchMedia("(any-pointer: coarse)").matches)
) {
  document.body.classList.add("desktop");
  const Cd = (e) => {
    (tprev.style.left = e.pageX + "px"),
      (tprev.style.top = e.pageY - document.documentElement.scrollTop + "px");
  };
  document.addEventListener("mousemove", Cd),
    (tprev.style.position = "fixed"),
    document.body.appendChild(tprev);
}
document.addEventListener("keydown", (e) => {
  "block" != document.getElementById("startmenu").style.display &&
    (e.ctrlKey && "s" === e.key && (e.preventDefault(), openexport()),
    e.ctrlKey && "o" === e.key && (e.preventDefault(), Obstacle.showCounter()),
    e.ctrlKey && "b" === e.key && (e.preventDefault(), togglePortalOpacity()),
    e.ctrlKey && "f" === e.key && (e.preventDefault(), tryScrollToTile()),
    e.ctrlKey && "g" === e.key && (e.preventDefault(), getTileToBrush()),
    "Escape" == e.key &&
      ("block" == exportmenu.style.display && closeexport(),
      "block" == displayOptions.style.display
        ? editor.DisplayOptionsMenu.updateDisplayOptions()
        : "block" == document.getElementById("obstaclecount").style.display
        ? Obstacle.hideCounter()
        : "none" == document.getElementById("startmenu").style.display &&
          back()));
}),
  (window.onmousedown = (e) => {
    (1 != e.button && 4 != e.buttons) ||
      ("C-TILE" == e.target.tagName &&
        (e.preventDefault(), (tileselectval = e.target.className)));
  }),
  (window.onmouseup = (e) => {
    "C-TILE" == e.target.tagName && e.preventDefault();
  }),
  (window.oncontextmenu = (e) => {
    if ("C-TILE" == e.target.tagName) return !1;
  });
