import { client } from "../database";

const POST_TABLE = "vts-portal-posts";

// get posts
export const getPosts = async () => {
  const params = {
    TableName: POST_TABLE,
  };

  try {
    const data = await client.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

export const getPostById = async (postId: string) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
  };

  try {
    const data = await client.get(params).promise();
    return data.Item;
  } catch (error) {
    console.error("Error getting post:", error);
    throw error;
  }
};

// create posts
export const createPost = async (post: {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  image: string;
  tags: string[];
}) => {
  const params = {
    TableName: POST_TABLE,
    Item: post,
  };

  try {
    await client.put(params).promise();
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// update posts
export const updatePost = async (post: {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  image: string;
  tags: string[];
}) => {
  const params = {
    TableName: POST_TABLE,
    Item: post,
  };

  try {
    await client.put(params).promise();
    return post;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const updatePostTitle = async (postId: string, title: string) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
    UpdateExpression: "SET #title = :title",
    ExpressionAttributeNames: {
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":title": title,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return { id: postId, title };
  } catch (error) {
    console.error("Error updating post title:", error);
    throw error;
  }
};

export const updatePostDescription = async (
  postId: string,
  description: string
) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
    UpdateExpression: "SET #description = :description",
    ExpressionAttributeNames: {
      "#description": "description",
    },
    ExpressionAttributeValues: {
      ":description": description,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return { id: postId, description };
  } catch (error) {
    console.error("Error updating post description:", error);
    throw error;
  }
};

export const updatePostContent = async (
  postId: string,
  title: string,
  content: string
) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
    UpdateExpression: "SET #title = :title, content = :content",
    ExpressionAttributeNames: {
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":title": title,
      ":content": content,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return { id: postId, title, content };
  } catch (error) {
    console.error("Error updating post content:", error);
    throw error;
  }
};

export const updatePostImage = async (postId: string, image: string) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
    UpdateExpression: "SET image = :image",
    ExpressionAttributeValues: {
      ":image": image,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return { id: postId, image };
  } catch (error) {
    console.error("Error updating post image:", error);
    throw error;
  }
};

// delete posts
export const deletePost = async (postId: string) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
  };

  try {
    await client.delete(params).promise();
    return postId;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getPrevAndNextPost = async (postId: string) => {
  const params = {
    TableName: POST_TABLE,
  };

  try {
    const data = await client.scan(params).promise();
    const posts = data.Items;

    if (!Array.isArray(posts)) {
      return {};
    }

    // order posts by date
    posts.sort((a: any, b: any) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    const index = posts.findIndex((post: any) => post.id === postId);
    const lenght = posts.length;

    const prevPost = posts[(index - 1) % lenght];
    const nextPost = posts[(index + 1) % lenght];
    return { prevPost, nextPost };
  } catch (error) {
    console.error("Error getting prev and next posts:", error);
    throw error;
  }
};

export const getAuthorProps = async (authorId: string) => {
  const params = {
    TableName: "vts-portal-users",
    Key: {
      id: authorId,
    },
  };

  try {
    const data = await client.get(params).promise();
    if (data.Item) {
      const { name, image, socialMedia } = data.Item;
      return { name, image, socialMedia };
    }
  } catch (error) {
    console.error("Error getting author props:", error);
    throw error;
  }
};

export const getPostCardProps = async (postId: string) => {
  try {
    const data = await getPostById(postId);
    if (data) {
      const { title, description, image, tags, authorId } = data;
      return { title, description, image, tags, authorId };
    }
  } catch (error) {
    throw error;
  }
};

export const getAllPostCardProps = async () => {
  try {
    const data = await getPosts();
    if (data) {
      return data.map((post: any) => {
        const { id, title, description, image, tags, authorId, createdAt } =
          post;
        return { id, title, description, image, tags, authorId, createdAt };
      });
    }
  } catch (error) {
    throw error;
  }
};
