import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Schema for validation
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High'], 'Invalid priority'),
  state: yup.string().oneOf(['todo', 'doing', 'done'], 'Invalid state'),
  image: yup
    .mixed()
    .notRequired()
    .test('fileSize', 'Image size should be less than 5MB', (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= 5242880;
    })
    .test('fileFormat', 'Unsupported format, upload JPEG or PNG', (value) => {
      if (!value || value.length === 0) return true;
      return ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
});

const TaskForm = ({ onSubmit, onAddTaskToggle, defaultValues, isEditMode }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // Populate form fields with default values when they change
  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach(key => {
        setValue(key, defaultValues[key]);
      });
    }
  }, [defaultValues, setValue]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file[0]);

    try {
      const response = await axios.post('https://api.imgur.com/3/image/', formData, {
        headers: {
          Authorization: 'Client-ID a53e9ebce65ee6a',
        },
      });
      return response.data.data.link;
    } catch (error) {
      console.error('Image upload failed:', error.response ? error.response.data : error.message);
      throw new Error('Image upload failed');
    }
  };

  const handleFormSubmit = async (data) => {
    let imageUrl = null;
    if (data.image && data.image.length > 0) {
      imageUrl = await uploadImage(data.image);
    }
    // Ensure defaultValues and defaultValues.image are defined before accessing
    onSubmit({ ...data, image: imageUrl || (defaultValues && defaultValues.image) || null });
    //onAddTaskToggle(); // Close form after submission
  };

  return (
    <div className="floating-form position-fixed bg-light shadow p-4 rounded"
         style={{ bottom: '50%', right: '50%', width: '40%', zIndex: 1000, transform: 'translate(50%, 50%)' }}>
      {/* Close Icon */}
      <button type="button" className="btn-close float-end" onClick={onAddTaskToggle} aria-label="Close"></button>
      <h5 className="mb-3">{isEditMode ? "Edit Task" : "Add New Task"}</h5>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            type="text" 
            id="title" 
            {...register('title')} 
            className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            id="description" 
            {...register('description')} 
            className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
          />
          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
        </div>
        
        <div className="row">
          <div className="col-md-6 form-group mb-3">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select 
              id="priority" 
              {...register('priority')} 
              className={`form-select ${errors.priority ? 'is-invalid' : ''}`} 
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
          </div>
          
          <div className="col-md-6 form-group mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <select 
              id="state" 
              {...register('state')} 
              className={`form-select ${errors.state ? 'is-invalid' : ''}`} 
            >
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="image" className="form-label">Image (optional)</label>
          <input 
            type="file" 
            id="image" 
            {...register('image')} 
            className={`form-control ${errors.image ? 'is-invalid' : ''}`} 
            accept="image/jpeg, image/png"
          />
          {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
        </div>
        
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
