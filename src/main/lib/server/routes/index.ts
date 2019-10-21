import * as authMw from '../middleware/auth'
import * as authCtrl from '../controllers/auth'
import * as userCtrl from '../controllers/user'

export const AppRoutes = [
  // public routes
  {
    path: "/session",
    method: "post",
    action: authCtrl.createSession
  },
  {
    path: "/session",
    method: "delete",
    action: authCtrl.deleteSession
  },
  {
    path: "/users",
    method: "post",
    action: userCtrl.registerUser
  },
  // guarded routes
  {
    path: "/users/self",
    method: "get",
    action: userCtrl.fetchSelf,
    middleware: [authMw.hasSession]
  },
  {
    path: "/users/:userId",
    method: "delete",
    action: userCtrl.deleteUser,
    middleware: [authMw.hasSession, authMw.isAdmin]
  },
]