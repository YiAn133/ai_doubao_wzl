import { Link } from 'react-router-dom';
//替代a标签，点击后，不会刷新页面

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/user/123">小家</Link></li>
        <li><Link to="/products/123">商品详情</Link></li>
        <li><Link to="/products/new">商品新增</Link></li>
        <li><Link to="/pay">支付</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation