import {Router} from "express";
import { contendorDeProductos } from "./contenedordeProductos";
import {randomUUID as generarId} from "crypto"

export const routerProductos = Router();
routerProductos.post("/", async (req, res)=>{
    const nuevoProducto = req.body
    nuevoProducto.id = generarId()
    await contendorDeProductos.guardar(nuevoProducto)
    res.json(nuevoProducto);
});
routerProductos.get("/", async (req, res)=>{
    res.json(await contendorDeProductos.recuperar());
})
