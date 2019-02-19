function initControls()
{
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    $("#durationSlider").slider({min: 2, max: 10, value: duration, step: 0.1, animate: false});
    $("#durationSlider").on("slide", function(e, u) {
            duration = u.value;
            $("#durationValue").html(duration + "s");				
        });
    $("#durationSlider").on("slidechange", function(e, u) {
            duration = u.value;
            playAnimations();
    });
    
    $("#animateCrateCheckbox").click(
            function() { 
                animateCrate = !animateCrate;
                playAnimations();
            }
        );

    $("#animateWavesCheckbox").click(
            function() {
                animateWaves = !animateWaves;
                playAnimations();
            }
        );

    $("#animateLightCheckbox").click(
            function() {
                animateLight = !animateLight;
                playAnimations();
            }
        );

    $("#animateWaterCheckbox").click(
            function() {
                animateWater = !animateWater;
                playAnimations();
                }
        );

    $("#loopCheckbox").click(
            function() {
                loopAnimation = !loopAnimation;
                playAnimations();
                }
        );		
}