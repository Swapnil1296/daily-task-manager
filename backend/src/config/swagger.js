// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Daily Task Tracker API List',
            version: '1.0.0',
            description: 'API documentation for daily task tracker'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server'
            },
            {
                url: 'http://localhost:3000',
                description: 'UAT server'
            }

        ],
        components: {
            schemas: {
                signup: {
                    type: 'object',
                    required: ['email', 'name', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        name: {
                            type: 'string',
                            description: 'User full name'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'User password'
                        }
                    }
                },
                signin: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },

                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'User password'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/docs/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;