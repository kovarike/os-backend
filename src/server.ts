import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import jwt, {JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import chalk from 'chalk';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const SECRET_KEY = 'supersecretkey';

console.log(chalk.blue('Servidor iniciando...'));

// Função de log formatado
const log = {
  success: (message: string) => console.log(chalk.green(`[SUCESSO] ${message}`)),
  error: (message: string) => console.log(chalk.red(`[ERRO] ${message}`)),
  warning: (message: string) => console.log(chalk.yellow(`[AVISO] ${message}`)),
  info: (message: string) => console.log(chalk.blue(`[INFO] ${message}`))
};

// Validação com Zod
const clientSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional()
});

const serviceSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive()
});

const orderSchema = z.object({
  clientId: z.number().int().positive(),
  serviceId: z.number().int().positive(),
  status: z.enum(['OPEN', 'PENDING', 'EXECUTED', 'REJECTED'])
});

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// // Middleware de autenticação
// const authenticate = async (req: Request, res:Response, next: NextFunction): Promise<any> => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     log.warning('Acesso não autorizado');
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     log.error('Token inválido');
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.warn('Acesso não autorizado');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Verifique se decoded é um JwtPayload antes de atribuir a req.user
    if (typeof decoded === 'object' && decoded !== null) {
      // Agora podemos ter certeza de que decoded é do tipo JwtPayload
      (req as Request & { user: JwtPayload }).user = decoded;
      next();
    } else {
      console.error('Token inválido');
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (err) {
    console.error('Erro ao verificar token', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Cadastro de usuário
app.post('/users/register', async (req: Request, res:Response): Promise<any> => {
  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    log.error('Erro ao cadastrar usuário');
    return res.status(400).json(validation.error.format());
  }
  const hashedPassword = await bcrypt.hash(validation.data.password, 10);
  await prisma.user.create({ data: { email: validation.data.email, password: hashedPassword } });
  log.success('Usuário cadastrado com sucesso');
  res.json({ message: 'User created successfully' });
});

// Login de usuário
app.post('/users/login', async (req: Request, res:Response): Promise<any> => {
  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    log.error('Erro ao fazer login');
    return res.status(400).json(validation.error.format());
  }
  const user = await prisma.user.findUnique({ where: { email: validation.data.email } });
  if (!user || !(await bcrypt.compare(validation.data.password, user.password))) {
    log.error('Credenciais inválidas');
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  log.success('Usuário autenticado com sucesso');
  res.json({ token });
});

// Criar cliente
app.post('/clients', authenticate, async (req: Request, res:Response): Promise<any> => {
  const validation = clientSchema.safeParse(req.body);
  if (!validation.success) {
    log.error('Erro ao cadastrar cliente');
    return res.status(400).json(validation.error.format());
  }
  const client = await prisma.client.create({ data: validation.data });
  log.success(`Cliente ${client.name} cadastrado com sucesso`);
  res.json(client);
});

// Listar clientes
app.get('/clients', authenticate, async (_req, res) => {
  const clients = await prisma.client.findMany();
  log.info('Listando clientes');
  res.json(clients);
});

// Criar serviço
app.post('/services', authenticate, async (req: Request, res:Response): Promise<any> => {
  const validation = serviceSchema.safeParse(req.body);
  if (!validation.success) {
    log.error('Erro ao cadastrar serviço');
    return res.status(400).json(validation.error.format());
  }
  const service = await prisma.service.create({ data: validation.data });
  log.success(`Serviço ${service.name} cadastrado com sucesso`);
  res.json(service);
});

// Listar serviços
app.get('/services', authenticate, async (_req, res) => {
  const services = await prisma.service.findMany();
  log.info('Listando serviços');
  res.json(services);
});

// Criar ordem de serviço
app.post('/orders', authenticate, async (req: Request, res: Response): Promise<any> => {
  const validation = orderSchema.safeParse(req.body);
  if (!validation.success) {
    log.error('Erro ao criar ordem de serviço');
    return res.status(400).json(validation.error.format());
  }
  const order = await prisma.order.create({ data: validation.data });
  log.success(`Ordem de serviço ${order.id} criada com sucesso`);
  res.json(order);
});

// Relatórios
app.get('/reports/orders', authenticate, async (_req, res) => {
  const orders = await prisma.order.groupBy({
    by: ['status'],
    _count: { id: true }
  });
  log.info('Gerando relatório de ordens de serviço');
  res.json(orders);
});

app.get('/reports/financial', authenticate, async (_req, res) => {
  const totalRevenue = await prisma.order.aggregate({
    _sum: { serviceId: true }
  });
  log.info('Gerando relatório financeiro');
  res.json({ totalRevenue: totalRevenue._sum.serviceId || 0 });
});

// Iniciar servidor
app.listen(3000, () => log.success('Servidor rodando na porta 3000'));