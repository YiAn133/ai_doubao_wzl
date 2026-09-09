function formatBytes(size) {
  // 计算应该用哪个单位（0=B, 1=kB, 2=MB...），size为0时直接用B
  // 几次方 
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    // 1024 的 i次方
    // 把字节数除以对应单位量级，保留两位小数后转回数字
    +(size / Math.pow(1024, i)).toFixed(2) * 1 +
    // 拼接上对应的单位字符串
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

export default  function progress({text , percentage , total}){
   percentage = percentage|| 0;

  return (
    <div className="w-full bg-gray-100 text-left rounded-lg overflow-hidden mb-0.5">
      <div 
        // { js 运行区域 返回？style 返回一个行内样式的key:value对象   }
        style={{width: `${Math.floor(percentage*100/total)}%`}}
        className="bg-blue-400 whitespace-nowrap px-1 text-sm">
        {/* { js 运行 } */}
        {text}{(percentage*100/total).toFixed(2)}%{ isNaN(total)? "": `of ${formatBytes(total)}` }
      </div>
    </div>
  )

}

