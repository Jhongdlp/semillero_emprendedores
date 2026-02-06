-- ==============================================================================
-- SISTEMA DE GESTIÓN INTEGRAL DE SEMILLERO DE EMPRENDEDORES (SGISE)
-- Versión del Schema: 2.1.0
-- Autor: Generado para Simulación Académica
-- Motor de Base de Datos: PostgreSQL 14+
-- Descripción: Script DDL/DML complejo para gestión de startups, financiación y mentorías.
-- ==============================================================================
BEGIN;
-- ------------------------------------------------------------------------------
-- 1. LIMPIEZA DE ENTORNO
-- ------------------------------------------------------------------------------
DROP SCHEMA IF EXISTS emprende_core CASCADE;
CREATE SCHEMA emprende_core;
SET search_path TO emprende_core,
    public;
-- ------------------------------------------------------------------------------
-- 2. DEFINICIÓN DE TIPOS Y DOMINIOS
-- ------------------------------------------------------------------------------
CREATE TYPE estado_proyecto AS ENUM (
    'IDEACION',
    'MVP',
    'PRE_SEMILLA',
    'SEMILLA',
    'SERIE_A',
    'EXIT',
    'FRACASO'
);
CREATE TYPE tipo_rol AS ENUM ('ADMIN', 'EMPRENDEDOR', 'MENTOR', 'INVERSOR');
CREATE DOMAIN email_valido AS VARCHAR(255) CHECK (
    VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);
-- ------------------------------------------------------------------------------
-- 3. TABLAS PRINCIPALES (DDL)
-- ------------------------------------------------------------------------------
-- Tabla de Usuarios con seguridad básica
CREATE TABLE usuarios (
    usuario_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email email_valido UNIQUE NOT NULL,
    password_hash CHAR(60) NOT NULL,
    -- Simulando bcrypt
    nombre_completo VARCHAR(100) NOT NULL,
    rol tipo_rol NOT NULL,
    fecha_registro TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    datos_perfil JSONB DEFAULT '{}' -- Metadatos flexibles (redes sociales, bio)
);
-- Tabla de Startups/Proyectos
CREATE TABLE startups (
    startup_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    industria VARCHAR(50) NOT NULL,
    fecha_fundacion DATE,
    estado_actual estado_proyecto DEFAULT 'IDEACION',
    valoracion_actual DECIMAL(15, 2) DEFAULT 0.00,
    lider_id UUID NOT NULL REFERENCES usuarios(usuario_id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valoracion_positiva CHECK (valoracion_actual >= 0)
);
-- Tabla de Inversiones (Relación N:M compleja)
CREATE TABLE rondas_inversion (
    ronda_id SERIAL PRIMARY KEY,
    startup_id UUID REFERENCES startups(startup_id) ON DELETE CASCADE,
    inversor_id UUID REFERENCES usuarios(usuario_id),
    monto DECIMAL(12, 2) NOT NULL CHECK (monto > 0),
    equity_percentage DECIMAL(5, 2) CHECK (
        equity_percentage BETWEEN 0 AND 100
    ),
    fecha_cierre DATE DEFAULT CURRENT_DATE,
    documentos_legales TEXT [],
    -- Array de URLs a documentos
    notas_auditoria TEXT
);
-- Tabla de Mentorías (Seguimiento temporal)
CREATE TABLE sesiones_mentoria (
    sesion_id BIGSERIAL PRIMARY KEY,
    mentor_id UUID REFERENCES usuarios(usuario_id),
    startup_id UUID REFERENCES startups(startup_id),
    fecha_programada TIMESTAMPTZ NOT NULL,
    duracion_minutos INTEGER CHECK (duracion_minutos > 0),
    objetivos TEXT,
    feedback_mentor TEXT,
    calificacion_emprendedor INTEGER CHECK (
        calificacion_emprendedor BETWEEN 1 AND 5
    ),
    estado VARCHAR(20) DEFAULT 'PROGRAMADA'
);
-- Tabla de KPI Historicos (Para Analytics)
CREATE TABLE historico_kpis (
    id BIGSERIAL PRIMARY KEY,
    startup_id UUID REFERENCES startups(startup_id),
    fecha_medicion DATE DEFAULT CURRENT_DATE,
    metricas JSONB NOT NULL,
    -- Ejemplo: {"burn_rate": 5000, "cac": 15}
    comentario_analista TEXT
);
-- ------------------------------------------------------------------------------
-- 4. ÍNDICES Y OPTIMIZACIÓN
-- ------------------------------------------------------------------------------
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_startups_estado ON startups(estado_actual);
CREATE INDEX idx_rondas_startup ON rondas_inversion(startup_id);
-- Indice GIN para búsquedas rápidas dentro del JSON de perfil
CREATE INDEX idx_usuarios_perfil_json ON usuarios USING GIN (datos_perfil);
-- ------------------------------------------------------------------------------
-- 5. PROCEDIMIENTOS ALMACENADOS Y FUNCIONES (PL/pgSQL)
-- ------------------------------------------------------------------------------
-- Función para actualizar automáticamente el timestamp `updated_at`
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Trigger aplicado a la tabla startups
CREATE TRIGGER update_startups_modtime BEFORE
UPDATE ON startups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Procedimiento Complejo: Calcular Valoración Post-Money y Actualizar
CREATE OR REPLACE PROCEDURE registrar_inversion_impacto(
        p_startup_id UUID,
        p_inversor_id UUID,
        p_monto DECIMAL,
        p_equity DECIMAL
    ) LANGUAGE plpgsql AS $$
DECLARE v_valoracion_nueva DECIMAL;
BEGIN -- Validación de negocio
IF p_equity <= 0 THEN RAISE EXCEPTION 'El porcentaje de equity debe ser mayor a 0';
END IF;
-- Cálculo de valoración implícita (Post-Money Valuation)
v_valoracion_nueva := (p_monto / p_equity) * 100;
-- Insertar la ronda
INSERT INTO rondas_inversion (
        startup_id,
        inversor_id,
        monto,
        equity_percentage
    )
VALUES (p_startup_id, p_inversor_id, p_monto, p_equity);
-- Actualizar valoración de la startup si es mayor a la actual
UPDATE startups
SET valoracion_actual = v_valoracion_nueva,
    estado_actual = CASE
        WHEN v_valoracion_nueva > 1000000 THEN 'SEMILLA'
        ELSE estado_actual
    END
WHERE startup_id = p_startup_id;
COMMIT;
END;
$$;
-- ------------------------------------------------------------------------------
-- 6. VISTAS (VIEWS) PARA REPORTES
-- ------------------------------------------------------------------------------
-- Vista materializada de rendimiento (Simulada como vista normal para simplicidad de script)
CREATE VIEW reporte_financiero_startups AS
SELECT s.nombre,
    s.industria,
    s.valoracion_actual,
    COUNT(r.ronda_id) as total_rondas,
    COALESCE(SUM(r.monto), 0) as capital_levantado
FROM startups s
    LEFT JOIN rondas_inversion r ON s.startup_id = r.startup_id
GROUP BY s.startup_id,
    s.nombre,
    s.industria,
    s.valoracion_actual
ORDER BY capital_levantado DESC;
-- ------------------------------------------------------------------------------
-- 7. POBLADO DE DATOS (SEEDING) - SIMULACIÓN
-- ------------------------------------------------------------------------------
DO $$
DECLARE v_emprendedor_id UUID;
v_inversor_id UUID;
v_mentor_id UUID;
v_startup_id UUID;
BEGIN -- Crear Usuarios
INSERT INTO usuarios (
        nombre_completo,
        email,
        password_hash,
        rol,
        datos_perfil
    )
VALUES (
        'Carlos Innovador',
        'carlos@tech.co',
        '$2a$12$R9...',
        'EMPRENDEDOR',
        '{"linkedin": "link", "skills": ["react", "business"]}'
    ),
    (
        'Ana Capital',
        'ana@vc.fund',
        '$2a$12$X7...',
        'INVERSOR',
        '{"sector_focus": "fintech"}'
    ),
    (
        'Roberto Mentor',
        'rob@guia.org',
        '$2a$12$Z1...',
        'MENTOR',
        '{"experiencia": "20 anos"}'
    )
RETURNING usuario_id INTO v_emprendedor_id;
-- Capturar IDs para relaciones (truco para simulación en un solo bloque)
SELECT usuario_id INTO v_inversor_id
FROM usuarios
WHERE email = 'ana@vc.fund';
SELECT usuario_id INTO v_mentor_id
FROM usuarios
WHERE email = 'rob@guia.org';
-- Crear Startup
INSERT INTO startups (
        nombre,
        descripcion,
        industria,
        lider_id,
        estado_actual
    )
VALUES (
        'EcoPay',
        'Fintech para economía circular',
        'Fintech',
        v_emprendedor_id,
        'MVP'
    )
RETURNING startup_id INTO v_startup_id;
-- Simular una sesión de mentoría
INSERT INTO sesiones_mentoria (
        mentor_id,
        startup_id,
        fecha_programada,
        objetivos
    )
VALUES (
        v_mentor_id,
        v_startup_id,
        NOW() + INTERVAL '2 days',
        'Revisión de Pitch Deck'
    );
-- Insertar KPI histórico
INSERT INTO historico_kpis (startup_id, metricas)
VALUES (
        v_startup_id,
        '{"usuarios_activos": 150, "burn_rate_mensual": 1200}'
    );
END $$;
COMMIT;
-- ==============================================================================
-- FIN DEL SCRIPT
-- ==============================================================================