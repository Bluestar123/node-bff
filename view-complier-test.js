const vm = require('vm')
const user = {
	name: '<script />'
}
const result = `<h2>${user.name}</h2>`

const context = { 
		user,
		include: function(name) { // 引入子模板
			return templateMap[name]() // 转成可运行的函数
		},
		_: function(markup) { // xss过滤
			if (!markup) return
			return String(markup)
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
		},
	}

const templateMap = {
	templateA: '`<h2>${include("templateB")}</h2>`',
	templateB: '`<p>hahahahhahah</p>`',
	//templateC: fs.readFileSync(path)
	
}

Object.keys(templateMap).forEach(key => {
	let temp = templateMap[key]
	templateMap[key] = vm.runInNewContext(`
		(function() {
			return ${temp}
		})
	`, context)
})

console.log(templateMap['templateA']())
// console.log(vm.runInNewContext('`<h2>${_(user.name)}</h2> <div>${include("childTemplateName")}</div>`', context))
