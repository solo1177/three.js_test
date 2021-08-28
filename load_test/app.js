$(function() {
  
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 1000 );
    camera.position.set( 1, 0.8, 2 );
    camera.lookAt(0, 0.8, 0);

    // Light
    const ambient = new THREE.AmbientLight("rgb(50%, 50%, 50%)", 1.0);
    scene.add(ambient);
    const light = new THREE.DirectionalLight("rgb(100%, 100%, 100%)", 1.0 );
    light.position.set( 3, 10, 10 );
    scene.add(light);
  
    // Axis
    const axes = new THREE.AxisHelper(35);
    scene.add(axes);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild( renderer.domElement );

    // Clear Color
    renderer.setClearColor("rgb(50%, 50%, 50%)", 1);
  
    // Resize
    function onResize() {
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    // OrbitControls
    const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0.8, 0)
    orbitControls.enableDamping = true;

    //models
  	const loader = new THREE.GLTFLoader();
    let mixer;
		loader.load('seed1.glb', function (gltf) {
        // Model
        let model = gltf.scene;
				scene.add(model);

        // Animation
        let animations = gltf.animations;
        mixer = new THREE.AnimationMixer(model);
        let action = mixer.clipAction(animations[0]);
        action.play()
		})

    function animate() {
        if (mixer) mixer.update(0.017);
      
        orbitControls.update();

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
})