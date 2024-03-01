const logger = require('./logger');

const {
    UserRol,
    UserClass,
    UserType,
    ComponentClass,
    ComponentType,
    ManagementCo,
    MainPlace,
    Fee,
    Component,
    Property,
    User
    
    } = require('../db');

async function userRolInit() {
    try {
        logger.info('Initializing UserRolInit data...');

        const count = await UserRol.count();
        if (!count) {
            const userRoles = [
                {
                    id: '00-SuperAdmin', 
                    name: 'WebApp Admin'
                },
                {
                    id: '01-LocalAdmin',
                    name: 'Administrador'
                },
                {
                    id:'02-Moderator',
                    name: 'Moderador'
                },
                {
                    id: '03-User',
                    name: 'Usuario'
                },
                {
                    id: '04-External',
                    name: 'Externo'
                }
            ];
            await UserRol.bulkCreate(userRoles);
        }
    logger.info('UserRolInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during UserRolInit initialization:', error);
    } 
};


async function userClassInit() {
    try {
        logger.info('Initializing UserClassInit data...');
        
        const count = await UserClass.count();
        if (!count) {
        const userClasses = [
                'Directivo',
                'Residente',
                'Colaborador'
        ].map(name => ({name}));
        await UserClass.bulkCreate(userClasses);
        }
    logger.info('UserClassInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during UserClassInit initialization:', error);
    }
};


async function userTypeInit() {
    try {
        logger.info('Initializing UserTypeInit data...');

        const count = await UserType.count();
        if (!count) {
            const userTypes = [
                {
                    name: 'Presidente',
                    UserClassId:[1,2]
                },
                {
                    name: 'Secretario',
                    UserClassId:[1,2]
                },
                {
                    name: 'Tesorero',
                    UserClassId: [1, 2]
                },
                {
                    name: 'Administrador Externo',
                    UserClassId: [1, 3]
                },
                {
                    name: 'Propietario',
                    UserClassId: [1, 2, 3]
                },
                {
                    name: 'Inquilino',
                    UserClassId: [2, 3]
                },
                {
                    name: 'Administrador',
                    UserClassId: [1, 2, 3]
                },
                {
                    name: 'Personal de Vigilancia',
                    UserClassId: [2, 3]
                },
                {
                    name: 'Personal de Limpieza',
                    UserClassId: [2, 3]
                },
                {
                    name: 'Personal de Servicios Múltiples',
                    UserClassId: [2, 3]
                },
                {
                    name: 'Personal de Terceros',
                    UserClassId: [3]
                },
            ];
            for (const userTypeData of userTypes) {
                const userClassId = userTypeData.UserClassId;
                const userClasses = await UserClass.findAll({ where: { id: userClassId } });

                const userType = await UserType.create(userTypeData);
                await userType.setUserClasses(userClasses);
            }
        }
    logger.info('UserTypeInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during UserTypeInit initialization:', error);
    }
};


async function componentClassInit() {
    try {
        logger.info('Initializing ComponentClassInit data...');
        const count = await ComponentClass.count();
        if (!count) {
        const componentClasses = [
            'Recreacional',
            'Servicio',
            'Esenciales'
        ].map(name => ({name}));
        await ComponentClass.bulkCreate(componentClasses);
    }
    logger.info('ComponentClassInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during ComponentClassInit initialization:', error);
    }

};

async function componentTypeInit() {
    try {
        logger.info('Initializing ComponentTypeInit data...');

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
    logger.info('ComponentTypeInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during ComponentTypeInit initialization:', error);
    }  
};

async function managementCoInit(){
    try {
        logger.info('Initializing ManagementCo data...');
        
        const count = await ManagementCo.count();
        if (!count) {
        const managementCo = [
            {
                country: 'Perú',
                companyTaxId: '20604859205',
                companyName: 'Castrum Gestión y Servicios SAC',
                companyContact: 'Angelo A. Luján',
                companyPhone: '+51924707719',
                companyEmail: 'castrumperu@gmail.com',
                logo: 'https://img.freepik.com/vector-premium/trabajador-oficina-tomando-carpeta-archivo-administracion-gestion-gestion-archivos-icono-base-datos-catalogo-documentos-diseno-plano-ilustracion-vectorial-aislado-sobre-fondo-blanco_153097-1171.jpg',
                isSuspended: 'false'
            },
            {
                country: 'Perú',
                companyTaxId: '20000000002',
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
    logger.info('ManagementCo data initialized successfully.');
    } catch (error) {
        logger.error('Error during managementCo initialization:', error);
    }
};


async function mainPlaceInit(){
    try {
        logger.info('Initializing MainPlaceInit data...');

        const count = await MainPlace.count();
        if (!count) {
        const mainPlace = [
            {
                id: 'PE-AQP-00000',
                name: 'Condo WellHomeApp',
                country: 'Perú',
                state: 'Arequipa',
                city: 'Arequipa',
                district: 'Cercado',
                placeDescription: 'Urbanización Privada',
                placeImage: 'https://images.adsttc.com/media/images/5c7b/5574/284d/d1e0/d300/0126/slideshow/_Featuredimage.jpg?1551586648',
                phone: '+51950000001',
                email: 'wellhomeapp@example.com',
                isSuspended: false,
                ManagementCoCompanyTaxId: '20604859205'
            },
            {
                id: 'PE-AQP-00001',
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
                ManagementCoCompanyTaxId: '20604859205'
            },
          ];
        await MainPlace.bulkCreate(mainPlace);
    }
    logger.info('MainPlaceInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during mainPlaceInit initialization:', error);
    }
};


async function feeInit() {
    try {
        logger.info('Initializing FeeInit data...');
        
        const count = await Fee.count();
        if (!count) {
        const fees = [
            {
                feeDescription: 'Cuota de mantenimiento mensual',
                currency:'Pesos',
                amount: 35000,
                MainPlaceId: "PE-AQP-00000"
            },
            {
                feeDescription: 'Cuota de reserva de amenities',
                currency:'Pesos',
                amount: 10000,
                MainPlaceId: "PE-AQP-00000"
            },
        ];
        await Fee.bulkCreate(fees);
    }

    logger.info('FeeInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during FeeInit initialization:', error);
    }
};


async function componentInit() {
    try {
        logger.info('Initializing ComponentInit data...');

        const count = await Component.count();
        if (!count) {
        const components = [
            {
                name: 'Parque de niños 01',
                code: 'PN001',
                location: 'Salida 1',
                description: 'Parque principal de niños',
                acceptCost: true,
                isSuspended: false, 
                ComponentTypeId: 1,
                MainPlaceId: "PE-AQP-00000",
                FeeId: 2
                
            },
            {
                name: 'Parque de niños 02',
                code: 'PN002',
                location: 'Zona Central',
                description: 'Parque de juegos Infantiles',
                acceptCost: true,
                isSuspended: false,
                ComponentTypeId: 1,
                MainPlaceId: "PE-AQP-00000",
                FeeId: 2
            },
            {
                name: 'Loza Deportiva',
                code: 'LD001',
                location: 'Zona Central',
                description: 'Loza Multideportiva',
                acceptCost: true,
                isSuspended: false,
                ComponentTypeId: 2,
                MainPlaceId: "PE-AQP-00000",
                FeeId: 2
            },
            {
                name: 'Ascensor 001',
                code: 'AS001',
                location: 'Edificio3',
                description: 'Elevador Marca Weiss N/S 25741A25',
                acceptCost: true,
                isSuspended: false ,
                ComponentTypeId: 6,
                MainPlaceId: "PE-AQP-00000",
                FeeId: 2
            },
            {
                name: 'Ascensor 002',
                code: 'AS002',
                location: 'Edificio6',
                description: 'Elevador Marca Weiss N/S 25851A32',
                acceptCost: true,
                isSuspended: false,
                ComponentTypeId: 6,
                MainPlaceId: "PE-AQP-00000",
                FeeId: 2
            },
            {
                name: 'Cuarto de Bombeo Subterráneo',
                code: 'CB001',
                location: 'Sótano',
                description: 'Cuarto de bombas',
                acceptCost: true,
                isSuspended: false,
                ComponentTypeId: 8,
                MainPlaceId: "PE-AQP-00000",
                FeeId: 2
            },
            {
                name: 'Cuarto de Bombeo Tanque Elevado',
                code: 'CB002',
                location: 'Patio',
                description: 'Cuarto de bombas',
                acceptCost: true,
                isSuspended: false,
                ComponentTypeId: 8,
                MainPlaceId: "PE-AQP-00000",
                FeeId: 2
            }
        ];
        await Component.bulkCreate(components);
    }
    logger.info('ComponentInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during ComponentInit initialization:', error);
    }
};


async function propertyInit() {
    try {
        logger.info('Initializing PropertyInit data...');

        const count = await Property.count();
    if (!count) {
        const property = [
            {
                id: 'PE-AQP-WH-0001',
                propertyType: 'Casa',
                mainGrouper: 'Calle',
                mainGrouperName: 'Los Gladiolos',
                mainGrouperNumber: '201',
                status: 'Ocupado',
                subStatus: 'Regular',
                token: '000-000-001',
                MainPlaceId: 'PE-AQP-00000',
                FeedId: 1
            },
            {
                id: 'PE-AQP-WH-0002',
                propertyType: 'Casa',
                mainGrouper: 'Calle',
                mainGrouperName: 'Los Gladiolos',
                mainGrouperNumber: '202',
                status: 'Ocupado',
                subStatus: 'Regular',
                token: '000-000-002',
                MainPlaceId: 'PE-AQP-00000',
                FeedId: 1
            },
            {
                id: 'PE-AQP-WH-0003',
                propertyType: 'Casa',
                mainGrouper: 'Calle',
                mainGrouperName: 'Los Gladiolos',
                mainGrouperNumber: '203',
                status: 'Ocupado',
                subStatus: 'Regular',
                token: '000-000-003',
                MainPlaceId: 'PE-AQP-00001',
                FeedId: 1
            },

        ];
        await Property.bulkCreate(property);
    }
    logger.info('PropertyInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during PropertyInit initialization:', error);
    }
};

async function userInit() {
    try {
        logger.info('Initializing UserInit data...');

        const count = await User.count();
        if (!count) {
        const users = [
            {
                dni: '10000001',
                foreName: 'Oscar',
                lastName: 'Mangur',
                phone: '+51900000010',
                email: 'oscar@example.com',
                password: 'Password1',
                status: 'Habilitado',
                isAdmin: false,
                acceptCost: false,
                isSuspended: false,
                MainPlaceId: 'PE-AQP-00000',
                UserRolId: '03-User',
                UserTypeId: [1],
                PropertyId: ['PE-AQP-WH-0001']
            },
            {
                dni: '10000002',
                foreName: 'Jorge',
                lastName: 'Manzano',
                phone: '+51900000011',
                email: 'jorge@example.com',
                password: 'Password1',
                status: 'Habilitado',
                isAdmin: false,
                acceptCost: false,
                isSuspended: false,
                MainPlaceId: 'PE-AQP-00000',
                UserRolId: '03-User',
                UserTypeId: [5],
                PropertyId: ['PE-AQP-WH-0002', 'PE-AQP-WH-0003']
            },
            {
                dni: '10000003',
                foreName: 'Maria',
                lastName: 'Anaya',
                phone: '+51900000012',
                email: 'maria@example.com',
                password: 'Password1',
                status: 'Habilitado',
                isAdmin: false,
                acceptCost: false,
                isSuspended: false,
                MainPlaceId: 'PE-AQP-00000',
                UserRolId: '03-User',
                UserTypeId: [6],
                PropertyId: ['PE-AQP-WH-0003']
            },
        ];
        for (const userData of users) {
            const userTypeId = userData.UserTypeId;
            const userTypes = await UserType.findAll({ where: { id: userTypeId } });

            const propertyIds = userData.PropertyId;
            const properties = await Property.findAll({ where: { id: propertyIds } });

            const user = await User.create(userData);
            await user.setUserTypes(userTypes);
            await user.setProperties(properties);
        }
    }
    logger.info('UserInit data initialized successfully.');  
    } catch (error) {
        logger.error('Error during UserInit initialization:', error);
    }
    
};

module.exports = {
    mainPlaceInit,
    managementCoInit,
    userRolInit,
    userClassInit,
    userTypeInit,
    feeInit,
    componentClassInit,
    componentTypeInit,
    componentInit,
    propertyInit, 
    userInit
};