package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
	"github.com/mattes/migrate"
	"github.com/mattes/migrate/database/postgres"
	_ "github.com/mattes/migrate/source/file"
)

func migrateDB(connStr string) error {
	// A separate DB connection is used so that the migrate code can close the
	// connection after it's finished with it.
	// See https://github.com/mattes/migrate/issues/297#issuecomment-339646656
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("could not open database connection: %v", err)
	}
	defer db.Close()
	log.Println("Pinging migrate database connection...")
	if err := db.Ping(); err != nil {
		return fmt.Errorf("could not ping database: %v", err)
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return err
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://./migrations",
		"",
		driver,
	)
	if err != nil {
		return err
	}
	defer m.Close()
	switch err := m.Up(); err {
	case migrate.ErrNoChange:
		log.Println("Database is up to date, nothing to migrate")
	case nil:
	default:
		return err
	}
	return nil
}
