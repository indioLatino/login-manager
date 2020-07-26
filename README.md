# login-manager

Proyecto web encargado de proporcionar el interfaz de autenticación de la aplicación Foodie.

Este proyecto ha sido construído con la intención de ser reutilizado en otros proyectos web, para dar funcionalidades
de autenticación de usuario a otros módulos de manera rápida.

## Prerequisitos
* El login-manager consume servicios de autenticación de Amazon Web Services, específicamente Cognito. 
Asegúrese de no tener ningun sistema de cortafuegos que impida la conexion con el exterior.

* Es obligatorio tener Nodejs instalado en el equipo. Puede encontrar las instrucciones de instalación para su sistema
operativo en el siguiente enlace [Nodejs](https://nodejs.org/en/download/package-manager/).

* Es obligatorio tener el manejador de paquetes npm instalado en el equipo. Puede encontrar las instrucciones de instalación para su sistema operativo
en el siguiente enlace [npm](https://www.npmjs.com/get-npm).

* Es obligatorio tener la herramienta Angular CLI instalada en el equipo. Puede encontrar las instrucciones de instalación 
en el siguiente enlace [angular-cli](https://angular.io/guide/setup-local).


## Arrancar la aplicación

Primeramente hay que posicionarse en el directorio de raíz del proyecto e instalar las dependecias ejecutando:
`npm install`
Una vez instaladas las dependencias ejecutar `ng serve --port 4201` para arrancar la aplicación.

Notese que es indispensable especificar el puerto 4201 para que el login-manager pueda se utilizado correctamente por los
módulos padre que lo importen.

Abra la siguiente url en su navegador para ver la aplicación arrancada `http://localhost:4201/`.
