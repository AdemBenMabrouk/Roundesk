import { z } from 'zod';


const agentschema = z.object({
    name: z.string().nonempty('Le nom est requis'),
    phoneNumber: z.string().regex(/^\d{10}$/, 'Le numéro de téléphone doit contenir 10 chiffres'),
    email: z.string().email('Email invalide'),
    group: z.string().nonempty('Le groupe de destination est requis'),
    canMakeCalls: z.boolean()
  });

  export default agentschema