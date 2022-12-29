import express from 'express'
import { faker } from '@faker-js/faker'
faker.locale = 'es'

let id = 1
function getNextId() {
    return id++
}

function crearCombinacionAlAzar(id) {
    return {
        id,
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        descripcion: faker.commerce.productDescription(),
        img: faker.image.abstract()
    }
}

function generarNProductos(cant) {
    const productos = []
    for (let i = 0; i < cant; i++) {
        productos.push(crearCombinacionAlAzar(getNextId()))
    }
    return productos
}

const CANT_PROD_DEFAULT = 5

const app = express()

app.get('/api/productos-test', (req, res) => {
    const cant = Number(req.query.cant) || CANT_PROD_DEFAULT
    res.json(generarNProductos(cant))
})

const PORT = 8080
const srv = app.listen(PORT, () => {
    console.log(`Servidor Http Mocking escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))