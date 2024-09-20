const sinon = require('sinon');
const { getClientes, createCliente, updateCliente, deleteCliente } = require('../controllers/cliente.controller');
const prisma = require('../models/prismaClient');

describe('Cliente Controller', () => {
  let req, res, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  // Tests para getClientes
  describe('getClientes', () => {
    it('debería devolver la lista de clientes con su agente asociado con status 200', async () => {
      const mockClientes = [
        { id: 1, nombre: 'Juan', telefono: '123456789', email: 'juan@example.com', agenteId: 1, agente: { id: 1, nombre: 'Agente 1', email: 'agente1@example.com' } },
        { id: 2, nombre: 'Maria', telefono: '987654321', email: 'maria@example.com', agenteId: 2, agente: { id: 2, nombre: 'Agente 2', email: 'agente2@example.com' } }
      ];
      sandbox.stub(prisma.cliente, 'findMany').resolves(mockClientes);

      await getClientes(req, res);

      sinon.assert.calledOnceWithExactly(res.status, 200);
      sinon.assert.calledOnceWithExactly(res.json, mockClientes);
    });

    it('debería devolver un error con status 500 si falla', async () => {
      sandbox.stub(prisma.cliente, 'findMany').rejects(new Error('Error en DB'));

      await getClientes(req, res);

      sinon.assert.calledOnceWithExactly(res.status, 500);
      sinon.assert.calledOnceWithExactly(res.json, { error: 'Error al obtener los clientes' });
    });
  });

  // Tests para createCliente
  describe('createCliente', () => {
    it('debería crear un cliente con su agente y devolver status 201', async () => {
      req.body = { nombre: 'Juan', telefono: '123456789', email: 'juan@example.com', agenteId: 1 };
      const mockCliente = { id: 1, ...req.body };
      sandbox.stub(prisma.cliente, 'create').resolves(mockCliente);

      await createCliente(req, res);

      sinon.assert.calledOnceWithExactly(res.status, 201);
      sinon.assert.calledOnceWithExactly(res.json, mockCliente);
    });

    it('debería devolver un error con status 500 si falla', async () => {
      sandbox.stub(prisma.cliente, 'create').rejects(new Error('Error en DB'));

      await createCliente(req, res);

      sinon.assert.calledOnceWithExactly(res.status, 500);
      sinon.assert.calledOnceWithExactly(res.json, { error: 'Error al crear el cliente' });
    });
  });

  // Tests para updateCliente
  describe('updateCliente', () => {
    it('debería actualizar un cliente con su agente asociado y devolver status 200', async () => {
      req.params = { id: 1 };
      req.body = { nombre: 'Juan Actualizado', telefono: '987654321', email: 'juannew@example.com', agenteId: 2 };
      const mockCliente = { id: 1, ...req.body };
      sandbox.stub(prisma.cliente, 'update').resolves(mockCliente);

      await updateCliente(req, res);

      sinon.assert.calledOnceWithExactly(res.status, 200);
      sinon.assert.calledOnceWithExactly(res.json, mockCliente);
    });

    it('debería devolver un error con status 500 si falla', async () => {
      sandbox.stub(prisma.cliente, 'update').rejects(new Error('Error en DB'));

      await updateCliente(req, res);

      sinon.assert.calledOnceWithExactly(res.status, 500);
      sinon.assert.calledOnceWithExactly(res.json, { error: 'Error al actualizar el cliente' });
    });
  });

  // Tests para deleteCliente
  describe('deleteCliente', () => {
    it('debería eliminar un cliente y devolver status 200', async () => {
      req.params = { id: 1 };
      sandbox.stub(prisma.cliente, 'delete').resolves();

      await deleteCliente(req, res);

      sinon.assert.calledOnceWithExactly(res.status, 200);
      sinon.assert.calledOnceWithExactly(res.json, { message: 'Cliente eliminado' });
    });

    it('debería devolver un error con status 500 si falla', async () => {
      sandbox.stub(prisma.cliente, 'delete').rejects(new Error('Error en DB'));

      await deleteCliente(req, res);

      sinon.assert.calledOnceWithExactly(res.status, 500);
      sinon.assert.calledOnceWithExactly(res.json, { error: 'Error al eliminar el cliente' });
    });
  });
});
