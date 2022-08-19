CREATE SCHEMA "minzdrav"

CREATE TABLE "minzdrav"."mpe1gem" (
    "id" SERIAL PRIMARY KEY, 
    "npp" INTEGER,
    "r1022" VARCHAR(11),
    "naim_org" VARCHAR(1000),
    "adr_fact" VARCHAR(1000),
    "inn" VARCHAR(100),
    "plazma_max" NUMERIC(17,6),
    "plazma_cena" NUMERIC(17,6),
    "erm_max" NUMERIC(17,6),
    "erm_cena" NUMERIC(17,6),
    "immg_max" NUMERIC(17,6),
    "immg_cena" NUMERIC(17,6),
    "alb_max" NUMERIC(17,6),
    "alb_cena" NUMERIC(17,6)
);


INSERT INTO "minzdrav"."mpe1gem" 
("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
VALUES 
('1', '0100000000', 'АлтайБир', 'Ленина ул. 58', '381299944331', '100', '9999', '100', '9999', '100', '9999', '100', '9999');

INSERT INTO "minzdrav"."mpe1gem" 
("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
VALUES 
('2', '0100000000', 'Гриблайн', 'Колчака ул. 38', '381299944332', '300', '7777', '300', '7777', '300', '7777', '300', '7777');

INSERT INTO "minzdrav"."mpe1gem" 
("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
VALUES 
('1', '0100000000', 'АЛТАЙТЕСТ', 'Ленина ул. 58', '381299944331', '100', '9999', '100', '9999', '100', '9999', '100', '9999');

INSERT INTO "minzdrav"."mpe1gem" 
("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
VALUES 
('1', '0100000000', 'АЛТАЙТЕСТ2', 'Ленина ул. 58', '381299944331', '100', '9999', '100', '9999', '100', '9999', '100', '9999');
