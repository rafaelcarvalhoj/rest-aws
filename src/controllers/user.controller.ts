import { client } from "../database";
const bcrypt = require("bcrypt");

const USER_TABLE = "vts-portal-users";

interface Resume {
  socialMedia: string[];
  articles: string[];
  diploma: string[];
  skills: string[];
  microResume: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  createdAt: string;
  avatar: string;
}

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
  try {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const params = {
      TableName: USER_TABLE,
      Item: { ...user, password: hashedPassword },
      ReturnValues: "ALL_OLD",
    };
    await client.put(params).promise();
    return { ...user, password: undefined };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// check password
export const checkPassword = async (id: string, password: string) => {
  try {
    const params = {
      TableName: USER_TABLE,
      Key: {
        id: id,
      },
    };
    const data = await client.get(params).promise();
    console.log(data.Item);
    if (!data.Item) {
      return null;
    }
    const match: boolean = await bcrypt.compare(password, data.Item.password);
    if (match) {
      return match;
    }
    return false;
  } catch (error) {
    console.error("Error checking user password:", error);
    throw error;
  }
};

// update all user fields
export const updateUser = async (userId: string, user: User) => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      id: userId,
    },
    UpdateExpression:
      "SET #name = :name, email = :email, phone = :phone, avatar = :avatar",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": user.name,
      ":email": user.email,
      ":phone": user.phone,
      ":avatar": user.avatar,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
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
  try {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const params = {
      TableName: USER_TABLE,
      Key: {
        id: user.id,
      },
      UpdateExpression: "SET password = :password",
      ExpressionAttributeValues: {
        ":password": hashedPassword,
      },
      ReturnValues: "ALL_NEW",
    };
    const data = await client.update(params).promise();
    if (!data.Attributes) {
      return null;
    }
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
    const data = await client.delete(params).promise();
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const params = {
      TableName: USER_TABLE,
      ScanFilter: {
        email: {
          ComparisonOperator: "EQ",
          AttributeValueList: [email],
        },
      },
    };
    const data = await client.scan(params).promise();
    if (data.Count === 0) {
      return false;
    }
    const user = data.Items?.[0];
    const match = await bcrypt.compare(password, user?.password);
    if (match) {
      return { ...user, password: undefined };
    }
    return false;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
