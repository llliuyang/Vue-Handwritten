function makeMap(str) {
  const mapping = {};
  const list = str.split(',');
  list.forEach(item => {
    mapping[item] = true;
  });
  return (key) => {
    return mapping[key];
  }
}

export const isReservedTag = makeMap(
  'a,p,i,b,s,ul,li,ol,em,br,th,tr,td,dl,dt,dd,hr,h1,h2,h3,h4,h5,h6,div,img,sup,sub,kbd,nav,big,bdi,bdo,code,span,link,font,form,meta,body,cite,audio,title,table,header,textarea,strong,button,input,thead,tbody,tfoot,aside,label,video,small,select,source,section,script,option,footer,canvas,legend,filedset'
)