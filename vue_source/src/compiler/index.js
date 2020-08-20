import { parseHTML } from './parse'
import { generate } from './generate';
export function compileToFunction(template){
  let ast = parseHTML(template);
  let code = generate(ast);
  let render =  new Function(`with(this){return ${code}}`);
  return render; 
}