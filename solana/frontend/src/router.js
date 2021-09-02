import Vue from "vue";
import Router from "vue-router";
import config from "./config";
import fetch from "node-fetch";

Vue.use(Router);

const router = new Router({
  mode: "history",  
  routes: [
    {
      path: "/",
      name: "Website",
      component: () => import(/* webpackChunkName: "investorLogin" */ './views/Website.vue'),
    },
     {
      path: "/app",
      redirect: "/app/admin/login",
    },

    {
      path: "/app/login/:projectSlug",
      name: "PKIIdLogin",
      component: () => import(/* webpackChunkName: "investorLogin" */ './views/PKIIdLogin.vue'),
    },
    {
      path: "/app/form/:slug",
      name: "investor",
      component: () => import(/* webpackChunkName: "investor" */ './views/Investor.vue') ,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/app/form",
      name: "investor",
      component: () => import(/* webpackChunkName: "investor" */ './views/Investor.vue') ,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/app/admin",
      redirect: "/app/admin/login",
    },
    {
      path: "/app/admin/login",
      name: "AdminLogin",
      component: () => import(/* webpackChunkName: "adminLogin" */ './views/AdminLogin.vue'),
    },
    {
      path: "/app/admin/dashboard",
      name: "Dashboard",
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/app/admin/investors",
      name: "investors",
      component: () => import(/* webpackChunkName: "investors" */ './views/Investors.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/app/admin/project",
      name: "project",
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
    {
      path: "/app/admin/subscription",
      name: "subscription",
      component: () => import(/* webpackChunkName: "subscription" */ './views/Subscription.vue') ,
      meta: {
        requiresAuth: true,
        admin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // console.log("Yes auth token");
      const url = `${config.studioServer.BASE_URL}hs/api/v2/auth/protected`;
      fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status == 403) {
            next({
              path: to.meta.admin ? "/app/admin/login" : "/app/login",
              params: { nextUrl: to.fullPath },
            });
          } else {
            localStorage.setItem("user", JSON.stringify(json.message));
            // console.log(to.path);
            if (to.meta.admin && !json.message.isSubscribed && to.path != "/app/admin/subscription") {
              next({
                  path: '/app/admin/subscription',
                  params: { nextUrl: to.fullPath }
              })
            } else {
                next()
            }
          }
        })
        .catch((e) => {
          next({
            path: to.meta.admin ? "/app/admin/login" : "/app/login",
            params: { nextUrl: to.fullPath },
          });
        });
    } else {
      // I think this part is not required anymore...
      if((to.params["slug"] || to.query["projectId"]) && (to.params["slug"] != "" || to.query["projectId"] != "")){
        // console.log("first we need to remove all these items projectDetails, projectSlug, projectId")
        localStorage.removeItem("projectDetails");
        localStorage.removeItem("projectSlug");
        localStorage.removeItem("projectId");
        if(!to.params["slug"]){
          if(!to.query["projectId"]){
            // i guess no need to do anything here
          }else{
            localStorage.setItem("projectId", to.query["projectId"]);
          }
        }else{        
          localStorage.setItem("projectSlug", to.params["slug"]);  
        }
        
      }else{
        console.log("ProjectId or slug is blank");
        console.log("Not doing anything but just sending to next route");
      }

      next({
        path: to.meta.admin ? "/app/admin/login" : (
          !to.query["referrer"] ? 
          `/app/login/${to.params["slug"]}` :
          `/app/login/${to.params["slug"]}?referrer=${to.query["referrer"]}`
        ),
        params: { nextUrl: to.fullPath },
      });
    }
  } else {
    next();
  }
});
export default router;
