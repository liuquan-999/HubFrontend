import { AxiosResponse } from 'axios';
import { decamelizeKeys } from 'humps';
import { httpClient } from '../instance';
import { IService, IServiceDetailResponse, IServiceListResponse } from './models';

export interface IServiceQuery {
  limit: number;
  offset: number;
}

class ServiceOperator {
  key = 'services';

  async getAll(query: IServiceQuery): Promise<AxiosResponse<IServiceListResponse>> {
    return await httpClient.get(`/${this.key}/`, {
      params: decamelizeKeys(query)
    });
  }

  async get(id: string): Promise<AxiosResponse<IServiceDetailResponse>> {
    return await httpClient.get(`/${this.key}/${id}`);
  }

  async create(data: IService): Promise<AxiosResponse<IServiceDetailResponse>> {
    return await httpClient.post(`/${this.key}/`, data);
  }

  async update(id: string, data: IService): Promise<AxiosResponse<IServiceDetailResponse>> {
    return await httpClient.put(`/${this.key}/${id}`, data);
  }

  async delete(id: string): Promise<AxiosResponse<null>> {
    return await httpClient.delete(`/${this.key}/${id}`);
  }
}

export const serviceOperator = new ServiceOperator();
