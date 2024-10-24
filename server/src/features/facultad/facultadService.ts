import { FacultadRepository } from './facultadRepository';
import { Facultad, facultadPartial } from './facultadModel';
import { facultadSchema } from './facultadModel';

export class FacultadService {
  private facultadRepository: FacultadRepository;

  constructor(facultadRepository: FacultadRepository) {
    this.facultadRepository = facultadRepository;
  }

  async getAll() {
    return await this.facultadRepository.getAll();
  }

  async getById(id: number) {
    if (id <= 0) {
      throw new Error('ID inválido');
    }
    return await this.facultadRepository.getById(id);
  }

  async create(facultadData: Facultad) {
    facultadSchema.parse(facultadData);
    return await this.facultadRepository.create(facultadData);
  }

  async update(id: number, facultadData: Facultad) {
    if (id <= 0) {
      throw new Error('ID inválido');
    }

    facultadPartial.parse(facultadData);
   

    return await this.facultadRepository.update(id, facultadData);
  }

  async delete(id: number) {
    if (id <= 0) {
      throw new Error('ID inválido');
    }

    return await this.facultadRepository.delete(id);
  }
}
