const {
    ManagementCo,
    MainPlace,
    UserClass,
    UserType,
    ComponentClass,
    ComponentType,
    Component,
    } = require('./db');

async function managementCoInit(){
    const count = await ManagementCo.count();
    if (!count) {
        const managementCo = [
            {
                companyRUC: '20000000001',
                companyName: 'Administradora de Condominios SAC',
                companyContact: 'Angelo Luján',
                companyPhone: '+51950000000',
                companyEmail: 'condoadmin@example.com',
                logo: 'https://img.freepik.com/vector-premium/trabajador-oficina-tomando-carpeta-archivo-administracion-gestion-gestion-archivos-icono-base-datos-catalogo-documentos-diseno-plano-ilustracion-vectorial-aislado-sobre-fondo-blanco_153097-1171.jpg',
                isSuspended: 'false'
            },
            {
                companyRUC: '20000000002',
                companyName: 'Administradora de Residenciales SAC',
                companyContact: 'Marchelo Torontino',
                companyPhone: '+51960000000',
                companyEmail: 'residenciales@example.com',
                logo: 'https://img.freepik.com/vector-premium/trabajador-oficina-tomando-carpeta-archivo-administracion-gestion-gestion-archivos-icono-base-datos-catalogo-documentos-diseno-plano-ilustracion-vectorial-aislado-sobre-fondo-blanco_153097-1171.jpg',
                isSuspended: 'false'
            },
        ];
        await ManagementCo.bulkCreate(managementCo);
    }
};

async function mainPlaceInit(){
    const count = await MainPlace.count();
    if (!count) {
        const mainPlace = [
            {
              name: 'Residencial WellHomeApp',
              country: 'Perú',
              state: 'Arequipa',
              city: 'Arequipa',
              district: 'Cercado',
              placeDescription: 'Urbanización Privada',
              placeImage: 'https://images.adsttc.com/media/images/5c7b/5574/284d/d1e0/d300/0126/slideshow/_Featuredimage.jpg?1551586648',
              phone: '+51950000001',
              email: 'wellhomeapp@example.com',
              isSuspended: false,
              ManagementCoCompanyRUC: '20000000001'
            },
            {
                name: 'Residencial RestHome',
                country: 'Perú',
                state: 'Arequipa',
                city: 'Arequipa',
                district: 'Cercado',
                placeDescription: 'Urbanización Privada',
                placeImage: 'https://images.adsttc.com/media/images/5c7b/5574/284d/d1e0/d300/0126/slideshow/_Featuredimage.jpg?1551586648',
                phone: '+51950000002',
                email: 'resthome@example.com',
                isSuspended: false,
                ManagementCoCompanyRUC: '20000000001'
              },
          ];
        await MainPlace.bulkCreate(mainPlace);
    }
};

async function userClassInit() {
    const count = await UserClass.count();
    if (!count) {
        const userClasses = [
            'Directivo',
            'Residente',
            'Trabajador',
            'Proveedor'
        ].map(name => ({name}));
        await UserClass.bulkCreate(userClasses);
    }
};

async function userTypeInit() {
    const count = await UserType.count();
    if (count === 0) {
        const userTypes = [
            {
                name: 'Presidente',
                userClassId: [1, 2]
            },
            {
                name: 'Secretario',
                userClassId: [1, 2]
            },
            {
                name: 'Tesorero',
                userClassId: [1, 2]
            },
            {
                name: 'Propietario',
                userClassId: [1, 2, 3]
            },
            {
                name: 'Inquilino',
                userClassId: [2, 3]
            },
            {
                name: 'Administrador',
                userClassId: [2, 3, 4]
            },
            {
                name: 'Personal de Vigilancia',
                userClassId: [2, 3, 4]
            },
            {
                name: 'Personal de Limpieza',
                userClassId: [2, 3, 4]
            },
        ];
        await UserType.bulkCreate(userTypes);
    }

};

async function componentClassInit() {
    const count = await ComponentClass.count();
    if (!count) {
        const componentClasses = [
            'Recreacional',
            'Servicio',
            'Esenciales'
        ].map(name => ({name}));
        await ComponentClass.bulkCreate(componentClasses);
    }
};

async function componentTypeInit() {
    const count = await ComponentType.count();
    if (!count) {
        const componentTypes = [
            {
                name: 'Parques',
                ComponentClassId: 1
            },
            {
                name: 'Canchas Deportivas',
                ComponentClassId: 1
            },
            {
                name: 'Salones',
                ComponentClassId: 1
            },
            {
                name: 'BBQ',
                ComponentClassId: 1
            },
            {
                name: 'Piscinas',
                ComponentClassId: 1
            },
            {
                name: 'Ascensores',
                ComponentClassId: 2
            },
            {
                name: 'Video Vigilancia',
                ComponentClassId: 2
            },
            {
                name: 'Sistema Hidráulico',
                ComponentClassId: 3
            }
        ];
        await ComponentType.bulkCreate(componentTypes);
    }
};

async function componentInit() {
    const count = await Component.count();
    if (!count) {
        const components = [
            {
                name: 'Parque de niños 01',
                code: 'PN001',
                location: 'Salida 1',
                description: 'Parque principal de niños',
                ComponentTypeId: 1,
                MainPlaceId: 1,
                isSuspended: false 
            },
            {
                name: 'Parque de niños 02',
                code: 'PN002',
                location: 'Zona Central',
                description: 'Parque de juegos Infantiles',
                ComponentTypeId: 1,
                MainPlaceId: 1,
                isSuspended: false  
            },
            {
                name: 'Loza Deportiva',
                code: 'LD001',
                location: 'Zona Central',
                description: 'Loza Multideportiva',
                ComponentTypeId: 2,
                MainPlaceId: 1,
                isSuspended: false 
            },
            {
                name: 'Ascensor 001',
                code: 'AS001',
                location: 'Edificio3',
                description: 'Elevador Marca Weiss N/S 25741A25',
                ComponentTypeId: 6,
                MainPlaceId: 1,
                isSuspended: false 
            },
            {
                name: 'Ascensor 002',
                code: 'AS002',
                location: 'Edificio6',
                description: 'Elevador Marca Weiss N/S 25851A32',
                ComponentTypeId: 6,
                MainPlaceId: 1,
                isSuspended: false 
            },
            {
                name: 'Cuarto de Bombeo Subterráneo',
                code: 'CB001',
                location: 'Sótano',
                description: 'Cuarto de bombas',
                ComponentTypeId: 8,
                MainPlaceId: 1,
                isSuspended: false 
            },
            {
                name: 'Cuarto de Bombeo Tanque Elevado',
                code: 'CB002',
                location: 'Patio',
                description: 'Cuarto de bombas',
                ComponentTypeId: 8,
                MainPlaceId: 1,
                isSuspended: false 
            }
        ];
        await Component.bulkCreate(components);
    }
};

module.exports = {
    mainPlaceInit,
    managementCoInit,
    userClassInit,
    userTypeInit,
    componentClassInit,
    componentTypeInit,
    componentInit
};