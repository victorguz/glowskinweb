he movido las páginas que creaste a la carpeta de servicios. 
Quiero que, teniendo en cuenta la misma estructura de los servicios que diseñaste, añadas esa informacion en el services.json (ahora migrado a @services.ts ) de manera que se pueda manejar correctamente de manera mucho más sencilla y utilizando una plantilla. 

Lo primero que debes hacer es arreglar los archivos donde se usaba antes services.json para que ahora utilicen la información desde SERVICES_DATA. 

Lo segundo que debes hacer es migrar la información que pusiste en las nuevas páginas hacia la constante services_data. Especificando desde iconos, textos, titulos, todo el contenido que tenías en cada página. Todo esto debes ponerlo dentro de una propiedad "page".

Lo tercero es crear una plantilla similar a las páginas de servicio que ya definiste pero que se le pueda enviar el identificador del servicio a traves de la ruta creada en @app.routes.ts y la reciba con activatedRoute. Luego de eso buscará el servicio en la variable global services_Data. Se deben crear las mismas rutas de servicios que te habia solicitado pero 


Para la plantilla ten en cuenta utilizar los mismos estilos gráficos y colores del resto del sistema, es más, documentalos en un readme para que no vuelvas a hacerlo.


