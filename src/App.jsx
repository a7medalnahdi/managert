
// [تم التعديل: تدرج الألوان حسب الحالة]
import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState({
    title: "",
    requester: "",
    type: "",
    size: "",
    link: "",
    deadline: "",
    description: "",
    department: "كرييتف",
    status: "غير منجز"
  });
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    if (editingId !== null) {
      setTasks(prev => prev.map(t => t.id === editingId ? { ...newTask, id: editingId } : t));
      setEditingId(null);
    } else {
      setTasks(prev => [...prev, { ...newTask, id: Date.now() }]);
    }
    setNewTask({
      title: "",
      requester: "",
      type: "",
      size: "",
      link: "",
      deadline: "",
      description: "",
      department: "كرييتف",
      status: "غير منجز"
    });
  };

  const deleteTask = (id) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا الطلب؟")) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const editTask = (task) => {
    setNewTask(task);
    setEditingId(task.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const departmentColors = {
    "كرييتف": "bg-lime-200 text-lime-800",
    "سوشال ميديا": "bg-pink-200 text-pink-800",
    "ماركتنق": "bg-red-200 text-red-800",
    "كواليتي": "bg-yellow-200 text-yellow-800",
    "الشراكات": "bg-green-200 text-green-800",
    "سويتر": "bg-blue-200 text-blue-800",
    "اوبريشن": "bg-purple-200 text-purple-800",
    "خدمة عملاء": "bg-orange-200 text-orange-800",
    "تقنية": "bg-cyan-200 text-cyan-800",
  };

  const statusGradients = {
    "غير منجز": "bg-gradient-to-br from-[#cc2b5e] to-[#753a88]",
    "انتظار الرد": "bg-gradient-to-br from-[#ff6a00] to-[#ee0979]",
    "اهمية": "bg-gradient-to-br from-[#11998e] to-[#38ef7d]",
    "جاري العمل": "bg-gradient-to-br from-[#396afc] to-[#2948ff]",
    "انتظار المحتوى": "bg-gradient-to-br from-[#f7971e] to-[#ffd200]",
    "معلق": "bg-gradient-to-br from-[#434343] to-[#000000]",
    "ملغي": "bg-gradient-to-br from-[#e52d27] to-[#b31217]",
    "منجز": "bg-gradient-to-br from-[#56ab2f] to-[#a8e063]"
  };

  const inputStyle = \`\${darkMode ? 'bg-[#3a3a3a] text-white' : 'bg-[#d1d5d8] text-black'} p-3 rounded-xl\`;

  return (
    <div className={\`\${darkMode ? 'bg-[#0f172a] text-white' : 'bg-[#ffefe5] text-black'} min-h-screen transition-all px-4 py-6 max-w-7xl mx-auto space-y-6\`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">نظام إدارة الطلبات</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="bg-[#ef5b0c] px-5 py-2 rounded-full text-white text-sm font-medium">
          {darkMode ? "الوضع النهاري ☀️" : "الوضع الليلي 🌙"}
        </button>
      </div>

      <div className={\`\${darkMode ? 'bg-[#2b292a]' : 'bg-white'} p-6 rounded-2xl shadow-md\`}>
        <h2 className="text-[#ef5b0c] text-xl font-bold mb-4">إضافة طلب جديد</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <input placeholder="عنوان الطلب" className={inputStyle} value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
          <input placeholder="اسم صاحب الطلب" className={inputStyle} value={newTask.requester} onChange={e => setNewTask({ ...newTask, requester: e.target.value })} />
          <input placeholder="نوع الطلب" className={inputStyle} value={newTask.type} onChange={e => setNewTask({ ...newTask, type: e.target.value })} />
          <input placeholder="مقاس التصميم" className={inputStyle} value={newTask.size} onChange={e => setNewTask({ ...newTask, size: e.target.value })} />
          <input placeholder="الرابط" className={inputStyle} value={newTask.link} onChange={e => setNewTask({ ...newTask, link: e.target.value })} />
          <input type="date" className={inputStyle} value={newTask.deadline} onChange={e => setNewTask({ ...newTask, deadline: e.target.value })} />
          <select className={inputStyle} value={newTask.department} onChange={e => setNewTask({ ...newTask, department: e.target.value })}>
            {Object.keys(departmentColors).map((dep, i) => <option key={i}>{dep}</option>)}
          </select>
          <select className={inputStyle} value={newTask.status} onChange={e => setNewTask({ ...newTask, status: e.target.value })}>
            {Object.keys(statusGradients).map((status, idx) => <option key={idx}>{status}</option>)}
          </select>
        </div>
        <textarea placeholder="تفاصيل الطلب" className={\`\${inputStyle} w-full mt-4\`} rows={3} value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
        <button onClick={addTask} className="mt-6 w-full bg-[#ef5b0c] py-3 rounded-xl font-semibold text-white hover:bg-orange-600">
          {editingId ? 'تحديث الطلب' : 'إضافة الطلب'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className={\`rounded-2xl p-4 shadow-lg border border-[#444] \${statusGradients[task.status]} \${darkMode ? 'text-white' : 'text-black'}\`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-white/20 border border-white/30 backdrop-blur-sm">{task.status}</span>
              <span className={\`text-xs px-3 py-1 rounded-full font-medium \${departmentColors[task.department]}\`}>{task.department}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{task.title}</h3>
            <p className="text-sm opacity-80">👤 {task.requester || '--'}</p>
            <p className="text-sm opacity-80">📐 المقاس: {task.size || '--'}</p>
            <p className="text-sm opacity-80">🎨 النوع: {task.type || '--'}</p>
            <p className="text-sm opacity-80">📅 التسليم: {task.deadline || '--'}</p>
            <p className="text-sm opacity-80">🔗 الرابط: <a href={task.link} className="underline text-blue-400">رابط</a></p>
            <div className="flex justify-between items-center pt-4">
              <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 text-xl">🗑️</button>
              <button onClick={() => editTask(task)} className="text-blue-400 hover:text-blue-600 text-xl">✏️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
