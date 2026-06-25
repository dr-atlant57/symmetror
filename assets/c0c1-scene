// /assets/c0c1-scene.js
// Lightweight interactive C0-C1-C2 craniovertebral model.
// Loaded only when its container scrolls into view (IntersectionObserver),
// so it never competes with LCP/INP on first paint.
//
// Usage in a page (import map points at self-hosted /assets/vendor/three/ — no third-party CDN dependency):
//   <script type="importmap">{"imports":{"three":"/assets/vendor/three/three.module.js","three/addons/":"/assets/vendor/three/addons/"}}</script>
//   <script type="module">
//     import { initC0C1Scene } from '/assets/c0c1-scene.js';
//     initC0C1Scene('model-root', { mode: 'overview' });
//   </script>

export async function initC0C1Scene(containerId, opts = {}) {
    const mode = opts.mode || 'overview'; // 'overview' | 'c0c1' | 'c1c2'
    const root = document.getElementById(containerId);
    if (!root) return;

    if (!window.WebGLRenderingContext) {
        root.innerHTML = '<div class="model-3d-fallback">Ваш браузер не поддерживает 3D-визуализацию. Описание сустава — в тексте выше.</div>';
        return;
    }

    const io = new IntersectionObserver(async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                io.disconnect();
                root.innerHTML = ''; // clear the "Загрузка..." placeholder
                root.style.display = 'block'; // undo the centering flex used for the placeholder text
                root.style.padding = '0';
                const canvasHost = document.createElement('div');
                canvasHost.style.width = '100%';
                canvasHost.style.height = '320px';
                root.appendChild(canvasHost);
                await buildScene(canvasHost, mode, root);
            }
        }
    }, { rootMargin: '150px' });
    io.observe(root);
}

async function buildScene(canvasHost, mode, root) {
    let THREE, OrbitControls;
    try {
        [THREE, { OrbitControls }] = await Promise.all([
            import('three'),
            import('three/addons/controls/OrbitControls.js'),
        ]);
    } catch (e) {
        canvasHost.innerHTML = '<div class="model-3d-fallback">Модель временно недоступна. Описание сустава — в тексте выше.</div>';
        return;
    }

    const width = canvasHost.clientWidth;
    const height = canvasHost.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    canvasHost.appendChild(renderer.domElement);

    const accent = 0x2563eb;
    const bone = 0xd8d8de;

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(3, 5, 4);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(accent, 0.5);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    // --- C0: occipital base (skull floor), simplified as a flattened dome with two condyles
    const c0 = new THREE.Group();
    const skullBase = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.1),
        new THREE.MeshStandardMaterial({ color: bone, roughness: 0.55, metalness: 0.05, transparent: true, opacity: 0.92 })
    );
    skullBase.rotation.x = Math.PI;
    skullBase.position.y = 2.0;
    c0.add(skullBase);

    const condyleGeo = new THREE.SphereGeometry(0.32, 24, 16);
    const condyleMat = new THREE.MeshStandardMaterial({ color: bone, roughness: 0.4 });
    const condyleL = new THREE.Mesh(condyleGeo, condyleMat); condyleL.position.set(-0.55, 1.15, 0.1);
    const condyleR = new THREE.Mesh(condyleGeo, condyleMat); condyleR.position.set(0.55, 1.15, 0.1);
    c0.add(condyleL, condyleR);
    group.add(c0);

    // --- C1: Atlas — a ring (torus)
    const atlas = new THREE.Mesh(
        new THREE.TorusGeometry(0.95, 0.22, 20, 48),
        new THREE.MeshStandardMaterial({ color: accent, roughness: 0.35, metalness: 0.15, transparent: true, opacity: 0.85 })
    );
    atlas.rotation.x = Math.PI / 2;
    atlas.position.y = 0.65;
    group.add(atlas);

    // --- C2: Axis — vertebral body + dens (odontoid process) through the ring
    const axis = new THREE.Group();
    const axisBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85, 0.9, 0.55, 24),
        new THREE.MeshStandardMaterial({ color: bone, roughness: 0.5 })
    );
    axisBody.position.y = -0.55;
    const dens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.2, 1.1, 16),
        new THREE.MeshStandardMaterial({ color: bone, roughness: 0.45 })
    );
    dens.position.y = 0.0;
    axis.add(axisBody, dens);
    group.add(axis);

    group.position.y = -0.4;

    const renderLoop = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(renderLoop);
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 3.2;
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.addEventListener('start', () => { controls.autoRotate = false; });

    // --- UI: misalignment toggle, contextual to page mode
    const ui = document.createElement('div');
    ui.style.position = 'absolute';
    ui.style.top = '12px';
    ui.style.left = '12px';
    ui.style.display = 'flex';
    ui.style.gap = '8px';
    canvasHost.style.position = 'relative';
    canvasHost.appendChild(ui);

    const makeBtn = (label) => {
        const b = document.createElement('button');
        b.textContent = label;
        b.style.cssText = 'font-size:12px;padding:5px 10px;border-radius:5px;border:1px solid #2563eb;background:#0d0e11cc;color:#e4e4e7;cursor:pointer;';
        ui.appendChild(b);
        return b;
    };

    let misaligned = false;
    const btnNorm = makeBtn('Норма');
    const btnShift = makeBtn('Смещение');
    btnNorm.style.background = '#2563eb';

    function setState(toMisaligned) {
        misaligned = toMisaligned;
        btnNorm.style.background = misaligned ? '#0d0e11cc' : '#2563eb';
        btnShift.style.background = misaligned ? '#2563eb' : '#0d0e11cc';
    }
    btnNorm.addEventListener('click', () => setState(false));
    btnShift.addEventListener('click', () => setState(true));

    let t = 0;
    function animateMisalignment() {
        t += 0.02;
        const target = misaligned ? 1 : 0;
        // ease current pose toward target
        c0.userData.k = THREE.MathUtils.lerp(c0.userData.k || 0, target, 0.06);
        const k = c0.userData.k;

        if (mode === 'c1c2') {
            // rotational subluxation: atlas+skull rotate around the dens
            group.children[0].rotation.y = k * 0.55; // c0
            atlas.rotation.z = k * 0.0;
            atlas.rotation.y = k * 0.55;
        } else if (mode === 'c0c1') {
            // lateropositional tilt: skull tilts sideways on the atlas
            c0.rotation.z = k * 0.30;
            c0.position.x = k * 0.32;
        } else {
            // overview: blend of tilt + slight rotation
            c0.rotation.z = k * 0.22;
            c0.position.x = k * 0.22;
            c0.rotation.y = k * 0.18;
        }
        requestAnimationFrame(animateMisalignment);
    }
    animateMisalignment();
    renderLoop();

    window.addEventListener('resize', () => {
        const w = canvasHost.clientWidth, h = canvasHost.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}
