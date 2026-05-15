
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'يرجى إضافة عنوان المهمة'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['To-Do', 'In-Progress', 'Completed'],
        default: 'To-Do'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    category: {
        type: String,
        default: 'General'
    },
    dueDate: {
        type: Date
    }
}, { 
    timestamps: true 
});

const taskModel =mongoose.model ("tasks",taskSchema);
export default taskModel;