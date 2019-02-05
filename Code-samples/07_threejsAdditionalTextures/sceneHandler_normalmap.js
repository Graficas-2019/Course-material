
var mouseDown = false,
pageX = 0;

function onMouseMove(evt)
{
    if (!mouseDown)
        return;

    evt.preventDefault();
    
    var deltax = evt.pageX - pageX;
    pageX = evt.pageX;
    rotateScene(deltax);
}

function onMouseDown(evt)
{
    evt.preventDefault();
    
    mouseDown = true;
    pageX = evt.pageX;
}

function onMouseUp(evt)
{
    evt.preventDefault();
    
    mouseDown = false;
}

function addMouseHandler(canvas)
{
canvas.addEventListener( 'mousemove', 
        function(e) { onMouseMove(e); }, false );
canvas.addEventListener( 'mousedown', 
        function(e) { onMouseDown(e); }, false );
canvas.addEventListener( 'mouseup', 
        function(e) { onMouseUp(e); }, false );
}

function initControls()
{
    $("#slider").slider({min: 0, max: 20, value: 1, step: 0.01, animate: false});
    $("#slider").on("slide", function(e, u) {
        scaleScene(u.value);
        });
    
    
    $('#diffuseColor').ColorPicker({
        color: '#ffffff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#diffuseColor div').css('backgroundColor', '#' + hex);
            setMaterialColor(rgb.r, rgb.g, rgb.b);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $('#diffuseColor div').css( "background-color", "#" + hex );
            setMaterialColor(rgb.r, rgb.g, rgb.b);
            $(el).ColorPickerHide();
        },
    });
    var diffuseHex = "#ffffff";
    $('#diffuseColor').ColorPickerSetColor(diffuseHex);
    $('#diffuseColor div').css( "background-color", diffuseHex );
    
    $('#specularColor').ColorPicker({
        color: '#ffffff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#specularColor div').css('backgroundColor', '#' + hex);
            setMaterialSpecular(rgb.r, rgb.g, rgb.b);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $('#specularColor div').css( "background-color", "#" + hex );
            setMaterialSpecular(rgb.r, rgb.g, rgb.b);
            $(el).ColorPickerHide();
        },
    });
    var specularHex = "#111111";
    $('#specularColor').ColorPickerSetColor(specularHex);
    $('#specularColor div').css( "background-color", specularHex );
                    
    $("#textureUrl").html(normalMapUrl);
    $("#texture").css( "background-image", "url(" + normalMapUrl + ")");
    
    $("#textureCheckbox").click(
            function() { toggleNormalMap(); }
        );
}