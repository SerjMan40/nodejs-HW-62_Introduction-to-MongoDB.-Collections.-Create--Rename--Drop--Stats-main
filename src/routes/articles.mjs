import express from 'express'
import {
  getArticlesHandler,
  postArticleHandler,
  putArticleHandler,
  deleteArticleHandler,
  getArticleDetailHandler
} from '../controllers/articles.mjs'
import authMiddleware from '../middlewares/authenticate.mjs'

const articlesRouter = express.Router()

articlesRouter.get('/', authMiddleware , getArticlesHandler)
articlesRouter.post('/', authMiddleware , postArticleHandler)

articlesRouter.get('/:articleId', authMiddleware , getArticleDetailHandler)
articlesRouter.put('/:articleId', authMiddleware , putArticleHandler)
articlesRouter.delete('/:articleId', authMiddleware , deleteArticleHandler)

export default articlesRouter
