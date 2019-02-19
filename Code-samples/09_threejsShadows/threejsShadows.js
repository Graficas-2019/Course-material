// 1. Enable shadow mapping in the renderer. 
// 2. Enable shadows and set shadow parameters for the lights that cast shadows. 
// Both the THREE.DirectionalLight type and the THREE.SpotLight type support shadows. 
// 3. Indicate which geometry objects cast and receive shadows.

var renderer = null, 
scene = null, 
camera = null,
root = null,
ring = null,
gun = null,
monster = null,
group = null,
orbitControls = null;

var objLoader = null, jsonLoader = null;

var duration = 20000; // ms
var currentTime = Date.now();

function loadJson()
{
    if(!jsonLoader)
    jsonLoader = new THREE.JSONLoader();
    
    jsonLoader.load(
        '../models/monster/monster.js',

        function(geometry, materials)
        {
            var material = materials[0];
            
            var object = new THREE.Mesh(geometry, material);
            object.castShadow = true;
            object. receiveShadow = true;
            object.scale.set(0.002, 0.002, 0.002);
            object.position.y = -1;
            object.position.x = 1.5;
            monster = object;
            scene.add(object);
        },
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        });
}

function loadObj()
{
    if(!objLoader)
        objLoader = new THREE.OBJLoader();
    
    objLoader.load(
        '../models/cerberus/Cerberus.obj',

        function(object)
        {
            var texture = new THREE.TextureLoader().load('../models/cerberus/Cerberus_A.jpg');
            var normalMap = new THREE.TextureLoader().load('../models/cerberus/Cerberus_N.jpg');
            var specularMap = new THREE.TextureLoader().load('../models/cerberus/Cerberus_M.jpg');

            object.traverse( function ( child ) 
            {
                if ( child instanceof THREE.Mesh ) 
                {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.map = texture;
                    child.material.normalMap = normalMap;
                    child.material.specularMap = specularMap;
                }
            } );
                    
            gun = object;
            gun.scale.set(3,3,3);
            gun.position.z = -3;
            gun.position.x = -1.5;
            gun.rotation.x = Math.PI / 180 * 15;
            gun.rotation.y = -3;
            scene.add(object);
        },
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        });
}

function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    if(gun)
        gun.rotation.y += angle / 2;

    if(monster)
        monster.rotation.y += angle / 2;
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
var pointLight = null;
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
    camera.position.set(-2, 6, 12);
    scene.add(camera);
    
    // Create a group to hold all the objects
    root = new THREE.Object3D;
    
    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0x000000, 1);

    // Create and add all the lights
    directionalLight.position.set(.5, 0, 3);
    root.add(directionalLight);

    spotLight = new THREE.SpotLight (0x000000);
    spotLight.position.set(2, 8, 15);
    spotLight.target.position.set(-2, 0, -2);
    root.add(spotLight);

    spotLight.castShadow = true;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow. camera.far = 200;
    spotLight.shadow.camera.fov = 45;
    
    spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    ambientLight = new THREE.AmbientLight ( 0x000000);
    root.add(ambientLight);
    
    pointLight = new THREE.PointLight(0xffffff, 0.8, 0);
    pointLight.position.set(0,1.5,15);

    pointLight.castShadow = true;

    pointLight.shadow.camera.near = 1;
    pointLight.shadow.camera.far = 200;
    pointLight.shadow.camera.fov = 45;

    pointLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    pointLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    var pointLightHelper = new THREE.PointLightHelper( pointLight, 1.1 );
    root.add(pointLight);
    root.add(pointLightHelper);
    // Create the objects
    loadObj();

    loadJson();

    // Create a group to hold the objects
    group = new THREE.Object3D;
    root.add(group);

    // Create a texture map
    var map = new THREE.TextureLoader().load(mapUrl);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(8, 8);

    var color = 0xffffff;

    // var asteroid = new THREE.Object3D();
    // Put in a ground plane to show off the lighting
    geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:color, map:map, side:THREE.DoubleSide}));

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -4.02;
    
    // Add the mesh to our group
    group.add( mesh );
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    
    // Create the cube geometry
    geometry = new THREE.SphereGeometry(0.8, 20, 20);
    
    // And put the geometry and material together into a mesh
    mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:color}));
    mesh.position.y = 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Add the mesh to our group
    group.add( mesh );

    // Create the cylinder geometry
    geometry = new THREE.CylinderGeometry(1, 2, 2, 50, 10);
    
    // And put the geometry and material together into a mesh
    mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:color}));
    mesh.position.y = -3;

    mesh.castShadow = false;
    mesh.receiveShadow = true;
    
    // Add the  mesh to our group
    group.add( mesh );
    
    // Now add the group to our scene
    scene.add( root );
    // scene.add( asteroid );
}