import { Droppable, Draggable } from "@hello-pangea/dnd";
import API from "../api/axios";
export default function Column({ title, tasks = [], setTasks }) {
  // ✅ safe filtering (prevents crash if tasks undefined)
  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task.status === title)
    : [];
    const handleDelete = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);

    // 🔥 remove from UI instantly
    setTasks((prev) => prev.filter((task) => task._id !== id));
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  return (
    <div style={styles.column}>
      <h3 style={styles.title}>{title.toUpperCase()}</h3>

      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              ...styles.dropZone,
              background: snapshot.isDraggingOver
                ? "#dfe3e4"
                : "transparent",
            }}
          >
            {filteredTasks.map((task, index) => (
              <Draggable
                key={task._id}
                draggableId={String(task._id)} // ✅ always string
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...styles.card,
                      background: snapshot.isDragging
                        ? "#f7e9e9"
                        : "#dbd1d1cc",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <div style={styles.cardHeader}>
                   <span>{task.title || "Task"}</span>

                   <button
                     style={styles.deleteBtn}
                      onClick={() => handleDelete(task._id)}
                        >
                          ❌
                        </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {/* ✅ REQUIRED for smooth drag */}
            {provided.placeholder}

            {/* ✅ Empty state */}
            {filteredTasks.length === 0 && (
              <p style={styles.empty}>No tasks</p>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}

const styles = {
  column: {
    width: "260px",
    background: "#13275065",
    padding: "12px",
    borderRadius: "8px",
  },
  title: {
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "600",
  },
  dropZone: {
    minHeight: "120px",
    transition: "background 0.2s ease",
  },
  card: {
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "6px",
    boxShadow: "0 1px 3px rgba(30, 29, 29, 0.2)",
    cursor: "grab",
  },
  empty: {
    fontSize: "12px",
    color: "#060606",
    textAlign: "center",
    marginTop: "10px",
  },
  cardHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},

deleteBtn: {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "red",
  fontSize: "14px",
},
};