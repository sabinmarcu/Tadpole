# Including some base necessities and creating the compilation package (anonymously)
require "isf"
stitch = require "stitchw"
stylus = require "stylus"
nib    = require "nib"
base   = (require "path").resolve "@{__dirname}/../src/stylesheets"
pack   = stitch.createPackage
	"dependencies": ["./node_modules/isf/lib/application.js"]
	"paths": ["./src"]


# The Compiler Bootstrap
class Compiler

	# Compile the application to its designated location.
	@compile: (to = "./public/js/g.js", callback = null) ->
		try
			pack.compile (err, source) ->
				if err then return throw CompilerErrorReporter.generate 2, CompilerErrorReporter.wrapCustomError err
				if callback? then callback source
				else
					try
						(require "fs").writeFileSync to.toString(), source, "utf8"
					catch e then return throw CompilerErrorReporter.generate 3, CompilerErrorReporter.wrapCustomError e
		catch e then return throw CompilerErrorReporter.generate 1, e

	@compileStyles: (to = "./public/css/styles.css", callback = null) ->
		try
			sty = (require "fs").readFileSync "#{base}/index.styl", "utf8"
			paths = [
				 "#{base}"
				 "#{base}/tablet"
				 "#{base}/touch"
				 "#{base}/indexPage"
				 "#{base}/404"
			]
			stylus(sty).set("filename", "#{base}/index.styl").set("paths", paths).use(do nib).import("nib").render (err, css) ->
				if err then return throw CompilerErrorReporter.generate 4, CompilerErrorReporter.wrapCustomError err
				if callback? then callback css
				else
					try
						( require "fs" ).writeFileSync to.toString(), css, "utf8"
					catch e then return throw CompilerErrorReporter.generate 6, CompilerErrorReporter.wrapCustomError e
		catch e
			throw new CompilerErrorReporter.generate 5, CompilerErrorReporter.wrapCustomError e

# Defining the Compiler Error Reporter
class CompilerErrorReporter extends IS.Object

	# Setting the error parameters
	@errorGroups = [ "CompilationError", "WriteError" ]
	@errorGroupMap = [ 1, 1, 2, 1, 1, 2 ]
	@errorMessages = [
		"An error occured when compiling the application"
		"The compiler failed"
		"Couldn't write the application to the file"
		"The styles failed"
		"An error occured when compiling the stylesheets"
		"Couldn't write the styles to the file"
	]

	# Making sure it behaves properly
	@extend IS.ErrorReporter

# Exporting the Compiler
module.exports = Compiler
