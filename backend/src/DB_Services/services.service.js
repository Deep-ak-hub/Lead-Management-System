import Service from "../models/service.model.js";
import apiError from "../utils/apiError.js";

class ServicesService {
  async validateExistingService(data) {
    try {
      console.log(data);

      const existingService = await Service.findOne({ title: data.title });
      //    console.log(existingService);

      if (existingService) {
        throw apiError("Service already exists", 400);
      }
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await Service.findOne(filter);
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async createNewService(data) {
    try {
      return await Service.create(data);
    } catch (exception) {
      throw exception;
    }
  }

  async getAllServices(filter) {
    try {
      return await Service.find(filter).sort({ created: 1 });
    } catch (exception) {
      throw exception;
    }
  }

  async validateServiceId(id) {
    try {
      const serviceId = await this.getSingleRowByFilter({ _id: id });

      if (!serviceId) {
        throw {
          statusCode: 404,
          message: "Service Not Found",
          status: "SERVICE_NOT_FOUND",
        };
      }
      return serviceId;
    } catch (exception) {
      throw exception;
    }
  }

  async updateService(data, filter) {
    try {
      // console.log(data);
      // console.log(filter);

      const updatedData = await Service.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      //   console.log(updatedData);

      return updatedData;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteServiceById(filter) {
    try {
      return await Service.findOneAndDelete(filter);
    } catch (exception) {
      throw exception;
    }
  }
}

export const servicesService = new ServicesService();
