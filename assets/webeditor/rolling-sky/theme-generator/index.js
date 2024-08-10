function drag() {
  let a, b, c, d, e;
  document.addEventListener("dragstart", ({ target: d }) => {
    (a = d), (b = d.id), (e = d.parentNode.children);
    for (let b = 0; b < e.length; b += 1) e[b] === a && (c = b);
  }),
    document.addEventListener("dragover", (a) => {
      a.preventDefault();
    }),
    document.addEventListener("drop", ({ target: f }) => {
      if ("list" == f.parentElement.id && f.id !== b) {
        a.remove(a);
        for (let a = 0; a < e.length; a += 1) e[a] === f && (d = a);
        console.log(c, d), c > d ? f.before(a) : f.after(a);
      }
    });
}
drag();
function createElementFromHTML(a) {
  var b = document.createElement("div");
  return (b.innerHTML = a.trim()), b.firstChild;
}
var list = document.getElementById("list"),
  template = list.innerHTML;
const offset = 1;
var id, pos;
setInterval(function () {
  for (var a, b = 0; b < list.children.length; b++)
    (a = list.children[b]),
      0 < a.children[2].value.length
        ? ((pos = "0"),
          0 < a.children[1].value.length
            ? (0 > parseInt(a.children[0].value) && (a.children[1].value = "0"),
              (pos = a.children[1].value),
              (a.children[1].value = parseInt(a.children[1].value)))
            : (a.children[1].value = 0),
          (id = 1),
          116 < parseInt(a.children[2].value) && (a.children[2].value = "116"),
          0 > parseInt(a.children[2].value) && (a.children[2].value = "0"),
          (id = a.children[2].value),
          (a.children[2].value = parseInt(a.children[2].value)),
          (a.children[0].innerText = themesdata.themename[parseInt(id)]))
        : (a.children[2].value = "0");
});
function update() {
  var a = document.getElementById("isrsucheck").checked,
    b = document.getElementById("isminimizedcheck").checked,
    c = document.getElementById("minicont");
  c.style.display = a ? "none" : "block";
  for (var d = [], e = [], f = [], g = 0; g < list.children.length; g++) {
    function a(a) {
      return k.children[3].children[a].children[0].checked;
    }
    var h = 0,
      k = list.children[g];
    if (
      (a(0) ? (h = 1) : a(1) ? (h = 2) : a(6) ? (h = 3) : a(10) && (h = 4),
      1 <= id && 116 >= id)
    ) {
      e.push(
        "new LevelDesigner.Theme( "+
        pos +
          " , " +
          id +
          ",1f "+
          ", " +
          a(0) +
          ", " +
          a(1) +
          ", " +
          a(2) +
          ", " +
          a(3) +
          ", " +
          a(4) +
          ", " +
          a(5) +
          ", " +
          a(6) +
          ", " +
          a(7) +
          ", " +
          a(8) +
          ", " +
          a(9) +
          ", " +
          a(10) +
          ", " +
          a(11) +
          ", " +
          a(12) +
          ", " +
          a(13)+" );"
      );
      var l = "";
      if (b)
        switch (!0) {
          case a(13):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5) +
              ", " +
              a(6) +
              ", " +
              a(7) +
              ", " +
              a(8) +
              ", " +
              a(9) +
              ", " +
              a(10) +
              ", " +
              a(11) +
              ", " +
              a(12) +
              ", " +
              a(13);
            break;
          case a(12):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5) +
              ", " +
              a(6) +
              ", " +
              a(7) +
              ", " +
              a(8) +
              ", " +
              a(9) +
              ", " +
              a(10) +
              ", " +
              a(11) +
              ", " +
              a(12);
            break;
          case a(11):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5) +
              ", " +
              a(6) +
              ", " +
              a(7) +
              ", " +
              a(8) +
              ", " +
              a(9) +
              ", " +
              a(10) +
              ", " +
              a(11);
            break;
          case a(10):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5) +
              ", " +
              a(6) +
              ", " +
              a(7) +
              ", " +
              a(8) +
              ", " +
              a(9) +
              ", " +
              a(10);
            break;
          case a(9):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5) +
              ", " +
              a(6) +
              ", " +
              a(7) +
              ", " +
              a(8) +
              ", " +
              a(9);
            break;
          case a(8):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5) +
              ", " +
              a(6) +
              ", " +
              a(7) +
              ", " +
              a(8);
            break;
          case a(7):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5) +
              ", " +
              a(6) +
              ", " +
              a(7);
            break;
          case a(6):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5) +
              ", " +
              a(6);
            break;
          case a(5):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4) +
              ", " +
              a(5);
            break;
          case a(4):
            l =
              ", " +
              a(0) +
              ", " +
              a(1) +
              ", " +
              a(2) +
              ", " +
              a(3) +
              ", " +
              a(4);
            break;
          case a(3):
            l = ", " + a(0) + ", " + a(1) + ", " + a(2) + ", " + a(3);
            break;
          case a(2):
            l = ", " + a(0) + ", " + a(1) + ", " + a(2);
            break;
          case a(1):
            l = ", " + a(0) + ", " + a(1);
            break;
          case a(0):
            l = ", " + a(0);
            break;
          default:
            ldoption = "";
        }
      else
        l =
          ", " +
          a(0) +
          ", " +
          a(1) +
          ", " +
          a(2) +
          ", " +
          a(3) +
          ", " +
          a(4) +
          ", " +
          a(5) +
          ", " +
          a(6) +
          ", " +
          a(7) +
          ", " +
          a(8) +
          ", " +
          a(9) +
          ", " +
          a(10) +
          ", " +
          a(11) +
          ", " +
          a(12) +
          ", " +
          a(13);
      f.push(
        "&#9;new LevelDesigner.Theme(" + pos + ", " + id + ", 1f" + l + ")"
      );
    }
  }
  if (a) d = e.join("<br>");
  else {
    d =
      "new LevelDesigner.WorldTheme(new LevelDesigner.Theme[" +
      f.length +
      "]" +
      "<br>" +
      "{" +
      "<br>" +
      f.join(",<br>") +
      "<br>" +
      "}),";
  }
  var m = document.getElementById("content");
  m.innerHTML != d && (m.innerHTML = d);
}
var Theme = {
    addNew(
      a = 0,
      b = 1,
      c = 1,
      d = !1,
      e = !1,
      f = !1,
      g = !1,
      h = !1,
      i = !1,
      j = !1,
      k = !1,
      l = !1,
      m = !1,
      n = !1,
      o = !1,
      p = !1,
      q = !1
    ) {
      function r(a) {
        return s.children[3].children[a].children[0].checked ? 1 : 0;
      }
      var s, t;
      (s = createElementFromHTML(template)),
        (t = s.children[3]),
        (t.children[0].children[0].checked = d),
        (t.children[1].children[0].checked = e),
        (t.children[2].children[0].checked = f),
        (t.children[3].children[0].checked = g),
        (t.children[4].children[0].checked = h),
        (t.children[5].children[0].checked = i),
        (t.children[6].children[0].checked = j),
        (t.children[7].children[0].checked = k),
        (t.children[8].children[0].checked = l),
        (t.children[9].children[0].checked = m),
        (t.children[10].children[0].checked = n),
        (t.children[11].children[0].checked = o),
        (t.children[12].children[0].checked = p),
        (t.children[13].children[0].checked = q),
        (s.children[1].value = a),
        (s.children[2].value = b);
      var u =
        "TD-" +
        b +
        "-" +
        r(0) +
        r(1) +
        r(2) +
        r(3) +
        r(4) +
        r(5) +
        r(6) +
        r(7) +
        r(8) +
        r(9) +
        r(10) +
        r(11) +
        r(12) +
        r(13) +
        "-" +
        a +
        "-" +
        parseInt(Math.random().toString().replace(".", ""));
      return (s.id = u), list.appendChild(s), Organization.updateButtons(), u;
    },
    addFromInput() {
      var a = document.getElementById("rsuinp");
      "" == a.value
        ? Theme.addNew()
        : "" != a.value && (Theme.importRsu(a.value), (a.value = ""));
    },
    importRsu(b) {
      for (var c = b.split(","), a = 0; a < c.length; a++)
        "true" == c[a] ? (c[a] = !0) : "false" == c[a] && (c[a] = !1);
      return Theme.addNew(
        c[0],
        c[1],
        c[2],
        c[4],
        c[5],
        c[6],
        c[7],
        c[8],
        c[9],
        c[10],
        c[11],
        c[12],
        c[13],
        c[14],
        c[15],
        c[16],
        c[17]
      );
    },
  },
  Organization = {
    updateButtons() {
      for (var a = 0; a < list.children.length; a++)
        (list.children[a].getElementsByClassName("down")[0].disabled =
          list.children.length - 1 == a),
          (list.children[a].getElementsByClassName("up")[0].disabled = 0 == a);
      update();
    },
  },
  Move = {
    up(a = this) {
      Move.mct(a, -1);
    },
    down(a = this) {
      Move.mct(a, 1);
    },
    mct(a, b) {
      var c = a.parentElement,
        d = c.parentElement;
      -1 === b && c.previousElementSibling
        ? d.insertBefore(c, c.previousElementSibling)
        : 1 == b &&
          c.nextElementSibling &&
          d.insertBefore(c, c.nextElementSibling.nextElementSibling),
        Organization.updateButtons();
    },
  };
(list.innerHTML = ""),
  Theme.addNew(0, 8, 1, !1, !1, !1, !1, !1, !0, !0, !0, !0);
