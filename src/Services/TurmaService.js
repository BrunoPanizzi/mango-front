import { z } from 'zod';

const novaTurmaSchema = z.object({
    nome: z.string(),
    anoEscolar: z.number().int(),
    quantidadeMaxima: z.number().int(),
    turno: z.string(),
    serie: z.string()
});

const turmaSchema = z.object({
    id: z.number(),
    nome: z.string(),
    anoEscolar: z.number().int(),
    quantidadeMaxima: z.number().int(),
    turno: z.string(),
    serie: z.string(),
    createdAt: z.union([z.string(), z.date()]).optional(),
    updatedAt: z.union([z.string(), z.date()]).optional()
});

class TurmaService {
    async list() {
        const jwt = localStorage.getItem('token');

        const res = await fetch(`${API_URL}/turmas`, {
            headers: { 'Authorization': `Bearer ${jwt}` }
        });

        if (!res.ok) throw new Error('Failed to fetch turmas');

        const data = await res.json();

        return turmaSchema.array().parse(data).map(t => ({ ...t, alunosMatriculados: 0 }));
    }

    async create(novaTurma) { }
}

const API_URL = 'http://localhost:3003' // TODO: Move to env variable

export default new TurmaService();