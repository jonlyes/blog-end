import config from "../app/config";

// 处理cover的路径
// reverse为true则是从http://xxx.xx/images/xxx.jpg 到 images/xxx.jpg
// false z则是从images/xxx.jpg 到 http://xxx.xx/images/xxx.jpg

const coverUrlHandle = (
  data: string | { cover: string }[],
  reverse: boolean = false
): string|{ cover: string }[] => {
  const rootPath = `${config.APP_HOST}:${config.APP_PROT}`;

  const regex = /\/images\/.*\.*/;

  if (typeof data === "string") {
    if (reverse) {
      const match = data.match(regex);
      match ? (data = match[0]) : data;
      
    }else{
      data = `${rootPath}/${data}`
    }
  } else {
    data.forEach((item=>{
    if(reverse){
      const match = item.cover.match(regex);
      match ? (item.cover = match[0]) : item;
    }else{
      item.cover = `${rootPath}/${item.cover}`
    }
    }))

  }
  return data
};

export default coverUrlHandle;
