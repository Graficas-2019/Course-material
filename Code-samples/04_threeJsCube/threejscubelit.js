
var renderer = null, 
scene = null, 
camera = null,
cube = null;

var duration = 5000; // ms
var currentTime = Date.now();
function animate() 
{
    if(cube)
    {    
        var now = Date.now();
        var deltat = now - currentTime;
        currentTime = now;
        var fract = deltat / duration;
        var angle = Math.PI * 2 * fract;
        cube.rotation.y += angle;
    }
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

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    scene.add(camera);

    // Add a directional light to show off the object
    var light = new THREE.DirectionalLight( new THREE.Color("rgb(0, 200, 0)"), 1.2);

    // Position the light out from the scene, pointing at the origin
    light.position.set(0, 2, 2);
    light.target.position.set(0,0,0);

    var light2 = new THREE.DirectionalLight(0xbb0000, 2.2);
    light2.position.set(0, -2, 2);
    light2.target.position.set(0,0,0);

    scene.add( light );
    scene.add(light2);
}

function create_cube()
{
    // Create a shaded, texture-mapped cube and add it to the scene
    // First, create the texture map
    var textureUrl = "../images/checker_large.gif";
    var texture = new THREE.TextureLoader().load(textureUrl);

    // Now, create a Phong material to show shading; pass in the map. Color has to be passed in hexadecimal.
    var material = new THREE.MeshPhongMaterial({ map: texture, color: 0xffffff });
    // var material = new THREE.MeshBasicMaterial({map:texture});

    // Create the cube geometry
    var geometry = new THREE.CubeGeometry(2, 2, 2);

    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);

    // Move the mesh back from the camera and tilt it toward the viewer
    cube.position.z = -8;
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;

    // Finally, add the mesh to our scene
    scene.add( cube );
}