var fs = require("fs");
var path =  require('path');
module.exports = {
    book: {
        assets: "./book",
        js: [
        "js/brython.js",
        "editor/ace.js",
        "editor/theme-tomorrow_night.js",
        "editor/mode-python.js",
        "webpyeditor.js"
        ],
        css: [          
            "pygitbook.css"
        ]
      },
      hooks: {
        "page:after": function(page) {
          var filepath = path.dirname(page.path);
          var content = page.content;
          var arr = {};
          var files = content.match(/\[\[\[([^\]]+)\]\]\]/g);
          for (var i in files) {
            file = files[i];
            key = files[i];
            file = file.replace(/\[\[\[/g,"");
            file = file.replace(/\]\]\]/g,"");
            var fullpath = filepath + "/"+file;
            fullpath = fs.realpathSync(fullpath);
            var python = fs.readFileSync(fullpath);
            
            var template = "<div id='code"+i+"'>";
            template += python;
            template +="</div>\n";
            
            template +="<script>\n"
            template +="var editor" + i + "= '';\n";
             template += "document.addEventListener('DOMContentLoaded', function(){\n";
            template +="editor" + i + "=  ace.edit('code"+i+"');\n";
            template += "editor" + i + ".setTheme(\"ace/theme/tomorrow_night\");\n";
            template +=  "editor" + i + ".getSession().setMode(\"ace/mode/python\");\n";
            template += "});\n";
            template +="</script>\n";
            
            template +="<input type='button' class='btn' id='run"+i+"' value='run' onclick=\"run_python(editor"+i+",'python_result"+i+"')\"><br/>\n";
            template +="<textarea id='python_result"+i+"' readonly class='console'></textarea>";
            
           
            
            arr[key] = template;
          } // end for files loop
          
          content = content.replace(/\[\[\[([^\]]+)\]\]\]/g,function ($0, $1){
            return arr[$0]
          });
          
          page.content = content;
          
          return page;
        }
      } //end of hooks
    } //end of exports