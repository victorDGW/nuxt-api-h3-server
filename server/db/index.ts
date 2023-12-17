import sqlite3 from "sqlite3"

const connection = new sqlite3.Database("./BDD/db.sqlite", (err) => {
	if (err) {
		console.error("Fail to connect to the BDD ", err.message)
	}

	console.log("Connected to the database.")
})

export default connection
