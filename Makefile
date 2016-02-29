all:
	rm -rf _site index.html
	jekyll build
	cp _site/index.html .

# Hello
