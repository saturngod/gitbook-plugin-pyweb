## Install

```
npm install pyWebTest-gitbook
```

In your gitbook book.json

```
plugin : [
	"pyWebTest-gitbook"
	]
```

## Screenshot

![image](https://i.cloudup.com/2Bbk19AXT9.png)

## How to add python code
You can add python code like following
```
Hello World

[[[helloworld.py]]]


Bubbler Sort

[[[bubble.py]]]
```

You need to put your python file path between **[[[** and **]]]**

Example:

- file.md
- code
	-  helloworld.py

In file.md , you can call like

```
This is file.md

[[[code/helloworld.py]]

```



