export class CreateAgentDto {
    name: string;
    phoneNumber: string;
    email: string;
    group: string;
    registrationDate: Date;
    canMakeCalls: boolean;
    photo: string;
  }
  