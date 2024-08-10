var aci = document.querySelector("#accessKey"),
  content = document.querySelector("#content"),
  userLogin = document.querySelector("#userLogin"),
  optionsSel0 = document.querySelector("#optionsSel0"),
  optionsSel1 = document.querySelector("#optionsSel1");
const sqdldev = {
  dynamicallyLoadScript(a) {
    var b = document.createElement("script");
    return (b.src = a), document.head.appendChild(b), b;
  },
};
var userdata = {
  RCM: "WArw+PnbWOIpnzTa0/UqSbIARyVJCGFNiKHbIhLXS5T4TWw9AD6E/V9BJ0VD2RjZZ8hqfR+KuwTLS1q9yvsjGOXIcjP57RyCfsbdWnqoKPE39eoRhpWDrCrczl1y141RPWX4QH5A6IWgwKRsMRE/lTYwv5C1y3Rfwm6Yfw31fUCo6UyXHIskuiMIW3t39vQ4",
  QMT: "8u88I8Bj+0e90d+72nlIq4xuDqcMCTS5bjLOzzgk13RWEy2jkCmcS0vZxfBM5clQ68PkbxSik7vAUSXxvdeLiwhEqRJ5N3iJFWjSyBjs+aOlSlfrZgOLi08lkEGaYO1J2iH8zyitZOfbPc0p8ThYW9qRAMbDX9+oc9425lBNnbfq5nYgl+GgbM8GPO/RrE6CeqL1HI5VR1Q=",
  PJI: "YH+VNK2VF5xtv2jI0q4kfz8rK+3hm/pw9PO0lwVSgPVHXNqHSC1fem4kPLwGA5I8TakQGyZya6JEffNqpCiDVjhPs8Go1RtNTvvrjGNOU976UfMG1ggCTPgFyvVFpSN3aP6jGi7dcne3bGR8ORv0SPLrorm3R3lWJbDh/B0nu3ADKq2jGUAdAYIwxS3uuWsk",
  EJC: "tQ7FwTncR/k+cYwnMyqiHjpRp4WlwG2pnfdZtuPeGg16bbOfjrTC/431K52F2jEARpCnm2BwxW907ctMbs5bJRxJufCGsJBa+W3wKiTI3rD6fhFTz0cd9Yb0fnmzuKQGKqf9djT+k+H71yzV8samy+1NtpFe8aE1iaIJhpgas99JDUcN+4qe8Ln23dDFNcje",
  RXE: "4UzpOUcXXDYueh+k/j2NmOb/KmpgqKDhWNjld3nqgVearjH+69TqWIgM5C/7gjxMP6jl9NwUtHyckwliTJhgxbKJRzz2VHHl2JlCLKrdUPJ0o1sv3Is1P2hKRI9U3rmDQe/jUzmC/63FPdo2GWBXIOLP3qpqCrhqZGK13t6YMdgJnhOo49KMvNISE7+OocVC",
  EQR: "fEPaxVfpsQgp8wbA6+NtS5MJrw+Ti9HbKLf5Ieyg+NSaWbt1+bKaj6wKG2anVMQqO6U2xwJKOKno4Ce43yLA3fkdAUMx+N0UtVxPm9cdlFzhocHfB8PDwyqtW2X693aR1I194WDI7JQJMTxsP7ZcEdshfyY70LtDmFhWk8KRNq+Yc4R/33O1Jqz0XNO5ryyK",
};
aci.value = localStorage.getItem("levelEncryptorAccessKey");
function updateAci() {
  try {
    var a = aci.value;
    if ((localStorage.setItem("levelEncryptorAccessKey", a), 21 == a.length)) {
      var e = a.split("-"),
        b = userdata[e[0]],
        c = e[1],
        d = LevelEncryptor.decrypt(b, 2, c.slice(0, 13), c.slice(13));
      (LevelEncryptor.Data = JSON.parse(d)),
        (userLogin.innerHTML = ""),
        (content.style.display = "block");
    } else
      (LevelEncryptor.Data = {}),
        (userLogin.innerHTML = "输入密钥"),
        (content.style.display = "none");
  } catch {}
}
aci.addEventListener("input", updateAci),
  (window.LevelEncryptorUserUtility = {
    Elements: {
      input: document.getElementById("main"),
      selector: document.getElementById("select"),
    },
    action() {
      var a = "0" == LevelEncryptorUserUtility.Elements.selector.value,
        b = LevelEncryptorUserUtility.Elements.input.value;
      let c = "";
      (c = a ? LevelEncryptor.decrypt(b) : LevelEncryptor.encrypt(b)),
        "" != c && (LevelEncryptorUserUtility.Elements.input.value = c);
    },
  }),
  (window.LevelEncryptor = {
    setup() {
      sqdldev.dynamicallyLoadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
      ).onload = function () {
        (window.LevelEncryptor = {
          Data: {},
          setup() {
            return "LevelEncryptor is already set up.";
          },
          encrypt(a, b = 0, c = "", d = "") {
            switch (b) {
              case 0:
              case 1:
                return CryptoJS.TripleDES.encrypt(a, LevelEncryptor.Data.key, {
                  iv: LevelEncryptor.Data.iv,
                  mode: CryptoJS.mode.CBC,
                }).toString();
                break;
              case 2:
                return CryptoJS.TripleDES.encrypt(
                  a,
                  CryptoJS.enc.Utf8.parse(c),
                  { iv: CryptoJS.enc.Utf8.parse(d), mode: CryptoJS.mode.CBC }
                ).toString();
            }
          },
          decrypt(a, b = 0, c = "", d = "") {
            switch (b) {
              case 0:
                return (
                  (decStr = CryptoJS.TripleDES.decrypt(
                    a,
                    LevelEncryptor.Data.key,
                    { iv: LevelEncryptor.Data.iv, mode: CryptoJS.mode.CBC }
                  ).toString(CryptoJS.enc.Utf8)),
                  decStr
                );
                break;
              case 1:
                return (
                  (decStr = CryptoJS.TripleDES.decrypt(
                    a,
                    LevelEncryptor.Data.key,
                    { iv: LevelEncryptor.Data.iv, mode: CryptoJS.mode.CBC }
                  ).toString(CryptoJS.enc.Utf8)),
                  "" != decStr
                );
                break;
              case 2:
                return (
                  (decStr = CryptoJS.TripleDES.decrypt(
                    a,
                    CryptoJS.enc.Utf8.parse(c),
                    { iv: CryptoJS.enc.Utf8.parse(d), mode: CryptoJS.mode.CBC }
                  ).toString(CryptoJS.enc.Utf8)),
                  decStr
                );
            }
          },
        }),
          updateAci();
      };
    },
  }),
  LevelEncryptor.setup();