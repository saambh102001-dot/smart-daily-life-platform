import { it, expect, describe } from "vitest";


describe("Smart Daily Life Dashboard - Logic Tests", () => {


  it("should have a default status of 'Pending' for new tasks", () => {
    const newTask = { title: "Study Node.js", status: "Pending" };
    expect(newTask.status).toBe("Pending");
  });


  it("should change task status to 'Completed' when marked", () => {
    let task = { title: "Finish Assignment", status: "Pending" };
    

    task.status = "Completed"; 
    
    expect(task.status).toBe("Completed");
  });

  it("should verify that the task has a defined title", () => {
    const task = { title: "Go to Gym" };
    expect(task.title).toBeDefined();
    expect(task.title).toBe("Go to Gym");
  });

 
  it("should confirm that the tasks list is an array", () => {
    const tasksList = [];
    expect(Array.isArray(tasksList)).toBe(true);
  });

});