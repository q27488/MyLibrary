fis.match('*.{js,css}', {
  useHash: false
});

fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    allInOne: true	//对散列的引用链接进行合并
  })
});

// fis.match('*.less',{
// 	// fis-parser-less 插件进行解析
// 	parser: fis.plugin('less'),
// 	//.less 文件后缀构建后改成.css文件
// 	rExt:'.css'
// })

// fis.match('*.html', {
//     release: '$1'
// })
fis.match('*.css', {
  packTo: '/static/css/bindCss.css'
});

fis.match('*.js', {
  packTo: '/static/js/bindJs.js'
});

fis.match('*.{png,jpg,gif}', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
   release: '/static/img/$0'
});
