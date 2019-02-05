// Normal maps. 
// Normal maps provide a way to get even more surface detail than bump maps, still without using extra polygons. Normal maps tend to be larger and require more processing power than bump maps. Normal maps work by encoding actual vertex normal vector values into bitmaps as RGB data, typically at a much higher resolution than the associated mesh vertex data. The shader incorporates the normal information into its lighting calculations (along with current camera and light source values) to provide apparent surface detail. 

// Specular maps.
// Specular maps determine the intensity of specularity for each pixel. 

var renderer = null, 
scene = null, 
camera = null,
root = null,
group = null,
sphere = null,
clouds = null,
sphereNormalMapped = null;

var materials = {};
var mapUrl = "../images/earth_atmos_2048.jpg";
var map = null;
var normalMapUrl = "../images/earth_normal_2048.jpg";
var normalMap = null;
var specularMap = null;
var specularMapUrl = "../images/earth_specular_spec_1k.jpg";

var duration = 10000; // ms
var currentTime = Date.now();
var animating = true;

function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Rotate the sphere group about its Y axis
    if(animating)
        group.rotation.y += angle;
}

function run() {
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        animate();
}

function createMaterials()
{
    // Create a textre phong material for the cube
    // First, create the texture map
    map = new THREE.TextureLoader().load(mapUrl);
    normalMap = new THREE.TextureLoader().load(normalMapUrl);
    specularMap = new THREE.TextureLoader().load(specularMapUrl);

    materials["phong"] = new THREE.MeshPhongMaterial({ map: map });
    materials["phong-normal"] = new THREE.MeshPhongMaterial({ map: map, normalMap: normalMap, specularMap: specularMap });
}

function setMaterialColor(r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;
    
    materials["phong"].color.setRGB(r, g, b);
    materials["phong-normal"].color.setRGB(r, g, b);
}

function setMaterialSpecular(r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;
    
    materials["phong"].specular.setRGB(r, g, b);
    materials["phong-normal"].specular.setRGB(r, g, b);
}

var materialName = "phong-normal";	
var normalMapOn = true;
function setMaterial(name)
{
    materialName = name;
    if (normalMapOn)
    {
        sphere.visible = false;
        sphereNormalMapped.visible = true;
        sphereNormalMapped.material = materials[name];
    }
    else
    {
        sphere.visible = true;
        sphereNormalMapped.visible = false;
        sphere.material = materials[name];
    }
}

function toggleNormalMap()
{
    normalMapOn = !normalMapOn;
    var names = materialName.split("-");
    if (!normalMapOn)
    {
        setMaterial(names[0]);
    }
    else
    {
        setMaterial(names[0] + "-normal");
    }
}

function onKeyDown ( event )
{
    switch ( event.keyCode ) {

        case 32:
            animating = !animating;
            break;
    }

}

function createScene(canvas) {
    
    document.addEventListener( 'keydown', onKeyDown, false );

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0.2, 0.2, 0.2 );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 10;
    scene.add(camera);
    
    // Create a group to hold all the objects
    root = new THREE.Object3D;
    
    // Add a directional light to show off the object
    var light = new THREE.DirectionalLight( 0xffffff, 2);

    // Position the light out from the scene, pointing at the origin
    light.position.set(.5, 0, 1);
    root.add( light );

    light = new THREE.AmbientLight ( 0xffffff );
    root.add(light);
    
    // Create a group to hold the spheres
    group = new THREE.Object3D;
    root.add(group);

    // Create all the materials
    createMaterials();
    
    // Create the sphere geometry
    geometry = new THREE.SphereGeometry(2, 20, 20);
    
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh(geometry, materials["phong"]);
    sphere.visible = false;

    // And put the geometry and material together into a mesh
    sphereNormalMapped = new THREE.Mesh(geometry, materials["phong-normal"]);
    sphereNormalMapped.visible = true;
    setMaterial("phong-normal");
    
    // Add the sphere mesh to our group
    group.add( sphere );
    group.add( sphereNormalMapped );

    // Now add the group to our scene
    scene.add( root );
}

function rotateScene(deltax)
{
    root.rotation.y += deltax / 100;
    $("#rotation").html("rotation: 0," + root.rotation.y.toFixed(2) + ",0");
}

function scaleScene(scale)
{
    root.scale.set(scale, scale, scale);
    $("#scale").html("scale: " + scale);
}