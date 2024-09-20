const express = require('express');
const router = express.Router();
const agenteController = require('../controllers/agente.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Agente:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autoincremental del agente
 *         nombre:
 *           type: string
 *           description: Nombre del agente
 *         email:
 *           type: string
 *           description: Email del agente
 *         password:
 *           type: string
 *           description: Contraseña del agente (hasheada)
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Obtener todos los agentes
 *     tags: [Agente]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agente'
 */
router.get('/', authenticateToken, agenteController.getAgentes);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Crear un nuevo agente
 *     tags: [Agente]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       201:
 *         description: Agente creado exitosamente
 */
router.post('/', authenticateToken, agenteController.createAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Actualizar un agente existente
 *     tags: [Agente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente actualizado exitosamente
 */
router.put('/:id', authenticateToken, agenteController.updateAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Eliminar un agente
 *     tags: [Agente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del agente a eliminar
 *     responses:
 *       200:
 *         description: Agente eliminado exitosamente
 */
router.delete('/:id', authenticateToken, agenteController.deleteAgente);

module.exports = router;
