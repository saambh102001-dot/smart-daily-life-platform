import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // تأكد من تنصيب yup إذا لم يكن موجوداً
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, FormGroup, Label, Button, Row, Col } from "reactstrap";
import { addTask, updateTask } from "../Features/TaskSlice"; // تأكد من استيراد الأكشنز الصحيحة
import { useNavigate, useParams } from "react-router-dom";

// تعريف شروط التحقق للمهام
const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
});

const TaskManagement = () => {
  const { id } = useParams(); // لجلب معرف المهمة من الرابط في حالة التعديل
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // جلب البيانات من Redux
  const user = useSelector((state) => state.users.user);
  const tasks = useSelector((state) => state.tasks.items);
  const email = useSelector((state)=>state.users.user.email);

  // تحديد وضع التعديل وجلب بيانات المهمة
  const isEditMode = Boolean(id);
  const taskToEdit = tasks.find((t) => t._id === id);

  // States لربط المدخلات (useState) كما في اللوجن
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To-Do");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(taskSchema),
  });


  useEffect(() => {
    if (isEditMode && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      
      // تحديث قيم react-hook-form أيضاً
      setValue("title", taskToEdit.title);
      setValue("description", taskToEdit.description);
    }
  }, [isEditMode, taskToEdit, setValue]);

  const onSubmit = (data) => {
    const taskData = {
      title: data.title,
      description: data.description,
      priority,
      status,
      userId: user?._id, 
    };

    if (isEditMode) {
      dispatch(updateTask({ id, ...taskData }));
    } else {
      dispatch(addTask(taskData));
    }
    navigate("/"); 
  };

  useEffect(() => {
    if(!email){
      navigate("/login");
    }
  }, [email]);

  return (
    <Container className="mt-5 shadow p-4 rounded bg-light">
      <h2 className="mb-4 text-center">
        {isEditMode ? "Update Task" : "Create New Task"}
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="title">Task Title</Label>
          <input
            id="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <small className="text-danger">{errors.title.message}</small>}
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <textarea
            id="description"
            rows="4"
            className="form-control"
            {...register("description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </FormGroup>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="priority">Priority</Label>
              <select 
                id="priority" 
                className="form-control" 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="status">Status</Label>
              <select 
                id="status" 
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {/* مطابقة الـ Enum الموجود في السيرفر */}
                <option value="To-Do">To-Do</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </FormGroup>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button color="primary" type="submit" className="px-5 me-2">
            {isEditMode ? "Save Changes" : "Create Task"}
          </Button>
          <Button color="secondary" onClick={() => navigate("/")}>Cancel</Button>
        </div>
      </Form>
    </Container>
  );
};

export default TaskManagement;