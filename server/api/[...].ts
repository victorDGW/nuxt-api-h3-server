import { useBase, createRouter, defineEventHandler } from "h3"
import * as blogController from "../controller/blog"

const router = createRouter()
router.get("/blog", defineEventHandler(blogController.list))
router.get("/blog/:id", defineEventHandler(blogController.getBlogDetail))
router.post("/blog", defineEventHandler(blogController.create))
router.put("/blog/:id", defineEventHandler(blogController.update))
router.delete("/blog/id", defineEventHandler(blogController.remove))

export default useBase("/api", router.handler)
