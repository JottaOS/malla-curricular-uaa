CREATE TABLE facultad (
    id SERIAL PRIMARY KEY,              -- Identificador único de la facultad
    nombre VARCHAR(100) NOT NULL,       -- Nombre de la facultad
    descripcion TEXT,                   -- Descripción opcional de la facultad
    siglas VARCHAR(10) NOT NULL UNIQUE  -- Código único de la facultad (por ejemplo, "FAC001")
);

-- Agregar comentarios a las columnas
COMMENT ON COLUMN facultad.id IS 'Identificador único de la facultad';
COMMENT ON COLUMN facultad.nombre IS 'Nombre completo de la facultad';
COMMENT ON COLUMN facultad.descripcion IS 'Descripción de la facultad';
COMMENT ON COLUMN facultad.siglas IS 'Siglas de la facultad';

-- Insertar un ejemplo de datos en la tabla
INSERT INTO facultad (nombre, descripcion, siglas)
VALUES ('Facultad de Ciencias y Tecnología', 'Descripción de la facultad', 'FACYT');

INSERT INTO facultad (nombre, descripcion, siglas)
VALUES ('Facultad de Ciencias Económicas y Empresariales', 'Descripción de la facultad de Ciencias Económicas y Empresariales', 'FACEYEz');


CREATE TABLE materia (
    id SERIAL PRIMARY KEY,                 -- Identificador único de la materia
    codigo VARCHAR(10) NOT NULL UNIQUE,    -- Código único de la materia (por ejemplo, "INFO-110")
    nombre VARCHAR(100) NOT NULL,          -- Nombre completo de la materia
    creditos_presenciales INT NOT NULL,    -- Créditos de horas presenciales de la materia
    creditos_practicas INT NOT NULL,       -- Créditos de horas de prácticas asistidas de la materia
    facultad_id INT NOT NULL,              -- ID de la facultad a la que pertenece la materia
    CONSTRAINT fk_facultad 
        FOREIGN KEY (facultad_id) 
        REFERENCES facultad (id)           -- Relación con la tabla facultad
);

-- Agregar comentarios a las columnas
COMMENT ON COLUMN materia.id IS 'Identificador único de la materia';
COMMENT ON COLUMN materia.codigo IS 'Código único de la materia (por ejemplo, "INFO-110")';
COMMENT ON COLUMN materia.nombre IS 'Nombre completo de la materia';
COMMENT ON COLUMN materia.creditos_presenciales IS 'Número de créditos de horas presenciales de la materia';
COMMENT ON COLUMN materia.creditos_practicas IS 'Número de créditos de horas de prácticas asistidas de la materia';
COMMENT ON COLUMN materia.facultad_id IS 'Identificador de la facultad a la que pertenece la materia';


-- Agregar estado a facultad
ALTER TABLE facultad 
ADD COLUMN estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO';
COMMENT ON COLUMN facultad.estado IS 'Estado actual de la facultad (ACTIVO | INACTIVO)';

-- Agregar estado a materia 
ALTER TABLE materia 
ADD COLUMN estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO';
COMMENT ON COLUMN materia.estado IS 'Estado actual de la materia (ACTIVO | INACTIVO)'; 