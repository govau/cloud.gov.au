package main

import (
	"database/sql"
	"log"

	"github.com/mattes/migrate"
	"github.com/mattes/migrate/database/postgres"
	_ "github.com/mattes/migrate/source/file"
)

func migrateDB(db *sql.DB) (*migrate.Migrate, error) {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return nil, err
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://./migrations",
		"",
		driver,
	)
	if err != nil {
		return nil, err
	}
	switch err := m.Up(); err {
	case migrate.ErrNoChange:
		log.Println("Database is up to date, nothing to migrate")
	case nil:
	default:
		return nil, err
	}
	return m, nil
}
