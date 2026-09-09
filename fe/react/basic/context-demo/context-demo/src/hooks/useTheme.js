import {
     ThemeContext
}from '../ThemeContext'

import{
    useContext//消费context
}from 'react'

// 自定义hooks，规定use开头
export function useTheme() {
    return useContext(ThemeContext);
}