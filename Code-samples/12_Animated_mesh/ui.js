

function initControls()
{
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
    var spotHex = "#ffffff";
    $('#spot').ColorPickerSetColor(spotHex);
    $('#spot div').css( "background-color", spotHex );

    
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
}