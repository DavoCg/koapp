const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const pgp = require('pg-promise')();
const stripe = require('stripe');
const config = require('./config');
const {user, pub, address, payment} = require('./api');
const {error, logger, validate, format, isLogged, isAdmin, isMe} = require('./middlewares');

const app = new Koa();
const parser = bodyParser();

const routers = {
    user: new Router({prefix: '/customers'}),
    address: new Router({prefix: '/addresses'}),
    payment: new Router({prefix: '/payments'}),
    pub: new Router({prefix: '/public'})
};

app.use(compress({threshold: 50}));
app.use(parser);
app.use(error);
app.use(logger);

app.context.db = pgp(config.db);
app.context.stripe = stripe((config.stripe.key));

routers.pub
    .post('/login', validate.login, format.login, pub.login)
    .post('/register', validate.register, format.register, pub.register);

routers.address
    .use(isLogged)
    .get('/', address.list)
    .get('/:id', isMe('address'), address.get)
    .delete('/:id', isMe('address'), address.remove)
    .put('/:id', isMe('address'), validate.updateAddress, address.update)
    .post('/', validate.addAddress, address.add);

routers.user
    .use(isLogged)
    .get('/', isAdmin, user.list)
    .get('/:id', isMe('customer'), user.get)
    .delete('/:id', isMe('customer'), user.remove)
    .put('/:id', isMe, validate.updateUser, user.update);

routers.payment
    .use(isLogged)
    .get('/', payment.list)
    .get('/:id', isMe('payment'), payment.get)
    .delete('/:id', isMe('payment'), payment.remove)
    .post('/', validate.addPayment, payment.add);


app.use(routers.pub.routes());
app.use(routers.user.routes());
app.use(routers.address.routes());
app.use(routers.payment.routes());

app.listen(3000);