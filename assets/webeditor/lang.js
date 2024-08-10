const Lang = {
  current: "en",
  templang: "",
  resolve(a) {
    console.log('Fetching Path: "' + a + '".');
    var b = Lang.resolvePostLog(a);
    return (
      b == a &&
        console.warn(
          'Language Path not found, defaulting to path: "' + b + '"'
        ),
      b
    );
  },
  resolvePostLog(a) {
    if ("developer" == Lang.current) return a;
    a =
      "data." + ("" == Lang.templang ? Lang.current : Lang.templang) + "." + a;
    var b = Array.isArray(a) ? a : a.split("."),
      c = b.reduce((a, b) => a?.[b], Lang);
    if (null == c) return a;
    if (c.includes("%s")) {
      var d = [].slice.call(arguments, 1),
        e = 0;
      c = c.replace(/%s/g, () => d[e++]);
    }
    return c;
  },
  resolveWithLang(a, b) {
    console.log('Fetching Path with Manual Language: "' + a + '"');
    try {
      Lang.templang = b;
      var c = Lang.resolvePostLog(a);
      return (Lang.templang = ""), c;
    } catch {
      return (
        console.warn(
          "Custom Resolve Language (" +
            b +
            ') Path not found, defaulting to path: "' +
            a +
            '"'
        ),
        a
      );
    }
  },
  changeLang(a) {
    console.log(
      "Starting Language Change... (" + Lang.current + " to " + a + ")"
    );
    try {
      (Lang.current = a),
        Lang.reloadLang(),
        localStorage.setItem("language", a);
      for (
        var b,
          c = document.getElementsByClassName("langcredits"),
          d = Lang.resolve("global.translators", a),
          e = 0;
        e < c.length;
        e++
      ) {
        b = "";
        for (var f, e = 0; e < d.length; e++)
          (f = d[e].split(";")),
            (b +=
              1 < f.length
                ? '<li><a target="_blank" href="' +
                  f[1] +
                  '">' +
                  f[0] +
                  "</a></li>"
                : "<li>" + f[0] + "</li>");
        0 < d.length
          ? (c[e - 1].innerHTML =
              Lang.resolve("global.translatorcredit") +
              "<br><ul>" +
              b +
              "</ul>")
          : (c[e].innerHTML = "");
      }
      return (
        console.log(
          "Language changed to " + Lang.resolve("global.label") + "."
        ),
        !0
      );
    } catch {
      return (
        console.error("Language Changing Failed. Please contact a developer."),
        !1
      );
    }
    Lang.events.onchange();
  },
  getLang() {
    var a = localStorage.getItem("language");
    return null == a || null == a ? "en" : a;
  },
  reloadLang() {
    for (var a = 0; a < Lang.languageElements.length; a++) {
      var b = Lang.languageElements[a],
        c = Lang.resolve(b.dataset.lang);
      "INPUT" == b.tagName || "TEXTAREA" == b.tagName
        ? (b.placeholder = c)
        : (b.innerHTML = c);
    }
    Lang.events.onreload();
  },
  languageElements: [],
  selectElements() {
    (Lang.languageElements = []),
      (Lang.languageElements = document.querySelectorAll("[data-lang]"));
  },
  changers: [],
  createAllChangers() {
    console.log("Creating Language Changer UI objects...");
    try {
      Lang.changers = document.querySelectorAll("c-lang-select");

      for (var b = [], c = Object.keys(Lang.data), d = 0; d < c.length; d++)
        b.push(
          '<option value="' +
            c[d] +
            '">' +
            Lang.resolveWithLang("global.label", c[d]) +
            "</option>"
        );

      var e = document.createElement("select");
      (e.innerHTML = b.join("")),
        (e.value = Lang.getLang()),
        e.setAttribute("onchange", "Lang.changeLang(this.value);");
      for (var f = 0; f < Lang.changers.length; f++) {
        (Lang.changers[f].innerHTML =
          "<style>c-lang-select {display: flex; flex-direction: column; align-items: flex-start; align-content: flex-start; justify-content: flex-start; flex-wrap: nowrap; width: min-content; background-color: #404145; border-radius: 8pt; padding: 8pt; max-width: 100vw; min-width: max-content; width: 150pt;} c-lang-select {white-space: nowrap;} c-lang-select-title, c-lang-select-title + select {font-size: 16px; margin-bottom: 5pt;} ul {margin: 0; padding-left: 25px;}</style>" +
          '<c-lang-select-title data-lang="global.langchanger.title"></c-lang-select-title>'),
          Lang.changers[f].appendChild(e);
        var g = Lang.resolve("global.translators", Lang.getLang()),
          h = document.createElement("div");
        (h.className = "langcredits"), Lang.changers[f].appendChild(h);
      }
    } catch {
      console.error("Create Language Changer UIs Failed");
    }
  },
  checkSupportedBrowser() {
    var a = navigator.userAgent,
      b = Lang.resolve(
      );
    (a.includes(" GSA/") || a.includes(" OPR/")) && alert(b);
  },
  special: { tileset: { zipversion: "2.7.8", zipdate: "12/30/2022" } },
  events: { onchange() {}, onreload() {} },
  data: {},
};
(Lang.data = {
  en: {
    global: {
      label: "Chinese（CN）",
      langchanger: { title: "语言" },
      translatorcredit: "Translators: ",
      translators: ["None (Original Language)"],
      unsupportedbrowser:
        "Your browser (%s) is not supported!\n\nPlease switch to one of the following browsers:\n%s",
      console: "Console",
    },
    webeditor: {
      pagetitle: "Rolling Sky Web Editor",
      innertitle: "Rolling Sky WebEditor 关卡编辑器",
      splashwarn:
        "Don't take any of the splash messages too seriously.<br>Please report any bugs and glitches to sqdl_#8597 on Discord.<br>If you don't need a feature, just ignore it.",
      instructionalmanualopen: "Full WebEditor Instructional Manual",
      creation: {
        blanklevel: {
          title: '创建空白关卡',
          description:
            "输入你所预定的关卡长度",
          lengthinput: "输入关卡长度...",
          enter: "创建空白关卡",
        },
        uploadlevel: {
          title: "导入关卡",
          description: "导入现有的关卡文件",
          enter: "从本地文件导入关卡(仅TXT文件格式)",
        },
        existlevel: {
          title: "Load Existing Level",
          description: "加载官方关卡",
          input: "输入关卡名字",
          enter: "Load Existing Level",
        },
        previouslevel: {
          title: "加载过去的关卡",
          description:
            "加载上一次你打开的关卡",
          enter: "加载过去的关卡",
        },
      },
      main: {
        toolbar: {
          lockscroll: "锁定",
          editmode: "编辑模式",
          brushes: "工具",
        },
        header: {
          file: { title: "文件", exporter: "导出" },
          editor: {
            title: "编辑",
            back: "返回",
            displayoptions: "改主题(未开发)",
            switchdisplayside: "宽屏模式(未开发)",
            togglezoom: "缩放模式(未开发)",
            palletmode: {
              title: "地块筛选 ",
              modes: {
                modesAll: "所有",
                modesGrouped: "分组",
                modesFavorites: "喜欢的",
              },
            },
          },
          level: {
            title: "小工具",
            findtile: "找障碍数值",
            selecttile: "选择障碍数值",
            saveinsession: "在会话中保存",
            toggleportalopacity: "让发球器变灰",
            objectcount: "障碍计数",
          },
        },
        exporter: {
          title: "导出关卡",
          steps: {
            namefile: {
              title: "关卡文件名字",
              description:
                "自动生成文件，无需输入后缀",
              input: "输入你的关卡名字",
            },
            download: {
              txt: {
                title: "下载 .TXT 关卡文件",
                description:
                  "自动生成，无需输入文件后缀",
                enter: "下载",
              },
              encrypt: {
                title: "下载关卡加密后的文件",
                description:
                  "自动生成加密文件，可适用于新版本",
                enter: "下载",
              },
              tmx: {
                title: "下载tmx关卡文件",
                description:"下载适用于Tiled/NotTiled的tmx关卡文件",
//                description:
//                  '在这里下载SQDLDEV的地编图<br>点击 <a href="https://sqdldev.github.io/rolling-sky/tileset/zipped/RollingSkyTileset_' +
//                  Lang.special.tileset.zipversion +
//                  '.zip">这里</a> (Version ' +
//                  Lang.special.tileset.zipversion +
//                  ", 升级 " +
//                  Lang.special.tileset.zipdate +
//                  ") 下载最新的SQDLDEV地编图 (Put it in the same directory as the TMX you download)",
                enter: "下载",
              },
            },
            copygeos: {
              title: "复制geo数值",
              description:
                "慎用，出bug了别怪我",
              description2: "键入Z值",
              enterzval: "用Enter",
              copy: "复制",
            },
          },
        },
        displayoptions: {
          title: "改主题(未开发)",
          description:
            "不会影响到你的关卡文件",
          types: {
            trees: "凯斯特福喜欢的主题",
            towers: "火山主题",
            pyramids: "埃及主题",
            hammers: "不知道叫啥主题",
            skyscrapers: "城市主题",
            floodlights: "很亮的主题",
            teslas: "我也不知道啥主题",
          },
          enter: "Submit",
        },
        objectcount: {
          title: "障碍计数",
          tutorial: "单击图标可以把该地编复制到画笔上，双击图标可以玩原神捏",
        },
      },
      alerts: {
        translationwarning:
          "Warning: Translating the site may cause confusion. Please select a language from the Language Dropdown!",
        geobuffercopydone: "Copied GeoBuffers with Z Value '%s'!",
        saveinsession:
          "已保存！现在即使你的页面被重新加载或你不小心退出了该页面，你可以在起始页上使用“加载上一次你打开的关卡”来加载关卡",
        loadinvalidlevel:
          "Invalid Level. Please make sure that you upload either a .TXT level or a .TMX Tiled project.",
        previouslevelnone: "You do not have a previous level loaded.",
        overwritesessionlevel: {
          one: "This will DELETE your level that is saved in the WebEditor session!!!\nPlease check your last loaded level to make sure you want to overwrite your level!\n\nClick Ok to DELETE YOUR LEVEL SAVED IN SESSION and click Cancel to keep your level saved in session.",
          two: "Please click Ok again to DELETE your level saved in session FOREVER! Click Cancel to keep your level saved in session!",
        },
        widescreenlevelwarn:
          "Your screen is not wide enough to use Widescreen Mode.",
        unknownfiletype:
          "Unknown level type. Please upload either a TXT Rolling Sky Level, a Tiled Rolling Sky Project, or an Encrypted Rolling Sky Level.",
        invalidname: "Invalid AutoLoad Level Identifier entered in URL.",
      },
      prompts: {
        tiletobrush: "不是我叫你用了啊？你直接给我坐下！",
        tiletobrusherror: "请输入数值!",
        findtile: "居然要查数值？真的太没实力了好吧！",
        backtohome:
          "滚出去",
      },
      stencilWarn: {
        title: "非常好教程爱来自魔改版",
        hide: "隐藏此会话",
        hideForever: "永远隐藏",
      },
      tilepallet: {
        favorites: {
          tutorial:
            'This is an example. Anything that is not a number will be ignored,Separate tiles with commas,Line Breaks do not matter,All comments (like this) get deleted when you click "Ok.",\nHere is an example of a Favorites List:,',
          edit: "Edit",
          title: "Favorites",
          set: { title: "Set Favorites", enter: "Set" },
        },
      },
    },
  },
  es: {
    global: {
      label: "Espa\xF1ol",
      langchanger: { title: "Lenguaje" },
      translatorcredit: "Traductores: ",
      translators: [
        "Porygon Axolotl;https://www.youtube.com/channel/UC1liz36D31iiruOgTnW0xgg/?sub_confirmation=1",
      ],
      unsupportedbrowser:
        "\xA1Tu navegador (%s) no es compatible!\n\nFavor de cambiar a uno de los siguientes navegadores:\n%s",
      console: "Consola",
    },
    webeditor: {
      pagetitle: "Editor En linea para Rolling Sky",
      innertitle: "Editor En linea para Rolling Sky por sqdldev",
      splashwarn:
        "No tomar ninguno de los mensajes de bienvenida en serio.<br>Favor de reportar cualquier error o glitch a sqdl_#8597 en Discord<br>Si no necesitas una herramienta, ignorala.",
      instructionalmanualopen:
        "Manual de instrucci\xF3n completo del editor en linea",
      creation: {
        blanklevel: {
          title: "Crear Nivel en Blanco",
          description:
            "Anote el largo del nivel. Recuerda que no puedes cambiar esto despu\xE9s de crear el nivel.",
          lengthinput: "Anote el largo del nivel\u2026",
          enter: "Crear Nivel en Blanco",
        },
        uploadlevel: {
          title: "Subir nivel",
          description: "Subir archivo de un nivel completo.",
          enter: "Crear nivel del archivo",
        },
        existlevel: {
          title: "Cargar nivel existente",
          description: "Carga un nivel existente de Rolling Sky.",
          input: "Escriba el nombre del nivel\u2026",
          enter: "Cargar nivel existente",
        },
        previouslevel: {
          title: "Cargar nivel previo",
          description:
            "Cargar ultimo nivel que editaste incluso si has refrescado la pagina.",
          enter: "Cargar nivel previo",
        },
      },
      main: {
        toolbar: {
          lockscroll: "Detener Movimiento",
          editmode: "Modo Editor",
          brushes: "Pinceles",
        },
        header: {
          file: { title: "Archivo", exporter: "Exportar" },
          editor: {
            title: "Editor",
            back: "Atr\xE1s",
            displayoptions: "Opciones Graficas",
            switchdisplayside: "Activar modo largo",
            togglezoom: "Activar Zoom",
          },
          level: {
            title: "Nivel",
            findtile: "Encontrar Pieza",
            selecttile: "Seleccionar Pieza",
            saveinsession: "Guardar en sesi\xF3n",
            toggleportalopacity: "Activar Portal Transparente",
            objectcount: "Cantidad de Objetos",
          },
        },
        exporter: {
          title: "Exportar Nivel",
          steps: {
            namefile: {
              title: "Nombra el Nivel",
              description:
                "Este nombre sera aplicado a tu archivo cuando oprimas el bot\xF3n de descarga debajo de aqu\xED. La extensi\xF3n del archivo ser\xE1 autom\xE1ticamente a\xF1adida, as\xED que no tienes que poner la extension del archivo en la caja de texto.",
              input: "Type your level name...",
            },
            download: {
              txt: {
                title: "Bajar Nivel .TXT",
                description:
                  "Oprima Bajar para bajar una copia .txt de tu nivel.<br>Si eso no funciona, selecciona todo el texto en el area de texto y guardalo como un documento .TXT.",
                enter: "Bajar .TXT",
              },
              tmx: {
                title: "Bajar Nivel .TMX",
                description:
                  'Oprima Bajar para bajar una copia .tmx de tu nivel.<br>Oprima <a href="https://sqdldev.github.io/rolling-sky/tileset/zipped/RollingSkyTileset_' +
                  Lang.special.tileset.zipversion +
                  '.zip">aqui</a> (Versi\xF3n ' +
                  Lang.special.tileset.zipversion +
                  ", actualizada el " +
                  Lang.special.tileset.zipdate +
                  ") para bajar la versi\xF3n mas nueva del tileset para tiled. (Ponlo en la misma carpeta que el archivo .TMX que bajaste.)",
                enter: "Bajar .TMX",
              },
            },
            copygeos: {
              title: "Copiar GeoBuffers",
              description:
                "Por favor no dependas completamente de esto ahora, es mas un experimento. Favor de reportar cualquier y todo error a mi.",
              description2:
                "Introduzca valor Z de los GeoBuffers (Para todas las lineas.)",
              enterzval: "Ingrese valor Z...",
              copy: "Copiar Geobuffers",
            },
          },
        },
        displayoptions: {
          title: "Opciones Graficas",
          description:
            "Estos no afectan tu nivel. Estas opciones tematicas te ayudan a visualizar el resultado final de tu nivel. Los unicos cambios visibles en obstaculos estan listados abajo.",
          types: {
            trees: "Arboles",
            towers: "Torres Volc\xE1nicas",
            pyramids: "Pir\xE1mides",
            hammers: "Martillos",
            skyscrapers: "Rascacielos",
            floodlights: "Luzes",
            teslas: "Teslas",
          },
          enter: "Enviar",
        },
        objectcount: {
          title: "Conteo de objetos",
          tutorial:
            "Oprima en un icono de una pieza para poner esa pieza en tu pincel.",
        },
      },
      alerts: {
        translationwarning:
          "Aviso: Traducir esta pagina uede causar confusi\xF3n. Por favor seleccione un lenguaje de la lista de lenguajes.",
        geobuffercopydone: "\xA1GeoBuffers con valor Z ha sido copiado '%s'!",
        saveinsession:
          "\xA1Guardado! Ahora, aunque la pagina sea recargada o si te sales por accidente, puedes cargar el nivel con el bot\xF3n de 'Cargar nivel previo' en la pagina de inicio.",
        loadinvalidlevel:
          "Nivel invalido. Favor de verificar que subiste un nivel .TXT o un projecto de tiled .TMX.",
        previouslevelnone: "No tienes ningun nivel previo cargado.",
        overwritesessionlevel: {
          one: "\xA1\xA1\xA1Esto va a BORRAR tu nivel que esta guardado en la sesi\xF3n del editor en linea!!!\n\xA1Por favor verificar tu ultimo nivel cargado para verificar que quieres reescribir tu nivel!\n\nOprima ok para BORRAR TU NIVEL GUARDADO EN SESI\xD3N y oprima Cancel (Cancelar) para mantener tu nivel guardado en sesi\xF3n.",
          two: "\xA1Favor de oprimir Ok otra vez para BORRAR tu nivel guardado en sesi\xF3n PARA SIEMPRE! \xA1Oprima Cancel (Cancelar) para mantener tu nivel guardado en sesi\xF3n!",
        },
        widescreenlevelwarn:
          "Tu pantalla no es suficientemente larga para usar modo largo.",
      },
      prompts: {
        tiletobrush: "Que pieza quieres usar?",
        tiletobrusherror: "\xA1Por favor ingrese un ID de pieza valido!",
        findtile: "\xBFA que pieza quieres ir?",
        backtohome:
          "\xBFEstas seguro de que quieres ir a la pagina de inicio? No perderas progreso aunque recargues la pagina.\nPara cargar este nivel otra vez, oprima Cargar nivel previo en la pagina de inicio.",
      },
      stencilWarn: {
        title: "Como usar las gu\xEDas correctamente",
        hide: "Ocultar por esta sesi\xF3n",
        hideForever: "Ocultar para siempre",
      },
    },
  },
}),
  document.addEventListener("DOMContentLoaded", function () {
    Lang.createAllChangers(),
      Lang.selectElements(),
      Lang.changeLang(Lang.getLang()),
      Lang.checkSupportedBrowser();
  });
