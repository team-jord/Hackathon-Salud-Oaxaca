import httpClient from "./HttpClient";

const prefix = "/examen";

export default class ExamenService {
  static async create(user) {
    return (await httpClient.post(`${prefix}`, user)).data;
  }

  static async update(user) {
    return (await httpClient.put(`${prefix}/${user.id}`, user)).data;
  }

  static async remove(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async getAll() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async get(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
}
