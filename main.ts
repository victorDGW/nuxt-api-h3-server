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
		"https://cdn.pixabay.com/photo/2023/12/08/23/46/cat-8438334_1280.jpg",
		"17T16:50:04.206Z",
		"17T16:50:04.206Z"
	)
	insert.run(
		"Mon deuxième article",
		"Ceci est mon deuxième article",
		"https://cdn.pixabay.com/photo/2023/12/08/23/46/cat-8438334_1280.jpg",
		"18T12:10:54.705Z",
		"18T12:10:54.705Z"
	)
	insert.run(
		"Mon troisième article",
		"Ceci est mon troisième article",
		"https://cdn.pixabay.com/photo/2023/12/08/23/46/cat-8438334_1280.jpg",
		"17T16:50:40.385Z",
		"17T16:50:40.385Z"
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
