import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { TransactionService } from "../src/service/transaction.service";

jest.mock("../src/service/transaction.service");

describe("GET /api/transactions", () => {
  it("should return all transactions", async () => {
    const mockData = [
      { id: "1", amount: 1000, currency: "USD", recipient: "Niyas", status: "PENDING" },
      { id: "2", amount: 2000, currency: "USD", recipient: "Nazar", status: "COMPLETED" },
    ];

    const getAllTransactionsMock = TransactionService.prototype.getAllTransactions as jest.Mock;
    getAllTransactionsMock.mockResolvedValue(mockData);

    const res = await request(app).get("/api/transactions");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockData);
    expect(getAllTransactionsMock).toHaveBeenCalled();
  });
});

describe("GET /api/transactions/:id", () => {
  it("should return a single transaction", async () => {
    const mockData = { id: "1", amount: 1000, currency: "USD", recipient: "Niyas", status: "PENDING" };
    const getTransactionByIdMock = TransactionService.prototype.getTransactionById as jest.Mock;
    getTransactionByIdMock.mockResolvedValue(mockData);

    const res = await request(app).get("/api/transactions/1");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockData);
    expect(getTransactionByIdMock).toHaveBeenCalledWith("1");
  });
});

describe("POST /api/transactions", () => {
  it("should create a new transaction", async () => {
    const newData = { amount: 500, currency: "USD", recipient: "Test" };
    const createTransactionMock = TransactionService.prototype.createTransaction as jest.Mock;
    createTransactionMock.mockResolvedValue("Transaction completed successfully");

    const res = await request(app).post("/api/transactions").send(newData);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBe("Transaction completed successfully");
  });

  it("should return 400 if validation fails", async () => {
    const invalidData = { amount: -100 }; 
    const res = await request(app).post("/api/transactions").send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });
});

describe("PATCH /api/transactions/:id/process", () => {
  it("should update transaction status", async () => {
    const mockData = { id: "1", amount: 1000, status: "COMPLETED" };
    const updatePaymentStatusMock = TransactionService.prototype.updatePaymentStatus as jest.Mock;
    updatePaymentStatusMock.mockResolvedValue(mockData);

    const res = await request(app).patch("/api/transactions/1/process");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("COMPLETED");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});