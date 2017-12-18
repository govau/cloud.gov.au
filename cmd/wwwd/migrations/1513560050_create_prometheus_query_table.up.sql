CREATE TABLE prometheus_query (
    query VARCHAR(1000) NOT NULL,
    value_type JSON NOT NULL,
    value JSON NOT NULL,
    updated TIMESTAMP NOT NULL,
    PRIMARY KEY(query)
);