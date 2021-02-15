import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  month: number;
  day: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    day,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('asd');
    console.log(cacheData);
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        day,
        year,
      },
    );

    //await this.cacheProvider.save('asd', 'asdss');
    return appointments;
  }
}

export default ListProviderAppointmentsService;
