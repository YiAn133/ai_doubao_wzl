// 将创建一个Theme 上下文，为共享数据
import{
    createContext
}from 'react'

// 如果只有export 那么导入的时候要加花括号
// 备胎
export const ThemeContext = createContext("light");