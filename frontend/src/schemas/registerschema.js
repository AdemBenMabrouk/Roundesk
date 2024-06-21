// src/schemas/registerSchema.js
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

export default registerSchema;
