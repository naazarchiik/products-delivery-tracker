const express = require('express')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path')

const app = express()
const port = 4000

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
	console.log(`Swagger UI available at http://localhost:${port}/api-docs`)
})
