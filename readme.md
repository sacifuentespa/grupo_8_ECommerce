# **Ecommerce Grupo 8**

## Equipo de trabajo:
- **Santiago Cifuentes:** Con formación profesional como ingeniero civil, Santiago decidió incursionar en el mundo de la tecnología. En proceso de certificarse como Desarrollador web Full Stack, con interes variados como la ciencia de datos, inteligencia artificial, educación, física, matemáticas y la música.

- **Mónica García Moreno:** Economista de profesión, con interés en el mundo de la tecnología y la programación. Actualmente en formación como desarrolladora web full stack.

- **Miguel Ángel Mosquera Grisales:** Autodidacta apasionado por la informatica, desarrollador web full stack en progreso. Enfoque principal en el desarrollo backend y la intelegencia artificial.

---
## **TEMÁTICA DEL SITIO:**


### **¿Qué productos o servicios brindará nuestro sitio?** 
El sitio web se encargará de facilitar el intercambio de bienes y/o servicios a través de trueque o el pago parcial o total de los mismos. Estos se definirán por categoría de la siguiente manera:

-Vehículos y motos.
-Hogar y muebles.
-Electrodomésticos.
-Inmobiliaria.
-Computadoras, celulares y otros.
-Ropa y accesorios.
-Deportes.
-Libros, revistas y comics.
-Empleos y servicios.


### **¿Quién será nuestra audiencia objetivo?**  
La audiencia objetivo será la población colombiana mayor de 18 años. 


### **¿Cómo ajustaremos nuestra oferta a ese público?**
El sitio web será un espacio de encuentro entre potenciales vendedores y/o compradores de bienes y/o servicios, por lo tanto, la oferta y demanda se ajustarán a las dinámicas y necesidades de la audiencia objetivo. 


### **LISTADO DE 5 REFERENTES Y LAS RAZONES DE INTERÉS:**


- **MI TRUQUE: https://www.mitrueque.com.co** Por la estética que presenta, las funcionalidades implementadas y los productos y/o servicios que ofrece.

- **MERCADO LIBRE: https://www.mercadolibre.com.co** Por la estética que presenta, las funcionalidades implementadas y los clientes a los que apunta.

- **AMAZON: https://www.amazon.com** Por la estética que presenta y los productos y/o servicios que ofrece.

- **TRUEQUE.WEB: https://www.truequeweb.com** Por los productos y/o servicios que ofrece.

- **OLX: https://www.olx.com.co** Por los productos y/o servicios que ofrece

~~~
Notas:
    - Los wireframes se encuentran en la carpeta con el respectivo nombre
    -Tablero de trabajo(Trello): https://trello.com/b/MtXctl2n/tablero-ecommerce

Importante:

Sabemos que actualmente la página no es tan intuitiva como debería, así que preparamos las siguientes recomendaciones:

    - La página no funciona sin poblar la base de datos con productos. Si realizas un drop schema vuelve a crear la base de datos importando el script truequeOnlineDatabase.sql y luego importando los datos de productos con el script truequeOnlineData.
    - Recomendamos probar el CRUD de productos con nuevos productos que crees por la razón anterior, y si borras un producto original, no hagas push :'c
    -  ahora las rutas
    * puedes buscar productos en la barra de busqueda
    * '/' devuelve el home de la aplicacion.
    * '/product/:id' muestra el producto, puedes encontrarlo más facil al hacer la busqueda
    * '/productUpload' para subir tu producto a nuestra página.
    * '/productEdit' no te gusto? puedes editarlo. Si no subes nuevas imagenes se conservaran las que ya estaban.
    * '/cart' muestra el carrito, en desarrollo.
    * '/login' login de usuarios, puedes acceder desde el header del sitio
    * '/ register'registro de usuarios, puedes acceder desde el header del sitio. Si no proporcionas una imagen te asignaremos una default.
    * '/users/userProfile' te dirige a tu perfil, tienes que estar logueado.
    * '/users/userEdit' te dirige a la edición del perfil, tienes que estar logueado. Al editar se requerirá loguearse de nuevo para comprobar los cambios con tus nuevas credenciales, si es que las cambiaste.
    * '/listProducts' basicamente lista todos los productos que hay en el momento.
    * '/admin/products/314' solo para propositos de comprobación, puedes eliminar o editar productos en está pagina. La idea es que actue como la pagina de un administrador.
    * ''/admin/users/271' solo para propositos de comprobación, puedes eliminar o editar usuarios en está pagina. La idea es que actue como la pagina de un administrador.

~~~
