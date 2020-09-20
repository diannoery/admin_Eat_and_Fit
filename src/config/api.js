import React, { Component } from "react";
import axios from "axios";

var BaseUrl = "";

//Api Auth token
export const authLogin = async (Login) => {
  const res = await axios.post(`${BaseUrl}/auth/login`, Login);
  return await res.data;
};

// API User
export const getUser = async ({ page, limit, keyword }, token) => {
  const res = await axios.get(
    `${BaseUrl}/admin/users?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await res.data;
};
export const getTotalUser = async (token) => {
  const res = await axios.get(`${BaseUrl}/admin/users/total`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.data;
};
export const getUserById = async (id, token) => {
  const res = await axios.get(`${BaseUrl}/admin/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await res.data;
};

export const addUser = async (user, token) => {
  const res = await axios.post(`${BaseUrl}/admin/users`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.data;
};
export const updateUser = async (idUser, user, token) => {
  const res = await axios.put(`${BaseUrl}/admin/users/${idUser}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  return await res.data;
};

export const deleteUser = async (idUser, token) => {
  const res = await axios.delete(`${BaseUrl}/admin/users/${idUser}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.data;
};

// API Level
export const getLevel = async (token) => {
  const res = await axios.get(`${BaseUrl}/admin/levels`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await res.data;
};

// API Food
export const getFood = async ({ page, limit, keyword }, token) => {
  const res = await axios.get(
    `${BaseUrl}/admin/foods?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log(res);

  return await res.data;
};

export const addFood = async (food, token) => {
  const res = await axios.post(`${BaseUrl}/admin/foods`, food, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.data;
};
export const getFoodById = async (id, token) => {
  const res = await axios.get(`${BaseUrl}/admin/foods/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await res.data;
};
export const deleteFoodById = async (id, token) => {
  const res = await axios.delete(`${BaseUrl}/admin/foods/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await res.data;
};

export const updateFood = async (idUser, user, token) => {
  const res = await axios.put(`${BaseUrl}/admin/foods/${idUser}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  return await res.data;
};

//API upload image
export const uploadImage = async (idImage, fileImage, token) => {
  let formData = await new FormData();
  await formData.append("upload-file", fileImage);
  const res = await axios.post(`${BaseUrl}/upload/${idImage}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return await res.data;
};

// API Packet
export const getPacket = async ({ page, limit, keyword }, token) => {
  const res = await axios.get(
    `${BaseUrl}/admin/packets?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await res.data;
};
export const getDetailPacket = async (idPacket, token) => {
  const res = await axios.get(`${BaseUrl}/admin/packets/${idPacket}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.data;
};

export const addPacket = async (packet, token) => {
  const res = await axios.post(`${BaseUrl}/admin/packets`, packet, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.data;
};

export const updatePacket = async (idPacket, packet, token) => {
  const res = await axios.put(`${BaseUrl}/admin/packets/${idPacket}`, packet, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.data;
};
export const deletePacket = async (idPacket, token) => {
  const res = await axios.delete(`${BaseUrl}/admin/packets/${idPacket}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.data;
};
export const getPacketById = async (id, token) => {
  const res = await axios.get(`${BaseUrl}/admin/packets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await res.data;
};

export const getTransaction = async ({ page, limit, keyword }, token) => {
  const res = await axios.get(
    `${BaseUrl}/admin/transactions?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await res.data;
};
