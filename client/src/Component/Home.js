import { useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask,markAsCompleted } from "../Features/TaskSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { items, isLoading } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.users.user);
  const email = useSelector((state)=>state.users.user.email);


  useEffect(() => {

    if (!user?.email) {
      navigate("/login");
    } else {
      dispatch(getTasks());
    }
  }, [dispatch, user, navigate]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  useEffect(() => {
    if(!email){
      navigate("/login");
    }
  }, [email]);

  return (
    <Container className="mt-4 pb-5">
  <Row className="align-items-center mb-5 p-4 bg-white rounded-4 shadow-sm border-0">
    <Col>
      <h1 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>Welcome, {user?.name || "User"}!</h1>
      <p className="text-muted mb-0">Here are your daily life topics and tasks:</p>
    </Col>
    <Col className="text-end">
      <Button className="btn-calm px-4 py-2 fw-bold" onClick={() => navigate("/addTask")}>+ Add New Task</Button>
    </Col>
  </Row>

  {isLoading ? (
    <div className="text-center py-5"><Spinner style={{ color: 'var(--calm-blue)' }} /></div>
  ) : (
    <Row>
      {items.length > 0 ? items.map((task) => (
        <Col md="4" key={task._id} className="mb-4">
          <Card className="task-card border-0 p-2 h-100">
            <CardBody className="d-flex flex-column">
              <CardTitle tag="h5" className="fw-bold mb-3" style={{ color: 'var(--text-dark)' }}>{task.title}</CardTitle>
              <CardText className="text-muted small mb-4">{task.description}</CardText>
              
              <div className="mt-auto">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: '#eef2f7', color: 'var(--calm-blue)' }}>
                    {task.priority}
                  </span>
                  <span className="small fw-bold" style={{ color: task.status === 'Completed' ? '#2ecc71' : '#f39c12' }}>
                    ● {task.status}
                  </span>
                </div>
                
                <hr className="my-3" style={{ opacity: '0.08' }} />
                
                {/* --- منطقة الأزرار المعدلة --- */}
                <div className="d-flex justify-content-around align-items-center">
                  
                  {/* إذا المهمة مو Completed يظهر الزر، إذا خلصت تظهر كلمة Completed */}
                  {task.status !== 'Completed' ? (
                    <Button 
                      color="success" 
                      size="sm" 
                      className="text-decoration-none fw-bold p-0" 
                      style={{ background: 'none', border: 'none', color: '#2ecc71' }}
                      onClick={() => dispatch(markAsCompleted(task._id))}
                    >
                      Complete
                    </Button>
                  ) : (
                    <span className="text-success small fw-bold">✓ Completed</span>
                  )}

                  <Button color="link" size="sm" className="text-decoration-none text-muted fw-bold p-0" onClick={() => navigate(`/updateTask/${task._id}`)}>
                    Edit
                  </Button>
                  
                  <Button color="link" size="sm" className="text-decoration-none text-danger fw-bold p-0" onClick={() => handleDelete(task._id)}>
                    Delete
                  </Button>
                </div>
                {/* ------------------------- */}
                
              </div>
            </CardBody>
          </Card>
        </Col>
      )) : (
        <Col className="text-center mt-5">
           <div className="p-5 bg-white rounded-4 shadow-sm">
              <h3 className="text-muted">No tasks found. Start by adding some!</h3>
           </div>
        </Col>
      )}
    </Row>
  )}
</Container>
  );
};

export default Home;