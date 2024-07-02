import {
  readArticlesFromDB,
  addArticleToDB,
  updateArticleInDB,
  deleteArticleFromDB,
  findArticleById
} from '../data/articlesData.mjs'

export const getArticlesHandler = async (req, res) => {
  try {
    const articles = await readArticlesFromDB()
    res.render('articles/articles.ejs', { articles })
  } catch (err) {
    console.error('Error fetching articles:', err.message)
    res.status(500).send('Server Error')
  }
}

export const getArticleDetailHandler = async (req, res) => {
  try {
    const articleId = req.params.articleId
    const article = await findArticleById(articleId)
    if (article) {
      res.render('articles/articleDetail.ejs', { article })
    } else {
      res.status(404).send('Article not found')
    }
  } catch (err) {
    console.error('Error fetching article:', err.message)
    res.status(500).send('Server Error')
  }
}

export const postArticleHandler = async (req, res) => {
  const { title, content } = req.body
  try {
    const newArticle = { title, content }
    const addedArticle = await addArticleToDB(newArticle)
    if (!addedArticle) {
      throw new Error('Failed to add article to the database.')
    }
    res.status(201).send('Article created successfully')
  } catch (err) {
    console.error('Error creating article:', err.message)
    res.status(500).send('Server Error')
  }
}

export const putArticleHandler = async (req, res) => {
  const articleId = req.params.articleId
  const { title, content } = req.body
  try {
    const updatedArticle = { title, content }
    const isUpdated = await updateArticleInDB(articleId, updatedArticle)
    if (isUpdated) {
      res.send(`Article with ID: ${articleId} is updated!`)
    } else {
      res.status(404).send(`Article with ID ${articleId} not found`)
    }
  } catch (err) {
    console.error('Error updating article:', err.message)
    res.status(500).send('Server Error')
  }
}

export const deleteArticleHandler = async (req, res) => {
  const articleId = req.params.articleId
  try {
    const deletedArticle = await deleteArticleFromDB(articleId)
    if (deletedArticle) {
      res.send(`Article with ID: ${articleId} was deleted!`)
    } else {
      res.status(404).send(`Article with ID ${articleId} not found`)
    }
  } catch (err) {
    console.error('Error deleting article:', err.message)
    res.status(500).send('Server Error')
  }
}
