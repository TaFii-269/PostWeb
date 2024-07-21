import postRouter from './post.route.js';
import siteRouter from './site.route.js';
// import taskRouter from './task.route.js';
// import userRouter from './user.route.js';
// import storyRouter from './story.route.js';
import authRouter from './auth.route.js';
// import wallRouter from './wall.route.js';
import Auth from '../app/helpers/Auth.js';

const route = (app) => {
    app.use('/posts', Auth.verifyJWTToken, siteRouter); 
    // app.use('/wall',Auth.verifyJWTToken, wallRouter);
    app.use('/auth', authRouter);
    // app.use('/user/create', userRouter);
    // app.use('/detail',postRouter);
    app.use('/',Auth.verifyJWTToken, siteRouter);
    
}

export default route;