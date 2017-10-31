import Router from 'vue-router';

import NotFound from '../src/components/404';


const router = new Router({
    mode: 'history',    
    routes: [
    {
        path: '*',
        name: '404',
        component: NotFound,
    }],
});

export default router;
