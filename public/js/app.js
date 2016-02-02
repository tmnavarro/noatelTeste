// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs


function initialize(){
    origen.maps.geraMaps('maps-lojas', 11);
    origen.maps.carregaPontosLojas();
}

$(document).ready(function(){

    /*Inicializa Maps*/
    if($('#maps-lojas').length){
        initialize();   
    }
    /*Efeito Paralax*/
	$('div[data-type="background"]').each(function(){

        var bgobj = $(this); // assigning the object

        $(window).scroll(function() {
            var yPos = -($(window).scrollTop() / bgobj.data('speed')); 
            
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';
            // Move the background
            bgobj.css({ backgroundPosition: coords });
        }); 
    });    

    $('.proc-hover.esc').hide();
    $('.proc-hover.dir').hide();


    /*Efeito para abrir produtos com animação*/
    $(window).on('scroll',function() {

        if(document.getElementById("animation-active") !== null){
            var p = $('.produtos');
            var position = p.position();

            var posAtual = $(this).scrollTop();
            posAtual = posAtual + $(window).height();

            if(posAtual-400 > position.top){
                $('.proc-hover.esc').addClass('fadeInLeft');
                $('.proc-hover.esc').addClass('animated');
                $('.proc-hover.esc').show();

                $('.proc-hover.dir').addClass('fadeInRight');
                $('.proc-hover.dir').addClass('animated');
                $('.proc-hover.dir').show();
            }
        }
    }); 

    /*Abre Pesquisa de localização*/
    $('#open-input').click(function(){
        $(this).hide();
        $('#input-pesquisa').css('display', 'block');
    });


    $('#pesquisar-endereco').click(function(){
         origen.maps.mostraNoMapa($('#endereco-pesquisado').val());
    });

    $('#me-localiza').click(function(){
         origen.maps.geolocalizacao();
    });

    $("#endereco-pesquisado").autocomplete({
        source: function (request, response) {
            geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                response($.map(results, function (item) {
                    return {
                        label: item.formatted_address,
                        value: item.formatted_address,
                        latitude: item.geometry.location.lat(),
                        longitude: item.geometry.location.lng()
                    }
                }));
            })
        },
        select: function (event, ui) {
            $("#txtLatitude").val(ui.item.latitude);
            $("#txtLongitude").val(ui.item.longitude);
            var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
            marker.setPosition(location);
            map.setCenter(location);
            map.setZoom(14);
        }
    });

    /*Configuração de estilo para lista de auto-completo*/
    $('.ui-autocomplete').css('list-style', 'none').css('width','300px').css('background', '#FFF').css('margin', '0 40px;');
    $('.ui-menu-item').css('border-bottom', '1px solid #c4c4c4').css('padding', '5px 40px;');

    /*Botões auxiliares para maps rigth */
    $('#pra-cima').click(function(){
        var pAtual = $(document).scrollTop();
        $("html, body").animate({ scrollTop: pAtual-350 }, 600);
    }); 
        

    $('#pra-baixo').click(function(){
        var pAtual = $(document).scrollTop();
        $("html, body").animate({ scrollTop: pAtual+350 }, 600);
    });

    /*Eventos para abrir caixa de informações*/


});