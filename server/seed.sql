CREATE TABLE facultad (
    id SERIAL PRIMARY KEY,              -- Identificador único de la facultad
    nombre VARCHAR(100) NOT NULL,       -- Nombre de la facultad
    siglas VARCHAR(10) NOT NULL UNIQUE  -- Código único de la facultad (por ejemplo, "FAC001")
);

-- Agregar comentarios a las columnas
COMMENT ON COLUMN facultad.id IS 'Identificador único de la facultad';
COMMENT ON COLUMN facultad.nombre IS 'Nombre completo de la facultad';
COMMENT ON COLUMN facultad.siglas IS 'Siglas de la facultad';

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


-- acreditaciones para las carreras
CREATE TABLE acreditacion (
    id SERIAL PRIMARY KEY,            -- Identificador único
    descripcion VARCHAR(50) NOT NULL  -- Descripción de la acreditación
);

-- Insertar valores iniciales
INSERT INTO acreditacion (descripcion)
VALUES ('ANEAES'), ('CONES');


-- Crear tabla de carreras
CREATE TABLE carrera (
    id SERIAL PRIMARY KEY,                    -- Identificador único
    nombre VARCHAR(100) NOT NULL,             -- Nombre de la carrera
    tipo VARCHAR(30) NOT NULL,                -- Tipo de carrera (grado, maestrías, etc.)
    facultad_id INT NOT NULL,                 -- Relación con la tabla facultad
    modalidad VARCHAR(50) NOT NULL,           -- Modalidad (virtual, presencial, etc.)
    perfil_profesional TEXT NOT NULL,         -- Campo de texto para el perfil profesional
    duracion INT NOT NULL,					  -- Duración de la carrera o programa
    unidad_tiempo VARCHAR(25) NOT NULL,		  -- Unidad de tiempo (semanas, años, etc)
    estado VARCHAR(10) NOT NULL,			  -- Estado actual de la carrera (ACTIVO | INACTIVO)
    CONSTRAINT fk_facultad 
        FOREIGN KEY (facultad_id) 
        REFERENCES facultad (id)              -- Relación con la tabla facultad
);


-- Agregar comentarios a las columnas
COMMENT ON COLUMN carrera.id IS 'Identificador único de la carrera';
COMMENT ON COLUMN carrera.nombre IS 'Nombre completo de la carrera';
COMMENT ON COLUMN carrera.tipo IS 'Tipo de la carrera (grado, maestrías, etc.)';
COMMENT ON COLUMN carrera.facultad_id IS 'Identificador de la facultad a la que pertenece la carrera';
COMMENT ON COLUMN carrera.modalidad IS 'Modalidad de la carrera (virtual, presencial, ambos)';
COMMENT ON COLUMN carrera.perfil_profesional IS 'Descripción del perfil profesional de egreso';
COMMENT ON COLUMN carrera.duracion IS 'Duración de la carrera o programa';
COMMENT ON COLUMN carrera.unidad_tiempo IS 'Unidad de tiempo para la duración de la carrera o programa (semanas, años)';
COMMENT ON COLUMN carrera.estado IS 'Estado actual de la carrera (ACTIVO | INACTIVO)';


-- tabla para asociar carreras con acreditaciones M:M
CREATE TABLE carrera_acreditacion (
    carrera_id INT NOT NULL,          -- Relación con la tabla carrera
    acreditacion_id INT NOT NULL,     -- Relación con la tabla acreditacion
    PRIMARY KEY (carrera_id, acreditacion_id),  -- Clave primaria compuesta
    CONSTRAINT fk_carrera 
        FOREIGN KEY (carrera_id) 
        REFERENCES carrera (id),      -- Relación con la tabla carrera
    CONSTRAINT fk_acreditacion 
        FOREIGN KEY (acreditacion_id) 
        REFERENCES acreditacion (id)  -- Relación con la tabla acreditacion
);

-- Agregar comentarios a las columnas
COMMENT ON COLUMN carrera_acreditacion.carrera_id IS 'Identificador de la carrera asociada a la acreditación';
COMMENT ON COLUMN carrera_acreditacion.acreditacion_id IS 'Identificador de la acreditación asociada a la carrera';

