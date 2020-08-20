const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  // 匹配标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

export function parseHTML(html){
  function creatASTElement(tagName,attrs){
    return {
      tag:tagName,
      attrs,
      type:1,
      children:[],
      parent: null
    }
  }
  let root,
      currentParent,
      stack = [];

  function start(tagName,attrs){
    let element = creatASTElement(tagName,attrs);
    if(!root){
      root = element;
    }
    currentParent = element;
    stack.push(element);

  }

  function end(tagName){
    let element = stack.pop();
    currentParent = stack[stack.length-1];
    if(currentParent){
      element.parent = currentParent;
      currentParent.children.push(element);  
    }

  }

  function chars(text){
    text = text.replace(/\s/g,'');
    if(text){
      currentParent.children.push({
        type:3,
        text
      })
    }
  }

  while (html) {
    let textEnd = html.indexOf('<');
    if(textEnd == 0){ 
      let startTagMatch = parseStartTag();
      if(startTagMatch){
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      const endTagMatch = html.match(endTag);
      if(endTagMatch){
        end(endTagMatch[1]);
        advance(endTagMatch[0].length);
        continue;
      }
      break;
    }

    let text;
    if(textEnd > 0){
      text = html.substring(0,textEnd);
    }
    if(text){
      chars(text);
      advance(text.length);
    }

  }

  function advance(n){
    html = html.substring(n)
  }

  function parseStartTag(){
    const start = html.match(startTagOpen);
    if(start){
      const match ={
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length);

      let end,attr;
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
        match.attrs.push({ key:attr[1], value:attr[3] || attr[4] || attr[5] })
        advance(attr[0].length);
      }
      
      if(end){
        advance(end[0].length);
        return match;
      }
      
    }
    
  }

  return root;
}
