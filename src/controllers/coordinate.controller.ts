import { client } from "../database";

const COORDINATE_TABLE = "vts-portal-coordinates";

interface Coordinate {
  id: string;
  createdAt: string;
  lat: number;
  lng: number;
}

// get coordinates
export const getCoordinates = async () => {
  const params = {
    TableName: COORDINATE_TABLE,
  };

  try {
    const data = await client.scan(params).promise();
    return data.Items as Coordinate[];
  } catch (error) {
    console.error("Error getting coordinates:", error);
    throw error;
  }
};

// get cordinates by time interval
export const getCoordinatesByTimeInterval = async (
  startTime: string,
  endTime: string
) => {
  const params = {
    TableName: COORDINATE_TABLE,
    FilterExpression: "#createdAt between :start and :end",
    ExpressionAttributeNames: {
      "#createdAt": "createdAt",
    },
    ExpressionAttributeValues: {
      ":start": startTime,
      ":end": endTime,
    },
  };

  try {
    const data = await client.scan(params).promise();
    return data.Items as Coordinate[];
  } catch (error) {
    console.error("Error getting coordinates:", error);
    throw error;
  }
};

// Create coordinate
export const createCoordinate = async (coordinate: Coordinate) => {
  const params = {
    TableName: COORDINATE_TABLE,
    Item: coordinate,
  };

  try {
    await client.put(params).promise();
    return coordinate;
  } catch (error) {
    console.error("Error creating coordinate:", error);
    throw error;
  }
};

// Get coordinate by ID
export const getCoordinateById = async (coordinateId: string) => {
  const params = {
    TableName: COORDINATE_TABLE,
    Key: {
      id: coordinateId,
    },
  };

  try {
    const data = await client.get(params).promise();
    return data.Item as Coordinate;
  } catch (error) {
    console.error("Error getting coordinate:", error);
    throw error;
  }
};

// Update coordinate
export const updateCoordinate = async (coordinate: Coordinate) => {
  const params = {
    TableName: COORDINATE_TABLE,
    Item: coordinate,
  };

  try {
    await client.put(params).promise();
    return coordinate;
  } catch (error) {
    console.error("Error updating coordinate:", error);
    throw error;
  }
};

// Delete coordinate
export const deleteCoordinate = async (coordinateId: string) => {
  const params = {
    TableName: COORDINATE_TABLE,
    Key: {
      id: coordinateId,
    },
  };

  try {
    await client.delete(params).promise();
    return coordinateId;
  } catch (error) {
    console.error("Error deleting coordinate:", error);
    throw error;
  }
};
