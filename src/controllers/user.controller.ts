import { client } from "../database";

const USER_TABLE = "vts-portal-users";

// get all
export const getUsers = async () => {
  const params = {
    TableName: USER_TABLE,
  };

  try {
    const data = await client.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

// get by id
export const getUser = async (id: string) => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      id: id,
    },
  };

  try {
    const data = await client.get(params).promise();
    return data.Item;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// check id
export const checkUserId = async (id: string) => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      id: id,
    },
  };

  try {
    const data = await client.get(params).promise();
    return !!data.Item;
  } catch (error) {
    console.error("Error checking user ID:", error);
    throw error;
  }
};

// create user
export const createUser = async (user: {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  createdAt: string;
}) => {
  const params = {
    TableName: USER_TABLE,
    Item: user,
  };

  try {
    await client.put(params).promise();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// update user email
export const updateUserEmail = async (user: { id: string; email: string }) => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      id: user.id,
    },
    UpdateExpression: "SET email = :email",
    ExpressionAttributeValues: {
      ":email": user.email,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return user;
  } catch (error) {
    console.error("Error updating user email:", error);
    throw error;
  }
};

// update user password
export const updateUserPassword = async (user: {
  id: string;
  password: string;
}) => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      id: user.id,
    },
    UpdateExpression: "SET password = :password",
    ExpressionAttributeValues: {
      ":password": user.password,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return user;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error;
  }
};

// update user phone
export const updateUserPhone = async (user: { id: string; phone: string }) => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      id: user.id,
    },
    UpdateExpression: "SET phone = :phone",
    ExpressionAttributeValues: {
      ":phone": user.phone,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return user;
  } catch (error) {
    console.error("Error updating user phone:", error);
    throw error;
  }
};

// update user role
export const updateUserRole = async (user: { id: string; role: string }) => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      id: user.id,
    },
    UpdateExpression: "SET role = :role",
    ExpressionAttributeValues: {
      ":role": user.role,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return user;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

// delete user
export const deleteUser = async (id: string) => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      id: id,
    },
  };

  try {
    await client.delete(params).promise();
    return id;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
