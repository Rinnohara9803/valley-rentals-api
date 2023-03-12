const http=require('http')

const app=require('./app')
const PORT=process.env.PORT || 90

const httpserver=http.createServer(app)

httpserver.listen(PORT,()=>{
    console.log(`server is listening at port: ${PORT}`)
})