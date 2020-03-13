CREATE DATABASE usuarios;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nombre  VARCHAR(40) ,
    correo VARCHAR(40),
    edad INTEGER,
    direccion VARCHAR(40)
);

INSERT INTO usuarios (nombre, correo, edad, direccion)
    VALUES ('Deyvid', 'deyvid44@hotmail.com','24','Cra 53');