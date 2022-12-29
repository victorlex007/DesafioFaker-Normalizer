import { normalize, denormalize, schema } from "normalizr"

const message = {
  id: "1",
  titulo: "My blog post",
  descripcion: "Short blogpost description",
  contenido: "Hello world",
  author: {
    email: "1",
    nombre: "usuario",
    apellido:"apellido de usuario",
    edad: "edad de usuario",
    alias: "alias del usuario"
  },
  texto: "mensaje del usuario"
}

// Definimos un esquema de usuarios (autores y comentadores)
const authorSchema = new schema.Entity('authors')

// Definimos un esquema de comentadores
const commentSchema = new schema.Entity('comments')

// Definimos un esquema de artículos
const postSchema = new schema.Entity('posts', {
  author: authorSchema,
  comments: [commentSchema]
});


/* ---------------------------------------------------------------------------------------- */
import util from 'util'

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}

console.log(' ------------- OBJETO ORIGINAL --------------- ')
print(message)
console.log(JSON.stringify(message).length)


console.log(' ------------- OBJETO NORMALIZADO --------------- ')
const normalizedMessage = normalize(message, postSchema);
print(normalizedMessage)
console.log(JSON.stringify(normalizedMessage).length)

console.log(' ------------- OBJETO DENORMALIZADO --------------- ')
const denormalizedMessage = denormalize(normalizedMessage.result, postSchema, normalizedMessage.entities);
print(denormalizedMessage)
console.log(JSON.stringify(denormalizedMessage).length)

