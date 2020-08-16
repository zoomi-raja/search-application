const express = require("express");

const searchController = require("./controllers/searchController");
const entityController = require("./controllers/entityController");
const clearCacheController = require("./controllers/clearCacheController");

const router = express.Router();
/**
 * @swagger
 *
 * /api/search:
 *   post:
 *     tags:
 *       - Search
 *     description: Fetch results from [GIT API](https://developer.github.com/v3/search/) amd save in cache
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: body
 *         description: text and entity fields are required to search for text against any particular entity of GIT.
 *         in: body
 *         required: true
 *         schema:
 *            type: object
 *            required:
 *              - text
 *              - entity
 *              - page
 *            properties:
 *              text:
 *                type: string
 *                example: javascript
 *              entity:
 *                type: string
 *                example: users
 *              page:
 *                type: number
 *                example: 1
 *         examples:
 *            '0':
 *               value: |-
 *                {
 *                    "text":"javasript",
 *                    "entity":"users"
 *                }
 *
 *     responses:
 *       200:
 *         description: Search results from Git
 *         schema:
 *           example:
 *             {
 *               "status": "success",
 *               "results": 1,
 *               "data": {
 *                 "entity": "users",
 *                 "result": [
 *                   {
 *                     "login": "AmyDayday",
 *                     "id": 4569236,
 *                     "avatar_url": "https://avatars3.githubusercontent.com/u/4569236?v=4",
 *                     "html_url": "https://github.com/AmyDayday",
 *                      "type": "User"
 *                    },
 *                  ]
 *                }
 *              }
 *       422:
 *         description: "Invalid input"
 */
router.route("/search").post(searchController);
/**
 * @swagger
 *
 * /api/entities:
 *   get:
 *     tags:
 *       - Entity
 *     description: Get Available entites in system, consumer can search from
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     responses:
 *       200:
 *         description: available Git entities
 *         schema:
 *           example:
 *              {
 *                 "status": "success",
 *                 "results": 3,
 *                 "data": [
 *                   "users",
 *                   "issues",
 *                   "repositories"
 *                 ]
 *               }
 *       500:
 *         description: "Internal server error"
 */
router.route("/entities").get(entityController);
/**
 * @swagger
 *
 * /api/clear-cache:
 *   delete:
 *     tags:
 *       - Cache
 *     description: Note ! this route should not be public. API to flush the entire cache
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     responses:
 *       200:
 *         description: System cache is flushed
 *         schema:
 *           example:
 *               {
 *                 "status": "success"
 *               }
 *       500:
 *         description: "Invalid cache server"
 */
router.route("/clear-cache").delete(clearCacheController);

module.exports = router;
