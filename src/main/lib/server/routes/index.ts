import * as authCtrl from '../controllers/auth'
import * as userCtrl from '../controllers/user'

export const AppRoutes = [
  {
    path: "/auth/login",
    method: "post",
    action: authCtrl.login
  },
  {
    path: "/auth/logout",
    method: "get",
    action: authCtrl.logout
  },
  {
    path: "/auth/register",
    method: "post",
    action: authCtrl.register
  },
  {
    path: "/self",
    method: "get",
    action: userCtrl.self
  }
]