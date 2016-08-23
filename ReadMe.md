# Seguimiento de pedidos de Correos de Chile

Módulo npm para hacer el seguimiento de uno o más pedidos de Correos de Chile.

##Instalación

```
$ npm install correos-chile --save
```

##Uso

```javascript
var correos = require('correos-chile');

correos(['RS458239104NL']).then(r=>{
	console.log(r);
}).catch(e => {
	console.log(e);
})
```


**Función principal:** Recibe un arreglo de códigos de seguimiento y retorna un arreglo de promesas con la información para cada código de seguimiento

**Params**

- Códigos de seguimiento `Array<String>`

**Returns**: 

- Resultados `Promise<Array<result>>`

**Ejemplo de result:**

```javascript
{
    "datosgenerales": {
        "Envio": "999042472463",
        "Entregado_a": "jose urzua",
        "Fecha_Entrega": "01/08/2016 13:28",
        "Rut": "9.999.999-3"
    },
    "registros": [
        {
            "estado": "ENVIO ENTREGADO",
            "fecha": "01/08/2016 13:28",
            "lugar": "PLANTA CEP RM"
        },
        {
            "estado": "ENVIO EN REPARTO",
            "fecha": "01/08/2016 9:46",
            "lugar": "PLANTA CEP RM"
        },
        {
            "estado": "RECIBIDO EN PLANTA ORIGEN",
            "fecha": "30/07/2016 2:24",
            "lugar": "PLANTA CEP RM"
        },
        {
            "estado": "RECIBIDO EN OFICINA DE CORREOSCHILE",
            "fecha": "21/07/2016 12:18",
            "lugar": "PLANTA SANTIAGO"
        },
        {
            "estado": "DESPACHADO A OFICINA DE CORREOSCHILE",
            "fecha": "21/07/2016 11:39",
            "lugar": "CEN CENTRO TECNOLOGICO POSTAL"
        },
        {
            "estado": "RECEPCION INTERNACIONAL POR CORREOSCHILE",
            "fecha": "19/07/2016 12:03",
            "lugar": "CEN CENTRO TECNOLOGICO POSTAL"
        },
        {
            "estado": "DISPONIBLE PARA SALIR AL PAIS DE DESTINO",
            "fecha": "25/06/2016 17:34",
            "lugar": "OFICINA INTERNACIONAL"
        },
        {
            "estado": "ENVIO DESPACHADO AL PAIS DE DESTINO",
            "fecha": "25/06/2016 17:34",
            "lugar": "OFICINA INTERNACIONAL"
        }
    ]
}

```

##Consideraciones
La cantidad de códigos de seguimiento ingresados no se controla por el programa. Puede que si se abusa de la consulta Correos de Chile controle su uso. Usar con discreción.


