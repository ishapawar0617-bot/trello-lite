import { useDrag } from "react-dnd";
import { motion } from "framer-motion";

export default function TaskCard({ task, openModal }) {
  const [, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
  }));

  return (
    <motion.div
      ref={drag}
      className="task"
      whileHover={{ scale: 1.05 }}
      onClick={() => openModal(task)}
    >
      <h4>{task.title}</h4>

      {task.dueDate && (
        <p style={{ fontSize: "12px", color: "gray" }}>
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
}