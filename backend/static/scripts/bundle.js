(() => {
  var t = {
      606: (t) => {
        t.exports = { CHAT_MESSAGE_RECEIVED: "chat-message-received" };
      },
      210: () => {
        const t = document.querySelector("#chat input#chat-input"),
          e = document.querySelector("#chat button#send-btn");
        t &&
          t.addEventListener("keydown", ({ target: t, keyCode: e }) => {
            if (13 !== e) return;
            const s = t.getAttribute("data-url"),
              n = t.value;
            (t.value = ""),
              fetch(s, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: n }),
              });
          }),
          e &&
            e.addEventListener("click", (e) => {
              const s = t.getAttribute("data-url"),
                n = t.value;
              (t.value = ""),
                fetch(s, {
                  method: "post",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ message: n }),
                });
            });
      },
      938: (t) => {
        t.exports = (t, e) => {
          const s = document.createElement("img"),
            n = document.createElement("div"),
            i = document.createElement("span");
          i.className = `card-${t}`;
          const r = n.cloneNode(),
            o = n.cloneNode(),
            a = n.cloneNode(),
            h = i.cloneNode(),
            c = i.cloneNode(),
            p = i.cloneNode();
          return (
            (r.className = "col"),
            (a.className = "label"),
            (o.className = "card card-" + e),
            (h.innerHTML = t),
            (c.innerHTML = t),
            (p.innerHTML = t),
            s.setAttribute("alt", "card"),
            s.setAttribute("src", "/images/card.png"),
            a.append(c),
            o.append(h, a, s, p),
            r.appendChild(o),
            r
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
          Decoder: () => ut,
          Encoder: () => pt,
          PacketType: () => ct,
          protocol: () => ht,
        }),
        s(210);
      var e = s(321),
        n = s.n(e);
      const i = document.querySelector("#start-game-btn");
      i &&
        i.addEventListener("click", (t) => {
          const e = n()();
          fetch(`/api/game/start/${e}`, { method: "POST" }).then((t) =>
            t.json()
          );
        });
      const r = Object.create(null);
      (r.open = "0"),
        (r.close = "1"),
        (r.ping = "2"),
        (r.pong = "3"),
        (r.message = "4"),
        (r.upgrade = "5"),
        (r.noop = "6");
      const o = Object.create(null);
      Object.keys(r).forEach((t) => {
        o[r[t]] = t;
      });
      const a = { type: "error", data: "parser error" },
        h =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" ===
              Object.prototype.toString.call(Blob)),
        c = "function" == typeof ArrayBuffer,
        p = (t, e) => {
          const s = new FileReader();
          return (
            (s.onload = function () {
              const t = s.result.split(",")[1];
              e("b" + (t || ""));
            }),
            s.readAsDataURL(t)
          );
        },
        u = ({ type: t, data: e }, s, n) => {
          return h && e instanceof Blob
            ? s
              ? n(e)
              : p(e, n)
            : c &&
              (e instanceof ArrayBuffer ||
                ((i = e),
                "function" == typeof ArrayBuffer.isView
                  ? ArrayBuffer.isView(i)
                  : i && i.buffer instanceof ArrayBuffer))
            ? s
              ? n(e)
              : p(new Blob([e]), n)
            : n(r[t] + (e || ""));
          var i;
        },
        l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        d = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256);
      for (let t = 0; t < l.length; t++) d[l.charCodeAt(t)] = t;
      const f = "function" == typeof ArrayBuffer,
        y = (t, e) => {
          if (f) {
            const s = ((t) => {
              let e,
                s,
                n,
                i,
                r,
                o = 0.75 * t.length,
                a = t.length,
                h = 0;
              "=" === t[t.length - 1] && (o--, "=" === t[t.length - 2] && o--);
              const c = new ArrayBuffer(o),
                p = new Uint8Array(c);
              for (e = 0; e < a; e += 4)
                (s = d[t.charCodeAt(e)]),
                  (n = d[t.charCodeAt(e + 1)]),
                  (i = d[t.charCodeAt(e + 2)]),
                  (r = d[t.charCodeAt(e + 3)]),
                  (p[h++] = (s << 2) | (n >> 4)),
                  (p[h++] = ((15 & n) << 4) | (i >> 2)),
                  (p[h++] = ((3 & i) << 6) | (63 & r));
              return c;
            })(t);
            return m(s, e);
          }
          return { base64: !0, data: t };
        },
        m = (t, e) =>
          "blob" === e && t instanceof ArrayBuffer ? new Blob([t]) : t,
        g = (t, e) => {
          if ("string" != typeof t) return { type: "message", data: m(t, e) };
          const s = t.charAt(0);
          return "b" === s
            ? { type: "message", data: y(t.substring(1), e) }
            : o[s]
            ? t.length > 1
              ? { type: o[s], data: t.substring(1) }
              : { type: o[s] }
            : a;
        },
        b = String.fromCharCode(30);
      function v(t) {
        if (t)
          return (function (t) {
            for (var e in v.prototype) t[e] = v.prototype[e];
            return t;
          })(t);
      }
      (v.prototype.on = v.prototype.addEventListener =
        function (t, e) {
          return (
            (this._callbacks = this._callbacks || {}),
            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
            this
          );
        }),
        (v.prototype.once = function (t, e) {
          function s() {
            this.off(t, s), e.apply(this, arguments);
          }
          return (s.fn = e), this.on(t, s), this;
        }),
        (v.prototype.off =
          v.prototype.removeListener =
          v.prototype.removeAllListeners =
          v.prototype.removeEventListener =
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
        (v.prototype.emit = function (t) {
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
        (v.prototype.emitReserved = v.prototype.emit),
        (v.prototype.listeners = function (t) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + t] || []
          );
        }),
        (v.prototype.hasListeners = function (t) {
          return !!this.listeners(t).length;
        });
      const k =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : Function("return this")();
      function _(t, ...e) {
        return e.reduce(
          (e, s) => (t.hasOwnProperty(s) && (e[s] = t[s]), e),
          {}
        );
      }
      const w = k.setTimeout,
        E = k.clearTimeout;
      function A(t, e) {
        e.useNativeTimers
          ? ((t.setTimeoutFn = w.bind(k)), (t.clearTimeoutFn = E.bind(k)))
          : ((t.setTimeoutFn = k.setTimeout.bind(k)),
            (t.clearTimeoutFn = k.clearTimeout.bind(k)));
      }
      class T extends Error {
        constructor(t, e, s) {
          super(t),
            (this.description = e),
            (this.context = s),
            (this.type = "TransportError");
        }
      }
      class O extends v {
        constructor(t) {
          super(),
            (this.writable = !1),
            A(this, t),
            (this.opts = t),
            (this.query = t.query),
            (this.socket = t.socket);
        }
        onError(t, e, s) {
          return super.emitReserved("error", new T(t, e, s)), this;
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
          const e = g(t, this.socket.binaryType);
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
      const C =
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
            ""
          ),
        R = 64,
        N = {};
      let S,
        x = 0,
        B = 0;
      function L(t) {
        let e = "";
        do {
          (e = C[t % R] + e), (t = Math.floor(t / R));
        } while (t > 0);
        return e;
      }
      function q() {
        const t = L(+new Date());
        return t !== S ? ((x = 0), (S = t)) : t + "." + L(x++);
      }
      for (; B < R; B++) N[C[B]] = B;
      function P(t) {
        let e = "";
        for (let s in t)
          t.hasOwnProperty(s) &&
            (e.length && (e += "&"),
            (e += encodeURIComponent(s) + "=" + encodeURIComponent(t[s])));
        return e;
      }
      let j = !1;
      try {
        j =
          "undefined" != typeof XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest();
      } catch (t) {}
      const I = j;
      function M(t) {
        const e = t.xdomain;
        try {
          if ("undefined" != typeof XMLHttpRequest && (!e || I))
            return new XMLHttpRequest();
        } catch (t) {}
        if (!e)
          try {
            return new k[["Active"].concat("Object").join("X")](
              "Microsoft.XMLHTTP"
            );
          } catch (t) {}
      }
      function D() {}
      const F = null != new M({ xdomain: !1 }).responseType;
      class H extends v {
        constructor(t, e) {
          super(),
            A(this, e),
            (this.opts = e),
            (this.method = e.method || "GET"),
            (this.uri = t),
            (this.async = !1 !== e.async),
            (this.data = void 0 !== e.data ? e.data : null),
            this.create();
        }
        create() {
          const t = _(
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
          const e = (this.xhr = new M(t));
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
            ((this.index = H.requestsCount++), (H.requests[this.index] = this));
        }
        onError(t) {
          this.emitReserved("error", t, this.xhr), this.cleanup(!0);
        }
        cleanup(t) {
          if (void 0 !== this.xhr && null !== this.xhr) {
            if (((this.xhr.onreadystatechange = D), t))
              try {
                this.xhr.abort();
              } catch (t) {}
            "undefined" != typeof document && delete H.requests[this.index],
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
      function V() {
        for (let t in H.requests)
          H.requests.hasOwnProperty(t) && H.requests[t].abort();
      }
      (H.requestsCount = 0),
        (H.requests = {}),
        "undefined" != typeof document &&
          ("function" == typeof attachEvent
            ? attachEvent("onunload", V)
            : "function" == typeof addEventListener &&
              addEventListener(
                "onpagehide" in k ? "pagehide" : "unload",
                V,
                !1
              ));
      const U =
          "function" == typeof Promise && "function" == typeof Promise.resolve
            ? (t) => Promise.resolve().then(t)
            : (t, e) => e(t, 0),
        K = k.WebSocket || k.MozWebSocket,
        Y =
          "undefined" != typeof navigator &&
          "string" == typeof navigator.product &&
          "reactnative" === navigator.product.toLowerCase(),
        $ = {
          websocket: class extends O {
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
                s = Y
                  ? {}
                  : _(
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
                this.ws = Y ? new K(t, e, s) : e ? new K(t, e) : new K(t);
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
                u(s, this.supportsBinary, (t) => {
                  try {
                    this.ws.send(t);
                  } catch (t) {}
                  n &&
                    U(() => {
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
                  (t[this.opts.timestampParam] = q()),
                this.supportsBinary || (t.b64 = 1);
              const n = P(t);
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
              return !!K;
            }
          },
          polling: class extends O {
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
              this.supportsBinary = F && !e;
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
                const s = t.split(b),
                  n = [];
                for (let t = 0; t < s.length; t++) {
                  const i = g(s[t], e);
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
                    u(t, !1, (t) => {
                      (n[r] = t), ++i === s && e(n.join(b));
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
                (t[this.opts.timestampParam] = q()),
                this.supportsBinary || t.sid || (t.b64 = 1),
                this.opts.port &&
                  (("https" === e && 443 !== Number(this.opts.port)) ||
                    ("http" === e && 80 !== Number(this.opts.port))) &&
                  (s = ":" + this.opts.port);
              const n = P(t);
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
                new H(this.uri(), t)
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
        z =
          /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        W = [
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
      function J(t) {
        const e = t,
          s = t.indexOf("["),
          n = t.indexOf("]");
        -1 != s &&
          -1 != n &&
          (t =
            t.substring(0, s) +
            t.substring(s, n).replace(/:/g, ";") +
            t.substring(n, t.length));
        let i = z.exec(t || ""),
          r = {},
          o = 14;
        for (; o--; ) r[W[o]] = i[o] || "";
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
      class Q extends v {
        constructor(t, e = {}) {
          super(),
            (this.writeBuffer = []),
            t && "object" == typeof t && ((e = t), (t = null)),
            t
              ? ((t = J(t)),
                (e.hostname = t.host),
                (e.secure = "https" === t.protocol || "wss" === t.protocol),
                (e.port = t.port),
                t.query && (e.query = t.query))
              : e.host && (e.hostname = J(e.host).host),
            A(this, e),
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
          return new $[t](s);
        }
        open() {
          let t;
          if (
            this.opts.rememberUpgrade &&
            Q.priorWebsocketSuccess &&
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
          Q.priorWebsocketSuccess = !1;
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
                    (Q.priorWebsocketSuccess = "websocket" === e.name),
                      this.transport.pause(() => {
                        s ||
                          ("closed" !== this.readyState &&
                            (c(),
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
            s || ((s = !0), c(), e.close(), (e = null));
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
          function h(t) {
            e && t.name !== e.name && i();
          }
          const c = () => {
            e.removeListener("open", n),
              e.removeListener("error", r),
              e.removeListener("close", o),
              this.off("close", a),
              this.off("upgrading", h);
          };
          e.once("open", n),
            e.once("error", r),
            e.once("close", o),
            this.once("close", a),
            this.once("upgrading", h),
            e.open();
        }
        onOpen() {
          if (
            ((this.readyState = "open"),
            (Q.priorWebsocketSuccess = "websocket" === this.transport.name),
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
          (Q.priorWebsocketSuccess = !1),
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
      (Q.protocol = 4), Q.protocol;
      const X = "function" == typeof ArrayBuffer,
        G = (t) =>
          "function" == typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : t.buffer instanceof ArrayBuffer,
        Z = Object.prototype.toString,
        tt =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === Z.call(Blob)),
        et =
          "function" == typeof File ||
          ("undefined" != typeof File &&
            "[object FileConstructor]" === Z.call(File));
      function st(t) {
        return (
          (X && (t instanceof ArrayBuffer || G(t))) ||
          (tt && t instanceof Blob) ||
          (et && t instanceof File)
        );
      }
      function nt(t, e) {
        if (!t || "object" != typeof t) return !1;
        if (Array.isArray(t)) {
          for (let e = 0, s = t.length; e < s; e++) if (nt(t[e])) return !0;
          return !1;
        }
        if (st(t)) return !0;
        if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length)
          return nt(t.toJSON(), !0);
        for (const e in t)
          if (Object.prototype.hasOwnProperty.call(t, e) && nt(t[e])) return !0;
        return !1;
      }
      function it(t) {
        const e = [],
          s = t.data,
          n = t;
        return (
          (n.data = rt(s, e)),
          (n.attachments = e.length),
          { packet: n, buffers: e }
        );
      }
      function rt(t, e) {
        if (!t) return t;
        if (st(t)) {
          const s = { _placeholder: !0, num: e.length };
          return e.push(t), s;
        }
        if (Array.isArray(t)) {
          const s = new Array(t.length);
          for (let n = 0; n < t.length; n++) s[n] = rt(t[n], e);
          return s;
        }
        if ("object" == typeof t && !(t instanceof Date)) {
          const s = {};
          for (const n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (s[n] = rt(t[n], e));
          return s;
        }
        return t;
      }
      function ot(t, e) {
        return (t.data = at(t.data, e)), delete t.attachments, t;
      }
      function at(t, e) {
        if (!t) return t;
        if (t && !0 === t._placeholder) {
          if ("number" == typeof t.num && t.num >= 0 && t.num < e.length)
            return e[t.num];
          throw new Error("illegal attachments");
        }
        if (Array.isArray(t))
          for (let s = 0; s < t.length; s++) t[s] = at(t[s], e);
        else if ("object" == typeof t)
          for (const s in t)
            Object.prototype.hasOwnProperty.call(t, s) && (t[s] = at(t[s], e));
        return t;
      }
      const ht = 5;
      var ct;
      !(function (t) {
        (t[(t.CONNECT = 0)] = "CONNECT"),
          (t[(t.DISCONNECT = 1)] = "DISCONNECT"),
          (t[(t.EVENT = 2)] = "EVENT"),
          (t[(t.ACK = 3)] = "ACK"),
          (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
          (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"),
          (t[(t.BINARY_ACK = 6)] = "BINARY_ACK");
      })(ct || (ct = {}));
      class pt {
        constructor(t) {
          this.replacer = t;
        }
        encode(t) {
          return (t.type !== ct.EVENT && t.type !== ct.ACK) || !nt(t)
            ? [this.encodeAsString(t)]
            : this.encodeAsBinary({
                type: t.type === ct.EVENT ? ct.BINARY_EVENT : ct.BINARY_ACK,
                nsp: t.nsp,
                data: t.data,
                id: t.id,
              });
        }
        encodeAsString(t) {
          let e = "" + t.type;
          return (
            (t.type !== ct.BINARY_EVENT && t.type !== ct.BINARY_ACK) ||
              (e += t.attachments + "-"),
            t.nsp && "/" !== t.nsp && (e += t.nsp + ","),
            null != t.id && (e += t.id),
            null != t.data && (e += JSON.stringify(t.data, this.replacer)),
            e
          );
        }
        encodeAsBinary(t) {
          const e = it(t),
            s = this.encodeAsString(e.packet),
            n = e.buffers;
          return n.unshift(s), n;
        }
      }
      class ut extends v {
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
            const s = e.type === ct.BINARY_EVENT;
            s || e.type === ct.BINARY_ACK
              ? ((e.type = s ? ct.EVENT : ct.ACK),
                (this.reconstructor = new lt(e)),
                0 === e.attachments && super.emitReserved("decoded", e))
              : super.emitReserved("decoded", e);
          } else {
            if (!st(t) && !t.base64) throw new Error("Unknown type: " + t);
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
          if (void 0 === ct[s.type])
            throw new Error("unknown packet type " + s.type);
          if (s.type === ct.BINARY_EVENT || s.type === ct.BINARY_ACK) {
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
            if (!ut.isPayloadValid(s.type, n))
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
            case ct.CONNECT:
              return "object" == typeof e;
            case ct.DISCONNECT:
              return void 0 === e;
            case ct.CONNECT_ERROR:
              return "string" == typeof e || "object" == typeof e;
            case ct.EVENT:
            case ct.BINARY_EVENT:
              return Array.isArray(e) && e.length > 0;
            case ct.ACK:
            case ct.BINARY_ACK:
              return Array.isArray(e);
          }
        }
        destroy() {
          this.reconstructor &&
            (this.reconstructor.finishedReconstruction(),
            (this.reconstructor = null));
        }
      }
      class lt {
        constructor(t) {
          (this.packet = t), (this.buffers = []), (this.reconPack = t);
        }
        takeBinaryData(t) {
          if (
            (this.buffers.push(t),
            this.buffers.length === this.reconPack.attachments)
          ) {
            const t = ot(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t;
          }
          return null;
        }
        finishedReconstruction() {
          (this.reconPack = null), (this.buffers = []);
        }
      }
      function dt(t, e, s) {
        return (
          t.on(e, s),
          function () {
            t.off(e, s);
          }
        );
      }
      const ft = Object.freeze({
        connect: 1,
        connect_error: 1,
        disconnect: 1,
        disconnecting: 1,
        newListener: 1,
        removeListener: 1,
      });
      class yt extends v {
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
            dt(t, "open", this.onopen.bind(this)),
            dt(t, "packet", this.onpacket.bind(this)),
            dt(t, "error", this.onerror.bind(this)),
            dt(t, "close", this.onclose.bind(this)),
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
          if (ft.hasOwnProperty(t))
            throw new Error('"' + t.toString() + '" is a reserved event name');
          if (
            (e.unshift(t),
            this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
          )
            return this._addToQueue(e), this;
          const s = { type: ct.EVENT, data: e, options: {} };
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
            type: ct.CONNECT,
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
              case ct.CONNECT:
                t.data && t.data.sid
                  ? this.onconnect(t.data.sid, t.data.pid)
                  : this.emitReserved(
                      "connect_error",
                      new Error(
                        "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                      )
                    );
                break;
              case ct.EVENT:
              case ct.BINARY_EVENT:
                this.onevent(t);
                break;
              case ct.ACK:
              case ct.BINARY_ACK:
                this.onack(t);
                break;
              case ct.DISCONNECT:
                this.ondisconnect();
                break;
              case ct.CONNECT_ERROR:
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
            s || ((s = !0), e.packet({ type: ct.ACK, id: t, data: n }));
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
            this.connected && this.packet({ type: ct.DISCONNECT }),
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
      function mt(t) {
        (t = t || {}),
          (this.ms = t.min || 100),
          (this.max = t.max || 1e4),
          (this.factor = t.factor || 2),
          (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
          (this.attempts = 0);
      }
      (mt.prototype.duration = function () {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var e = Math.random(),
            s = Math.floor(e * this.jitter * t);
          t = 0 == (1 & Math.floor(10 * e)) ? t - s : t + s;
        }
        return 0 | Math.min(t, this.max);
      }),
        (mt.prototype.reset = function () {
          this.attempts = 0;
        }),
        (mt.prototype.setMin = function (t) {
          this.ms = t;
        }),
        (mt.prototype.setMax = function (t) {
          this.max = t;
        }),
        (mt.prototype.setJitter = function (t) {
          this.jitter = t;
        });
      class gt extends v {
        constructor(e, s) {
          var n;
          super(),
            (this.nsps = {}),
            (this.subs = []),
            e && "object" == typeof e && ((s = e), (e = void 0)),
            ((s = s || {}).path = s.path || "/socket.io"),
            (this.opts = s),
            A(this, s),
            this.reconnection(!1 !== s.reconnection),
            this.reconnectionAttempts(s.reconnectionAttempts || 1 / 0),
            this.reconnectionDelay(s.reconnectionDelay || 1e3),
            this.reconnectionDelayMax(s.reconnectionDelayMax || 5e3),
            this.randomizationFactor(
              null !== (n = s.randomizationFactor) && void 0 !== n ? n : 0.5
            ),
            (this.backoff = new mt({
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
          this.engine = new Q(this.uri, this.opts);
          const e = this.engine,
            s = this;
          (this._readyState = "opening"), (this.skipReconnect = !1);
          const n = dt(e, "open", function () {
              s.onopen(), t && t();
            }),
            i = dt(e, "error", (e) => {
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
            dt(t, "ping", this.onping.bind(this)),
            dt(t, "data", this.ondata.bind(this)),
            dt(t, "error", this.onerror.bind(this)),
            dt(t, "close", this.onclose.bind(this)),
            dt(this.decoder, "decoded", this.ondecoded.bind(this))
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
          U(() => {
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
              : ((s = new yt(this, t, e)), (this.nsps[t] = s)),
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
      const bt = {};
      function vt(t, e) {
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
                (n = J(t))),
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
          o = bt[i] && r in bt[i].nsps;
        let a;
        return (
          e.forceNew || e["force new connection"] || !1 === e.multiplex || o
            ? (a = new gt(n, e))
            : (bt[i] || (bt[i] = new gt(n, e)), (a = bt[i])),
          s.query && !e.query && (e.query = s.queryKey),
          a.socket(s.path, e)
        );
      }
      Object.assign(vt, { Manager: gt, Socket: yt, io: vt, connect: vt });
      var kt = s(387),
        _t = s.n(kt),
        wt = s(938),
        Et = s.n(wt),
        At = s(606);
      const Tt = vt(),
        Ot = n()(),
        Ct = _t()(),
        Rt = document.querySelector("#chat #messages");
      Tt.on(
        At.CHAT_MESSAGE_RECEIVED + `:${Ot}`,
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
            Rt.appendChild(n);
        }
      ),
        Tt.on(`deal:${Ot}:${Ct}`, ({ hands: t }) => {
          const e = document.querySelector("#cards");
          for (const { value: s, color: n } of t) {
            const t = Et()(s, n);
            e.append(t);
          }
        });
    })();
})();
