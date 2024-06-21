import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentsRepository: Repository<Agent>,
  ) {}

  create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent = this.agentsRepository.create(createAgentDto);
    return this.agentsRepository.save(agent);
  }

  findAll(): Promise<Agent[]> {
    return this.agentsRepository.find();
  }

  findOne(id: number): Promise<Agent> {
    return this.agentsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    await this.agentsRepository.update(id, updateAgentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.agentsRepository.delete(id);
  }

  searchByName(name: string): Promise<Agent[]> {
    return this.agentsRepository.find({ where: { name } });
  }

  filterByGroup(group: string): Promise<Agent[]> {
    return this.agentsRepository.find({ where: { group } });
  }
}
