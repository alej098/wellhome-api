# :gear: WELLHOME APP :gear:

## Resources
* [SASS tutorial](https://www.youtube.com/watch?v=ZTbUtp7RhrQ&t=6277s&ab_channel=TheFullstackDevs)

## Design
![final](assets/)

## General
- The code was worked with React, JavaScript, Redux, PostgreSql, node Js, Express and the styling was done with SASS a CSS's processor.
- The PNG images was optimized with the following website: https://tinypng.com/
- The SVG images was optimized with the following website: https://jakearchibald.github.io/svgomg/
- The URL of the project is as follows: https://
- This app is a useful tool for the administrative management of condominiums, residential complexes, and any type of multi-owner associations. Initially, it should offer basic tools such as:

### User Registration:
- Register users who have a clasification according to privileges and type of role within the App.

### Property Registration: 

### Registration of Facilities and Maintainable Components:

### Payment Registration:

### Administration Reports:

## Authors :book:

## Controladores y Schemas (Tablas / Colecciones):
Orden de inicialización:

1. User RolInit: Configuración inicial de Roles. Al ser una cinfiguración general y sensible, se hace la configuración desde una función de inicialización y el CRUD debe limitarse a 
    ->Create. 
    ->Pendiente la Ruta, Handler y Controller (create unicamente);
    ->Reservado a WebAppAdmin


2. UserClass: Es el categorizador principal de usuarios.
    -> Se relaciona de con userType de muchos a muchos.
    -> Create Update Delete Reservado a WebAppAdmin


3. UserType: Es el categorizador secundario de usuarios o una subcategoría que nace de UserClass.
    -> Se relaciona de con userClass de muchos a muchos.
    -> Create Update Delete Reservado a WebAppAdmin
    -> Pendiente traer los ComponentTypes relacionados en los GET

4. ComponentClass: Los Componentes refieren a los espacios públicos o ambientes comunes que requieres ser registrados ára fines de control de estados económicos, mantenimiento, reservas, otros. La Clase de un componente es un categorizador o agruador principal.
    -> Create Update Delete Reservado a WebAppAdmin
    -> Agregar al controlador de GetById que traiga las Clases relacionadas


5. ComponentType: Es el categorizador secundario de usuarios o una subcategoría que nace de ComponentClass.
    -> Create Update Delete Reservado a WebAppAdmin


6. ManagementCo : Empresas administradores o de servicios que pueden estar relacionadas a un condominio o conjunto de unidades.

    ->Pendiente: Actualmente su identificador Tributario (companyTaxId) es la clave primaria, sin embargo se requiere que el id concatene el prefijo del pais al TaxId. : ej: PE2068495023 
    No depende de otros Schemas, puede ser creado en cualquier momento, pero se sugiere la creación antes del condominio.

    ->Controlador "get y getById" modificar para que traiga los MainPlace relacionados.
    ->Controlador (path) para aplicar borrado lógico "isSuspended" true.
    ->Controlador get por query que traiga coincidencias /managementCo/name?="..."**
    ->Controlador get filtrando por isSuspended


7. MainPlace: Conjunto Principal, puede ser el propio Centro comercial, el Condominio, comunidad e incluso un Edificio de Departamentos(cuando éste sea el sitio principal). Es el agrupador mayor y sobre el cual se trabajan todos los procesos. 

    ->Actualmente el Id se configura manualmente, bajo un esquema de un prefijo de Pais, seguido de un prefijo de Ciudad, seguido de un incrementable de 5 digitos. Pendiente automatizar la generación de Códigos o Id que mantenga una estructura similar.
    -> Controladores Pendientes:
        get (borrado Lógico)
        get por query (name)
        get por pais

8. Fee: La tarifa estandar aplicable a propiedades y/o componentes. Cuotas frecuentes, fijas y ordinarias por mantenimiento, reservas u otros, que generen un ingreso.

    -> Los Fees son configurados por Mainplace y asignados directamente a propiedades y componentes.
    -> Pendiente en el modelo, configurar correctamente el "unique" cuando se cumpla la condición de que se repite la sescripcion en un mismo MainPlace.
    -> Pendiente actualizar los handlers para que sigan el standar de manejo de errores
    -> Pendiente actualizar Controllers con TryCatch y aplicar los logger mnecesarios.


9. Components: Espacios públicos o ambientes comunes que requieren ser registrados ára fines de control de estados económicos, mantenimiento, reservas, otros. Estos Componentes son de uso exclusivo de cada MainPlace. Debe ser configurado despues del MainPlace.

    -> Pendiente hacer la configuracion en el modelo para que el code y el name tengan la propiedad Unique cuando esta relacionado a un misno mainPlace.

10. Property: Propiedad propiamente dicha.

    -> El Id se cofigura manualmente siguiendo un patrón de codigo que queda aun pendiente automatizar. prefijo de pais, prefijo de ciudad, iniciales de Mainplace, numero incrementable de 4 dígitos.
    -> En los GET controllers, pendiente traer datos de usuarios relacionados a la propiedad.
    -> Pendiente implementar GET by NAME asociada al mainGropuerNAme
    -> Pendiente los controllers de Get findAll() y por "isSuspended" borrado lógico.

11. User: Engloba a todos los usuarios de la app, con o sin privilegios, desde los administradores, usuarios y trabajadores.

    ->Pendiente implementar el campo de imágenes: los usuarios pueden subir una foto, imagen o seleccionar iconos estandar de la app (necesitamos 4 iconos), los trabajadores deberían poder tener una foto real que será parte de la card de colaboradores en donde deben salir los datos de los colboradores/trabajadores asociados al mainPlace.
    -> En el modelo, pendiente aplicar validadores a Pssword (requerimientos de seguridad)
    -> Rutas CREATE y DELETE Restringida a WebAppAdmmin
    -> 

