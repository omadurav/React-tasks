import { useRef, useState } from 'react'


interface Task {
  name: string,
  done: boolean
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(newTask)
    taskInput.current?.focus;
  }

  const addTask = (name: string) => {
    const newTasks: Task[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
    setNewTask('');
  }

  const handleTaskDone = (taskIndex: number) => {
    const listTasks: Task[] = [...tasks];
    listTasks[taskIndex].done = !listTasks[taskIndex].done;
    setTasks(listTasks);
  }

  const handleTaskDelete = (taskIndex: number) => {
    const listTasks: Task[] = [...tasks];
    listTasks.splice(taskIndex);
    setTasks(listTasks);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} ref={taskInput} />
        <button>Save</button>
      </form>
      {
        tasks.map((task: Task, index: number) => {
          return (
            <div key={index}>
              <h2 >{task.name}</h2>
              <p>{task.done ? 'Tarea completada' : 'Tarea Pendiente'}</p>
              <div>
                <button onClick={() => handleTaskDone(index)}>{task.done ? 'Abrir Tarea' : 'Cerrar Tarea'}</button>
                <button onClick={() => handleTaskDelete(index)}>{'Eliminar Tarea'}</button>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default App
