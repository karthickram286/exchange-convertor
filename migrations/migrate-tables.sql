\connect exchange_converter

-- Table Definition
CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" uuid NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

GRANT ALL PRIVILEGES ON TABLE "users" to postgres;