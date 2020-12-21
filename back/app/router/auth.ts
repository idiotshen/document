import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;
  router.post('/auth/register', controller.auth.register);
  router.post('/auth/login', controller.auth.login)
}