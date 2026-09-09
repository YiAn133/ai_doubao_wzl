import { getCompletion } from "./completion.mjs";


async function main() {
    let response = await getCompletion("请用一句话解释什么叫模块化编程");
    console.log(response);
    
}

main();