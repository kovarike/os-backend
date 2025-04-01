// import { PrismaClient } from '@prisma/client';
// import readlineSync from 'readline-sync';
// import axios, { AxiosError } from 'axios';
// import chalk from 'chalk';

// const prisma = new PrismaClient();
// const API_URL = 'http://localhost:3000';  // URL do seu backend Express

// // Função para exibir feedback visual
// const log = {
//   success: (message: string) => console.log(chalk.green(`[SUCESSO] ${message}`)),
//   error: (message: string) => console.log(chalk.red(`[ERRO] ${message}`)),
//   warning: (message: string) => console.log(chalk.yellow(`[AVISO] ${message}`)),
//   info: (message: string) => console.log(chalk.blue(`[INFO] ${message}`)),
// };

// // Função para cadastrar cliente via API
// async function createClient() {
//   const name = readlineSync.question('Digite o nome do cliente: ');
//   const email = readlineSync.question('Digite o e-mail do cliente: ');
//   const phone = readlineSync.question('Digite o telefone do cliente (opcional): ', { defaultInput: '' });

//   const clientData = { name, email, phone: phone || undefined };

//   try {
//     const response = await axios.post(`${API_URL}/clients`, clientData);
//     log.success(`Cliente ${response.data.name} criado com sucesso`);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       log.error(`Erro ao criar cliente: ${error.response?.data?.error || error.message}`);
//     } else {
//       log.error('Erro desconhecido ao criar cliente.');
//     }
//   }
// }

// // Função para cadastrar serviço via API
// async function createService() {
//   const name = readlineSync.question('Digite o nome do serviço: ');
//   const price = readlineSync.questionFloat('Digite o preço do serviço: ');

//   const serviceData = { name, price };

//   try {
//     const response = await axios.post(`${API_URL}/services`, serviceData);
//     log.success(`Serviço ${response.data.name} criado com sucesso`);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       log.error(`Erro ao criar serviço: ${error.response?.data?.error || error.message}`);
//     } else {
//       log.error('Erro desconhecido ao criar serviço.');
//     }
//   }
// }

// // Função para criar ordem de serviço via API
// async function createOrder() {
//   const clientId = readlineSync.questionInt('Digite o ID do cliente: ');
//   const serviceId = readlineSync.questionInt('Digite o ID do serviço: ');
//   const status = readlineSync.question('Digite o status da ordem (OPEN, PENDING, EXECUTED, REJECTED): ');

//   const orderData = { clientId, serviceId, status };

//   try {
//     const response = await axios.post(`${API_URL}/orders`, orderData);
//     log.success(`Ordem de serviço ${response.data.id} criada com sucesso`);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       log.error(`Erro ao criar ordem de serviço: ${error.response?.data?.error || error.message}`);
//     } else {
//       log.error('Erro desconhecido ao criar ordem de serviço.');
//     }
//   }
// }

// // Função para exibir o menu de opções
// async function showMenu() {
//   console.log('\nMenu:');
//   console.log('1. Cadastrar Cliente');
//   console.log('2. Cadastrar Serviço');
//   console.log('3. Criar Ordem de Serviço');
//   console.log('4. Sair');
  
//   const option = readlineSync.questionInt('Escolha uma opção: ');

//   switch (option) {
//     case 1:
//       await createClient();
//       break;
//     case 2:
//       await createService();
//       break;
//     case 3:
//       await createOrder();
//       break;
//     case 4:
//       log.info('Saindo...');
//       process.exit();
//       break;
//     default:
//       log.warning('Opção inválida.');
//   }
//   await showMenu();
// }

// async function run() {
//   await showMenu();
// }

// run().finally(async () => {
//   await prisma.$disconnect();
// });

// import { PrismaClient } from '@prisma/client';
// import readlineSync from 'readline-sync';
// import axios, { AxiosError } from 'axios';
// import chalk from 'chalk';

// const prisma = new PrismaClient();
// const API_URL = 'http://localhost:3000';  // URL do seu backend Express
// const token = 'supersecretkey';  // Substitua pelo seu token de autenticação

// // Função para exibir feedback visual
// const log = {
//   success: (message: string) => console.log(chalk.green(`[SUCESSO] ${message}`)),
//   error: (message: string) => console.log(chalk.red(`[ERRO] ${message}`)),
//   warning: (message: string) => console.log(chalk.yellow(`[AVISO] ${message}`)),
//   info: (message: string) => console.log(chalk.blue(`[INFO] ${message}`)),
// };

// // Função para cadastrar cliente via API
// async function createClient() {
//   const name = readlineSync.question('Digite o nome do cliente: ');
//   const email = readlineSync.question('Digite o e-mail do cliente: ');
//   const phone = readlineSync.question('Digite o telefone do cliente (opcional): ', { defaultInput: '' });

//   const clientData = { name, email, phone: phone || undefined };

//   try {
//     const response = await axios.post(`${API_URL}/clients`, clientData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     log.success(`Cliente ${response.data.name} criado com sucesso`);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       log.error(`Erro ao criar cliente: ${error.response?.data?.error || error.message}`);
//     } else {
//       log.error('Erro desconhecido ao criar cliente.');
//     }
//   }
// }

// // Função para cadastrar serviço via API
// async function createService() {
//   const name = readlineSync.question('Digite o nome do serviço: ');
//   const price = readlineSync.questionFloat('Digite o preço do serviço: ');

//   const serviceData = { name, price };

//   try {
//     const response = await axios.post(`${API_URL}/services`, serviceData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     log.success(`Serviço ${response.data.name} criado com sucesso`);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       log.error(`Erro ao criar serviço: ${error.response?.data?.error || error.message}`);
//     } else {
//       log.error('Erro desconhecido ao criar serviço.');
//     }
//   }
// }

// // Função para criar ordem de serviço via API
// async function createOrder() {
//   const clientId = readlineSync.questionInt('Digite o ID do cliente: ');
//   const serviceId = readlineSync.questionInt('Digite o ID do serviço: ');
//   const status = readlineSync.question('Digite o status da ordem (OPEN, PENDING, EXECUTED, REJECTED): ');

//   const orderData = { clientId, serviceId, status };

//   try {
//     const response = await axios.post(`${API_URL}/orders`, orderData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     log.success(`Ordem de serviço ${response.data.id} criada com sucesso`);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       log.error(`Erro ao criar ordem de serviço: ${error.response?.data?.error || error.message}`);
//     } else {
//       log.error('Erro desconhecido ao criar ordem de serviço.');
//     }
//   }
// }

// // Função para exibir o menu de opções
// async function showMenu() {
//   console.log('\nMenu:');
//   console.log('1. Cadastrar Cliente');
//   console.log('2. Cadastrar Serviço');
//   console.log('3. Criar Ordem de Serviço');
//   console.log('4. Sair');
  
//   const option = readlineSync.questionInt('Escolha uma opção: ');

//   switch (option) {
//     case 1:
//       await createClient();
//       break;
//     case 2:
//       await createService();
//       break;
//     case 3:
//       await createOrder();
//       break;
//     case 4:
//       log.info('Saindo...');
//       process.exit();
//       break;
//     default:
//       log.warning('Opção inválida.');
//   }
//   await showMenu();
// }

// async function run() {
//   await showMenu();
// }

// run().finally(async () => {
//   await prisma.$disconnect();
// });


import { PrismaClient } from '@prisma/client';
import readlineSync from 'readline-sync';
import axios, { AxiosError } from 'axios';
import chalk from 'chalk';

const prisma = new PrismaClient();
const API_URL = 'http://localhost:3000';  // URL do seu backend Express

let token = '';  // Variável para armazenar o token

// Função para exibir feedback visual
const log = {
  success: (message: string) => console.log(chalk.green(`[SUCESSO] ${message}`)),
  error: (message: string) => console.log(chalk.red(`[ERRO] ${message}`)),
  warning: (message: string) => console.log(chalk.yellow(`[AVISO] ${message}`)),
  info: (message: string) => console.log(chalk.blue(`[INFO] ${message}`)),
};

// Função para fazer login e obter o token
async function login() {
  const email = readlineSync.question('Digite o e-mail: ');
  const password = readlineSync.question('Digite a senha: ', { hideEchoBack: true });

  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    token = response.data.token;  // Armazena o token
    log.success('Login realizado com sucesso!');
  } catch (error) {
    if (error instanceof AxiosError) {
      log.error(`Erro ao fazer login: ${error.response?.data?.error || error.message}`);
    } else {
      log.error('Erro desconhecido ao fazer login.');
    }
  }
}

// Função para cadastrar cliente via API
async function createClient() {
  const name = readlineSync.question('Digite o nome do cliente: ');
  const email = readlineSync.question('Digite o e-mail do cliente: ');
  const phone = readlineSync.question('Digite o telefone do cliente (opcional): ', { defaultInput: '' });

  const clientData = { name, email, phone: phone || undefined };

  try {
    const response = await axios.post(`${API_URL}/clients`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    log.success(`Cliente ${response.data.name} criado com sucesso`);
  } catch (error) {
    if (error instanceof AxiosError) {
      log.error(`Erro ao criar cliente: ${error.response?.data?.error || error.message}`);
    } else {
      log.error('Erro desconhecido ao criar cliente.');
    }
  }
}

// Função para cadastrar serviço via API
async function createService() {
  const name = readlineSync.question('Digite o nome do serviço: ');
  const price = readlineSync.questionFloat('Digite o preço do serviço: ');

  const serviceData = { name, price };

  try {
    const response = await axios.post(`${API_URL}/services`, serviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    log.success(`Serviço ${response.data.name} criado com sucesso`);
  } catch (error) {
    if (error instanceof AxiosError) {
      log.error(`Erro ao criar serviço: ${error.response?.data?.error || error.message}`);
    } else {
      log.error('Erro desconhecido ao criar serviço.');
    }
  }
}

// Função para criar ordem de serviço via API
async function createOrder() {
  const clientId = readlineSync.questionInt('Digite o ID do cliente: ');
  const serviceId = readlineSync.questionInt('Digite o ID do serviço: ');
  const status = readlineSync.question('Digite o status da ordem (OPEN, PENDING, EXECUTED, REJECTED): ');

  const orderData = { clientId, serviceId, status };

  try {
    const response = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    log.success(`Ordem de serviço ${response.data.id} criada com sucesso`);
  } catch (error) {
    if (error instanceof AxiosError) {
      log.error(`Erro ao criar ordem de serviço: ${error.response?.data?.error || error.message}`);
    } else {
      log.error('Erro desconhecido ao criar ordem de serviço.');
    }
  }
}

// Função para exibir o menu de opções
async function showMenu() {
  console.log('\nMenu:');
  console.log('1. Login');
  console.log('2. Cadastrar Cliente');
  console.log('3. Cadastrar Serviço');
  console.log('4. Criar Ordem de Serviço');
  console.log('5. Sair');
  
  const option = readlineSync.questionInt('Escolha uma opção: ');

  switch (option) {
    case 1:
      await login();
      break;
    case 2:
      await createClient();
      break;
    case 3:
      await createService();
      break;
    case 4:
      await createOrder();
      break;
    case 5:
      log.info('Saindo...');
      process.exit();
      break;
    default:
      log.warning('Opção inválida.');
  }
  await showMenu();
}

async function run() {
  await showMenu();
}

run().finally(async () => {
  await prisma.$disconnect();
});
