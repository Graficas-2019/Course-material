var renderer = null, 
scene = null, 
camera = null,
root = null,
horse = null,
parrot = null,
flamingo = null,
stork = null,
group = null,
orbitControls = null,
mixer = null;

var morphs = [];

var duration = 20000; // ms
var currentTime = Date.now();

function loadGLTF()
{
    mixer = new THREE.AnimationMixer( scene );

    var loader = new THREE.GLTFLoader();
    loader.load( "../models/Horse.glb", function( gltf ) {
        horse = gltf.scene.children[ 0 ];
        horse.scale.set( 0.05, 0.05, 0.05 );
        horse.position.y -= 4;
        horse.position.z = -50 - Math.random() * 50;
        horse.castShadow = true;
        horse. receiveShadow = true;
        scene.add( horse );
        morphs.push(horse);
        mixer.clipAction( gltf.animations[ 0 ], horse).setDuration( 0.5 ).play();
        console.log(gltf.animations);
    } );

    loader.load( "../models/Parrot.glb", function( gltf ) {
        parrot = gltf.scene.children[ 0 ];
        parrot.scale.set( 0.05, 0.05, 0.05 );
        parrot.position.y += 8;
        parrot.position.z = -50 - Math.random() * 50;
        parrot.castShadow = true;
        parrot. receiveShadow = true;
        scene.add( parrot );
        morphs.push(parrot);
        mixer.clipAction( gltf.animations[ 0 ], parrot).setDuration( 1 ).play();
        console.log(gltf.animations);
    } );

    loader.load( "../models/Stork.glb", function( gltf ) {
        stork = gltf.scene.children[ 0 ];
        stork.scale.set( 0.05, 0.05, 0.05 );
        stork.position.y += 8;
        stork.position.x -= 8;
        stork.position.z = -50 - Math.random() * 50;
        stork.castShadow = true;
        stork. receiveShadow = true;
        scene.add( stork );
        morphs.push(stork);
        mixer.clipAction( gltf.animations[ 0 ], stork).setDuration( 1 ).play();
        console.log(gltf.animations);
    } );

    loader.load( "../models/Flamingo.glb", function( gltf ) {
        flamingo = gltf.scene.children[ 0 ];
        flamingo.scale.set( 0.05, 0.05, 0.05 );
        flamingo.position.y += 8;
        flamingo.position.x += 8;
        flamingo.position.z = -50 - Math.random() * 50;
        flamingo.castShadow = true;
        flamingo. receiveShadow = true;
        scene.add( flamingo );
        morphs.push(flamingo);
        mixer.clipAction( gltf.animations[ 0 ], flamingo).setDuration( 1 ).play();
        console.log(gltf.animations);
    } );
}

function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;

    if ( mixer ) {
        mixer.update( deltat * 0.001 );
    }

    for(var morph of morphs)
    {
        morph.position.z += 0.03 * deltat;
        if(morph.position.z > 40)
            morph.position.z = -70 - Math.random() * 50;
    }
}

function run() {
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        animate();

        // Update the camera controller
        orbitControls.update();
}

function setLightColor(light, r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;
    
    light.color.setRGB(r, g, b);
}

var directionalLight = null;
var spotLight = null;
var ambientLight = null;
var mapUrl = "../images/checker_large.gif";

var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;

function createScene(canvas) {
    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Turn on shadows
    renderer.shadowMap.enabled = true;
    // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(-15, 6, 30);
    scene.add(camera);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        
    // Create a group to hold all the objects
    root = new THREE.Object3D;
    
    spotLight = new THREE.SpotLight (0xffffff);
    spotLight.position.set(-30, 8, -10);
    spotLight.target.position.set(-2, 0, -2);
    root.add(spotLight);

    spotLight.castShadow = true;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 45;
    
    spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    ambientLight = new THREE.AmbientLight ( 0x888888 );
    root.add(ambientLight);
    
    // Create the objects
    loadGLTF();

    // Create a group to hold the objects
    group = new THREE.Object3D;
    root.add(group);

    // Create a texture map
    var map = new THREE.TextureLoader().load(mapUrl);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(8, 8);

    var color = 0xffffff;

    // Put in a ground plane to show off the lighting
    geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:color, map:map, side:THREE.DoubleSide}));

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -4.02;
    
    // Add the mesh to our group
    group.add( mesh );
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    
    // Now add the group to our scene
    scene.add( root );
}