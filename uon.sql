CREATE TABLE "client" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "admin_id" int,
  "created_at" SERIAL
);

CREATE TABLE "admin" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "created_at" SERIAL
);

CREATE TABLE "order" (
  "id" SERIAL PRIMARY KEY,
  "due_time" int,
  "progress_status" int,
  "payment_status" int,
  "dispute_status" int,
  "revision_status" int,
  "subject" varchar,
  "nature" varchar,
  "pages" int,
  "price" int,
  "budget" varchar,
  "doc_format" varchar,
  "doc_description" text,
  "spacing" varchar,
  "order_id" int
);

CREATE TABLE "transaction" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "receipt" varchar,
  "order_id" int,
  "client_id" int
);

CREATE TABLE "product" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "price" int,
  "nature" varchar,
  "description" varchar,
  "admin_id" int
);

CREATE TABLE "file" (
  "id" SERIAL PRIMARY KEY,
  "address" varchar,
  "order_id" int
);

ALTER TABLE "order" ADD FOREIGN KEY ("order_id") REFERENCES "client" ("id");

ALTER TABLE "transaction" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "transaction" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("id");

ALTER TABLE "file" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "client" ADD FOREIGN KEY ("admin_id") REFERENCES "admin" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("admin_id") REFERENCES "admin" ("id");
