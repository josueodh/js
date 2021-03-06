import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type Response = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentdate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour, 0, 0);
      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentdate),
      };
    });
    return availability;
  }
}

export default ListProviderDayAvailabilityService;
