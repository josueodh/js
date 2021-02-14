import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppontmentsController from '../controllers/ProviderAppontmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppontmentsController = new ProviderAppontmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppontmentsController.index);

export default appointmentsRouter;
