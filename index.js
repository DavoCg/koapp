const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const pgp = require('pg-promise')();
const config = require('./config');
const {user, pub, address} = require('./api');
const {error, logger, validate, isLogged, isAdmin, isMe} = require('./middlewares');

const app = new Koa();
const parser = bodyParser();

const routers = {
    user: new Router({prefix: '/users'}),
    address: new Router({prefix: '/addresses'}),
    pub: new Router({prefix: '/public'})
};

app.use(parser);
app.use(error);
app.use(logger);

app.context.db = pgp(config.db);

routers.pub
    .post('/login', validate.login, pub.login)
    .post('/register', validate.register, pub.register);

routers.address
    .use(isLogged)
    .get('/', isAdmin, address.list)
    .get('/:id', isMe, address.get)
    .delete('/:id', isMe, address.remove)
    .put('/:id', isMe, validate.updateAddress, address.update)
    .post('/', validate.addAddress, address.add);

routers.user
    .use(isLogged)
    .get('/', isAdmin, user.list)
    .get('/:id', isMe, user.get)
    .delete('/:id', isMe, user.remove)
    .put('/:id', isMe, validate.updateUser, user.update);

app.use(routers.pub.routes());
app.use(routers.user.routes());
app.use(routers.address.routes());

app.listen(3000);