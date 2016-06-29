var fs = require("fs");
var path =  require('path');
var editor_count = 0;
module.exports = {
    website: {
        assets: "./book",
        js: [
        "editor/ace.js",
        "editor/theme-tomorrow_night.js",
        "editor/mode-python.js",
        "webpyeditor.js",
		"js/brython.js"
        ],
        css: [
            "pygitbook.css"
        ],
        html: {
          "body:start": function() {
           
          },
          "body:end": function() {
            
          }
        }
      },
      blocks: {

        pyweb : {
          process : function(blk) {
            var filepath = path.dirname(this.ctx.file.path);
            var file = blk.body;
            var fullpath = filepath + "/"+file.trim();
            fullpath = fs.realpathSync(fullpath);

            //got the python code
            var python = fs.readFileSync(fullpath);
            python = String(python).replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
            var html_code = '<div id="code'+editor_count+'" class="codeEditor" data-editor = "editor'+editor_count+'">'+python+'</div>';

            html_code += "<script> var editor"+editor_count+"='';</script>";

            html_code += "<input type='button' class='btn pyBtn' id='run0' value='run' onclick=\"run_python(editor"+editor_count+",'python_result"+editor_count+"')\"><br/>";

            html_code += "<textarea id='python_result"+editor_count+"' readonly class='console'></textarea>";


            editor_count++;

            return html_code;

          }
        }
      }, //end of blocks
      hooks: {
       // For all the hooks, this represent the current generator

       // This is called before the book is generated
       "init": function() {
           console.log("init!");
       },
       // This is called after the book generation
        "finish": function() {
            console.log("finish!");
        }
      }//end of hooks

    } //end of exports
