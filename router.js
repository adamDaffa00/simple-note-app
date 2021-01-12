const routes = [
  //{ path: '/', component: home },
  { path: '/', component: note},
  { path: '/bin', component: recycleBin },
  { path: '/bin/:id', component: renderData },
  { path: '*', component: NotFound }
];


const router = new VueRouter({
 routes,
 mode: 'history'  
});