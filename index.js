var cheerio = require('cheerio');
var request = require('request');

var constantes = {
	url : 'http://seguimientoweb.correos.cl/ConEnvCorreos.aspx'
}

function getTrackingInfo(trackingNumber){
	return new Promise(function(resolve, reject){
		request.post(constantes.url, function(error, response, body){
			if (error) {
				reject(error);
				return;
			}
			try{
				var $ = cheerio.load(body);
				if ($('.envio_no_existe').text()){
					//console.log($('.envio_no_existe').text());
					resolve('El numero de seguimiento no existe');
					return;
				}
				
				var entradas = [];
				cheerio.load($('.tracking').html())('tr').each(function(){
					var entrada = { 
						'estado' : $(this).children('td').eq(0).text().trim(),
						'fecha' : $(this).children('td').eq(1).text().trim(),
						'lugar' : $(this).children('td').eq(2).text().trim()
					};
					if (entrada.estado)
						entradas.push(entrada);
				});
				// console.log(entradas);
				var keys = [];
				var values = [];
				$('.datosgenerales td').each(function(a){
					if (a % 2 == 0){
						keys.push($(this).text().trim().replace(' ', '_'));
					}else{
						values.push($(this).text().trim());
					}
				});
				var datosgenerales = {};
				keys.map(function(k,index){
					datosgenerales[k] = values[index];
				})
				resolve({
					'datosgenerales' : datosgenerales,
					'registros' : entradas
				});
			}catch(e){
				resolve(e);
			}
			
		}).form({
            obj_key: 'Cor398-cc',
            obj_env: trackingNumber
        });
	});
}




module.exports = function(trackingIdArray){
	return Promise.all(trackingIdArray.map(t=>{
		return getTrackingInfo(t);
	}));
}






