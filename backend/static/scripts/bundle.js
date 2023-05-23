(() => {
  var t = {
      606: (t) => {
        t.exports = { CHAT_MESSAGE_RECEIVED: "chat-message-received" };
      },
      938: (t) => {
        t.exports = ({ value: t, color: e, id: s }) => {
          const n = document.createElement("p"),
            i = document.createElement("img"),
            r = document.createElement("div"),
            o = document.createElement("span"),
            a = document.createElement("ion-icon"),
            c = r.cloneNode(),
            h = r.cloneNode(),
            p = r.cloneNode(),
            u = o.cloneNode(),
            l = o.cloneNode(),
            d = o.cloneNode();
          let f, y, m;
          return (
            (c.className = "col"),
            (h.className = "card " + e),
            (p.className = "label row justify-center align-center"),
            "reverse" == t
              ? ((f = a.cloneNode()),
                (y = a.cloneNode()),
                (m = a.cloneNode()),
                f.setAttribute("name", "sync-outline"),
                y.setAttribute("name", "sync-outline"),
                m.setAttribute("name", "sync-outline"))
              : "skip" == t
              ? ((f = a.cloneNode()),
                (y = a.cloneNode()),
                (m = a.cloneNode()),
                f.setAttribute("name", "hand-left-outline"),
                y.setAttribute("name", "hand-left-outline"),
                m.setAttribute("name", "hand-left-outline"))
              : ((f = n.cloneNode()),
                (y = n.cloneNode()),
                (m = n.cloneNode()),
                (f.innerHTML = t),
                (y.innerHTML = t),
                (m.innerHTML = t)),
            i.setAttribute("alt", "card"),
            i.setAttribute("src", "/images/card.png"),
            h.setAttribute("data-card-id", s),
            u.append(f),
            l.append(y),
            d.append(m),
            p.append(l),
            h.append(u, p, i, d),
            c.appendChild(h),
            c
          );
        };
      },
      321: (t) => {
        t.exports = () => {
          const t = location.pathname.split("/");
          return t[t.length - 1];
        };
      },
      387: (t) => {
        t.exports = () => {
          const t = document.cookie.split(";");
          for (const e of t)
            if (e.startsWith("userID=")) return e.split("=")[1];
        };
      },
    },
    e = {};
  function s(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var r = (e[n] = { exports: {} });
    return t[n](r, r.exports, s), r.exports;
  }
  (s.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return s.d(e, { a: e }), e;
  }),
    (s.d = (t, e) => {
      for (var n in e)
        s.o(e, n) &&
          !s.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (s.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (s.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      var t = {};
      s.r(t),
        s.d(t, {
          Decoder: () => mt,
          Encoder: () => yt,
          PacketType: () => ft,
          protocol: () => dt,
        });
      var e = s(321),
        n = s.n(e);
      const i = document.querySelector("#chat input#chat-input"),
        r = document.querySelector("#chat button#send-btn");
      i &&
        i.addEventListener("keydown", ({ target: t, keyCode: e }) => {
          if (13 !== e) return;
          const s = n()(),
            i = t.value;
          0 != i.length &&
            ((t.value = ""),
            fetch(`/chat/${s}`, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: i }),
            }));
        }),
        r &&
          r.addEventListener("click", (t) => {
            const e = n()(),
              s = i.value;
            0 != s.length &&
              ((i.value = ""),
              fetch(`/chat/${e}`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: s }),
              }));
          });
      const o = document.querySelector("#player"),
        a = document.querySelector("#draw-card"),
        c = document.querySelector("#start-game-btn"),
        h = document.querySelector("#color-picker");
      c &&
        c.addEventListener("click", (t) => {
          const e = n()();
          fetch(`/api/game/start/${e}`, { method: "POST" }).then((t) =>
            t.json()
          );
        }),
        o &&
          o.addEventListener("click", (t) => {
            const e = n()(),
              s = t.target.getAttribute("data-card-id");
            fetch(`/api/game/move/${e}`, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: s }),
            });
          }),
        a &&
          a.addEventListener("click", (t) => {
            const e = n()();
            fetch(`/api/game/draw/${e}`, {
              method: "post",
              headers: { "Content-Type": "application/json" },
            });
          }),
        h &&
          h.addEventListener("click", (t) => {
            const e = t.target.getAttribute("data-card-id"),
              s = n()();
            fetch(`/api/game/move/${s}`, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: e }),
            }),
              (h.innerHTML = "");
          });
      const p = Object.create(null);
      (p.open = "0"),
        (p.close = "1"),
        (p.ping = "2"),
        (p.pong = "3"),
        (p.message = "4"),
        (p.upgrade = "5"),
        (p.noop = "6");
      const u = Object.create(null);
      Object.keys(p).forEach((t) => {
        u[p[t]] = t;
      });
      const l = { type: "error", data: "parser error" },
        d =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" ===
              Object.prototype.toString.call(Blob)),
        f = "function" == typeof ArrayBuffer,
        y = (t, e) => {
          const s = new FileReader();
          return (
            (s.onload = function () {
              const t = s.result.split(",")[1];
              e("b" + (t || ""));
            }),
            s.readAsDataURL(t)
          );
        },
        m = ({ type: t, data: e }, s, n) => {
          return d && e instanceof Blob
            ? s
              ? n(e)
              : y(e, n)
            : f &&
              (e instanceof ArrayBuffer ||
                ((i = e),
                "function" == typeof ArrayBuffer.isView
                  ? ArrayBuffer.isView(i)
                  : i && i.buffer instanceof ArrayBuffer))
            ? s
              ? n(e)
              : y(new Blob([e]), n)
            : n(p[t] + (e || ""));
          var i;
        },
        g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        b = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256);
      for (let t = 0; t < g.length; t++) b[g.charCodeAt(t)] = t;
      const v = "function" == typeof ArrayBuffer,
        k = (t, e) => {
          if (v) {
            const s = ((t) => {
              let e,
                s,
                n,
                i,
                r,
                o = 0.75 * t.length,
                a = t.length,
                c = 0;
              "=" === t[t.length - 1] && (o--, "=" === t[t.length - 2] && o--);
              const h = new ArrayBuffer(o),
                p = new Uint8Array(h);
              for (e = 0; e < a; e += 4)
                (s = b[t.charCodeAt(e)]),
                  (n = b[t.charCodeAt(e + 1)]),
                  (i = b[t.charCodeAt(e + 2)]),
                  (r = b[t.charCodeAt(e + 3)]),
                  (p[c++] = (s << 2) | (n >> 4)),
                  (p[c++] = ((15 & n) << 4) | (i >> 2)),
                  (p[c++] = ((3 & i) << 6) | (63 & r));
              return h;
            })(t);
            return w(s, e);
          }
          return { base64: !0, data: t };
        },
        w = (t, e) =>
          "blob" === e && t instanceof ArrayBuffer ? new Blob([t]) : t,
        _ = (t, e) => {
          if ("string" != typeof t) return { type: "message", data: w(t, e) };
          const s = t.charAt(0);
          return "b" === s
            ? { type: "message", data: k(t.substring(1), e) }
            : u[s]
            ? t.length > 1
              ? { type: u[s], data: t.substring(1) }
              : { type: u[s] }
            : l;
        },
        E = String.fromCharCode(30);
      function A(t) {
        if (t)
          return (function (t) {
            for (var e in A.prototype) t[e] = A.prototype[e];
            return t;
          })(t);
      }
      (A.prototype.on = A.prototype.addEventListener =
        function (t, e) {
          return (
            (this._callbacks = this._callbacks || {}),
            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
            this
          );
        }),
        (A.prototype.once = function (t, e) {
          function s() {
            this.off(t, s), e.apply(this, arguments);
          }
          return (s.fn = e), this.on(t, s), this;
        }),
        (A.prototype.off =
          A.prototype.removeListener =
          A.prototype.removeAllListeners =
          A.prototype.removeEventListener =
            function (t, e) {
              if (
                ((this._callbacks = this._callbacks || {}),
                0 == arguments.length)
              )
                return (this._callbacks = {}), this;
              var s,
                n = this._callbacks["$" + t];
              if (!n) return this;
              if (1 == arguments.length)
                return delete this._callbacks["$" + t], this;
              for (var i = 0; i < n.length; i++)
                if ((s = n[i]) === e || s.fn === e) {
                  n.splice(i, 1);
                  break;
                }
              return 0 === n.length && delete this._callbacks["$" + t], this;
            }),
        (A.prototype.emit = function (t) {
          this._callbacks = this._callbacks || {};
          for (
            var e = new Array(arguments.length - 1),
              s = this._callbacks["$" + t],
              n = 1;
            n < arguments.length;
            n++
          )
            e[n - 1] = arguments[n];
          if (s) {
            n = 0;
            for (var i = (s = s.slice(0)).length; n < i; ++n)
              s[n].apply(this, e);
          }
          return this;
        }),
        (A.prototype.emitReserved = A.prototype.emit),
        (A.prototype.listeners = function (t) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + t] || []
          );
        }),
        (A.prototype.hasListeners = function (t) {
          return !!this.listeners(t).length;
        });
      const T =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : Function("return this")();
      function C(t, ...e) {
        return e.reduce(
          (e, s) => (t.hasOwnProperty(s) && (e[s] = t[s]), e),
          {}
        );
      }
      const O = T.setTimeout,
        N = T.clearTimeout;
      function R(t, e) {
        e.useNativeTimers
          ? ((t.setTimeoutFn = O.bind(T)), (t.clearTimeoutFn = N.bind(T)))
          : ((t.setTimeoutFn = T.setTimeout.bind(T)),
            (t.clearTimeoutFn = T.clearTimeout.bind(T)));
      }
      class S extends Error {
        constructor(t, e, s) {
          super(t),
            (this.description = e),
            (this.context = s),
            (this.type = "TransportError");
        }
      }
      class L extends A {
        constructor(t) {
          super(),
            (this.writable = !1),
            R(this, t),
            (this.opts = t),
            (this.query = t.query),
            (this.socket = t.socket);
        }
        onError(t, e, s) {
          return super.emitReserved("error", new S(t, e, s)), this;
        }
        open() {
          return (this.readyState = "opening"), this.doOpen(), this;
        }
        close() {
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
              (this.doClose(), this.onClose()),
            this
          );
        }
        send(t) {
          "open" === this.readyState && this.write(t);
        }
        onOpen() {
          (this.readyState = "open"),
            (this.writable = !0),
            super.emitReserved("open");
        }
        onData(t) {
          const e = _(t, this.socket.binaryType);
          this.onPacket(e);
        }
        onPacket(t) {
          super.emitReserved("packet", t);
        }
        onClose(t) {
          (this.readyState = "closed"), super.emitReserved("close", t);
        }
        pause(t) {}
      }
      const x =
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
            ""
          ),
        B = 64,
        q = {};
      let P,
        j = 0,
        M = 0;
      function I(t) {
        let e = "";
        do {
          (e = x[t % B] + e), (t = Math.floor(t / B));
        } while (t > 0);
        return e;
      }
      function D() {
        const t = I(+new Date());
        return t !== P ? ((j = 0), (P = t)) : t + "." + I(j++);
      }
      for (; M < B; M++) q[x[M]] = M;
      function H(t) {
        let e = "";
        for (let s in t)
          t.hasOwnProperty(s) &&
            (e.length && (e += "&"),
            (e += encodeURIComponent(s) + "=" + encodeURIComponent(t[s])));
        return e;
      }
      let F = !1;
      try {
        F =
          "undefined" != typeof XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest();
      } catch (t) {}
      const V = F;
      function $(t) {
        const e = t.xdomain;
        try {
          if ("undefined" != typeof XMLHttpRequest && (!e || V))
            return new XMLHttpRequest();
        } catch (t) {}
        if (!e)
          try {
            return new T[["Active"].concat("Object").join("X")](
              "Microsoft.XMLHTTP"
            );
          } catch (t) {}
      }
      function U() {}
      const K = null != new $({ xdomain: !1 }).responseType;
      class Y extends A {
        constructor(t, e) {
          super(),
            R(this, e),
            (this.opts = e),
            (this.method = e.method || "GET"),
            (this.uri = t),
            (this.async = !1 !== e.async),
            (this.data = void 0 !== e.data ? e.data : null),
            this.create();
        }
        create() {
          const t = C(
            this.opts,
            "agent",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "autoUnref"
          );
          (t.xdomain = !!this.opts.xd), (t.xscheme = !!this.opts.xs);
          const e = (this.xhr = new $(t));
          try {
            e.open(this.method, this.uri, this.async);
            try {
              if (this.opts.extraHeaders) {
                e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0);
                for (let t in this.opts.extraHeaders)
                  this.opts.extraHeaders.hasOwnProperty(t) &&
                    e.setRequestHeader(t, this.opts.extraHeaders[t]);
              }
            } catch (t) {}
            if ("POST" === this.method)
              try {
                e.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
              } catch (t) {}
            try {
              e.setRequestHeader("Accept", "*/*");
            } catch (t) {}
            "withCredentials" in e &&
              (e.withCredentials = this.opts.withCredentials),
              this.opts.requestTimeout &&
                (e.timeout = this.opts.requestTimeout),
              (e.onreadystatechange = () => {
                4 === e.readyState &&
                  (200 === e.status || 1223 === e.status
                    ? this.onLoad()
                    : this.setTimeoutFn(() => {
                        this.onError(
                          "number" == typeof e.status ? e.status : 0
                        );
                      }, 0));
              }),
              e.send(this.data);
          } catch (t) {
            return void this.setTimeoutFn(() => {
              this.onError(t);
            }, 0);
          }
          "undefined" != typeof document &&
            ((this.index = Y.requestsCount++), (Y.requests[this.index] = this));
        }
        onError(t) {
          this.emitReserved("error", t, this.xhr), this.cleanup(!0);
        }
        cleanup(t) {
          if (void 0 !== this.xhr && null !== this.xhr) {
            if (((this.xhr.onreadystatechange = U), t))
              try {
                this.xhr.abort();
              } catch (t) {}
            "undefined" != typeof document && delete Y.requests[this.index],
              (this.xhr = null);
          }
        }
        onLoad() {
          const t = this.xhr.responseText;
          null !== t &&
            (this.emitReserved("data", t),
            this.emitReserved("success"),
            this.cleanup());
        }
        abort() {
          this.cleanup();
        }
      }
      function z() {
        for (let t in Y.requests)
          Y.requests.hasOwnProperty(t) && Y.requests[t].abort();
      }
      (Y.requestsCount = 0),
        (Y.requests = {}),
        "undefined" != typeof document &&
          ("function" == typeof attachEvent
            ? attachEvent("onunload", z)
            : "function" == typeof addEventListener &&
              addEventListener(
                "onpagehide" in T ? "pagehide" : "unload",
                z,
                !1
              ));
      const W =
          "function" == typeof Promise && "function" == typeof Promise.resolve
            ? (t) => Promise.resolve().then(t)
            : (t, e) => e(t, 0),
        J = T.WebSocket || T.MozWebSocket,
        Q =
          "undefined" != typeof navigator &&
          "string" == typeof navigator.product &&
          "reactnative" === navigator.product.toLowerCase(),
        X = {
          websocket: class extends L {
            constructor(t) {
              super(t), (this.supportsBinary = !t.forceBase64);
            }
            get name() {
              return "websocket";
            }
            doOpen() {
              if (!this.check()) return;
              const t = this.uri(),
                e = this.opts.protocols,
                s = Q
                  ? {}
                  : C(
                      this.opts,
                      "agent",
                      "perMessageDeflate",
                      "pfx",
                      "key",
                      "passphrase",
                      "cert",
                      "ca",
                      "ciphers",
                      "rejectUnauthorized",
                      "localAddress",
                      "protocolVersion",
                      "origin",
                      "maxPayload",
                      "family",
                      "checkServerIdentity"
                    );
              this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
              try {
                this.ws = Q ? new J(t, e, s) : e ? new J(t, e) : new J(t);
              } catch (t) {
                return this.emitReserved("error", t);
              }
              (this.ws.binaryType = this.socket.binaryType || "arraybuffer"),
                this.addEventListeners();
            }
            addEventListeners() {
              (this.ws.onopen = () => {
                this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
              }),
                (this.ws.onclose = (t) =>
                  this.onClose({
                    description: "websocket connection closed",
                    context: t,
                  })),
                (this.ws.onmessage = (t) => this.onData(t.data)),
                (this.ws.onerror = (t) => this.onError("websocket error", t));
            }
            write(t) {
              this.writable = !1;
              for (let e = 0; e < t.length; e++) {
                const s = t[e],
                  n = e === t.length - 1;
                m(s, this.supportsBinary, (t) => {
                  try {
                    this.ws.send(t);
                  } catch (t) {}
                  n &&
                    W(() => {
                      (this.writable = !0), this.emitReserved("drain");
                    }, this.setTimeoutFn);
                });
              }
            }
            doClose() {
              void 0 !== this.ws && (this.ws.close(), (this.ws = null));
            }
            uri() {
              let t = this.query || {};
              const e = this.opts.secure ? "wss" : "ws";
              let s = "";
              this.opts.port &&
                (("wss" === e && 443 !== Number(this.opts.port)) ||
                  ("ws" === e && 80 !== Number(this.opts.port))) &&
                (s = ":" + this.opts.port),
                this.opts.timestampRequests &&
                  (t[this.opts.timestampParam] = D()),
                this.supportsBinary || (t.b64 = 1);
              const n = H(t);
              return (
                e +
                "://" +
                (-1 !== this.opts.hostname.indexOf(":")
                  ? "[" + this.opts.hostname + "]"
                  : this.opts.hostname) +
                s +
                this.opts.path +
                (n.length ? "?" + n : "")
              );
            }
            check() {
              return !!J;
            }
          },
          polling: class extends L {
            constructor(t) {
              if (
                (super(t), (this.polling = !1), "undefined" != typeof location)
              ) {
                const e = "https:" === location.protocol;
                let s = location.port;
                s || (s = e ? "443" : "80"),
                  (this.xd =
                    ("undefined" != typeof location &&
                      t.hostname !== location.hostname) ||
                    s !== t.port),
                  (this.xs = t.secure !== e);
              }
              const e = t && t.forceBase64;
              this.supportsBinary = K && !e;
            }
            get name() {
              return "polling";
            }
            doOpen() {
              this.poll();
            }
            pause(t) {
              this.readyState = "pausing";
              const e = () => {
                (this.readyState = "paused"), t();
              };
              if (this.polling || !this.writable) {
                let t = 0;
                this.polling &&
                  (t++,
                  this.once("pollComplete", function () {
                    --t || e();
                  })),
                  this.writable ||
                    (t++,
                    this.once("drain", function () {
                      --t || e();
                    }));
              } else e();
            }
            poll() {
              (this.polling = !0), this.doPoll(), this.emitReserved("poll");
            }
            onData(t) {
              ((t, e) => {
                const s = t.split(E),
                  n = [];
                for (let t = 0; t < s.length; t++) {
                  const i = _(s[t], e);
                  if ((n.push(i), "error" === i.type)) break;
                }
                return n;
              })(t, this.socket.binaryType).forEach((t) => {
                if (
                  ("opening" === this.readyState &&
                    "open" === t.type &&
                    this.onOpen(),
                  "close" === t.type)
                )
                  return (
                    this.onClose({
                      description: "transport closed by the server",
                    }),
                    !1
                  );
                this.onPacket(t);
              }),
                "closed" !== this.readyState &&
                  ((this.polling = !1),
                  this.emitReserved("pollComplete"),
                  "open" === this.readyState && this.poll());
            }
            doClose() {
              const t = () => {
                this.write([{ type: "close" }]);
              };
              "open" === this.readyState ? t() : this.once("open", t);
            }
            write(t) {
              (this.writable = !1),
                ((t, e) => {
                  const s = t.length,
                    n = new Array(s);
                  let i = 0;
                  t.forEach((t, r) => {
                    m(t, !1, (t) => {
                      (n[r] = t), ++i === s && e(n.join(E));
                    });
                  });
                })(t, (t) => {
                  this.doWrite(t, () => {
                    (this.writable = !0), this.emitReserved("drain");
                  });
                });
            }
            uri() {
              let t = this.query || {};
              const e = this.opts.secure ? "https" : "http";
              let s = "";
              !1 !== this.opts.timestampRequests &&
                (t[this.opts.timestampParam] = D()),
                this.supportsBinary || t.sid || (t.b64 = 1),
                this.opts.port &&
                  (("https" === e && 443 !== Number(this.opts.port)) ||
                    ("http" === e && 80 !== Number(this.opts.port))) &&
                  (s = ":" + this.opts.port);
              const n = H(t);
              return (
                e +
                "://" +
                (-1 !== this.opts.hostname.indexOf(":")
                  ? "[" + this.opts.hostname + "]"
                  : this.opts.hostname) +
                s +
                this.opts.path +
                (n.length ? "?" + n : "")
              );
            }
            request(t = {}) {
              return (
                Object.assign(t, { xd: this.xd, xs: this.xs }, this.opts),
                new Y(this.uri(), t)
              );
            }
            doWrite(t, e) {
              const s = this.request({ method: "POST", data: t });
              s.on("success", e),
                s.on("error", (t, e) => {
                  this.onError("xhr post error", t, e);
                });
            }
            doPoll() {
              const t = this.request();
              t.on("data", this.onData.bind(this)),
                t.on("error", (t, e) => {
                  this.onError("xhr poll error", t, e);
                }),
                (this.pollXhr = t);
            }
          },
        },
        G =
          /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        Z = [
          "source",
          "protocol",
          "authority",
          "userInfo",
          "user",
          "password",
          "host",
          "port",
          "relative",
          "path",
          "directory",
          "file",
          "query",
          "anchor",
        ];
      function tt(t) {
        const e = t,
          s = t.indexOf("["),
          n = t.indexOf("]");
        -1 != s &&
          -1 != n &&
          (t =
            t.substring(0, s) +
            t.substring(s, n).replace(/:/g, ";") +
            t.substring(n, t.length));
        let i = G.exec(t || ""),
          r = {},
          o = 14;
        for (; o--; ) r[Z[o]] = i[o] || "";
        return (
          -1 != s &&
            -1 != n &&
            ((r.source = e),
            (r.host = r.host
              .substring(1, r.host.length - 1)
              .replace(/;/g, ":")),
            (r.authority = r.authority
              .replace("[", "")
              .replace("]", "")
              .replace(/;/g, ":")),
            (r.ipv6uri = !0)),
          (r.pathNames = (function (t, e) {
            const s = e.replace(/\/{2,9}/g, "/").split("/");
            return (
              ("/" != e.slice(0, 1) && 0 !== e.length) || s.splice(0, 1),
              "/" == e.slice(-1) && s.splice(s.length - 1, 1),
              s
            );
          })(0, r.path)),
          (r.queryKey = (function (t, e) {
            const s = {};
            return (
              e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, n) {
                e && (s[e] = n);
              }),
              s
            );
          })(0, r.query)),
          r
        );
      }
      class et extends A {
        constructor(t, e = {}) {
          super(),
            (this.writeBuffer = []),
            t && "object" == typeof t && ((e = t), (t = null)),
            t
              ? ((t = tt(t)),
                (e.hostname = t.host),
                (e.secure = "https" === t.protocol || "wss" === t.protocol),
                (e.port = t.port),
                t.query && (e.query = t.query))
              : e.host && (e.hostname = tt(e.host).host),
            R(this, e),
            (this.secure =
              null != e.secure
                ? e.secure
                : "undefined" != typeof location &&
                  "https:" === location.protocol),
            e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
            (this.hostname =
              e.hostname ||
              ("undefined" != typeof location
                ? location.hostname
                : "localhost")),
            (this.port =
              e.port ||
              ("undefined" != typeof location && location.port
                ? location.port
                : this.secure
                ? "443"
                : "80")),
            (this.transports = e.transports || ["polling", "websocket"]),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0),
            (this.opts = Object.assign(
              {
                path: "/engine.io",
                agent: !1,
                withCredentials: !1,
                upgrade: !0,
                timestampParam: "t",
                rememberUpgrade: !1,
                addTrailingSlash: !0,
                rejectUnauthorized: !0,
                perMessageDeflate: { threshold: 1024 },
                transportOptions: {},
                closeOnBeforeunload: !0,
              },
              e
            )),
            (this.opts.path =
              this.opts.path.replace(/\/$/, "") +
              (this.opts.addTrailingSlash ? "/" : "")),
            "string" == typeof this.opts.query &&
              (this.opts.query = (function (t) {
                let e = {},
                  s = t.split("&");
                for (let t = 0, n = s.length; t < n; t++) {
                  let n = s[t].split("=");
                  e[decodeURIComponent(n[0])] = decodeURIComponent(n[1]);
                }
                return e;
              })(this.opts.query)),
            (this.id = null),
            (this.upgrades = null),
            (this.pingInterval = null),
            (this.pingTimeout = null),
            (this.pingTimeoutTimer = null),
            "function" == typeof addEventListener &&
              (this.opts.closeOnBeforeunload &&
                ((this.beforeunloadEventListener = () => {
                  this.transport &&
                    (this.transport.removeAllListeners(),
                    this.transport.close());
                }),
                addEventListener(
                  "beforeunload",
                  this.beforeunloadEventListener,
                  !1
                )),
              "localhost" !== this.hostname &&
                ((this.offlineEventListener = () => {
                  this.onClose("transport close", {
                    description: "network connection lost",
                  });
                }),
                addEventListener("offline", this.offlineEventListener, !1))),
            this.open();
        }
        createTransport(t) {
          const e = Object.assign({}, this.opts.query);
          (e.EIO = 4), (e.transport = t), this.id && (e.sid = this.id);
          const s = Object.assign(
            {},
            this.opts.transportOptions[t],
            this.opts,
            {
              query: e,
              socket: this,
              hostname: this.hostname,
              secure: this.secure,
              port: this.port,
            }
          );
          return new X[t](s);
        }
        open() {
          let t;
          if (
            this.opts.rememberUpgrade &&
            et.priorWebsocketSuccess &&
            -1 !== this.transports.indexOf("websocket")
          )
            t = "websocket";
          else {
            if (0 === this.transports.length)
              return void this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
              }, 0);
            t = this.transports[0];
          }
          this.readyState = "opening";
          try {
            t = this.createTransport(t);
          } catch (t) {
            return this.transports.shift(), void this.open();
          }
          t.open(), this.setTransport(t);
        }
        setTransport(t) {
          this.transport && this.transport.removeAllListeners(),
            (this.transport = t),
            t
              .on("drain", this.onDrain.bind(this))
              .on("packet", this.onPacket.bind(this))
              .on("error", this.onError.bind(this))
              .on("close", (t) => this.onClose("transport close", t));
        }
        probe(t) {
          let e = this.createTransport(t),
            s = !1;
          et.priorWebsocketSuccess = !1;
          const n = () => {
            s ||
              (e.send([{ type: "ping", data: "probe" }]),
              e.once("packet", (t) => {
                if (!s)
                  if ("pong" === t.type && "probe" === t.data) {
                    if (
                      ((this.upgrading = !0),
                      this.emitReserved("upgrading", e),
                      !e)
                    )
                      return;
                    (et.priorWebsocketSuccess = "websocket" === e.name),
                      this.transport.pause(() => {
                        s ||
                          ("closed" !== this.readyState &&
                            (h(),
                            this.setTransport(e),
                            e.send([{ type: "upgrade" }]),
                            this.emitReserved("upgrade", e),
                            (e = null),
                            (this.upgrading = !1),
                            this.flush()));
                      });
                  } else {
                    const t = new Error("probe error");
                    (t.transport = e.name),
                      this.emitReserved("upgradeError", t);
                  }
              }));
          };
          function i() {
            s || ((s = !0), h(), e.close(), (e = null));
          }
          const r = (t) => {
            const s = new Error("probe error: " + t);
            (s.transport = e.name), i(), this.emitReserved("upgradeError", s);
          };
          function o() {
            r("transport closed");
          }
          function a() {
            r("socket closed");
          }
          function c(t) {
            e && t.name !== e.name && i();
          }
          const h = () => {
            e.removeListener("open", n),
              e.removeListener("error", r),
              e.removeListener("close", o),
              this.off("close", a),
              this.off("upgrading", c);
          };
          e.once("open", n),
            e.once("error", r),
            e.once("close", o),
            this.once("close", a),
            this.once("upgrading", c),
            e.open();
        }
        onOpen() {
          if (
            ((this.readyState = "open"),
            (et.priorWebsocketSuccess = "websocket" === this.transport.name),
            this.emitReserved("open"),
            this.flush(),
            "open" === this.readyState && this.opts.upgrade)
          ) {
            let t = 0;
            const e = this.upgrades.length;
            for (; t < e; t++) this.probe(this.upgrades[t]);
          }
        }
        onPacket(t) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          )
            switch (
              (this.emitReserved("packet", t),
              this.emitReserved("heartbeat"),
              t.type)
            ) {
              case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
              case "ping":
                this.resetPingTimeout(),
                  this.sendPacket("pong"),
                  this.emitReserved("ping"),
                  this.emitReserved("pong");
                break;
              case "error":
                const e = new Error("server error");
                (e.code = t.data), this.onError(e);
                break;
              case "message":
                this.emitReserved("data", t.data),
                  this.emitReserved("message", t.data);
            }
        }
        onHandshake(t) {
          this.emitReserved("handshake", t),
            (this.id = t.sid),
            (this.transport.query.sid = t.sid),
            (this.upgrades = this.filterUpgrades(t.upgrades)),
            (this.pingInterval = t.pingInterval),
            (this.pingTimeout = t.pingTimeout),
            (this.maxPayload = t.maxPayload),
            this.onOpen(),
            "closed" !== this.readyState && this.resetPingTimeout();
        }
        resetPingTimeout() {
          this.clearTimeoutFn(this.pingTimeoutTimer),
            (this.pingTimeoutTimer = this.setTimeoutFn(() => {
              this.onClose("ping timeout");
            }, this.pingInterval + this.pingTimeout)),
            this.opts.autoUnref && this.pingTimeoutTimer.unref();
        }
        onDrain() {
          this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length
              ? this.emitReserved("drain")
              : this.flush();
        }
        flush() {
          if (
            "closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length
          ) {
            const t = this.getWritablePackets();
            this.transport.send(t),
              (this.prevBufferLen = t.length),
              this.emitReserved("flush");
          }
        }
        getWritablePackets() {
          if (
            !(
              this.maxPayload &&
              "polling" === this.transport.name &&
              this.writeBuffer.length > 1
            )
          )
            return this.writeBuffer;
          let t = 1;
          for (let s = 0; s < this.writeBuffer.length; s++) {
            const n = this.writeBuffer[s].data;
            if (
              (n &&
                (t +=
                  "string" == typeof (e = n)
                    ? (function (t) {
                        let e = 0,
                          s = 0;
                        for (let n = 0, i = t.length; n < i; n++)
                          (e = t.charCodeAt(n)),
                            e < 128
                              ? (s += 1)
                              : e < 2048
                              ? (s += 2)
                              : e < 55296 || e >= 57344
                              ? (s += 3)
                              : (n++, (s += 4));
                        return s;
                      })(e)
                    : Math.ceil(1.33 * (e.byteLength || e.size))),
              s > 0 && t > this.maxPayload)
            )
              return this.writeBuffer.slice(0, s);
            t += 2;
          }
          var e;
          return this.writeBuffer;
        }
        write(t, e, s) {
          return this.sendPacket("message", t, e, s), this;
        }
        send(t, e, s) {
          return this.sendPacket("message", t, e, s), this;
        }
        sendPacket(t, e, s, n) {
          if (
            ("function" == typeof e && ((n = e), (e = void 0)),
            "function" == typeof s && ((n = s), (s = null)),
            "closing" === this.readyState || "closed" === this.readyState)
          )
            return;
          (s = s || {}).compress = !1 !== s.compress;
          const i = { type: t, data: e, options: s };
          this.emitReserved("packetCreate", i),
            this.writeBuffer.push(i),
            n && this.once("flush", n),
            this.flush();
        }
        close() {
          const t = () => {
              this.onClose("forced close"), this.transport.close();
            },
            e = () => {
              this.off("upgrade", e), this.off("upgradeError", e), t();
            },
            s = () => {
              this.once("upgrade", e), this.once("upgradeError", e);
            };
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
              ((this.readyState = "closing"),
              this.writeBuffer.length
                ? this.once("drain", () => {
                    this.upgrading ? s() : t();
                  })
                : this.upgrading
                ? s()
                : t()),
            this
          );
        }
        onError(t) {
          (et.priorWebsocketSuccess = !1),
            this.emitReserved("error", t),
            this.onClose("transport error", t);
        }
        onClose(t, e) {
          ("opening" !== this.readyState &&
            "open" !== this.readyState &&
            "closing" !== this.readyState) ||
            (this.clearTimeoutFn(this.pingTimeoutTimer),
            this.transport.removeAllListeners("close"),
            this.transport.close(),
            this.transport.removeAllListeners(),
            "function" == typeof removeEventListener &&
              (removeEventListener(
                "beforeunload",
                this.beforeunloadEventListener,
                !1
              ),
              removeEventListener("offline", this.offlineEventListener, !1)),
            (this.readyState = "closed"),
            (this.id = null),
            this.emitReserved("close", t, e),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0));
        }
        filterUpgrades(t) {
          const e = [];
          let s = 0;
          const n = t.length;
          for (; s < n; s++) ~this.transports.indexOf(t[s]) && e.push(t[s]);
          return e;
        }
      }
      (et.protocol = 4), et.protocol;
      const st = "function" == typeof ArrayBuffer,
        nt = (t) =>
          "function" == typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : t.buffer instanceof ArrayBuffer,
        it = Object.prototype.toString,
        rt =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === it.call(Blob)),
        ot =
          "function" == typeof File ||
          ("undefined" != typeof File &&
            "[object FileConstructor]" === it.call(File));
      function at(t) {
        return (
          (st && (t instanceof ArrayBuffer || nt(t))) ||
          (rt && t instanceof Blob) ||
          (ot && t instanceof File)
        );
      }
      function ct(t, e) {
        if (!t || "object" != typeof t) return !1;
        if (Array.isArray(t)) {
          for (let e = 0, s = t.length; e < s; e++) if (ct(t[e])) return !0;
          return !1;
        }
        if (at(t)) return !0;
        if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length)
          return ct(t.toJSON(), !0);
        for (const e in t)
          if (Object.prototype.hasOwnProperty.call(t, e) && ct(t[e])) return !0;
        return !1;
      }
      function ht(t) {
        const e = [],
          s = t.data,
          n = t;
        return (
          (n.data = pt(s, e)),
          (n.attachments = e.length),
          { packet: n, buffers: e }
        );
      }
      function pt(t, e) {
        if (!t) return t;
        if (at(t)) {
          const s = { _placeholder: !0, num: e.length };
          return e.push(t), s;
        }
        if (Array.isArray(t)) {
          const s = new Array(t.length);
          for (let n = 0; n < t.length; n++) s[n] = pt(t[n], e);
          return s;
        }
        if ("object" == typeof t && !(t instanceof Date)) {
          const s = {};
          for (const n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (s[n] = pt(t[n], e));
          return s;
        }
        return t;
      }
      function ut(t, e) {
        return (t.data = lt(t.data, e)), delete t.attachments, t;
      }
      function lt(t, e) {
        if (!t) return t;
        if (t && !0 === t._placeholder) {
          if ("number" == typeof t.num && t.num >= 0 && t.num < e.length)
            return e[t.num];
          throw new Error("illegal attachments");
        }
        if (Array.isArray(t))
          for (let s = 0; s < t.length; s++) t[s] = lt(t[s], e);
        else if ("object" == typeof t)
          for (const s in t)
            Object.prototype.hasOwnProperty.call(t, s) && (t[s] = lt(t[s], e));
        return t;
      }
      const dt = 5;
      var ft;
      !(function (t) {
        (t[(t.CONNECT = 0)] = "CONNECT"),
          (t[(t.DISCONNECT = 1)] = "DISCONNECT"),
          (t[(t.EVENT = 2)] = "EVENT"),
          (t[(t.ACK = 3)] = "ACK"),
          (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
          (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"),
          (t[(t.BINARY_ACK = 6)] = "BINARY_ACK");
      })(ft || (ft = {}));
      class yt {
        constructor(t) {
          this.replacer = t;
        }
        encode(t) {
          return (t.type !== ft.EVENT && t.type !== ft.ACK) || !ct(t)
            ? [this.encodeAsString(t)]
            : this.encodeAsBinary({
                type: t.type === ft.EVENT ? ft.BINARY_EVENT : ft.BINARY_ACK,
                nsp: t.nsp,
                data: t.data,
                id: t.id,
              });
        }
        encodeAsString(t) {
          let e = "" + t.type;
          return (
            (t.type !== ft.BINARY_EVENT && t.type !== ft.BINARY_ACK) ||
              (e += t.attachments + "-"),
            t.nsp && "/" !== t.nsp && (e += t.nsp + ","),
            null != t.id && (e += t.id),
            null != t.data && (e += JSON.stringify(t.data, this.replacer)),
            e
          );
        }
        encodeAsBinary(t) {
          const e = ht(t),
            s = this.encodeAsString(e.packet),
            n = e.buffers;
          return n.unshift(s), n;
        }
      }
      class mt extends A {
        constructor(t) {
          super(), (this.reviver = t);
        }
        add(t) {
          let e;
          if ("string" == typeof t) {
            if (this.reconstructor)
              throw new Error(
                "got plaintext data when reconstructing a packet"
              );
            e = this.decodeString(t);
            const s = e.type === ft.BINARY_EVENT;
            s || e.type === ft.BINARY_ACK
              ? ((e.type = s ? ft.EVENT : ft.ACK),
                (this.reconstructor = new gt(e)),
                0 === e.attachments && super.emitReserved("decoded", e))
              : super.emitReserved("decoded", e);
          } else {
            if (!at(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor)
              throw new Error(
                "got binary data when not reconstructing a packet"
              );
            (e = this.reconstructor.takeBinaryData(t)),
              e &&
                ((this.reconstructor = null), super.emitReserved("decoded", e));
          }
        }
        decodeString(t) {
          let e = 0;
          const s = { type: Number(t.charAt(0)) };
          if (void 0 === ft[s.type])
            throw new Error("unknown packet type " + s.type);
          if (s.type === ft.BINARY_EVENT || s.type === ft.BINARY_ACK) {
            const n = e + 1;
            for (; "-" !== t.charAt(++e) && e != t.length; );
            const i = t.substring(n, e);
            if (i != Number(i) || "-" !== t.charAt(e))
              throw new Error("Illegal attachments");
            s.attachments = Number(i);
          }
          if ("/" === t.charAt(e + 1)) {
            const n = e + 1;
            for (; ++e && "," !== t.charAt(e) && e !== t.length; );
            s.nsp = t.substring(n, e);
          } else s.nsp = "/";
          const n = t.charAt(e + 1);
          if ("" !== n && Number(n) == n) {
            const n = e + 1;
            for (; ++e; ) {
              const s = t.charAt(e);
              if (null == s || Number(s) != s) {
                --e;
                break;
              }
              if (e === t.length) break;
            }
            s.id = Number(t.substring(n, e + 1));
          }
          if (t.charAt(++e)) {
            const n = this.tryParse(t.substr(e));
            if (!mt.isPayloadValid(s.type, n))
              throw new Error("invalid payload");
            s.data = n;
          }
          return s;
        }
        tryParse(t) {
          try {
            return JSON.parse(t, this.reviver);
          } catch (t) {
            return !1;
          }
        }
        static isPayloadValid(t, e) {
          switch (t) {
            case ft.CONNECT:
              return "object" == typeof e;
            case ft.DISCONNECT:
              return void 0 === e;
            case ft.CONNECT_ERROR:
              return "string" == typeof e || "object" == typeof e;
            case ft.EVENT:
            case ft.BINARY_EVENT:
              return Array.isArray(e) && e.length > 0;
            case ft.ACK:
            case ft.BINARY_ACK:
              return Array.isArray(e);
          }
        }
        destroy() {
          this.reconstructor &&
            (this.reconstructor.finishedReconstruction(),
            (this.reconstructor = null));
        }
      }
      class gt {
        constructor(t) {
          (this.packet = t), (this.buffers = []), (this.reconPack = t);
        }
        takeBinaryData(t) {
          if (
            (this.buffers.push(t),
            this.buffers.length === this.reconPack.attachments)
          ) {
            const t = ut(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t;
          }
          return null;
        }
        finishedReconstruction() {
          (this.reconPack = null), (this.buffers = []);
        }
      }
      function bt(t, e, s) {
        return (
          t.on(e, s),
          function () {
            t.off(e, s);
          }
        );
      }
      const vt = Object.freeze({
        connect: 1,
        connect_error: 1,
        disconnect: 1,
        disconnecting: 1,
        newListener: 1,
        removeListener: 1,
      });
      class kt extends A {
        constructor(t, e, s) {
          super(),
            (this.connected = !1),
            (this.recovered = !1),
            (this.receiveBuffer = []),
            (this.sendBuffer = []),
            (this._queue = []),
            (this._queueSeq = 0),
            (this.ids = 0),
            (this.acks = {}),
            (this.flags = {}),
            (this.io = t),
            (this.nsp = e),
            s && s.auth && (this.auth = s.auth),
            (this._opts = Object.assign({}, s)),
            this.io._autoConnect && this.open();
        }
        get disconnected() {
          return !this.connected;
        }
        subEvents() {
          if (this.subs) return;
          const t = this.io;
          this.subs = [
            bt(t, "open", this.onopen.bind(this)),
            bt(t, "packet", this.onpacket.bind(this)),
            bt(t, "error", this.onerror.bind(this)),
            bt(t, "close", this.onclose.bind(this)),
          ];
        }
        get active() {
          return !!this.subs;
        }
        connect() {
          return (
            this.connected ||
              (this.subEvents(),
              this.io._reconnecting || this.io.open(),
              "open" === this.io._readyState && this.onopen()),
            this
          );
        }
        open() {
          return this.connect();
        }
        send(...t) {
          return t.unshift("message"), this.emit.apply(this, t), this;
        }
        emit(t, ...e) {
          if (vt.hasOwnProperty(t))
            throw new Error('"' + t.toString() + '" is a reserved event name');
          if (
            (e.unshift(t),
            this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
          )
            return this._addToQueue(e), this;
          const s = { type: ft.EVENT, data: e, options: {} };
          if (
            ((s.options.compress = !1 !== this.flags.compress),
            "function" == typeof e[e.length - 1])
          ) {
            const t = this.ids++,
              n = e.pop();
            this._registerAckCallback(t, n), (s.id = t);
          }
          const n =
            this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
          return (
            (this.flags.volatile && (!n || !this.connected)) ||
              (this.connected
                ? (this.notifyOutgoingListeners(s), this.packet(s))
                : this.sendBuffer.push(s)),
            (this.flags = {}),
            this
          );
        }
        _registerAckCallback(t, e) {
          var s;
          const n =
            null !== (s = this.flags.timeout) && void 0 !== s
              ? s
              : this._opts.ackTimeout;
          if (void 0 === n) return void (this.acks[t] = e);
          const i = this.io.setTimeoutFn(() => {
            delete this.acks[t];
            for (let e = 0; e < this.sendBuffer.length; e++)
              this.sendBuffer[e].id === t && this.sendBuffer.splice(e, 1);
            e.call(this, new Error("operation has timed out"));
          }, n);
          this.acks[t] = (...t) => {
            this.io.clearTimeoutFn(i), e.apply(this, [null, ...t]);
          };
        }
        emitWithAck(t, ...e) {
          const s =
            void 0 !== this.flags.timeout || void 0 !== this._opts.ackTimeout;
          return new Promise((n, i) => {
            e.push((t, e) => (s ? (t ? i(t) : n(e)) : n(t))),
              this.emit(t, ...e);
          });
        }
        _addToQueue(t) {
          let e;
          "function" == typeof t[t.length - 1] && (e = t.pop());
          const s = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: !1,
            args: t,
            flags: Object.assign({ fromQueue: !0 }, this.flags),
          };
          t.push((t, ...n) => {
            if (s === this._queue[0])
              return (
                null !== t
                  ? s.tryCount > this._opts.retries &&
                    (this._queue.shift(), e && e(t))
                  : (this._queue.shift(), e && e(null, ...n)),
                (s.pending = !1),
                this._drainQueue()
              );
          }),
            this._queue.push(s),
            this._drainQueue();
        }
        _drainQueue(t = !1) {
          if (!this.connected || 0 === this._queue.length) return;
          const e = this._queue[0];
          (e.pending && !t) ||
            ((e.pending = !0),
            e.tryCount++,
            (this.flags = e.flags),
            this.emit.apply(this, e.args));
        }
        packet(t) {
          (t.nsp = this.nsp), this.io._packet(t);
        }
        onopen() {
          "function" == typeof this.auth
            ? this.auth((t) => {
                this._sendConnectPacket(t);
              })
            : this._sendConnectPacket(this.auth);
        }
        _sendConnectPacket(t) {
          this.packet({
            type: ft.CONNECT,
            data: this._pid
              ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
              : t,
          });
        }
        onerror(t) {
          this.connected || this.emitReserved("connect_error", t);
        }
        onclose(t, e) {
          (this.connected = !1),
            delete this.id,
            this.emitReserved("disconnect", t, e);
        }
        onpacket(t) {
          if (t.nsp === this.nsp)
            switch (t.type) {
              case ft.CONNECT:
                t.data && t.data.sid
                  ? this.onconnect(t.data.sid, t.data.pid)
                  : this.emitReserved(
                      "connect_error",
                      new Error(
                        "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                      )
                    );
                break;
              case ft.EVENT:
              case ft.BINARY_EVENT:
                this.onevent(t);
                break;
              case ft.ACK:
              case ft.BINARY_ACK:
                this.onack(t);
                break;
              case ft.DISCONNECT:
                this.ondisconnect();
                break;
              case ft.CONNECT_ERROR:
                this.destroy();
                const e = new Error(t.data.message);
                (e.data = t.data.data), this.emitReserved("connect_error", e);
            }
        }
        onevent(t) {
          const e = t.data || [];
          null != t.id && e.push(this.ack(t.id)),
            this.connected
              ? this.emitEvent(e)
              : this.receiveBuffer.push(Object.freeze(e));
        }
        emitEvent(t) {
          if (this._anyListeners && this._anyListeners.length) {
            const e = this._anyListeners.slice();
            for (const s of e) s.apply(this, t);
          }
          super.emit.apply(this, t),
            this._pid &&
              t.length &&
              "string" == typeof t[t.length - 1] &&
              (this._lastOffset = t[t.length - 1]);
        }
        ack(t) {
          const e = this;
          let s = !1;
          return function (...n) {
            s || ((s = !0), e.packet({ type: ft.ACK, id: t, data: n }));
          };
        }
        onack(t) {
          const e = this.acks[t.id];
          "function" == typeof e &&
            (e.apply(this, t.data), delete this.acks[t.id]);
        }
        onconnect(t, e) {
          (this.id = t),
            (this.recovered = e && this._pid === e),
            (this._pid = e),
            (this.connected = !0),
            this.emitBuffered(),
            this.emitReserved("connect"),
            this._drainQueue(!0);
        }
        emitBuffered() {
          this.receiveBuffer.forEach((t) => this.emitEvent(t)),
            (this.receiveBuffer = []),
            this.sendBuffer.forEach((t) => {
              this.notifyOutgoingListeners(t), this.packet(t);
            }),
            (this.sendBuffer = []);
        }
        ondisconnect() {
          this.destroy(), this.onclose("io server disconnect");
        }
        destroy() {
          this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
            this.io._destroy(this);
        }
        disconnect() {
          return (
            this.connected && this.packet({ type: ft.DISCONNECT }),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
          );
        }
        close() {
          return this.disconnect();
        }
        compress(t) {
          return (this.flags.compress = t), this;
        }
        get volatile() {
          return (this.flags.volatile = !0), this;
        }
        timeout(t) {
          return (this.flags.timeout = t), this;
        }
        onAny(t) {
          return (
            (this._anyListeners = this._anyListeners || []),
            this._anyListeners.push(t),
            this
          );
        }
        prependAny(t) {
          return (
            (this._anyListeners = this._anyListeners || []),
            this._anyListeners.unshift(t),
            this
          );
        }
        offAny(t) {
          if (!this._anyListeners) return this;
          if (t) {
            const e = this._anyListeners;
            for (let s = 0; s < e.length; s++)
              if (t === e[s]) return e.splice(s, 1), this;
          } else this._anyListeners = [];
          return this;
        }
        listenersAny() {
          return this._anyListeners || [];
        }
        onAnyOutgoing(t) {
          return (
            (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
            this._anyOutgoingListeners.push(t),
            this
          );
        }
        prependAnyOutgoing(t) {
          return (
            (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
            this._anyOutgoingListeners.unshift(t),
            this
          );
        }
        offAnyOutgoing(t) {
          if (!this._anyOutgoingListeners) return this;
          if (t) {
            const e = this._anyOutgoingListeners;
            for (let s = 0; s < e.length; s++)
              if (t === e[s]) return e.splice(s, 1), this;
          } else this._anyOutgoingListeners = [];
          return this;
        }
        listenersAnyOutgoing() {
          return this._anyOutgoingListeners || [];
        }
        notifyOutgoingListeners(t) {
          if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const e = this._anyOutgoingListeners.slice();
            for (const s of e) s.apply(this, t.data);
          }
        }
      }
      function wt(t) {
        (t = t || {}),
          (this.ms = t.min || 100),
          (this.max = t.max || 1e4),
          (this.factor = t.factor || 2),
          (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
          (this.attempts = 0);
      }
      (wt.prototype.duration = function () {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var e = Math.random(),
            s = Math.floor(e * this.jitter * t);
          t = 0 == (1 & Math.floor(10 * e)) ? t - s : t + s;
        }
        return 0 | Math.min(t, this.max);
      }),
        (wt.prototype.reset = function () {
          this.attempts = 0;
        }),
        (wt.prototype.setMin = function (t) {
          this.ms = t;
        }),
        (wt.prototype.setMax = function (t) {
          this.max = t;
        }),
        (wt.prototype.setJitter = function (t) {
          this.jitter = t;
        });
      class _t extends A {
        constructor(e, s) {
          var n;
          super(),
            (this.nsps = {}),
            (this.subs = []),
            e && "object" == typeof e && ((s = e), (e = void 0)),
            ((s = s || {}).path = s.path || "/socket.io"),
            (this.opts = s),
            R(this, s),
            this.reconnection(!1 !== s.reconnection),
            this.reconnectionAttempts(s.reconnectionAttempts || 1 / 0),
            this.reconnectionDelay(s.reconnectionDelay || 1e3),
            this.reconnectionDelayMax(s.reconnectionDelayMax || 5e3),
            this.randomizationFactor(
              null !== (n = s.randomizationFactor) && void 0 !== n ? n : 0.5
            ),
            (this.backoff = new wt({
              min: this.reconnectionDelay(),
              max: this.reconnectionDelayMax(),
              jitter: this.randomizationFactor(),
            })),
            this.timeout(null == s.timeout ? 2e4 : s.timeout),
            (this._readyState = "closed"),
            (this.uri = e);
          const i = s.parser || t;
          (this.encoder = new i.Encoder()),
            (this.decoder = new i.Decoder()),
            (this._autoConnect = !1 !== s.autoConnect),
            this._autoConnect && this.open();
        }
        reconnection(t) {
          return arguments.length
            ? ((this._reconnection = !!t), this)
            : this._reconnection;
        }
        reconnectionAttempts(t) {
          return void 0 === t
            ? this._reconnectionAttempts
            : ((this._reconnectionAttempts = t), this);
        }
        reconnectionDelay(t) {
          var e;
          return void 0 === t
            ? this._reconnectionDelay
            : ((this._reconnectionDelay = t),
              null === (e = this.backoff) || void 0 === e || e.setMin(t),
              this);
        }
        randomizationFactor(t) {
          var e;
          return void 0 === t
            ? this._randomizationFactor
            : ((this._randomizationFactor = t),
              null === (e = this.backoff) || void 0 === e || e.setJitter(t),
              this);
        }
        reconnectionDelayMax(t) {
          var e;
          return void 0 === t
            ? this._reconnectionDelayMax
            : ((this._reconnectionDelayMax = t),
              null === (e = this.backoff) || void 0 === e || e.setMax(t),
              this);
        }
        timeout(t) {
          return arguments.length ? ((this._timeout = t), this) : this._timeout;
        }
        maybeReconnectOnOpen() {
          !this._reconnecting &&
            this._reconnection &&
            0 === this.backoff.attempts &&
            this.reconnect();
        }
        open(t) {
          if (~this._readyState.indexOf("open")) return this;
          this.engine = new et(this.uri, this.opts);
          const e = this.engine,
            s = this;
          (this._readyState = "opening"), (this.skipReconnect = !1);
          const n = bt(e, "open", function () {
              s.onopen(), t && t();
            }),
            i = bt(e, "error", (e) => {
              s.cleanup(),
                (s._readyState = "closed"),
                this.emitReserved("error", e),
                t ? t(e) : s.maybeReconnectOnOpen();
            });
          if (!1 !== this._timeout) {
            const t = this._timeout;
            0 === t && n();
            const s = this.setTimeoutFn(() => {
              n(), e.close(), e.emit("error", new Error("timeout"));
            }, t);
            this.opts.autoUnref && s.unref(),
              this.subs.push(function () {
                clearTimeout(s);
              });
          }
          return this.subs.push(n), this.subs.push(i), this;
        }
        connect(t) {
          return this.open(t);
        }
        onopen() {
          this.cleanup(),
            (this._readyState = "open"),
            this.emitReserved("open");
          const t = this.engine;
          this.subs.push(
            bt(t, "ping", this.onping.bind(this)),
            bt(t, "data", this.ondata.bind(this)),
            bt(t, "error", this.onerror.bind(this)),
            bt(t, "close", this.onclose.bind(this)),
            bt(this.decoder, "decoded", this.ondecoded.bind(this))
          );
        }
        onping() {
          this.emitReserved("ping");
        }
        ondata(t) {
          try {
            this.decoder.add(t);
          } catch (t) {
            this.onclose("parse error", t);
          }
        }
        ondecoded(t) {
          W(() => {
            this.emitReserved("packet", t);
          }, this.setTimeoutFn);
        }
        onerror(t) {
          this.emitReserved("error", t);
        }
        socket(t, e) {
          let s = this.nsps[t];
          return (
            s
              ? this._autoConnect && !s.active && s.connect()
              : ((s = new kt(this, t, e)), (this.nsps[t] = s)),
            s
          );
        }
        _destroy(t) {
          const e = Object.keys(this.nsps);
          for (const t of e) if (this.nsps[t].active) return;
          this._close();
        }
        _packet(t) {
          const e = this.encoder.encode(t);
          for (let s = 0; s < e.length; s++) this.engine.write(e[s], t.options);
        }
        cleanup() {
          this.subs.forEach((t) => t()),
            (this.subs.length = 0),
            this.decoder.destroy();
        }
        _close() {
          (this.skipReconnect = !0),
            (this._reconnecting = !1),
            this.onclose("forced close"),
            this.engine && this.engine.close();
        }
        disconnect() {
          return this._close();
        }
        onclose(t, e) {
          this.cleanup(),
            this.backoff.reset(),
            (this._readyState = "closed"),
            this.emitReserved("close", t, e),
            this._reconnection && !this.skipReconnect && this.reconnect();
        }
        reconnect() {
          if (this._reconnecting || this.skipReconnect) return this;
          const t = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            this.backoff.reset(),
              this.emitReserved("reconnect_failed"),
              (this._reconnecting = !1);
          else {
            const e = this.backoff.duration();
            this._reconnecting = !0;
            const s = this.setTimeoutFn(() => {
              t.skipReconnect ||
                (this.emitReserved("reconnect_attempt", t.backoff.attempts),
                t.skipReconnect ||
                  t.open((e) => {
                    e
                      ? ((t._reconnecting = !1),
                        t.reconnect(),
                        this.emitReserved("reconnect_error", e))
                      : t.onreconnect();
                  }));
            }, e);
            this.opts.autoUnref && s.unref(),
              this.subs.push(function () {
                clearTimeout(s);
              });
          }
        }
        onreconnect() {
          const t = this.backoff.attempts;
          (this._reconnecting = !1),
            this.backoff.reset(),
            this.emitReserved("reconnect", t);
        }
      }
      const Et = {};
      function At(t, e) {
        "object" == typeof t && ((e = t), (t = void 0));
        const s = (function (t, e = "", s) {
            let n = t;
            (s = s || ("undefined" != typeof location && location)),
              null == t && (t = s.protocol + "//" + s.host),
              "string" == typeof t &&
                ("/" === t.charAt(0) &&
                  (t = "/" === t.charAt(1) ? s.protocol + t : s.host + t),
                /^(https?|wss?):\/\//.test(t) ||
                  (t = void 0 !== s ? s.protocol + "//" + t : "https://" + t),
                (n = tt(t))),
              n.port ||
                (/^(http|ws)$/.test(n.protocol)
                  ? (n.port = "80")
                  : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
              (n.path = n.path || "/");
            const i = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
            return (
              (n.id = n.protocol + "://" + i + ":" + n.port + e),
              (n.href =
                n.protocol +
                "://" +
                i +
                (s && s.port === n.port ? "" : ":" + n.port)),
              n
            );
          })(t, (e = e || {}).path || "/socket.io"),
          n = s.source,
          i = s.id,
          r = s.path,
          o = Et[i] && r in Et[i].nsps;
        let a;
        return (
          e.forceNew || e["force new connection"] || !1 === e.multiplex || o
            ? (a = new _t(n, e))
            : (Et[i] || (Et[i] = new _t(n, e)), (a = Et[i])),
          s.query && !e.query && (e.query = s.queryKey),
          a.socket(s.path, e)
        );
      }
      Object.assign(At, { Manager: _t, Socket: kt, io: At, connect: At });
      var Tt = s(387),
        Ct = s.n(Tt),
        Ot = s(938),
        Nt = s.n(Ot),
        Rt = s(606);
      const St = At(),
        Lt = n()(),
        xt = Ct()(),
        Bt = document.querySelector("#chat #messages");
      St.on(
        Rt.CHAT_MESSAGE_RECEIVED + `:${Lt}`,
        ({ username: t, message: e, timestamp: s }) => {
          const n = document.createElement("div"),
            i = document.createElement("div"),
            r = document.createElement("p"),
            o = document.createElement("p"),
            a = document.createElement("p");
          (o.innerHTML = e),
            (r.innerHTML = s),
            (a.innerHTML = t),
            n.setAttribute("class", "text-message"),
            i.append(o, r),
            n.append(a, i),
            Bt.appendChild(n);
        }
      ),
        St.on(`deal:${Lt}:${xt}`, ({ hand: t, join_order: e }) => {
          const s = document.querySelector("#player"),
            n = document.querySelector("#draw-card"),
            i = document.createElement("p"),
            r = document.createElement("div"),
            o = r.cloneNode(),
            a = r.cloneNode(),
            c = r.cloneNode();
          (s.innerHTML = ""),
            (n.innerHTML = ""),
            o.setAttribute("class", "col"),
            a.setAttribute("class", "player-name"),
            c.setAttribute("class", "player-cards row"),
            i.append(`Player ${e}`),
            a.append(i);
          for (const e of t) c.append(Nt()(e));
          o.append(a, c),
            s.append(o),
            n.append(Nt()({ color: "black", value: "uno", id: 0 }));
          const h = document.querySelector("#start-game-btn-container");
          h && (h.style.display = "none");
        }),
        St.on(`game-state:${Lt}`, ({ play_card: t, hands: e }) => {
          const s = document.querySelector("#players"),
            n = document.querySelector("#play-card"),
            i = document.createElement("p"),
            r = document.createElement("div");
          (s.innerHTML = ""), (n.innerHTML = "");
          for (const { user_id: t, join_order: n, hands: o } of e) {
            if (t == xt) continue;
            const e = r.cloneNode(),
              a = r.cloneNode(),
              c = r.cloneNode(),
              h = i.cloneNode();
            e.setAttribute("class", "col"),
              a.setAttribute("class", "player-name"),
              c.setAttribute("class", "player-cards row"),
              h.append(`Player ${n}`),
              a.append(h);
            for (let t = 0; t < parseInt(o); t++)
              c.append(Nt()({ color: "black", value: "uno", id: 0 }));
            e.append(a, c), s.append(e);
          }
          n.appendChild(Nt()(t));
        }),
        St.on(`pick-color:${Lt}:${xt}`, ({ wildCards: t }) => {
          const e = document.querySelector("#color-picker");
          for (const s of t) {
            const t = document.createElement("div");
            t.setAttribute("class", `${s.color} color-picker`),
              t.setAttribute("data-card-id", s.id),
              e.append(t);
          }
        });
    })();
})();
