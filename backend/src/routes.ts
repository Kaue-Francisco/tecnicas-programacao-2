import { Router, Request, Response } from 'express';
import ClienteTitularController from './controllers/cliente/clienteTitularController';
import AcomodacaoController from './controllers/acomodacao/acomodacaoController';

const router = Router();
const clienteTitularController = new ClienteTitularController();
const acomodacaoController = new AcomodacaoController();

router.post('/cadastro-cliente-titular', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.cadastro(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.post('/cadastro-cliente-dependente', async (req: Request, res: Response) => {
    try {
        await clienteTitularController.cadastroDependente(req, res);
    } catch (error) {
        if (!res.headersSent) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: errorMessage });
        }
    }
});

router.delete('/deletar-cliente-titular', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.deletar(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.get('/clientes-titulares', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.todosClienteTitulares(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.post('/dependentes-do-titular', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.todosDependeteDoTitular(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.get('/todos-dependentes', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.buscarTodosDependentes(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.post('/buscar-titular-dependente', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.buscarTitularDependente(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.post('/realizar-hospedagem', async (req: Request, res: Response) => {
  try {
    await acomodacaoController.realizarHospedagem(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.delete('/deletar-dependente', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.deletarDependente(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.post('/buscar-titular', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.buscar(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.put('/editar-titular', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.editarTitular(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.put('/editar-dependente', async (req: Request, res: Response) => {
  try {
    await clienteTitularController.editarDependente(req, res);
  } catch (error) {
    if (!res.headersSent) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
});

export default router;