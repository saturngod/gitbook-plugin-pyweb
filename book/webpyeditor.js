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
  val +="from browser import document,prompt\n"
  val += "def raw_input(data):\n";
  val += "    return prompt(data)\n"
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