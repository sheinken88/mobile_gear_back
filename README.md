# Mobile Gear - Backend

e-commerce de dispositivos moviles y accesiorios.

### Dependencias:

- @faker-js/faker
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- nodemailer
- nodemon
- pg
- pg-hstore
- sequelize

### Instalacion:

- clona el repositorio
- En la terminal, navega hasta el directorio raíz
- ejecuta "npm i" para instalar todas las dependencias
- asegurate de tener configurado un archivo .env con los datos correspondientes.
- inicia el servidor con "npm start"

### Modelos de Datos

- Brands: representa las marcas de los dispositivos móviles y accesorios.
- Categories: describe las categorías en las que se clasifican los productos.
- Deliverys: gestiona los envios de los pedidos.
- Orders: interviene en la ejecucion de las ordenes del carrito.
- PaymentInfo: registra la información de pago de los usuarios.
- Payments: establece el tipo de pago utilizado en la operacion.
- ProductOrders: establece la relación entre los productos y los pedidos.
- Products: contiene la información de los productos disponibles
- Users: almacena los datos de los usuarios registrados.

![Copy of Copy of Untitled Diagram](https://github.com/sheinken88/mobile_gear_back/assets/125990977/9e2fb09e-eb7d-4a88-9892-0589fd048e08)



### Rutas

- admin: permite realizar operaciones de administración, como la gestión de productos y usuarios.
- cart: permite gestionar el carrito de compras de los usuarios.
- orders: permite realizar y gestionar las ventas del carrito.
- products: ofrece funcionalidades para la gestión de productos, como la creación, actualización y obtención de detalles de los productos.
- users: permite registrar usuarios, iniciar y cerrar sesion.
