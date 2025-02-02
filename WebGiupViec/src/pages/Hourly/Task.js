import React from "react";
import { Tabs } from "antd";
import "./index.css";

const Task = ({ tasks }) => {
  // Tạo các mục `Tabs` từ `tasks` trong props
  const items = tasks.map((task) => ({
    key: task._id,
    label: task.title,
    children: (
      <div className="task-form-main">
        <ul className="task-form-main-list">
          {task.taskList.map((taskItem, index) => (
            <li key={index} className="task-form-main-item">
              {taskItem}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Task;
