import BlogModel from "~/types/blog"
import connection from "../db"

const getAll = async () => {
	const result = await new Promise<BlogModel[]>((resolve, reject) => {
		connection.all("SELECT * FROM blogs", (err, rows) => {
			if (err) {
				reject(err)
			}
			resolve(rows as BlogModel[])
		})
	})
	return result
}

const getById = async (id: number) => {
	const result = await new Promise<BlogModel>((resolve, reject) => {
		connection.get("SELECT * FROM blogs WHERE id = ?", [id], (err, row) => {
			if (err) {
				reject(err)
			}
			resolve(row as BlogModel)
		})
	})
	return result
}

const create = async (blog: Pick<BlogModel, "title" | "content">) => {
	const result = await new Promise<number>((resolve, reject) => {
		connection.run(
			"INSERT INTO blogs (title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
			[
				blog.title,
				blog.content,
				new Date().toISOString(),
				new Date().toISOString(),
			],
			function (err) {
				if (err) {
					reject(err)
				}
				resolve(this.lastID)
			}
		)
	})
	return result
}

const update = async (
	idBlog: number,
	blog: Pick<BlogModel, "title" | "content">
) => {
	const result = await new Promise<number>((resolve, reject) => {
		connection.run(
			"UPDATE blogs SET title = ?, content = ?, updatedAt = ? WHERE id = ?",
			[blog.title, blog.content, new Date().toISOString(), +idBlog],
			function (err) {
				if (err) {
					reject(err)
				}
				resolve(this.changes)
			}
		)
	})

	console.log("result model ", result)
	return result
}

const deleteById = async (id: number) => {
	const result = await new Promise<number>((resolve, reject) => {
		connection.run("DELETE FROM blogs WHERE id = ?", [id], function (err) {
			if (err) {
				reject(err)
			}
			resolve(this.lastID)
		})
	})
	return result
}

export { getAll, create, getById, update, deleteById }
