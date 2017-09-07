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
            host: 'elmer.db.elephantsql.com',
            port: 5432,
            user: 'qhzkcnhf',
            database: 'qhzkcnhf',
            password: 'ZVHMMpQagM2laISW1nhwNShLcT6BKV2t',
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