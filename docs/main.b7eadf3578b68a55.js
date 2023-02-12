"use strict";
(self.webpackChunksgp_dev_angular =
  self.webpackChunksgp_dev_angular || []).push([
  [179],
  {
    709: () => {
      function ee(e) {
        return "function" == typeof e;
      }
      function fo(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ui = fo(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function ho(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ft {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ee(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Ui ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Kd(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Ui ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Ui(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Kd(t);
            else {
              if (t instanceof ft) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && ho(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && ho(n, t), t instanceof ft && t._removeParent(this);
        }
      }
      ft.EMPTY = (() => {
        const e = new ft();
        return (e.closed = !0), e;
      })();
      const qd = ft.EMPTY;
      function Wd(e) {
        return (
          e instanceof ft ||
          (e && "closed" in e && ee(e.remove) && ee(e.add) && ee(e.unsubscribe))
        );
      }
      function Kd(e) {
        ee(e) ? e() : e.unsubscribe();
      }
      const Ln = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        zi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = zi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = zi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Zd(e) {
        zi.setTimeout(() => {
          const { onUnhandledError: t } = Ln;
          if (!t) throw e;
          t(e);
        });
      }
      function Xd() {}
      const J2 = Qa("C", void 0, void 0);
      function Qa(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Bn = null;
      function Gi(e) {
        if (Ln.useDeprecatedSynchronousErrorHandling) {
          const t = !Bn;
          if ((t && (Bn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Bn;
            if (((Bn = null), n)) throw r;
          }
        } else e();
      }
      class Ya extends ft {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Wd(t) && t.add(this))
              : (this.destination = sy);
        }
        static create(t, n, r) {
          return new po(t, n, r);
        }
        next(t) {
          this.isStopped
            ? el(
                (function ty(e) {
                  return Qa("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? el(
                (function ey(e) {
                  return Qa("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? el(J2, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const ry = Function.prototype.bind;
      function Ja(e, t) {
        return ry.call(e, t);
      }
      class oy {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              qi(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              qi(r);
            }
          else qi(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              qi(n);
            }
        }
      }
      class po extends Ya {
        constructor(t, n, r) {
          let o;
          if ((super(), ee(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Ln.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Ja(t.next, i),
                  error: t.error && Ja(t.error, i),
                  complete: t.complete && Ja(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new oy(o);
        }
      }
      function qi(e) {
        Ln.useDeprecatedSynchronousErrorHandling
          ? (function ny(e) {
              Ln.useDeprecatedSynchronousErrorHandling &&
                Bn &&
                ((Bn.errorThrown = !0), (Bn.error = e));
            })(e)
          : Zd(e);
      }
      function el(e, t) {
        const { onStoppedNotification: n } = Ln;
        n && zi.setTimeout(() => n(e, t));
      }
      const sy = {
          closed: !0,
          next: Xd,
          error: function iy(e) {
            throw e;
          },
          complete: Xd,
        },
        tl =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function jn(e) {
        return e;
      }
      function Qd(e) {
        return 0 === e.length
          ? jn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let fe = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function cy(e) {
              return (
                (e && e instanceof Ya) ||
                ((function ly(e) {
                  return e && ee(e.next) && ee(e.error) && ee(e.complete);
                })(e) &&
                  Wd(e))
              );
            })(n)
              ? n
              : new po(n, r, o);
            return (
              Gi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Yd(r))((o, i) => {
              const s = new po({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [tl]() {
            return this;
          }
          pipe(...n) {
            return Qd(n)(this);
          }
          toPromise(n) {
            return new (n = Yd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Yd(e) {
        var t;
        return null !== (t = e ?? Ln.Promise) && void 0 !== t ? t : Promise;
      }
      const uy = fo(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Lt = (() => {
        class e extends fe {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Jd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new uy();
          }
          next(n) {
            Gi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Gi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Gi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? qd
              : ((this.currentObservers = null),
                i.push(n),
                new ft(() => {
                  (this.currentObservers = null), ho(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new fe();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Jd(t, n)), e;
      })();
      class Jd extends Lt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : qd;
        }
      }
      function ef(e) {
        return ee(e?.lift);
      }
      function Oe(e) {
        return (t) => {
          if (ef(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ie(e, t, n, r, o) {
        return new dy(e, t, n, r, o);
      }
      class dy extends Ya {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function V(e, t) {
        return Oe((n, r) => {
          let o = 0;
          n.subscribe(
            Ie(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Hn(e) {
        return this instanceof Hn ? ((this.v = e), this) : new Hn(e);
      }
      function py(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, g) {
                i.push([f, h, p, g]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function l(f) {
              f.value instanceof Hn
                ? Promise.resolve(f.value.v).then(c, u)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function c(f) {
          a("next", f);
        }
        function u(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function gy(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function rf(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const sf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function af(e) {
        return ee(e?.then);
      }
      function lf(e) {
        return ee(e[tl]);
      }
      function cf(e) {
        return Symbol.asyncIterator && ee(e?.[Symbol.asyncIterator]);
      }
      function uf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const df = (function vy() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function ff(e) {
        return ee(e?.[df]);
      }
      function hf(e) {
        return py(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Hn(n.read());
              if (o) return yield Hn(void 0);
              yield yield Hn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function pf(e) {
        return ee(e?.getReader);
      }
      function bt(e) {
        if (e instanceof fe) return e;
        if (null != e) {
          if (lf(e))
            return (function yy(e) {
              return new fe((t) => {
                const n = e[tl]();
                if (ee(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (sf(e))
            return (function wy(e) {
              return new fe((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (af(e))
            return (function xy(e) {
              return new fe((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Zd);
              });
            })(e);
          if (cf(e)) return gf(e);
          if (ff(e))
            return (function Dy(e) {
              return new fe((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (pf(e))
            return (function Cy(e) {
              return gf(hf(e));
            })(e);
        }
        throw uf(e);
      }
      function gf(e) {
        return new fe((t) => {
          (function _y(e, t) {
            var n, r, o, i;
            return (function fy(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(u) {
                  try {
                    c(r.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(r.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? i(u.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(u.value).then(a, l);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = gy(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Yt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Ne(e, t, n = 1 / 0) {
        return ee(t)
          ? Ne((r, o) => V((i, s) => t(r, i, o, s))(bt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Oe((r, o) =>
              (function by(e, t, n, r, o, i, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !c && t.complete();
                  },
                  h = (g) => (c < r ? p(g) : l.push(g)),
                  p = (g) => {
                    i && t.next(g), c++;
                    let m = !1;
                    bt(n(g, u++)).subscribe(
                      Ie(
                        t,
                        (y) => {
                          o?.(y), i ? h(y) : t.next(y);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (c--; l.length && c < r; ) {
                                const y = l.shift();
                                s ? Yt(t, s, () => p(y)) : p(y);
                              }
                              f();
                            } catch (y) {
                              t.error(y);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ie(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function ar(e = 1 / 0) {
        return Ne(jn, e);
      }
      const Bt = new fe((e) => e.complete());
      function rl(e) {
        return e[e.length - 1];
      }
      function mf(e) {
        return ee(rl(e)) ? e.pop() : void 0;
      }
      function go(e) {
        return (function My(e) {
          return e && ee(e.schedule);
        })(rl(e))
          ? e.pop()
          : void 0;
      }
      function vf(e, t = 0) {
        return Oe((n, r) => {
          n.subscribe(
            Ie(
              r,
              (o) => Yt(r, e, () => r.next(o), t),
              () => Yt(r, e, () => r.complete(), t),
              (o) => Yt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function yf(e, t = 0) {
        return Oe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function wf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new fe((n) => {
          Yt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Yt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Te(e, t) {
        return t
          ? (function Oy(e, t) {
              if (null != e) {
                if (lf(e))
                  return (function Iy(e, t) {
                    return bt(e).pipe(yf(t), vf(t));
                  })(e, t);
                if (sf(e))
                  return (function Ay(e, t) {
                    return new fe((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (af(e))
                  return (function Ty(e, t) {
                    return bt(e).pipe(yf(t), vf(t));
                  })(e, t);
                if (cf(e)) return wf(e, t);
                if (ff(e))
                  return (function Py(e, t) {
                    return new fe((n) => {
                      let r;
                      return (
                        Yt(n, t, () => {
                          (r = e[df]()),
                            Yt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ee(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (pf(e))
                  return (function Ry(e, t) {
                    return wf(hf(e), t);
                  })(e, t);
              }
              throw uf(e);
            })(e, t)
          : bt(e);
      }
      function xf(e = {}) {
        const {
          connector: t = () => new Lt(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            l,
            c = 0,
            u = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = l = void 0), (u = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return Oe((g, m) => {
            c++, !d && !u && f();
            const y = (l = l ?? t());
            m.add(() => {
              c--, 0 === c && !d && !u && (a = ol(p, o));
            }),
              y.subscribe(m),
              !s &&
                c > 0 &&
                ((s = new po({
                  next: (D) => y.next(D),
                  error: (D) => {
                    (d = !0), f(), (a = ol(h, n, D)), y.error(D);
                  },
                  complete: () => {
                    (u = !0), f(), (a = ol(h, r)), y.complete();
                  },
                })),
                bt(g).subscribe(s));
          })(i);
        };
      }
      function ol(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new po({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function ne(e) {
        for (let t in e) if (e[t] === ne) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function oe(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(oe).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function sl(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Fy = ne({ __forward_ref__: ne });
      function al(e) {
        return (
          (e.__forward_ref__ = al),
          (e.toString = function () {
            return oe(this());
          }),
          e
        );
      }
      function O(e) {
        return ll(e) ? e() : e;
      }
      function ll(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(Fy) &&
          e.__forward_ref__ === al
        );
      }
      function cl(e) {
        return e && !!e.ɵproviders;
      }
      const Df = "https://g.co/ng/security#xss";
      class x extends Error {
        constructor(t, n) {
          super(
            (function Wi(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function L(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Ki(e, t) {
        throw new x(-201, !1);
      }
      function ht(e, t) {
        null == e &&
          (function Y(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function M(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function pt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Zi(e) {
        return Cf(e, Xi) || Cf(e, bf);
      }
      function Cf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function _f(e) {
        return e && (e.hasOwnProperty(ul) || e.hasOwnProperty(zy))
          ? e[ul]
          : null;
      }
      const Xi = ne({ ɵprov: ne }),
        ul = ne({ ɵinj: ne }),
        bf = ne({ ngInjectableDef: ne }),
        zy = ne({ ngInjectorDef: ne });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let dl;
      function gt(e) {
        const t = dl;
        return (dl = e), t;
      }
      function Ef(e, t, n) {
        const r = Zi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & N.Optional
          ? null
          : void 0 !== t
          ? t
          : void Ki(oe(e));
      }
      const ie = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        mo = {},
        fl = "__NG_DI_FLAG__",
        Qi = "ngTempTokenPath",
        Wy = /\n/gm,
        Mf = "__source";
      let vo;
      function lr(e) {
        const t = vo;
        return (vo = e), t;
      }
      function Zy(e, t = N.Default) {
        if (void 0 === vo) throw new x(-203, !1);
        return null === vo
          ? Ef(e, void 0, t)
          : vo.get(e, t & N.Optional ? null : void 0, t);
      }
      function _(e, t = N.Default) {
        return (
          (function Gy() {
            return dl;
          })() || Zy
        )(O(e), t);
      }
      function G(e, t = N.Default) {
        return _(e, Yi(t));
      }
      function Yi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function hl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = O(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new x(900, !1);
            let o,
              i = N.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = Xy(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            t.push(_(o, i));
          } else t.push(_(r));
        }
        return t;
      }
      function yo(e, t) {
        return (e[fl] = t), (e.prototype[fl] = t), e;
      }
      function Xy(e) {
        return e[fl];
      }
      function Cn(e) {
        return { toString: e }.toString();
      }
      var Et = (() => (
          ((Et = Et || {})[(Et.OnPush = 0)] = "OnPush"),
          (Et[(Et.Default = 1)] = "Default"),
          Et
        ))(),
        jt = (() => {
          return (
            ((e = jt || (jt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            jt
          );
          var e;
        })();
      const Jt = {},
        X = [],
        Ji = ne({ ɵcmp: ne }),
        pl = ne({ ɵdir: ne }),
        gl = ne({ ɵpipe: ne }),
        If = ne({ ɵmod: ne }),
        en = ne({ ɵfac: ne }),
        wo = ne({ __NG_ELEMENT_ID__: ne });
      let Jy = 0;
      function ze(e) {
        return Cn(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Et.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || X,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || jt.Emulated,
              id: "c" + Jy++,
              styles: e.styles || X,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
              findHostDirectiveDefs: null,
              hostDirectives: null,
            },
            i = e.dependencies,
            s = e.features;
          return (
            (o.inputs = Pf(e.inputs, r)),
            (o.outputs = Pf(e.outputs)),
            s && s.forEach((a) => a(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Tf).filter(Af)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(We).filter(Af)
              : null),
            o
          );
        });
      }
      function Tf(e) {
        return J(e) || Be(e);
      }
      function Af(e) {
        return null !== e;
      }
      function Mt(e) {
        return Cn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || X,
          declarations: e.declarations || X,
          imports: e.imports || X,
          exports: e.exports || X,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Pf(e, t) {
        if (null == e) return Jt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const Ge = ze;
      function qe(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function J(e) {
        return e[Ji] || null;
      }
      function Be(e) {
        return e[pl] || null;
      }
      function We(e) {
        return e[gl] || null;
      }
      function ot(e, t) {
        const n = e[If] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${oe(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const z = 11;
      function it(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function It(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function yl(e) {
        return 0 != (4 & e.flags);
      }
      function _o(e) {
        return e.componentOffset > -1;
      }
      function os(e) {
        return 1 == (1 & e.flags);
      }
      function Tt(e) {
        return null !== e.template;
      }
      function nw(e) {
        return 0 != (256 & e[2]);
      }
      function $n(e, t) {
        return e.hasOwnProperty(en) ? e[en] : null;
      }
      class iw {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function _n() {
        return Lf;
      }
      function Lf(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = aw), sw;
      }
      function sw() {
        const e = jf(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Jt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function aw(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            jf(e) ||
            (function lw(e, t) {
              return (e[Bf] = t);
            })(e, { previous: Jt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          l = a[o];
        (s[o] = new iw(l && l.currentValue, t, a === Jt)), (e[r] = t);
      }
      _n.ngInherit = !0;
      const Bf = "__ngSimpleChanges__";
      function jf(e) {
        return e[Bf] || null;
      }
      function Fe(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function is(e, t) {
        return Fe(t[e]);
      }
      function st(e, t) {
        return Fe(t[e.index]);
      }
      function $f(e, t) {
        return e.data[t];
      }
      function at(e, t) {
        const n = t[e];
        return it(n) ? n : n[0];
      }
      function ss(e) {
        return 64 == (64 & e[2]);
      }
      function bn(e, t) {
        return null == t ? null : e[t];
      }
      function Uf(e) {
        e[18] = 0;
      }
      function xl(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const B = { lFrame: Jf(null), bindingsEnabled: !0 };
      function Gf() {
        return B.bindingsEnabled;
      }
      function w() {
        return B.lFrame.lView;
      }
      function K() {
        return B.lFrame.tView;
      }
      function as(e) {
        return (B.lFrame.contextLView = e), e[8];
      }
      function ls(e) {
        return (B.lFrame.contextLView = null), e;
      }
      function ke() {
        let e = qf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function qf() {
        return B.lFrame.currentTNode;
      }
      function Vt(e, t) {
        const n = B.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Dl() {
        return B.lFrame.isParent;
      }
      function Cl() {
        B.lFrame.isParent = !1;
      }
      function gr() {
        return B.lFrame.bindingIndex++;
      }
      function rn(e) {
        const t = B.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function Dw(e, t) {
        const n = B.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), _l(t);
      }
      function _l(e) {
        B.lFrame.currentDirectiveIndex = e;
      }
      function El(e) {
        B.lFrame.currentQueryIndex = e;
      }
      function _w(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function Qf(e, t, n) {
        if (n & N.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & N.Host ||
              ((o = _w(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (B.lFrame = Yf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Ml(e) {
        const t = Yf(),
          n = e[1];
        (B.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Yf() {
        const e = B.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Jf(e) : t;
      }
      function Jf(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function eh() {
        const e = B.lFrame;
        return (
          (B.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const th = eh;
      function Sl() {
        const e = eh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Xe() {
        return B.lFrame.selectedIndex;
      }
      function Un(e) {
        B.lFrame.selectedIndex = e;
      }
      function ue() {
        const e = B.lFrame;
        return $f(e.tView, e.selectedIndex);
      }
      function cs(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
            c &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, c),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, c)),
            null != u && (e.destroyHooks || (e.destroyHooks = [])).push(n, u);
        }
      }
      function us(e, t, n) {
        nh(e, t, 3, n);
      }
      function ds(e, t, n, r) {
        (3 & e[2]) === n && nh(e, t, n, r);
      }
      function Il(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function nh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[18] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (Rw(e, n, t, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++;
      }
      function Rw(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class Eo {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Al(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            oh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function rh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function oh(e) {
        return 64 === e.charCodeAt(0);
      }
      function Mo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  ih(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function ih(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function sh(e) {
        return -1 !== e;
      }
      function fs(e) {
        return 32767 & e;
      }
      function hs(e, t) {
        let n = (function kw(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Pl = !0;
      function ps(e) {
        const t = Pl;
        return (Pl = e), t;
      }
      let Lw = 0;
      const $t = {};
      function gs(e, t) {
        const n = ch(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Rl(r.data, e),
          Rl(t, null),
          Rl(r.blueprint, null));
        const o = Ol(e, t),
          i = e.injectorIndex;
        if (sh(o)) {
          const s = fs(o),
            a = hs(o, t),
            l = a[1].data;
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | l[s + c];
        }
        return (t[i + 8] = o), i;
      }
      function Rl(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function ch(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ol(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = mh(o)), null === r)) return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Nl(e, t, n) {
        !(function Bw(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(wo) && (r = n[wo]),
            null == r && (r = n[wo] = Lw++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function uh(e, t, n) {
        if (n & N.Optional || void 0 !== e) return e;
        Ki();
      }
      function dh(e, t, n, r) {
        if (
          (n & N.Optional && void 0 === r && (r = null),
          !(n & (N.Self | N.Host)))
        ) {
          const o = e[9],
            i = gt(void 0);
          try {
            return o ? o.get(t, r, n & N.Optional) : Ef(t, r, n & N.Optional);
          } finally {
            gt(i);
          }
        }
        return uh(r, 0, n);
      }
      function fh(e, t, n, r = N.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function Uw(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = hh(i, s, n, r | N.Self, $t);
                if (a !== $t) return a;
                let l = i.parent;
                if (!l) {
                  const c = s[21];
                  if (c) {
                    const u = c.get(n, $t, r);
                    if (u !== $t) return u;
                  }
                  (l = mh(s)), (s = s[15]);
                }
                i = l;
              }
              return o;
            })(e, t, n, r, $t);
            if (s !== $t) return s;
          }
          const i = hh(e, t, n, r, $t);
          if (i !== $t) return i;
        }
        return dh(t, n, r, o);
      }
      function hh(e, t, n, r, o) {
        const i = (function Vw(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(wo) ? e[wo] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : $w) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Qf(t, e, r)) return r & N.Host ? uh(o, 0, r) : dh(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & N.Optional) return s;
            Ki();
          } finally {
            th();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = ch(e, t),
            l = -1,
            c = r & N.Host ? t[16][6] : null;
          for (
            (-1 === a || r & N.SkipSelf) &&
            ((l = -1 === a ? Ol(e, t) : t[a + 8]),
            -1 !== l && gh(r, !1)
              ? ((s = t[1]), (a = fs(l)), (t = hs(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = t[1];
            if (ph(i, a, u.data)) {
              const d = Hw(a, t, n, s, r, c);
              if (d !== $t) return d;
            }
            (l = t[a + 8]),
              -1 !== l && gh(r, t[1].data[a + 8] === c) && ph(i, a, t)
                ? ((s = u), (a = fs(l)), (t = hs(l, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function Hw(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          u = (function ms(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              l = e.directiveStart,
              u = i >> 20,
              f = o ? a + u : e.directiveEnd;
            for (let h = r ? a : a + u; h < f; h++) {
              const p = s[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (o) {
              const h = s[l];
              if (h && Tt(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? _o(a) && Pl : r != s && 0 != (3 & a.type),
            o & N.Host && i === a
          );
        return null !== u ? zn(t, s, u, a) : $t;
      }
      function zn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function Ow(e) {
            return e instanceof Eo;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function ky(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new x(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Q(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : L(e);
              })(i[n])
            );
          const a = ps(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? gt(s.injectImpl) : null;
          Qf(e, r, N.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function Pw(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Lf(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && gt(l), ps(a), (s.resolving = !1), th();
          }
        }
        return o;
      }
      function ph(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function gh(e, t) {
        return !(e & N.Self || (e & N.Host && t));
      }
      class vr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return fh(this._tNode, this._lView, t, Yi(r), n);
        }
      }
      function $w() {
        return new vr(ke(), w());
      }
      function So(e) {
        return Cn(() => {
          const t = e.prototype.constructor,
            n = t[en] || Fl(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[en] || Fl(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function Fl(e) {
        return ll(e)
          ? () => {
              const t = Fl(O(e));
              return t && t();
            }
          : $n(e);
      }
      function mh(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const wr = "__parameters__";
      function Dr(e, t, n) {
        return Cn(() => {
          const r = (function kl(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(wr)
                ? l[wr]
                : Object.defineProperty(l, wr, { value: [] })[wr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), l;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class S {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = M({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Gn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Gn(n, t) : t(n)));
      }
      function yh(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function ys(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function Ao(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      function lt(e, t, n) {
        let r = Cr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function Ww(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Bl(e, t) {
        const n = Cr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Cr(e, t) {
        return (function wh(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const Po = yo(Dr("Optional"), 8),
        Ro = yo(Dr("SkipSelf"), 4);
      var et = (() => (
        ((et = et || {})[(et.Important = 1)] = "Important"),
        (et[(et.DashCase = 2)] = "DashCase"),
        et
      ))();
      const zl = new Map();
      let gx = 0;
      const ql = "__ngContext__";
      function Ve(e, t) {
        it(t)
          ? ((e[ql] = t[20]),
            (function vx(e) {
              zl.set(e[20], e);
            })(t))
          : (e[ql] = t);
      }
      function Kl(e, t) {
        return undefined(e, t);
      }
      function ko(e) {
        const t = e[3];
        return It(t) ? t[3] : t;
      }
      function Zl(e) {
        return jh(e[13]);
      }
      function Xl(e) {
        return jh(e[4]);
      }
      function jh(e) {
        for (; null !== e && !It(e); ) e = e[4];
        return e;
      }
      function br(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          It(r) ? (i = r) : it(r) && ((s = !0), (r = r[0]));
          const a = Fe(r);
          0 === e && null !== n
            ? null == o
              ? Gh(t, n, a)
              : qn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? qn(t, n, a, o || null, !0)
            : 2 === e
            ? (function rc(e, t, n) {
                const r = Cs(e, t);
                r &&
                  (function Lx(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function Hx(e, t, n, r, o) {
                const i = n[7];
                i !== Fe(n) && br(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  Lo(l[1], l, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Yl(e, t, n) {
        return e.createElement(t, n);
      }
      function Vh(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        512 & t[2] && ((t[2] &= -513), xl(o, -1)), n.splice(r, 1);
      }
      function Jl(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && Vh(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = ys(e, 10 + t);
          !(function Tx(e, t) {
            Lo(e, t, t[z], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function $h(e, t) {
        if (!(128 & t[2])) {
          const n = t[z];
          n.destroyNode && Lo(e, t, n, 3, null, null),
            (function Rx(e) {
              let t = e[13];
              if (!t) return ec(e[1], e);
              for (; t; ) {
                let n = null;
                if (it(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    it(t) && ec(t[1], t), (t = t[3]);
                  null === t && (t = e), it(t) && ec(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function ec(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function kx(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Eo)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function Fx(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[z].destroy();
          const n = t[17];
          if (null !== n && It(t[3])) {
            n !== t[3] && Vh(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function yx(e) {
            zl.delete(e[20]);
          })(t);
        }
      }
      function Uh(e, t, n) {
        return (function zh(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === jt.None || i === jt.Emulated) return null;
            }
            return st(r, n);
          }
        })(e, t.parent, n);
      }
      function qn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Gh(e, t, n) {
        e.appendChild(t, n);
      }
      function qh(e, t, n, r, o) {
        null !== r ? qn(e, t, n, r, o) : Gh(e, t, n);
      }
      function Cs(e, t) {
        return e.parentNode(t);
      }
      function Wh(e, t, n) {
        return Zh(e, t, n);
      }
      let Es,
        sc,
        Ms,
        Zh = function Kh(e, t, n) {
          return 40 & e.type ? st(e, n) : null;
        };
      function _s(e, t, n, r) {
        const o = Uh(e, r, t),
          i = t[z],
          a = Wh(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) qh(i, o, n[l], a, !1);
          else qh(i, o, n, a, !1);
      }
      function bs(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return st(t, e);
          if (4 & n) return nc(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return bs(e, r);
            {
              const o = e[t.index];
              return It(o) ? nc(-1, o) : Fe(o);
            }
          }
          if (32 & n) return Kl(t, e)() || Fe(e[t.index]);
          {
            const r = Qh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : bs(ko(e[16]), r)
              : bs(e, t.next);
          }
        }
        return null;
      }
      function Qh(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function nc(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return bs(r, o);
        }
        return t[7];
      }
      function oc(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && Ve(Fe(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & l) oc(e, t, n.child, r, o, i, !1), br(t, e, o, a, i);
            else if (32 & l) {
              const c = Kl(n, r);
              let u;
              for (; (u = c()); ) br(t, e, o, u, i);
              br(t, e, o, a, i);
            } else 16 & l ? Yh(e, t, r, n, o, i) : br(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Lo(e, t, n, r, o, i) {
        oc(n, r, e.firstChild, t, o, i, !1);
      }
      function Yh(e, t, n, r, o, i) {
        const s = n[16],
          l = s[6].projection[r.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) br(t, e, o, l[c], i);
        else oc(e, t, l, s[3], o, i, !0);
      }
      function Jh(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function ep(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Al(e, t, r),
          null !== o && Jh(e, t, o),
          null !== i &&
            (function $x(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      function Wn(e) {
        return (
          (function ic() {
            if (void 0 === Es && ((Es = null), ie.trustedTypes))
              try {
                Es = ie.trustedTypes.createPolicy("angular", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Es;
          })()?.createHTML(e) || e
        );
      }
      function np(e) {
        return (
          (function ac() {
            if (void 0 === Ms && ((Ms = null), ie.trustedTypes))
              try {
                Ms = ie.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Ms;
          })()?.createHTML(e) || e
        );
      }
      class ip {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Df})`;
        }
      }
      function En(e) {
        return e instanceof ip ? e.changingThisBreaksApplicationSecurity : e;
      }
      function Bo(e, t) {
        const n = (function Yx(e) {
          return (e instanceof ip && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${Df})`);
        }
        return n === t;
      }
      class Jx {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const n = new window.DOMParser().parseFromString(
              Wn(t),
              "text/html"
            ).body;
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class eD {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            null == this.inertDocument.body)
          ) {
            const n = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(n);
            const r = this.inertDocument.createElement("body");
            n.appendChild(r);
          }
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement("template");
          if ("content" in n) return (n.innerHTML = Wn(t)), n;
          const r = this.inertDocument.createElement("body");
          return (
            (r.innerHTML = Wn(t)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(r),
            r
          );
        }
        stripCustomNsAttrs(t) {
          const n = t.attributes;
          for (let o = n.length - 1; 0 < o; o--) {
            const s = n.item(o).name;
            ("xmlns:ns1" === s || 0 === s.indexOf("ns1:")) &&
              t.removeAttribute(s);
          }
          let r = t.firstChild;
          for (; r; )
            r.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(r),
              (r = r.nextSibling);
        }
      }
      const nD =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      function lc(e) {
        return (e = String(e)).match(nD) ? e : "unsafe:" + e;
      }
      function on(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function jo(...e) {
        const t = {};
        for (const n of e)
          for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const ap = on("area,br,col,hr,img,wbr"),
        lp = on("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        cp = on("rp,rt"),
        cc = jo(
          ap,
          jo(
            lp,
            on(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          jo(
            cp,
            on(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          jo(cp, lp)
        ),
        uc = on("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        up = jo(
          uc,
          on(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          on(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        rD = on("script,style,template");
      class oD {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let o = this.checkClobberedElement(n, n.nextSibling);
                if (o) {
                  n = o;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase();
          if (!cc.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !rD.hasOwnProperty(n);
          this.buf.push("<"), this.buf.push(n);
          const r = t.attributes;
          for (let o = 0; o < r.length; o++) {
            const i = r.item(o),
              s = i.name,
              a = s.toLowerCase();
            if (!up.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = i.value;
            uc[a] && (l = lc(l)), this.buf.push(" ", s, '="', dp(l), '"');
          }
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          cc.hasOwnProperty(n) &&
            !ap.hasOwnProperty(n) &&
            (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(dp(t));
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return n;
        }
      }
      const iD = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        sD = /([^\#-~ |!])/g;
      function dp(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(iD, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(sD, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Ss;
      function dc(e) {
        return "content" in e &&
          (function lD(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      var De = (() => (
        ((De = De || {})[(De.NONE = 0)] = "NONE"),
        (De[(De.HTML = 1)] = "HTML"),
        (De[(De.STYLE = 2)] = "STYLE"),
        (De[(De.SCRIPT = 3)] = "SCRIPT"),
        (De[(De.URL = 4)] = "URL"),
        (De[(De.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        De
      ))();
      function fp(e) {
        const t = Ho();
        return t
          ? np(t.sanitize(De.HTML, e) || "")
          : Bo(e, "HTML")
          ? np(En(e))
          : (function aD(e, t) {
              let n = null;
              try {
                Ss =
                  Ss ||
                  (function sp(e) {
                    const t = new eD(e);
                    return (function tD() {
                      try {
                        return !!new window.DOMParser().parseFromString(
                          Wn(""),
                          "text/html"
                        );
                      } catch {
                        return !1;
                      }
                    })()
                      ? new Jx(t)
                      : t;
                  })(e);
                let r = t ? String(t) : "";
                n = Ss.getInertBodyElement(r);
                let o = 5,
                  i = r;
                do {
                  if (0 === o)
                    throw new Error(
                      "Failed to sanitize html because the input is unstable"
                    );
                  o--,
                    (r = i),
                    (i = n.innerHTML),
                    (n = Ss.getInertBodyElement(r));
                } while (r !== i);
                return Wn(new oD().sanitizeChildren(dc(n) || n));
              } finally {
                if (n) {
                  const r = dc(n) || n;
                  for (; r.firstChild; ) r.removeChild(r.firstChild);
                }
              }
            })(
              (function tp() {
                return void 0 !== sc
                  ? sc
                  : typeof document < "u"
                  ? document
                  : void 0;
              })(),
              L(e)
            );
      }
      function sn(e) {
        const t = Ho();
        return t
          ? t.sanitize(De.URL, e) || ""
          : Bo(e, "URL")
          ? En(e)
          : lc(L(e));
      }
      function Ho() {
        const e = w();
        return e && e[12];
      }
      const Is = new S("ENVIRONMENT_INITIALIZER"),
        gp = new S("INJECTOR", -1),
        mp = new S("INJECTOR_DEF_TYPES");
      class vp {
        get(t, n = mo) {
          if (n === mo) {
            const r = new Error(`NullInjectorError: No provider for ${oe(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function gD(...e) {
        return { ɵproviders: yp(0, e), ɵfromNgModule: !0 };
      }
      function yp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Gn(t, (i) => {
            const s = i;
            fc(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && wp(o, n),
          n
        );
      }
      function wp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          hc(o, (i) => {
            t.push(i);
          });
        }
      }
      function fc(e, t, n, r) {
        if (!(e = O(e))) return !1;
        let o = null,
          i = _f(e);
        const s = !i && J(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const l = e.ngModule;
          if (((i = _f(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of l) fc(c, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                Gn(i.imports, (u) => {
                  fc(u, t, n, r) && (c || (c = []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && wp(c, t);
            }
            if (!a) {
              const c = $n(o) || (() => new o());
              t.push(
                { provide: o, useFactory: c, deps: X },
                { provide: mp, useValue: o, multi: !0 },
                { provide: Is, useValue: () => _(o), multi: !0 }
              );
            }
            const l = i.providers;
            null == l ||
              a ||
              hc(l, (u) => {
                t.push(u);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function hc(e, t) {
        for (let n of e)
          cl(n) && (n = n.ɵproviders), Array.isArray(n) ? hc(n, t) : t(n);
      }
      const mD = ne({ provide: String, useValue: ne });
      function pc(e) {
        return null !== e && "object" == typeof e && mD in e;
      }
      function Kn(e) {
        return "function" == typeof e;
      }
      const gc = new S("Set Injector scope."),
        Ts = {},
        yD = {};
      let mc;
      function As() {
        return void 0 === mc && (mc = new vp()), mc;
      }
      class Ut {}
      class Cp extends Ut {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            yc(t, (s) => this.processProvider(s)),
            this.records.set(gp, Er(void 0, this)),
            o.has("environment") && this.records.set(Ut, Er(void 0, this));
          const i = this.records.get(gc);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(mp.multi, X, N.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = lr(this),
            r = gt(void 0);
          try {
            return t();
          } finally {
            lr(n), gt(r);
          }
        }
        get(t, n = mo, r = N.Default) {
          this.assertNotDestroyed(), (r = Yi(r));
          const o = lr(this),
            i = gt(void 0);
          try {
            if (!(r & N.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function _D(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof S)
                    );
                  })(t) && Zi(t);
                (a = l && this.injectableDefInScope(l) ? Er(vc(t), Ts) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & N.Self ? As() : this.parent).get(
              t,
              (n = r & N.Optional && n === mo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Qi] = s[Qi] || []).unshift(oe(t)), o)) throw s;
              return (function Qy(e, t, n, r) {
                const o = e[Qi];
                throw (
                  (t[Mf] && o.unshift(t[Mf]),
                  (e.message = (function Yy(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = oe(t);
                    if (Array.isArray(t)) o = t.map(oe).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : oe(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      Wy,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Qi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            gt(i), lr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = lr(this),
            n = gt(void 0);
          try {
            const r = this.get(Is.multi, X, N.Self);
            for (const o of r) o();
          } finally {
            lr(t), gt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(oe(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new x(205, !1);
        }
        processProvider(t) {
          let n = Kn((t = O(t))) ? t : O(t && t.provide);
          const r = (function xD(e) {
            return pc(e)
              ? Er(void 0, e.useValue)
              : Er(
                  (function _p(e, t, n) {
                    let r;
                    if (Kn(e)) {
                      const o = O(e);
                      return $n(o) || vc(o);
                    }
                    if (pc(e)) r = () => O(e.useValue);
                    else if (
                      (function Dp(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...hl(e.deps || []));
                    else if (
                      (function xp(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => _(O(e.useExisting));
                    else {
                      const o = O(e && (e.useClass || e.provide));
                      if (
                        !(function DD(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return $n(o) || vc(o);
                      r = () => new o(...hl(e.deps));
                    }
                    return r;
                  })(e),
                  Ts
                );
          })(t);
          if (Kn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Er(void 0, Ts, !0)),
              (o.factory = () => hl(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Ts && ((n.value = yD), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function CD(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = O(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function vc(e) {
        const t = Zi(e),
          n = null !== t ? t.factory : $n(e);
        if (null !== n) return n;
        if (e instanceof S) throw new x(204, !1);
        if (e instanceof Function)
          return (function wD(e) {
            const t = e.length;
            if (t > 0) throw (Ao(t, "?"), new x(204, !1));
            const n = (function $y(e) {
              const t = e && (e[Xi] || e[bf]);
              if (t) {
                const n = (function Uy(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new x(204, !1);
      }
      function Er(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function yc(e, t) {
        for (const n of e)
          Array.isArray(n) ? yc(n, t) : n && cl(n) ? yc(n.ɵproviders, t) : t(n);
      }
      class bD {}
      class bp {}
      class MD {
        resolveComponentFactory(t) {
          throw (function ED(e) {
            const t = Error(
              `No component factory found for ${oe(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Vo = (() => {
        class e {}
        return (e.NULL = new MD()), e;
      })();
      function SD() {
        return Mr(ke(), w());
      }
      function Mr(e, t) {
        return new an(st(e, t));
      }
      let an = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = SD), e;
      })();
      class Mp {}
      let AD = (() => {
        class e {}
        return (
          (e.ɵprov = M({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class Rs {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const PD = new Rs("15.1.3"),
        wc = {};
      function Dc(e) {
        return e.ngOriginalError;
      }
      class Sr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Dc(t);
          for (; n && Dc(n); ) n = Dc(n);
          return n || null;
        }
      }
      function ln(e) {
        return e instanceof Function ? e() : e;
      }
      function Ip(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Tp = "ng-template";
      function $D(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== Ip(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Ap(e) {
        return 4 === e.type && e.value !== Tp;
      }
      function UD(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Tp);
      }
      function zD(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function WD(e) {
            for (let t = 0; t < e.length; t++) if (rh(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !UD(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (At(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!$D(e.attrs, c, n)) {
                    if (At(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = GD(8 & r ? "class" : l, o, Ap(e), n);
                if (-1 === d) {
                  if (At(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Ip(h, c, 0)) || (2 & r && c !== f)) {
                    if (At(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !At(r) && !At(l)) return !1;
            if (s && At(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return At(r) || s;
      }
      function At(e) {
        return 0 == (1 & e);
      }
      function GD(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function KD(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Pp(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (zD(e, t[r], n)) return !0;
        return !1;
      }
      function ZD(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Rp(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function XD(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !At(s) && ((t += Rp(i, o)), (o = "")),
              (r = s),
              (i = i || !At(r));
          n++;
        }
        return "" !== o && (t += Rp(i, o)), t;
      }
      const j = {};
      function F(e) {
        Op(K(), w(), Xe() + e, !1);
      }
      function Op(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && us(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && ds(t, i, 0, n);
          }
        Un(n);
      }
      function Lp(e, t = null, n = null, r) {
        const o = Bp(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Bp(e, t = null, n = null, r, o = new Set()) {
        const i = [n || X, gD(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : oe(e))),
          new Cp(i, t || As(), r || null, o)
        );
      }
      let zt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Lp({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Lp({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = mo),
          (e.NULL = new vp()),
          (e.ɵprov = M({ token: e, providedIn: "any", factory: () => _(gp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function I(e, t = N.Default) {
        const n = w();
        return null === n ? _(e, t) : fh(ke(), n, O(e), t);
      }
      function qp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              El(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ns(e, t, n, r, o, i, s, a, l, c, u) {
        const d = t.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== u || (e && 1024 & e[2])) && (d[2] |= 1024),
          Uf(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[z] = a || (e && e[z])),
          (d[12] = l || (e && e[12]) || null),
          (d[9] = c || (e && e[9]) || null),
          (d[6] = i),
          (d[20] = (function mx() {
            return gx++;
          })()),
          (d[21] = u),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function Ar(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Mc(e, t, n, r, o) {
            const i = qf(),
              s = Dl(),
              l = (e.data[t] = (function CC(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && (i.next = l)),
              l
            );
          })(e, t, n, r, o)),
            (function xw() {
              return B.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function bo() {
            const e = B.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Vt(i, !0), i;
      }
      function $o(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Sc(e, t, n) {
        Ml(t);
        try {
          const r = e.viewQuery;
          null !== r && Lc(1, r, n);
          const o = e.template;
          null !== o && Wp(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && qp(e, t),
            e.staticViewQueries && Lc(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function wC(e, t) {
              for (let n = 0; n < t.length; n++) VC(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Sl();
        }
      }
      function Fs(e, t, n, r) {
        const o = t[2];
        if (128 != (128 & o)) {
          Ml(t);
          try {
            Uf(t),
              (function Kf(e) {
                return (B.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Wp(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && us(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && ds(t, c, 0, null), Il(t, 0);
            }
            if (
              ((function jC(e) {
                for (let t = Zl(e); null !== t; t = Xl(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[2] || xl(o[3], 1), (o[2] |= 512);
                  }
                }
              })(t),
              (function BC(e) {
                for (let t = Zl(e); null !== t; t = Xl(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    ss(r) && Fs(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && qp(e, t),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && us(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && ds(t, c, 1), Il(t, 1);
            }
            !(function vC(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Un(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      Dw(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Un(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function yC(e, t) {
                for (let n = 0; n < t.length; n++) HC(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && Lc(2, l, r), s)) {
              const c = e.viewCheckHooks;
              null !== c && us(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && ds(t, c, 2), Il(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), xl(t[3], -1));
          } finally {
            Sl();
          }
        }
      }
      function Wp(e, t, n, r, o) {
        const i = Xe(),
          s = 2 & r;
        try {
          Un(-1), s && t.length > 22 && Op(e, t, 22, !1), n(r, o);
        } finally {
          Un(i);
        }
      }
      function Ic(e, t, n) {
        if (yl(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Tc(e, t, n) {
        Gf() &&
          ((function IC(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            _o(n) &&
              (function FC(e, t, n) {
                const r = st(t, e),
                  o = Kp(n),
                  i = e[10],
                  s = ks(
                    e,
                    Ns(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || gs(n, t),
              Ve(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const l = e.data[a],
                c = zn(t, e, a, n);
              Ve(c, t),
                null !== s && kC(0, a - o, c, l, 0, s),
                Tt(l) && (at(n.index, t)[8] = zn(t, e, a, n));
            }
          })(e, t, n, st(n, t)),
          64 == (64 & n.flags) && eg(e, t, n));
      }
      function Ac(e, t, n = st) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Kp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Pc(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Pc(e, t, n, r, o, i, s, a, l, c) {
        const u = 22 + r,
          d = u + o,
          f = (function xC(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : j);
            return n;
          })(u, d),
          h = "function" == typeof c ? c() : c;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Xp(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Qp(n, t, o, i)
              : r.hasOwnProperty(o) && Qp(n, t, r[o], i);
          }
        return n;
      }
      function Qp(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function ct(e, t, n, r, o, i, s, a) {
        const l = st(t, n);
        let u,
          c = t.inputs;
        !a && null != c && (u = c[r])
          ? (Bc(e, n, u, r, o), _o(t) && Yp(n, t.index))
          : 3 & t.type &&
            ((r = (function bC(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (o = null != s ? s(o, t.value || "", r) : o),
            i.setProperty(l, r, o));
      }
      function Yp(e, t) {
        const n = at(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function Rc(e, t, n, r) {
        let o = !1;
        if (Gf()) {
          const i = null === r ? null : { "": -1 },
            s = (function AC(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (Pp(t, s.selectors, !1))
                    if ((r || (r = []), Tt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          Oc(e, t, a.length);
                      } else r.unshift(s), Oc(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let a, l;
          null === s ? (a = l = null) : ([a, l] = s),
            null !== a && ((o = !0), Jp(e, t, n, a, i, l)),
            i &&
              (function PC(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new x(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, i);
        }
        return (n.mergedAttrs = Mo(n.mergedAttrs, n.attrs)), o;
      }
      function Jp(e, t, n, r, o, i) {
        for (let c = 0; c < r.length; c++) Nl(gs(n, t), e, r[c].type);
        !(function OC(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const u = r[c];
          u.providersResolver && u.providersResolver(u);
        }
        let s = !1,
          a = !1,
          l = $o(e, t, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const u = r[c];
          (n.mergedAttrs = Mo(n.mergedAttrs, u.hostAttrs)),
            NC(e, n, t, l, u),
            RC(l, u, o),
            null !== u.contentQueries && (n.flags |= 4),
            (null !== u.hostBindings ||
              null !== u.hostAttrs ||
              0 !== u.hostVars) &&
              (n.flags |= 64);
          const d = u.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            l++;
        }
        !(function _C(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let l = null,
            c = null;
          for (let u = t.directiveStart; u < o; u++) {
            const d = i[u],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (l = Xp(d.inputs, u, l, f ? f.inputs : null)),
              (c = Xp(d.outputs, u, c, p));
            const g = null === l || null === s || Ap(t) ? null : LC(l, u, s);
            a.push(g);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = c);
        })(e, n, i);
      }
      function eg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function Cw() {
            return B.lFrame.currentDirectiveIndex;
          })();
        try {
          Un(i);
          for (let a = r; a < o; a++) {
            const l = e.data[a],
              c = t[a];
            _l(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                TC(l, c);
          }
        } finally {
          Un(-1), _l(s);
        }
      }
      function TC(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Oc(e, t, n) {
        (t.componentOffset = n),
          (e.components || (e.components = [])).push(t.index);
      }
      function RC(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Tt(t) && (n[""] = e);
        }
      }
      function NC(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = $n(o.type)),
          s = new Eo(i, Tt(o), I);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function MC(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function SC(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, $o(e, n, o.hostVars, j), o);
      }
      function kC(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const c = s[l++],
              u = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, c, u) : (n[u] = d);
          }
        }
      }
      function LC(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function tg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function HC(e, t) {
        const n = at(t, e);
        if (ss(n)) {
          const r = n[1];
          48 & n[2] ? Fs(r, n, r.template, n[8]) : n[5] > 0 && Fc(n);
        }
      }
      function Fc(e) {
        for (let r = Zl(e); null !== r; r = Xl(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (ss(i))
              if (512 & i[2]) {
                const s = i[1];
                Fs(s, i, s.template, i[8]);
              } else i[5] > 0 && Fc(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = at(n[r], e);
            ss(o) && o[5] > 0 && Fc(o);
          }
      }
      function VC(e, t) {
        const n = at(t, e),
          r = n[1];
        (function $C(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Sc(r, n, n[8]);
      }
      function ks(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function kc(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = ko(e);
          if (nw(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Ls(e, t, n, r = !0) {
        const o = t[10];
        o.begin && o.begin();
        try {
          Fs(e, t, e.template, n);
        } catch (s) {
          throw (r && ig(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Lc(e, t, n) {
        El(0), t(e, n);
      }
      function ng(e) {
        return e[7] || (e[7] = []);
      }
      function rg(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function ig(e, t) {
        const n = e[9],
          r = n ? n.get(Sr, null) : null;
        r && r.handleError(t);
      }
      function Bc(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            l = t[s],
            c = e.data[s];
          null !== c.setInput ? c.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function cn(e, t, n) {
        const r = is(t, e);
        !(function Hh(e, t, n) {
          e.setValue(t, n);
        })(e[z], r, n);
      }
      function Bs(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = sl(o, a))
              : 2 == i && (r = sl(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function js(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Fe(i)), It(i)))
            for (let a = 10; a < i.length; a++) {
              const l = i[a],
                c = l[1].firstChild;
              null !== c && js(l[1], l, c, r);
            }
          const s = n.type;
          if (8 & s) js(e, t, n.child, r);
          else if (32 & s) {
            const a = Kl(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Qh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = ko(t[16]);
              js(l[1], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Uo {
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return js(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (It(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Jl(t, r), ys(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          $h(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function Zp(e, t, n, r) {
            const o = ng(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && rg(e).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          kc(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          Ls(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new x(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Px(e, t) {
              Lo(e, t, t[z], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new x(902, !1);
          this._appRef = t;
        }
      }
      class UC extends Uo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Ls(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class sg extends Vo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = J(t);
          return new zo(n, this.ngModule);
        }
      }
      function ag(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class GC {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Yi(r);
          const o = this.injector.get(t, wc, r);
          return o !== wc || n === wc ? o : this.parentInjector.get(t, n, r);
        }
      }
      class zo extends bp {
        get inputs() {
          return ag(this.componentDef.inputs);
        }
        get outputs() {
          return ag(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function QD(e) {
              return e.map(XD).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Ut ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new GC(t, i) : t,
            a = s.get(Mp, null);
          if (null === a) throw new x(407, !1);
          const l = s.get(AD, null),
            c = a.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function DC(e, t, n) {
                  return e.selectRootElement(t, n === jt.ShadowDom);
                })(c, r, this.componentDef.encapsulation)
              : Yl(
                  c,
                  u,
                  (function zC(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(u)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Pc(0, null, null, 1, 0, null, null, null, null, null),
            p = Ns(null, h, null, f, null, null, a, c, l, s, null);
          let g, m;
          Ml(p);
          try {
            const y = this.componentDef;
            let D,
              v = null;
            y.findHostDirectiveDefs
              ? ((D = []),
                (v = new Map()),
                y.findHostDirectiveDefs(y, D, v),
                D.push(y))
              : (D = [y]);
            const R = (function WC(e, t) {
                const n = e[1];
                return (e[22] = t), Ar(n, 22, 2, "#host", null);
              })(p, d),
              re = (function KC(e, t, n, r, o, i, s, a) {
                const l = o[1];
                !(function ZC(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Mo(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Bs(t, t.mergedAttrs, !0), null !== n && ep(r, n, t));
                })(r, e, t, s);
                const c = i.createRenderer(t, n),
                  u = Ns(
                    o,
                    Kp(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    c,
                    a || null,
                    null,
                    null
                  );
                return (
                  l.firstCreatePass && Oc(l, e, r.length - 1),
                  ks(o, u),
                  (o[e.index] = u)
                );
              })(R, d, y, D, p, a, c);
            (m = $f(h, 22)),
              d &&
                (function QC(e, t, n, r) {
                  if (r) Al(e, n, ["ng-version", PD.full]);
                  else {
                    const { attrs: o, classes: i } = (function YD(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!At(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Al(e, n, o),
                      i && i.length > 0 && Jh(e, n, i.join(" "));
                  }
                })(c, y, d, r),
              void 0 !== n &&
                (function YC(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(m, this.ngContentSelectors, n),
              (g = (function XC(e, t, n, r, o, i) {
                const s = ke(),
                  a = o[1],
                  l = st(s, o);
                Jp(a, o, s, n, null, r);
                for (let u = 0; u < n.length; u++)
                  Ve(zn(o, a, s.directiveStart + u, s), o);
                eg(a, o, s), l && Ve(l, o);
                const c = zn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[8] = o[8] = c), null !== i)) for (const u of i) u(c, t);
                return Ic(a, s, e), c;
              })(re, y, D, v, p, [JC])),
              Sc(h, p, null);
          } finally {
            Sl();
          }
          return new qC(this.componentType, g, Mr(m, p), p, m);
        }
      }
      class qC extends bD {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new UC(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Bc(i[1], i, o, t, n), Yp(i, this._tNode.index);
          }
        }
        get injector() {
          return new vr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function JC() {
        const e = ke();
        cs(w()[1], e);
      }
      let Hs = null;
      function Zn() {
        if (!Hs) {
          const e = ie.Symbol;
          if (e && e.iterator) Hs = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Hs = r);
            }
          }
        }
        return Hs;
      }
      function Vs(e) {
        return (
          !!Hc(e) && (Array.isArray(e) || (!(e instanceof Map) && Zn() in e))
        );
      }
      function Hc(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function $e(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Rr(e, t, n, r) {
        return $e(e, gr(), n) ? t + L(n) + r : j;
      }
      function Or(e, t, n, r, o, i) {
        const a = (function Xn(e, t, n, r) {
          const o = $e(e, t, n);
          return $e(e, t + 1, r) || o;
        })(
          e,
          (function nn() {
            return B.lFrame.bindingIndex;
          })(),
          n,
          o
        );
        return rn(2), a ? t + L(n) + r + L(o) + i : j;
      }
      function Wt(e, t, n, r, o, i, s, a) {
        const l = w(),
          c = K(),
          u = e + 22,
          d = c.firstCreatePass
            ? (function h_(e, t, n, r, o, i, s, a, l) {
                const c = t.consts,
                  u = Ar(t, e, 4, s || null, bn(c, a));
                Rc(t, n, u, bn(c, l)), cs(t, u);
                const d = (u.tViews = Pc(
                  2,
                  u,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, u),
                    (d.queries = t.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, t, n, r, o, i, s)
            : c.data[u];
        Vt(d, !1);
        const f = l[z].createComment("");
        _s(c, l, f, d),
          Ve(f, l),
          ks(l, (l[u] = tg(f, l, f, d))),
          os(d) && Tc(c, l, d),
          null != s && Ac(l, d, a);
      }
      function me(e, t, n) {
        const r = w();
        return $e(r, gr(), t) && ct(K(), ue(), r, e, t, r[z], n, !1), me;
      }
      function $c(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Bc(e, n, t.inputs[s], s, r);
      }
      function T(e, t, n, r) {
        const o = w(),
          i = K(),
          s = 22 + e,
          a = o[z],
          l = (o[s] = Yl(
            a,
            t,
            (function Aw() {
              return B.lFrame.currentNamespace;
            })()
          )),
          c = i.firstCreatePass
            ? (function m_(e, t, n, r, o, i, s) {
                const a = t.consts,
                  c = Ar(t, e, 2, o, bn(a, i));
                return (
                  Rc(t, n, c, bn(a, s)),
                  null !== c.attrs && Bs(c, c.attrs, !1),
                  null !== c.mergedAttrs && Bs(c, c.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, c),
                  c
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        return (
          Vt(c, !0),
          ep(a, l, c),
          32 != (32 & c.flags) && _s(i, o, l, c),
          0 ===
            (function pw() {
              return B.lFrame.elementDepthCount;
            })() && Ve(l, o),
          (function gw() {
            B.lFrame.elementDepthCount++;
          })(),
          os(c) && (Tc(i, o, c), Ic(i, c, o)),
          null !== r && Ac(o, c),
          T
        );
      }
      function A() {
        let e = ke();
        Dl() ? Cl() : ((e = e.parent), Vt(e, !1));
        const t = e;
        !(function mw() {
          B.lFrame.elementDepthCount--;
        })();
        const n = K();
        return (
          n.firstCreatePass && (cs(n, e), yl(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Nw(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            $c(n, t, w(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Fw(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            $c(n, t, w(), t.stylesWithoutHost, !1),
          A
        );
      }
      function te(e, t, n, r) {
        return T(e, t, n, r), A(), te;
      }
      function Us() {
        return w();
      }
      function zs(e) {
        return !!e && "function" == typeof e.then;
      }
      const bg = function _g(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Hr(e, t, n, r) {
        const o = w(),
          i = K(),
          s = ke();
        return (
          (function Mg(e, t, n, r, o, i, s) {
            const a = os(r),
              c = e.firstCreatePass && rg(e),
              u = t[8],
              d = ng(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = st(r, t),
                m = s ? s(g) : g,
                y = d.length,
                D = s ? (R) => s(Fe(R[r.index])) : r.index;
              let v = null;
              if (
                (!s &&
                  a &&
                  (v = (function y_(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[7],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== v)
              )
                ((v.__ngLastListenerFn__ || v).__ngNextListenerFn__ = i),
                  (v.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Ig(r, t, u, i, !1);
                const R = n.listen(m, o, i);
                d.push(i, R), c && c.push(o, D, y, y + 1);
              }
            } else i = Ig(r, t, u, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let m = 0; m < g; m += 2) {
                  const re = t[p[m]][p[m + 1]].subscribe(i),
                    xe = d.length;
                  d.push(i, re), c && c.push(o, r.index, xe, -(xe + 1));
                }
            }
          })(i, o, o[z], s, e, t, r),
          Hr
        );
      }
      function Sg(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return ig(e, o), !1;
        }
      }
      function Ig(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          kc(e.componentOffset > -1 ? at(e.index, t) : t);
          let l = Sg(t, 0, r, s),
            c = i.__ngNextListenerFn__;
          for (; c; ) (l = Sg(t, 0, c, s) && l), (c = c.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function un(e = 1) {
        return (function bw(e) {
          return (B.lFrame.contextLView = (function Ew(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, B.lFrame.contextLView))[8];
        })(e);
      }
      function w_(e, t) {
        let n = null;
        const r = (function qD(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (!(1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let o = 0; o < t.length; o++) {
          const i = t[o];
          if ("*" !== i) {
            if (null === r ? Pp(e, i, !0) : ZD(r, i)) return o;
          } else n = o;
        }
        return n;
      }
      function qo(e, t, n, r, o) {
        const i = w(),
          s = Rr(i, t, n, r);
        return s !== j && ct(K(), ue(), i, e, s, i[z], o, !1), qo;
      }
      function Gs(e, t) {
        return (e << 17) | (t << 2);
      }
      function Mn(e) {
        return (e >> 17) & 32767;
      }
      function Gc(e) {
        return 2 | e;
      }
      function Qn(e) {
        return (131068 & e) >> 2;
      }
      function qc(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Wc(e) {
        return 1 | e;
      }
      function Hg(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? Mn(i) : Qn(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = e[a + 1];
          E_(e[a], t) && ((l = !0), (e[a + 1] = r ? Wc(u) : Gc(u))),
            (a = r ? Mn(u) : Qn(u));
        }
        l && (e[n + 1] = r ? Gc(i) : Wc(i));
      }
      function E_(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Cr(e, t) >= 0)
        );
      }
      const Pe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Vg(e) {
        return e.substring(Pe.key, Pe.keyEnd);
      }
      function $g(e, t) {
        const n = Pe.textEnd;
        return n === t
          ? -1
          : ((t = Pe.keyEnd =
              (function T_(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; ) t++;
                return t;
              })(e, (Pe.key = t), n)),
            Vr(e, t, n));
      }
      function Vr(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function $r(e, t) {
        return (
          (function Pt(e, t, n, r) {
            const o = w(),
              i = K(),
              s = rn(2);
            i.firstUpdatePass && Zg(i, e, s, r),
              t !== j &&
                $e(o, s, t) &&
                Qg(
                  i,
                  i.data[Xe()],
                  o,
                  o[z],
                  e,
                  (o[s + 1] = (function H_(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = oe(En(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          $r
        );
      }
      function Zt(e, t) {
        for (
          let n = (function S_(e) {
            return (
              (function zg(e) {
                (Pe.key = 0),
                  (Pe.keyEnd = 0),
                  (Pe.value = 0),
                  (Pe.valueEnd = 0),
                  (Pe.textEnd = e.length);
              })(e),
              $g(e, Vr(e, 0, Pe.textEnd))
            );
          })(t);
          n >= 0;
          n = $g(t, n)
        )
          lt(e, Vg(t), !0);
      }
      function Kg(e, t) {
        return t >= e.expandoStartIndex;
      }
      function Zg(e, t, n, r) {
        const o = e.data;
        if (null === o[n + 1]) {
          const i = o[Xe()],
            s = Kg(e, n);
          Jg(i, r) && null === t && !s && (t = !1),
            (t = (function N_(e, t, n, r) {
              const o = (function bl(e) {
                const t = B.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let i = r ? t.residualClasses : t.residualStyles;
              if (null === o)
                0 === (r ? t.classBindings : t.styleBindings) &&
                  ((n = Wo((n = Kc(null, e, t, n, r)), t.attrs, r)),
                  (i = null));
              else {
                const s = t.directiveStylingLast;
                if (-1 === s || e[s] !== o)
                  if (((n = Kc(o, e, t, n, r)), null === i)) {
                    let l = (function F_(e, t, n) {
                      const r = n ? t.classBindings : t.styleBindings;
                      if (0 !== Qn(r)) return e[Mn(r)];
                    })(e, t, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = Kc(null, e, t, l[1], r)),
                      (l = Wo(l, t.attrs, r)),
                      (function k_(e, t, n, r) {
                        e[Mn(n ? t.classBindings : t.styleBindings)] = r;
                      })(e, t, r, l));
                  } else
                    i = (function L_(e, t, n) {
                      let r;
                      const o = t.directiveEnd;
                      for (let i = 1 + t.directiveStylingLast; i < o; i++)
                        r = Wo(r, e[i].hostAttrs, n);
                      return Wo(r, t.attrs, n);
                    })(e, t, r);
              }
              return (
                void 0 !== i &&
                  (r ? (t.residualClasses = i) : (t.residualStyles = i)),
                n
              );
            })(o, i, t, r)),
            (function __(e, t, n, r, o, i) {
              let s = i ? t.classBindings : t.styleBindings,
                a = Mn(s),
                l = Qn(s);
              e[r] = n;
              let u,
                c = !1;
              if (
                (Array.isArray(n)
                  ? ((u = n[1]), (null === u || Cr(n, u) > 0) && (c = !0))
                  : (u = n),
                o)
              )
                if (0 !== l) {
                  const f = Mn(e[a + 1]);
                  (e[r + 1] = Gs(f, a)),
                    0 !== f && (e[f + 1] = qc(e[f + 1], r)),
                    (e[a + 1] = (function D_(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = Gs(a, 0)),
                    0 !== a && (e[a + 1] = qc(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = Gs(l, 0)),
                  0 === a ? (a = r) : (e[l + 1] = qc(e[l + 1], r)),
                  (l = r);
              c && (e[r + 1] = Gc(e[r + 1])),
                Hg(e, u, r, !0),
                Hg(e, u, r, !1),
                (function b_(e, t, n, r, o) {
                  const i = o ? e.residualClasses : e.residualStyles;
                  null != i &&
                    "string" == typeof t &&
                    Cr(i, t) >= 0 &&
                    (n[r + 1] = Wc(n[r + 1]));
                })(t, u, e, r, i),
                (s = Gs(a, l)),
                i ? (t.classBindings = s) : (t.styleBindings = s);
            })(o, i, t, n, s, r);
        }
      }
      function Kc(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Wo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Wo(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                lt(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function Qg(e, t, n, r, o, i, s, a) {
        if (!(3 & t.type)) return;
        const l = e.data,
          c = l[a + 1],
          u = (function C_(e) {
            return 1 == (1 & e);
          })(c)
            ? Yg(l, t, n, o, Qn(c), s)
            : void 0;
        qs(u) ||
          (qs(i) ||
            ((function x_(e) {
              return 2 == (2 & e);
            })(c) &&
              (i = Yg(l, null, n, o, a, s))),
          (function Vx(e, t, n, r, o) {
            if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
            else {
              let i = -1 === r.indexOf("-") ? void 0 : et.DashCase;
              null == o
                ? e.removeStyle(n, r, i)
                : ("string" == typeof o &&
                    o.endsWith("!important") &&
                    ((o = o.slice(0, -10)), (i |= et.Important)),
                  e.setStyle(n, r, o, i));
            }
          })(r, s, is(Xe(), n), o, i));
      }
      function Yg(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const l = e[o],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let f = n[o + 1];
          f === j && (f = d ? X : void 0);
          let h = d ? Bl(f, r) : u === r ? f : void 0;
          if ((c && !qs(h) && (h = Bl(l, r)), qs(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Mn(p) : Qn(p);
        }
        if (null !== t) {
          let l = i ? t.residualClasses : t.residualStyles;
          null != l && (a = Bl(l, r));
        }
        return a;
      }
      function qs(e) {
        return void 0 !== e;
      }
      function Jg(e, t) {
        return 0 != (e.flags & (t ? 8 : 16));
      }
      function Z(e, t = "") {
        const n = w(),
          r = K(),
          o = e + 22,
          i = r.firstCreatePass ? Ar(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Ql(e, t) {
            return e.createText(t);
          })(n[z], t));
        _s(r, n, s, i), Vt(i, !1);
      }
      function ut(e) {
        return Ce("", e, ""), ut;
      }
      function Ce(e, t, n) {
        const r = w(),
          o = Rr(r, e, t, n);
        return o !== j && cn(r, Xe(), o), Ce;
      }
      function Ws(e, t, n, r, o) {
        const i = w(),
          s = Or(i, e, t, n, r, o);
        return s !== j && cn(i, Xe(), s), Ws;
      }
      function l0(e, t, n) {
        !(function Rt(e, t, n, r) {
          const o = K(),
            i = rn(2);
          o.firstUpdatePass && Zg(o, null, i, r);
          const s = w();
          if (n !== j && $e(s, i, n)) {
            const a = o.data[Xe()];
            if (Jg(a, r) && !Kg(o, i)) {
              let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (n = sl(l, n || "")), $c(o, a, s, n, r);
            } else
              !(function j_(e, t, n, r, o, i, s, a) {
                o === j && (o = X);
                let l = 0,
                  c = 0,
                  u = 0 < o.length ? o[0] : null,
                  d = 0 < i.length ? i[0] : null;
                for (; null !== u || null !== d; ) {
                  const f = l < o.length ? o[l + 1] : void 0,
                    h = c < i.length ? i[c + 1] : void 0;
                  let g,
                    p = null;
                  u === d
                    ? ((l += 2), (c += 2), f !== h && ((p = d), (g = h)))
                    : null === d || (null !== u && u < d)
                    ? ((l += 2), (p = u))
                    : ((c += 2), (p = d), (g = h)),
                    null !== p && Qg(e, t, n, r, p, g, s, a),
                    (u = l < o.length ? o[l] : null),
                    (d = c < i.length ? i[c] : null);
                }
              })(
                o,
                a,
                s,
                s[z],
                s[i + 1],
                (s[i + 1] = (function B_(e, t, n) {
                  if (null == n || "" === n) return X;
                  const r = [],
                    o = En(n);
                  if (Array.isArray(o))
                    for (let i = 0; i < o.length; i++) e(r, o[i], !0);
                  else if ("object" == typeof o)
                    for (const i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
                  else "string" == typeof o && t(r, o);
                  return r;
                })(e, t, n)),
                r,
                i
              );
          }
        })(lt, Zt, Rr(w(), e, t, n), !0);
      }
      const zr = "en-US";
      let C0 = zr;
      class Gr {}
      class K0 {}
      class Z0 extends Gr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new sg(this));
          const r = ot(t);
          (this._bootstrapComponents = ln(r.bootstrap)),
            (this._r3Injector = Bp(
              t,
              n,
              [
                { provide: Gr, useValue: this },
                { provide: Vo, useValue: this.componentFactoryResolver },
              ],
              oe(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class tu extends K0 {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Z0(this.moduleType, t);
        }
      }
      class sE extends Gr {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new sg(this)),
            (this.instance = null);
          const o = new Cp(
            [
              ...t,
              { provide: Gr, useValue: this },
              { provide: Vo, useValue: this.componentFactoryResolver },
            ],
            n || As(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Ys(e, t, n = null) {
        return new sE(e, t, n).injector;
      }
      let aE = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = yp(0, n.type),
                o =
                  r.length > 0
                    ? Ys([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = M({
            token: e,
            providedIn: "environment",
            factory: () => new e(_(Ut)),
          })),
          e
        );
      })();
      function X0(e) {
        e.getStandaloneInjector = (t) =>
          t.get(aE).getOrCreateStandaloneInjector(e);
      }
      function r1(e, t, n, r, o, i) {
        const s = t + n;
        return $e(e, s, o)
          ? (function qt(e, t, n) {
              return (e[t] = n);
            })(e, s + 1, i ? r.call(i, o) : r(o))
          : (function Jo(e, t) {
              const n = e[t];
              return n === j ? void 0 : n;
            })(e, s + 1);
      }
      function le(e, t) {
        const n = K();
        let r;
        const o = e + 22;
        n.firstCreatePass
          ? ((r = (function ME(e, t) {
              if (t)
                for (let n = t.length - 1; n >= 0; n--) {
                  const r = t[n];
                  if (e === r.name) return r;
                }
            })(t, n.pipeRegistry)),
            (n.data[o] = r),
            r.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(o, r.onDestroy))
          : (r = n.data[o]);
        const i = r.factory || (r.factory = $n(r.type)),
          s = gt(I);
        try {
          const a = ps(!1),
            l = i();
          return (
            ps(a),
            (function p_(e, t, n, r) {
              n >= e.data.length &&
                ((e.data[n] = null), (e.blueprint[n] = null)),
                (t[n] = r);
            })(n, w(), o, l),
            l
          );
        } finally {
          gt(s);
        }
      }
      function ce(e, t, n) {
        const r = e + 22,
          o = w(),
          i = (function pr(e, t) {
            return e[t];
          })(o, r);
        return (function ei(e, t) {
          return e[1].data[t].pure;
        })(o, r)
          ? r1(
              o,
              (function Ze() {
                const e = B.lFrame;
                let t = e.bindingRootIndex;
                return (
                  -1 === t &&
                    (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                  t
                );
              })(),
              t,
              i.transform,
              n,
              i
            )
          : i.transform(n);
      }
      function ru(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const ve = class PE extends Lt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (o = l.next?.bind(l)),
              (i = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((i = ru(i)), o && (o = ru(o)), s && (s = ru(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof ft && t.add(a), a;
        }
      };
      let dn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = FE), e;
      })();
      const OE = dn,
        NE = class extends OE {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = Ns(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              Sc(r, o, t),
              new Uo(o)
            );
          }
        };
      function FE() {
        return (function Js(e, t) {
          return 4 & e.type ? new NE(t, e, Mr(e, t)) : null;
        })(ke(), w());
      }
      let Ot = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = kE), e;
      })();
      function kE() {
        return (function u1(e, t) {
          let n;
          const r = t[e.index];
          if (It(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = Fe(r);
            else {
              const i = t[z];
              o = i.createComment("");
              const s = st(e, t);
              qn(
                i,
                Cs(i, s),
                o,
                (function Bx(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = tg(r, t, o, e)), ks(t, n);
          }
          return new l1(n, e, t);
        })(ke(), w());
      }
      const LE = Ot,
        l1 = class extends LE {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Mr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new vr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ol(this._hostTNode, this._hostLView);
            if (sh(t)) {
              const n = hs(t, this._hostLView),
                r = fs(t);
              return new vr(n[1].data[r + 8], n);
            }
            return new vr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = c1(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function To(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new zo(J(t)),
              c = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const f = (s ? c : this.parentInjector).get(Ut, null);
              f && (i = f);
            }
            const u = l.create(c, o, void 0, i);
            return this.insert(u.hostView, a), u;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function hw(e) {
                return It(e[3]);
              })(r)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const d = r[3],
                  f = new l1(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function Ox(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), yh(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function Nx(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(o, r, s, i);
            const a = nc(i, s),
              l = r[z],
              c = Cs(l, s[7]);
            return (
              null !== c &&
                (function Ax(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Lo(e, r, n, 1, o, i);
                })(o, s[6], l, r, c, a),
              t.attachToViewContainerRef(),
              yh(iu(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = c1(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Jl(this._lContainer, n);
            r && (ys(iu(this._lContainer), n), $h(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Jl(this._lContainer, n);
            return r && null != ys(iu(this._lContainer), n) ? new Uo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function c1(e) {
        return e[8];
      }
      function iu(e) {
        return e[8] || (e[8] = []);
      }
      function ta(...e) {}
      const na = new S("Application Initializer");
      let ra = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = ta),
              (this.reject = ta),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (zs(i)) n.push(i);
                else if (bg(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(na, 8));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ni = new S("AppId", {
        providedIn: "root",
        factory: function L1() {
          return `${gu()}${gu()}${gu()}`;
        },
      });
      function gu() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const B1 = new S("Platform Initializer"),
        mu = new S("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        j1 = new S("appBootstrapListener");
      let dM = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const fn = new S("LocaleId", {
        providedIn: "root",
        factory: () =>
          G(fn, N.Optional | N.SkipSelf) ||
          (function fM() {
            return (typeof $localize < "u" && $localize.locale) || zr;
          })(),
      });
      class pM {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let H1 = (() => {
        class e {
          compileModuleSync(n) {
            return new tu(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = ln(ot(n).declarations).reduce((s, a) => {
                const l = J(a);
                return l && s.push(new zo(l)), s;
              }, []);
            return new pM(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const vM = (() => Promise.resolve(0))();
      function vu(e) {
        typeof Zone > "u"
          ? vM.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class _e {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ve(!1)),
            (this.onMicrotaskEmpty = new ve(!1)),
            (this.onStable = new ve(!1)),
            (this.onError = new ve(!1)),
            typeof Zone > "u")
          )
            throw new x(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function yM() {
              let e = ie.requestAnimationFrame,
                t = ie.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function DM(e) {
              const t = () => {
                !(function xM(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ie, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                wu(e),
                                (e.isCheckStableRunning = !0),
                                yu(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    wu(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return U1(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      z1(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, l) => {
                  try {
                    return U1(e), n.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), z1(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          wu(e),
                          yu(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!_e.isInAngularZone()) throw new x(909, !1);
        }
        static assertNotInAngularZone() {
          if (_e.isInAngularZone()) throw new x(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, wM, ta, ta);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const wM = {};
      function yu(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function wu(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function U1(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function z1(e) {
        e._nesting--, yu(e);
      }
      class CM {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ve()),
            (this.onMicrotaskEmpty = new ve()),
            (this.onStable = new ve()),
            (this.onError = new ve());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const G1 = new S(""),
        oa = new S("");
      let Cu,
        xu = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Cu ||
                  ((function _M(e) {
                    Cu = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      _e.assertNotInAngularZone(),
                        vu(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                vu(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(_e), _(Du), _(oa));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Du = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Cu?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        Sn = null;
      const q1 = new S("AllowMultipleToken"),
        _u = new S("PlatformDestroyListeners");
      class W1 {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Z1(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new S(r);
        return (i = []) => {
          let s = bu();
          if (!s || s.injector.get(q1, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function MM(e) {
                  if (Sn && !Sn.get(q1, !1)) throw new x(400, !1);
                  Sn = e;
                  const t = e.get(Q1);
                  (function K1(e) {
                    const t = e.get(B1, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function X1(e = [], t) {
                    return zt.create({
                      name: t,
                      providers: [
                        { provide: gc, useValue: "platform" },
                        { provide: _u, useValue: new Set([() => (Sn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function IM(e) {
            const t = bu();
            if (!t) throw new x(401, !1);
            return t;
          })();
        };
      }
      function bu() {
        return Sn?.get(Q1) ?? null;
      }
      let Q1 = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function J1(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new CM()
                      : ("zone.js" === e ? void 0 : e) || new _e(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Y1(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: _e, useValue: o }];
            return o.run(() => {
              const s = zt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                l = a.injector.get(Sr, null);
              if (!l) throw new x(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const c = o.onError.subscribe({
                    next: (u) => {
                      l.handleError(u);
                    },
                  });
                  a.onDestroy(() => {
                    sa(this._modules, a), c.unsubscribe();
                  });
                }),
                (function em(e, t, n) {
                  try {
                    const r = n();
                    return zs(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, o, () => {
                  const c = a.injector.get(ra);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function _0(e) {
                          ht(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (C0 = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(fn, zr) || zr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = tm({}, r);
            return (function bM(e, t, n) {
              const r = new tu(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(ia);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new x(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new x(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(_u, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(zt));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function tm(e, t) {
        return Array.isArray(t) ? t.reduce(tm, e) : { ...e, ...t };
      }
      let ia = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new fe((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new fe((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    _e.assertNotInAngularZone(),
                      vu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  _e.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = (function Ny(...e) {
              const t = go(e),
                n = (function Sy(e, t) {
                  return "number" == typeof rl(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? bt(r[0])
                  : ar(n)(Te(r, t))
                : Bt;
            })(i, s.pipe(xf()));
          }
          bootstrap(n, r) {
            const o = n instanceof bp;
            if (!this._injector.get(ra).done)
              throw (
                (!o &&
                  (function cr(e) {
                    const t = J(e) || Be(e) || We(e);
                    return null !== t && t.standalone;
                  })(n),
                new x(405, false))
              );
            let s;
            (s = o ? n : this._injector.get(Vo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function EM(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Gr),
              c = s.create(zt.NULL, [], r || s.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get(G1, null);
            return (
              d?.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  sa(this.components, c),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new x(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            sa(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(j1, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => sa(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new x(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(_e), _(Ut), _(Sr));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function sa(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let ri = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = AM), e;
      })();
      function AM(e) {
        return (function PM(e, t, n) {
          if (_o(e) && !n) {
            const r = at(e.index, t);
            return new Uo(r, r);
          }
          return 47 & e.type ? new Uo(t[16], t) : null;
        })(ke(), w(), 16 == (16 & e));
      }
      class sm {
        constructor() {}
        supports(t) {
          return Vs(t);
        }
        create(t) {
          return new LM(t);
        }
      }
      const kM = (e, t) => t;
      class LM {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || kM);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < lm(r, o, i)) ? n : r,
              a = lm(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const c = a - o,
                u = l - o;
              if (c != u) {
                for (let f = 0; f < c; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  u <= p && p < c && (i[f] = h + 1);
                }
                i[s.previousIndex] = u - c;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Vs(t))) throw new x(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function u_(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Zn()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new BM(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new am()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new am()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class BM {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class jM {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class am {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new jM()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function lm(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class cm {
        constructor() {}
        supports(t) {
          return t instanceof Map || Hc(t);
        }
        create() {
          return new HM();
        }
      }
      class HM {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Hc(t))) throw new x(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new VM(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class VM {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function um() {
        return new ca([new sm()]);
      }
      let ca = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || um()),
              deps: [[e, new Ro(), new Po()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new x(901, !1);
          }
        }
        return (e.ɵprov = M({ token: e, providedIn: "root", factory: um })), e;
      })();
      function dm() {
        return new oi([new cm()]);
      }
      let oi = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || dm()),
              deps: [[e, new Ro(), new Po()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new x(901, !1);
          }
        }
        return (e.ɵprov = M({ token: e, providedIn: "root", factory: dm })), e;
      })();
      const zM = Z1(null, "core", []);
      let GM = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(ia));
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = pt({})),
            e
          );
        })(),
        Au = null;
      function In() {
        return Au;
      }
      class KM {}
      const Je = new S("DocumentToken");
      let Pu = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return (function ZM() {
                return _(fm);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const XM = new S("Location Initialized");
      let fm = (() => {
        class e extends Pu {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return In().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = In().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = In().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            hm() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            hm()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Je));
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return (function QM() {
                return new fm(_(Je));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function hm() {
        return !!window.history.pushState;
      }
      function Ru(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function pm(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function pn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let er = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return G(mm);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const gm = new S("appBaseHref");
      let mm = (() => {
          class e extends er {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  G(Je).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Ru(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  pn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + pn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + pn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Pu), _(gm, 8));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        YM = (() => {
          class e extends er {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Ru(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + pn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + pn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Pu), _(gm, 8));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ou = (() => {
          class e {
            constructor(n) {
              (this._subject = new ve()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function tS(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(pm(vm(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + pn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function eS(e, t) {
                  return e && new RegExp(`^${e}([/;?#]|$)`).test(t)
                    ? t.substring(e.length)
                    : t;
                })(this._basePath, vm(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + pn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + pn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = pn),
            (e.joinWithSlash = Ru),
            (e.stripTrailingSlash = pm),
            (e.ɵfac = function (n) {
              return new (n || e)(_(er));
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return (function JM() {
                  return new Ou(_(er));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function vm(e) {
        return e.replace(/\/index.html$/, "");
      }
      function Mm(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class HS {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let ai = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new HS(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Am(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              Am(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Ot), I(dn), I(ca));
          }),
          (e.ɵdir = Ge({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function Am(e, t) {
        e.context.$implicit = t.item;
      }
      let Pm = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new $S()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Rm("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Rm("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Ot), I(dn));
          }),
          (e.ɵdir = Ge({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class $S {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Rm(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${oe(t)}'.`
          );
      }
      let Nm = (() => {
        class e {
          constructor(n) {
            (this.differs = n), (this.keyValues = []), (this.compareFn = Fm);
          }
          transform(n, r = Fm) {
            if (!n || (!(n instanceof Map) && "object" != typeof n))
              return null;
            this.differ || (this.differ = this.differs.find(n).create());
            const o = this.differ.diff(n),
              i = r !== this.compareFn;
            return (
              o &&
                ((this.keyValues = []),
                o.forEachItem((s) => {
                  this.keyValues.push(
                    (function lI(e, t) {
                      return { key: e, value: t };
                    })(s.key, s.currentValue)
                  );
                })),
              (o || i) && (this.keyValues.sort(r), (this.compareFn = r)),
              this.keyValues
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(oi, 16));
          }),
          (e.ɵpipe = qe({
            name: "keyvalue",
            type: e,
            pure: !1,
            standalone: !0,
          })),
          e
        );
      })();
      function Fm(e, t) {
        const n = e.key,
          r = t.key;
        if (n === r) return 0;
        if (void 0 === n) return 1;
        if (void 0 === r) return -1;
        if (null === n) return 1;
        if (null === r) return -1;
        if ("string" == typeof n && "string" == typeof r) return n < r ? -1 : 1;
        if ("number" == typeof n && "number" == typeof r) return n - r;
        if ("boolean" == typeof n && "boolean" == typeof r)
          return n < r ? -1 : 1;
        const o = String(n),
          i = String(r);
        return o == i ? 0 : o < i ? -1 : 1;
      }
      let fI = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Mt({ type: e })),
          (e.ɵinj = pt({})),
          e
        );
      })();
      let mI = (() => {
        class e {}
        return (
          (e.ɵprov = M({
            token: e,
            providedIn: "root",
            factory: () => new vI(_(Je), window),
          })),
          e
        );
      })();
      class vI {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function yI(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Lm(this.window.history) ||
              Lm(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Lm(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class Bm {}
      class GI extends KM {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Qu extends GI {
        static makeCurrent() {
          !(function WM(e) {
            Au || (Au = e);
          })(new Qu());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function qI() {
            return (
              (ci = ci || document.querySelector("base")),
              ci ? ci.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function WI(e) {
                (xa = xa || document.createElement("a")),
                  xa.setAttribute("href", e);
                const t = xa.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          ci = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return Mm(document.cookie, t);
        }
      }
      let xa,
        ci = null;
      const Um = new S("TRANSITION_ID"),
        ZI = [
          {
            provide: na,
            useFactory: function KI(e, t, n) {
              return () => {
                n.get(ra).donePromise.then(() => {
                  const r = In(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Um, Je, zt],
            multi: !0,
          },
        ];
      let QI = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Da = new S("EventManagerPlugins");
      let Ca = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Da), _(_e));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class zm {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = In().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Gm = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ui = (() => {
          class e extends Gm {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(qm), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(qm));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Je));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function qm(e) {
        In().remove(e);
      }
      const Yu = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Ju = /%COMP%/g;
      function ed(e, t) {
        return t.flat(100).map((n) => n.replace(Ju, e));
      }
      function Zm(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let td = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new nd(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case jt.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new rT(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case jt.ShadowDom:
                return new oT(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = ed(r.id, r.styles);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Ca), _(ui), _(ni));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class nd {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Yu[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Qm(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Qm(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Yu[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Yu[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (et.DashCase | et.Important)
            ? t.style.setProperty(n, r, o & et.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & et.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, Zm(r))
            : this.eventManager.addEventListener(t, n, Zm(r));
        }
      }
      function Qm(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class rT extends nd {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = ed(o + "-" + r.id, r.styles);
          n.addStyles(i),
            (this.contentAttr = (function eT(e) {
              return "_ngcontent-%COMP%".replace(Ju, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function tT(e) {
              return "_nghost-%COMP%".replace(Ju, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class oT extends nd {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = ed(o.id, o.styles);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let iT = (() => {
        class e extends zm {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Je));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ym = ["alt", "control", "meta", "shift"],
        sT = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        aT = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let lT = (() => {
        class e extends zm {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => In().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              Ym.forEach((c) => {
                const u = r.indexOf(c);
                u > -1 && (r.splice(u, 1), (s += c + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let o = sT[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                Ym.forEach((s) => {
                  s !== o && (0, aT[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Je));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const fT = Z1(zM, "browser", [
          { provide: mu, useValue: "browser" },
          {
            provide: B1,
            useValue: function cT() {
              Qu.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Je,
            useFactory: function dT() {
              return (
                (function qx(e) {
                  sc = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        tv = new S(""),
        nv = [
          {
            provide: oa,
            useClass: class XI {
              addToWindow(t) {
                (ie.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (ie.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ie.getAllAngularRootElements = () => t.getAllRootElements()),
                  ie.frameworkStabilizers || (ie.frameworkStabilizers = []),
                  ie.frameworkStabilizers.push((r) => {
                    const o = ie.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? In().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: G1, useClass: xu, deps: [_e, Du, oa] },
          { provide: xu, useClass: xu, deps: [_e, Du, oa] },
        ],
        rv = [
          { provide: gc, useValue: "root" },
          {
            provide: Sr,
            useFactory: function uT() {
              return new Sr();
            },
            deps: [],
          },
          { provide: Da, useClass: iT, multi: !0, deps: [Je, _e, mu] },
          { provide: Da, useClass: lT, multi: !0, deps: [Je] },
          { provide: td, useClass: td, deps: [Ca, ui, ni] },
          { provide: Mp, useExisting: td },
          { provide: Gm, useExisting: ui },
          { provide: ui, useClass: ui, deps: [Je] },
          { provide: Ca, useClass: Ca, deps: [Da, _e] },
          { provide: Bm, useClass: QI, deps: [] },
          [],
        ];
      let hT = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: ni, useValue: n.appId },
                  { provide: Um, useExisting: ni },
                  ZI,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(tv, 12));
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = pt({ providers: [...rv, ...nv], imports: [fI, GM] })),
            e
          );
        })(),
        ov = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Je));
            }),
            (e.ɵprov = M({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function gT() {
                        return new ov(_(Je));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      typeof window < "u" && window;
      class di {}
      (di.ɵfac = function (t) {
        return new (t || di)();
      }),
        (di.ɵcmp = ze({
          type: di,
          selectors: [["app-not-found"]],
          decls: 2,
          vars: 0,
          template: function (t, n) {
            1 & t && (T(0, "p"), Z(1, "not-found works!"), A());
          },
        }));
      const Kr = {
        email: "sthefanog@gmail.com",
        fallback_language: "en",
        available_languages: [
          { acro: "pt", name: "Portugu\xeas", image: "\u{1f1e7}\u{1f1f7}" },
          { acro: "en", name: "English", image: "\u{1f1ec}\u{1f1e7}" },
        ],
        resume: {
          pt: "assets/files/Resume-PTBR.pdf",
          en: "assets/files/Resume-EN.pdf",
        },
        links: {
          repository: "https://github.com/steuf0/spg-dev",
          linkedin: "https://www.linkedin.com/in/sthefanogarcia/",
          github: "https://github.com/steuf0",
        },
        certificates: { efset: "https://www.efset.org/cert/camUSB" },
        work_history: [
          {
            company: "Paytime Fintech",
            role: "Desenvolvedor front-end",
            period: "Abril 2022 - Janeiro 2023",
            link: "https://www.paytime.com.br",
            total_time: "11 meses",
            details: {
              0: 'Respons\xe1vel pelo desenvolvimento do site, portal de clientes e ecommerce da Paytime, utilizados por mais de <b class="text-blue-light">70.000 clientes</b> e transacionando mais de <b class="text-blue-light">R$ 5 bilh\xf5es</b> anualmente',
              1: "Fui exposto ao Angular 12 durante minha ocupa\xe7\xe3o e o usei como a framework principal para a maioria dos projetos dentro da Paytime",
              2: "Defendi e ajudei a estabelecer boas pr\xe1ticas dentro da equipe de engenharia, o que trouxe benef\xedcios para a estabilidade do produto e higiene do c\xf3digo",
              3: "Sendo proativo e trazendo contribui\xe7\xf5es t\xe9cnicas que melhoraram a experi\xeancia geral na Paytime, rapidamente fui contratado em tempo integral ap\xf3s apenas 3 meses de est\xe1gio",
              4: "Revis\xe3o, an\xe1lise e refatora\xe7\xe3o de c\xf3digo",
              5: "Trabalhei em colabora\xe7\xe3o com outras equipes para oferecer a melhor experi\xeancia de usu\xe1rio poss\xedvel",
            },
          },
        ],
      };
      class Dt extends Lt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      class Zr {
        constructor() {
          this.storage = window.localStorage;
        }
        set(t, n) {
          return (
            !!this.storage && (this.storage.setItem(t, JSON.stringify(n)), !0)
          );
        }
        get(t) {
          return this.storage
            ? ((this.storageItem = this.storage.getItem(t)),
              this.isJsonString(this.storageItem)
                ? JSON.parse(this.storageItem)
                : this.storageItem)
            : null;
        }
        isJsonString(t) {
          try {
            JSON.parse(t);
          } catch {
            return !1;
          }
          return !0;
        }
        remove(t) {
          return !!this.storage && (this.storage.removeItem(t), !0);
        }
        clear() {
          return !!this.storage && (this.storage.clear(), !0);
        }
      }
      function E(...e) {
        return Te(e, go(e));
      }
      function tr(e) {
        return !!e && (e instanceof fe || (ee(e.lift) && ee(e.subscribe)));
      }
      (Zr.ɵfac = function (t) {
        return new (t || Zr)();
      }),
        (Zr.ɵprov = M({ token: Zr, factory: Zr.ɵfac, providedIn: "root" }));
      const { isArray: _T } = Array,
        { getPrototypeOf: bT, prototype: ET, keys: MT } = Object;
      function av(e) {
        if (1 === e.length) {
          const t = e[0];
          if (_T(t)) return { args: t, keys: null };
          if (
            (function ST(e) {
              return e && "object" == typeof e && bT(e) === ET;
            })(t)
          ) {
            const n = MT(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: IT } = Array;
      function lv(e) {
        return V((t) =>
          (function TT(e, t) {
            return IT(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function cv(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function fi(...e) {
        return (function PT() {
          return ar(1);
        })()(Te(e, go(e)));
      }
      function _a(e) {
        return new fe((t) => {
          bt(e()).subscribe(t);
        });
      }
      function mn(e) {
        return e <= 0
          ? () => Bt
          : Oe((t, n) => {
              let r = 0;
              t.subscribe(
                Ie(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      const uv = { now: () => (uv.delegate || Date).now(), delegate: void 0 };
      class RT extends Lt {
        constructor(t = 1 / 0, n = 1 / 0, r = uv) {
          super(),
            (this._bufferSize = t),
            (this._windowTime = n),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = n === 1 / 0),
            (this._bufferSize = Math.max(1, t)),
            (this._windowTime = Math.max(1, n));
        }
        next(t) {
          const {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s,
          } = this;
          n || (r.push(t), !o && r.push(i.now() + s)),
            this._trimBuffer(),
            super.next(t);
        }
        _subscribe(t) {
          this._throwIfClosed(), this._trimBuffer();
          const n = this._innerSubscribe(t),
            { _infiniteTimeWindow: r, _buffer: o } = this,
            i = o.slice();
          for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2)
            t.next(i[s]);
          return this._checkFinalizedStatuses(t), n;
        }
        _trimBuffer() {
          const {
              _bufferSize: t,
              _timestampProvider: n,
              _buffer: r,
              _infiniteTimeWindow: o,
            } = this,
            i = (o ? 1 : 2) * t;
          if ((t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
            const s = n.now();
            let a = 0;
            for (let l = 1; l < r.length && r[l] <= s; l += 2) a = l;
            a && r.splice(0, a + 1);
          }
        }
      }
      function dv(e, t, n) {
        let r,
          o = !1;
        return (
          e && "object" == typeof e
            ? ({
                bufferSize: r = 1 / 0,
                windowTime: t = 1 / 0,
                refCount: o = !1,
                scheduler: n,
              } = e)
            : (r = e ?? 1 / 0),
          xf({
            connector: () => new RT(r, t, n),
            resetOnError: !0,
            resetOnComplete: !1,
            resetOnRefCountZero: o,
          })
        );
      }
      function vn(e, t) {
        return ee(t) ? Ne(e, t, 1) : Ne(e, 1);
      }
      function Ct(e, t) {
        return Oe((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Ie(
              r,
              (l) => {
                o?.unsubscribe();
                let c = 0;
                const u = i++;
                bt(e(l, u)).subscribe(
                  (o = Ie(
                    r,
                    (d) => r.next(t ? t(l, d, u, c++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      class hi {}
      let fv = (() => {
        class e extends hi {
          getTranslation(n) {
            return E({});
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = So(e)))(r || e);
            };
          })()),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class id {}
      let hv = (() => {
        class e {
          handle(n) {
            return n.key;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function ba(e, t) {
        if (e === t) return !0;
        if (null === e || null === t) return !1;
        if (e != e && t != t) return !0;
        let o,
          i,
          s,
          n = typeof e;
        if (n == typeof t && "object" == n) {
          if (!Array.isArray(e)) {
            if (Array.isArray(t)) return !1;
            for (i in ((s = Object.create(null)), e)) {
              if (!ba(e[i], t[i])) return !1;
              s[i] = !0;
            }
            for (i in t) if (!(i in s) && typeof t[i] < "u") return !1;
            return !0;
          }
          if (!Array.isArray(t)) return !1;
          if ((o = e.length) == t.length) {
            for (i = 0; i < o; i++) if (!ba(e[i], t[i])) return !1;
            return !0;
          }
        }
        return !1;
      }
      function An(e) {
        return typeof e < "u" && null !== e;
      }
      function sd(e) {
        return e && "object" == typeof e && !Array.isArray(e);
      }
      function pv(e, t) {
        let n = Object.assign({}, e);
        return (
          sd(e) &&
            sd(t) &&
            Object.keys(t).forEach((r) => {
              sd(t[r])
                ? r in e
                  ? (n[r] = pv(e[r], t[r]))
                  : Object.assign(n, { [r]: t[r] })
                : Object.assign(n, { [r]: t[r] });
            }),
          n
        );
      }
      class Ea {}
      let gv = (() => {
        class e extends Ea {
          constructor() {
            super(...arguments),
              (this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g);
          }
          interpolate(n, r) {
            let o;
            return (
              (o =
                "string" == typeof n
                  ? this.interpolateString(n, r)
                  : "function" == typeof n
                  ? this.interpolateFunction(n, r)
                  : n),
              o
            );
          }
          getValue(n, r) {
            let o = "string" == typeof r ? r.split(".") : [r];
            r = "";
            do {
              (r += o.shift()),
                !An(n) || !An(n[r]) || ("object" != typeof n[r] && o.length)
                  ? o.length
                    ? (r += ".")
                    : (n = void 0)
                  : ((n = n[r]), (r = ""));
            } while (o.length);
            return n;
          }
          interpolateFunction(n, r) {
            return n(r);
          }
          interpolateString(n, r) {
            return r
              ? n.replace(this.templateMatcher, (o, i) => {
                  let s = this.getValue(r, i);
                  return An(s) ? s : o;
                })
              : n;
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = So(e)))(r || e);
            };
          })()),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ma {}
      let mv = (() => {
        class e extends Ma {
          compile(n, r) {
            return n;
          }
          compileTranslations(n, r) {
            return n;
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = So(e)))(r || e);
            };
          })()),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class vv {
        constructor() {
          (this.currentLang = this.defaultLang),
            (this.translations = {}),
            (this.langs = []),
            (this.onTranslationChange = new ve()),
            (this.onLangChange = new ve()),
            (this.onDefaultLangChange = new ve());
        }
      }
      const ad = new S("USE_STORE"),
        ld = new S("USE_DEFAULT_LANG"),
        cd = new S("DEFAULT_LANGUAGE"),
        ud = new S("USE_EXTEND");
      let pi = (() => {
          class e {
            constructor(n, r, o, i, s, a = !0, l = !1, c = !1, u) {
              (this.store = n),
                (this.currentLoader = r),
                (this.compiler = o),
                (this.parser = i),
                (this.missingTranslationHandler = s),
                (this.useDefaultLang = a),
                (this.isolate = l),
                (this.extend = c),
                (this.pending = !1),
                (this._onTranslationChange = new ve()),
                (this._onLangChange = new ve()),
                (this._onDefaultLangChange = new ve()),
                (this._langs = []),
                (this._translations = {}),
                (this._translationRequests = {}),
                u && this.setDefaultLang(u);
            }
            get onTranslationChange() {
              return this.isolate
                ? this._onTranslationChange
                : this.store.onTranslationChange;
            }
            get onLangChange() {
              return this.isolate
                ? this._onLangChange
                : this.store.onLangChange;
            }
            get onDefaultLangChange() {
              return this.isolate
                ? this._onDefaultLangChange
                : this.store.onDefaultLangChange;
            }
            get defaultLang() {
              return this.isolate ? this._defaultLang : this.store.defaultLang;
            }
            set defaultLang(n) {
              this.isolate
                ? (this._defaultLang = n)
                : (this.store.defaultLang = n);
            }
            get currentLang() {
              return this.isolate ? this._currentLang : this.store.currentLang;
            }
            set currentLang(n) {
              this.isolate
                ? (this._currentLang = n)
                : (this.store.currentLang = n);
            }
            get langs() {
              return this.isolate ? this._langs : this.store.langs;
            }
            set langs(n) {
              this.isolate ? (this._langs = n) : (this.store.langs = n);
            }
            get translations() {
              return this.isolate
                ? this._translations
                : this.store.translations;
            }
            set translations(n) {
              this.isolate
                ? (this._translations = n)
                : (this.store.translations = n);
            }
            setDefaultLang(n) {
              if (n === this.defaultLang) return;
              let r = this.retrieveTranslations(n);
              typeof r < "u"
                ? (null == this.defaultLang && (this.defaultLang = n),
                  r.pipe(mn(1)).subscribe((o) => {
                    this.changeDefaultLang(n);
                  }))
                : this.changeDefaultLang(n);
            }
            getDefaultLang() {
              return this.defaultLang;
            }
            use(n) {
              if (n === this.currentLang) return E(this.translations[n]);
              let r = this.retrieveTranslations(n);
              return typeof r < "u"
                ? (this.currentLang || (this.currentLang = n),
                  r.pipe(mn(1)).subscribe((o) => {
                    this.changeLang(n);
                  }),
                  r)
                : (this.changeLang(n), E(this.translations[n]));
            }
            retrieveTranslations(n) {
              let r;
              return (
                (typeof this.translations[n] > "u" || this.extend) &&
                  ((this._translationRequests[n] =
                    this._translationRequests[n] || this.getTranslation(n)),
                  (r = this._translationRequests[n])),
                r
              );
            }
            getTranslation(n) {
              this.pending = !0;
              const r = this.currentLoader.getTranslation(n).pipe(dv(1), mn(1));
              return (
                (this.loadingTranslations = r.pipe(
                  V((o) => this.compiler.compileTranslations(o, n)),
                  dv(1),
                  mn(1)
                )),
                this.loadingTranslations.subscribe({
                  next: (o) => {
                    (this.translations[n] =
                      this.extend && this.translations[n]
                        ? { ...o, ...this.translations[n] }
                        : o),
                      this.updateLangs(),
                      (this.pending = !1);
                  },
                  error: (o) => {
                    this.pending = !1;
                  },
                }),
                r
              );
            }
            setTranslation(n, r, o = !1) {
              (r = this.compiler.compileTranslations(r, n)),
                (this.translations[n] =
                  (o || this.extend) && this.translations[n]
                    ? pv(this.translations[n], r)
                    : r),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: n,
                  translations: this.translations[n],
                });
            }
            getLangs() {
              return this.langs;
            }
            addLangs(n) {
              n.forEach((r) => {
                -1 === this.langs.indexOf(r) && this.langs.push(r);
              });
            }
            updateLangs() {
              this.addLangs(Object.keys(this.translations));
            }
            getParsedResult(n, r, o) {
              let i;
              if (r instanceof Array) {
                let s = {},
                  a = !1;
                for (let l of r)
                  (s[l] = this.getParsedResult(n, l, o)), tr(s[l]) && (a = !0);
                return a
                  ? (function AT(...e) {
                      const t = mf(e),
                        { args: n, keys: r } = av(e),
                        o = new fe((i) => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let l = s,
                            c = s;
                          for (let u = 0; u < s; u++) {
                            let d = !1;
                            bt(n[u]).subscribe(
                              Ie(
                                i,
                                (f) => {
                                  d || ((d = !0), c--), (a[u] = f);
                                },
                                () => l--,
                                void 0,
                                () => {
                                  (!l || !d) &&
                                    (c || i.next(r ? cv(r, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(lv(t)) : o;
                    })(r.map((c) => (tr(s[c]) ? s[c] : E(s[c])))).pipe(
                      V((c) => {
                        let u = {};
                        return (
                          c.forEach((d, f) => {
                            u[r[f]] = d;
                          }),
                          u
                        );
                      })
                    )
                  : s;
              }
              if (
                (n &&
                  (i = this.parser.interpolate(this.parser.getValue(n, r), o)),
                typeof i > "u" &&
                  null != this.defaultLang &&
                  this.defaultLang !== this.currentLang &&
                  this.useDefaultLang &&
                  (i = this.parser.interpolate(
                    this.parser.getValue(
                      this.translations[this.defaultLang],
                      r
                    ),
                    o
                  )),
                typeof i > "u")
              ) {
                let s = { key: r, translateService: this };
                typeof o < "u" && (s.interpolateParams = o),
                  (i = this.missingTranslationHandler.handle(s));
              }
              return typeof i < "u" ? i : r;
            }
            get(n, r) {
              if (!An(n) || !n.length)
                throw new Error('Parameter "key" required');
              if (this.pending)
                return this.loadingTranslations.pipe(
                  vn((o) =>
                    tr((o = this.getParsedResult(o, n, r))) ? o : E(o)
                  )
                );
              {
                let o = this.getParsedResult(
                  this.translations[this.currentLang],
                  n,
                  r
                );
                return tr(o) ? o : E(o);
              }
            }
            getStreamOnTranslationChange(n, r) {
              if (!An(n) || !n.length)
                throw new Error('Parameter "key" required');
              return fi(
                _a(() => this.get(n, r)),
                this.onTranslationChange.pipe(
                  Ct((o) => {
                    const i = this.getParsedResult(o.translations, n, r);
                    return "function" == typeof i.subscribe ? i : E(i);
                  })
                )
              );
            }
            stream(n, r) {
              if (!An(n) || !n.length)
                throw new Error('Parameter "key" required');
              return fi(
                _a(() => this.get(n, r)),
                this.onLangChange.pipe(
                  Ct((o) => {
                    const i = this.getParsedResult(o.translations, n, r);
                    return tr(i) ? i : E(i);
                  })
                )
              );
            }
            instant(n, r) {
              if (!An(n) || !n.length)
                throw new Error('Parameter "key" required');
              let o = this.getParsedResult(
                this.translations[this.currentLang],
                n,
                r
              );
              if (tr(o)) {
                if (n instanceof Array) {
                  let i = {};
                  return (
                    n.forEach((s, a) => {
                      i[n[a]] = n[a];
                    }),
                    i
                  );
                }
                return n;
              }
              return o;
            }
            set(n, r, o = this.currentLang) {
              (this.translations[o][n] = this.compiler.compile(r, o)),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: o,
                  translations: this.translations[o],
                });
            }
            changeLang(n) {
              (this.currentLang = n),
                this.onLangChange.emit({
                  lang: n,
                  translations: this.translations[n],
                }),
                null == this.defaultLang && this.changeDefaultLang(n);
            }
            changeDefaultLang(n) {
              (this.defaultLang = n),
                this.onDefaultLangChange.emit({
                  lang: n,
                  translations: this.translations[n],
                });
            }
            reloadLang(n) {
              return this.resetLang(n), this.getTranslation(n);
            }
            resetLang(n) {
              (this._translationRequests[n] = void 0),
                (this.translations[n] = void 0);
            }
            getBrowserLang() {
              if (typeof window > "u" || typeof window.navigator > "u") return;
              let n = window.navigator.languages
                ? window.navigator.languages[0]
                : null;
              return (
                (n =
                  n ||
                  window.navigator.language ||
                  window.navigator.browserLanguage ||
                  window.navigator.userLanguage),
                typeof n > "u"
                  ? void 0
                  : (-1 !== n.indexOf("-") && (n = n.split("-")[0]),
                    -1 !== n.indexOf("_") && (n = n.split("_")[0]),
                    n)
              );
            }
            getBrowserCultureLang() {
              if (typeof window > "u" || typeof window.navigator > "u") return;
              let n = window.navigator.languages
                ? window.navigator.languages[0]
                : null;
              return (
                (n =
                  n ||
                  window.navigator.language ||
                  window.navigator.browserLanguage ||
                  window.navigator.userLanguage),
                n
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                _(vv),
                _(hi),
                _(Ma),
                _(Ea),
                _(id),
                _(ld),
                _(ad),
                _(ud),
                _(cd)
              );
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Pn = (() => {
          class e {
            constructor(n, r) {
              (this.translate = n),
                (this._ref = r),
                (this.value = ""),
                (this.lastKey = null),
                (this.lastParams = []);
            }
            updateValue(n, r, o) {
              let i = (s) => {
                (this.value = void 0 !== s ? s : n),
                  (this.lastKey = n),
                  this._ref.markForCheck();
              };
              if (o) {
                let s = this.translate.getParsedResult(o, n, r);
                tr(s.subscribe) ? s.subscribe(i) : i(s);
              }
              this.translate.get(n, r).subscribe(i);
            }
            transform(n, ...r) {
              if (!n || !n.length) return n;
              if (ba(n, this.lastKey) && ba(r, this.lastParams))
                return this.value;
              let o;
              if (An(r[0]) && r.length)
                if ("string" == typeof r[0] && r[0].length) {
                  let i = r[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                  try {
                    o = JSON.parse(i);
                  } catch {
                    throw new SyntaxError(
                      `Wrong parameter in TranslatePipe. Expected a valid Object, received: ${r[0]}`
                    );
                  }
                } else
                  "object" == typeof r[0] && !Array.isArray(r[0]) && (o = r[0]);
              return (
                (this.lastKey = n),
                (this.lastParams = r),
                this.updateValue(n, o),
                this._dispose(),
                this.onTranslationChange ||
                  (this.onTranslationChange =
                    this.translate.onTranslationChange.subscribe((i) => {
                      this.lastKey &&
                        i.lang === this.translate.currentLang &&
                        ((this.lastKey = null),
                        this.updateValue(n, o, i.translations));
                    })),
                this.onLangChange ||
                  (this.onLangChange = this.translate.onLangChange.subscribe(
                    (i) => {
                      this.lastKey &&
                        ((this.lastKey = null),
                        this.updateValue(n, o, i.translations));
                    }
                  )),
                this.onDefaultLangChange ||
                  (this.onDefaultLangChange =
                    this.translate.onDefaultLangChange.subscribe(() => {
                      this.lastKey &&
                        ((this.lastKey = null), this.updateValue(n, o));
                    })),
                this.value
              );
            }
            _dispose() {
              typeof this.onTranslationChange < "u" &&
                (this.onTranslationChange.unsubscribe(),
                (this.onTranslationChange = void 0)),
                typeof this.onLangChange < "u" &&
                  (this.onLangChange.unsubscribe(),
                  (this.onLangChange = void 0)),
                typeof this.onDefaultLangChange < "u" &&
                  (this.onDefaultLangChange.unsubscribe(),
                  (this.onDefaultLangChange = void 0));
            }
            ngOnDestroy() {
              this._dispose();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(pi, 16), I(ri, 16));
            }),
            (e.ɵpipe = qe({ name: "translate", type: e, pure: !1 })),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        OT = (() => {
          class e {
            static forRoot(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.loader || { provide: hi, useClass: fv },
                  n.compiler || { provide: Ma, useClass: mv },
                  n.parser || { provide: Ea, useClass: gv },
                  n.missingTranslationHandler || { provide: id, useClass: hv },
                  vv,
                  { provide: ad, useValue: n.isolate },
                  { provide: ld, useValue: n.useDefaultLang },
                  { provide: ud, useValue: n.extend },
                  { provide: cd, useValue: n.defaultLanguage },
                  pi,
                ],
              };
            }
            static forChild(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.loader || { provide: hi, useClass: fv },
                  n.compiler || { provide: Ma, useClass: mv },
                  n.parser || { provide: Ea, useClass: gv },
                  n.missingTranslationHandler || { provide: id, useClass: hv },
                  { provide: ad, useValue: n.isolate },
                  { provide: ld, useValue: n.useDefaultLang },
                  { provide: ud, useValue: n.extend },
                  { provide: cd, useValue: n.defaultLanguage },
                  pi,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = pt({})),
            e
          );
        })();
      class Rn {
        constructor(t, n) {
          (this.localStorage = t),
            (this.translate = n),
            (this.languageSource = new Dt("")),
            (this.language = this.languageSource.asObservable()),
            this.get();
        }
        set(t) {
          this.localStorage.set("lang", t),
            this.translate.use(t),
            this.languageSource.next(t);
        }
        get() {
          let t = this.localStorage.get("lang");
          t && this.set(t);
        }
      }
      (Rn.ɵfac = function (t) {
        return new (t || Rn)(_(Zr), _(pi));
      }),
        (Rn.ɵprov = M({ token: Rn, factory: Rn.ɵfac, providedIn: "root" }));
      class Xr {
        constructor(t) {
          (this.languageService = t),
            (this.cssClass = ""),
            (this.mobileFullWidth = !1),
            (this.lang = ""),
            (this.env = Kr),
            this.languageService.language.subscribe((n) => (this.lang = n));
        }
      }
      (Xr.ɵfac = function (t) {
        return new (t || Xr)(I(Rn));
      }),
        (Xr.ɵcmp = ze({
          type: Xr,
          selectors: [["app-resume-button"]],
          inputs: { cssClass: "cssClass", mobileFullWidth: "mobileFullWidth" },
          decls: 4,
          vars: 11,
          consts: [["target", "_blank", 3, "href"]],
          template: function (t, n) {
            1 & t && (T(0, "div")(1, "a", 0), Z(2), le(3, "translate"), A()()),
              2 & t &&
                ($r("w-80", n.mobileFullWidth),
                F(1),
                l0("btn btn-blue ", n.cssClass, ""),
                $r("w-100", n.mobileFullWidth),
                me(
                  "href",
                  "pt" === n.lang ? n.env.resume.pt : n.env.resume.en,
                  sn
                ),
                F(1),
                ut(ce(3, 9, "resume_button.text")));
          },
          dependencies: [Pn],
          styles: [
            ".w-80[_ngcontent-%COMP%]{width:80%;margin:auto}a[_ngcontent-%COMP%]{min-width:110px}",
          ],
        }));
      class gi {}
      (gi.ɵfac = function (t) {
        return new (t || gi)();
      }),
        (gi.ɵcmp = ze({
          type: gi,
          selectors: [["app-bio"]],
          decls: 28,
          vars: 19,
          consts: [
            [1, "bio"],
            [1, "row", "justify-content-between", "w-100"],
            [
              1,
              "bio-info",
              "d-flex",
              "flex-column",
              "justify-content-center",
              "col-12",
              "col-lg-6",
            ],
            [1, "text-blue"],
            [1, "mt-2", "mb-4"],
            [1, "text-light"],
            ["cssClass", "p-3 mt-4", 1, "d-none", "d-lg-block"],
            [
              1,
              "bio-photo",
              "d-flex",
              "flex-column",
              "align-items-center",
              "align-items-lg-end",
              "justify-content-center",
              "justify-content-lg-end",
              "col-12",
              "col-lg-6",
            ],
            [1, "image", "restrict-width"],
            ["src", "assets/images/me.png", "alt", "SGP.Dev"],
            [
              "cssClass",
              "p-3 mt-5",
              1,
              "d-block",
              "d-lg-none",
              "w-100",
              3,
              "mobileFullWidth",
            ],
          ],
          template: function (t, n) {
            1 & t &&
              (T(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "p"),
              Z(4),
              le(5, "translate"),
              A(),
              T(6, "h1", 3),
              Z(7),
              le(8, "translate"),
              A(),
              T(9, "h4", 4),
              Z(10),
              le(11, "translate"),
              A(),
              T(12, "p", 5),
              Z(13),
              le(14, "translate"),
              te(15, "br")(16, "br"),
              Z(17),
              le(18, "translate"),
              te(19, "br")(20, "br"),
              Z(21),
              le(22, "translate"),
              A(),
              te(23, "app-resume-button", 6),
              A(),
              T(24, "div", 7)(25, "div", 8),
              te(26, "img", 9),
              A(),
              te(27, "app-resume-button", 10),
              A()()()),
              2 & t &&
                (F(4),
                ut(ce(5, 7, "hero.greetings")),
                F(3),
                ut(ce(8, 9, "hero.name")),
                F(3),
                ut(ce(11, 11, "hero.subtitle")),
                F(3),
                Ce(" ", ce(14, 13, "hero.first_paragraph"), " "),
                F(4),
                Ce(" ", ce(18, 15, "hero.second_paragraph"), " "),
                F(4),
                Ce(" ", ce(22, 17, "hero.third_paragraph"), " "),
                F(6),
                me("mobileFullWidth", !0));
          },
          dependencies: [Xr, Pn],
          styles: [
            "[_ngcontent-%COMP%]:root{--color-bg: #12130f;--color-text: #e1ccb1;--color-blue: #06acd3;--color-text-light: rgba(225, 204, 177, .5);--color-text-light2: rgba(225, 204, 177, .3);--color-blue-light: rgba(6, 172, 211, .75);--color-blue-light2: rgba(6, 172, 211, .35);--color-blue-light3: rgba(6, 172, 211, .15);--color-bg-light: #333333;--nav-height: 100px;--fz-xxs: 12px;--fz-xs: 13px;--fz-sm: 14px;--fz-md: 16px;--fz-lg: 18px;--fz-xl: 20px;--fz-xxl: 22px;--fz-heading: 32px;--transition: all .35s cubic-bezier(.645, .045, .355, 1)}.bio[_ngcontent-%COMP%]{min-height:100vh;height:100%;display:flex;justify-content:center;align-items:center;margin-top:0;padding-top:0}.bio-photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border:2px solid var(--color-text-light);border-radius:50%;object-fit:fill}.bio-info[_ngcontent-%COMP%]   p.text-light[_ngcontent-%COMP%]{min-height:170px}@media only screen and (max-width: 991px){.bio-info[_ngcontent-%COMP%]{margin-bottom:2rem}}@media only screen and (max-width: 768px){app-resume-button[_ngcontent-%COMP%]{align-self:center;width:80%}}",
          ],
        }));
      const NT = ["*"];
      class dd {
        constructor(t) {
          this.icons = t;
        }
      }
      let mi = (() => {
          class e {
            constructor(n, r, o) {
              (this.elem = n), (this.changeDetector = r), (this.icons = o);
            }
            ngOnChanges(n) {
              const o =
                Object.assign({}, ...this.icons)[
                  (function FT(e) {
                    return e
                      .toLowerCase()
                      .replace(/(?:^\w|[A-Z]|\b\w)/g, (t) => t.toUpperCase())
                      .replace(/[-_]/g, "");
                  })(n.name.currentValue)
                ] || "";
              o ||
                console.warn(
                  `Icon not found: ${n.name.currentValue}\nRefer to documentation on https://github.com/michaelbazos/angular-feather`
                ),
                (this.elem.nativeElement.innerHTML = o),
                this.changeDetector.markForCheck();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(an), I(ri), I(dd));
            }),
            (e.ɵcmp = ze({
              type: e,
              selectors: [["i-feather"], ["feather-icon"]],
              inputs: { name: "name" },
              features: [_n],
              ngContentSelectors: NT,
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n &&
                  ((function Tg(e) {
                    const t = w()[16][6];
                    if (!t.projection) {
                      const r = (t.projection = Ao(e ? e.length : 1, null)),
                        o = r.slice();
                      let i = t.child;
                      for (; null !== i; ) {
                        const s = e ? w_(i, e) : 0;
                        null !== s &&
                          (o[s] ? (o[s].projectionNext = i) : (r[s] = i),
                          (o[s] = i)),
                          (i = i.next);
                      }
                    }
                  })(),
                  (function Ag(e, t = 0, n) {
                    const r = w(),
                      o = K(),
                      i = Ar(o, 22 + e, 16, null, n || null);
                    null === i.projection && (i.projection = t),
                      Cl(),
                      32 != (32 & i.flags) &&
                        (function jx(e, t, n) {
                          Yh(
                            t[z],
                            0,
                            t,
                            n,
                            Uh(e, n, t),
                            Wh(n.parent || t[6], n, t)
                          );
                        })(o, r, i);
                  })(0));
              },
              styles: [
                "[_nghost-%COMP%]{display:inline-block;width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2px;stroke-linecap:round;stroke-linejoin:round}",
              ],
            })),
            e
          );
        })(),
        yv = (() => {
          class e {
            constructor(n) {
              if (((this.icons = n), !this.icons))
                throw new Error(
                  "No icon provided. Make sure to use 'FeatherModule.pick({ ... })' when importing the module\nRefer to documentation on https://github.com/michaelbazos/angular-feather"
                );
            }
            static pick(n) {
              return {
                ngModule: e,
                providers: [{ provide: dd, multi: !0, useValue: n }],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(dd, 8));
            }),
            (e.ɵmod = Mt({ type: e })),
            (e.ɵinj = pt({})),
            e
          );
        })();
      function kT(e, t) {
        if ((1 & e && te(0, "img", 2), 2 & e)) {
          const n = t.$implicit,
            r = un();
          me("alt", n.name)("title", n.name)("src", r.getFullLink(n.path), sn);
        }
      }
      class vi {
        constructor() {
          this.technologies = [
            { name: "TypeScript", path: "typescript" },
            { name: "JavaScript", path: "javascript" },
            { name: "HTML", path: "html5" },
            { name: "Angular", path: "angularjs" },
            { name: "Material UI", path: "materialui" },
            { name: "SASS", path: "sass" },
            { name: "Bootstrap", path: "bootstrap" },
          ];
        }
        getFullLink(t) {
          return (
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/" +
            t +
            "/" +
            t +
            "-original.svg"
          );
        }
      }
      (vi.ɵfac = function (t) {
        return new (t || vi)();
      }),
        (vi.ɵcmp = ze({
          type: vi,
          selectors: [["app-technologies"]],
          decls: 2,
          vars: 1,
          consts: [
            [1, "wrapper"],
            [
              "height",
              "30",
              "width",
              "40",
              3,
              "alt",
              "title",
              "src",
              4,
              "ngFor",
              "ngForOf",
            ],
            ["height", "30", "width", "40", 3, "alt", "title", "src"],
          ],
          template: function (t, n) {
            1 & t && (T(0, "div", 0), Wt(1, kT, 1, 3, "img", 1), A()),
              2 & t && (F(1), me("ngForOf", n.technologies));
          },
          dependencies: [ai],
        }));
      class yi {
        constructor() {
          this.env = Kr;
        }
      }
      function LT(e, t) {
        if (1 & e) {
          const n = Us();
          T(0, "button", 7),
            Hr("click", function () {
              const i = as(n).index;
              return ls(un().changeTab(i));
            }),
            Z(1),
            A();
        }
        if (2 & e) {
          const n = t.$implicit,
            r = t.index;
          $r("active", un().currentTab === r),
            qo("id", "tab-", r, ""),
            me("tabindex", r),
            F(1),
            Ce(" ", n.company, " ");
        }
      }
      function BT(e, t) {
        1 & e && te(0, "li", 14),
          2 & e && me("innerHtml", t.$implicit.value, fp);
      }
      function jT(e, t) {
        if (
          (1 & e &&
            (T(0, "div")(1, "div", 9)(2, "h3"),
            Z(3),
            T(4, "span"),
            Z(5, " @ "),
            T(6, "a", 10),
            Z(7),
            A()()(),
            T(8, "p", 11),
            Z(9),
            T(10, "span", 12),
            Z(11),
            A()()(),
            T(12, "ul"),
            Wt(13, BT, 1, 1, "li", 13),
            le(14, "keyvalue"),
            A()()),
          2 & e)
        ) {
          const n = un().$implicit;
          F(3),
            Ce(" ", n.role, " "),
            F(3),
            me("href", n.link, sn),
            F(1),
            Ce("", n.company, " "),
            F(2),
            Ce(" ", n.period, " "),
            F(2),
            Ce("(", n.total_time, ")"),
            F(2),
            me("ngForOf", ce(14, 6, n.details));
        }
      }
      function HT(e, t) {
        if ((1 & e && (T(0, "div"), Wt(1, jT, 15, 8, "div", 8), A()), 2 & e)) {
          const n = t.index,
            r = un();
          F(1), me("ngIf", r.currentTab === n);
        }
      }
      (yi.ɵfac = function (t) {
        return new (t || yi)();
      }),
        (yi.ɵcmp = ze({
          type: yi,
          selectors: [["app-about"]],
          decls: 24,
          vars: 16,
          consts: [
            [1, "row", "justify-content-between", "flex-row-reverse", "mt-4"],
            [1, "col-12", "col-xl-6", "d-flex", "flex-column"],
            [1, "mt-4", "text-light"],
            [1, "mt-3", "text-light"],
            ["target", "_blank", 1, "text-blue", "underline", 3, "href"],
            ["name", "external-link"],
            [1, "technologies"],
            [
              1,
              "col-12",
              "col-xl-6",
              "d-none",
              "d-xl-flex",
              "justify-content-center",
              "justify-content-lg-start",
            ],
            [1, "image", "text-end", "restrict-width"],
            ["src", "assets/images/coding.png", "alt", "Coding"],
          ],
          template: function (t, n) {
            1 & t &&
              (T(0, "div", 0)(1, "div", 1)(2, "p", 2),
              Z(3),
              le(4, "translate"),
              A(),
              T(5, "p", 3),
              Z(6),
              le(7, "translate"),
              T(8, "a", 4),
              Z(9),
              le(10, "translate"),
              te(11, "i-feather", 5),
              Z(12, ")"),
              A()(),
              T(13, "p", 3),
              Z(14),
              le(15, "translate"),
              te(16, "br"),
              Z(17),
              le(18, "translate"),
              A(),
              T(19, "div", 6),
              te(20, "app-technologies"),
              A()(),
              T(21, "div", 7)(22, "div", 8),
              te(23, "img", 9),
              A()()()),
              2 & t &&
                (F(3),
                Ce(" ", ce(4, 6, "about_me.first_paragraph"), " "),
                F(3),
                Ce(" ", ce(7, 8, "about_me.second_paragraph"), " "),
                F(2),
                me("href", n.env.certificates.efset, sn),
                F(1),
                Ce("(", ce(10, 10, "certificate"), " "),
                F(5),
                Ce(" ", ce(15, 12, "about_me.third_paragraph"), " "),
                F(3),
                Ce(" ", ce(18, 14, "about_me.fourth_paragraph"), " "));
          },
          dependencies: [mi, vi, Pn],
          styles: [
            ".photo[_ngcontent-%COMP%]{max-width:350px;max-height:350px;position:relative}.photo[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%]{height:100%;width:100%;z-index:1}.photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border:2px solid var(--color-text);border-radius:50%;width:100%;height:100%;object-fit:fill}i-feather[_ngcontent-%COMP%]{position:relative;top:-3px;stroke:var(--color-blue)}",
          ],
        }));
      class wi {
        constructor() {
          (this.env = Kr), (this.currentTab = 0);
        }
        ngOnInit() {}
        changeTab(t) {
          this.currentTab = t;
        }
      }
      (wi.ɵfac = function (t) {
        return new (t || wi)();
      }),
        (wi.ɵcmp = ze({
          type: wi,
          selectors: [["app-work"]],
          decls: 8,
          vars: 4,
          consts: [
            [1, "wrapper", "row", "mt-4"],
            [1, "col-12"],
            [1, "work-info", "row"],
            ["role", "tablist", 1, "work-buttons"],
            [
              "tpye",
              "button",
              "role",
              "tab",
              3,
              "id",
              "tabindex",
              "active",
              "click",
              4,
              "ngFor",
              "ngForOf",
            ],
            [1, "work-details"],
            [4, "ngFor", "ngForOf"],
            ["tpye", "button", "role", "tab", 3, "id", "tabindex", "click"],
            [4, "ngIf"],
            [1, "work-role"],
            [1, "underline", 3, "href"],
            [1, "text-light"],
            [1, "work-time"],
            ["class", "text-light", 3, "innerHtml", 4, "ngFor", "ngForOf"],
            [1, "text-light", 3, "innerHtml"],
          ],
          template: function (t, n) {
            1 & t &&
              (T(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3),
              Wt(4, LT, 2, 5, "button", 4),
              A(),
              T(5, "div", 5),
              Wt(6, HT, 2, 1, "div", 6),
              le(7, "translate"),
              A()()()()),
              2 & t &&
                (F(4),
                me("ngForOf", n.env.work_history),
                F(2),
                me("ngForOf", ce(7, 2, "work_experience.companies")));
          },
          dependencies: [ai, Pm, Nm, Pn],
          styles: [
            '@charset "UTF-8";[_ngcontent-%COMP%]:root{--color-bg: #12130f;--color-text: #e1ccb1;--color-blue: #06acd3;--color-text-light: rgba(225, 204, 177, .5);--color-text-light2: rgba(225, 204, 177, .3);--color-blue-light: rgba(6, 172, 211, .75);--color-blue-light2: rgba(6, 172, 211, .35);--color-blue-light3: rgba(6, 172, 211, .15);--color-bg-light: #333333;--nav-height: 100px;--fz-xxs: 12px;--fz-xs: 13px;--fz-sm: 14px;--fz-md: 16px;--fz-lg: 18px;--fz-xl: 20px;--fz-xxl: 22px;--fz-heading: 32px;--transition: all .35s cubic-bezier(.645, .045, .355, 1)}.wrapper[_ngcontent-%COMP%]{min-height:700px}.wrapper[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{background-color:var(--color-blue-light3);color:var(--color-blue);border-color:var(--color-blue-light)}.wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{text-decoration:none;background-color:transparent;padding:.75rem 1rem .5rem;border:none;border-left:2px solid;text-align:left;white-space:nowrap}.wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:last-child){margin-right:1.25rem}.wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{position:relative}.wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-weight:500}.wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"\\25b9";position:absolute;left:0;color:var(--color-blue)}.wrapper[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:last-child){margin-bottom:1rem}.wrapper[_ngcontent-%COMP%]   .work-buttons[_ngcontent-%COMP%]{width:16.66666667%}.wrapper[_ngcontent-%COMP%]   .work-details[_ngcontent-%COMP%]{width:83.33333333%}.wrapper[_ngcontent-%COMP%]   .work-details[_ngcontent-%COMP%]   .work-role[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.5rem}.wrapper[_ngcontent-%COMP%]   .work-details[_ngcontent-%COMP%]   .work-role[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem}.wrapper[_ngcontent-%COMP%]   .work-details[_ngcontent-%COMP%]   .work-role[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--color-blue)}.wrapper[_ngcontent-%COMP%]   .work-details[_ngcontent-%COMP%]   .work-time[_ngcontent-%COMP%]{font-size:.875rem;color:var(--color-text-light)!important}@media only screen and (max-width: 1200px){.wrapper[_ngcontent-%COMP%]   .work-buttons[_ngcontent-%COMP%]{width:100%!important;margin-bottom:.5rem;display:flex;overflow-x:auto;padding-bottom:1rem}.wrapper[_ngcontent-%COMP%]   .work-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-left:none;border-bottom:2px solid var(--color-blue-light3)}.wrapper[_ngcontent-%COMP%]   .work-details[_ngcontent-%COMP%]{width:100%!important}}@media only screen and (max-width: 768px){.wrapper[_ngcontent-%COMP%]   .work-details[_ngcontent-%COMP%]   .work-role[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .work-details[_ngcontent-%COMP%]   .work-role[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:1.25rem}}',
          ],
        }));
      class xi {
        constructor() {
          this.env = Kr;
        }
      }
      (xi.ɵfac = function (t) {
        return new (t || xi)();
      }),
        (xi.ɵcmp = ze({
          type: xi,
          selectors: [["app-contact"]],
          decls: 13,
          vars: 11,
          consts: [
            [1, "wrapper", "text-center"],
            [1, "mb-4"],
            [1, "mb-4", "text-light"],
            [1, "underline", 3, "href"],
            ["name", "mail"],
          ],
          template: function (t, n) {
            1 & t &&
              (T(0, "div", 0)(1, "h1", 1),
              Z(2),
              le(3, "translate"),
              A(),
              T(4, "p", 2),
              Z(5),
              le(6, "translate"),
              A(),
              T(7, "p", 1),
              Z(8),
              le(9, "translate"),
              A(),
              T(10, "a", 3),
              te(11, "i-feather", 4),
              Z(12),
              A()()),
              2 & t &&
                (F(2),
                ut(ce(3, 5, "contact_info.title")),
                F(3),
                Ce(" ", ce(6, 7, "contact_info.first_paragraph"), " "),
                F(3),
                ut(ce(9, 9, "contact_info.second_paragraph")),
                F(2),
                qo("href", "mailto:", n.env.email, "", sn),
                F(2),
                ut(n.env.email));
          },
          dependencies: [mi, Pn],
          styles: [
            "[_ngcontent-%COMP%]:root{--color-bg: #12130f;--color-text: #e1ccb1;--color-blue: #06acd3;--color-text-light: rgba(225, 204, 177, .5);--color-text-light2: rgba(225, 204, 177, .3);--color-blue-light: rgba(6, 172, 211, .75);--color-blue-light2: rgba(6, 172, 211, .35);--color-blue-light3: rgba(6, 172, 211, .15);--color-bg-light: #333333;--nav-height: 100px;--fz-xxs: 12px;--fz-xs: 13px;--fz-sm: 14px;--fz-md: 16px;--fz-lg: 18px;--fz-xl: 20px;--fz-xxl: 22px;--fz-heading: 32px;--transition: all .35s cubic-bezier(.645, .045, .355, 1)}.wrapper[_ngcontent-%COMP%]{width:60%;margin:auto;padding-top:0}.wrapper[_ngcontent-%COMP%]   i-feather[_ngcontent-%COMP%]{stroke:var(--color-blue);margin-right:.5rem}.wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--color-blue)}.wrapper[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--color-text-light)}@media only screen and (max-width: 768px){.wrapper[_ngcontent-%COMP%]{width:100%}}",
          ],
        }));
      class Di {
        constructor() {}
        ngOnInit() {}
      }
      (Di.ɵfac = function (t) {
        return new (t || Di)();
      }),
        (Di.ɵcmp = ze({
          type: Di,
          selectors: [["app-home"]],
          decls: 17,
          vars: 9,
          consts: [
            [1, "content", "container"],
            ["id", "about"],
            [1, "numbered-title"],
            ["id", "work"],
            [
              "id",
              "contact",
              1,
              "contact",
              "d-flex",
              "flex-column",
              "align-items-center",
              "pt-0",
            ],
            [1, "numbered-title", "no-line"],
          ],
          template: function (t, n) {
            1 & t &&
              (T(0, "main", 0),
              te(1, "app-bio"),
              T(2, "section", 1)(3, "h2", 2),
              Z(4),
              le(5, "translate"),
              A(),
              te(6, "app-about"),
              A(),
              T(7, "section", 3)(8, "h2", 2),
              Z(9),
              le(10, "translate"),
              A(),
              te(11, "app-work"),
              A(),
              T(12, "section", 4)(13, "h2", 5),
              Z(14),
              le(15, "translate"),
              A(),
              te(16, "app-contact"),
              A()()),
              2 & t &&
                (F(4),
                ut(ce(5, 3, "about_me.anchor")),
                F(5),
                ut(ce(10, 5, "work_experience.anchor")),
                F(5),
                Ce(" ", ce(15, 7, "contact_info.anchor"), " "));
          },
          dependencies: [gi, yi, wi, xi, Pn],
          styles: [
            '[_ngcontent-%COMP%]:root{--color-bg: #12130f;--color-text: #e1ccb1;--color-blue: #06acd3;--color-text-light: rgba(225, 204, 177, .5);--color-text-light2: rgba(225, 204, 177, .3);--color-blue-light: rgba(6, 172, 211, .75);--color-blue-light2: rgba(6, 172, 211, .35);--color-blue-light3: rgba(6, 172, 211, .15);--color-bg-light: #333333;--nav-height: 100px;--fz-xxs: 12px;--fz-xs: 13px;--fz-sm: 14px;--fz-md: 16px;--fz-lg: 18px;--fz-xl: 20px;--fz-xxl: 22px;--fz-heading: 32px;--transition: all .35s cubic-bezier(.645, .045, .355, 1)}.content[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;counter-reset:section 0}.numbered-title[_ngcontent-%COMP%]{display:flex;align-items:center;position:relative;margin:10px 0;padding-bottom:.5rem;width:100%;font-size:clamp(26px,5vw,var(--fz-heading));white-space:nowrap}.numbered-title.no-line[_ngcontent-%COMP%]{display:block;color:var(--color-blue);font-size:clamp(1.25rem,5vw,var(--fz-sm));font-weight:400;width:initial}.numbered-title.no-line[_ngcontent-%COMP%]:before{top:0;font-size:clamp(1rem,5vw,var(--fz-sm))}.numbered-title.no-line[_ngcontent-%COMP%]:after{display:none}.numbered-title[_ngcontent-%COMP%]:before{position:relative;counter-increment:section 1;content:"0" counter(section) ".";margin-right:10px;color:var(--color-blue);font-size:clamp(var(--fz-md),3vw,var(--fz-xl));font-weight:400;top:4px}.numbered-title[_ngcontent-%COMP%]:after{content:"";display:block;position:relative;width:300px;height:1px;margin-left:20px;background-color:var(--color-blue-light3)}@media only screen and (max-width: 1440px){.content[_ngcontent-%COMP%]{padding:0 2.5rem}}@media only screen and (max-width: 1080px){.content[_ngcontent-%COMP%]{padding:0 3rem}}@media only screen and (max-width: 1024px){.content[_ngcontent-%COMP%]{padding:0 4rem}}@media only screen and (max-width: 991px){.content[_ngcontent-%COMP%]{margin-top:1.5rem;padding:0 2rem}}@media only screen and (max-width: 768px){.numbered-title[_ngcontent-%COMP%]:after{width:100%}}',
          ],
        }));
      const Sa = fo(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function wv(...e) {
        const t = go(e),
          n = mf(e),
          { args: r, keys: o } = av(e);
        if (0 === r.length) return Te([], t);
        const i = new fe(
          (function VT(e, t, n = jn) {
            return (r) => {
              xv(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let l = 0; l < o; l++)
                    xv(
                      t,
                      () => {
                        const c = Te(e[l], t);
                        let u = !1;
                        c.subscribe(
                          Ie(
                            r,
                            (d) => {
                              (i[l] = d),
                                u || ((u = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, o ? (s) => cv(o, s) : jn)
        );
        return n ? i.pipe(lv(n)) : i;
      }
      function xv(e, t, n) {
        e ? Yt(n, e, t) : t();
      }
      function Ci(e, t) {
        const n = ee(e) ? e : () => e,
          r = (o) => o.error(n());
        return new fe(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function fd() {
        return Oe((e, t) => {
          let n = null;
          e._refCount++;
          const r = Ie(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class Dv extends fe {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            ef(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ft();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Ie(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = ft.EMPTY));
          }
          return t;
        }
        refCount() {
          return fd()(this);
        }
      }
      function yn(e, t) {
        return Oe((n, r) => {
          let o = 0;
          n.subscribe(Ie(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Ia(e) {
        return Oe((t, n) => {
          let r = !1;
          t.subscribe(
            Ie(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function Cv(e = UT) {
        return Oe((t, n) => {
          let r = !1;
          t.subscribe(
            Ie(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function UT() {
        return new Sa();
      }
      function On(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? yn((o, i) => e(o, i, r)) : jn,
            mn(1),
            n ? Ia(t) : Cv(() => new Sa())
          );
      }
      function Ue(e, t, n) {
        const r = ee(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Oe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Ie(
                  i,
                  (l) => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, l),
                      i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      i.complete();
                  },
                  (l) => {
                    var c;
                    (a = !1),
                      null === (c = r.error) || void 0 === c || c.call(r, l),
                      i.error(l);
                  },
                  () => {
                    var l, c;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (c = r.finalize) || void 0 === c || c.call(r);
                  }
                )
              );
            })
          : jn;
      }
      function Nn(e) {
        return Oe((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Ie(n, void 0, void 0, (s) => {
              (i = bt(e(s, Nn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function zT(e, t, n, r, o) {
        return (i, s) => {
          let a = n,
            l = t,
            c = 0;
          i.subscribe(
            Ie(
              s,
              (u) => {
                const d = c++;
                (l = a ? e(l, u, d) : ((a = !0), u)), r && s.next(l);
              },
              o &&
                (() => {
                  a && s.next(l), s.complete();
                })
            )
          );
        };
      }
      function _v(e, t) {
        return Oe(zT(e, t, arguments.length >= 2, !0));
      }
      function hd(e) {
        return e <= 0
          ? () => Bt
          : Oe((t, n) => {
              let r = [];
              t.subscribe(
                Ie(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function bv(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? yn((o, i) => e(o, i, r)) : jn,
            hd(1),
            n ? Ia(t) : Cv(() => new Sa())
          );
      }
      function pd(e) {
        return Oe((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const H = "primary",
        _i = Symbol("RouteTitle");
      class WT {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Qr(e) {
        return new WT(e);
      }
      function KT(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Xt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !Ev(e[o], t[o]))) return !1;
        return !0;
      }
      function Ev(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function Mv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Sv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Le(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Fn(e) {
        return bg(e) ? e : zs(e) ? Te(Promise.resolve(e)) : E(e);
      }
      const Ta = !1,
        XT = {
          exact: function Av(e, t, n) {
            if (
              !rr(e.segments, t.segments) ||
              !Aa(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Av(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Pv,
        },
        Iv = {
          exact: function QT(e, t) {
            return Xt(e, t);
          },
          subset: function YT(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Ev(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Tv(e, t, n) {
        return (
          XT[n.paths](e.root, t.root, n.matrixParams) &&
          Iv[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Pv(e, t, n) {
        return Rv(e, t, t.segments, n);
      }
      function Rv(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!rr(o, n) || t.hasChildren() || !Aa(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!rr(e.segments, n) || !Aa(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !Pv(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(rr(e.segments, o) && Aa(e.segments, o, r) && e.children[H]) &&
            Rv(e.children[H], t, i, r)
          );
        }
      }
      function Aa(e, t, n) {
        return t.every((r, o) => Iv[n](e[o].parameters, r.parameters));
      }
      class nr {
        constructor(t = new q([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Qr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return tA.serialize(this);
        }
      }
      class q {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Le(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Pa(this);
        }
      }
      class bi {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Qr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Fv(this);
        }
      }
      function rr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let Ei = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return new gd();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class gd {
        parse(t) {
          const n = new uA(t);
          return new nr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Mi(t.root, !0)}`,
            r = (function oA(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Ra(n)}=${Ra(o)}`).join("&")
                    : `${Ra(n)}=${Ra(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function nA(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const tA = new gd();
      function Pa(e) {
        return e.segments.map((t) => Fv(t)).join("/");
      }
      function Mi(e, t) {
        if (!e.hasChildren()) return Pa(e);
        if (t) {
          const n = e.children[H] ? Mi(e.children[H], !1) : "",
            r = [];
          return (
            Le(e.children, (o, i) => {
              i !== H && r.push(`${i}:${Mi(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function eA(e, t) {
            let n = [];
            return (
              Le(e.children, (r, o) => {
                o === H && (n = n.concat(t(r, o)));
              }),
              Le(e.children, (r, o) => {
                o !== H && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === H ? [Mi(e.children[H], !1)] : [`${o}:${Mi(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[H]
            ? `${Pa(e)}/${n[0]}`
            : `${Pa(e)}/(${n.join("//")})`;
        }
      }
      function Ov(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ra(e) {
        return Ov(e).replace(/%3B/gi, ";");
      }
      function md(e) {
        return Ov(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Oa(e) {
        return decodeURIComponent(e);
      }
      function Nv(e) {
        return Oa(e.replace(/\+/g, "%20"));
      }
      function Fv(e) {
        return `${md(e.path)}${(function rA(e) {
          return Object.keys(e)
            .map((t) => `;${md(t)}=${md(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const iA = /^[^\/()?;=#]+/;
      function Na(e) {
        const t = e.match(iA);
        return t ? t[0] : "";
      }
      const sA = /^[^=?&#]+/,
        lA = /^[^&#]+/;
      class uA {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new q([], {})
              : new q([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[H] = new q(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Na(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new x(4009, Ta);
          return this.capture(t), new bi(Oa(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Na(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Na(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Oa(n)] = Oa(r);
        }
        parseQueryParam(t) {
          const n = (function aA(e) {
            const t = e.match(sA);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function cA(e) {
              const t = e.match(lA);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = Nv(n),
            i = Nv(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Na(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new x(4010, Ta);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = H);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[H] : new q([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new x(4011, Ta);
        }
      }
      function vd(e) {
        return e.segments.length > 0 ? new q([], { [H]: e }) : e;
      }
      function Fa(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Fa(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function dA(e) {
          if (1 === e.numberOfChildren && e.children[H]) {
            const t = e.children[H];
            return new q(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new q(e.segments, t));
      }
      function or(e) {
        return e instanceof nr;
      }
      function pA(e, t, n, r, o) {
        if (0 === n.length) return Yr(t.root, t.root, t.root, r, o);
        const i = (function Bv(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new Lv(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Le(i.outlets, (l, c) => {
                    a[c] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new Lv(n, t, r);
        })(n);
        return i.toRoot()
          ? Yr(t.root, t.root, new q([], {}), r, o)
          : (function s(l) {
              const c = (function mA(e, t, n, r) {
                  if (e.isAbsolute) return new Jr(t.root, !0, 0);
                  if (-1 === r) return new Jr(n, n === t.root, 0);
                  return (function jv(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r)) throw new x(4005, !1);
                      o = r.segments.length;
                    }
                    return new Jr(r, !1, o - i);
                  })(n, r + (Si(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, l),
                u = c.processChildren
                  ? eo(c.segmentGroup, c.index, i.commands)
                  : wd(c.segmentGroup, c.index, i.commands);
              return Yr(t.root, c.segmentGroup, u, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function Si(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Ii(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Yr(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Le(r, (l, c) => {
            i[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
          }),
          (s = e === t ? n : kv(e, t, n));
        const a = vd(Fa(s));
        return new nr(a, i, o);
      }
      function kv(e, t, n) {
        const r = {};
        return (
          Le(e.children, (o, i) => {
            r[i] = o === t ? n : kv(o, t, n);
          }),
          new q(e.segments, r)
        );
      }
      class Lv {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Si(r[0]))
          )
            throw new x(4003, !1);
          const o = r.find(Ii);
          if (o && o !== Sv(r)) throw new x(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Jr {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function wd(e, t, n) {
        if (
          (e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return eo(e, t, n);
        const r = (function yA(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Ii(a)) break;
              const l = `${a}`,
                c = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && c && "object" == typeof c && void 0 === c.outlets) {
                if (!Vv(l, c, s)) return i;
                r += 2;
              } else {
                if (!Vv(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new q(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[H] = new q(e.segments.slice(r.pathIndex), e.children)),
            eo(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new q(e.segments, {})
          : r.match && !e.hasChildren()
          ? xd(e, t, n)
          : r.match
          ? eo(e, 0, o)
          : xd(e, t, n);
      }
      function eo(e, t, n) {
        if (0 === n.length) return new q(e.segments, {});
        {
          const r = (function vA(e) {
              return Ii(e[0]) ? e[0].outlets : { [H]: e };
            })(n),
            o = {};
          return !r[H] &&
            e.children[H] &&
            1 === e.numberOfChildren &&
            0 === e.children[H].segments.length
            ? eo(e.children[H], t, n)
            : (Le(r, (i, s) => {
                "string" == typeof i && (i = [i]),
                  null !== i && (o[s] = wd(e.children[s], t, i));
              }),
              Le(e.children, (i, s) => {
                void 0 === r[s] && (o[s] = i);
              }),
              new q(e.segments, o));
        }
      }
      function xd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Ii(i)) {
            const l = wA(i.outlets);
            return new q(r, l);
          }
          if (0 === o && Si(n[0])) {
            r.push(new bi(e.segments[t].path, Hv(n[0]))), o++;
            continue;
          }
          const s = Ii(i) ? i.outlets[H] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Si(a)
            ? (r.push(new bi(s, Hv(a))), (o += 2))
            : (r.push(new bi(s, {})), o++);
        }
        return new q(r, {});
      }
      function wA(e) {
        const t = {};
        return (
          Le(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = xd(new q([], {}), 0, n));
          }),
          t
        );
      }
      function Hv(e) {
        const t = {};
        return Le(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function Vv(e, t, n) {
        return e == n.path && Xt(t, n.parameters);
      }
      const Ti = "imperative";
      class Qt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Dd extends Qt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ir extends Qt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ka extends Qt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class $v extends Qt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class Uv extends Qt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class xA extends Qt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class DA extends Qt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class CA extends Qt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class _A extends Qt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class bA extends Qt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class EA {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class MA {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class SA {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class IA {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class TA {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class AA {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zv {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let RA = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return pA(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        OA = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function (t) {
                return RA.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Gv {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Cd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Cd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = _d(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return _d(t, this._root).map((n) => n.value);
        }
      }
      function Cd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Cd(e, n);
          if (r) return r;
        }
        return null;
      }
      function _d(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = _d(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class wn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function to(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class qv extends Gv {
        constructor(t, n) {
          super(t), (this.snapshot = n), bd(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Wv(e, t) {
        const n = (function NA(e, t) {
            const s = new La([], {}, {}, "", {}, H, t, null, e.root, -1, {});
            return new Zv("", new wn(s, []));
          })(e, t),
          r = new Dt([new bi("", {})]),
          o = new Dt({}),
          i = new Dt({}),
          s = new Dt({}),
          a = new Dt(""),
          l = new no(r, o, s, a, i, H, t, n.root);
        return (l.snapshot = n.root), new qv(new wn(l, []), n);
      }
      class no {
        constructor(t, n, r, o, i, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(V((c) => c[_i])) ?? E(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(V((t) => Qr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(V((t) => Qr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Kv(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function FA(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class La {
        get title() {
          return this.data?.[_i];
        }
        constructor(t, n, r, o, i, s, a, l, c, u, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = c),
            (this._lastPathIndex = u),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Qr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Qr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Zv extends Gv {
        constructor(t, n) {
          super(n), (this.url = t), bd(this, n);
        }
        toString() {
          return Xv(this._root);
        }
      }
      function bd(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => bd(e, n));
      }
      function Xv(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Xv).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Ed(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Xt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Xt(t.params, n.params) || e.params.next(n.params),
            (function ZT(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Xt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Xt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Md(e, t) {
        const n =
          Xt(e.params, t.params) &&
          (function JT(e, t) {
            return (
              rr(e, t) && e.every((n, r) => Xt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Md(e.parent, t.parent))
        );
      }
      function Ai(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function LA(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ai(e, r, o);
              return Ai(e, r);
            });
          })(e, t, n);
          return new wn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ai(e, a))),
                s
              );
            }
          }
          const r = (function BA(e) {
              return new no(
                new Dt(e.url),
                new Dt(e.params),
                new Dt(e.queryParams),
                new Dt(e.fragment),
                new Dt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Ai(e, i));
          return new wn(r, o);
        }
      }
      const Sd = "ngNavigationCancelingError";
      function Qv(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = or(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = Yv(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function Yv(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Sd] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function Jv(e) {
        return e2(e) && or(e.url);
      }
      function e2(e) {
        return e && e[Sd];
      }
      class jA {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Pi()),
            (this.attachRef = null);
        }
      }
      let Pi = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new jA()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ba = !1;
      let Id = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = H),
              (this.activateEvents = new ve()),
              (this.deactivateEvents = new ve()),
              (this.attachEvents = new ve()),
              (this.detachEvents = new ve()),
              (this.parentContexts = G(Pi)),
              (this.location = G(Ot)),
              (this.changeDetector = G(ri)),
              (this.environmentInjector = G(Ut));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new x(4012, Ba);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new x(4012, Ba);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new x(4012, Ba);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new x(4013, Ba);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new HA(n, a, o.injector);
            if (
              r &&
              (function VA(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const c = r.resolveComponentFactory(s);
              this.activated = o.createComponent(c, o.length, l);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = Ge({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [_n],
          })),
          e
        );
      })();
      class HA {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === no
            ? this.route
            : t === Pi
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Td = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = ze({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [X0],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && te(0, "router-outlet");
            },
            dependencies: [Id],
            encapsulation: 2,
          })),
          e
        );
      })();
      function t2(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = Ys(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Pd(e) {
        const t = e.children && e.children.map(Pd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== H &&
            (n.component = Td),
          n
        );
      }
      function _t(e) {
        return e.outlet || H;
      }
      function n2(e, t) {
        const n = e.filter((r) => _t(r) === t);
        return n.push(...e.filter((r) => _t(r) !== t)), n;
      }
      function Ri(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class qA {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Ed(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = to(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Le(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = to(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = to(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = to(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new AA(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new IA(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Ed(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Ed(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Ri(o.snapshot),
                l = a?.get(Vo) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class r2 {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ja {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function WA(e, t, n) {
        const r = e._root;
        return Oi(r, t ? t._root : null, n, [r.value]);
      }
      function ro(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function Vy(e) {
              return null !== Zi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Oi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = to(t);
        return (
          e.children.forEach((s) => {
            (function ZA(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function XA(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !rr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !rr(e.url, t.url) || !Xt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Md(e, t) || !Xt(e.queryParams, t.queryParams);
                    default:
                      return !Md(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new r2(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Oi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ja(a.outlet.component, s));
              } else
                s && Ni(t, a, o),
                  o.canActivateChecks.push(new r2(r)),
                  Oi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Le(i, (s, a) => Ni(s, n.getContext(a), o)),
          o
        );
      }
      function Ni(e, t, n) {
        const r = to(e),
          o = e.value;
        Le(r, (i, s) => {
          Ni(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new ja(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Fi(e) {
        return "function" == typeof e;
      }
      function Rd(e) {
        return e instanceof Sa || "EmptyError" === e?.name;
      }
      const Ha = Symbol("INITIAL_VALUE");
      function oo() {
        return Ct((e) =>
          wv(
            e.map((t) =>
              t.pipe(
                mn(1),
                (function $T(...e) {
                  const t = go(e);
                  return Oe((n, r) => {
                    (t ? fi(e, n, t) : fi(e, n)).subscribe(r);
                  });
                })(Ha)
              )
            )
          ).pipe(
            V((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Ha) return Ha;
                  if (!1 === n || n instanceof nr) return n;
                }
              return !0;
            }),
            yn((t) => t !== Ha),
            mn(1)
          )
        );
      }
      function o2(e) {
        return (function ay(...e) {
          return Qd(e);
        })(
          Ue((t) => {
            if (or(t)) throw Qv(0, t);
          }),
          V((t) => !0 === t)
        );
      }
      const Od = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function i2(e, t, n, r, o) {
        const i = Nd(e, t, n);
        return i.matched
          ? (function h4(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? E(
                    o.map((s) => {
                      const a = ro(s, e);
                      return Fn(
                        (function n4(e) {
                          return e && Fi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(oo(), o2())
                : E(!0);
            })((r = t2(t, r)), t, n).pipe(V((s) => (!0 === s ? i : { ...Od })))
          : E(i);
      }
      function Nd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Od }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || KT)(n, e, t);
        if (!o) return { ...Od };
        const i = {};
        Le(o.posParams, (a, l) => {
          i[l] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Va(e, t, n, r) {
        if (
          n.length > 0 &&
          (function m4(e, t, n) {
            return n.some((r) => $a(e, t, r) && _t(r) !== H);
          })(e, n, r)
        ) {
          const i = new q(
            t,
            (function g4(e, t, n, r) {
              const o = {};
              (o[H] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && _t(i) !== H) {
                  const s = new q([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[_t(i)] = s);
                }
              return o;
            })(e, t, r, new q(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function v4(e, t, n) {
            return n.some((r) => $a(e, t, r));
          })(e, n, r)
        ) {
          const i = new q(
            e.segments,
            (function p4(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if ($a(e, n, s) && !o[_t(s)]) {
                  const a = new q([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[_t(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new q(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function $a(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function s2(e, t, n, r) {
        return (
          !!(_t(e) === r || (r !== H && $a(t, n, e))) &&
          ("**" === e.path || Nd(t, e, n).matched)
        );
      }
      function a2(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const Ua = !1;
      class za {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class l2 {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ki(e) {
        return Ci(new za(e));
      }
      function c2(e) {
        return Ci(new l2(e));
      }
      class D4 {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Va(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new q(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, H)
            .pipe(
              V((i) =>
                this.createUrlTree(
                  Fa(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Nn((i) => {
                if (i instanceof l2)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof za ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, H)
            .pipe(
              V((o) => this.createUrlTree(Fa(o), t.queryParams, t.fragment))
            )
            .pipe(
              Nn((o) => {
                throw o instanceof za ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new x(4002, Ua);
        }
        createUrlTree(t, n, r) {
          const o = vd(t);
          return new nr(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(V((i) => new q([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Te(o).pipe(
            vn((i) => {
              const s = r.children[i],
                a = n2(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                V((l) => ({ segment: l, outlet: i }))
              );
            }),
            _v((i, s) => ((i[s.outlet] = s.segment), i), {}),
            bv()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return Te(r).pipe(
            vn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                Nn((c) => {
                  if (c instanceof za) return E(null);
                  throw c;
                })
              )
            ),
            On((a) => !!a),
            Nn((a, l) => {
              if (Rd(a)) return a2(n, o, i) ? E(new q([], {})) : ki(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return s2(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : ki(n)
            : ki(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? c2(i)
            : this.lineralizeSegments(r, i).pipe(
                Ne((s) => {
                  const a = new q(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: c,
            positionalParamSegments: u,
          } = Nd(n, o, i);
          if (!a) return ki(n);
          const d = this.applyRedirectCommands(l, o.redirectTo, u);
          return o.redirectTo.startsWith("/")
            ? c2(d)
            : this.lineralizeSegments(o, d).pipe(
                Ne((f) => this.expandSegment(t, n, r, f.concat(c), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = t2(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? E({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    V(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new q(o, {})
                      )
                    )
                  )
                : E(new q(o, {})))
            : i2(n, r, o, t).pipe(
                Ct(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Ne((u) => {
                            const d = u.injector ?? t,
                              f = u.routes,
                              { segmentGroup: h, slicedSegments: p } = Va(
                                n,
                                a,
                                l,
                                f
                              ),
                              g = new q(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                V((v) => new q(a, v))
                              );
                            if (0 === f.length && 0 === p.length)
                              return E(new q(a, {}));
                            const m = _t(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              m ? H : i,
                              !0
                            ).pipe(
                              V((D) => new q(a.concat(D.segments), D.children))
                            );
                          })
                        )
                      : ki(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? E({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? E({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function f4(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? E(!0)
                    : E(
                        o.map((s) => {
                          const a = ro(s, e);
                          return Fn(
                            (function YA(e) {
                              return e && Fi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(oo(), o2());
                })(t, n, r).pipe(
                  Ne((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Ue((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function w4(e) {
                          return Ci(Yv(Ua, 3));
                        })()
                  )
                )
            : E({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return E(r);
            if (o.numberOfChildren > 1 || !o.children[H])
              return Ci(new x(4e3, Ua));
            o = o.children[H];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new nr(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Le(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Le(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, o);
            }),
            new q(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new x(4001, Ua);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class _4 {}
      class M4 {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = Va(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            H
          ).pipe(
            V((n) => {
              if (null === n) return null;
              const r = new La(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  H,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new wn(r, n),
                i = new Zv(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Kv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return Te(Object.keys(r.children)).pipe(
            vn((o) => {
              const i = r.children[o],
                s = n2(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            _v((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function GT(e, t = !1) {
              return Oe((n, r) => {
                let o = 0;
                n.subscribe(
                  Ie(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            Ia(null),
            bv(),
            V((o) => {
              if (null === o) return null;
              const i = d2(o);
              return (
                (function S4(e) {
                  e.sort((t, n) =>
                    t.value.outlet === H
                      ? -1
                      : n.value.outlet === H
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return Te(n).pipe(
            vn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            On((s) => !!s),
            Nn((s) => {
              if (Rd(s)) return a2(r, o, i) ? E([]) : E(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !s2(n, r, o, i)) return E(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? Sv(o).parameters : {},
              l = h2(r) + o.length;
            s = E({
              snapshot: new La(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                p2(n),
                _t(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                f2(r),
                l,
                g2(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = i2(r, n, o, t).pipe(
              V(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: c,
                  parameters: u,
                }) => {
                  if (!a) return null;
                  const d = h2(r) + l.length;
                  return {
                    snapshot: new La(
                      l,
                      u,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      p2(n),
                      _t(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      f2(r),
                      d,
                      g2(n)
                    ),
                    consumedSegments: l,
                    remainingSegments: c,
                  };
                }
              )
            );
          return s.pipe(
            Ct((a) => {
              if (null === a) return E(null);
              const {
                snapshot: l,
                consumedSegments: c,
                remainingSegments: u,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function I4(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = Va(
                  r,
                  c,
                  u,
                  f.filter((m) => void 0 === m.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  V((m) => (null === m ? null : [new wn(l, m)]))
                );
              if (0 === f.length && 0 === p.length) return E([new wn(l, [])]);
              const g = _t(n) === i;
              return this.processSegment(d, f, h, p, g ? H : i).pipe(
                V((m) => (null === m ? null : [new wn(l, m)]))
              );
            })
          );
        }
      }
      function T4(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function d2(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!T4(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = d2(r.children);
          t.push(new wn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function f2(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function h2(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function p2(e) {
        return e.data || {};
      }
      function g2(e) {
        return e.resolve || {};
      }
      function m2(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Fd(e) {
        return Ct((t) => {
          const n = e(t);
          return n ? Te(n).pipe(V(() => t)) : E(t);
        });
      }
      const io = new S("ROUTES");
      let kd = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return E(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Fn(n.loadComponent()).pipe(
                V(y2),
                Ue((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                pd(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new Dv(r, () => new Lt()).pipe(fd());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return E({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                V((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    c,
                    u = !1;
                  Array.isArray(a)
                    ? (c = a)
                    : ((l = a.create(n).injector),
                      (c = Mv(l.get(io, [], N.Self | N.Optional))));
                  return { routes: c.map(Pd), injector: l };
                }),
                pd(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new Dv(i, () => new Lt()).pipe(fd());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Fn(n()).pipe(
              V(y2),
              Ne((o) =>
                o instanceof K0 || Array.isArray(o)
                  ? E(o)
                  : Te(this.compiler.compileModuleAsync(o))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(zt), _(H1));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function y2(e) {
        return (function B4(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let qa = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Lt()),
              (this.configLoader = G(kd)),
              (this.environmentInjector = G(Ut)),
              (this.urlSerializer = G(Ei)),
              (this.rootContexts = G(Pi)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => E(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new MA(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new EA(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new Dt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Ti,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                yn((r) => 0 !== r.id),
                V((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Ct((r) => {
                  let o = !1,
                    i = !1;
                  return E(r).pipe(
                    Ue((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Ct((s) => {
                      const a = n.browserUrlTree.toString(),
                        l =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const u = "";
                        return (
                          this.events.next(
                            new $v(s.id, n.serializeUrl(r.rawUrl), u, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Bt
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          w2(s.source) && (n.browserUrlTree = s.extractedUrl),
                          E(s).pipe(
                            Ct((u) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Dd(
                                    u.id,
                                    this.urlSerializer.serialize(
                                      u.extractedUrl
                                    ),
                                    u.source,
                                    u.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? Bt
                                  : Promise.resolve(u)
                              );
                            }),
                            (function C4(e, t, n, r) {
                              return Ct((o) =>
                                (function x4(e, t, n, r, o) {
                                  return new D4(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  V((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            Ue((u) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: u.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = u.urlAfterRedirects);
                            }),
                            (function P4(e, t, n, r, o) {
                              return Ne((i) =>
                                (function E4(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new M4(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Ct((a) =>
                                        null === a
                                          ? (function b4(e) {
                                              return new fe((t) => t.error(e));
                                            })(new _4())
                                          : E(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(V((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            Ue((u) => {
                              if (
                                ((r.targetSnapshot = u.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!u.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    u.urlAfterRedirects,
                                    u.rawUrl
                                  );
                                  n.setBrowserUrl(f, u);
                                }
                                n.browserUrlTree = u.urlAfterRedirects;
                              }
                              const d = new xA(
                                u.id,
                                this.urlSerializer.serialize(u.extractedUrl),
                                this.urlSerializer.serialize(
                                  u.urlAfterRedirects
                                ),
                                u.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        l &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: u,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new Dd(u, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const m = Wv(d, this.rootComponentType).snapshot;
                        return E(
                          (r = {
                            ...s,
                            targetSnapshot: m,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const u = "";
                        return (
                          this.events.next(
                            new $v(s.id, n.serializeUrl(r.extractedUrl), u, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Bt
                        );
                      }
                    }),
                    Ue((s) => {
                      const a = new DA(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    V(
                      (s) =>
                        (r = {
                          ...s,
                          guards: WA(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function o4(e, t) {
                      return Ne((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? E({ ...n, guardsResult: !0 })
                          : (function i4(e, t, n, r) {
                              return Te(e).pipe(
                                Ne((o) =>
                                  (function d4(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? E(
                                          i.map((a) => {
                                            const l = Ri(t) ?? o,
                                              c = ro(a, l);
                                            return Fn(
                                              (function t4(e) {
                                                return e && Fi(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, t, n, r)
                                                : l.runInContext(() =>
                                                    c(e, t, n, r)
                                                  )
                                            ).pipe(On());
                                          })
                                        ).pipe(oo())
                                      : E(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                On((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Ne((a) =>
                                a &&
                                (function QA(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function s4(e, t, n, r) {
                                      return Te(t).pipe(
                                        vn((o) =>
                                          fi(
                                            (function l4(e, t) {
                                              return (
                                                null !== e && t && t(new SA(e)),
                                                E(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function a4(e, t) {
                                              return (
                                                null !== e && t && t(new TA(e)),
                                                E(!0)
                                              );
                                            })(o.route, r),
                                            (function u4(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function KA(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    _a(() =>
                                                      E(
                                                        s.guards.map((l) => {
                                                          const c =
                                                              Ri(s.node) ?? n,
                                                            u = ro(l, c);
                                                          return Fn(
                                                            (function e4(e) {
                                                              return (
                                                                e &&
                                                                Fi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(u)
                                                              ? u.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : c.runInContext(
                                                                  () => u(r, e)
                                                                )
                                                          ).pipe(On());
                                                        })
                                                      ).pipe(oo())
                                                    )
                                                  );
                                              return E(i).pipe(oo());
                                            })(e, o.path, n),
                                            (function c4(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return E(!0);
                                              const o = r.map((i) =>
                                                _a(() => {
                                                  const s = Ri(t) ?? n,
                                                    a = ro(i, s);
                                                  return Fn(
                                                    (function JA(e) {
                                                      return (
                                                        e && Fi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(On());
                                                })
                                              );
                                              return E(o).pipe(oo());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        On((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : E(a)
                              ),
                              V((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    Ue((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), or(s.guardsResult))
                      )
                        throw Qv(0, s.guardsResult);
                      const a = new CA(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    yn(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Fd((s) => {
                      if (s.guards.canActivateChecks.length)
                        return E(s).pipe(
                          Ue((a) => {
                            const l = new _A(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          Ct((a) => {
                            let l = !1;
                            return E(a).pipe(
                              (function R4(e, t) {
                                return Ne((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return E(n);
                                  let i = 0;
                                  return Te(o).pipe(
                                    vn((s) =>
                                      (function O4(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !m2(o) &&
                                            (i[_i] = o.title),
                                          (function N4(e, t, n, r) {
                                            const o = (function F4(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return E({});
                                            const i = {};
                                            return Te(o).pipe(
                                              Ne((s) =>
                                                (function k4(e, t, n, r) {
                                                  const o = Ri(t) ?? r,
                                                    i = ro(e, o);
                                                  return Fn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  On(),
                                                  Ue((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              hd(1),
                                              (function qT(e) {
                                                return V(() => e);
                                              })(i),
                                              Nn((s) => (Rd(s) ? Bt : Ci(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            V(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = Kv(e, n).resolve),
                                                o &&
                                                  m2(o) &&
                                                  (e.data[_i] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Ue(() => i++),
                                    hd(1),
                                    Ne((s) => (i === o.length ? E(n) : Bt))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Ue({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          Ue((a) => {
                            const l = new bA(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    Fd((s) => {
                      const a = (l) => {
                        const c = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          c.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              Ue((u) => {
                                l.component = u;
                              }),
                              V(() => {})
                            )
                          );
                        for (const u of l.children) c.push(...a(u));
                        return c;
                      };
                      return wv(a(s.targetSnapshot.root)).pipe(Ia(), mn(1));
                    }),
                    Fd(() => this.afterPreactivation()),
                    V((s) => {
                      const a = (function kA(e, t, n) {
                        const r = Ai(e, t._root, n ? n._root : void 0);
                        return new qv(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    Ue((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      V(
                        (r) => (
                          new qA(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Ue({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new ir(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    pd(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    Nn((s) => {
                      if (((i = !0), e2(s))) {
                        Jv(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new ka(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), Jv(s))) {
                          const l = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            c = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || w2(r.source),
                            };
                          n.scheduleNavigation(l, Ti, null, c, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new Uv(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (l) {
                          r.reject(l);
                        }
                      }
                      return Bt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new ka(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function w2(e) {
        return e !== Ti;
      }
      let x2 = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === H));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[_i];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return G(j4);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        j4 = (() => {
          class e extends x2 {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(ov));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        H4 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return G($4);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class V4 {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let $4 = (() => {
        class e extends V4 {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = So(e)))(r || e);
            };
          })()),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Wa = new S("", { providedIn: "root", factory: () => ({}) });
      let z4 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return G(G4);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        G4 = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function q4(e) {
        throw e;
      }
      function W4(e, t, n) {
        return t.parse("/");
      }
      const K4 = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        Z4 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let dt = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = G(dM)),
              (this.isNgZoneEnabled = !1),
              (this.options = G(Wa, { optional: !0 }) || {}),
              (this.errorHandler = this.options.errorHandler || q4),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || W4),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = G(z4)),
              (this.routeReuseStrategy = G(H4)),
              (this.urlCreationStrategy = G(OA)),
              (this.titleStrategy = G(x2)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = Mv(G(io, { optional: !0 }) ?? [])),
              (this.navigationTransitions = G(qa)),
              (this.urlSerializer = G(Ei)),
              (this.location = G(Ou)),
              (this.isNgZoneEnabled =
                G(_e) instanceof _e && _e.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new nr()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Wv(this.currentUrlTree, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (n) => {
                  (this.lastSuccessfulId = n.id),
                    (this.currentPageId = n.targetPageId);
                },
                (n) => {
                  this.console.warn(`Unhandled Navigation Error: ${n}`);
                }
              );
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Ti, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const l = { ...o };
              delete l.navigationId,
                delete l.ɵrouterPageId,
                0 !== Object.keys(l).length && (i.state = l);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(Pd)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              c = l ? this.currentUrlTree.fragment : s;
            let u = null;
            switch (a) {
              case "merge":
                u = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                u = this.currentUrlTree.queryParams;
                break;
              default:
                u = i || null;
            }
            return (
              null !== u && (u = this.removeEmptyProps(u)),
              this.urlCreationStrategy.createUrlTree(
                o,
                this.routerState,
                this.currentUrlTree,
                n,
                u,
                c ?? null
              )
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = or(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, Ti, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function X4(e) {
                for (let t = 0; t < e.length; t++) {
                  if (null == e[t]) throw new x(4008, !1);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...K4 } : !1 === r ? { ...Z4 } : r), or(n)))
              return Tv(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return Tv(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, c, u;
            return (
              s
                ? ((a = s.resolve), (l = s.reject), (c = s.promise))
                : (c = new Promise((d, f) => {
                    (a = d), (l = f);
                  })),
              (u =
                "computed" === this.canceledNavigationResolution
                  ? o && o.ɵrouterPageId
                    ? o.ɵrouterPageId
                    : i.replaceUrl || i.skipLocationChange
                    ? this.browserPageId ?? 0
                    : (this.browserPageId ?? 0) + 1
                  : 0),
              this.navigationTransitions.handleNavigationRequest({
                targetPageId: u,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: l,
                promise: c,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              c.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  this.getCurrentNavigation()?.finalUrl) ||
              0 === o
                ? this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class C2 {}
      let J4 = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                yn((n) => n instanceof ir),
                vn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Ys(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
              (i.loadComponent && !i._loadedComponent)
                ? o.push(this.preloadConfig(s, i))
                : (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Te(o).pipe(ar());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : E(null);
              const i = o.pipe(
                Ne((s) =>
                  null === s
                    ? E(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Te([i, this.loader.loadComponent(r)]).pipe(ar())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(dt), _(H1), _(Ut), _(C2), _(kd));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Bd = new S("");
      let _2 = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Dd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof ir &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof zv &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new zv(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function Gp() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function sr(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function E2() {
        const e = G(zt);
        return (t) => {
          const n = e.get(ia);
          if (t !== n.components[0]) return;
          const r = e.get(dt),
            o = e.get(M2);
          1 === e.get(Hd) && r.initialNavigation(),
            e.get(S2, null, N.Optional)?.setUpPreloading(),
            e.get(Bd, null, N.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.unsubscribe());
        };
      }
      const M2 = new S("", { factory: () => new Lt() }),
        Hd = new S("", { providedIn: "root", factory: () => 1 });
      const S2 = new S("");
      function oP(e) {
        return sr(0, [
          { provide: S2, useExisting: J4 },
          { provide: C2, useExisting: e },
        ]);
      }
      const I2 = new S("ROUTER_FORROOT_GUARD"),
        iP = [
          Ou,
          { provide: Ei, useClass: gd },
          dt,
          Pi,
          {
            provide: no,
            useFactory: function b2(e) {
              return e.routerState.root;
            },
            deps: [dt],
          },
          kd,
          [],
        ];
      function sP() {
        return new W1("Router", dt);
      }
      let T2 = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                iP,
                [],
                { provide: io, multi: !0, useValue: n },
                {
                  provide: I2,
                  useFactory: uP,
                  deps: [[dt, new Po(), new Ro()]],
                },
                { provide: Wa, useValue: r || {} },
                r?.useHash
                  ? { provide: er, useClass: YM }
                  : { provide: er, useClass: mm },
                {
                  provide: Bd,
                  useFactory: () => {
                    const e = G(mI),
                      t = G(_e),
                      n = G(Wa),
                      r = G(qa),
                      o = G(Ei);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new _2(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? oP(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: W1, multi: !0, useFactory: sP },
                r?.initialNavigation ? dP(r) : [],
                [
                  { provide: A2, useFactory: E2 },
                  { provide: j1, multi: !0, useExisting: A2 },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: io, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(I2, 8));
          }),
          (e.ɵmod = Mt({ type: e })),
          (e.ɵinj = pt({ imports: [Td] })),
          e
        );
      })();
      function uP(e) {
        return "guarded";
      }
      function dP(e) {
        return [
          "disabled" === e.initialNavigation
            ? sr(3, [
                {
                  provide: na,
                  multi: !0,
                  useFactory: () => {
                    const t = G(dt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Hd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? sr(2, [
                { provide: Hd, useValue: 0 },
                {
                  provide: na,
                  multi: !0,
                  deps: [zt],
                  useFactory: (t) => {
                    const n = t.get(XM, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((o) => {
                            const i = t.get(dt),
                              s = t.get(M2);
                            (function r(o) {
                              t.get(dt)
                                .events.pipe(
                                  yn(
                                    (s) =>
                                      s instanceof ir ||
                                      s instanceof ka ||
                                      s instanceof Uv
                                  ),
                                  V(
                                    (s) =>
                                      s instanceof ir ||
                                      (s instanceof ka &&
                                        (0 === s.code || 1 === s.code) &&
                                        null)
                                  ),
                                  yn((s) => null !== s),
                                  mn(1)
                                )
                                .subscribe(() => {
                                  o();
                                });
                            })(() => {
                              o(!0);
                            }),
                              (t.get(qa).afterPreactivation = () => (
                                o(!0), s.closed ? E(void 0) : s
                              )),
                              i.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const A2 = new S(""),
        hP = [
          { path: "", component: Di },
          { path: "404", component: di },
          { path: "**", redirectTo: "/404", pathMatch: "full" },
        ];
      class ao {}
      (ao.ɵfac = function (t) {
        return new (t || ao)();
      }),
        (ao.ɵmod = Mt({ type: ao })),
        (ao.ɵinj = pt({ imports: [T2.forRoot(hP), T2] }));
      const rO = {
        Github:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather feather-github">\n    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>\n</svg>',
        Linkedin:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather feather-linkedin">\n    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>\n</svg>',
        Mail: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather feather-mail">\n    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>\n</svg>',
        Globe:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather feather-globe">\n    <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>\n</svg>',
        Menu: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather feather-menu">\n    <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>\n</svg>',
        ExternalLink:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather feather-external-link">\n    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>\n</svg>',
      };
      class lo {}
      (lo.ɵfac = function (t) {
        return new (t || lo)();
      }),
        (lo.ɵmod = Mt({ type: lo })),
        (lo.ɵinj = pt({ imports: [yv.pick(rO), yv] }));
      class Ka {}
      class Vd {}
      class xn {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof xn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new xn();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof xn
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class oO {
        encodeKey(t) {
          return L2(t);
        }
        encodeValue(t) {
          return L2(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const sO = /%(\d[a-f0-9])/gi,
        aO = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function L2(e) {
        return encodeURIComponent(e).replace(sO, (t, n) => aO[n] ?? t);
      }
      function Za(e) {
        return `${e}`;
      }
      class kn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new oO()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function iO(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        l = n.get(s) || [];
                      l.push(a), n.set(s, l);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(Za) : [Za(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new kn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(Za(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(Za(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class lO {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function B2(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function j2(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function H2(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Bi {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function cO(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new xn()),
            this.context || (this.context = new lO()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new kn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : B2(this.body) ||
              j2(this.body) ||
              H2(this.body) ||
              (function uO(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof kn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || H2(this.body)
            ? null
            : j2(this.body)
            ? this.body.type || null
            : B2(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof kn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const u = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                l
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                c
              )),
            new Bi(n, r, i, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var Se = (() => (
        ((Se = Se || {})[(Se.Sent = 0)] = "Sent"),
        (Se[(Se.UploadProgress = 1)] = "UploadProgress"),
        (Se[(Se.ResponseHeader = 2)] = "ResponseHeader"),
        (Se[(Se.DownloadProgress = 3)] = "DownloadProgress"),
        (Se[(Se.Response = 4)] = "Response"),
        (Se[(Se.User = 5)] = "User"),
        Se
      ))();
      class $d {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new xn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Ud extends $d {
        constructor(t = {}) {
          super(t), (this.type = Se.ResponseHeader);
        }
        clone(t = {}) {
          return new Ud({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Xa extends $d {
        constructor(t = {}) {
          super(t),
            (this.type = Se.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Xa({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class V2 extends $d {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function zd(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let $2 = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof Bi) i = n;
            else {
              let l, c;
              (l = o.headers instanceof xn ? o.headers : new xn(o.headers)),
                o.params &&
                  (c =
                    o.params instanceof kn
                      ? o.params
                      : new kn({ fromObject: o.params })),
                (i = new Bi(n, r, void 0 !== o.body ? o.body : null, {
                  headers: l,
                  context: o.context,
                  params: c,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = E(i).pipe(vn((l) => this.handler.handle(l)));
            if (n instanceof Bi || "events" === o.observe) return s;
            const a = s.pipe(yn((l) => l instanceof Xa));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      V((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      V((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      V((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(V((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new kn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, zd(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, zd(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, zd(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Ka));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function U2(e, t) {
        return t(e);
      }
      function dO(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const hO = new S("HTTP_INTERCEPTORS"),
        ji = new S("HTTP_INTERCEPTOR_FNS");
      function pO() {
        let e = null;
        return (t, n) => (
          null === e &&
            (e = (G(hO, { optional: !0 }) ?? []).reduceRight(dO, U2)),
          e(t, n)
        );
      }
      let z2 = (() => {
        class e extends Ka {
          constructor(n, r) {
            super(),
              (this.backend = n),
              (this.injector = r),
              (this.chain = null);
          }
          handle(n) {
            if (null === this.chain) {
              const r = Array.from(new Set(this.injector.get(ji)));
              this.chain = r.reduceRight(
                (o, i) =>
                  (function fO(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (i) => e(i, o)));
                  })(o, i, this.injector),
                U2
              );
            }
            return this.chain(n, (r) => this.backend.handle(r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Vd), _(Ut));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const yO = /^\)\]\}',?\n/;
      let q2 = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new fe((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = o.statusText || "OK",
                    p = new xn(o.getAllResponseHeaders()),
                    g =
                      (function wO(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (s = new Ud({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: g,
                    })),
                    s
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: g, url: m } = a(),
                    y = null;
                  204 !== p &&
                    (y = typeof o.response > "u" ? o.responseText : o.response),
                    0 === p && (p = y ? 200 : 0);
                  let D = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof y) {
                    const v = y;
                    y = y.replace(yO, "");
                    try {
                      y = "" !== y ? JSON.parse(y) : null;
                    } catch (R) {
                      (y = v), D && ((D = !1), (y = { error: R, text: y }));
                    }
                  }
                  D
                    ? (r.next(
                        new Xa({
                          body: y,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: m || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new V2({
                          error: y,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: m || void 0,
                        })
                      );
                },
                c = (h) => {
                  const { url: p } = a(),
                    g = new V2({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(g);
                };
              let u = !1;
              const d = (h) => {
                  u || (r.next(a()), (u = !0));
                  let p = { type: Se.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: Se.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", l),
                o.addEventListener("error", c),
                o.addEventListener("timeout", c),
                o.addEventListener("abort", c),
                n.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: Se.Sent }),
                () => {
                  o.removeEventListener("error", c),
                    o.removeEventListener("abort", c),
                    o.removeEventListener("load", l),
                    o.removeEventListener("timeout", c),
                    n.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Bm));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Gd = new S("XSRF_ENABLED"),
        W2 = "XSRF-TOKEN",
        K2 = new S("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => W2,
        }),
        Z2 = "X-XSRF-TOKEN",
        X2 = new S("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => Z2,
        });
      class Q2 {}
      let xO = (() => {
        class e {
          constructor(n, r, o) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = Mm(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Je), _(mu), _(K2));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function DO(e, t) {
        const n = e.url.toLowerCase();
        if (
          !G(Gd) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = G(Q2).getToken(),
          o = G(X2);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var we = (() => (
        ((we = we || {})[(we.Interceptors = 0)] = "Interceptors"),
        (we[(we.LegacyInterceptors = 1)] = "LegacyInterceptors"),
        (we[(we.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
        (we[(we.NoXsrfProtection = 3)] = "NoXsrfProtection"),
        (we[(we.JsonpSupport = 4)] = "JsonpSupport"),
        (we[(we.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
        we
      ))();
      function co(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function CO(...e) {
        const t = [
          $2,
          q2,
          z2,
          { provide: Ka, useExisting: z2 },
          { provide: Vd, useExisting: q2 },
          { provide: ji, useValue: DO, multi: !0 },
          { provide: Gd, useValue: !0 },
          { provide: Q2, useClass: xO },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function pD(e) {
          return { ɵproviders: e };
        })(t);
      }
      const Y2 = new S("LEGACY_INTERCEPTOR_FN");
      function bO({ cookieName: e, headerName: t }) {
        const n = [];
        return (
          void 0 !== e && n.push({ provide: K2, useValue: e }),
          void 0 !== t && n.push({ provide: X2, useValue: t }),
          co(we.CustomXsrfConfiguration, n)
        );
      }
      let EO = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Mt({ type: e })),
          (e.ɵinj = pt({
            providers: [
              CO(
                co(we.LegacyInterceptors, [
                  { provide: Y2, useFactory: pO },
                  { provide: ji, useExisting: Y2, multi: !0 },
                ]),
                bO({ cookieName: W2, headerName: Z2 })
              ),
            ],
          })),
          e
        );
      })();
      class MO {
        constructor(t, n = "assets/i18n/", r = ".json") {
          (this.http = t), (this.prefix = n), (this.suffix = r);
        }
        getTranslation(t) {
          return this.http.get(`${this.prefix}${t}${this.suffix}`);
        }
      }
      function SO(e, t) {
        if ((1 & e && (T(0, "li", 16)(1, "a", 17), Z(2), A()()), 2 & e)) {
          const n = t.$implicit;
          F(1), me("href", n.ref, sn), F(1), ut(n.name);
        }
      }
      function IO(e, t) {
        if (1 & e) {
          const n = Us();
          T(0, "li")(1, "a", 18),
            Hr("click", function () {
              const i = as(n).$implicit;
              return ls(un().setLanguage(i.acro));
            }),
            T(2, "span"),
            Z(3),
            A()()();
        }
        if (2 & e) {
          const n = t.$implicit,
            r = un();
          F(1),
            $r("selected", n.acro === r.currentLanguage),
            F(2),
            Ws("", n.image, " ", n.name, "");
        }
      }
      class Hi {
        constructor(t) {
          (this.languageService = t),
            (this.env = Kr),
            (this.currentLanguage = ""),
            this.languageService.language.subscribe(
              (n) => (this.currentLanguage = n)
            );
        }
        setLanguage(t) {
          this.languageService.set(t);
        }
      }
      (Hi.ɵfac = function (t) {
        return new (t || Hi)(I(Rn));
      }),
        (Hi.ɵcmp = ze({
          type: Hi,
          selectors: [["app-header"]],
          decls: 20,
          vars: 7,
          consts: [
            [1, "sticky-top"],
            [1, "navbar", "navbar-expand-lg", "navbar-light", "bg-transparent"],
            [1, "container"],
            ["href", "#", 1, "navbar-brand"],
            ["src", "assets/images/logo3.png", "alt", "SGP"],
            [
              "type",
              "button",
              "data-bs-toggle",
              "collapse",
              "data-bs-target",
              "#navbarSupportedContent",
              "aria-controls",
              "navbarSupportedContent",
              "aria-expanded",
              "false",
              "aria-label",
              "Toggle navigation",
              1,
              "navbar-toggler",
            ],
            [1, "navbar-toggler-icon"],
            ["name", "menu"],
            ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse"],
            [1, "navbar-nav", "ms-auto", "mb-2", "mb-lg-0"],
            ["class", "nav-item", 4, "ngFor", "ngForOf"],
            [
              1,
              "nav-item",
              "dropdown",
              "no-before",
              "py-1",
              "d-block",
              "d-md-none",
            ],
            [
              "href",
              "#",
              "id",
              "navbarDropdown",
              "role",
              "button",
              "data-bs-toggle",
              "dropdown",
              "aria-expanded",
              "false",
              1,
              "nav-link",
              "dropdown-toggle",
            ],
            ["aria-labelledby", "navbarDropdown", 1, "dropdown-menu"],
            [4, "ngFor", "ngForOf"],
            [
              1,
              "resume",
              "d-flex",
              "align-self-end",
              "align-self-md-start",
              "no-before",
            ],
            [1, "nav-item"],
            ["aria-current", "page", 1, "nav-link", 3, "href"],
            [1, "dropdown-item", 3, "click"],
          ],
          template: function (t, n) {
            1 & t &&
              (T(0, "header", 0)(1, "nav", 1)(2, "div", 2)(3, "a", 3),
              te(4, "img", 4),
              A(),
              T(5, "button", 5)(6, "span", 6),
              te(7, "i-feather", 7),
              A()(),
              T(8, "div", 8)(9, "ul", 9),
              Wt(10, SO, 3, 2, "li", 10),
              le(11, "translate"),
              T(12, "li", 11)(13, "a", 12),
              Z(14),
              le(15, "translate"),
              A(),
              T(16, "ul", 13),
              Wt(17, IO, 4, 4, "li", 14),
              A()(),
              T(18, "li", 15),
              te(19, "app-resume-button"),
              A()()()()()()),
              2 & t &&
                (F(10),
                me("ngForOf", ce(11, 3, "header_anchors")),
                F(4),
                Ce(" ", ce(15, 5, "language_switch"), " "),
                F(3),
                me("ngForOf", n.env.available_languages));
          },
          dependencies: [ai, mi, Xr, Pn],
          styles: [
            '[_ngcontent-%COMP%]:root{--color-bg: #12130f;--color-text: #e1ccb1;--color-blue: #06acd3;--color-text-light: rgba(225, 204, 177, .5);--color-text-light2: rgba(225, 204, 177, .3);--color-blue-light: rgba(6, 172, 211, .75);--color-blue-light2: rgba(6, 172, 211, .35);--color-blue-light3: rgba(6, 172, 211, .15);--color-bg-light: #333333;--nav-height: 100px;--fz-xxs: 12px;--fz-xs: 13px;--fz-sm: 14px;--fz-md: 16px;--fz-lg: 18px;--fz-xl: 20px;--fz-xxl: 22px;--fz-heading: 32px;--transition: all .35s cubic-bezier(.645, .045, .355, 1)}header[_ngcontent-%COMP%]{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);filter:none!important}.navbar[_ngcontent-%COMP%]{padding:0}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{counter-increment:item 1;background-color:var(--color-bg);margin:0 5px;border-radius:.25rem}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--color-text)}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{content:"0" counter(item) ".";margin-right:5px;color:var(--color-blue);font-size:var(--fz-xxs);text-align:right}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--color-blue)}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .dropdown-menu.show[_ngcontent-%COMP%]{background-color:transparent;border-color:var(--color-blue-light2)}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .dropdown-menu.show[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:0}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .dropdown-menu.show[_ngcontent-%COMP%]   a.selected[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--color-blue-light)}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .dropdown-menu.show[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{display:none}.navbar-toggler[_ngcontent-%COMP%]{border-color:var(--color-blue)}.navbar-toggler-icon[_ngcontent-%COMP%]{background-image:none}.navbar-collapse.collapsing[_ngcontent-%COMP%], .navbar-collapse.show[_ngcontent-%COMP%]{background-color:var(--color-bg-light);border-radius:.5rem;padding:1rem}.navbar[_ngcontent-%COMP%]   i-feather[_ngcontent-%COMP%]{stroke:var(--color-blue)}ul.dropdown-menu.show[_ngcontent-%COMP%]{background-color:transparent;width:-moz-fit-content;width:fit-content}ul.dropdown-menu.show[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block}ul.dropdown-menu.show[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:last-child){padding-bottom:.25rem}ul.dropdown-menu.show[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:last-child)   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{border-bottom:1px solid var(--color-blue-light2);padding-bottom:.75rem}.no-before[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{display:none}@media only screen and (max-width: 991px){.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:.5rem;font-size:1.25rem;background-color:transparent}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{font-size:var(--fz-md)}.navbar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .resume[_ngcontent-%COMP%]{margin-top:1rem}}',
          ],
        }));
      class Vi {}
      function TO(e, t) {
        if (
          (1 & e && (T(0, "li")(1, "a", 9), te(2, "i-feather", 10), A()()),
          2 & e)
        ) {
          const n = t.$implicit;
          F(1),
            me("href", n.link, sn)("target", n.isEmail ? "_self" : "_blank"),
            F(1),
            me("name", n.name);
        }
      }
      function AO(e, t) {
        if (1 & e) {
          const n = Us();
          T(0, "a", 11),
            Hr("click", function () {
              const i = as(n).$implicit;
              return ls(un().setLanguage(i.acro));
            }),
            Z(1),
            A();
        }
        if (2 & e) {
          const n = t.$implicit;
          F(1), Ws("", n.image, " ", n.name, "");
        }
      }
      (Vi.ɵfac = function (t) {
        return new (t || Vi)();
      }),
        (Vi.ɵcmp = ze({
          type: Vi,
          selectors: [["app-footer"]],
          decls: 17,
          vars: 3,
          consts: [
            [1, "social", "d-block", "d-md-none"],
            [1, "p-0"],
            ["href", "https://github.com/steuf0", "target", "_blank"],
            ["name", "github"],
            [
              "href",
              "https://www.linkedin.com/in/sthefanogarcia/",
              "target",
              "_blank",
            ],
            ["name", "linkedin"],
            ["href", "mailto:sthefanog@gmail.com"],
            ["name", "mail"],
            [1, "info"],
            ["href", "https://github.com/steuf0/spg-dev", "target", "_blank"],
          ],
          template: function (t, n) {
            1 & t &&
              (T(0, "footer")(1, "div", 0)(2, "div")(3, "ul", 1)(4, "li")(
                5,
                "a",
                2
              ),
              te(6, "i-feather", 3),
              A()(),
              T(7, "li")(8, "a", 4),
              te(9, "i-feather", 5),
              A()(),
              T(10, "li")(11, "a", 6),
              te(12, "i-feather", 7),
              A()()()()(),
              T(13, "div", 8)(14, "a", 9),
              Z(15),
              le(16, "translate"),
              A()()()),
              2 & t && (F(15), Ce(" ", ce(16, 1, "footer.text"), ""));
          },
          dependencies: [mi, Pn],
          styles: [
            "footer[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;height:auto;min-height:70px;padding:15px;text-align:center;font-size:.75rem;-webkit-box-pack:center;-webkit-box-align:center}footer[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:flex}footer[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:last-child){margin-right:1rem}footer[_ngcontent-%COMP%]   i-feather[_ngcontent-%COMP%], footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{color:var(--color-text-light);stroke:var(--color-text-light)}",
          ],
        }));
      class $i {
        constructor(t, n) {
          (this.languageService = t),
            (this.translate = n),
            (this.title = "SGP.Dev"),
            (this.currentLanguage = ""),
            (this.env = Kr),
            (this.icons = [
              { name: "github", link: this.env.links.github },
              { name: "linkedin", link: this.env.links.linkedin },
              { name: "mail", link: `mailto:${this.env.email}`, isEmail: !0 },
            ]),
            this.languageService.language.subscribe((r) => {
              r ? (this.currentLanguage = r) : this.getBrowserLanguage();
            }),
            this.translate.setDefaultLang(this.env.fallback_language);
        }
        getBrowserLanguage() {
          let t = this.translate.getBrowserLang(),
            n = this.checkIfLanguageExists(t);
          t && !n && this.setLanguage(this.env.fallback_language),
            t && n && this.setLanguage(t);
        }
        setLanguage(t) {
          this.languageService.set(t);
        }
        checkIfLanguageExists(t) {
          return this.env.available_languages.map((r) => r.acro).includes(t);
        }
      }
      ($i.ɵfac = function (t) {
        return new (t || $i)(I(Rn), I(pi));
      }),
        ($i.ɵcmp = ze({
          type: $i,
          selectors: [["app-root"]],
          decls: 14,
          vars: 3,
          consts: [
            [1, "side-div", "left"],
            [1, "side-content"],
            [1, "d-flex", "flex-column"],
            [4, "ngFor", "ngForOf"],
            [1, "side-div", "right"],
            [1, "dropdown"],
            [
              "role",
              "button",
              "id",
              "dropdownMenuLink",
              "data-bs-toggle",
              "dropdown",
              "aria-haspopup",
              "true",
              "aria-expanded",
              "false",
              1,
              "btn",
              "btn-blue",
              "dropdown-toggle",
            ],
            ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu"],
            ["class", "dropdown-item", 3, "click", 4, "ngFor", "ngForOf"],
            [3, "href", "target"],
            [3, "name"],
            [1, "dropdown-item", 3, "click"],
          ],
          template: function (t, n) {
            1 & t &&
              (te(0, "app-header"),
              T(1, "div", 0)(2, "div", 1)(3, "ul", 2),
              Wt(4, TO, 3, 3, "li", 3),
              A()()(),
              T(5, "div", 4)(6, "div", 1)(7, "div", 5)(8, "a", 6),
              Z(9),
              A(),
              T(10, "div", 7),
              Wt(11, AO, 2, 2, "a", 8),
              A()()()(),
              te(12, "router-outlet")(13, "app-footer")),
              2 & t &&
                (F(4),
                me("ngForOf", n.icons),
                F(5),
                ut(n.currentLanguage.toUpperCase()),
                F(2),
                me("ngForOf", n.env.available_languages));
          },
          dependencies: [ai, Id, mi, Hi, Vi],
          styles: [
            '[_ngcontent-%COMP%]:root{--color-bg: #12130f;--color-text: #e1ccb1;--color-blue: #06acd3;--color-text-light: rgba(225, 204, 177, .5);--color-text-light2: rgba(225, 204, 177, .3);--color-blue-light: rgba(6, 172, 211, .75);--color-blue-light2: rgba(6, 172, 211, .35);--color-blue-light3: rgba(6, 172, 211, .15);--color-bg-light: #333333;--nav-height: 100px;--fz-xxs: 12px;--fz-xs: 13px;--fz-sm: 14px;--fz-md: 16px;--fz-lg: 18px;--fz-xl: 20px;--fz-xxl: 22px;--fz-heading: 32px;--transition: all .35s cubic-bezier(.645, .045, .355, 1)}.side-div[_ngcontent-%COMP%]{width:40px;position:fixed;bottom:0;z-index:10}.side-div.right[_ngcontent-%COMP%]{left:auto;right:40px}.side-div.left[_ngcontent-%COMP%]{right:auto;left:40px}.side-div[_ngcontent-%COMP%]   .side-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;position:relative}.side-div[_ngcontent-%COMP%]   .side-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:1.25rem;height:1.25rem}.side-div[_ngcontent-%COMP%]   .side-content[_ngcontent-%COMP%]:after{content:"";display:block;width:1px;height:90px;margin:0 auto;background-color:var(--color-text)}.side-div[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{margin:20px auto;padding:10px}.side-div[_ngcontent-%COMP%]   a.lang[_ngcontent-%COMP%]{font-size:var(--fz-sm)}.side-div[_ngcontent-%COMP%]   a.lang[_ngcontent-%COMP%]:hover{color:var(--color-blue)}.side-div[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0}.side-div[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:15px 0}.side-div[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:0}.dropdown-menu.show[_ngcontent-%COMP%]{background-color:var(--color-bg);border:1px solid var(--color-blue-light2);padding:0;transition:none}.dropdown-menu.show[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--color-text);border-radius:.25rem;margin:0}.dropdown-menu.show[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:var(--color-bg-light)}.dropdown-menu.show[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:not(:last-child){border-bottom:1px solid var(--color-blue-light3)}@media only screen and (max-width: 768px){.side-div[_ngcontent-%COMP%]{display:none}}',
          ],
        }));
      class uo {}
      (uo.ɵfac = function (t) {
        return new (t || uo)();
      }),
        (uo.ɵmod = Mt({ type: uo, bootstrap: [$i] })),
        (uo.ɵinj = pt({
          imports: [
            hT,
            ao,
            lo,
            EO,
            OT.forRoot({
              loader: {
                provide: hi,
                useFactory: function PO(e) {
                  return new MO(e);
                },
                deps: [$2],
              },
            }),
          ],
        })),
        fT()
          .bootstrapModule(uo)
          .catch((e) => console.error(e));
    },
  },
  (ee) => {
    ee((ee.s = 709));
  },
]);
