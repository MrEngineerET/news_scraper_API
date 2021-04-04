import express from 'express'
import newsRoutes from './newsRoutes'
import categoryRoutes from './categoryRoutes'
import sourceRoutes from './sourceRoute'

const route = express.Router()

route.use('/news', newsRoutes)
route.use('/category', categoryRoutes)
route.use('/source', sourceRoutes)

export default route
