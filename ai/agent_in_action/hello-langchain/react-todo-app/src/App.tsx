import { useState, useEffect, useCallback } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isInitialRender, setIsInitialRender] = useState(true);

  // localStorage 持久化
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 初始渲染动画标记
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialRender(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const addTodo = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };
    setTodos(prev => [newTodo, ...prev]);
    setInput('');
  }, [input]);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // 筛选
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 统计
  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = totalCount - completedCount;

  const filterOptions: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'active', label: '进行中' },
    { key: 'completed', label: '已完成' },
  ];

  return (
    <div className="app-wrapper">
      {/* 背景装饰 */}
      <div className="bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <div className={`todo-container ${isInitialRender ? 'fade-in' : ''}`}>
        {/* 头部 */}
        <header className="todo-header">
          <h1 className="todo-title">
            <span className="title-icon">📝</span>
            TodoList
          </h1>
          <p className="todo-subtitle">管理你的日常任务</p>
        </header>

        {/* 输入区域 */}
        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              className="todo-input"
              placeholder="添加一个新任务..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={200}
            />
            <button className="add-btn" onClick={addTodo} disabled={!input.trim()}>
              <span className="add-icon">+</span>
              添加
            </button>
          </div>
        </div>

        {/* 筛选栏 */}
        <div className="filter-section">
          <div className="filter-tabs">
            {filterOptions.map(opt => (
              <button
                key={opt.key}
                className={`filter-tab ${filter === opt.key ? 'active' : ''}`}
                onClick={() => setFilter(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 任务列表 */}
        <div className="todo-list-wrapper">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎉</span>
              <p>
                {filter === 'all'
                  ? '还没有任务，快来添加第一个吧！'
                  : filter === 'active'
                  ? '没有进行中的任务'
                  : '没有已完成的任务'}
              </p>
            </div>
          ) : (
            <ul className="todo-list">
              {filteredTodos.map((todo, index) => (
                <li
                  key={todo.id}
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    className={`check-btn ${todo.completed ? 'checked' : ''}`}
                    onClick={() => toggleTodo(todo.id)}
                    aria-label={todo.completed ? '取消完成' : '标记完成'}
                  >
                    {todo.completed && (
                      <svg viewBox="0 0 24 24" className="check-svg">
                        <path
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </button>

                  <span
                    className={`todo-text ${todo.completed ? 'line-through' : ''}`}
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.text}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="删除任务"
                    title="删除"
                  >
                    <svg viewBox="0 0 24 24" className="delete-svg">
                      <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 底部统计栏 */}
        <footer className="todo-footer">
          <div className="stats">
            <span className="stat-item">
              <span className="stat-num">{totalCount}</span> 总计
            </span>
            <span className="stat-divider">|</span>
            <span className="stat-item">
              <span className="stat-num active-num">{activeCount}</span> 进行中
            </span>
            <span className="stat-divider">|</span>
            <span className="stat-item">
              <span className="stat-num completed-num">{completedCount}</span> 已完成
            </span>
          </div>
          {completedCount > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              清除已完成
            </button>
          )}
        </footer>

        {/* 进度条 */}
        {totalCount > 0 && (
          <div className="progress-bar-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
            <span className="progress-text">
              {Math.round((completedCount / totalCount) * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
