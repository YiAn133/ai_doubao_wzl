import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItem({ task, onToggle, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md ${
        isDragging ? "z-10 shadow-lg" : ""
      }`}
    >
      {/* 拖拽手柄 —— 只有这里是拖拽热区 */}
      <button
        {...attributes}
        {...listeners}
        className="shrink-0 cursor-grab text-gray-400 active:cursor-grabbing hover:text-gray-600"
        aria-label="拖拽排序"
        tabIndex={-1}
      >
        ⠿
      </button>

      {/* 完成状态切换 */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="size-5 shrink-0 cursor-pointer accent-blue-500"
      />

      {/* 任务文字 */}
      <span
        className={`flex-1 text-gray-800 ${
          task.completed ? "text-gray-400 line-through" : ""
        }`}
      >
        {task.text}
      </span>

      {/* 删除按钮 */}
      <button
        onClick={() => onDelete(task.id)}
        className="shrink-0 cursor-pointer rounded-md px-2 py-1 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        删除
      </button>
    </li>
  );
}
