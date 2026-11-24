const IDENTIFIER_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;

function quoteIdentifier(identifier) {
    if (typeof identifier !== "string" || !IDENTIFIER_PATTERN.test(identifier)) {
        throw new TypeError(`Invalid SQL identifier: ${identifier}`);
    }

    return `"${identifier}"`;
}

function createModel(db, { table, fields }) {
    const tableName = quoteIdentifier(table);
    if (!Array.isArray(fields) || fields.length === 0) {
        throw new TypeError("A model must define at least one field");
    }

    const fieldNames = [...new Set(fields)];
    if (fieldNames.length !== fields.length) {
        throw new TypeError("Model fields must be unique");
    }
    if (fieldNames.includes("id")) {
        throw new TypeError("The id field is reserved");
    }

    const selectedColumns = ["id", ...fieldNames].map(quoteIdentifier).join(", ");
    const allowedFields = new Set(fieldNames);
    const findById = (id) => db.prepare(
        `SELECT ${selectedColumns} FROM ${tableName} WHERE "id" = ?`
    ).get(id) ?? null;

    function validateData(data, requireFields) {
        if (!data || typeof data !== "object" || Array.isArray(data)) {
            throw new TypeError("Model data must be an object");
        }

        const keys = Object.keys(data);
        if (keys.some((key) => !allowedFields.has(key))) {
            throw new TypeError("Model data contains an unknown field");
        }
        if (requireFields && keys.length === 0) {
            throw new TypeError("At least one model field is required");
        }

        return keys;
    }

    return {
        findAll() {
            return db.prepare(
                `SELECT ${selectedColumns} FROM ${tableName} ORDER BY "id"`
            ).all();
        },

        findById,

        create(data) {
            const keys = validateData(data, true);
            const insertColumns = keys.map(quoteIdentifier).join(", ");
            const placeholders = keys.map(() => "?").join(", ");
            const result = db.prepare(
                `INSERT INTO ${tableName} (${insertColumns}) VALUES (${placeholders})`
            ).run(...keys.map((key) => data[key]));

            return findById(result.lastInsertRowid);
        },

        update(id, data) {
            const keys = validateData(data, true);
            const assignments = keys
                .map((key) => `${quoteIdentifier(key)} = ?`)
                .join(", ");
            const result = db.prepare(
                `UPDATE ${tableName} SET ${assignments} WHERE "id" = ?`
            ).run(...keys.map((key) => data[key]), id);

            return result.changes ? findById(id) : null;
        },

        delete(id) {
            return db.prepare(
                `DELETE FROM ${tableName} WHERE "id" = ?`
            ).run(id).changes > 0;
        },

        deleteAll() {
            return db.prepare(`DELETE FROM ${tableName}`).run().changes;
        },
    };
}

module.exports = createModel;
