import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  function handleAddTask(event) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput('');
  }

  function handleToggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>To Do List</h1>

      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: '8px 16px', fontSize: 16 }}>
          Adicionar
        </button>
      </form>

      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => setFilter('all')}
          style={{ padding: '8px 12px', fontWeight: filter === 'all' ? '700' : '400' }}
        >
          Todas
        </button>
        <button
          type="button"
          onClick={() => setFilter('pending')}
          style={{ padding: '8px 12px', fontWeight: filter === 'pending' ? '700' : '400' }}
        >
          Pendentes
        </button>
        <button
          type="button"
          onClick={() => setFilter('completed')}
          style={{ padding: '8px 12px', fontWeight: filter === 'completed' ? '700' : '400' }}
        >
          Concluídas
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>Não há tarefas para exibir.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 12,
                border: '1px solid #ddd',
                borderRadius: 8,
                background: task.completed ? '#f0f8ff' : '#fff',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              </label>

              <button
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                style={{ marginLeft: 12, padding: '7px 12px' }}
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
   