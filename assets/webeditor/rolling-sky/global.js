const sqdldev = {
    runjs: function (e, o = !1, n = !0, t = !1) {
      try {
        var p = document.createElement("div"),
          r = document.createElement("script");
        return (
          o ? (r.innerHTML = e) : (r.src = e),
          t && (r.async = !0),
          p.appendChild(r),
          document.head.appendChild(p),
          n && p.remove(),
          r
        );
      } catch {}
    },
    dynamicallyLoadScript: function (e) {
      var o = document.createElement("script");
      (o.src = e), document.head.appendChild(o);
    },
    addElementToDocument: function (
      e = !1,
      o,
      n = "",
      t = "",
      p = "",
      r = "",
      a = "",
      i = "",
      c = "",
      u = "",
      l = ""
    ) {
      o = document.createElement(o);
      return (
        0 < n.length && (o.className = n),
        0 < t.length && (o.id = t),
        0 < p.length && (o.innerHTML = p),
        0 < r.length && (o.href = r),
        0 < a.length && (o.src = a),
        0 < i.length && (o.target = i),
        0 < c.length && (o.rel = c),
        0 < u.length && (o.name = u),
        0 < l.length && (o.content = l),
        (e ? document.body : document.head).appendChild(o),
        o
      );
    },
  },
  ConsoleLogger = {
    Activate: function (p, r, a) {
      var i;
      function e(e, o) {
        var n = "<c-console-" + e + ">",
          t = "</c-console-" + e + ">";
        null == document.getElementById("consoletext")
          ? (((e = document.createElement("div")).innerHTML +=
              "<style>" +
              r +
              "c-console-row,c-console-error,c-console-warn,c-console-debug{position: relative;width: 100%;padding: 10pt;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;border-bottom: solid;border-bottom-color: var(--input-brd-col);}c-console-row:hover{/*background: #0000001c;*/}c-console-error{background: #a500003b;color: #ff6e6e;}c-console-error:hover{/*background: #e10a0a61;*/}c-console-warn{background: #a564003b;color: #ffc66e;}c-console-warn:hover{/*background: #a5640073;*/}</style>"),
            (e.innerHTML += p),
            document.getElementById(a).appendChild(e),
            ((i = document.getElementById("consoletext")).innerHTML +=
              n + o + t))
          : (i.innerHTML += n + o + t),
          (i.scrollTop = i.scrollHeight);
      }
      (console.clear = function () {
        !(function () {
          try {
            document.getElementById("consoletext").innerHTML =
              "<c-console-row>Console was Cleared.</c-console-row>";
          } catch {}
        })();
      }),
        (console.defaultLog = console.log.bind(console)),
        (console.log = function () {
          console.defaultLog.apply(console, arguments),
            e("row", Array.from(arguments).join(","));
        }),
        (console.defaultError = console.error.bind(console)),
        (console.error = function () {
          console.defaultError.apply(console, arguments),
            e("error", Array.from(arguments).join(","));
        }),
        (console.defaultWarn = console.warn.bind(console)),
        (console.warn = function () {
          console.defaultWarn.apply(console, arguments),
            e("warn", Array.from(arguments).join(","));
        }),
        (console.defaultDebug = console.debug.bind(console)),
        (console.debug = function () {
          console.defaultDebug.apply(console, arguments),
            e("debug", Array.from(arguments).join(","));
        });
    },
  };
try {
  sqdldev.runjs(
    "https://www.googletagmanager.com/gtag/js?id=G-E48XX6KB6H",
    !1,
    !1,
    !0
  );
} catch {}
function gtag() {
  dataLayer.push(arguments);
}
(window.dataLayer = window.dataLayer || []),
  gtag("js", new Date()),
  gtag("config", "G-E48XX6KB6H");
const date = new Date();
let month = date.getMonth();
var isUseFestiveDecoration = !0,
  totalClicked = 0;
month;
var ua = navigator.userAgent;
(ua.includes(" GSA/") || ua.includes(" OPR/")) &&
  alert(
    "Unsupported browser. Please use Google Chrome or Safari. Some features may not function properly.\n\nPlease do not report bugs that are caused by unsupported browsers."
  );
const Downloader = {
    text: function (e, o) {
      var n = document.createElement("a");
      n.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(o)
      ),
        n.setAttribute("download", e),
        (n.style.display = "none"),
        document.body.appendChild(n),
        n.click(),
        document.body.removeChild(n);
    },
    blob: function (e, n) {
      fetch(e, {
        method: "get",
        mode: "no-cors",
        referrerPolicy: "no-referrer",
      })
        .then((e) => e.blob())
        .then((e) => {
          const o = document.createElement("a");
          o.setAttribute("download", n);
          e = URL.createObjectURL(e);
          (o.href = e),
            o.setAttribute("target", "_blank"),
            o.click(),
            URL.revokeObjectURL(e);
        });
    },
  },
  PopupManager = {
    isSetup: !1,
    Elements: {},
    Defaults: { options: ["Ok>PopupManager.hideMessage()~default"] },
    Popup: { onshow: function () {}, onhide: function () {} },
    setupPopup: function (
      e = ":root{--baseFontSize: calc(50% + min(1vw, 8px));}#popupManager_popupBackground {position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: #00000090;display: flex;align-items: center;justify-content: center;align-content: center;flex-wrap: nowrap;flex-direction: row;z-index:100000 !important;}#popupManager_popup {border: solid;border-radius: 15pt;border-color: #2c2e31;margin-bottom: 5pt;background: #27282b;min-width: 200pt;max-width: 60vw;overflow-x: hidden;overflow-wrap: break-word;max-height: 80vh;height: max-content;width: 550pt;display: flex;flex-direction: column;justify-content: space-between;align-content: flex-start;align-items: flex-start;flex-wrap: nowrap;}#popupManager_popup h2 {margin-top: 0;margin-bottom: 16pt;font-size: calc(var(--baseFontSize) + 6pt);}#popupManager_popup p {margin-top: 16pt;margin-bottom: 0;white-space: pre-wrap;font-size: calc(var(--baseFontSize) + 0.5pt);}#popupManager_clickLeave {position: absolute;left: 0;top: 0;width: 100%;height: 100%;z-index: 5;}#popupManager_popupMain {position: relative;/* margin-bottom: 20pt; */padding: 25pt;z-index: 10;width: calc(100% - 65pt);}#popupManager_popupButtonContainer {position: sticky;left: 0;bottom: -1px;width: 100%;padding: 10pt 15pt;background: #222325;z-index: 10;}#popupManager_popupContent table{border: solid;border-width: 1px;border-color: white;border-radius: 10pt;overflow: hidden;width: 100%;}#popupManager_popupContent table th{padding: 10pt;border-bottom: solid;border-width: 1px;border-color: #fff;}#popupManager_popupContent table td{padding: 5pt 10pt}#popupManager_popupContent textarea{resize: none;width: 97.5%;height: 40vh;position: relative;color: #ffffff;background-color: revert;border: none;border-radius: 5pt;margin: 0;padding: 10pt;outline: none;}#popupManager_popupButtonContainer button{margin-right:8pt;color: #fff;background-color: #555555;border: none;padding: 4pt 9pt;border-radius: 5pt;}#popupManager_popupButtonContainer button.default{}#popupManager_popupButtonContainer button.red{background-color:#a22a2a;}#popupManager_popupButtonContainer button.blue{background-color:#2a48a2;}#popupManager_popupText img {max-width: 90%;}",
      o = '<div id="popupManager_popupBackground" style="display: none;"><div id="popupManager_clickLeave"></div><div id="popupManager_popup"><div id="popupManager_popupMain"><div id="popupManager_popupContent"><h2 id="popupManager_popupTitle">Title</h2><p id="popupManager_popupText">Inner Text</p></div></div><div id="popupManager_popupButtonContainer"><button>Text</button></div></div></div>'
    ) {
      var n = document.createElement("div");
      (n.innerHTML += "<style>" + e + "</style>"),
        (n.innerHTML += o),
        document.body.appendChild(n),
        (PopupManager.Elements.popupBackground = document.getElementById(
          "popupManager_popupBackground"
        )),
        (PopupManager.Elements.popupTitle = document.getElementById(
          "popupManager_popupTitle"
        )),
        (PopupManager.Elements.popupText = document.getElementById(
          "popupManager_popupText"
        )),
        (PopupManager.Elements.popupButtonContainer = document.getElementById(
          "popupManager_popupButtonContainer"
        )),
        (PopupManager.Elements.popupClickLeave = document.getElementById(
          "popupManager_clickLeave"
        )),
        (PopupManager.isSetup = !0);
    },
    showMessage: function (
      e,
      o = "Message",
      n = PopupManager.Defaults.options,
      t = !0
    ) {
      if (PopupManager.isSetup) {
        (PopupManager.Elements.popupTitle.innerHTML = o),
          (PopupManager.Elements.popupText.innerHTML = e);
        for (var p = [], r = 0; r < n.length; r++) {
          var a = n[r].split(">"),
            i = "",
            c = a[1].split("~");
          n[r].includes("~") && (i = 'class="' + c[1] + '" '),
            p.push(
              "<button " +
                i +
                'onclick="' +
                ("" == i ? a[1] : c[0]) +
                '">' +
                a[0] +
                "</button>"
            );
        }
        (PopupManager.Elements.popupButtonContainer.innerHTML = p.join("")),
          (PopupManager.Elements.popupBackground.style.display = "flex");
      }
      t
        ? ((PopupManager.Elements.popupClickLeave.onclick = function () {
            PopupManager.hideMessage();
          }),
          (PopupManager.Elements.popupClickLeave.ontouchstart = function () {
            PopupManager.hideMessage();
          }))
        : ((PopupManager.Elements.popupClickLeave.onclick = function () {}),
          (PopupManager.Elements.popupClickLeave.ontouchstart =
            function () {})),
        PopupManager.Popup.onshow();
    },
    hideMessage: function () {
      PopupManager.isSetup &&
        (PopupManager.Elements.popupBackground.style.display = "none"),
        PopupManager.Popup.onhide();
    },
  };
var LevelEncryptor = {
  setup: function () {
    sqdldev.runjs(
      "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
    ).onload = function () {
      window.LevelEncryptor = {
        Data: {
          key: CryptoJS.enc.Utf8.parse("20150528"),
          iv: {
            iv: CryptoJS.enc.Utf8.parse("12345678"),
            mode: CryptoJS.mode.CBC,
          },
        },
        setup: function () {
          return "LevelEncryptor is already set up.";
        },
        encrypt: function (e) {
          return CryptoJS.TripleDES.encrypt(
            e,
            LevelEncryptor.Data.key,
            LevelEncryptor.Data.iv
          ).toString();
        },
        decrypt: function (e) {
          return CryptoJS.TripleDES.decrypt(
            e,
            LevelEncryptor.Data.key,
            LevelEncryptor.Data.iv
          ).toString(CryptoJS.enc.Utf8);
        },
      };
    };
  },
};
