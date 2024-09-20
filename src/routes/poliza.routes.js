const express = require('express');
const router = express.Router();
const polizaController = require('../controllers/poliza.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Asegurado:
 *       type: object
 *       required:
 *         - nombre
 *         - edad
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del asegurado
 *         edad:
 *           type: integer
 *           description: Edad del asegurado
 *
 *     Poliza:
 *       type: object
 *       required:
 *         - fechaInicio
 *         - fechaVigencia
 *         - aseguradora
 *         - tipoPoliza
 *         - precio
 *         - estado
 *         - clienteId
 *         - asegurados
 *       properties:
 *         numeroDePoliza:
 *           type: integer
 *           description: ID autoincremental de la póliza
 *         fechaInicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la póliza
 *         fechaVigencia:
 *           type: string
 *           format: date
 *           description: Fecha de vencimiento de la póliza
 *         aseguradora:
 *           type: string
 *           description: Nombre de la aseguradora
 *         tipoPoliza:
 *           type: string
 *           description: Tipo de póliza (GASTOS_MEDICOS, AUTO, SEGURO_DE_VIDA)
 *         precio:
 *           type: number
 *           description: Precio de la póliza
 *         estado:
 *           type: string
 *           description: Estado de la póliza (VIGENTE, VENCIDA)
 *         clienteId:
 *           type: integer
 *           description: ID del cliente asociado
 *         asegurados:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Asegurado'
 *           description: Lista de asegurados relacionados con la póliza
 */

/**
 * @swagger
 * /polizas:
 *   get:
 *     summary: Obtener todas las pólizas
 *     tags: [Poliza]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pólizas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poliza'
 */
router.get('/', authenticateToken, polizaController.getPolizas);

/**
 * @swagger
 * /polizas/gastos-medicos-vencidas:
 *   get:
 *     summary: Obtener pólizas GASTOS MÉDICOS vencidas antes del 15 de Febrero de 2021
 *     tags: [Poliza]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pólizas GASTOS MÉDICOS vencidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poliza'
 */
router.get('/gastos-medicos-vencidas', authenticateToken, polizaController.getPolizasGastosMedicosVencidas);

/**
 * @swagger
 * /polizas/por-estado:
 *   get:
 *     summary: Obtener pólizas por estado y fecha de vigencia
 *     tags: [Poliza]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         required: true
 *         description: Estado de la póliza (VIGENTE o VENCIDA)
 *         schema:
 *           type: string
 *       - in: query
 *         name: fecha
 *         required: true
 *         description: Fecha límite de vigencia (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de pólizas filtradas por estado y fecha
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poliza'
 */
router.get('/por-estado', authenticateToken, polizaController.getPolizasPorEstadoYFecha);

/**
 * @swagger
 * /polizas:
 *   post:
 *     summary: Crear una nueva póliza
 *     tags: [Poliza]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la póliza
 *               fechaVigencia:
 *                 type: string
 *                 format: date
 *                 description: Fecha de vencimiento de la póliza
 *               aseguradora:
 *                 type: string
 *                 description: Nombre de la aseguradora
 *               tipoPoliza:
 *                 type: string
 *                 description: Tipo de póliza (GASTOS_MEDICOS, AUTO, SEGURO_DE_VIDA)
 *               precio:
 *                 type: number
 *                 description: Precio de la póliza
 *               estado:
 *                 type: string
 *                 description: Estado de la póliza (VIGENTE, VENCIDA)
 *               clienteId:
 *                 type: integer
 *                 description: ID del cliente asociado
 *               agenteId:
 *                 type: integer
 *                 description: ID del agente asociado
 *               asegurados:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Asegurado'
 *                 description: Lista de asegurados relacionados con la póliza
 *     responses:
 *       201:
 *         description: Póliza creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poliza'
 */
router.post('/', authenticateToken, polizaController.createPoliza);

/**
 * @swagger
 * /polizas/{numeroDePoliza}:
 *   put:
 *     summary: Actualizar una póliza existente
 *     tags: [Poliza]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroDePoliza
 *         required: true
 *         description: ID de la póliza a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la póliza
 *               fechaVigencia:
 *                 type: string
 *                 format: date
 *                 description: Fecha de vencimiento de la póliza
 *               aseguradora:
 *                 type: string
 *                 description: Nombre de la aseguradora
 *               tipoPoliza:
 *                 type: string
 *                 description: Tipo de póliza (GASTOS_MEDICOS, AUTO, SEGURO_DE_VIDA)
 *               precio:
 *                 type: number
 *                 description: Precio de la póliza
 *               estado:
 *                 type: string
 *                 description: Estado de la póliza (VIGENTE, VENCIDA)
 *               clienteId:
 *                 type: integer
 *                 description: ID del cliente asociado
 *               agenteId:
 *                 type: integer
 *                 description: ID del agente asociado
 *               asegurados:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Asegurado'
 *                 description: Lista de asegurados relacionados con la póliza
 *     responses:
 *       200:
 *         description: Póliza actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poliza'
 */
router.put('/:numeroDePoliza', authenticateToken, polizaController.updatePoliza);

/**
 * @swagger
 * /polizas/{numeroDePoliza}:
 *   delete:
 *     summary: Eliminar una póliza
 *     tags: [Poliza]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroDePoliza
 *         required: true
 *         description: ID de la póliza a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Póliza eliminada exitosamente
 *       404:
 *         description: Póliza no encontrada
 */
router.delete('/:numeroDePoliza', authenticateToken, polizaController.deletePoliza);

module.exports = router;

