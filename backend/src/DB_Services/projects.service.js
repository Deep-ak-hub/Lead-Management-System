import Project from "../models/projects.model.js";

class ProjectService {
  async addProject(data) {
    try {
      const project = new Project(data);
      return await project.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getProjects(filter) {
    try {
      return await Project.find(filter);
    } catch (exception) {
      exception;
    }
  }

  async getProjectById(id) {
    try {
      const data = await Project.findOne({ _id: id });
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateProjectById(data, filter) {
    try {
      const updatedData = await Project.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      return updatedData;
    } catch (exception) {
      throw exception;
    }
  }
}

export const projectService = new ProjectService();
