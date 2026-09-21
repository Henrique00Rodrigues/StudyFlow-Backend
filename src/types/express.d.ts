export {};

declare global {
  namespace Express {
    interface Request {
      //Estou ensinando ao Typescript que a propriedade 'user' dentro da interface Request pode existir.
      user?: {
        id: number;
      };
    }
  }
}
