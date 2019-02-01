// Three js documentation
// https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene

var renderer = null,    // Object in charge of drawing a scene
scene = null,           // Top-level object in the Three.js graphics hierarchy. Three js contains all
                        // graphical objects in a parent-child hierarchy
camera = null,
cube = null,
cube2 = null;

var duration = 5000; // ms
var currentTime = Date.now();

function animate() {		
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    cube.rotation.y += angle;
    cube.rotation.x += angle;

    cube2.rotation.y += angle;
    cube2.rotation.x += angle;
}

function run() {
    requestAnimationFrame(function() { run(); });
    
    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    animate();
            
}

function scene_setup()
{
    var canvas = document.getElementById("webglcanvas");

    // Create the Three.js renderer and attach it to our canvas. Different renderes can be used, for example to a 2D canvas.
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size.
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene.
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene. Three js uses these values to create a projection matrix.
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 40 );

    scene.add(camera);
}

function create_cube()
{
    // Create a texture-mapped cube and add it to the scene

    // Adds a color to the background
    scene.background = new THREE.Color("rgb(200, 200, 200)");

    // Create the texture 
    var textureUrl = "../images/checker_large.gif";
    var texture = new THREE.TextureLoader().load(textureUrl);
    
    // Create a Basic material; pass in the texture. Simple material with no lighting effects.
    var material = new THREE.MeshBasicMaterial({ map: texture });

    // Create the cube geometry
    var geometry = new THREE.CubeGeometry(2, 2, 2);

    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);

    // Move the mesh back from the camera and tilt it toward the viewer
    cube.position.z = -8;
    cube.position.x -= 2.5;

    // Rotation in radians
    cube.rotation.x = Math.PI / 8;
    cube.rotation.y = Math.PI / 5;

    // Finally, add the mesh to our scene
    scene.add( cube );

    console.log(geometry.faces.length);
    for ( var i = 0; i < geometry.faces.length; i +=2 ) {
        var color = Math.random() * 0xffffff;
        geometry.faces[ i ].color.setHex( color );
        geometry.faces[ i + 1].color.setHex( color );
    }

    // .vertexColors : Integer Defines whether vertex coloring is used. 
    // FaceColors colors faces according to each Face3 Color value.
    var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );

    cube2 = new THREE.Mesh(geometry, material2);

    cube2.position.z = -8;
    cube2.position.x += 2.5;
    
    scene.add( cube2 );
}