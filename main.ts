import sqlite3 from "sqlite3"
import path from "path"

// Fonction pour initialiser la base de données avec des valeurs
function initializeDatabase() {
	const dbPath = path.join(__dirname, "ma_base_de_donnees.db")
	const db = new sqlite3.Database(dbPath)

	// Créer la table si elle n'existe pas
	db.run(
		"CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, createdAt TEXT, updatedAt TEXT)"
	)

	// Insérer des valeurs initiales
	const insert = db.prepare(
		"INSERT INTO blogs (title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?)"
	)
	insert.run(
		"Mon premier article",
		"Ceci est mon premier article",
		"2021-01-01",
		"2021-01-01"
	)
	insert.run(
		"Mon deuxième article",
		"Ceci est mon deuxième article",
		"2021-01-02",
		"2021-01-02"
	)
	insert.run(
		"Mon troisième article",
		"Ceci est mon troisième article",
		"2021-01-03",
		"2021-01-03"
	)
	insert.finalize()

	console.log("Base de données initialisée avec succès.")

	// Fermer la base de données
	db.close()
}

// Fonction pour réinitialiser la base de données
function resetDatabase() {
	const dbPath = path.join(__dirname, "ma_base_de_donnees.db")
	const db = new sqlite3.Database(dbPath)

	// Supprimer la table si elle existe
	db.run("DROP TABLE IF EXISTS utilisateurs")

	console.log("Base de données réinitialisée avec succès")
}

// Utilisation du script principal
const command = process.argv[2]

if (command === "init") {
	initializeDatabase()
} else if (command === "reset") {
	resetDatabase()
} else {
	console.error("Usage: node main.js <init|reset>")
}
