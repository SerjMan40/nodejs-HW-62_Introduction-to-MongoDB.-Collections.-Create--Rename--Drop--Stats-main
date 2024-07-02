import connectDB from '../config/db.mjs'
import { ObjectId } from 'mongodb'

const readArticlesFromDB = async () => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const articles = await db.collection('articles').find().toArray()
  return articles
}

const addArticleToDB = async (article) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const result = await db.collection('articles').insertOne(article)
  return result.insertedId ? { ...article, _id: result.insertedId } : null
}

const updateArticleInDB = async (articleId, updatedArticle) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const result = await db
    .collection('articles')
    .findOneAndUpdate({ _id: new ObjectId(articleId) }, { $set: updatedArticle }, { returnOriginal: false })
  return result.value
}

const findArticleById = async (id) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const article = await db.collection('articles').findOne({ _id: new ObjectId(id) })
  console.log('Article from DB:', article)
  return article
}

const deleteArticleFromDB = async (articleId) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const result = await db.collection('articles').deleteOne({ _id: new ObjectId(articleId) })
  return result.deletedCount > 0
}

export { readArticlesFromDB, addArticleToDB, updateArticleInDB, deleteArticleFromDB, findArticleById }
