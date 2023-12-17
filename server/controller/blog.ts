import { Body } from "./../../.nuxt/components.d"
import * as BlogModel from "./../model/blog"
import { H3Event } from "h3"

export const list = async () => {
	try {
		const result = await BlogModel.getAll()
		console.log("result", result)
		return {
			data: result,
		}
	} catch (error: any) {
		console.log(error)
		throw createError({
			status: 500,
			message: error.message,
		})
	}
}

export const create = async (event: H3Event) => {
	try {
		const body = await readBody(event)

		const result = await BlogModel.create({
			title: body.title,
			content: body.content,
		})
		return {
			data: result,
		}
	} catch (error: any) {
		console.log(error)
		throw createError({
			status: 500,
			message: error.message,
		})
	}
}

export const getBlogDetail = async (event: H3Event) => {
	try {
		const idBlog = event.context.params?.id
		if (!idBlog) {
			throw createError({
				status: 400,
				message: "Missing id",
			})
		}
		const result = await BlogModel.getById(+idBlog)
		return {
			data: result,
		}
	} catch (error: any) {
		console.log(error)
		throw createError({
			status: 500,
			message: error.message,
		})
	}
}

export const update = async (event: H3Event) => {
	try {
		const idBlog = event.context.params?.id
		if (!idBlog) {
			throw createError({
				status: 400,
				message: "Missing id",
			})
		}
		const body = await readBody(event)
		const result = await BlogModel.update(+idBlog, {
			title: body.title,
			content: body.content,
		})
		return {
			data: result,
		}
	} catch (error: any) {
		console.log(error)
		throw createError({
			status: 500,
			message: error.message,
		})
	}
}

export const remove = async (event: H3Event) => {
	try {
		const idBlog = event.context.params?.id
		if (!idBlog) {
			throw createError({
				status: 400,
				message: "Missing id",
			})
		}
		const result = await BlogModel.deleteById(+idBlog)
		return {
			data: result,
		}
	} catch (error: any) {
		console.log(error)
		throw createError({
			status: 500,
			message: error.message,
		})
	}
}
