package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

const (
	postgresConnStrEnv = "POSTGRES_URI"
)

func main() {
	postgresConnStr := os.Getenv(postgresConnStrEnv)

	db, err := sql.Open("postgres", postgresConnStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}
	migrateDB(db)
}
