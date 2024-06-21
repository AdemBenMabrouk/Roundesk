import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentsService: AgentService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.agentsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.agentsService.remove(id);
  }

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.agentsService.searchByName(name);
  }

  @Get('filter')
  filterByGroup(@Query('group') group: string) {
    return this.agentsService.filterByGroup(group);
  }
}
