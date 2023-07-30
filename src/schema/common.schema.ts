export const paginationSchema = {
  $id: "paginationSchema",
  type: "object",
  properties: {
    limit: {
      type: "number",
      default: 10,
      enum: [10, 20, 50],
    },
    offset: {
      type: "number",
      default: 0,
      minimum: 0,
    },
  },
};

// Just a single response object including a message
export const messageSchema = {
  $id: "messageResponseSchema",
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

// Used to validate/match URLS that include an ':id' param
export const paramIdSchema = {
  $id: "paramIdSchema",
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};
