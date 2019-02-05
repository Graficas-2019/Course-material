
function initControls()
{
    $('#directional').ColorPicker({
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
            $('#directional div').css('backgroundColor', '#' + hex);
            setLightColor(directionalLight, rgb.r, rgb.g, rgb.b);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $('#directional div').css( "background-color", "#" + hex );
            setLightColor(directionalLight, rgb.r, rgb.g, rgb.b);
            $(el).ColorPickerHide();
        },
    });
    var directionalHex = "#ffffff";
    $('#directional').ColorPickerSetColor(directionalHex);
    $('#directional div').css( "background-color", directionalHex );
    
    $('#point').ColorPicker({
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
            $('#point div').css('backgroundColor', '#' + hex);
            setLightColor(pointLight, rgb.r, rgb.g, rgb.b);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $('#point div').css( "background-color", "#" + hex );
            setLightColor(pointLight, rgb.r, rgb.g, rgb.b);
            $(el).ColorPickerHide();
        },
    });
    var pointHex = "#0000ff";
    $('#point').ColorPickerSetColor(pointHex);
    $('#point div').css( "background-color", pointHex );
    
    $('#spot').ColorPicker({
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
            $('#spot div').css('backgroundColor', '#' + hex);
            setLightColor(spotLight, rgb.r, rgb.g, rgb.b);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $('#spot div').css( "background-color", "#" + hex );
            setLightColor(spotLight, rgb.r, rgb.g, rgb.b);
            $(el).ColorPickerHide();
        },
    });
    var pointHex = "#00ff00";
    $('#spot').ColorPickerSetColor(pointHex);
    $('#spot div').css( "background-color", pointHex );

    
    $('#ambient').ColorPicker({
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
            $('#ambient div').css('backgroundColor', '#' + hex);
            setLightColor(ambientLight, rgb.r, rgb.g, rgb.b);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $('#ambient div').css( "background-color", "#" + hex );
            setLightColor(ambientLight, rgb.r, rgb.g, rgb.b);
            $(el).ColorPickerHide();
        },
    });
    var ambientHex = "#888888";
    $('#ambient').ColorPickerSetColor(ambientHex);
    $('#ambient div').css( "background-color", ambientHex );

    $("#textureUrl").html(mapUrl);
    $("#texture").css( "background-image", "url(" + mapUrl + ")");

    $("#textureCheckbox").click(
            function() { toggleTexture(); }
        );
}