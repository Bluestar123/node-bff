const Koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const fs = require('fs')
const app = new Koa()

// 如果匹配到了source 下的文件，就会返回
app.use(static(__dirname + '/source/'))

app.use(mount('/', async ctx => {
	ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
}))

app.listen(3000, () => console.log('监听 ing'))