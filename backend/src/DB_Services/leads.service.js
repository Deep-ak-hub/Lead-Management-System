import Leads from "../models/leads.model.js";
import apiError from "../utils/apiError.js";

class LeadsService {
  async getSingleRowByfilter(filter) {
    try {
      const data = await Leads.findOne(filter);
      return data;
    } catch (exception) {
      throw exception
    }
  }

  async validateLeadId(id) {
    try {
      const leadId = await this.getSingleRowByfilter({ _id: id });

      if (!leadId) {
        throw {
          statusCode: 404,
          message: "Lead not found",
          status: "LEAD_NOT_FOUND",
        };
      }
      return leadId;
    } catch (exception) {
      throw exception
    }
  }

  async updateLeads(data, filter) {
    try {
      const updatedData = await Leads.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      return updatedData;
    } catch (exception) {
      throw exception
    }
  }

  async validateExistingUser(email, adminId) {
    try {
      const existinUser = await Leads.findOne({ email, admin: adminId });
      if (existinUser) {
        throw apiError("Email already exists", 400);
      }
    } catch (exception) {
      throw exception;
    }
  }

  async createLeads(data) {
    try {
      return await Leads.create(data);
    } catch (exception) {
      throw exception
    }
  }

  async deleteLeadById(filter) {
    try {
      return await Leads.findOneAndDelete(filter);
    } catch (exception) {
      throw exception
    }
  }
}

export const leadService = new LeadsService();
