const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const pgp = require('pg-promise')();
const stripe = require('stripe');
const config = require('./config');
const {user, pub, address, payment, post, favorite, cart, order} = require('./api');
const {error, logger, validate, format, isLogged, isAdmin, isMe} = require('./middlewares');

const app = new Koa();
const parser = bodyParser();

const routers = {
    user: new Router({prefix: '/customers'}),
    address: new Router({prefix: '/addresses'}),
    payment: new Router({prefix: '/payments'}),
    pub: new Router({prefix: '/public'}),
    post: new Router({prefix: '/posts'}),
    favorite: new Router({prefix: '/favorites'}),
    order: new Router({prefix: '/orders'}),
    cart: new Router({prefix: '/cart'})
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
    .get('/get/me', user.me)
    .get('/:id', isMe('customer'), user.get)
    .delete('/:id', isMe('customer'), user.remove)
    .put('/:id', isMe('customer'), validate.updateUser, user.update);

routers.post
    .use(isLogged)
    .get('/', post.list)
    .get('/trends', post.listTrends)
    .get('/:id', isMe('post'), post.get)
    .delete('/:id', isMe('post'), post.remove)
    .put('/:id', isMe('post'), validate.updatePost, post.update)
    .post('/', validate.addPost, post.add);

routers.favorite
    .use(isLogged)
    .get('/', favorite.list)
    .get('/is/:postId', favorite.isFavorite)
    .delete('/:id', isMe('favorite'), favorite.remove)
    .post('/', validate.addFavorite, favorite.add);

routers.cart
    .use(isLogged)
    .get('/', cart.list)
    .delete('/:id', isMe('cart_post'), cart.remove)
    .post('/', validate.addCart, cart.add);

routers.order
    .use(isLogged)
    .get('/', order.list)
    .get('/ref/:reference', order.get)
    .post('/', validate.addOrder, order.add);

routers.payment
    .use(isLogged)
    .get('/', payment.list)
    .get('/:id', isMe('payment'), payment.get)
    .delete('/:id', isMe('payment'), payment.remove)
    .post('/', validate.addPayment, payment.add);


app.use(routers.pub.routes());
app.use(routers.user.routes());
app.use(routers.post.routes());
app.use(routers.address.routes());
app.use(routers.payment.routes());
app.use(routers.favorite.routes());
app.use(routers.cart.routes());
app.use(routers.order.routes());

app.listen(3003);

module.exports = app;