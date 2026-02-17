import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import { hashPassword } from "../utils/password.utils.js";

class AdminService {
  async createUser(data) {
    try {
      const hashedPassword = await hashPassword(data.password);
      return await Admin.create({
        ...data,
        password: hashedPassword,
      });
    } catch (exception) {
      throw exception;
    }
  }

  validateAdminId(adminId) {
    try {
      if (!adminId) {
        throw {
          statusCode: 404,
          message: "Admin not found",
          status: "ADMIN_NOT_FOUND",
        };
      }
      const validateId = mongoose.Types.ObjectId.isValid(adminId);

      if (!validateId) {
        throw {
          statusCode: 400,
          message: "Invalid admin Id",
          status: "INVALID_ADMIN_ID",
        };
      }
      return validateId;
    } catch (exception) {
      throw exception;
    }
  }

  async storeUser(data) {
    try {
      const User = new Admin(data);
      return await User.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const userDetail = await Admin.findOne(filter);
      return userDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      const updateData = { ...data };
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
      }
      return await Admin.findOneAndUpdate(
        filter,
        { $set: updateData },
        { new: true },
      );
    } catch (exception) {
      throw exception;
    }
  }

  getAdminPublicProfile(data) {
    return {
      _id: data._id,
      email: data.email,
      role: data.role,
      purchasedPlan: data.purchasedPlan,
    };
  }

  async getAllAdminProfile(filter) {
    try {
      return await Admin.find(filter);
    } catch (exception) {
      throw exception;
    }
  }
}

export const adminService = new AdminService();
