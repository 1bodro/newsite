var DESTROY = {
		doDispose: function (e) {
			if (null !== e) {
				for (var n = 0; n < e.children.length; n++) this.doDispose(e.children[n]);
				e.geometry && (e.geometry.dispose(), e.geometry = void 0), e.material && (e.material.map && (e.material.map.dispose(), e.material.map = void 0), e.material.dispose(), e.material = void 0)
			}
			e = void 0
		},
		disposeRenderer: function (e) {
			e.dispose(), e.forceContextLoss(), e.context = void 0, e.domElement = void 0
		},
		destroy: function (e, n) {
			this.doDispose(e), this.disposeRenderer(n)
		}
	},
	BF_ANIM;
! function (e, n) {
	var t, i, o, r, a, s = 0,
		c = 0,
		d = e.innerWidth,
		E = e.innerHeight,
		u = d / 2,
		l = E / 2,
		m, h, p, f, g, R, T, v = !0,
		H = e.devicePixelRatio || 1,
		w, y = 0;
	BF_ANIM = {
		init: function (e, n) {
			this.create(e, n), this.animate()
		},
		onLOAD: function () {
			++y >= 2 && setTimeout(function () {
				BF_ANIM.pausePlay(), $("body").trigger("BF_ANIM:Ready")
			}, 177)
		},
		togglePlay: function () {
			document.getElementsByClassName("play")[0].addEventListener("click", function (e) {
				v ? BF_ANIM.pausePlay() : BF_ANIM.resumePlay()
			})
		},
		pausePlay: function () {
			v && (v = !1, cancelAnimationFrame(w))
		},
		resumePlay: function () {
			v || (v = !0, this.animate())
		},
		create: function (n, s) {
			if (!v) return !1;
			t = document.getElementById(n), i = new THREE.PerspectiveCamera(75, e.innerWidth / e.innerHeight, .1, 1e4), i.position.z = 1e3, o = e.scene = new THREE.Scene, o.fog = new THREE.Fog(0, 100, 5e3), h = new THREE.PointLight(938565, 10, 1e3), h.position.set(600, 0, 1e3), h.rotateY(-60);
			var c = new THREE.PointLight(14286837, 7, 2e3);
			c.position.set(400, -1600, 300), c.rotateY(165);
			var u = new THREE.PointLight(275265, 20, 1e3);
			u.position.set(-500, 500, 1e3), o.add(h), o.add(c), o.add(u);
			var l = new THREE.CubeTextureLoader,
				w = l.load([s + "bigLogo.png", s + "bigLogo.png", s + "bigLogo.png", s + "bigLogo.png", s + "bigLogo.png", s + "bigLogo.png"], function () {
					BF_ANIM.onLOAD()
				});
			w.mapping = THREE.CubeRefractionMapping, w.minFilter = THREE.LinearFilter;
			var y = (new THREE.TextureLoader).load(s + "logo.png", function () {
				BF_ANIM.onLOAD()
			});
			y.wrapS = y.wrapT = THREE.RepeatWrapping, y.repeat.set(1, 1), p = new THREE.TetrahedronGeometry(800, 2);
			var M = new THREE.TetrahedronGeometry(800, 2),
				P = new THREE.TetrahedronGeometry(650, 1),
				L = new THREE.TetrahedronGeometry(600, 1),
				A = (new THREE.BufferGeometry).fromGeometry(p),
				F = (new THREE.BufferGeometry).fromGeometry(M),
				D = (new THREE.BufferGeometry).fromGeometry(P),
				S = (new THREE.BufferGeometry).fromGeometry(L);
			m = new THREE.MeshPhongMaterial({
				color: 2569,
				shininess: 45,
				specular: 662570,
				emissive: 0,
				shading: THREE.FlatShading,
				envMap: w,
				refractionRatio: .4,
				reflectivity: 30,
				blending: THREE.AdditiveBlending,
				side: THREE.FrontSide
			});
			var C = new THREE.MeshPhongMaterial({
				color: 4424,
				emissive: 0,
				shading: THREE.FlatShading,
				specular: 21094,
				envMap: w,
				refractionRatio: .7,
				reflectivity: 35,
				shininess: 7,
				side: THREE.FrontSide
			});
			m.depthWrite = !1, f = new THREE.Mesh(A, m), f.position.set(900, 200, 0), g = new THREE.Mesh(F, m), g.position.set(-400, 0, -100), R = new THREE.Mesh(D, C), R.position.set(500, 0, -300), T = new THREE.Mesh(S, C), T.position.set(-200, 0, 0), o.add(f), o.add(g), o.add(R), o.add(T), r = new THREE.WebGLRenderer({
				antialias: !1
			}), r.setClearColor(20), r.setPixelRatio(.85 * e.devicePixelRatio), r.setSize(e.innerWidth * H, e.innerHeight * H), r.sortObjects = !1, a = new THREE.EffectComposer(r);
			var x = new THREE.RenderPass(o, i);
			a.addPass(x);
			var z = new THREE.ShaderPass(THREE.CopyShader);
			a.addPass(z);
			var I = new THREE.ShaderPass(THREE.FXAAShader);
			a.addPass(I), I.uniforms.resolution.value = new THREE.Vector2(1.17 / H / d, 1.17 / H / E), I.renderToScreen = !0, t.appendChild(r.domElement), document.addEventListener("mousemove", this.onDocumentMouseMove, !1), e.addEventListener("resize", this.onWindowResize, !1), this.onWindowResize()
		},
		onWindowResize: function () {
			var e = $(t),
				n = e.width(),
				o = e.height();
			u = n / 2, l = o / 2, i.aspect = n / o, i.updateProjectionMatrix(), r.setSize(n, o)
		},
		onDocumentMouseMove: function (e) {
			s = e.clientX - u, c = e.clientY - l
		},
		onDocumentTouchStart: function (e) {
			1 == e.touches.length && (e.preventDefault(), s = e.touches[0].pageX - u, c = e.touches[0].pageY - l)
		},
		onDocumentTouchMove: function (e) {
			1 == e.touches.length && (e.preventDefault(), s = e.touches[0].pageX - u, c = e.touches[0].pageY - l)
		},
		animate: function () {
			w = requestAnimationFrame(function () {
				BF_ANIM.animate()
			}), this.render()
		},
		render: function () {
			if (!v) return !1;
			i.position.x += .002 * (s - i.position.x), i.position.y += .005 * (-c - i.position.y), i.lookAt(o.position), f.rotation.x += .001, f.rotation.y += .001, f.rotation.z += .001, g.rotation.x -= .001, g.rotation.y -= .001, g.rotation.z -= .001, R.rotation.x -= .001, R.rotation.y -= .001, R.rotation.z -= .001, T.rotation.x += .001, T.rotation.y += .001, T.rotation.z += .001, a.render()
		}
	}
}(window);
var CT_ANIM;
! function (e, n) {
	var t, i, o, r, a = 0,
		s = 0,
		c = e.innerWidth,
		d = c / 2,
		E = e.innerHeight,
		u = E / 2,
		l, m, h, p, f, g = !0,
		R = 0,
		T, v, H, w = 1e3,
		y = performance.now(),
		M = y,
		P, L, A, F, D;
	CT_ANIM = {
		init: function (e, n) {
			g = !0, L = e, this.create(e, n), this.onWindowResize(), this.initDistanceControl()
		},
		initDistanceControl: function () {
			F = 50, D = setInterval(function () {
				CT_ANIM.incrementDistance()
			}, 1e3)
		},
		incrementDistance: function () {
			(F -= 10) < -210 && clearInterval(D)
		},
		destroy: function () {
			this.pausePlay(), DESTROY.destroy(o, r), t = document.getElementById(L), t.innerHTML = ""
		},
		pausePlay: function () {
			g = !1, cancelAnimationFrame(P), clearInterval(D)
		},
		resumePlay: function () {
			g = !0, this.animate()
		},
		create: function (n, a) {
			t = document.getElementById(n), t.innerHTML = "", i = new THREE.PerspectiveCamera(75, c / E, 5, 1e4), i.position.z = 600, o = e.scene = new THREE.Scene, o.fog = new THREE.Fog(0, -100, 700), h = new THREE.Color(16776960), (new THREE.TextureLoader).load(a, function (e) {
				l = new THREE.SpriteMaterial({
					map: e,
					fog: !0,
					blending: THREE.AdditiveBlending,
					color: 1990911,
					opacity: .55
				}), l.map.minFilter = THREE.LinearFilter, l.map.magFilter = THREE.LinearFilter, CT_ANIM.animate()
			}), A = new THREE.Group, A.name = "Particle Emitter", o.add(A), r = new THREE.WebGLRenderer({
				antialias: !0
			}), r.setClearColor(0), r.setPixelRatio(.75 * e.devicePixelRatio), r.setSize(c, E), t.appendChild(r.domElement), document.addEventListener("mousemove", this.onDocumentMouseMove, !1), e.addEventListener("resize", this.onWindowResize, !1)
		},
		createParticles: function () {
			var e = new THREE.Sprite(m);
			this.initParticle(e)
		},
		onWindowResize: function () {
			d = e.innerWidth / 2, u = e.innerHeight / 2, i.aspect = e.innerWidth / e.innerHeight, i.updateProjectionMatrix(), r.setSize(e.innerWidth, e.innerHeight)
		},
		initParticle: function (e) {
			var e = this instanceof THREE.Sprite ? this : e;
			e.fog = !0, A.add(e), e.material.transparent = !0, e.material = m, e.position.set(0, 0, F), p = e.scale.x = c / 100 * 35, f = p / 1.1, e.scale.y = f
		},
		onDocumentMouseMove: function (e) {
			a = e.clientX - d, s = e.clientY - u
		},
		onDocumentTouchStart: function (e) {
			1 == e.touches.length && (e.preventDefault(), a = e.touches[0].pageX - d, s = e.touches[0].pageY - u)
		},
		onDocumentTouchMove: function (e) {
			1 == e.touches.length && (e.preventDefault(), a = e.touches[0].pageX - d, s = e.touches[0].pageY - u)
		},
		animate: function () {
			P = requestAnimationFrame(function () {
				CT_ANIM.animate()
			}), this.render()
		},
		render: function () {
			if (!g) return !1;
			v = performance.now(), H = v - y;
			for (var e = 0; e < A.children.length; e++) {
				var n = A.children[e],
					t = n.position,
					c, d, E, u = n.scale.x,
					h = n.scale.y;
				t && (c = t.x + 25e-5 * a, d = t.y - 25e-5 * s, E = t.z + (125 + e) * Math.abs(Math.pow(.085, 1.0000001)) * .08, u = p + 15 * e, h = f + 15 * e, E >= i.position.z ? A.remove(n) : n.position.set(c, d, E))
			}
			m = l, H > 1e3 && (y = v - H % 1e3, this.createParticles()), r.render(o, i)
		}
	}
}(window);
