const sinon = require('sinon');
const { expect } = require('@jest/globals');
const prisma = require('../models/prismaClient');
const bcrypt = require('bcrypt');
const { getAgentes, createAgente, updateAgente, deleteAgente } = require('../controllers/agente.controller');

describe('Agente Controller', () => {
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

  describe('getAgentes', () => {
    it('should return all agentes', async () => {
      const agentes = [{ id: 1, nombre: 'Agente 1' }];
      sandbox.stub(prisma.agente, 'findMany').resolves(agentes);

      await getAgentes(req, res);

      expect(res.status.calledOnceWithExactly(200)).toBe(true);
      expect(res.json.calledOnceWithExactly(agentes)).toBe(true);
    });

    it('should handle errors', async () => {
      sandbox.stub(prisma.agente, 'findMany').rejects(new Error('Error'));

      await getAgentes(req, res);

      expect(res.status.calledOnceWithExactly(500)).toBe(true);
      expect(res.json.calledOnce).toBe(true);
      expect(res.json.calledOnceWithExactly({ error: 'Error al obtener los agentes' })).toBe(true);
    });
  });

  describe('createAgente', () => {
    it('should create a new agente', async () => {
      const agente = { id: 1, nombre: 'Agente 1', email: 'agente1@example.com', password: 'hashedPassword' };
      req.body = { nombre: 'Agente 1', email: 'agente1@example.com', password: 'password' };

      sandbox.stub(prisma.agente, 'create').resolves(agente);
      sandbox.stub(bcrypt, 'hash').resolves('hashedPassword');

      await createAgente(req, res);

      expect(prisma.agente.create.calledOnce).toBe(true);
      expect(prisma.agente.create.calledWithExactly({
        data: {
          nombre: 'Agente 1',
          email: 'agente1@example.com',
          password: 'hashedPassword',
        }
      })).toBe(true);
      expect(res.status.calledOnceWithExactly(201)).toBe(true);
      expect(res.json.calledOnceWithExactly(agente)).toBe(true);
    });

    it('should handle errors', async () => {
      req.body = { nombre: 'Agente 1', email: 'agente1@example.com', password: 'password' };

      sandbox.stub(prisma.agente, 'create').rejects(new Error('Error'));
      sandbox.stub(bcrypt, 'hash').resolves('hashedPassword');

      await createAgente(req, res);

      expect(res.status.calledOnceWithExactly(500)).toBe(true);
      expect(res.json.calledOnceWithExactly({ error: 'Error al crear el agente' })).toBe(true);
    });
  });

  describe('updateAgente', () => {
    it('should update an agente', async () => {
      const agente = { id: 1, nombre: 'Agente 1', email: 'agente1@example.com', password: 'hashedPassword' };
      req.params.id = '1';
      req.body = { nombre: 'Agente 1', email: 'agente1@example.com', password: 'password' };

      sandbox.stub(prisma.agente, 'update').resolves(agente);
      sandbox.stub(bcrypt, 'hash').resolves('hashedPassword');

      await updateAgente(req, res);

      expect(prisma.agente.update.calledOnceWithExactly({
        where: { id: 1 },
        data: {
          nombre: 'Agente 1',
          email: 'agente1@example.com',
          password: 'hashedPassword',
        }
      })).toBe(true);
      expect(res.status.calledOnceWithExactly(200)).toBe(true);
      expect(res.json.calledOnceWithExactly(agente)).toBe(true);
    });

    it('should handle errors', async () => {
      req.params.id = '1';
      req.body = { nombre: 'Agente 1', email: 'agente1@example.com', password: 'password' };

      sandbox.stub(prisma.agente, 'update').rejects(new Error('Error'));
      sandbox.stub(bcrypt, 'hash').resolves('hashedPassword');

      await updateAgente(req, res);

      expect(res.status.calledOnceWithExactly(500)).toBe(true);
      expect(res.json.calledOnceWithExactly({ error: 'Error al actualizar el agente' })).toBe(true);
    });
  });

  describe('deleteAgente', () => {
    it('should delete an agente', async () => {
      req.params.id = '1';

      sandbox.stub(prisma.agente, 'delete').resolves();

      await deleteAgente(req, res);

      expect(prisma.agente.delete.calledOnceWithExactly({ where: { id: 1 } })).toBe(true);
      expect(res.status.calledOnceWithExactly(200)).toBe(true);
      expect(res.json.calledOnceWithExactly({ message: 'Agente eliminado' })).toBe(true);
    });

    it('should handle errors', async () => {
      req.params.id = '1';

      sandbox.stub(prisma.agente, 'delete').rejects(new Error('Error'));

      await deleteAgente(req, res);

      expect(res.status.calledOnceWithExactly(500)).toBe(true);
      expect(res.json.calledOnceWithExactly({ error: 'Error al eliminar el agente' })).toBe(true);
    });
  });
});