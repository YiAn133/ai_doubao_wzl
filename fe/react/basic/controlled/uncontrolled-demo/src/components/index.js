// 组件越来越多，会在index.js 上导出所有组件（架构）
import ControlledInput  from "./ControlledInput";
import UncontrolledInput from "./UncontrolledInput";
import CommentBox from "./CommentBox";
import LoginForm   from './LoginForm/index'

export {
    ControlledInput,
    UncontrolledInput,
    CommentBox,
    LoginForm
}