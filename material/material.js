window.addEventListener('load', init); 
   function init() {
     const width = window.innerWidth;
     const height = window.innerHeight;     

     const scene = new THREE.Scene();
     const camera = new THREE.PerspectiveCamera(35, width / height);
     camera.position.set(0, 0, +1000);
 

     const geometry = new THREE.IcosahedronGeometry( 250, 4 );
     const material = new THREE.MeshBasicMaterial({color: 0xa6b5d7, wireframe: true});
     const box = new THREE.Mesh(geometry, material);
     scene.add(box);
 
     const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#Canvas')
     });
     
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(width, height);

     function animate() {
         box.rotation.x += 0.003;
         box.rotation.y += 0.01;
         renderer.render(scene, camera); 
         requestAnimationFrame(animate);
     }
     animate();
 }     