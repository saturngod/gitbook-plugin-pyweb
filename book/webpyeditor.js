function run_python(editor,result)
{
  var ele = document.getElementById("temppython");
  if(ele)
  {
    document.body.removeChild(ele);
  }

  //clean the console
  document.getElementById(result).value = "";

  //create the import to show on console
  var val = "import sys\n";
  val +="from browser import document\n"
  val += "def write(data):\n";
  val +="    document['"+result+"'].value += str(data)";
  val += "\n"+"sys.stdout.write = write";
  val += "\n" +"sys.stderr.write = write";

  //get script value
  val += "\n" + editor.getSession().getValue();

  var py_script = document.createElement('script');
  py_script.setAttribute("id","temppython");
  //hide is. don't want to show on body
  py_script.style.visibility = 'hidden';


  py_script.type = 'text/python3';
  //set python script
  py_script.textContent = val;
  document.body.appendChild(py_script)
  // run brython(), searching Python code in script tags
  brython({debug:1,py_tag:'script'});

  // clean up
  document.body.removeChild(py_script)
}


function forEachElement(selector, fn) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++)
    fn(elements[i], i);
}



require(["gitbook"], function(gitbook) {

  gitbook.events.bind("page.change", function(e, config) {
    load_editor();
  });

});

document.addEventListener('DOMContentLoaded', function(){ load_editor(); });

function load_editor(){

  forEachElement(".codeEditor",function(el,i) {
    var el_id = el.getAttribute('id');
    var variable = el.getAttribute('data-editor');

    var code = variable + " = ace.edit('"+el_id+"');";
    code += variable +'.setTheme("ace/theme/tomorrow_night");';
    code += variable +'.getSession().setMode("ace/mode/python");';
    code += variable +'.setOptions({minLines:5,maxLines: 15});';
    eval(code);
  });

}
