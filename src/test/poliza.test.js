const sinon = require('sinon');
const { expect } = require('@jest/globals');
const prisma = require('../models/prismaClient');
const { getPolizas, createPoliza, updatePoliza, deletePoliza } = require('../controllers/poliza.controller');

describe('Poliza Controller', () => {
  let req, res, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = { body: {}, params: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getPolizas', () => {
    it('should return all polizas', async () => {
      const polizas = [{ id: 1, numeroDePoliza: 12345 }];
      sandbox.stub(prisma.poliza, 'findMany').resolves(polizas);

      await getPolizas(req, res);

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.calledWithExactly(200)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWithExactly(polizas)).toBe(true);
    });

    it('should handle errors', async () => {
      sandbox.stub(prisma.poliza, 'findMany').rejects(new Error('Error'));

      await getPolizas(req, res);

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.calledWithExactly(500)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWithExactly({ error: 'Error al obtener las pólizas' })).toBe(true);
    });
  });

  describe('createPoliza', () => {
    it('should create a new poliza', async () => {
      const poliza = { id: 1, numeroDePoliza: 12345, fechaInicio: '2023-01-01', fechaFin: '2023-12-31', clienteId: 1 };
      req.body = { numeroDePoliza: 12345, fechaInicio: '2023-01-01', fechaFin: '2023-12-31', clienteId: 1 };

      sandbox.stub(prisma.poliza, 'create').resolves(poliza);

      await createPoliza(req, res);

      expect(prisma.poliza.create.calledOnce).toBe(true);
      expect(prisma.poliza.create.calledWithExactly({
        data: {
          numeroDePoliza: 12345,
          fechaInicio: '2023-01-01',
          fechaFin: '2023-12-31',
          clienteId: 1,
        }
      })).toBe(true);
      expect(res.status.calledOnce).toBe(true);
      expect(res.status.calledWithExactly(201)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWithExactly(poliza)).toBe(true);
    });

    it('should handle errors', async () => {
      req.body = { numeroDePoliza: 12345, fechaInicio: '2023-01-01', fechaFin: '2023-12-31', clienteId: 1 };

      sandbox.stub(prisma.poliza, 'create').rejects(new Error('Error'));

      await createPoliza(req, res);

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.calledWithExactly(500)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWithExactly({ error: 'Error al crear la póliza' })).toBe(true);
    });
  });

  describe('updatePoliza', () => {
    it('should update a poliza', async () => {
      const poliza = { id: 1, numeroDePoliza: 12345, fechaInicio: '2023-01-01', fechaFin: '2023-12-31', clienteId: 1 };
      req.params.id = '1';
      req.body = { numeroDePoliza: 12345, fechaInicio: '2023-01-01', fechaFin: '2023-12-31', clienteId: 1 };

      sandbox.stub(prisma.poliza, 'update').resolves(poliza);

      await updatePoliza(req, res);

      expect(prisma.poliza.update.calledOnce).toBe(true);
      expect(prisma.poliza.update.calledWithExactly({
        where: { id: 1 },
        data: {
          numeroDePoliza: 12345,
          fechaInicio: '2023-01-01',
          fechaFin: '2023-12-31',
          clienteId: 1,
        }
      })).toBe(true);
      expect(res.status.calledOnce).toBe(true);
      expect(res.status.calledWithExactly(200)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWithExactly(poliza)).toBe(true);
    });

    it('should handle errors', async () => {
      req.params.id = '1';
      req.body = { numeroDePoliza: 12345, fechaInicio: '2023-01-01', fechaFin: '2023-12-31', clienteId: 1 };

      sandbox.stub(prisma.poliza, 'update').rejects(new Error('Error'));

      await updatePoliza(req, res);

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.calledWithExactly(500)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWithExactly({ error: 'Error al actualizar la póliza' })).toBe(true);
    });
  });

  describe('deletePoliza', () => {
    it('should delete a poliza', async () => {
      req.params.id = '1';

      sandbox.stub(prisma.poliza, 'delete').resolves();

      await deletePoliza(req, res);

      expect(prisma.poliza.delete.calledOnce).toBe(true);
      expect(prisma.poliza.delete.calledWithExactly({ where: { id: 1 } })).toBe(true);
      expect(res.status.calledOnce).toBe(true);
      expect(res.status.calledWithExactly(200)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWithExactly({ message: 'Póliza eliminada' })).toBe(true);
    });

    it('should handle errors', async () => {
      req.params.id = '1';

      sandbox.stub(prisma.poliza, 'delete').rejects(new Error('Error'));

      await deletePoliza(req, res);

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.calledWithExactly(500)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledWithExactly({ error: 'Error al eliminar la póliza' })).toBe(true);
    });
  });
});