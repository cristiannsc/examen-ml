# Examen Mercadolibre: Detector de Mutantes
Servicio REST API que permite la detección de mutantes a partir de una secuencia de ADN enviada.

# Prerequisitos para ejecución en local

- Node v14
- Postgresql v12

## Crear tabla de base de datos:

```sql
CREATE TABLE public."dna_record" (
	id serial4 NOT NULL,
	dna_sequence jsonb NOT NULL,
	mutant bool NOT NULL,
	created_at timestamp NOT NULL,
	CONSTRAINT dna_sequence_pk PRIMARY KEY (id)
);
```

## Crear archivo .env y configurar variables de entorno mediante archivo .env.example:
```bash
cp .env.example .env
```

## Instalar paquetes npm:
```bash
npm i
```

## Iniciar aplicación
```bash
npm start
```

# Ejecución de pruebas unitarias
```bash
npm test
```

Luego de ejecutar el comando se creara automaticamente una carpeta en la raiz del proyecto llamada 'coverage' dentro de la cual estará la carpeta 'lcov-report' donde podra acceder al archivo 'index.html' con el que podra visualizar la interfaz de la cobertura lograda con los tests.

**Es importante mencionar que se debe haber ejecutado el comando npm i antes de ejecutarlas**
