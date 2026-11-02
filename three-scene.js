/* ============================================================
   Latar 3D — Three.js (r128, global build via CDN)
   Dua cincin emas saling mengait + hati emas + partikel cahaya.
   Kamera mengikuti pointer & progres scroll. Ada fallback:
   bila WebGL/CDN gagal, halaman tetap cantik dengan gradien CSS.
   ============================================================ */
(function () {
  var canvas = document.getElementById('scene3d');
  if (!canvas || !window.THREE) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf3ead8, 9, 22);

  var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  scene.add(new THREE.AmbientLight(0xfff2d8, 0.85));
  var key = new THREE.PointLight(0xffd98a, 1.5, 40); key.position.set(4, 5, 6); scene.add(key);
  var rim = new THREE.PointLight(0x9db38d, 0.9, 40); rim.position.set(-6, -2, 4); scene.add(rim);

  var gold = new THREE.MeshStandardMaterial({ color: 0xc99b3f, metalness: 0.95, roughness: 0.22 });
  var goldSoft = new THREE.MeshStandardMaterial({ color: 0xe3c26e, metalness: 0.9, roughness: 0.3, emissive: 0x332200 });

  // --- Dua cincin saling mengait ---
  var rings = new THREE.Group();
  var ringGeo = new THREE.TorusGeometry(1.05, 0.085, 24, 90);
  var r1 = new THREE.Mesh(ringGeo, gold); r1.position.x = -0.72; r1.rotation.y = 0.5;
  var r2 = new THREE.Mesh(ringGeo, goldSoft); r2.position.x = 0.72; r2.rotation.y = -0.5;
  // berlian kecil di puncak cincin 1
  var gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.17),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.05, emissive: 0x888888 }));
  gem.position.set(-0.72, 1.12, 0.1);
  rings.add(r1, r2, gem);
  rings.position.set(0, 1.55, 0);
  scene.add(rings);

  // --- Hati emas melayang ---
  function heartMesh(scale, mat) {
    var s = new THREE.Shape();
    s.moveTo(0, 0.32);
    s.bezierCurveTo(0, 0.55, -0.32, 0.55, -0.32, 0.3);
    s.bezierCurveTo(-0.32, 0.08, 0, -0.05, 0, -0.34);
    s.bezierCurveTo(0, -0.05, 0.32, 0.08, 0.32, 0.3);
    s.bezierCurveTo(0.32, 0.55, 0, 0.55, 0, 0.32);
    var geo = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 });
    var m = new THREE.Mesh(geo, mat); m.scale.setScalar(scale); return m;
  }
  var hearts = [];
  var heartsGroup = new THREE.Group(); scene.add(heartsGroup);
  [[-3.4, 0.6, -1.5, 0.9], [3.5, -0.7, -2, 0.7], [2.9, 2.3, -3, 0.55], [-3.1, -2.2, -2.4, 0.6]].forEach(function (h) {
    var m = heartMesh(h[3], goldSoft); m.position.set(h[0], h[1], h[2]);
    m.userData.seed = Math.random() * Math.PI * 2; hearts.push(m); heartsGroup.add(m);
  });

  // --- Kristal melayang (untuk tema crystals) ---
  var crystalsGroup = new THREE.Group(); scene.add(crystalsGroup);
  var crystals = [];
  [[-3.4, 0.8, -1.6], [3.5, -0.5, -2], [2.9, 2.4, -3], [-3.1, -2.1, -2.4]].forEach(function (p) {
    var m = new THREE.Mesh(new THREE.OctahedronGeometry(0.34), goldSoft);
    m.position.set(p[0], p[1], p[2]); m.userData.seed = Math.random() * Math.PI * 2;
    crystals.push(m); crystalsGroup.add(m);
  });

  // --- Orb / gelembung melayang (untuk tema orbs) ---
  var orbsGroup = new THREE.Group(); scene.add(orbsGroup);
  var orbMat = new THREE.MeshStandardMaterial({ color: 0xd9b45c, metalness: 0.35, roughness: 0.12, transparent: true, opacity: 0.6 });
  var orbs = [];
  [[-3.4, 0.7, -1.6, 0.3], [3.5, -0.6, -2, 0.22], [2.9, 2.4, -3, 0.17], [-3.1, -2.1, -2.4, 0.26], [0.4, -2.8, -3.4, 0.15]].forEach(function (p) {
    var m = new THREE.Mesh(new THREE.SphereGeometry(p[3], 24, 24), orbMat);
    m.position.set(p[0], p[1], p[2]); m.userData.seed = Math.random() * Math.PI * 2;
    orbs.push(m); orbsGroup.add(m);
  });

  // --- Partikel cahaya (bintang-bintang kecil) ---
  var pCount = 420, pos = new Float32Array(pCount * 3);
  for (var i = 0; i < pCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 18;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 2] = -Math.random() * 8 - 0.5;
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0xd9b45c, size: 0.055, transparent: true, opacity: 0.85, depthWrite: false
  }));
  scene.add(particles);

  // --- Interaksi ---
  var mx = 0, my = 0, tx = 0, ty = 0, opened = false, burstBoost = 0;
  window.addEventListener('pointermove', function (e) {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });
  window.__undangan3D = {
    open: function () { opened = true; burstBoost = 1; },
    get opened() { return opened; }
  };

  // --- Ganti tema 3D secara live ---
  function applyTheme3D(t) {
    if (!t || !t.three) return;
    gold.color.set(t.three.ring);
    goldSoft.color.set(t.three.ring2);
    orbMat.color.set(t.three.ring2);
    particles.material.color.set(t.three.particle);
    scene.fog.color.set(t.three.fog);
    gem.material.color.set(t.three.gem);
    heartsGroup.visible = t.three.shape === 'hearts';
    crystalsGroup.visible = t.three.shape === 'crystals';
    orbsGroup.visible = t.three.shape === 'orbs';
    burstBoost = Math.max(burstBoost, 0.7);
  }
  window.__applyTheme3D = applyTheme3D;
  if (window.__THEME) applyTheme3D(window.__THEME);

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize); resize();

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clock = new THREE.Clock();

  (function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();
    mx += (tx - mx) * 0.045; my += (ty - my) * 0.045;

    var scrollP = Math.min(1, (window.scrollY || 0) / Math.max(1, document.body.scrollHeight - window.innerHeight));

    rings.rotation.y = t * 0.25 + mx * 0.5;
    rings.rotation.x = Math.sin(t * 0.4) * 0.12 + my * 0.25;
    rings.position.y = 1.55 + Math.sin(t * 0.8) * 0.14 - scrollP * 1.1;
    rings.scale.setScalar(1 + burstBoost * 0.25);
    gem.rotation.y = t * 1.6;

    hearts.forEach(function (h, idx) {
      h.position.y += Math.sin(t * 0.9 + h.userData.seed) * 0.0016;
      h.rotation.y = t * (0.3 + idx * 0.07);
    });
    crystals.forEach(function (c, idx) {
      c.position.y += Math.sin(t * 0.8 + c.userData.seed) * 0.0018;
      c.rotation.y = t * (0.5 + idx * 0.09); c.rotation.x = t * 0.22;
    });
    orbs.forEach(function (o, idx) {
      o.position.y += Math.sin(t * 0.7 + o.userData.seed) * 0.002;
    });
    particles.rotation.y = t * 0.02;
    particles.position.y = Math.sin(t * 0.3) * 0.15;

    camera.position.x = mx * 0.9;
    camera.position.y = -my * 0.6 - scrollP * 0.8;
    camera.lookAt(0, 0.6, 0);

    burstBoost = Math.max(0, burstBoost - 0.008);
    if (!reduce) renderer.render(scene, camera);
  })();
  if (reduce) renderer.render(scene, camera);
})();
