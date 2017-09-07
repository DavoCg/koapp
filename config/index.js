const env = process.env.NODE_ENV;

const config = {
    test: {
        db: {
            host: 'localhost',
            port: 5433,
            database: 'dogs'
        },
        jwt: {
            secret: 'hgdsvhb@fhdjf!!jehdfbhfshhg'
        },
        admins: [],
        stripe: {
            key: 'sk_test_T267p7zbNPpNEUVMVU8Si46e'
        }
    },
    all: {
        db: {
            host: 'horton.elephantsql.com',
            port: 5432,
            user: 'ivxtuwqe',
            database: 'ivxtuwqe',
            password: 'eD3dZ87mVMUN8CThgyYujccuTbx-UbTa',
            poolSize: 1
        },
        jwt: {
            secret: 'hgdsvhb@fhdjf!!jehdfbhfshhg'
        },
        admins: [37],
        stripe: {
            key: 'sk_test_T267p7zbNPpNEUVMVU8Si46e'
        }
    }
};

module.exports = config[env] || config.all;